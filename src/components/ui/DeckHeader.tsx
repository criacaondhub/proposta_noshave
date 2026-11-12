import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'
import { cn, pad2 } from '@/lib/utils'
import { LogoMark } from './logo/Logo'

export function DeckHeader() {
  const { current, total, goTo } = useDeck()
  // na capa o logo grande já está no centro
  const onCover = current === 0

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-linear-to-b from-bg-000/80 to-transparent">
      <div className="mx-auto flex max-w-page items-center justify-between px-slide-x py-header-y">
        <button
          type="button"
          onClick={() => goTo(0)}
          aria-label={`${SITE.wordmark} · ${SITE.homeLabel}`}
          tabIndex={onCover ? -1 : undefined}
          className={cn(
            '-my-3 inline-flex min-h-11 items-center text-ink transition-opacity duration-500',
            onCover ? 'opacity-0' : 'pointer-events-auto opacity-100',
          )}
        >
          <LogoMark className="w-28 md:w-32" />
        </button>
        <p className="text-caption tabular-nums text-ink-muted">
          <span className="sr-only">{SITE.counterLabel} </span>
          <span className="text-ink">{pad2(current + 1)}</span> / {pad2(total)}
        </p>
      </div>
    </header>
  )
}
