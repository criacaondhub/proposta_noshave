import { CONDICAO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { CountUp } from '@/components/ui/CountUp'
import { CtaButton } from '@/components/ui/CtaButton'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 16 · T8 em 2 opções — à vista (destaque) e parcelado, + CTA
export function CondicaoEspecial() {
  const { eyebrow, title, subhead, options, cta } = CONDICAO
  const { inView, revealed } = useSlide()

  return (
    <Slide className="items-center">
      <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} size="compact" />

      <div className="mt-8 grid w-full max-w-[56rem] gap-5 md:mt-10 md:grid-cols-2 md:gap-6">
        {options.map((option, i) => (
          <Reveal key={option.label} step={i + 1} className="flex">
            <Card
              variant={option.featured ? 'featured' : 'default'}
              className={cn('relative flex w-full flex-col items-center gap-2 text-center', option.badge && 'pt-9')}
            >
              {option.badge && (
                <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-lg border border-glow-300/60 bg-blue-600 px-4 py-1 text-caption font-bold whitespace-nowrap uppercase">
                  {option.badge}
                </p>
              )}
              <h3 className="text-eyebrow font-bold text-blue-400 uppercase">{option.label}</h3>
              <p className="font-display text-headline font-bold whitespace-nowrap">
                <span className="text-subhead">R$ </span>
                <CountUp value={option.value} start={inView && revealed >= i + 1} />
              </p>
              <p className="nse-body text-ink-muted">{option.note}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal step={options.length + 1} className="mt-8 md:mt-10">
        <CtaButton>{cta}</CtaButton>
      </Reveal>
    </Slide>
  )
}
