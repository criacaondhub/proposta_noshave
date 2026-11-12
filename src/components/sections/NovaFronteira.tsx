import { FRONTEIRA } from '@/config/content'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 02 · T3 — Comparativo: o caminho tradicional × o padrão Ultramar
export function NovaFronteira() {
  const { eyebrow, title, muted, featured } = FRONTEIRA

  return (
    <Slide>
      <SectionHeading eyebrow={eyebrow} title={title} size="compact" />

      <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:items-center md:gap-gutter">
        {/* no mobile o lado destaque vem primeiro */}
        <Reveal step={1} className="order-2 md:order-1">
          <Card variant="muted">
            <h3 className="font-display text-lead font-semibold text-ink-muted uppercase">{muted.title}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {muted.items.map((item) => (
                <li key={item} className="nse-body flex items-start gap-3 text-ink-muted">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal step={2} className="order-1 md:order-2">
          <Card variant="featured" className="md:py-12">
            <h3 className="font-display text-lead font-semibold text-ink uppercase">{featured.title}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {featured.items.map((item) => (
                <li key={item} className="nse-body flex items-start gap-3">
                  <span aria-hidden className="mt-[0.5em] size-2 shrink-0 rounded-full bg-glow-100 shadow-glow-flare" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
