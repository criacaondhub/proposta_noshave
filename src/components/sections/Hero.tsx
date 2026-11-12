import { HERO } from '@/config/content'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { Headline, HighlightBand } from '@/components/ui/Typography'

// 01 · T1 — Hero split com a foto sangrando à direita
export function Hero() {
  return (
    <Slide
      tone="deep"
      backdrop={
        <PhotoFrame
          photo={HERO.photo}
          eager
          edges={['left']}
          className="absolute inset-x-0 top-0 h-[50svh] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[58%]"
        />
      }
      className="justify-end pt-[44svh] md:justify-center md:pt-slide-y"
    >
      <div className="flex flex-col gap-6 md:gap-8">
        <Reveal order={0}>
          <Headline as="h1" size="display" tone="ink" lines={HERO.title} />
        </Reveal>
        <Reveal order={1}>
          <HighlightBand>
            <p className="nse-sub max-w-[22ch]">
              <RichText text={HERO.subhead} />
            </p>
          </HighlightBand>
        </Reveal>
        <Reveal order={2}>
          <p className="nse-lead max-w-[32ch]">
            <RichText text={HERO.lead} />
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}
