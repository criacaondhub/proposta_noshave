import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'
import { pad2 } from '@/lib/utils'

export function DeckHeader() {
  const { current, total, goTo } = useDeck()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-linear-to-b from-bg-000/80 to-transparent">
      <div className="mx-auto flex max-w-page items-center justify-between px-slide-x py-header-y">
        <button
          type="button"
          onClick={() => goTo(0)}
          aria-label={`${SITE.wordmark} · ${SITE.homeLabel}`}
          className="pointer-events-auto -my-3 inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[-0.02em] text-ink"
        >
          {SITE.wordmark}
        </button>
        <p className="text-caption tabular-nums text-ink-muted">
          <span className="sr-only">{SITE.counterLabel} </span>
          <span className="text-ink">{pad2(current + 1)}</span> / {pad2(total)}
        </p>
      </div>
    </header>
  )
}
