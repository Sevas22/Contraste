import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, ExternalLink } from 'lucide-react'
import { auditNiche, getNicheById, wordCount } from '@/lib/content'
import { pageTitle } from '@/lib/site'
import { updateNiche } from '../../niche-actions'
import { SectionLabel } from '@/components/site/brand-mark'

type Props = {
  params: Promise<{ id: string }>
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

/**
 * Editor de una landing de nicho.
 *
 * Deja fuera a propósito el nombre, el slug y el color: el slug es la URL
 * heredada del WordPress (cambiarla pierde la indexación) y el nombre alimenta
 * el menú. Aquí sólo se toca lo que posiciona: titular, descripción, texto
 * largo, keywords y preguntas frecuentes.
 */
export default async function NicheEditor({ params, searchParams }: Props) {
  const { id } = await params
  const { guardado } = await searchParams

  const niche = await getNicheById(id)
  if (!niche) notFound()

  const tr = niche.translations?.en ?? {}
  const en = {
    headline: (tr.headline as string) ?? '',
    subheadline: (tr.subheadline as string) ?? '',
    description: (tr.description as string) ?? '',
    intro: (tr.intro as string) ?? '',
    body: (tr.body as string) ?? '',
    keywords: (tr.keywords as string[]) ?? [],
    capabilities: (tr.capabilities as string[]) ?? [],
    faqs: (tr.faqs as { q: string; a: string }[]) ?? [],
  }

  const { score, rules, pending } = auditNiche(niche)
  const titulo = pageTitle(niche.headline)

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/nichos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Nichos
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <SectionLabel>Editar landing</SectionLabel>
          <h1 className="display mt-3 text-3xl lg:text-4xl">{niche.name}</h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">/{niche.slug}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-3xl">{score}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">SEO / GEO</p>
          </div>
          <Link
            href={`/${niche.slug}`}
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
          Cambios guardados. La landing ya se regeneró.
        </p>
      )}

      {/* Vista previa del resultado de Google: es lo que decide el clic, y
          escribirlo a ciegas en un campo de texto no deja ver dónde se corta. */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Así se ve en Google
        </h2>
        <div className="mt-4 max-w-2xl rounded-xl bg-white p-5 font-sans text-left">
          <p className="truncate text-xs text-[#4d5156]">contrasteagencia.com › {niche.slug}</p>
          <p className="mt-1 truncate text-xl leading-snug text-[#1a0dab]">{titulo}</p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#4d5156]">
            {niche.description || 'Sin meta description: Google recortará un trozo cualquiera de la página.'}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
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

      <form action={updateNiche} className="mt-8 flex flex-col gap-8">
        <input type="hidden" name="id" value={niche.id} />

        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            SEO — lo que lee Google
          </legend>
          <div className="flex flex-col gap-5">
            <Field
              label="Titular (H1 y título de la pestaña)"
              hint="Máximo 60 caracteres. Empieza por la búsqueda principal del sector."
            >
              <input name="headline" defaultValue={niche.headline} required maxLength={90} className={field} />
            </Field>
            <Field label="Subtítulo">
              <input name="subheadline" defaultValue={niche.subheadline} className={field} />
            </Field>
            <Field
              label="Meta description"
              hint="120–160 caracteres. Es el texto bajo el título en los resultados de búsqueda."
            >
              <textarea
                name="description"
                rows={2}
                maxLength={200}
                defaultValue={niche.description}
                className={`${field} resize-y`}
              />
            </Field>
            <Field
              label="Keywords objetivo"
              hint="Una por línea. Salen también en la marquesina de la landing, así que tienen que leerse bien."
            >
              <textarea
                name="keywords"
                rows={6}
                defaultValue={niche.keywords.join('\n')}
                className={`${field} resize-y font-mono text-xs`}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            Contenido — {wordCount(niche.body)} palabras en el texto largo
          </legend>
          <div className="flex flex-col gap-5">
            <Field label="Introducción" hint="El párrafo junto al titular. Directo y en dos o tres frases.">
              <textarea
                name="intro"
                rows={3}
                defaultValue={niche.intro}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field label="Qué hacemos" hint="Una capacidad por línea. Salen como lista con check.">
              <textarea
                name="capabilities"
                rows={5}
                defaultValue={niche.capabilities.join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field
              label="Texto largo"
              hint="## para subtítulo, - al inicio para viñetas, línea en blanco entre párrafos. Menciona las ciudades donde operan."
            >
              <textarea
                name="body"
                rows={24}
                defaultValue={niche.body}
                className={`${field} resize-y font-mono text-[13px] leading-relaxed`}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-accent-text">
            GEO — lo que citan ChatGPT y Perplexity
          </legend>
          <Field
            label="Preguntas frecuentes"
            hint="Una por línea: ¿Pregunta? :: Respuesta completa. Respuestas que se entiendan solas, sin 'como dijimos arriba'."
          >
            <textarea
              name="faqs"
              rows={10}
              defaultValue={niche.faqs.map((f) => `${f.q} :: ${f.a}`).join('\n')}
              className={`${field} resize-y leading-relaxed`}
            />
          </Field>
        </fieldset>

        <fieldset className="rounded-2xl border border-border p-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Versión en inglés — /en/{niche.slug}
          </legend>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
            Lo que dejes vacío se muestra en español.
          </p>
          <div className="flex flex-col gap-5">
            <Field label="Headline">
              <input name="en_headline" defaultValue={en.headline} className={field} />
            </Field>
            <Field label="Subheadline">
              <input name="en_subheadline" defaultValue={en.subheadline} className={field} />
            </Field>
            <Field label="Meta description">
              <textarea
                name="en_description"
                rows={2}
                defaultValue={en.description}
                className={`${field} resize-y`}
              />
            </Field>
            <Field label="Keywords" hint="Una por línea.">
              <textarea
                name="en_keywords"
                rows={5}
                defaultValue={en.keywords.join('\n')}
                className={`${field} resize-y font-mono text-xs`}
              />
            </Field>
            <Field label="Intro">
              <textarea
                name="en_intro"
                rows={3}
                defaultValue={en.intro}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field label="Capabilities" hint="Una por línea.">
              <textarea
                name="en_capabilities"
                rows={5}
                defaultValue={en.capabilities.join('\n')}
                className={`${field} resize-y leading-relaxed`}
              />
            </Field>
            <Field label="Body">
              <textarea
                name="en_body"
                rows={16}
                defaultValue={en.body}
                className={`${field} resize-y font-mono text-xs leading-relaxed`}
              />
            </Field>
            <Field label="FAQs" hint="Question? :: Full answer">
              <textarea
                name="en_faqs"
                rows={8}
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
          <span className="text-xs text-muted-foreground">La URL no cambia al guardar.</span>
        </div>
      </form>
    </div>
  )
}
