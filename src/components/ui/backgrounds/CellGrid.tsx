import { useEffect, useRef } from 'react'

/*
 * Grade de células iluminadas (canvas estático) — o fundo do slide de abertura
 * da proposta FUE: cada célula tem a borda acesa no meio e apagando nos cantos.
 */

interface CellGridProps {
  cellSize?: number
  color?: string
  lineWidth?: number
  gridOpacity?: number
  cellOpacity?: number
}

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ')
}

export function CellGrid({ cellSize = 70, color = '#058cff', lineWidth = 1.2, gridOpacity = 0.06, cellOpacity = 0.5 }: CellGridProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return
    const rgb = hexToRgb(color)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const draw = () => {
      const width = host.offsetWidth
      const height = host.offsetHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const cols = Math.ceil(width / cellSize) + 1
      const rows = Math.ceil(height / cellSize) + 1
      const offsetX = (width - cols * cellSize) / 2
      const offsetY = (height - rows * cellSize) / 2

      // linhas finas da grade
      ctx.strokeStyle = `rgba(${rgb}, ${gridOpacity})`
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(offsetX + c * cellSize) + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let r = 0; r <= rows; r++) {
        const y = Math.round(offsetY + r * cellSize) + 0.5
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      // borda de cada célula com gradiente radial a partir do centro
      const half = cellSize / 2
      ctx.lineWidth = lineWidth
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = offsetX + c * cellSize + half
          const cy = offsetY + r * cellSize + half
          const gradient = ctx.createRadialGradient(cx, cy, half * 0.1, cx, cy, cellSize)
          gradient.addColorStop(0, `rgba(${rgb}, ${cellOpacity})`)
          gradient.addColorStop(1, `rgba(${rgb}, 0)`)
          ctx.strokeStyle = gradient
          ctx.strokeRect(cx - half + 0.5, cy - half + 0.5, cellSize - 1, cellSize - 1)
        }
      }
    }

    const observer = new ResizeObserver(draw)
    observer.observe(host)
    draw()
    return () => observer.disconnect()
  }, [cellSize, color, lineWidth, gridOpacity, cellOpacity])

  return (
    <div ref={hostRef} aria-hidden className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
