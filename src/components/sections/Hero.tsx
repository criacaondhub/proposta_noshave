import { HERO, SITE } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { LogoReveal } from '@/components/ui/logo/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'

// O texto entra quando o logo termina de desenhar
const AFTER_LOGO = 2.6

// 01 · Capa — logo centralizado se desenhando (motion design), texto em seguida
export function Hero() {
  const { inView } = useSlide()

  return (
    <Slide tone="deep" orbs="center" className="items-center text-center">
      <h1 className="w-[clamp(17rem,min(62vw,74svh),46rem)]">
        <LogoReveal play={inView} label={SITE.wordmark} className="w-full" />
      </h1>

      <Reveal delay={AFTER_LOGO} order={0} className="mt-10 md:mt-14">
        <p className="nse-sub max-w-[30ch] text-balance">
          <RichText text={HERO.subhead} />
        </p>
      </Reveal>
      <Reveal delay={AFTER_LOGO} order={1} className="mt-4 md:mt-5">
        <p className="nse-body max-w-[36ch]">
          <RichText text={HERO.lead} strongClassName="text-ink" />
        </p>
      </Reveal>
    </Slide>
  )
}
