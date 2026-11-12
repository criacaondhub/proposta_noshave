import { RESULTADO } from '@/config/content'
import { Card } from '@/components/ui/Card'
import { PhotoFrame } from '@/components/ui/PhotoFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 03 · T4 — Grade de 3 cards com foto 4:3 (no mobile: foto à esquerda do texto)
export function ResultadoInvisivel() {
  const { eyebrow, title, cards } = RESULTADO

  return (
    <Slide orbs="wide">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
        {cards.map((card, i) => (
          <Reveal as="li" key={card.text} step={i + 1} className="flex">
            <Card className="flex w-full items-center gap-4 overflow-hidden p-0 md:flex-col md:items-stretch md:gap-0">
              <PhotoFrame photo={card.photo} fade={false} className="aspect-[4/3] w-[42%] shrink-0 md:max-h-[30svh] md:w-full" />
              <p className="nse-body py-3 pr-4 md:p-card">{card.text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Slide>
  )
}
