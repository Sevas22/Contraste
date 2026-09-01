import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, ExternalLink, Trash2 } from 'lucide-react'
import { auditEpisode, getEpisode, getNiches, formatDuration } from '@/lib/content'
import { deleteEpisode, updateEpisode } from '../../actions'
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

export default async function EpisodeEditor({ params, searchParams }: Props) {
  const { slug } = await params
  const { guardado } = await searchParams

  const [episode, niches] = await Promise.all([getEpisode(slug), getNiches()])
  if (!episode) notFound()

  const tr = (episode.translations?.en ?? {}) as Record<string, unknown>
  const en = {
    title: (tr.title as string) ?? '',
    subtitle: (tr.subtitle as string) ?? '',
    metaDescription: (tr.metaDescription as string) ?? '',
    summary: (tr.summary as string) ?? '',
    transcript: (tr.transcript as string) ?? '',
    keyTakeaways: (tr.keyTakeaways as string[]) ?? [],
    topics: (tr.topics as string[]) ?? [],
    keywords: (tr.keywords as string[]) ?? [],
    faqs: (tr.faqs as { q: string; a: string }[]) ?? [],
  }

  const { score, rules, pending } = auditEpisode(episode)

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/episodios"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Episodios
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <SectionLabel>Editar episodio</SectionLabel>
          <h1 className="display mt-3 text-3xl lg:text-4xl">{episode.title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-3xl">{score}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">SEO / GEO</p>
          </div>
          <Link
            href={`/v-podcast/${episode.slug}`}
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

      <form action={updateEpisode} className="mt-8 flex flex-col gap-8">
        <input type="hidden" name="originalSlug" value={episode.slug} />

        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Básicos
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Título">
              <input name="title" defaultValue={episode.title} required className={field} />
            </Field>
            <Field label="Subtítulo">
              <input name="subtitle" defaultValue={episode.subtitle} className={field} />
            </Field>
            <Field label="Slug (URL)" hint={`/v-podcast/${episode.slug}`}>
              <input name="slug" defaultValue={episode.slug} className={field} />
            </Field>
            <Field label="Estado">
              <select name="status" defaultValue={episode.status} className={field}>
                <option value="published">Publicado</option>
                <option value="draft">Borrador (no indexable)</option>
              </select>
            </Field>
            <Field label="Número de episodio">
              <input
                name="number"
                type="number"
                min={1}
                defaultValue={episode.number}
                className={field}
              />
            </Field>
            <Field label="Fecha de publicación">
              <input
                name="publishedAt"
                type="date"
                defaultValue={episode.publishedAt}
                className={field}
              />
            </Field>
          </div>

          {/* Relación con nichos: un episodio puede alimentar varias landings */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-xs font-bold">Nichos relacionados</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              El episodio aparecerá en la landing de cada nicho que marques. Es lo que convierte el
              contenido de Óscar en tráfico hacia las páginas comerciales.
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
                    defaultChecked={episode.niches.includes(niche.id)}
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

          <div className="mt-6 border-t border-border pt-6">
            <Field label="Invitados" hint="Uno por línea: Nombre :: Cargo :: @handle">
              <textarea
                name="guests"
                rows={3}
                defaultValue={episode.guests
                  .map((g) => [g.name, g.role, g.handle].filter(Boolean).join(' :: '))
                  .join('\n')}
                className={`${field} resize-y font-mono text-xs`}
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Medio: YouTube, video subido o audio subido ── */}
        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Medio del episodio
          </legend>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
            Elige de dónde sale el episodio. YouTube no consume disco y trae su propia miniatura;
            subir el archivo te da control total pero ocupa espacio en el servidor.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { value: 'youtube', label: 'YouTube', hint: 'Pegar enlace' },
              { value: 'video', label: 'Video (MP4)', hint: 'Hasta 500 MB' },
              { value: 'audio', label: 'Audio (MP3)', hint: 'Hasta 200 MB' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-4 py-3 transition hover:border-accent/50"
              >
                <input
                  type="radio"
                  name="mediaType"
                  value={option.value}
                  defaultChecked={episode.mediaType === option.value}
                  className="mt-0.5 size-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
            <Field
              label="Enlace o ID de YouTube"
              hint="Sólo si elegiste YouTube. Pega la URL completa; se extrae el ID solo."
            >
              <input name="youtubeId" defaultValue={episode.youtubeId} className={field} />
            </Field>
            <Field
              label="Duración"
              hint="Formato mm:ss o segundos. Necesaria para el schema del buscador."
            >
              <input
                name="duration"
                defaultValue={formatDuration(episode.durationSeconds)}
                placeholder="29:06"
                className={field}
              />
            </Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Subir archivo de audio o video"
              hint="MP3, M4A, WAV, MP4, WebM o MOV. Reemplaza el archivo anterior."
            >
              <input
                type="file"
                name="mediaFile"
                accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,video/mp4,video/webm,video/quicktime"
                className={`${field} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground`}
              />
            </Field>
            <Field label="Portada" hint="Opcional. Si la dejas vacía se usa la miniatura de YouTube.">
              <input
                type="file"
                name="coverFile"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className={`${field} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground`}
              />
            </Field>
          </div>

          {(episode.mediaUrl || episode.coverUrl) && (
            <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
              {episode.mediaUrl && (
                <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Check className="size-3.5 text-emerald-400" />
                  Archivo actual: {episode.mediaUrl}
                </li>
              )}
              {episode.coverUrl && (
                <li className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Check className="size-3.5 text-emerald-400" />
                  Portada actual: {episode.coverUrl}
                </li>
              )}
            </ul>
          )}
        </fieldset>

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
                defaultValue={episode.metaDescription}
                className={`${field} resize-y`}
              />
            </Field>
            <Field
              label="Resumen del episodio"
              hint="Mínimo 300 caracteres. Es el único texto real que un buscador puede leer de un video."
            >
              <textarea
                name="summary"
                rows={6}
                defaultValue={episode.summary}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Keywords objetivo" hint="Una por línea.">
                <textarea
                  name="keywords"
                  rows={5}
                  defaultValue={episode.keywords.join('\n')}
                  className={`${field} resize-y font-mono text-xs`}
                />
              </Field>
              <Field label="Temas tratados" hint="Uno por línea. Se muestran en la barra lateral.">
                <textarea
                  name="topics"
                  rows={5}
                  defaultValue={episode.topics.join('\n')}
                  className={`${field} resize-y font-mono text-xs`}
                />
              </Field>
            </div>
            <Field
              label="Capítulos"
              hint="Uno por línea: 00:00 — Introducción. Google los muestra como momentos clave."
            >
              <textarea
                name="chapters"
                rows={6}
                placeholder={'00:00 — Introducción\n04:20 — Precios y valorización'}
                defaultValue={episode.chapters.map((c) => `${c.at} — ${c.label}`).join('\n')}
                className={`${field} resize-y font-mono text-xs`}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            GEO — lo que citan ChatGPT y Perplexity
          </legend>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
            Los motores de respuesta no citan párrafos largos: extraen afirmaciones cortas y pares
            de pregunta/respuesta. Esta sección es la que más mueve la aguja.
          </p>
          <div className="flex flex-col gap-5">
            <Field
              label="Conclusiones clave"
              hint="Una por línea. Frases afirmativas y autónomas, que se entiendan fuera de contexto."
            >
              <textarea
                name="keyTakeaways"
                rows={5}
                placeholder="La valorización en Medellín se concentró en corredores con obra pública en 2025."
                defaultValue={episode.keyTakeaways.join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field
              label="Preguntas frecuentes"
              hint="Una por línea, con el formato: ¿Pregunta? :: Respuesta completa."
            >
              <textarea
                name="faqs"
                rows={7}
                placeholder="¿Conviene invertir en VIS en 2026? :: Sí, siempre que..."
                defaultValue={episode.faqs.map((f) => `${f.q} :: ${f.a}`).join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field
              label="Transcripción"
              hint="Separa párrafos con una línea en blanco. Es tu mayor fuente de búsquedas long-tail."
            >
              <textarea
                name="transcript"
                rows={10}
                defaultValue={episode.transcript}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
          </div>
        </fieldset>


        {/* ── Versión en inglés ──
            Campo a campo: lo que se deje vacío se muestra en español dentro
            del sitio inglés, marcado con su idioma real. No hay que traducir
            el episodio entero de una vez. */}
        <fieldset className="rounded-2xl border border-border p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Versión en inglés — /en/v-podcast/{episode.slug}
          </legend>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
            Lo que dejes vacío se muestra en español. El vídeo, la portada y la duración son los
            mismos en los dos idiomas.
          </p>

          <div className="flex flex-col gap-5">
            <Field label="Title" hint="Vacío = se usa el título en español.">
              <input name="en_title" defaultValue={en.title} className={field} />
            </Field>

            <Field label="Subtitle">
              <input name="en_subtitle" defaultValue={en.subtitle} className={field} />
            </Field>

            <Field label="Meta description">
              <textarea
                name="en_metaDescription"
                rows={2}
                defaultValue={en.metaDescription}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Summary">
              <textarea
                name="en_summary"
                rows={5}
                defaultValue={en.summary}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Key takeaways" hint="Una por línea.">
              <textarea
                name="en_keyTakeaways"
                rows={5}
                defaultValue={en.keyTakeaways.join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Topics" hint="Uno por línea.">
              <textarea
                name="en_topics"
                rows={4}
                defaultValue={en.topics.join('\n')}
                className={`${field} resize-y`}
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

            <Field label="Transcript">
              <textarea
                name="en_transcript"
                rows={10}
                defaultValue={en.transcript}
                className={`${field} resize-y font-mono text-xs leading-relaxed`}
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
            Se guarda en <code className="font-mono">content/episodes.json</code>
          </span>
        </div>
      </form>

      <form action={deleteEpisode} className="mt-10 border-t border-border pt-8">
        <input type="hidden" name="slug" value={episode.slug} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 transition hover:text-red-300"
        >
          <Trash2 className="size-3.5" />
          Eliminar este episodio
        </button>
      </form>
    </div>
  )
}
