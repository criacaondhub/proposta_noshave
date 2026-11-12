import { useState } from 'react'
import { DEPOIMENTOS } from '@/config/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SectionHeading } from '@/components/ui/Typography'
import { VideoPlayer } from '@/components/ui/VideoPlayer'

// 09 · T2 com player — 16:9 centralizado; vira carrossel se houver mais de um vídeo
export function Depoimentos() {
  const { title, videos, playLabel, pendingLabel, bulletLabel } = DEPOIMENTOS
  const [active, setActive] = useState(0)

  return (
    <Slide className="items-center">
      <SectionHeading title={title} />

      <Reveal order={3} className="mt-8 w-[min(100%,56rem,calc((100svh_-_21rem)_*_16_/_9))] md:mt-10">
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
