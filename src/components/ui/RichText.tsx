import { Fragment } from 'react'

const BRAND = 'No Shave Experience'

interface RichTextProps {
  /** **destaque**, _itálico_, \n = quebra de linha; "No Shave Experience" vira BrandMention */
  text: string
  strongClassName?: string
}

function withBrand(text: string) {
  return text
    .split(BRAND)
    .flatMap((chunk, i) => (i === 0 ? [chunk] : [<span key={i} className="nse-brand">{BRAND}</span>, chunk]))
}

function withBreaks(text: string) {
  return text
    .split('\n')
    .flatMap((line, i) => (i === 0 ? [withBrand(line)] : [<br key={`br-${i}`} />, withBrand(line)]))
}

export function RichText({ text, strongClassName }: RichTextProps) {
  return (
    <>
      {text
        .split(/(\*\*.+?\*\*|_.+?_)/g)
        .filter(Boolean)
        .map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className={strongClassName}>
                {part.slice(2, -2)}
              </strong>
            )
          }
          if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) {
            return <em key={i}>{part.slice(1, -1)}</em>
          }
          return <Fragment key={i}>{withBreaks(part)}</Fragment>
        })}
    </>
  )
}
