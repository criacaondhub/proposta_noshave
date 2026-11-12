import type { HTMLAttributes } from 'react'
import { cn, pad2 } from '@/lib/utils'

const VARIANTS = {
  default: 'border-stroke-blue bg-surface-100 hover:bg-surface-200 hover:shadow-glow-cta',
  muted: 'border-line bg-transparent',
  featured: 'border-blue-500/60 bg-linear-to-b from-surface-200 to-surface-100 shadow-glow-cta',
} as const

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof VARIANTS
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-md border p-card transition-[background-color,box-shadow] duration-300', VARIANTS[variant], className)}
      {...props}
    />
  )
}

/* Número de etapa (T6): círculo com o número, o destaque é o topo da escada */
export function StepBadge({ n, highlight = false, className }: { n: number; highlight?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'grid size-12 shrink-0 place-items-center rounded-full border bg-bg-100 font-display text-body font-bold tabular-nums',
        highlight ? 'border-blue-500 text-blue-500 shadow-glow-cta' : 'border-stroke-blue text-ink',
        className,
      )}
    >
      {pad2(n)}
    </span>
  )
}
