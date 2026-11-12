import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useSlide } from '@/lib/deck'

const EASE = [0.22, 1, 0.36, 1] as const
const TAGS = { div: motion.div, li: motion.li, p: motion.p } as const

interface RevealProps {
  children: ReactNode
  /** 0 = entra com o slide; n = n-ésima etapa revelada ao avançar */
  step?: number
  /** posição na cascata dentro da mesma etapa (selo → headline → corpo → resto) */
  order?: number
  as?: keyof typeof TAGS
  /** atraso extra em segundos (ex.: esperar o logo da capa terminar de desenhar) */
  delay?: number
  className?: string
}

export function Reveal({ children, step = 0, order = 0, as = 'div', delay = 0, className }: RevealProps) {
  const { inView, revealed, stepMode } = useSlide()
  const reduceMotion = useReducedMotion()
  const visible = inView && revealed >= step
  const Tag = TAGS[as]

  // Sem modo etapas (mobile/touch) as etapas entram em cascata logo depois do cabeçalho.
  const stepDelay = step > 0 && !stepMode ? 0.35 + (step - 1) * 0.14 : 0
  const offset = reduceMotion ? 0 : 20

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: offset }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={
        visible
          ? { duration: 0.6, ease: EASE, delay: delay + stepDelay + order * 0.08 }
          : { duration: 0.3, ease: 'easeIn' }
      }
      inert={inView && !visible}
    >
      {children}
    </Tag>
  )
}
