import { VALOR_OFICIAL } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { formatCurrency } from '@/lib/utils'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Eyebrow } from '@/components/ui/Typography'

// 15 · T8 — Preço: DE riscado, POR gigante (count-up), badge de desconto
export function ValorOficial() {
  const { eyebrow, fromLabel, from, toLabel, to, badge } = VALOR_OFICIAL
  const { inView, revealed } = useSlide()

  return (
    <Slide ambient="beam" orbs="strong" className="items-center text-center">
      <Reveal order={0}>
        <Eyebrow text={eyebrow} />
      </Reveal>

      <Reveal order={1} className="mt-8 flex items-baseline gap-3 md:mt-12">
        <span className="nse-lead text-ink-muted uppercase">{fromLabel}</span>
        <del className="relative font-display text-subhead text-ink-muted no-underline">
          {formatCurrency(from)},00
          <span aria-hidden className="absolute inset-x-[-4%] top-1/2 h-[3px] -translate-y-1/2 -rotate-3 rounded-full bg-blue-600" />
        </del>
      </Reveal>

      <Reveal step={1} className="mt-2 flex items-start gap-2 md:gap-4">
        <span className="nse-lead mt-[1.2em] text-ink-muted uppercase">{toLabel}</span>
        <p className="flex items-start font-display text-display-xl text-ink">
          <span className="mt-[0.2em] mr-[0.15em] text-subhead">R$</span>
          <CountUp value={to} start={inView && revealed >= 1} />
          <span className="mt-[0.2em] text-subhead">,00</span>
        </p>
      </Reveal>

      <Reveal step={2} className="mt-6 md:mt-8">
        <p className="rounded-lg border border-blue-500/60 bg-linear-to-b from-surface-200 to-surface-100 px-5 py-2.5 text-eyebrow text-ink uppercase shadow-glow-cta">
          {badge}
        </p>
      </Reveal>
    </Slide>
  )
}
