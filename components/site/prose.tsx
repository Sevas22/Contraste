import { Fragment } from 'react'

/**
 * Render del cuerpo del post.
 *
 * Markdown mínimo a propósito: `##` subtítulo, `-` viñeta, línea en blanco
 * entre párrafos. Evita traer un parser completo (y su superficie de XSS)
 * para tres marcas que el cliente va a usar de verdad. Nada se inyecta como
 * HTML: todo sale como texto dentro de elementos de React.
 */
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
                  <span>{line.trim().slice(2)}</span>
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
                {line}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
