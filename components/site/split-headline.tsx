/**
 * Titular partido en líneas con tratamiento alterno: sólida → contorno → acento.
 *
 * Es el gesto que carga el peso visual del sitio, pero los títulos vienen de la
 * base de datos y no se pueden marcar a mano. Así que el corte se deduce del
 * propio texto:
 *
 *  1. Si hay un separador (`:` `—` `–` `|`) se parte ahí. Es el corte que el
 *     autor ya pensó, y todos los headlines de nicho lo tienen.
 *  2. Si no, se reparten las palabras en tres grupos equilibrados.
 *  3. Si es demasiado corto para partir, se deja sólido: forzar el efecto sobre
 *     dos palabras se ve peor que no aplicarlo.
 */

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** Colora la última línea con el acento del nicho en vez del de marca. */
  accentColor?: string
  /** Tope de líneas. En columnas estrechas tres partes se parten a su vez
   *  por el ancho y el titular acaba en cinco renglones apretados. */
  maxParts?: 2 | 3
}

function splitText(text: string, maxParts: 2 | 3): string[] {
  const clean = text.trim()

  // 1. Corte por separador
  const match = clean.match(/^(.+?)\s*[:—–|]\s*(.+)$/)
  if (match) {
    const [, izquierda, derecha] = match
    const palabras = izquierda.split(/\s+/)

    // Con tres o más palabras a la izquierda se parte también ahí, para llegar
    // a tres líneas y recuperar el ritmo sólida → contorno → acento. Con sólo
    // dos partes el titular se queda en dos tonos y se lee plano.
    if (maxParts === 3 && palabras.length >= 3) {
      const corte = Math.ceil(palabras.length / 2)
      return [palabras.slice(0, corte).join(' '), palabras.slice(corte).join(' '), derecha]
    }
    return [izquierda, derecha]
  }

  const words = clean.split(/\s+/)

  // 3. Demasiado corto para partir
  if (words.length < 4) return [clean]

  // 2. Grupos equilibrados. Con menos de 6 palabras dos líneas se ven mejor
  //    que tres muy cortas.
  const groups = words.length >= 6 ? maxParts : 2
  const size = Math.ceil(words.length / groups)

  const parts: string[] = []
  for (let i = 0; i < words.length; i += size) {
    parts.push(words.slice(i, i + size).join(' '))
  }
  return parts
}

export function SplitHeadline({
  text,
  as: Tag = 'h2',
  className = '',
  accentColor,
  maxParts = 3,
}: Props) {
  const parts = splitText(text, maxParts)

  return (
    <Tag className={`display ${className}`}>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const isMiddle = parts.length === 3 && i === 1

        return (
          <span
            key={i}
            className={`block ${isMiddle ? 'display-outline' : ''} ${
              isLast && !accentColor ? 'text-accent' : ''
            }`}
            style={isLast && accentColor ? { color: accentColor } : undefined}
          >
            {part}
          </span>
        )
      })}
    </Tag>
  )
}
