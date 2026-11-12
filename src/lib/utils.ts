import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

const numberFormat = new Intl.NumberFormat('pt-BR')

export const formatNumber = (value: number) => numberFormat.format(value)

export const formatCurrency = (value: number) => `R$ ${formatNumber(value)}`

/** Converte um link do YouTube ou Vimeo no endereço de embed; devolve null para arquivos de vídeo. */
export function toEmbedUrl(url: string) {
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1${vimeo[2] ? `&h=${vimeo[2]}` : ''}`

  return null
}
