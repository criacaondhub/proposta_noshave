import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { SITE } from '@/config/content'
import { DeckContext, SlideContext, type DeckApi } from '@/lib/deck'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { DeckArrows } from './DeckArrows'
import { DeckHeader } from './DeckHeader'
import { DeckProgress } from './DeckProgress'

export interface DeckSlide {
  id: string
  label: string
  /** itens revelados um a um antes de passar ao próximo slide (desktop) */
  steps: number
  Component: ComponentType
}

const WHEEL_LOCK_MS = 600
const WHEEL_GESTURE_GAP_MS = 160
const WHEEL_MIN_DELTA = 12
const SCROLL_SETTLE_MS = 1200
const VIEW_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20)

const getSlideEls = (track: HTMLElement) => track.querySelectorAll<HTMLElement>('[data-slide]')

function indexFromHash(slides: DeckSlide[]) {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  if (!hash) return 0
  const byId = slides.findIndex((slide) => slide.id === hash)
  if (byId >= 0) return byId
  const n = Number.parseInt(hash, 10)
  return Number.isNaN(n) ? 0 : Math.min(Math.max(n - 1, 0), slides.length - 1)
}

export function Deck({ slides }: { slides: DeckSlide[] }) {
  const total = slides.length
  const trackRef = useRef<HTMLElement>(null)
  const stepMode = useMediaQuery('(min-width: 768px) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [current, setCurrent] = useState(() => indexFromHash(slides))
  const [revealed, setRevealed] = useState(() => slides.map(() => 0))
  const [inView, setInView] = useState(() => slides.map(() => false))

  // Teclado e roda leem sempre o estado mais recente, mesmo entre renders.
  const latest = useRef({ current, revealed, stepMode })
  useLayoutEffect(() => {
    latest.current = { current, revealed, stepMode }
  })

  // Durante um scroll programático o listener de scroll não sobrescreve o slide de destino.
  const scrollTarget = useRef<number | null>(null)
  const settleTimer = useRef(0)

  const goTo = useCallback(
    (index: number, instant = false) => {
      const track = trackRef.current
      const el = track ? getSlideEls(track)[index] : undefined
      if (!track || !el) return
      scrollTarget.current = index
      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(() => {
        scrollTarget.current = null
      }, SCROLL_SETTLE_MS)
      latest.current = { ...latest.current, current: index }
      setCurrent(index)
      track.scrollTo({
        left: el.offsetLeft,
        top: el.offsetTop,
        behavior: instant || reducedMotion ? 'instant' : 'smooth',
      })
    },
    [reducedMotion],
  )

  const navigate = useCallback(
    (dir: 1 | -1) => {
      const { current: index, revealed: shown, stepMode: stepping } = latest.current
      if (stepping) {
        const steps = slides[index].steps
        if ((dir === 1 && shown[index] < steps) || (dir === -1 && shown[index] > 0)) {
          const nextShown = shown.map((value, i) => (i === index ? value + dir : value))
          latest.current = { ...latest.current, revealed: nextShown }
          setRevealed(nextShown)
          return
        }
      }
      const target = index + dir
      if (target >= 0 && target < total) goTo(target)
    },
    [goTo, slides, total],
  )

  // Abre direto no slide do link (#id ou #número).
  useEffect(() => {
    if (latest.current.current > 0) goTo(latest.current.current, true)
  }, [goTo])

  // Slide atual a partir da posição do scroll (swipe, trackpad nativo, foco por teclado).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const horizontal = track.scrollWidth > track.clientWidth + 1
        const middle = horizontal
          ? track.scrollLeft + track.clientWidth / 2
          : track.scrollTop + track.clientHeight / 2
        let index = 0
        getSlideEls(track).forEach((el, i) => {
          if ((horizontal ? el.offsetLeft : el.offsetTop) <= middle) index = i
        })
        if (scrollTarget.current !== null) {
          if (index !== scrollTarget.current) return
          scrollTarget.current = null
        }
        latest.current = { ...latest.current, current: index }
        setCurrent(index)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Teclado em qualquer lugar; roda/trackpad na trilha horizontal (um gesto = um passo).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let lockedUntil = 0
    let lastTime = 0
    let lastMagnitude = 0

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      if (track.scrollWidth <= track.clientWidth + 1) return // mobile/vertical: scroll nativo
      event.preventDefault()
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const magnitude = Math.abs(delta)
      const now = performance.now()
      const gap = now - lastTime
      // um novo gesto no meio da inércia acelera; a cauda da inércia só desacelera
      const accelerating = magnitude > lastMagnitude * 1.3 + 2
      lastTime = now
      lastMagnitude = magnitude
      if (magnitude < WHEEL_MIN_DELTA || now < lockedUntil) return
      if (gap < WHEEL_GESTURE_GAP_MS && !accelerating) return
      lockedUntil = now + WHEEL_LOCK_MS
      navigate(delta > 0 ? 1 : -1)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, video, iframe, [contenteditable="true"]')) return
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          event.preventDefault()
          navigate(1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          navigate(-1)
          break
        case ' ':
          if (target?.closest('button, a')) return
          event.preventDefault()
          navigate(event.shiftKey ? -1 : 1)
          break
        case 'Home':
          event.preventDefault()
          goTo(0)
          break
        case 'End':
          event.preventDefault()
          goTo(total - 1)
          break
      }
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      track.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goTo, navigate, total])

  // Slide "em cena" quando cobre metade da tela; sai de cena quando quase some.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          let next = prev
          for (const entry of entries) {
            const i = Number((entry.target as HTMLElement).dataset.slide)
            const root = entry.rootBounds
            const coverage = root
              ? (entry.intersectionRect.width * entry.intersectionRect.height) / (root.width * root.height)
              : entry.intersectionRatio
            const value =
              coverage >= 0.5 || entry.intersectionRatio >= 0.55
                ? true
                : entry.intersectionRatio < 0.05
                  ? false
                  : prev[i]
            if (value !== next[i]) {
              if (next === prev) next = [...prev]
              next[i] = value
            }
          }
          return next
        })
      },
      { root: track, threshold: VIEW_THRESHOLDS },
    )
    getSlideEls(track).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Ao redimensionar (ou trocar de eixo), realinha no slide atual.
  useEffect(() => {
    let timer = 0
    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => goTo(latest.current.current, true), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(timer)
    }
  }, [goTo])

  // O # da URL acompanha o slide atual (link direto).
  useEffect(() => {
    const url = current === 0 ? window.location.pathname + window.location.search : `#${slides[current].id}`
    window.history.replaceState(null, '', url)
  }, [current, slides])

  const steps = slides[current].steps
  const api = useMemo<DeckApi>(
    () => ({
      current,
      total,
      stepMode,
      canPrev: current > 0 || (stepMode && revealed[current] > 0),
      canNext: current < total - 1 || (stepMode && revealed[current] < steps),
      next: () => navigate(1),
      prev: () => navigate(-1),
      goTo,
    }),
    [current, total, stepMode, revealed, steps, navigate, goTo],
  )

  return (
    <DeckContext.Provider value={api}>
      <DeckHeader />
      <main
        ref={trackRef}
        aria-label={SITE.deckLabel}
        className="flex h-svh w-full snap-y snap-mandatory flex-col overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] md:snap-x md:flex-row md:overflow-x-auto md:overflow-y-hidden [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ id, label, steps: slideSteps, Component }, index) => (
          <SlideContext.Provider
            key={id}
            value={{
              index,
              label,
              steps: slideSteps,
              inView: inView[index],
              revealed: stepMode ? revealed[index] : slideSteps,
              stepMode,
            }}
          >
            <Component />
          </SlideContext.Provider>
        ))}
      </main>
      <DeckArrows />
      <DeckProgress />
    </DeckContext.Provider>
  )
}
