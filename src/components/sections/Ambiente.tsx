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
              <Card className="flex w-full items-start gap-4 md:flex-col md:gap-5">
                <Icon aria-hidden className="size-8 shrink-0 text-blue-400 md:size-10" strokeWidth={1.5} />
                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="font-display text-lead font-normal uppercase">{card.title}</h3>
                  <p className="nse-body">
                    <RichText text={card.text} />
                  </p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Slide>
  )
}
