import { AnimatePresence, motion } from 'framer-motion'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'
import { pad2 } from '@/lib/utils'

/* Contador discreto: barra de vidro centralizada (base no desktop; topo no mobile, onde o conteúdo rola) */
export function DeckCounter() {
  const { current, total, currentLabel } = useDeck()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center md:top-auto md:bottom-6">
      <p className="flex items-center gap-3 rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-1.5 text-caption text-ink-muted shadow-[0_12px_32px_-12px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md">
        <span className="tabular-nums">
          <span className="sr-only">{SITE.counterLabel} </span>
          <span className="text-ink">{pad2(current + 1)}</span> / {pad2(total)}
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-ink/15 md:block" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="hidden md:block"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {currentLabel}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  )
}
