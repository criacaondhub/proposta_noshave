import { TbBuildingHospital, TbLifebuoy, TbMicroscope, TbUsersGroup } from 'react-icons/tb'
import { BONUS_CIRURGIA } from '@/config/content'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'

const ICONS = {
  team: TbUsersGroup,
  equipment: TbMicroscope,
  structure: TbBuildingHospital,
  support: TbLifebuoy,
} as const

// 12 · Bônus 02 — centralizado: o que a diária inclui em 4 cards de vidro
export function BonusCirurgia() {
  const { eyebrow, title, subhead, includes, note } = BONUS_CIRURGIA

  return (
    <Slide orbs="wide" className="items-center text-center">
      <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} inline subheadSize="small" />

      <ul className="mt-8 grid w-full max-w-[62rem] grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
        {includes.map((item, i) => {
          const Icon = ICONS[item.icon]
          return (
            <Reveal as="li" key={item.icon} order={4 + i} className="flex">
              <Card className="flex w-full flex-col items-center gap-3 px-2 py-6 md:gap-4 md:px-4 md:py-8">
                <Icon aria-hidden className="size-8 text-blue-400 md:size-9" strokeWidth={1.5} />
                <span className="font-display text-caption font-normal uppercase md:text-lead">{item.label}</span>
              </Card>
            </Reveal>
          )
        })}
      </ul>

      <Reveal order={8} className="mt-6 md:mt-8">
        <p className="nse-body text-ink-muted">
          <RichText text={note} strongClassName="text-ink" />
        </p>
      </Reveal>
    </Slide>
  )
}
