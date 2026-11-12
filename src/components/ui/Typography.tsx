import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { RichText } from './RichText'

/* Eyebrow — selo de contraste acima do headline (_trecho_ = itálico na virada) */
export function Eyebrow({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn('nse-eyebrow', className)}>
      <RichText text={text} />
    </p>
  )
}

/* Headline — CAIXA ALTA em duas cores: 1ª linha ink, demais em royal (blue-600) ou azure (blue-500) */
const HEADLINE_SIZES = {
  display: 'text-display-xl',
  default: 'text-headline',
  compact: 'text-headline-compact',
} as const

const HEADLINE_TONES = {
  royal: 'text-blue-600',
  azure: 'text-blue-500',
  ink: 'text-ink',
} as const

interface HeadlineProps {
  lines: readonly string[]
  as?: 'h1' | 'h2'
  size?: keyof typeof HEADLINE_SIZES
  tone?: keyof typeof HEADLINE_TONES
  className?: string
}

export function Headline({ lines, as: Tag = 'h2', size = 'default', tone = 'royal', className }: HeadlineProps) {
  const [first, ...rest] = lines
  return (
    <Tag className={cn('font-display text-balance text-ink uppercase', HEADLINE_SIZES[size], className)}>
      <span className="block">{first}</span>
      {rest.map((line) => (
        <span key={line} className={cn('block', HEADLINE_TONES[tone])}>
          {line}
        </span>
      ))}
    </Tag>
  )
}

/* GlowDivider — linha de luz com núcleo ciano; "left" é a variante lateral */
export function GlowDivider({ variant = 'center', className }: { variant?: 'center' | 'left'; className?: string }) {
  return <div aria-hidden className={cn('nse-divider', variant === 'left' && 'left', className)} />
}

/* HighlightBand — faixa que satura para blue-800 sangrando até a borda direita */
export function HighlightBand({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('nse-band', className)}>{children}</div>
}

/* Cabeçalho padrão dos slides: selo → headline → luz → subtítulo, em cascata */
interface SectionHeadingProps {
  title: readonly string[]
  eyebrow?: string
  subhead?: string
  divider?: boolean
  size?: HeadlineProps['size']
  tone?: HeadlineProps['tone']
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  title,
  eyebrow,
  subhead,
  divider = false,
  size = 'default',
  tone = 'royal',
  align = 'center',
  className,
}: SectionHeadingProps) {
  const center = align === 'center'
  return (
    <div className={cn('flex flex-col gap-4 md:gap-5', center ? 'items-center text-center' : 'items-start text-left', className)}>
      {eyebrow && (
        <Reveal order={0}>
          <Eyebrow text={eyebrow} />
        </Reveal>
      )}
      <Reveal order={1}>
        <Headline lines={title} size={size} tone={tone} />
      </Reveal>
      {divider && (
        <Reveal order={2} className={cn('flex w-full', center && 'justify-center')}>
          <GlowDivider variant={center ? 'center' : 'left'} />
        </Reveal>
      )}
      {subhead && (
        <Reveal order={3}>
          <p className="nse-sub">
            <RichText text={subhead} />
          </p>
        </Reveal>
      )}
    </div>
  )
}
