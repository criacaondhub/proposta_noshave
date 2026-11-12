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
      ambient="none"
      orbs="right"
      backdrop={
        <PhotoFrame
          photo={NAO_ACABA.photo}
          graded={false}
          edges={['right']}
          className="absolute inset-x-0 top-0 h-[55svh] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:inset-y-0 md:right-auto md:aspect-[4/5] md:h-full md:w-auto md:max-w-[58%] md:[mask-image:none]"
          imgClassName="object-[50%_18%] md:object-[50%_30%]"
        />
      }
      className="justify-end pb-[16svh] md:items-end md:justify-center md:pb-slide-y"
    >
      <Reveal order={0} className="md:w-[46%]">
        <Headline lines={NAO_ACABA.title} />
      </Reveal>
    </Slide>
  )
}
