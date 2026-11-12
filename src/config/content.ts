export const CONFIG = {
  // ⚠️ PENDENTE — preencher antes do deploy
  WHATSAPP_URL: '⚠️ PENDENTE',
  WHATSAPP_NUMBER: '⚠️ PENDENTE',
  CONTACT_EMAIL: '⚠️ PENDENTE',
  CONTACT_PHONE: '⚠️ PENDENTE',
  DOMAIN: '⚠️ PENDENTE',

  // ⚠️ PENDENTE — destino dos CTAs (WhatsApp do comercial, formulário de aplicação ou checkout)
  CTA_URL: '⚠️ PENDENTE',
  // ⚠️ PENDENTE — vídeo de depoimento: 'assets/depoimento.mp4', link do YouTube ou do Vimeo não listado
  VIDEO_URL: '⚠️ PENDENTE',

  COMPANY_NAME: 'Dr. Rafael Ultramar',
} as const

export const isPending = (value: string) => value.startsWith('⚠️')

/*
 * Marcação dos textos:
 *   **trecho**  → destaque (peso 700; a cor depende do contexto)
 *   _trecho_    → itálico (a "virada" do selo)
 *   "No Shave Experience" no corpo ganha a cor da marca automaticamente.
 */

export interface Photo {
  src: string
  alt: string
}

export const SITE = {
  // nome lido por leitores de tela no logo (o desenho vetorial está em components/ui/logo)
  wordmark: 'No Shave Experience',
  deckLabel: 'Apresentação No Shave Experience',
  homeLabel: 'voltar ao início',
  counterLabel: 'Slide',
  slideOf: 'de',
  progressLabel: 'Progresso da apresentação',
  prevLabel: 'Voltar',
  nextLabel: 'Avançar',
  hintDesktop: 'avance',
  hintMobile: 'deslize para avançar',
  photoPending: 'Foto pendente',
}

// 01 · Capa — logo centralizado se desenhando
export const HERO = {
  id: 'inicio',
  label: 'No Shave Experience',
  subhead: 'A imersão definitiva na técnica **sem raspagem**.',
  lead: 'Hands On, acompanhamento e direcionamento com o **Dr. Rafael Ultramar**.',
}

// 02 · A nova fronteira — T3
export const FRONTEIRA = {
  id: 'nova-fronteira',
  label: 'A nova fronteira',
  eyebrow: 'A nova fronteira do _transplante capilar_',
  title: ['O mercado não precisa de mais um realizador', 'Implora por especialistas de alto padrão'],
  muted: {
    title: 'O caminho tradicional',
    items: [
      'Guerra de preços e margens espremidas',
      'Dependência de alto volume de pacientes',
      'Técnicas defasadas e resultados medianos',
    ],
  },
  featured: {
    title: 'O padrão Ultramar',
    items: [
      'Ticket premium e alta lucratividade',
      'Posicionamento de autoridade incontestável',
      'Técnica No Shave impecável e desejada',
    ],
  },
}

// 03 · O resultado invisível — T4
export const RESULTADO = {
  id: 'resultado-invisivel',
  label: 'O resultado invisível',
  eyebrow: 'A exigência inegociável do _paciente high-ticket_',
  title: ['O resultado', 'invisível'],
  cards: [
    {
      text: 'Cicatrização discreta em horas.',
      photo: { src: 'assets/resultado-01.webp', alt: 'Área doadora com cicatrização discreta' },
    },
    {
      text: 'Ângulos perfeitos com controle milimétrico.',
      photo: { src: 'assets/resultado-02.webp', alt: 'Implantação com ângulos controlados' },
    },
    {
      text: 'Naturalidade extrema. Retorno imediato à rotina corporativa.',
      photo: { src: 'assets/resultado-03.webp', alt: 'Resultado natural de transplante sem raspagem' },
    },
  ] satisfies { text: string; photo: Photo }[],
}

// 04 · Apenas 4 médicos por turma — T2
export const TURMA = {
  id: 'turma',
  label: 'Apenas 4 médicos por turma',
  eyebrow: 'Foco absoluto. _Proximidade total._',
  title: ['Apenas 4 médicos', 'por turma'],
  body: 'Não estamos aqui para criar massa. Estamos aqui para **lapidar a elite**. Acesso irrestrito ao **Dr. Rafael Ultramar**.',
  seatLabel: 'Cadeira',
  seats: ['01', '02', '03', '04'],
}

// 05 · A arquitetura do método — T6
export const METODO = {
  id: 'metodo',
  label: 'A arquitetura do método',
  title: ['A arquitetura', 'do método'],
  steps: [
    { title: 'Vivência', text: 'Imersão total em um ambiente de altíssimo padrão.' },
    { title: 'Execução', text: 'Aplicação cirúrgica prática, mão na massa, sob supervisão de elite.' },
    { title: 'Integração', text: 'A fusão perfeita entre filosofia médica e cultura empresarial.' },
  ],
}

// 06 · A máquina de forjar especialistas — T4 (colunas de texto)
export const PILARES = {
  id: 'pilares',
  label: 'A máquina de forjar especialistas',
  title: ['A máquina de', 'forjar especialistas'],
  pillars: [
    {
      eyebrow: 'Pilar 01',
      title: 'Domínio técnico',
      text: 'A cirurgia perfeita na prática. Marcação, extração e implantação da técnica No Shave, sem margem para erros.',
    },
    {
      eyebrow: 'Pilar 02',
      title: 'Visão de negócios',
      text: 'O passo estratégico para estruturar uma operação enxuta, eficiente e faturar múltiplos sete dígitos anuais.',
    },
    {
      eyebrow: 'Pilar 03',
      title: 'Engrenagem de conversão high-ticket',
      text: 'Estratégias validadas de marketing, tráfego e posicionamento de autoridade para atrair, educar e converter pacientes que não buscam preço, mas a excelência absoluta do seu serviço.',
    },
  ],
}

// 07 · Um ambiente projetado para o topo — T4
export const AMBIENTE = {
  id: 'ambiente',
  label: 'Um ambiente projetado para o topo',
  title: ['Um ambiente projetado', 'para o topo'],
  body: 'Muito mais que técnica: você terá acesso a um **networking de altíssimo nível** com outros profissionais focados em crescimento agressivo.',
  cards: [
    { icon: 'networking', text: 'Evento premium com networking selecionado a dedo.' },
    {
      icon: 'hospitality',
      text: 'Hospitalidade de excelência, projetada para fomentar conexões estratégicas sem perder o foco nos negócios.',
    },
    { icon: 'kit', text: 'Welcome Kit No Shave Experience exclusivo para a turma.' },
  ] as const,
}

// 08 · O que você terá nesses 2 dias — T6
export const IMERSAO = {
  id: 'imersao',
  label: 'O que você terá nesses 2 dias',
  title: ['O que você terá', 'nesses 2 dias de imersão'],
  cards: [
    {
      title: 'Planejamento cirúrgico e hands-on',
      items: [
        { label: 'Análise e design', text: 'estudo de caso real com planejamento arquitetônico avançado da linha frontal.' },
        { label: 'Estratégia folicular', text: 'distribuição precisa de unidades foliculares conforme a necessidade do paciente.' },
      ],
    },
    {
      title: 'Consolidação e debriefing',
      items: [
        { label: 'Análise crítica', text: 'debriefing cirúrgico detalhado, com discussão técnica dos erros e acertos do dia.' },
        { label: 'Visão geral', text: 'consolidação dos pilares de fundamentos e do planejamento dominados na primeira jornada.' },
      ],
    },
    {
      title: 'Palestras',
      items: [{ text: '2 convidados selecionados para falar de posicionamento, marketing e melhoria da sua clínica.' }],
    },
  ] as { title: string; items: { label?: string; text: string }[] }[],
  footer: '+ Um **jantar exclusivo** com o Dr. Rafael Ultramar no último dia de imersão.',
}

// 09 · Depoimentos — T2 com player
export const DEPOIMENTOS = {
  id: 'depoimentos',
  label: 'Depoimentos',
  title: ['O que os alunos da', 'metodologia Ultramar dizem'],
  videos: [
    {
      src: CONFIG.VIDEO_URL,
      title: 'Depoimento de aluno da Metodologia Ultramar',
      poster: { src: 'assets/depoimento-capa.webp', alt: 'Capa do vídeo de depoimento' } satisfies Photo,
    },
  ],
  playLabel: 'Assistir ao depoimento',
  pendingLabel: 'Vídeo de depoimento ainda não disponível',
  bulletLabel: 'Ver depoimento',
}

// 10 · Transição — T9
export const NAO_ACABA = {
  id: 'nao-acaba-aqui',
  label: 'Mas não acaba aqui',
  title: ['Mas não', 'acaba aqui…'],
  photo: { src: 'assets/cirurgia-equipe.webp', alt: 'Equipe Ultramar em cirurgia' } satisfies Photo,
}

// 11 · Bônus 01 — T2
export const BONUS_ACESSO = {
  id: 'bonus-acesso',
  label: 'Bônus 01 · Acesso confidencial',
  eyebrow: 'Bônus 01',
  title: ['Acesso', 'confidencial'],
  subhead: 'Você não sai daqui **sozinho**.',
  number: 90,
  unit: 'dias',
  caption: 'de suporte ininterrupto e consultoria de casos por WhatsApp, para sua experiência ser 100% imersiva.',
  body: 'Ter o **Dr. Rafael** como seu mentor particular nos seus primeiros casos.',
}

// 12 · Bônus 02 — T5
export const BONUS_CIRURGIA = {
  id: 'bonus-cirurgia',
  label: 'Bônus 02 · A cirurgia assistida',
  eyebrow: 'Bônus 02 · _extremamente exclusivo_',
  title: ['A cirurgia', 'assistida'],
  band: 'Alugue uma diária da **Clínica Ultramar** para fazer sua cirurgia.',
  body: 'Equipe, equipamentos, estrutura e suporte, acompanhado do **Dr. Rafael Ultramar**.',
  photo: { src: 'assets/day-clinic.webp', alt: 'Ultramar Day Clinic vista pela fechadura' } satisfies Photo,
}

// 13 · Recapitulando os entregáveis — T7
export const ENTREGAVEIS = {
  id: 'entregaveis',
  label: 'Recapitulando os entregáveis',
  title: ['Recapitulando', 'os entregáveis'],
  subhead: 'E quanto vale **cada um** individualmente.',
  items: [
    { label: 'Treinamento presencial Hands On (2 dias)', value: 38000 },
    { label: '90 dias de mentoria por WhatsApp', value: 8000 },
    { label: 'Welcome Kit e protocolos', value: 8000 },
    { label: 'Cirurgia assistida na Ultramar Day Clinic (cada)', value: 15000 },
    { label: 'Palestras sobre marketing e posicionamento', value: 20000 },
    { label: 'Comunidade de networking ultraqualificado', value: null, valueLabel: 'Imensurável' },
  ] as { label: string; value: number | null; valueLabel?: string }[],
  totalLabel: 'Total',
  total: 89000,
}

// 14 · Transição — T9 (sem foto)
export const NAO_VAI_PAGAR = {
  id: 'valor',
  label: 'Mas você não vai pagar esse valor',
  phrase: 'Mas você **não vai pagar** esse valor…',
}

// 15 · Valor oficial — T8
export const VALOR_OFICIAL = {
  id: 'valor-oficial',
  label: 'Valor oficial',
  eyebrow: 'Valor oficial do _acesso No Shave Experience_',
  fromLabel: 'De',
  from: 89000,
  toLabel: 'Por',
  to: 45000,
  // ⚠️ PENDENTE — o deck diz R$ 53.000; a conta (89 − 45) dá R$ 44.000
  badge: 'Desconto de R$ 44.000',
}

// 16 · Condição especial — T8 em 2 opções
export const CONDICAO = {
  id: 'condicao-especial',
  label: 'Condição especial',
  eyebrow: 'Para decidir agora, _junto comigo_',
  title: ['Uma condição especial', 'para você decidir agora'],
  subhead: 'E garantir uma das **vagas limitadas**.',
  options: [
    { label: 'À vista', value: 40000, note: 'pagamento único', badge: 'Quase 50 mil de desconto', featured: true },
    { label: 'Parcelado', value: 50000, note: 'em 10x de R$ 5.000 sem juros', featured: false },
  ] as { label: string; value: number; note: string; badge?: string; featured: boolean }[],
  cta: 'Garanta uma das vagas limitadas',
}

// 17 · Fechamento — T1 invertido
export const FECHAMENTO = {
  id: 'vagas',
  label: 'As vagas evaporam',
  title: ['As vagas evaporam.', 'A elite não espera.'],
  body: 'Apenas **4 cadeiras** por turma.',
  // ⚠️ PENDENTE — confirmar o ano (18 e 19 de fevereiro de 2027?)
  dates: [
    { day: '18', month: 'Fev', text: 'Hands on, palestras e networking.' },
    { day: '19', month: 'Fev', text: 'Hands on, palestras, networking e um jantar exclusivo com o Dr. Rafael Ultramar.' },
  ],
  cta: 'Quero entrar para o No Shave Experience',
  photo: { src: 'assets/dr-rafael-datas.webp', alt: 'Dr. Rafael Ultramar apontando para as datas da turma' } satisfies Photo,
}
