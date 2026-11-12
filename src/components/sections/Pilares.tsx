import { PILARES } from '@/config/content'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

// 06 · T4 (colunas de texto) — Os 3 pilares, mesma altura e texto alinhado ao topo
export function Pilares() {
  const { title, pillars } = PILARES

  return (
    <Slide orbs="center">
      <SectionHeading title={title} />

      <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:items-start md:gap-6">
        {pillars.map((pillar, i) => (
          <Reveal as="li" key={pillar.title} step={i + 1} className="flex">
            <Card className="flex w-full flex-col gap-3">
              <p className="text-eyebrow text-blue-400 uppercase">{pillar.eyebrow}</p>
              <h3 className="font-display text-lead font-normal uppercase">{pillar.title}</h3>
              <p className="nse-body">
                <RichText text={pillar.text} />
              </p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Slide>
  )
}
