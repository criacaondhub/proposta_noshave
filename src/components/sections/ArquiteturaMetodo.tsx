import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { METODO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'
import { Card, StepBadge } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// Degraus: cada card tem a altura do próprio texto e começa mais alto que o anterior
const STAIR_OFFSETS = ['md:mt-36', 'md:mt-18', 'md:mt-0']

type Point = [number, number]

/* Centro de cada número relativo à lista (posição de layout, ignora as animações de entrada) */
function useBadgeCenters() {
  const listRef = useRef<HTMLOListElement>(null)
  const [points, setPoints] = useState<Point[]>([])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const centers = Array.from(list.querySelectorAll<HTMLElement>('[data-step-badge]')).map((badge): Point => {
        let x = badge.offsetWidth / 2
        let y = badge.offsetHeight / 2
        let node: HTMLElement | null = badge
        while (node && node !== list) {
          x += node.offsetLeft
          y += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }
        return [x, y]
      })
      setPoints(centers)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    measure()
    return () => observer.disconnect()
  }, [])

  return { listRef, points }
}

// 05 · T6 — As 3 etapas do método subindo como degraus
export function ArquiteturaMetodo() {
  const { title, steps } = METODO
  const { revealed } = useSlide()
  const { listRef, points } = useBadgeCenters()

  return (
    <Slide orbs="left">
      <SectionHeading title={title} />

      <ol ref={listRef} className="relative mt-8 flex flex-col gap-4 pl-16 md:mt-14 md:flex-row md:items-start md:gap-6 md:pl-0">
        {/* mobile: trilho de luz na lateral esquerda */}
        <span aria-hidden className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-blue-600 to-glow-300 md:hidden" />
        {/* desktop: linha de luz ligando os números */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible drop-shadow-[0_0_6px_rgb(44_162_246/0.9)] md:block"
        >
          {points.slice(1).map(([x2, y2], i) => {
            const [x1, y1] = points[i]
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-glow-300)"
                strokeWidth={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: revealed >= i + 2 ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              />
            )
          })}
        </svg>

        {steps.map((step, i) => {
          const top = i === steps.length - 1
          return (
            <Reveal as="li" key={step.title} step={i + 1} className={cn('relative md:flex-1', STAIR_OFFSETS[i])}>
              <Card variant={top ? 'featured' : 'default'} className="md:pt-10">
                <h3 className={cn('font-display text-lead font-normal uppercase', top && 'text-blue-500')}>{step.title}</h3>
                <p className="nse-body mt-3">{step.text}</p>
              </Card>
              <span data-step-badge className="absolute top-0 -left-16 md:-top-6 md:left-[calc(50%-1.5rem)]">
                <StepBadge n={i + 1} highlight={top} />
              </span>
            </Reveal>
          )
        })}
      </ol>
    </Slide>
  )
}
