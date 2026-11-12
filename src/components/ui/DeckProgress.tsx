import { motion } from 'framer-motion'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'

export function DeckProgress() {
  const { current, total } = useDeck()

  return (
    <div
      role="progressbar"
      aria-label={SITE.progressLabel}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-0.5 bg-line"
    >
      <motion.div
        className="relative h-full bg-linear-to-r from-blue-800 via-blue-600 to-glow-300 shadow-glow-cta"
        initial={false}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* núcleo ciano acompanhando a ponta */}
        <span className="absolute top-1/2 right-0 h-1 w-10 -translate-y-1/2 rounded-full bg-linear-to-r from-glow-100/0 to-glow-100 shadow-glow-flare" />
      </motion.div>
    </div>
  )
}
