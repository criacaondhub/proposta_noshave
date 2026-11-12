import { useState } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { isPending, type Photo } from '@/config/content'
import { toEmbedUrl } from '@/lib/utils'
import { PhotoFrame } from './PhotoFrame'

export interface Video {
  src: string
  title: string
  poster: Photo
}

interface VideoPlayerProps {
  video: Video
  playLabel: string
  pendingLabel: string
}

export function VideoPlayer({ video, playLabel, pendingLabel }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const pending = isPending(video.src)
  const embed = pending ? null : toEmbedUrl(video.src)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md border border-stroke-blue bg-bg-000 shadow-glow-cta">
      {playing ? (
        embed ? (
          <iframe
            src={embed}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video src={video.src} title={video.title} controls autoPlay playsInline className="absolute inset-0 h-full w-full" />
        )
      ) : (
        <>
          {/* capa com as cores originais do vídeo (sem grade azul nem vinheta) */}
          <PhotoFrame photo={video.poster} graded={false} fade={false} className="absolute inset-0" />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            disabled={pending}
            aria-label={pending ? pendingLabel : `${playLabel}: ${video.title}`}
            className="absolute top-1/2 left-1/2 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-bg-000/30 text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink/40 hover:bg-ink/10 disabled:cursor-not-allowed md:size-16"
          >
            <TbPlayerPlayFilled aria-hidden className="size-5 translate-x-0.5 md:size-6" />
          </button>
        </>
      )}
    </div>
  )
}
