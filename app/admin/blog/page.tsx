import Link from 'next/link'
import { Plus } from 'lucide-react'
import { auditAllPosts, getNiches, formatDate } from '@/lib/content'
import { createPost } from '../post-actions'
import { SectionLabel } from '@/components/site/brand-mark'

export default async function BlogAdmin() {
  const [{ audits, average }, niches] = await Promise.all([auditAllPosts(), getNiches()])
  const published = audits.filter((a) => a.post.status === 'published').length

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Contenido</SectionLabel>
          <h1 className="display mt-4 text-4xl lg:text-5xl">Posts del blog</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono text-2xl">{published}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">publicados</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl">{average}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              score medio
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Cada post genera una página en <code className="font-mono">/blog</code> con schema
        <code className="ml-1 font-mono">BlogPosting</code>. La ciudad objetivo es lo que hace que
        compita en búsquedas locales en vez de contra todo el país.
      </p>

      {/* Alta rápida */}
      <form
        action={createPost}
        className="mt-10 grid gap-3 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[1fr_200px_auto]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="new-post-title" className="text-xs font-bold">
            Título del post
          </label>
          <input
            id="new-post-title"
            name="title"
            required
            placeholder="Cómo elegir agencia BTL en Medellín"
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="new-post-location" className="text-xs font-bold">
            Ciudad objetivo
          </label>
          <input
            id="new-post-location"
            name="location"
            placeholder="Medellín"
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-accent px-5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110"
          >
            <Plus className="size-4" />
            Nuevo post
          </button>
        </div>
      </form>

      {audits.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          Todavía no hay posts. Crea el primero con el formulario de arriba.
        </p>
      ) : (
        <ul className="mt-12 flex flex-col rounded-2xl border border-border bg-card">
          {audits.map(({ post, score, pending }) => (
            <li key={post.slug} className="border-b border-border last:border-b-0">
              <Link
                href={`/admin/blog/${post.slug}`}
                className="group flex flex-col gap-3 p-5 transition hover:bg-secondary/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold transition-colors group-hover:text-accent-text">
                    {post.title}
                  </p>
                  <p className="mt-1.5 truncate font-mono text-xs text-muted-foreground">
                    /blog/{post.slug}
                    {post.location && ` · ${post.location}`}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {pending.length === 0
                      ? 'Contenido completo'
                      : `${pending.length} pendientes · ${pending[0].label.replace(/ — vas en \d+/, '')}`}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-accent" style={{ width: `${score}%` }} />
                    </div>
                    <span className="w-8 text-right font-mono text-sm">{score}</span>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      post.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {niches.length > 0 && (
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Al relacionar un post con un nicho, aparece en su landing y le pasa autoridad. Nichos
          disponibles: {niches.map((n) => n.name).join(' · ')}.
        </p>
      )}
    </div>
  )
}
