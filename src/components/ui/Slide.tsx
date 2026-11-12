import type { ReactNode } from 'react'
import { SITE } from '@/config/content'
import { useDeck, useSlide } from '@/lib/deck'
import { cn, pad2 } from '@/lib/utils'

interface SlideProps {
  children: ReactNode
  /** default = bg-100 com luz no topo; deep = bg-000 (foto full-bleed e transições) */
  tone?: 'default' | 'deep'
  /** camadas atrás do conteúdo: fotos e feixes de luz */
  backdrop?: ReactNode
  className?: string
}

export function Slide({ children, tone = 'default', backdrop, className }: SlideProps) {
  const { index, label } = useSlide()
  const { total } = useDeck()

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
        {backdrop ??
          (tone === 'default' && (
            <div className="h-full w-full bg-[radial-gradient(70%_55%_at_50%_0%,rgb(0_97_228/0.16),transparent_70%)]" />
          ))}
      </div>
      <div className={cn('relative mx-auto flex w-full max-w-page flex-col justify-center px-slide-x py-slide-y', className)}>
        {children}
      </div>
    </section>
  )
}
