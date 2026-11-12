import type { GlowOrbProps } from './GlowOrb'

/* Combinações de orbes usadas na referência (posição, tamanho e opacidade) */
export const ORB_PRESETS = {
  corners: [
    { size: 500, top: -160, right: -120, opacity: 0.22 },
    { size: 300, bottom: -80, left: -60, opacity: 0.15 },
  ],
  wide: [
    { size: 700, top: '-25%', left: '-10%', opacity: 0.15 },
    { size: 500, bottom: '-20%', right: '-5%', opacity: 0.1 },
  ],
  strong: [
    { size: 520, top: '-15%', left: '-12%', opacity: 0.35 },
    { size: 480, bottom: '-18%', right: '-10%', opacity: 0.3 },
  ],
  center: [{ size: 900, top: '5%', left: '25%', opacity: 0.2 }],
  right: [
    { size: 800, top: '10%', right: '-20%', opacity: 0.2 },
    { size: 400, bottom: '0%', left: '-5%', opacity: 0.1, tone: 'azure' },
  ],
  left: [{ size: 700, top: '-10%', left: '-15%', opacity: 0.18 }],
  none: [],
} satisfies Record<string, GlowOrbProps[]>

export type OrbPreset = keyof typeof ORB_PRESETS
