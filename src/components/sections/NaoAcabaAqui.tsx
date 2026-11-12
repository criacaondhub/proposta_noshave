import { NAO_ACABA } from '@/config/content'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Headline } from '@/components/ui/Typography'

// 10 · T9 — Transição: foto full-bleed à esquerda + uma frase
export function NaoAcabaAqui() {
  return (
    <Slide
      tone="deep"
      backdrop={
        <PhotoFrame
          photo={NAO_ACABA.photo}
          edges={['right']}
          className="absolute inset-x-0 top-0 h-[55svh] md:inset-y-0 md:right-auto md:h-full md:w-[58%]"
        />
      }
      className="justify-end pb-[16svh] md:items-end md:justify-center md:pb-slide-y"
    >
      <Reveal order={0} className="md:w-[40%]">
        <Headline lines={NAO_ACABA.title} />
      </Reveal>
    </Slide>
  )
}
