import { Fragment, type ReactNode } from 'react'

/**
 * Render del cuerpo del post.
 *
 * Markdown mínimo a propósito: `##` subtítulo, `-` viñeta, línea en blanco
 * entre párrafos, `[texto](url)` para enlaces y `**texto**` para negrita.
 * Evita traer un parser completo (y su superficie de XSS) para las marcas que
 * el cliente va a usar de verdad. Nada se inyecta como HTML: todo sale como
 * texto dentro de elementos de React.
 *
 * Los enlaces existen por SEO y GEO: un artículo que no enlaza a la landing
 * del nicho no le pasa autoridad, y uno que no cita de dónde sale (el episodio,
 * la publicación de Instagram) es menos creíble para un motor de IA.
 */

/**
 * Sólo se aceptan rutas internas y http(s). Cualquier otra cosa —`javascript:`,
 * `data:`— se pinta como texto plano: el cuerpo lo escribe una persona desde
 * el panel y no puede convertirse en una forma de ejecutar código.
 */
function safeHref(url: string): string | null {
  const limpia = url.trim()
  if (/^\/(?!\/)/.test(limpia) || limpia.startsWith('#')) return limpia
  if (/^https?:\/\//i.test(limpia)) return limpia
  return null
}

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  INLINE.lastIndex = 0

  while ((match = INLINE.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index))
    const [completo, etiqueta, url, negrita] = match

    if (negrita !== undefined) {
      out.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {negrita}
        </strong>,
      )
    } else {
      const href = safeHref(url)
      if (!href) {
        out.push(completo)
      } else {
        const externo = /^https?:\/\//i.test(href)
        out.push(
          <a
            key={match.index}
            href={href}
            {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-text"
          >
            {etiqueta}
          </a>,
        )
      }
    }
    last = match.index + completo.length
  }

  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Prose({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/).filter(Boolean)

  return (
    /* La clase `prose` no es de Tailwind: es el gancho que usa la regla de
       centrado en móvil de globals.css para dejar ESTE bloque alineado a la
       izquierda. Centrar párrafos largos deja el margen izquierdo dentado y
       el ojo pierde el punto de retorno en cada línea. */
    <div className="prose flex flex-col gap-6">
      {blocks.map((block, i) => {
        const lines = block.split('\n')

        if (lines[0].startsWith('### ')) {
          return (
            <h3 key={i} className="mt-4 text-xl font-bold leading-snug">
              {lines[0].slice(4)}
            </h3>
          )
        }

        if (lines[0].startsWith('## ')) {
          return (
            <h2 key={i} className="display mt-8 text-[clamp(1.5rem,3vw,2.1rem)]">
              {lines[0].slice(3)}
            </h2>
          )
        }

        if (lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-4 leading-relaxed text-foreground/80">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{inline(line.trim().slice(2))}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={i} className="leading-relaxed text-foreground/80">
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(line)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
