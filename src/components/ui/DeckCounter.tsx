import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'
import { pad2 } from '@/lib/utils'

/* Contador discreto: pílula de vidro mínima e centralizada (base no desktop; topo no mobile, onde o conteúdo rola) */
export function DeckCounter() {
  const { current, total } = useDeck()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center md:top-auto md:bottom-5">
      <p className="rounded-full border border-ink/[0.06] bg-ink/[0.03] px-3 py-0.5 text-[0.6875rem] tracking-[0.08em] text-ink-muted/70 tabular-nums backdrop-blur-sm">
        <span className="sr-only">{SITE.counterLabel} </span>
        <span className="text-ink/80">{pad2(current + 1)}</span> / {pad2(total)}
      </p>
    </div>
  )
}
