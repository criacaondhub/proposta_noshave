import type { HTMLAttributes } from 'react'
import { cn, pad2 } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** default = vidro azul; featured = destaque com halo; muted = lado "apagado" do comparativo */
  variant?: 'default' | 'muted' | 'featured'
}

/* Card — material de vidro escuro com borda de luz (.nse-card no index.css) */
export function Card({ variant = 'default', className, ...props }: CardProps) {
  return <div className={cn('nse-card p-card', variant !== 'default' && variant, className)} {...props} />
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
