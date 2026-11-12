import type { DeckSlide } from '@/components/ui/Deck'
import {
  AMBIENTE,
  BONUS_ACESSO,
  BONUS_CIRURGIA,
  CONDICAO,
  DEPOIMENTOS,
  ENTREGAVEIS,
  FECHAMENTO,
  FRONTEIRA,
  HERO,
  IMERSAO,
  METODO,
  NAO_ACABA,
  NAO_VAI_PAGAR,
  PILARES,
  RESULTADO,
  TURMA,
  VALOR_OFICIAL,
} from '@/config/content'
import { Ambiente } from './Ambiente'
import { ArquiteturaMetodo } from './ArquiteturaMetodo'
import { BonusAcesso } from './BonusAcesso'
import { BonusCirurgia } from './BonusCirurgia'
import { CondicaoEspecial } from './CondicaoEspecial'
import { Depoimentos } from './Depoimentos'
import { DoisDias } from './DoisDias'
import { Entregaveis } from './Entregaveis'
import { Fechamento } from './Fechamento'
import { Hero } from './Hero'
import { NaoAcabaAqui } from './NaoAcabaAqui'
import { NaoVaiPagar } from './NaoVaiPagar'
import { NovaFronteira } from './NovaFronteira'
import { Pilares } from './Pilares'
import { QuatroMedicos } from './QuatroMedicos'
import { ResultadoInvisivel } from './ResultadoInvisivel'
import { ValorOficial } from './ValorOficial'

/* Ordem do site. `steps` = itens revelados um a um ao avançar (desktop). */
export const SLIDES: DeckSlide[] = [
  { id: HERO.id, label: HERO.label, steps: 0, Component: Hero },
  { id: FRONTEIRA.id, label: FRONTEIRA.label, steps: 2, Component: NovaFronteira },
  { id: RESULTADO.id, label: RESULTADO.label, steps: RESULTADO.cards.length, Component: ResultadoInvisivel },
  { id: TURMA.id, label: TURMA.label, steps: 0, Component: QuatroMedicos },
  { id: METODO.id, label: METODO.label, steps: METODO.steps.length, Component: ArquiteturaMetodo },
  { id: PILARES.id, label: PILARES.label, steps: PILARES.pillars.length, Component: Pilares },
  { id: AMBIENTE.id, label: AMBIENTE.label, steps: AMBIENTE.cards.length, Component: Ambiente },
  { id: IMERSAO.id, label: IMERSAO.label, steps: IMERSAO.cards.length + 1, Component: DoisDias },
  { id: DEPOIMENTOS.id, label: DEPOIMENTOS.label, steps: 0, Component: Depoimentos },
  { id: NAO_ACABA.id, label: NAO_ACABA.label, steps: 0, Component: NaoAcabaAqui },
  { id: BONUS_ACESSO.id, label: BONUS_ACESSO.label, steps: 0, Component: BonusAcesso },
  { id: BONUS_CIRURGIA.id, label: BONUS_CIRURGIA.label, steps: 0, Component: BonusCirurgia },
  { id: ENTREGAVEIS.id, label: ENTREGAVEIS.label, steps: ENTREGAVEIS.items.length + 1, Component: Entregaveis },
  { id: NAO_VAI_PAGAR.id, label: NAO_VAI_PAGAR.label, steps: 0, Component: NaoVaiPagar },
  { id: VALOR_OFICIAL.id, label: VALOR_OFICIAL.label, steps: 2, Component: ValorOficial },
  { id: CONDICAO.id, label: CONDICAO.label, steps: CONDICAO.options.length + 1, Component: CondicaoEspecial },
  { id: FECHAMENTO.id, label: FECHAMENTO.label, steps: 2, Component: Fechamento },
]
