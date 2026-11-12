import { motion } from 'framer-motion'
import { METODO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'
import { Card, StepBadge } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// Degraus alinhados pela base, cada um mais alto que o anterior
const STAIR_HEIGHTS = ['md:h-[58%]', 'md:h-[78%]', 'md:h-full']
// Centro de cada número (x, y em % da área dos degraus) para a linha de luz
const STAIR_POINTS = [
  [16, 42],
  [50, 22],
  [84, 0],
]

// 05 · T6 — As 3 etapas do método subindo como degraus
export function ArquiteturaMetodo() {
  const { title, steps } = METODO
  const { revealed } = useSlide()

  return (
    <Slide orbs="left">
      <SectionHeading title={title} align="left" />

      <ol className="relative mt-8 flex flex-col gap-4 pl-16 md:mt-auto md:h-[44svh] md:flex-row md:items-end md:gap-6 md:pl-0">
        {/* mobile: trilho de luz na lateral esquerda */}
        <span aria-hidden className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-blue-600 to-glow-300 md:hidden" />
        {/* desktop: linha de luz ligando os números */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible drop-shadow-[0_0_6px_rgb(44_162_246/0.9)] md:block"
        >
          {STAIR_POINTS.slice(1).map(([x2, y2], i) => {
            const [x1, y1] = STAIR_POINTS[i]
            return (
              <motion.line
                key={x2}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-glow-300)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                animate={{ opacity: revealed >= i + 2 ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              />
            )
          })}
        </svg>

        {steps.map((step, i) => {
          const top = i === steps.length - 1
          return (
            <Reveal as="li" key={step.title} step={i + 1} className={cn('relative md:flex-1', STAIR_HEIGHTS[i])}>
              <Card variant={top ? 'featured' : 'default'} className="h-full md:pt-10">
                <h3 className={cn('font-display text-lead font-semibold uppercase', top && 'text-blue-500')}>{step.title}</h3>
                <p className="nse-body mt-3">{step.text}</p>
              </Card>
              <StepBadge
                n={i + 1}
                highlight={top}
                className="absolute top-0 -left-16 md:-top-6 md:left-1/2 md:-translate-x-1/2"
              />
            </Reveal>
          )
        })}
      </ol>
    </Slide>
  )
}
