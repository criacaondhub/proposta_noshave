import { useState } from 'react'
import { DEPOIMENTOS } from '@/config/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'
import { VideoPlayer } from '@/components/ui/VideoPlayer'

// 09 · Depoimento em vídeo vertical (Shorts) à esquerda e título em 3 linhas à direita.
// No mobile o título vem primeiro. Vira carrossel se houver mais de um vídeo.
export function Depoimentos() {
  const { title, videos, playLabel, pendingLabel, bulletLabel } = DEPOIMENTOS
  const [active, setActive] = useState(0)

  return (
    <Slide
      orbs="center"
      className="items-center md:grid md:grid-cols-[auto_auto] md:items-center md:justify-center md:gap-x-16 lg:gap-x-24"
    >
      <SectionHeading
        title={title}
        align="left"
        className="order-1 items-center text-center md:order-2 md:items-start md:text-left"
      />

      {/* altura guiada pela tela; a largura sai da proporção 9:16 */}
      <Reveal order={3} className="order-2 mt-8 w-[min(72vw,20rem)] md:order-1 md:mt-0 md:w-[calc(min(72svh,44rem)*9/16)]">
        <VideoPlayer key={active} video={videos[active]} playLabel={playLabel} pendingLabel={pendingLabel} />

        {videos.length > 1 && (
          <div className="mt-4 flex justify-center gap-1">
            {videos.map((video, i) => (
              <button
                key={video.title + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${bulletLabel} ${i + 1}`}
                aria-current={i === active}
                className="grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    'size-2 rounded-full transition-colors',
                    i === active ? 'bg-glow-100 shadow-glow-flare' : 'bg-ink-muted',
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </Reveal>
    </Slide>
  )
}
