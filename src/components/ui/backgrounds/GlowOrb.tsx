import { cn } from '@/lib/utils'

/* Orbe de luz desfocado (blur 120px) — mesmo recurso da proposta FUE, nas cores do No Shave */
const TONES = {
  royal: 'bg-[radial-gradient(circle_at_center,rgb(0_97_228/0.7)_0%,rgb(1_19_109/0.5)_50%,transparent_75%)]',
  azure: 'bg-[radial-gradient(circle_at_center,rgb(5_140_255/0.85)_0%,rgb(0_35_132/0.6)_45%,transparent_75%)]',
} as const

export interface GlowOrbProps {
  size: number
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  opacity?: number
  tone?: keyof typeof TONES
}

export function GlowOrb({ size, top, left, right, bottom, opacity = 0.55, tone = 'royal' }: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute rounded-full blur-[120px]', TONES[tone])}
      style={{ width: size, height: size, top, left, right, bottom, opacity }}
    />
  )
}
