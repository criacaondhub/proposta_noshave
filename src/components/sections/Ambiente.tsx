import { TbGift, TbGlassChampagne, TbUsersGroup } from 'react-icons/tb'
import { AMBIENTE } from '@/config/content'
import { cn } from '@/lib/utils'
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

      {/* ≥ 1280px: uma fileira com a largura do maior título (w-max + colunas 1fr iguais),
          então cada título cabe em uma linha e os três cards ficam com a mesma largura.
          768–1279px: 2 + 1 (o terceiro centralizado), porque três títulos inteiros não cabem lado a lado. */}
      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:items-start xl:w-max xl:max-w-none xl:grid-cols-3 xl:self-center">
        {cards.map((card, i) => {
          const Icon = ICONS[card.icon]
          const last = i === cards.length - 1
          return (
            <Reveal
              as="li"
              key={card.icon}
              step={i + 1}
              className={cn('flex', last && 'md:max-xl:col-span-2 md:max-xl:w-[calc(50%-0.5rem)] md:max-xl:justify-self-center')}
            >
              <Card className="flex w-full flex-col gap-3 md:gap-4 md:px-6">
                {/* ícone à esquerda do título */}
                <div className="flex items-center gap-3">
                  <Icon aria-hidden className="size-7 shrink-0 text-blue-400 md:size-8" strokeWidth={1.5} />
                  <h3 className="font-display text-lead font-normal uppercase lg:whitespace-nowrap">{card.title}</h3>
                </div>
                <span aria-hidden className="h-px w-full bg-linear-to-r from-glow-300/50 to-transparent" />
                {/* o texto acompanha a largura do card, sem alargá-lo */}
                <p className="nse-body xl:w-0 xl:min-w-full">
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
