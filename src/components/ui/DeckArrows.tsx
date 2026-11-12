import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'

// Discretas: só o ícone apagado; borda e fundo aparecem no hover. Área de clique de 44px.
const arrowClass =
  'pointer-events-auto grid size-11 place-items-center rounded-full border border-transparent text-ink-muted/60 transition-[color,border-color,background-color,opacity] duration-300 hover:border-ink/10 hover:bg-ink/[0.04] hover:text-ink disabled:pointer-events-none disabled:opacity-0'

/* Setas laterais: telas ≥ 768px com mouse ou trackpad (no touch a navegação é por swipe) */
export function DeckArrows() {
  const { canPrev, canNext, prev, next } = useDeck()

  return (
    <div className="pointer-events-none fixed inset-y-0 inset-x-0 z-30 hidden items-center justify-between px-[max(0.5rem,calc((var(--spacing-slide-x)_-_2.75rem)_/_2))] md:pointer-fine:flex">
      <button type="button" onClick={prev} disabled={!canPrev} aria-label={SITE.prevLabel} className={arrowClass}>
        <TbChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
      </button>
      <button type="button" onClick={next} disabled={!canNext} aria-label={SITE.nextLabel} className={arrowClass}>
        <TbChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
