import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, ExternalLink, Trash2 } from 'lucide-react'
import { auditPost, getPost, getNiches, wordCount } from '@/lib/content'
import { deletePost, updatePost } from '../../post-actions'
import { SectionLabel } from '@/components/site/brand-mark'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ guardado?: string }>
}

const field =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-accent'

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold">{label}</span>
      {hint && <span className="-mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</span>}
      {children}
    </label>
  )
}

export default async function PostEditor({ params, searchParams }: Props) {
  const { slug } = await params
  const { guardado } = await searchParams

  const [post, niches] = await Promise.all([getPost(slug), getNiches()])
  if (!post) notFound()

  const en = {
    title: (post.translations?.en?.title as string) ?? '',
    excerpt: (post.translations?.en?.excerpt as string) ?? '',
    metaDescription: (post.translations?.en?.metaDescription as string) ?? '',
    body: (post.translations?.en?.body as string) ?? '',
    keywords: (post.translations?.en?.keywords as string[]) ?? [],
    faqs: (post.translations?.en?.faqs as { q: string; a: string }[]) ?? [],
  }

  const { score, rules, pending } = auditPost(post)

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Posts del blog
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <SectionLabel>Editar post</SectionLabel>
          <h1 className="display mt-3 text-3xl lg:text-4xl">{post.title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-3xl">{score}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">SEO / GEO</p>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold transition hover:text-accent-text"
          >
            <ExternalLink className="size-3.5" />
            Ver página
          </Link>
        </div>
      </div>

      {guardado && (
        <p className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          <Check className="size-4" />
          Cambios guardados. Las páginas públicas ya se regeneraron.
        </p>
      )}

      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold">
          Checklist de visibilidad
          <span className="ml-2 font-normal text-muted-foreground">
            {rules.length - pending.length}/{rules.length} completas
          </span>
        </h2>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {rules.map((rule) => (
            <li key={rule.id} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                  rule.done ? 'bg-emerald-500 text-black' : 'border border-border'
                }`}
                aria-hidden="true"
              >
                {rule.done && <Check className="size-2.5" strokeWidth={4} />}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-xs font-semibold ${rule.done ? 'text-muted-foreground line-through' : ''}`}
                >
                  {rule.label}
                </span>
                {!rule.done && (
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {rule.why}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <form action={updatePost} className="mt-8 flex flex-col gap-8">
        <input type="hidden" name="originalSlug" value={post.slug} />
        <input type="hidden" name="coverUrl" value={post.coverUrl} />

        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Básicos
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Título" hint="Entre 30 y 65 caracteres para que no se corte en Google.">
              <input name="title" defaultValue={post.title} required className={field} />
            </Field>
            <Field label="Slug (URL)" hint={`/blog/${post.slug}`}>
              <input name="slug" defaultValue={post.slug} className={field} />
            </Field>
            <Field
              label="Ciudad o región objetivo"
              hint="La señal más fuerte de SEO local. Ej: Medellín, Bogotá, Antioquia."
            >
              <input name="location" defaultValue={post.location} className={field} />
            </Field>
            <Field label="Autor">
              <input name="author" defaultValue={post.author} className={field} />
            </Field>
            <Field label="Estado">
              <select name="status" defaultValue={post.status} className={field}>
                <option value="published">Publicado</option>
                <option value="draft">Borrador (no indexable)</option>
              </select>
            </Field>
            <Field label="Fecha de publicación">
              <input
                name="publishedAt"
                type="date"
                defaultValue={post.publishedAt}
                className={field}
              />
            </Field>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-xs font-bold">Nichos relacionados</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              El post aparecerá en la landing de cada nicho marcado y le pasará autoridad.
            </p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {niches.map((niche) => (
                <label
                  key={niche.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm transition hover:border-accent/50"
                >
                  <input
                    type="checkbox"
                    name="niches"
                    value={niche.id}
                    defaultChecked={post.niches.includes(niche.id)}
                    className="size-4 accent-[var(--accent)]"
                  />
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: niche.accent }}
                    aria-hidden="true"
                  />
                  {niche.name}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* ── Portada ── */}
        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Portada
          </legend>
          <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              {post.coverUrl ? (
                <Image src={post.coverUrl} alt="" fill sizes="220px" className="object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center text-xs text-muted-foreground">
                  Sin portada
                </span>
              )}
            </div>
            <Field
              label="Subir imagen"
              hint="JPG, PNG, WebP o AVIF. Máximo 8 MB. Al subir una nueva se reemplaza la anterior."
            >
              <input
                type="file"
                name="coverFile"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className={`${field} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground`}
              />
            </Field>
          </div>
        </fieldset>

        {/* ── SEO ── */}
        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            SEO — lo que lee Google
          </legend>
          <div className="flex flex-col gap-5">
            <Field
              label="Meta description"
              hint="120–160 caracteres. Es el texto bajo el título en los resultados de búsqueda."
            >
              <textarea
                name="metaDescription"
                rows={2}
                maxLength={200}
                defaultValue={post.metaDescription}
                className={`${field} resize-y`}
              />
            </Field>
            <Field label="Resumen" hint="Se usa en las tarjetas del listado y al compartir el enlace.">
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={post.excerpt}
                className={`${field} resize-y`}
              />
            </Field>
            <Field label="Keywords objetivo" hint="Una por línea.">
              <textarea
                name="keywords"
                rows={4}
                defaultValue={post.keywords.join('\n')}
                className={`${field} resize-y font-mono text-xs`}
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Cuerpo ── */}
        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Cuerpo del artículo — {wordCount(post.body)} palabras
          </legend>
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            Formato simple: <code className="font-mono">##</code> para subtítulo,{' '}
            <code className="font-mono">-</code> al inicio para viñetas, y una línea en blanco entre
            párrafos. Apunta a 600+ palabras y al menos 3 subtítulos.
          </p>
          <textarea
            name="body"
            rows={22}
            defaultValue={post.body}
            placeholder={
              '## El problema\n\nPárrafo de contexto...\n\n## Qué medir realmente\n\n- Costo por contacto\n- Tasa de prueba\n\n## Conclusión\n\nCierre.'
            }
            className={`${field} resize-y font-mono text-[13px] leading-relaxed`}
          />
        </fieldset>

        {/* ── GEO ── */}
        <fieldset className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            GEO — lo que citan ChatGPT y Perplexity
          </legend>
          <Field
            label="Preguntas frecuentes"
            hint="Una por línea, con el formato: ¿Pregunta? :: Respuesta completa. Generan schema FAQPage."
          >
            <textarea
              name="faqs"
              rows={7}
              placeholder="¿Cuánto cuesta una activación BTL? :: Depende de..."
              defaultValue={post.faqs.map((f) => `${f.q} :: ${f.a}`).join('\n')}
              className={`${field} resize-y leading-relaxed`}
            />
          </Field>
        </fieldset>



        {/* ── Versión en inglés ──
            Se traduce campo a campo, no ficha a ficha: lo que se deje vacío se
            muestra en español dentro del sitio inglés y marcado con su idioma
            real. Exigir la traducción completa habría dejado sin efecto
            cualquier avance parcial, que es el estado normal mientras se
            traduce. */}
        <fieldset className="rounded-2xl border border-border p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Versión en inglés — /en/blog/{post.slug}
          </legend>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
            Lo que dejes vacío se muestra en español. No hace falta traducirlo todo de golpe.
          </p>

          <div className="flex flex-col gap-5">
            <Field label="Title" hint="Vacío = se usa el título en español.">
              <input name="en_title" defaultValue={en.title ?? ''} className={field} />
            </Field>

            <Field label="Excerpt">
              <textarea
                name="en_excerpt"
                rows={3}
                defaultValue={en.excerpt ?? ''}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Meta description">
              <textarea
                name="en_metaDescription"
                rows={2}
                defaultValue={en.metaDescription ?? ''}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Body" hint="Mismo formato que el español: ## para subtítulos, - para listas.">
              <textarea
                name="en_body"
                rows={14}
                defaultValue={en.body ?? ''}
                className={`${field} resize-y font-mono text-xs leading-relaxed`}
              />
            </Field>

            <Field label="Keywords" hint="Una por línea.">
              <textarea
                name="en_keywords"
                rows={4}
                defaultValue={en.keywords.join('\n')}
                className={`${field} resize-y`}
              />
            </Field>

            <Field label="FAQs" hint="Question? :: Full answer">
              <textarea
                name="en_faqs"
                rows={6}
                defaultValue={en.faqs.map((f) => `${f.q} :: ${f.a}`).join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
          </div>
        </fieldset>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-between gap-4 border-t border-border bg-background/90 px-6 py-4 backdrop-blur lg:-mx-12 lg:px-12">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110"
          >
            <Check className="size-4" />
            Guardar cambios
          </button>
          <span className="text-xs text-muted-foreground">
            Se guarda en <code className="font-mono">content/posts.json</code>
          </span>
        </div>
      </form>

      <form action={deletePost} className="mt-10 border-t border-border pt-8">
        <input type="hidden" name="slug" value={post.slug} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 transition hover:text-red-300"
        >
          <Trash2 className="size-3.5" />
          Eliminar este post
        </button>
      </form>
    </div>
  )
}
