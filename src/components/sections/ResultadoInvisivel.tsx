import { RESULTADO } from '@/config/content'
import { pad2 } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 03 · T4 — Grade de 3 cards: foto 4:3 emoldurada + legenda numerada (no mobile: foto à esquerda)
export function ResultadoInvisivel() {
  const { eyebrow, title, cards } = RESULTADO

  return (
    <Slide orbs="wide">
      <SectionHeading eyebrow={eyebrow} title={title} inline />

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:items-start md:gap-6">
        {cards.map((card, i) => (
          <Reveal as="li" key={card.text} step={i + 1} className="flex">
            <Card className="flex w-full items-center gap-4 p-2 md:flex-col md:items-stretch md:gap-0 md:p-2.5">
              <PhotoFrame
                photo={card.photo}
                fade={false}
                className="aspect-[4/3] w-[42%] shrink-0 rounded-sm ring-1 ring-ink/10 md:max-h-[30svh] md:w-full"
              />
              <div className="flex flex-col gap-2 py-2 pr-2 md:gap-3 md:px-4 md:pt-5 md:pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-caption font-bold tabular-nums text-blue-400">{pad2(i + 1)}</span>
                  <span aria-hidden className="h-px w-10 bg-linear-to-r from-glow-300 to-transparent" />
                </div>
                <p className="nse-body text-balance">{card.text}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Slide>
  )
}
