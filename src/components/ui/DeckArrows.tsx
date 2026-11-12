import { AnimatePresence, motion } from 'framer-motion'
import { TbArrowDown, TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'

const arrowClass =
  'pointer-events-auto grid size-11 place-items-center rounded-full border border-stroke-blue bg-bg-100/70 text-ink backdrop-blur transition-[border-color,box-shadow,opacity] duration-300 hover:border-blue-500 hover:shadow-glow-cta disabled:pointer-events-none disabled:opacity-0'

export function DeckArrows() {
  const { current, canPrev, canNext, prev, next } = useDeck()
  const atStart = current === 0

  return (
    <>
      {/* Setas laterais: telas ≥ 768px com mouse ou trackpad */}
      <div className="pointer-events-none fixed inset-y-0 inset-x-0 z-30 hidden items-center justify-between px-[max(0.5rem,calc((var(--spacing-slide-x)_-_2.75rem)_/_2))] md:pointer-fine:flex">
        <button type="button" onClick={prev} disabled={!canPrev} aria-label={SITE.prevLabel} className={arrowClass}>
          <TbChevronLeft aria-hidden className="size-5" />
        </button>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {atStart && (
              <motion.span
                aria-hidden
                className="text-caption font-bold uppercase tracking-[0.08em] text-ink-muted"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: [0, 6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.4, delay: 1.2 }, x: { duration: 1.6, repeat: Infinity, delay: 1.2 } }}
              >
                {SITE.hintDesktop}
              </motion.span>
            )}
          </AnimatePresence>
          <button type="button" onClick={next} disabled={!canNext} aria-label={SITE.nextLabel} className={arrowClass}>
            <TbChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      {/* Dica de swipe: mobile e telas touch */}
      <AnimatePresence>
        {atStart && (
          <motion.p
            aria-hidden
            className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex flex-col items-center gap-1 text-caption text-ink-muted md:pointer-fine:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            {SITE.hintMobile}
            <TbArrowDown className="size-4 animate-bounce" />
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
