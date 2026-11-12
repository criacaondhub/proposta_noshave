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
  // Enquanto o destino estiver pendente, o botão aparece mas não navega.
  const ready = !isPending(href)
  return (
    <a
      href={ready ? href : undefined}
      target={ready ? '_blank' : undefined}
      rel={ready ? 'noopener noreferrer' : undefined}
      aria-disabled={ready ? undefined : true}
      className={cn('nse-cta', size === 'sm' && 'sm', pulse && 'animate-glow-pulse motion-reduce:animate-none', className)}
    >
      {children}
    </a>
  )
}
