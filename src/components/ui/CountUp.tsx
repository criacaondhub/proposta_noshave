import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { cn, formatNumber } from '@/lib/utils'

interface CountUpProps {
  value: number
  /** começa a contar quando vira true (slide em cena / etapa revelada) */
  start: boolean
  duration?: number
  className?: string
}

export function CountUp({ value, start, duration = 1.6, className }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(value)
  const text = useTransform(count, (v) => formatNumber(Math.round(v)))

  useEffect(() => {
    if (!start) return
    if (reduceMotion) {
      count.set(value)
      return
    }
    count.set(0)
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [start, value, duration, reduceMotion, count])

  return <motion.span className={cn('tabular-nums', className)}>{text}</motion.span>
}
