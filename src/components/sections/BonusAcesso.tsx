import { BONUS_ACESSO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { GlowDivider, SectionHeading } from '@/components/ui/Typography'

// 11 · T2 — Bônus 01: número à esquerda, textos à direita, ligados por luz lateral
export function BonusAcesso() {
  const { eyebrow, title, subhead, number, unit, caption, body } = BONUS_ACESSO
  const { inView } = useSlide()

  return (
    <Slide>
      <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} />

      <div className="mt-8 flex flex-col items-center gap-5 md:mt-12 md:flex-row md:justify-center md:gap-8">
        <Reveal order={4} className="flex shrink-0 items-baseline gap-3">
          <CountUp value={number} start={inView} className="font-display text-display-xl text-blue-500" />
          <span className="font-display text-subhead font-semibold uppercase">{unit}</span>
        </Reveal>
        <Reveal order={5} className="w-full max-w-[12rem] md:w-40">
          <GlowDivider variant="left" />
        </Reveal>
        <Reveal order={6} className="flex max-w-[30rem] flex-col gap-3 text-center md:text-left">
          <p className="nse-lead">{caption}</p>
          <p className="nse-body text-ink-muted">
            <RichText text={body} strongClassName="text-ink" />
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}
