import Link from 'next/link'
import { ArrowUpRight, AlertTriangle, Sparkles } from 'lucide-react'
import { auditAll, getNiches } from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'

function ScoreRing({ score }: { score: number }) {
  const tone = score >= 80 ? 'text-emerald-400' : score >= 45 ? 'text-accent' : 'text-red-400'
  return (
    <span className={`display text-[clamp(3rem,8vw,5rem)] ${tone}`}>
      {score}
      <span className="text-2xl text-muted-foreground">/100</span>
    </span>
  )
}

export default async function AdminHome() {
  const [{ audits, average }, niches] = await Promise.all([auditAll(), getNiches()])

  const published = audits.filter((a) => a.episode.status === 'published')
  const weakest = [...audits].sort((a, b) => a.score - b.score).slice(0, 4)

  // Las reglas pendientes más repetidas: por dónde conviene empezar
  const pendingCount = new Map<string, { label: string; why: string; kind: string; n: number }>()
  for (const audit of audits) {
    for (const rule of audit.pending) {
      const entry = pendingCount.get(rule.id) ?? {
        label: rule.label.replace(/ — vas en \d+/, ''),
        why: rule.why,
        kind: rule.kind,
        n: 0,
      }
      entry.n += 1
      pendingCount.set(rule.id, entry)
    }
  }
  const topGaps = [...pendingCount.values()].sort((a, b) => b.n - a.n).slice(0, 5)

  return (
    <div className="max-w-5xl">
      <SectionLabel>Panel administrativo</SectionLabel>
      <h1 className="display mt-4 text-4xl lg:text-5xl">Resumen</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-sm font-bold">Salud SEO &amp; GEO del contenido</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Promedio de {audits.length} episodios
          </p>
          <div className="mt-6">
            <ScoreRing score={average} />
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${average}%` }}
            />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            El puntaje mide qué tanto texto indexable tiene cada episodio. Un video sin resumen,
            conclusiones ni preguntas frecuentes es invisible para Google y para ChatGPT.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Episodios totales', value: audits.length },
            { label: 'Publicados', value: published.length },
            { label: 'Nichos activos', value: niches.length },
            {
              label: 'Con FAQ (clave para GEO)',
              value: audits.filter((a) => a.episode.faqs.length >= 3).length,
            },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
              <p className="display text-4xl text-accent">{stat.value}</p>
              <p className="mt-3 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {topGaps.length > 0 && (
        <section className="mt-10">
          <h2 className="eyebrow flex items-center gap-2">
            <AlertTriangle className="size-3.5" />
            Lo que más te está costando visibilidad
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {topGaps.map((gap) => (
              <li
                key={gap.label}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {gap.label}
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                        gap.kind === 'geo'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {gap.kind}
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{gap.why}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {gap.n} {gap.n === 1 ? 'episodio' : 'episodios'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="eyebrow flex items-center gap-2">
            <Sparkles className="size-3.5" />
            Empieza por estos
          </h2>
          <Link
            href="/admin/episodios"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-text"
          >
            Ver todos
            <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {weakest.map(({ episode, score, pending }) => (
            <li key={episode.slug}>
              <Link
                href={`/admin/episodios/${episode.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold transition-colors group-hover:text-accent-text">
                    {episode.title}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {pending.length} {pending.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
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
      </section>
    </div>
  )
}
