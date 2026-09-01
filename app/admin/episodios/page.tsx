import Link from 'next/link'
import { Plus } from 'lucide-react'
import { auditAll, getNiches } from '@/lib/content'
import { createEpisode } from '../actions'
import { SectionLabel } from '@/components/site/brand-mark'

export default async function EpisodesAdmin() {
  const [{ audits }, niches] = await Promise.all([auditAll(), getNiches()])

  return (
    <div className="max-w-5xl">
      <SectionLabel>V-Podcast</SectionLabel>
      <h1 className="display mt-4 text-4xl lg:text-5xl">Episodios</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Todo el contenido se centraliza aquí. Cada episodio genera su página en{' '}
        <code className="font-mono">/v-podcast</code> y aparece en las landings de los nichos que
        tenga marcados. El puntaje indica cuánto texto leíble tiene para buscadores y motores de IA.
      </p>

      {/* Alta rápida */}
      <form
        action={createEpisode}
        className="mt-10 grid gap-3 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[1fr_220px_auto]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="new-title" className="text-xs font-bold">
            Título del episodio
          </label>
          <input
            id="new-title"
            name="title"
            required
            placeholder="¿Cómo elegir zona para invertir en 2026?"
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="new-niche" className="text-xs font-bold">
            Nicho inicial
          </label>
          <select
            id="new-niche"
            name="niche"
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Sin nicho</option>
            {niches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-accent px-5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110"
          >
            <Plus className="size-4" />
            Crear
          </button>
        </div>
      </form>

      <ul className="mt-12 flex flex-col">
        {audits.map(({ episode, score, pending }) => (
          <li key={episode.slug}>
            <Link
              href={`/admin/episodios/${episode.slug}`}
              className="group flex flex-col gap-3 border-b border-border py-5 transition sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2.5">
                  <span className="truncate text-sm font-bold transition-colors group-hover:text-accent-text">
                    {episode.title}
                  </span>
                  <span
                    className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase ${
                      episode.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {episode.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                  {episode.niches.map((id) => {
                    const niche = niches.find((n) => n.id === id)
                    if (!niche) return null
                    return (
                      <span
                        key={id}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: niche.accent }}
                          aria-hidden="true"
                        />
                        {niche.name}
                      </span>
                    )
                  })}
                  {episode.niches.length === 0 && (
                    <span className="shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase text-amber-400">
                      sin nicho
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {pending.length === 0
                    ? 'Contenido completo'
                    : `${pending.length} pendientes · ${pending[0].label.replace(/ — vas en \d+/, '')}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-accent" style={{ width: `${score}%` }} />
                </div>
                <span className="w-10 text-right font-mono text-sm">{score}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
