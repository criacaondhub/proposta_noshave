import type { ReactNode } from 'react'
import { SITE } from '@/config/content'
import { useDeck, useSlide } from '@/lib/deck'
import { cn, pad2 } from '@/lib/utils'
import { CellGrid } from './backgrounds/CellGrid'
import { GlowOrb } from './backgrounds/GlowOrb'
import { ORB_PRESETS, type OrbPreset } from './backgrounds/orbPresets'
import { GradientBlinds, type GradientBlindsProps } from './backgrounds/GradientBlinds'

/* Fundos animados no padrão da proposta FUE, nas cores do No Shave (blue-500 → blue-950) */
const AMBIENTS = {
  /* cortina padrão: opacidade 22% */
  blinds: { layer: 'opacity-[0.22]', props: { colors: ['#058cff'] } },
  /* cortina em degradê inclinada, mais presente (transições e preço) */
  beam: {
    layer: 'opacity-50',
    props: {
      colors: ['#058cff', '#01136d'],
      angle: 12,
      noise: 0.25,
      blindCount: 22,
      blindMinWidth: 28,
      spotlightRadius: 0.4,
      spotlightOpacity: 0.8,
    },
  },
} satisfies Record<string, { layer: string; props: GradientBlindsProps }>

interface SlideProps {
  children: ReactNode
  /** default = bg-100; deep = bg-000 (foto full-bleed e transições) */
  tone?: 'default' | 'deep'
  /** efeito de fundo: cortina de luz, grade de células ou nenhum */
  ambient?: keyof typeof AMBIENTS | 'grid' | 'none'
  orbs?: OrbPreset
  /** camadas extras atrás do conteúdo (fotos) */
  backdrop?: ReactNode
  className?: string
}

export function Slide({ children, tone = 'default', ambient = 'blinds', orbs = 'corners', backdrop, className }: SlideProps) {
  const { index, label } = useSlide()
  const { current, total } = useDeck()
  // WebGL só no slide atual (animado) e nos vizinhos (quadro parado)
  const near = Math.abs(index - current) <= 1

  return (
    <section
      data-slide={index}
      aria-roledescription="slide"
      aria-label={`${pad2(index + 1)} ${SITE.slideOf} ${pad2(total)} · ${label}`}
      className={cn(
        'relative isolate flex min-h-svh w-full shrink-0 snap-start snap-always overflow-hidden md:h-svh md:min-h-0',
        tone === 'deep' ? 'bg-bg-000' : 'bg-bg-100',
      )}
    >
      <div className="absolute inset-0 -z-10">
        {(ambient === 'blinds' || ambient === 'beam') && (
          <div className={cn('absolute inset-0', AMBIENTS[ambient].layer)}>
            <GradientBlinds {...AMBIENTS[ambient].props} mounted={near} playing={index === current} />
          </div>
        )}
        {ambient === 'grid' && (
          // grade discreta, dissolvendo nas bordas
          <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_55%,black_0%,transparent_75%)]">
            <CellGrid cellOpacity={0.16} gridOpacity={0.03} lineWidth={1} />
          </div>
        )}
        {ORB_PRESETS[orbs].map((orb, i) => (
          <GlowOrb key={i} {...orb} />
        ))}
        {backdrop}
      </div>
      <div className={cn('relative mx-auto flex w-full max-w-page flex-col justify-center px-slide-x py-slide-y', className)}>
        {children}
      </div>
    </section>
  )
}
