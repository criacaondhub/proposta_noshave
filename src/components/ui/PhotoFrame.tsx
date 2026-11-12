import { useState } from 'react'
import { TbPhoto } from 'react-icons/tb'
import { SITE, type Photo } from '@/config/content'
import { cn } from '@/lib/utils'

/* Fades extras para o lado que encosta no texto (só no desktop; no mobile a foto fica no topo) */
const EDGE_FADES = {
  left: 'inset-y-0 left-0 hidden w-1/2 bg-linear-to-r from-bg-000 via-bg-000/60 to-transparent md:block',
  right: 'inset-y-0 right-0 hidden w-1/2 bg-linear-to-l from-bg-000 via-bg-000/60 to-transparent md:block',
  top: 'inset-x-0 top-0 h-1/3 bg-linear-to-b from-bg-000 to-transparent',
} as const

interface PhotoFrameProps {
  photo: Photo
  className?: string
  /** grade azul via CSS (dispensável se a foto já vier tratada) */
  graded?: boolean
  /** vinheta + fade para bg-000 na base */
  fade?: boolean
  edges?: (keyof typeof EDGE_FADES)[]
  keyhole?: boolean
  eager?: boolean
}

export function PhotoFrame({
  photo,
  className,
  graded = true,
  fade = true,
  edges = [],
  keyhole = false,
  eager = false,
}: PhotoFrameProps) {
  const [missing, setMissing] = useState(false)

  return (
    <div className={cn('nse-photo', graded && 'graded', !fade && 'no-fade', keyhole && 'nse-keyhole', className)}>
      {missing ? (
        // Placeholder até o arquivo existir em public/assets/ com este nome
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_40%,var(--color-surface-100),var(--color-bg-000)_75%)] p-4 text-center">
          <TbPhoto aria-hidden className="size-8 text-blue-400" strokeWidth={1.5} />
          <span className="text-caption text-ink-muted">{SITE.photoPending}</span>
          <span className="text-caption break-all text-ink-muted">{photo.src.replace('assets/', '')}</span>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setMissing(true)}
        />
      )}
      {edges.map((edge) => (
        <span key={edge} aria-hidden className={cn('pointer-events-none absolute z-[2]', EDGE_FADES[edge])} />
      ))}
    </div>
  )
}
