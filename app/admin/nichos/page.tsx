import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { auditAll, getNiches } from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'

export default async function NichesAdmin() {
  const [niches, { audits }] = await Promise.all([getNiches(), auditAll()])

  return (
    <div className="max-w-5xl">
      <SectionLabel>Estructura</SectionLabel>
      <h1 className="display mt-4 text-4xl lg:text-5xl">Nichos</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Cada nicho es una landing propia que conserva la URL original del WordPress, con su
        descripción, capacidades y preguntas frecuentes. Es lo que permite competir por búsquedas
        de sector en vez de tener un sitio genérico.
      </p>

      <ul className="mt-10 flex flex-col gap-4">
        {niches.map((niche) => {
          const items = audits.filter((a) => a.episode.niches.includes(niche.id))
          const average = items.length
            ? Math.round(items.reduce((sum, a) => sum + a.score, 0) / items.length)
            : 0

          return (
            <li key={niche.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: niche.accent }}
                      aria-hidden="true"
                    />
                    <h2 className="font-bold">{niche.name}</h2>
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    /{niche.slug}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {niche.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-5">
                  <div className="text-right">
                    <p className="font-mono text-2xl">{items.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      episodios
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-2xl">{average}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      score medio
                    </p>
                  </div>
                  <Link
                    href={`/${niche.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold transition hover:text-accent-text"
                  >
                    <ExternalLink className="size-3.5" />
                    Ver
                  </Link>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                {niche.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full bg-secondary px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      <p className="mt-8 rounded-xl border border-dashed border-border p-5 text-xs leading-relaxed text-muted-foreground">
        Los nichos se editan en <code className="font-mono">content/niches.json</code>. Si quieres
        crearlos y editarlos desde aquí, es el siguiente paso natural del panel.
      </p>
    </div>
  )
}
