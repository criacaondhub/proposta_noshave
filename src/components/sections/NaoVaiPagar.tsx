import { NAO_VAI_PAGAR } from '@/config/content'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { GlowDivider } from '@/components/ui/Typography'

// 14 · T9 (sem foto) — Uma frase sobre bg-000 com um único feixe de luz horizontal
export function NaoVaiPagar() {
  return (
    <Slide tone="deep" ambient="beam" orbs="center" className="items-center text-center">
      <Reveal order={0}>
        <h2 className="max-w-[18ch] font-display text-headline text-balance">
          <RichText text={NAO_VAI_PAGAR.phrase} strongClassName="font-semibold text-blue-400" />
        </h2>
      </Reveal>
      <Reveal order={2} className="mt-10 flex w-full justify-center md:mt-14">
        <GlowDivider className="max-w-[56rem]" />
      </Reveal>
    </Slide>
  )
}
