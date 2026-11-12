import { IMERSAO } from '@/config/content'
import { Card, StepBadge } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { HighlightBand, SectionHeading } from '@/components/ui/Typography'

// 08 · T6 — Conteúdo dos 2 dias: ①──②──③, cards e faixa de rodapé
export function DoisDias() {
  const { title, cards, footer } = IMERSAO

  return (
    <Slide>
      <SectionHeading title={title} size="compact" align="left" />

      <ol className="relative mt-8 grid gap-4 pl-16 md:mt-10 md:grid-cols-3 md:items-start md:gap-6 md:pl-0">
        {/* mobile: trilho de luz na lateral esquerda */}
        <span aria-hidden className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-blue-600 to-glow-300 md:hidden" />

        {cards.map((card, i) => (
          <Reveal as="li" key={card.title} step={i + 1} className="relative flex flex-col">
            <div className="absolute top-0 -left-16 md:static md:mb-4 md:flex md:items-center md:gap-4">
              <StepBadge n={i + 1} />
              {i < cards.length - 1 && (
                <span aria-hidden className="hidden h-0.5 flex-1 bg-linear-to-r from-glow-300 to-blue-600/0 md:-mr-6 md:block" />
              )}
            </div>
            <Card>
              <h3 className="font-display text-lead font-semibold uppercase">{card.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {card.items.map((item) => (
                  <li key={item.text} className="nse-body">
                    {item.label && <em className="font-bold text-blue-400">{item.label}: </em>}
                    {item.text}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </ol>

      <Reveal step={cards.length + 1} className="mt-6 md:mt-8">
        <HighlightBand>
          <p className="nse-lead">
            <RichText text={footer} strongClassName="text-blue-400" />
          </p>
        </HighlightBand>
      </Reveal>
    </Slide>
  )
}
