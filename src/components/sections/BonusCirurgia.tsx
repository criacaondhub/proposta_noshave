import { BONUS_CIRURGIA } from '@/config/content'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { Eyebrow, GlowDivider, Headline, HighlightBand } from '@/components/ui/Typography'

// 12 · T5 — Editorial com fechadura: foto recortada à esquerda, faixa sangrando à direita
export function BonusCirurgia() {
  const { eyebrow, title, band, body, photo } = BONUS_CIRURGIA

  return (
    <Slide className="md:grid md:grid-cols-12 md:items-center md:gap-gutter">
      <Reveal order={0} className="mx-auto aspect-[100/160] h-[36svh] md:col-span-5 md:h-[72svh]">
        <PhotoFrame photo={photo} keyhole className="h-full w-full" />
      </Reveal>

      <div className="mt-6 flex flex-col items-start gap-4 md:col-span-7 md:mt-0 md:gap-6">
        <Reveal order={1}>
          <Eyebrow text={eyebrow} />
        </Reveal>
        <Reveal order={2}>
          <Headline lines={title} />
        </Reveal>
        <Reveal order={3} className="w-full">
          <HighlightBand>
            <p className="nse-sub max-w-[24ch]">
              <RichText text={band} />
            </p>
          </HighlightBand>
        </Reveal>
        <Reveal order={4} className="w-full">
          <GlowDivider variant="left" />
        </Reveal>
        <Reveal order={5}>
          <p className="nse-body max-w-[34rem]">
            <RichText text={body} />
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}
