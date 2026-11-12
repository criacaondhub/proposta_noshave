import { createContext, useContext } from 'react'

export interface DeckApi {
  current: number
  total: number
  /** desktop com mouse/trackpad: "avançar" revela os itens do slide um a um */
  stepMode: boolean
  canPrev: boolean
  canNext: boolean
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export interface SlideApi {
  index: number
  label: string
  steps: number
  /** o slide ocupa a tela o bastante para animar a entrada */
  inView: boolean
  /** quantas etapas internas já foram reveladas (0 = só o cabeçalho) */
  revealed: number
  stepMode: boolean
}

export const DeckContext = createContext<DeckApi | null>(null)
export const SlideContext = createContext<SlideApi | null>(null)

export function useDeck() {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck precisa estar dentro de <Deck>')
  return ctx
}

export function useSlide() {
  const ctx = useContext(SlideContext)
  if (!ctx) throw new Error('useSlide precisa estar dentro de um slide do <Deck>')
  return ctx
}
