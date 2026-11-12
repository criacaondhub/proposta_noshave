import { TbGift, TbGlassChampagne, TbUsersGroup } from 'react-icons/tb'
import { AMBIENTE } from '@/config/content'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

const ICONS = {
  networking: TbUsersGroup,
  hospitality: TbGlassChampagne,
  kit: TbGift,
} as const

// 07 · T4 — Networking e experiência (ícones de traço 1,5px)
export function Ambiente() {
  const { title, body, cards } = AMBIENTE

  return (
    <Slide orbs="right">
      <SectionHeading title={title} />
      <Reveal order={4} className="mx-auto mt-6 max-w-[46rem] text-center">
        <p className="nse-body">
          <RichText text={body} />
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:items-start md:gap-6">
        {cards.map((card, i) => {
          const Icon = ICONS[card.icon]
          return (
            <Reveal as="li" key={card.icon} step={i + 1} className="flex">
              <Card className="flex w-full flex-col gap-3 md:gap-4">
                {/* título com o ícone à direita */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-lead font-normal uppercase">{card.title}</h3>
                  <Icon aria-hidden className="size-7 shrink-0 text-blue-400 md:size-8" strokeWidth={1.5} />
                </div>
                <span aria-hidden className="h-px w-full bg-linear-to-r from-glow-300/50 to-transparent" />
                <p className="nse-body font-light">
                  <RichText text={card.text} />
                </p>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Slide>
  )
}
