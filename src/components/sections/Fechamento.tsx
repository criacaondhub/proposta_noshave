import { FECHAMENTO } from '@/config/content'
import { CtaButton } from '@/components/ui/CtaButton'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { Headline } from '@/components/ui/Typography'

// 17 · T1 invertido — foto à esquerda, datas em cards e CTA final com pulse
export function Fechamento() {
  const { title, body, dates, cta, photo } = FECHAMENTO

  return (
    <Slide
      tone="deep"
      backdrop={
        <PhotoFrame
          photo={photo}
          edges={['right']}
          className="absolute inset-x-0 top-0 h-[40svh] md:inset-y-0 md:right-auto md:h-full md:w-1/2"
        />
      }
      className="justify-end pt-[34svh] md:items-end md:justify-center md:pt-slide-y"
    >
      <div className="flex w-full flex-col gap-5 md:w-1/2 md:gap-6">
        <Reveal order={0}>
          <Headline lines={title} size="compact" />
        </Reveal>
        <Reveal order={1}>
          <p className="nse-lead">
            <RichText text={body} />
          </p>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {dates.map((date, i) => (
            <Reveal as="li" key={date.day} step={1} order={i}>
              <div className="flex items-stretch overflow-hidden rounded-md border border-stroke-blue bg-surface-100">
                <p className="nse-body flex-1 self-center px-4 py-3 md:px-5 md:py-4">{date.text}</p>
                <p className="flex w-20 shrink-0 flex-col items-center justify-center bg-linear-to-br from-blue-600 to-blue-950 py-3 font-display md:w-24">
                  <span className="text-headline-compact font-bold">{date.day}</span>
                  <span className="text-eyebrow font-bold uppercase">{date.month}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal step={2} className="mt-2">
          <CtaButton pulse className="w-full md:w-auto">
            {cta}
          </CtaButton>
        </Reveal>
      </div>
    </Slide>
  )
}
