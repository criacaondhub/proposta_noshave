import { TURMA } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 04 · T2 — Impacto centralizado + as 4 cadeiras acendendo em sequência
export function QuatroMedicos() {
  const { eyebrow, title, body } = TURMA

  return (
    <Slide ambient="grid" orbs="wide" className="items-center text-center">
      <SectionHeading eyebrow={eyebrow} title={title} divider />
      <Reveal order={4} className="mt-6">
        <p className="nse-body mx-auto max-w-[44rem]">
          <RichText text={body} />
        </p>
      </Reveal>
      <Reveal order={5} className="mt-8 w-full max-w-[40rem] md:mt-12">
        <Seats />
      </Reveal>
    </Slide>
  )
}

function Seats() {
  const { inView } = useSlide()

  return (
    <ul className="grid grid-cols-4 gap-3 md:gap-5">
      {TURMA.seats.map((seat, i) => {
        // cada cadeira acende depois do cabeçalho, uma a uma
        const delay = { transitionDelay: inView ? `${0.9 + i * 0.3}s` : '0s' }
        return (
          <li
            key={seat}
            style={delay}
            className={cn(
              'nse-card flex aspect-[3/4] flex-col items-center justify-end overflow-hidden pb-3 duration-700 md:max-h-[24svh] md:pb-4',
              inView && 'shadow-glow-cta',
            )}
          >
            {/* contorno aceso (opacidade anima com atraso; gradiente não anima) */}
            <span
              aria-hidden
              style={delay}
              className={cn(
                'absolute inset-0 rounded-[inherit] border border-blue-500/70 transition-opacity duration-700',
                inView ? 'opacity-100' : 'opacity-0',
              )}
            />
            <span
              aria-hidden
              style={delay}
              className={cn(
                'absolute inset-0 bg-[linear-gradient(180deg,rgb(44_162_246/0.4),transparent_70%)] transition-opacity duration-700',
                inView ? 'opacity-100' : 'opacity-0',
              )}
            />
            <span
              aria-hidden
              style={delay}
              className={cn(
                'absolute inset-x-[18%] top-0 h-0.5 rounded-full bg-glow-100 shadow-glow-flare transition-opacity duration-700',
                inView ? 'opacity-100' : 'opacity-0',
              )}
            />
            <span
              style={delay}
              className={cn(
                'relative font-display text-headline-compact font-bold transition-colors duration-700',
                inView ? 'text-ink' : 'text-ink-muted',
              )}
            >
              <span className="sr-only">{TURMA.seatLabel} </span>
              {seat}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
