# Design System — No Shave Experience · Proposta Comercial

> **Fontes:** `design-system-no-shave-experience.md` + design system navegável (CSS dos componentes `nse-`) + `estrutura-site-no-shave-experience.md`.
> **Formato:** site em slides de tela cheia, igual à proposta do FUE Ultramar (proposta.rafaelultramar.com.br). Os espaçamentos e a navegação foram tirados dela.
> **Tema único escuro.** O azul é luz, não tinta. Nunca misturar com a identidade menta do FUE Ultramar.

---

## 1. Tokens de Cor

Todos os tokens vivem em `@theme` no `src/index.css`. As cores padrão do Tailwind foram **zeradas** (`--color-*: initial`): só existem as cores abaixo.

| Token | Hex | Classe Tailwind | Uso |
|---|---|---|---|
| `bg-000` | `#02030A` | `bg-bg-000` | Fundo profundo, onde a foto afunda no preto. Slides com foto full-bleed e transições. |
| `bg-100` | `#0C1121` | `bg-bg-100` | Fundo padrão dos slides (navy ink). |
| `surface-100` | `#11205D` | `bg-surface-100` | Base do selo e fundo dos cards. |
| `surface-200` | `#153086` | `bg-surface-200` | Topo do gradiente do selo e hover dos cards. |
| `stroke-blue` | `#2A4184` | `border-stroke-blue` | Contorno 1px de selo e cards. |
| `blue-950` | `#01136D` | `to-blue-950` | Fim do gradiente do CTA. |
| `blue-800` | `#002384` | `to-blue-800` | Fim saturado da HighlightBand. |
| `blue-600` | `#0061E4` | `text-blue-600` | Royal: 2ª linha do headline, início do CTA, risco do preço "DE". **Só texto ≥ 24px** (3,4:1). |
| `blue-500` | `#058CFF` | `text-blue-500` | Azure: headline em destaque e "No Shave Experience" no corpo (5,6:1). |
| `blue-400` | `#4695FF` | `text-blue-400` | Destaque em subtítulos e leads (6,3:1). |
| `glow-300` | `#2CA2F6` | `bg-glow-300` | Halo das linhas de luz. Nunca como texto. |
| `glow-100` | `#68F8FF` | `bg-glow-100` | Núcleo ciano dos flares. Uso pontual, poucos pixels. |
| `photo-highlight` | `#A5CEFD` | — | Altas luzes da foto tratada. Referência de grading, não de UI. |
| `ink` | `#FFFFFF` | `text-ink` | Texto principal. |
| `ink-muted` | `#A9B3CC` | `text-ink-muted` | Legendas, metadados, lado "apagado" dos comparativos (9:1). |
| `line` | `#FFFFFF1A` | `border-line` | Divisores neutros e bordas sutis (branco a 10%). |

### Raios

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | CTA compacto |
| `radius-md` | 12px | CTA principal e cards |
| `radius-lg` | 16px | Selo (eyebrow) |

Nada de pílula total nem cantos retos.

### Sombras (luz)

| Token | Valor | Uso |
|---|---|---|
| `shadow-glow-cta` | `0 0 32px 0 rgba(0,97,228,.55)` | Halo do CTA e do card em destaque |
| `shadow-glow-flare` | `0 0 18px 3px rgba(104,248,255,.65)` | Núcleo das linhas de luz |

Use a luz com escassez: no máximo um divisor por bloco e um CTA iluminado por tela.

---

## 2. Tipografia

| Família | Fonte | Token | Uso |
|---|---|---|---|
| Display | **Montserrat** (Google Fonts, 300/400/600/700) | `font-display` | Headline, subtítulos, números |
| Texto | **Inter** (Google Fonts, 400/500/700 + 700 itálico) | `font-sans` (padrão do body) | Selo, corpo, CTA, legendas |

- Mesmas famílias da landing do produto (experience.rafaelultramar.com.br). Lá os títulos usam Montserrat **Light (300)**; aqui seguem os pesos do DS (600/700), com o 300 já carregado caso se queira o visual da landing.
- O import das duas fica no topo do `src/index.css` com `display=swap`.

### Escala

Títulos em **Montserrat Light (300), caixa alta, tracking -0.025em** (como a landing experience.rafaelultramar.com.br). **Todo o resto** — texto corrido, subtítulos, leads, notas — segue o padrão dos cards do slide 07: **Inter ExtraLight (200), branco**; destaques em Inter 500; selos e etiquetas em Inter 500 caixa alta. Os valores máximos são os do DS; o meio do `clamp` usa a **menor** entre largura e altura da tela.

| Token / classe | Tamanho (mín → máx) | Altura | Tracking | Peso | Caixa |
|---|---|---|---|---|---|
| `text-display-xl` | `clamp(2.75rem, min(8.5vw, 13svh), 7.5rem)` · 44 → 120px | 1.0 | -0.025em | 300 | números grandes (preço, "90") |
| `text-headline` | `clamp(2rem, min(5vw, 8svh), 4.5rem)` · 32 → 72px | 1.15 | -0.025em | 300 | ALTA |
| `text-headline-compact` | `clamp(1.75rem, min(3.4vw, 5.6svh), 3.25rem)` · 28 → 52px | 1.15 | -0.025em | 300 | ALTA |
| `text-subhead` (Inter) | `clamp(1.5rem, min(2.8vw, 4.6svh), 2.5rem)` · 24 → 40px | 1.15 | -0.01em | **200** (destaque 500 + `blue-400`) | normal |
| `text-lead` (Inter; títulos de card em Montserrat 400 caixa alta) | `clamp(1.125rem, min(1.6vw, 2.8svh), 1.5rem)` · 18 → 24px | 1.35 | -0.01em | **200** (destaque 500) | normal |
| `text-body` (Inter) | `clamp(1rem, min(1.3vw, 2.3svh), 1.25rem)` · 16 → 20px | 1.55 | — | **200 ExtraLight** (destaque 500; marca 700 + `blue-500`) | normal |
| `text-eyebrow` (Inter) | `clamp(0.8125rem, 1.1vw, 1.0625rem)` · 13 → 17px | 1.2 | 0.01em | 500, itálico na virada | ALTA |
| `text-cta` (Montserrat) | `clamp(0.9375rem, 1.2vw, 1.125rem)` · 15 → 18px | 1.2 | -0.025em | 300 | ALTA |
| `text-caption` (Inter) | 14px | 1.4 | — | 400 | normal |

- `headline-compact` é a variação para slides densos (comparativo, entregáveis, condição, fechamento).
- Headline em 2 cores: 1ª linha `ink`, 2ª linha `blue-500` (azure, padrão — mesmo azul de destaque da landing). O royal `blue-600` continua disponível (`tone="royal"`).
- Se o texto não couber, troca a quebra de linha ou o tamanho. **Nunca** esticar ou distorcer letras.
- Um único `h1` (capa). Títulos de slide são `h2`; títulos de card são `h3`.

---|---|---|---|---|---|
| `text-display-xl` | `clamp(2.75rem, min(8.5vw, 13svh), 7.5rem)` · 44 → 120px | 0.92 | -0.045em | 700 | ALTA |
| `text-headline` | `clamp(2rem, min(5vw, 8svh), 4.5rem)` · 32 → 72px | 1.0 | -0.04em | 600 | ALTA |
| `text-headline-compact` | `clamp(1.75rem, min(3.4vw, 5.6svh), 3.25rem)` · 28 → 52px | 1.0 | -0.04em | 600 | ALTA |
| `text-subhead` | `clamp(1.5rem, min(2.8vw, 4.6svh), 2.5rem)` · 24 → 40px | 1.15 | -0.02em | 400 (destaque 700 + `blue-400`) | normal |
| `text-lead` | `clamp(1.125rem, min(1.6vw, 2.8svh), 1.5rem)` · 18 → 24px | 1.35 | -0.01em | 400 (destaque 700) | normal |
| `text-body` | `clamp(1rem, min(1.3vw, 2.3svh), 1.25rem)` · 16 → 20px | 1.4 | — | 400 (marca 700 + `blue-500`) | normal |
| `text-eyebrow` | `clamp(0.8125rem, 1.1vw, 1.0625rem)` · 13 → 17px | 1.2 | 0.01em | 700, itálico na virada | ALTA |
| `text-cta` | `clamp(0.9375rem, 1.2vw, 1.125rem)` · 15 → 18px | 1.2 | 0.01em | 500 | ALTA |
| `text-caption` | 14px | 1.4 | — | 400 | normal |

- `headline-compact` é a variação para slides densos (comparativo, entregáveis, condição, fechamento). Mesma família, peso e tracking do headline.
- Headline sempre em 2 cores: 1ª linha `ink`, 2ª linha `blue-600` (royal) ou `blue-500` (azure).
- Se o texto não couber, troca a quebra de linha ou o tamanho. **Nunca** esticar ou distorcer letras.
- Um único `h1` (hero). Títulos de slide são `h2`; títulos de card são `h3`.

---

## 3. Espaçamentos e Grid

Valores tirados do CSS da proposta FUE Ultramar.

| Item | Token / classe | Valor |
|---|---|---|
| Container máximo | `max-w-page` | 1440px |
| Padding lateral do slide | `px-slide-x` | `clamp(2rem, 5vw, 6rem)` · 32 → 96px |
| Padding vertical do slide | `py-slide-y` | `clamp(4.5rem, 10svh, 6rem)` · 72 → 96px (libera header e barra de progresso) |
| Header fixo | `py-header-y` | `clamp(1.25rem, 2.5vw, 2rem)` · 20 → 32px; lateral = `px-slide-x` |
| Gap do grid | `gap-gutter` | `clamp(1rem, 2vw, 2rem)` · 16 → 32px |
| Padding dos cards | `p-card` | `clamp(1.5rem, 2.2vw, 2rem)` · 24 → 32px |
| Escala base | `--spacing: 0.25rem` | 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 → `1 · 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32` |

**Gaps internos:** selo → headline 16px (`gap-4`) · headline → corpo 24px (`gap-6`) · corpo → bloco 32–48px (`mt-8` / `md:mt-12`) · entre cards 16 → 24px (`gap-4 md:gap-6`).

**Grid:** 12 colunas a partir de 768px (`md:`); abaixo disso, uma coluna.

**Breakpoint:** `md` = 768px. Abaixo dele a navegação vira vertical.

### 3.1 Estrutura do deck (shell)

- Cada slide ocupa `100vw × 100svh`. A trilha (`<main>`) tem `scroll-snap` em X no desktop e em Y no mobile.
- No mobile o slide tem **altura mínima** de uma tela: se o conteúdo for maior, ele cresce e o snap respeita.
- **Sem header:** o logo não aparece no topo dos slides (só na capa).
- **Contador:** barra de vidro fosco centralizada (`DeckCounter`) com `03 / 17` e o nome do slide atual; fica na base no desktop e no topo no mobile (onde o conteúdo rola).
- **Progresso:** linha de luz na base da tela, crescendo da esquerda para a direita, com o núcleo ciano na ponta.
- **Setas laterais:** só em telas ≥ 768px com mouse/trackpad. No slide 1 aparece a dica "avance".
- **Fundo:** `bg-100` por padrão; slides com foto full-bleed e transições usam `bg-000`.

### 3.2 Navegação (igual à proposta FUE)

- **Formas:** setas do teclado (← → ↑ ↓, PageUp/PageDown, espaço, Home/End), setas na tela, roda do mouse, trackpad e swipe.
- **Revelação por etapas (desktop com mouse/trackpad):** dentro de cada slide, "avançar" revela os itens um a um (cards, linhas, preço) antes de passar ao próximo slide. "Voltar" esconde na ordem inversa. O estado é mantido quando se volta a um slide.
- **Roda/trackpad:** um gesto = um passo. Há trava de 600ms e a inércia do trackpad é ignorada.
- **Touch/mobile:** sem etapas. O conteúdo entra em cascata assim que o slide aparece.
- **Link direto:** cada slide atualiza o `#` da URL (ex.: `#valor-oficial`), e abrir o link leva direto ao slide.

---

## 4. Imagens (pendentes)

As fotos ainda não foram enviadas. Cada `PhotoFrame` tenta carregar o arquivo abaixo e, se não existir, mostra um placeholder com o nome esperado. **Basta salvar o arquivo com este nome em `public/assets/`** — nenhuma mudança de código.

| Arquivo | Slide | Posição | Proporção sugerida |
|---|---|---|---|
| `resultado-01.webp` · `-02` · `-03` | 03 Resultado invisível | Topo de cada card (mobile: à esquerda do texto) | 4:3 · 1200×900 |
| `depoimento-capa.webp` ✅ | 09 Depoimentos | Capa do player vertical: frame inicial do Shorts (recorte 9:16 da miniatura do YouTube), cores originais | 405×720 |
| `Slide-10.webp` ✅ | 10 Transição | Metade esquerda, full-bleed (já tratada em azul, sem `.graded`); mobile no topo com máscara | 1080×1350 |
| `Slide-17.webp` ✅ | 17 Fechamento | Metade esquerda na proporção original (já tratada em azul, sem `.graded` e sem fade inferior); mobile no topo com máscara | 1080×1350 |
| `og-image.jpg` | Compartilhamento | Meta `og:image` | 1200×630 |

**Tratamento (`PhotoFrame`):**
- Sem container retangular aparente e sem `border-radius` nas fotos de composição.
- `.graded`: `grayscale(1) contrast(1.15) brightness(.9)` + camada `blue-600 → blue-950` em `mix-blend-mode: color`. O ideal é a foto já vir tratada.
- Fade para `bg-000` na base (vinheta radial) e, nas fotos laterais, no lado que encosta no texto.
- `.nse-keyhole`: máscara SVG em fechadura (disponível, sem uso no momento).
- Fotos dos cards (slide 03) não levam fade.

**Vídeo (slide 09):** `CONFIG.VIDEO_URL` = https://www.youtube.com/shorts/T3MbFFraUoI — vídeo vertical (9:16) à esquerda e título em 3 linhas à direita (no mobile, título em cima). Embed youtube-nocookie com autoplay ao clicar. Aceita também `.mp4` em `public/assets/`, vídeos horizontais (sem `vertical`) e Vimeo não listado.

---

## 5. Componentes (`src/components/ui/`)

| Componente | Classe base | Uso |
|---|---|---|
| `CtaButton` | `.nse-cta` (`.sm`, pulse) | Gradiente 90° `blue-600 → blue-950`, borda azul translúcida, halo e flares ciano no topo e na base. Texto em CAIXA ALTA, verbo no imperativo. |
| `Eyebrow` | `.nse-eyebrow` | Selo acima do headline: gradiente `surface-200 → surface-100`, borda `stroke-blue`, `radius-lg`. `_texto_` = itálico na virada. |
| `Headline` | utilitários | Display em CAIXA ALTA, 2 cores. Variações `default` e `compact`; tom `royal` ou `azure`. |
| `GlowDivider` | `.nse-divider` (`.left`) | Linha de luz de 2px com núcleo ciano. |
| `HighlightBand` | `.nse-band` | Gradiente que satura para `blue-800` e sangra até a borda direita da tela. (hoje só no rodapé do slide 08) |
| `RichText` | `.nse-brand` | `**negrito**`, `_itálico_` e "No Shave Experience" automático em 700 + `blue-500`. |
| `PhotoFrame` | `.nse-photo` (`.graded`, `.nse-keyhole`) | Foto tratada com fade e placeholder automático. |
| `CountUp` | — | Números de valor sobem ao entrar (formato pt-BR, algarismos tabulares). |
| `Card` | utilitários | `surface-100` + `stroke-blue` + `radius-md`; hover → `surface-200` + halo leve. Variações `muted` (borda `line`) e `featured` (halo). |

## 6. Logo

- Fonte: `public/assets/logo-no-shave-azul.webp` (o mesmo da landing, branco, 768×146).
- Vetorizado em `src/components/ui/logo/logoPaths.ts` (17 letras) e `public/assets/logo-no-shave.svg`, com o recorte sem a margem transparente do arquivo original. A linha de luz entre "NO SHAVE" e "EXPERIENCE" é um elemento próprio com o mesmo perfil de brilho.
- `LogoMark`: versão estática (header). `LogoReveal`: versão animada da capa.
- Se chegar o SVG oficial, basta trocar os caminhos em `logoPaths.ts`.
- Favicon: `public/favicon.svg` (o "R" Ultramar sobre o gradiente azul, o mesmo da landing).

## 7. Capa (slide 01)

Composição centralizada, sem foto, inspirada na capa da proposta do SelfMed Club:

1. Cada letra do logo se desenha com traço metálico azul (`stroke-blue → blue-400 → ink → glow-100`), 2,2s por letra, 60ms entre letras.
2. O preenchimento branco entra enquanto o traço some; a linha de luz se abre do centro com núcleo ciano.
3. Um brilho atravessa o logo recortado pelas letras, repetindo a cada 6s.
4. Subtítulo e lead entram em 2,6s, centralizados.

## 8. Fundos

Mesmo sistema de fundos da proposta FUE Ultramar, recolorido:

| Fundo | Componente | Onde |
|---|---|---|
| Cortina de luz (faixas verticais + granulado + holofote em diagonal) | `GradientBlinds` (WebGL), `blue-500`, opacidade 22% | Padrão dos slides de conteúdo e da capa |
| Cortina inclinada em degradê | `GradientBlinds` `blue-500 → blue-950`, 12°, opacidade 50% | Transição "não vai pagar" (14) e preço (15) |
| Grade de células iluminadas | `CellGrid` (canvas estático) com vinheta radial | Slide 04 (4 médicos) |
| Orbes de luz | `GlowOrb` (blur 120px, `royal`/`azure`), presets em `orbPresets.ts` | Todos, variando a posição |

- O WebGL só existe no slide atual (animado) e nos vizinhos (quadro parado): no máximo 3 contextos.
- `prefers-reduced-motion`: a cortina fica parada e o logo aparece pronto.

## 9. Movimento

- **Entrada:** fade + translate curto (20px), 600ms, `cubic-bezier(.22,1,.36,1)`, em cascata (selo → headline → corpo → resto).
- **Troca de slide:** scroll suave nativo; trava de 600ms entre passos.
- **Saída de etapa:** 300ms.
- **Count-up:** 1,6s nos valores (total, preço, 90 dias).
- **CTA final:** halo pulsando a cada 2,8s.
- `prefers-reduced-motion`: sem translate, sem pulse, sem count-up e troca de slide instantânea.
