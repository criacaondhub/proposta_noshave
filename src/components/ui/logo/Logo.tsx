import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { LOGO_CROP, LOGO_LETTERS, LOGO_LINE, LOGO_VIEWBOX } from './logoPaths'

const { width: W, height: H } = LOGO_VIEWBOX
const VIEWBOX = `${LOGO_CROP.x} 0 ${LOGO_CROP.width} ${H}`

/* Linha de luz: some nas pontas e é mais intensa no centro (perfil medido no logo original) */
function LineGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" x2={W} gradientUnits="userSpaceOnUse">
      <stop offset="0.1" stopColor="#fff" stopOpacity="0" />
      <stop offset="0.25" stopColor="#fff" stopOpacity="0.8" />
      <stop offset="0.42" stopColor="#fff" />
      <stop offset="0.66" stopColor="#fff" />
      <stop offset="0.86" stopColor="#fff" stopOpacity="0.1" />
      <stop offset="0.98" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
  )
}

/* Logo estático (header) */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return (
    <svg viewBox={VIEWBOX} aria-hidden className={cn('block h-auto', className)} style={{ aspectRatio: `${LOGO_CROP.width} / ${H}` }}>
      <defs>
        <LineGradient id={`${id}-line`} />
      </defs>
      <g fill="currentColor" fillRule="evenodd">
        {LOGO_LETTERS.map((letter, i) => (
          <path key={i} d={letter.d} />
        ))}
      </g>
      <rect x="0" y={LOGO_LINE.y} width={W} height={LOGO_LINE.height} fill={`url(#${id}-line)`} />
    </svg>
  )
}

/* Tempos do desenho (mesma cadência da capa do SelfMed Club) */
const EASE = [0.65, 0, 0.35, 1] as const
const DRAW = 2.2 // traço de cada letra
const STAGGER = 0.06 // intervalo entre letras
const FILL = 1.2 // preenchimento entrando / traço saindo
const SHEEN = 1.6 // brilho atravessando

interface LogoRevealProps {
  /** dispara o desenho; ao sair de cena o logo volta ao início */
  play: boolean
  label: string
  delay?: number
  className?: string
}

/* Logo da capa: desenhado letra por letra com traço metálico azul */
export function LogoReveal({ play, label, delay = 0.1, className }: LogoRevealProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const reduceMotion = useReducedMotion()
  const fillAt = delay + DRAW * 0.7
  const sheenAt = fillAt + FILL * 0.6 + STAGGER * LOGO_LETTERS.length

  if (reduceMotion) return <LogoMark className={className} />

  return (
    <svg
      viewBox={VIEWBOX}
      role="img"
      aria-label={label}
      className={cn('block h-auto overflow-visible', className)}
      style={{ aspectRatio: `${LOGO_CROP.width} / ${H}` }}
    >
      <defs>
        {/* traço metálico: o reflexo corre pelas letras enquanto desenham */}
        <linearGradient id={`${id}-metal`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W * 0.5} y2={H * 0.5} spreadMethod="reflect">
          <stop offset="0" stopColor="var(--color-stroke-blue)" />
          <stop offset="0.35" stopColor="var(--color-blue-400)" />
          <stop offset="0.5" stopColor="var(--color-ink)" />
          <stop offset="0.65" stopColor="var(--color-glow-100)" />
          <stop offset="1" stopColor="var(--color-stroke-blue)" />
          <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to={`${W} ${H}`} dur="3s" repeatCount="indefinite" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-photo-highlight)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-photo-highlight)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--color-photo-highlight)" stopOpacity="0" />
        </linearGradient>
        <LineGradient id={`${id}-line`} />
        <filter id={`${id}-glow`} x="-50%" y="-400%" width="200%" height="900%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id={`${id}-clip`}>
          {LOGO_LETTERS.map((letter, i) => (
            <path key={i} d={letter.d} />
          ))}
        </clipPath>
      </defs>

      {/* letras: traço desenhando → preenchimento entrando → traço sumindo */}
      {LOGO_LETTERS.map((letter, i) => (
        <motion.path
          key={i}
          d={letter.d}
          fill="var(--color-ink)"
          fillRule="evenodd"
          stroke={`url(#${id}-metal)`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
          animate={play ? { pathLength: 1, fillOpacity: 1, strokeOpacity: 0 } : { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
          transition={
            play
              ? {
                  pathLength: { duration: DRAW, delay: delay + i * STAGGER, ease: EASE },
                  fillOpacity: { duration: FILL, delay: fillAt + i * STAGGER * 0.5, ease: 'easeOut' },
                  strokeOpacity: { duration: FILL, delay: fillAt + FILL * 0.5, ease: 'easeOut' },
                }
              : { duration: 0 }
          }
        />
      ))}

      {/* linha de luz abrindo do centro, com núcleo ciano */}
      <motion.rect
        x="0"
        y={LOGO_LINE.y}
        width={W}
        height={LOGO_LINE.height}
        fill={`url(#${id}-line)`}
        style={{ transformBox: 'fill-box', transformOrigin: '54% 50%' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={play ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={play ? { duration: 1.4, delay: delay + 0.9, ease: EASE } : { duration: 0 }}
      />
      <motion.ellipse
        cx={W * 0.54}
        cy={LOGO_LINE.y + LOGO_LINE.height / 2}
        rx="70"
        ry="3"
        fill="var(--color-glow-100)"
        filter={`url(#${id}-glow)`}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0, 1, 0.55] } : { opacity: 0 }}
        transition={play ? { duration: 1.8, delay: delay + 1.2, times: [0, 0.4, 1] } : { duration: 0 }}
      />

      {/* brilho atravessando o logo, recortado pelas letras */}
      <g clipPath={`url(#${id}-clip)`}>
        <motion.rect
          y={-H * 0.25}
          width={W * 0.3}
          height={H * 1.5}
          fill={`url(#${id}-sheen)`}
          style={{ skewX: -20 }}
          initial={{ x: -W * 0.4 }}
          animate={play ? { x: W * 1.1 } : { x: -W * 0.4 }}
          transition={play ? { duration: SHEEN, delay: sheenAt, ease: EASE, repeat: Infinity, repeatDelay: 6 } : { duration: 0 }}
        />
      </g>
    </svg>
  )
}
