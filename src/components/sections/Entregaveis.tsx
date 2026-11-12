import { ENTREGAVEIS } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { formatCurrency } from '@/lib/utils'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 13 · T7 — Stack de valor: itens um a um e total com count-up
export function Entregaveis() {
  const { title, subhead, items, totalLabel, total } = ENTREGAVEIS
  const { inView, revealed } = useSlide()
  const totalStep = items.length + 1

  return (
    <Slide>
      <SectionHeading title={title} subhead={subhead} size="compact" />

      <Reveal order={4} className="mx-auto mt-6 w-full max-w-[56rem] md:mt-8">
        <div className="rounded-md border border-stroke-blue bg-surface-100/40 px-card py-3 md:py-4">
          <ul>
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item.label}
                step={i + 1}
                className="flex flex-col gap-0.5 border-b border-line py-2.5 md:flex-row md:items-baseline md:gap-4 md:py-3"
              >
                <span className="nse-body">{item.label}</span>
                <span aria-hidden className="hidden flex-1 border-b border-dotted border-ink-muted/40 md:block" />
                {item.value === null ? (
                  <em className="nse-body font-bold text-blue-400">{item.valueLabel}</em>
                ) : (
                  <span className="nse-body font-bold tabular-nums">{formatCurrency(item.value)}</span>
                )}
              </Reveal>
            ))}
          </ul>

          <Reveal step={totalStep} className="flex items-baseline justify-between gap-4 pt-4 md:pt-5">
            <span className="font-display text-subhead font-semibold uppercase">{totalLabel}</span>
            <span className="font-display text-headline-compact font-bold whitespace-nowrap text-blue-500">
              R$ <CountUp value={total} start={inView && revealed >= totalStep} />
            </span>
          </Reveal>
        </div>
      </Reveal>
    </Slide>
  )
}
