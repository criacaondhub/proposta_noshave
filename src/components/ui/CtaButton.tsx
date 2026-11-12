import type { ReactNode } from 'react'
import { CONFIG, isPending } from '@/config/content'
import { cn } from '@/lib/utils'

interface CtaButtonProps {
  children: ReactNode
  href?: string
  /** halo pulsando — reservado ao CTA final */
  pulse?: boolean
  size?: 'default' | 'sm'
  className?: string
}

export function CtaButton({ children, href = CONFIG.CTA_URL, pulse = false, size = 'default', className }: CtaButtonProps) {
  const classes = cn('nse-cta', size === 'sm' && 'sm', pulse && 'animate-glow-pulse motion-reduce:animate-none', className)
  // Enquanto o destino estiver pendente, aparece como botão sem ação (não um link sem destino).
  if (isPending(href)) {
    return (
      <button type="button" aria-disabled className={classes}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  )
}
