'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveUpload, removeUpload } from '@/lib/uploads'
import {
  getEpisode,
  getEpisodes,
  getNiches,
  saveEpisode,
  deleteEpisodeBySlug,
  type Chapter,
  type Episode,
  type Faq,
  type Guest,
  CONTENT_TAG,
} from '@/lib/content'

/* ── Parsers de campos multilínea ───────────────────────────────
   El editor usa textareas con una entrada por línea: es mucho más
   rápido de llenar que un formulario con botones "añadir fila". */

function parseLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

/** "00:00 — Introducción" o "00:00 | Introducción" */
function parseChapters(value: string): Chapter[] {
  return parseLines(value)
    .map((line) => {
      const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s*(?:[|—–-]\s*)?(.*)$/)
      if (!match) return null
      return { at: match[1], label: match[2].trim() }
    })
    .filter((c): c is Chapter => Boolean(c && c.label))
}

/** "¿Pregunta? :: Respuesta" */
function parseFaqs(value: string): Faq[] {
  return parseLines(value)
    .map((line) => {
      const [q, ...rest] = line.split('::')
      const a = rest.join('::').trim()
      return q && a ? { q: q.trim(), a } : null
    })
    .filter((f): f is Faq => Boolean(f))
}

/** "Andrés Giraldo :: Desarrollador inmobiliario :: @handle" */
function parseGuests(value: string): Guest[] {
  return parseLines(value)
    .map((line) => {
      const [name, role = '', handle = ''] = line.split('::').map((p) => p.trim())
      return name ? { name, role, ...(handle ? { handle } : {}) } : null
    })
    .filter((g): g is Guest => Boolean(g))
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim()
}

function num(formData: FormData, key: string): number {
  const value = Number(formData.get(key))
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0
}

/** Acepta "29:06", "1746" o "29:06:00" y devuelve segundos. */
function parseDuration(raw: string): number {
  if (!raw) return 0
  if (/^\d+$/.test(raw)) return Number(raw)
  const parts = raw.split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, part) => acc * 60 + part, 0)
}

/** Extrae el ID de un enlace de YouTube pegado en cualquier formato. */
function parseYouTubeId(raw: string): string {
  if (!raw) return ''
  const match = raw.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  )
  if (match) return match[1]
  return /^[\w-]{11}$/.test(raw) ? raw : ''
}

/**
 * Arma el objeto de traducción a partir de los campos `en_*` del formulario.
 *
 * Sólo entra lo que tenga contenido: un campo vacío NO se guarda, para que la
 * superposición lo deje caer al español en vez de publicar un titular en blanco.
 * Si no queda nada, devuelve el objeto sin la clave del idioma — así una ficha
 * sin traducir no arrastra basura en la base.
 */
function readTranslations(
  formData: FormData,
  previas: Record<string, Record<string, unknown>> | undefined,
  campos: { texto: string[]; lineas?: string[]; faqs?: string[] },
): Record<string, Record<string, unknown>> {
  const en: Record<string, unknown> = {}

  for (const campo of campos.texto) {
    const v = String(formData.get(`en_${campo}`) ?? '').trim()
    if (v) en[campo] = v
  }
  for (const campo of campos.lineas ?? []) {
    const v = parseLines(String(formData.get(`en_${campo}`) ?? ''))
    if (v.length) en[campo] = v
  }
  for (const campo of campos.faqs ?? []) {
    const v = parseFaqs(String(formData.get(`en_${campo}`) ?? ''))
    if (v.length) en[campo] = v
  }

  const resto = { ...(previas ?? {}) }
  if (Object.keys(en).length) resto.en = en
  else delete resto.en
  return resto
}

export async function updateEpisode(formData: FormData) {
  const originalSlug = str(formData, 'originalSlug')

  const previousEpisode = await getEpisode(originalSlug)
  if (!previousEpisode) throw new Error(`Episodio no encontrado: ${originalSlug}`)

  const title = str(formData, 'title')
  // Los nichos llegan como checkboxes: un episodio puede servir a varias verticales
  const niches = formData.getAll('niches').map(String).filter(Boolean)

  const previous = previousEpisode
  const mediaType = (['youtube', 'video', 'audio'] as const).includes(
    str(formData, 'mediaType') as never,
  )
    ? (str(formData, 'mediaType') as Episode['mediaType'])
    : 'youtube'

  // Archivos: sólo se reemplaza lo que el usuario haya subido en este envío
  const uploadedMedia = await saveUpload(
    formData.get('mediaFile') as File | null,
    mediaType === 'audio' ? 'audio' : 'video',
    'podcast',
    originalSlug,
  )
  const uploadedCover = await saveUpload(
    formData.get('coverFile') as File | null,
    'image',
    'podcast',
    `${originalSlug}-portada`,
  )

  // Si se sube un reemplazo, se borra el anterior para no dejar basura en disco
  if (uploadedMedia && previous.mediaUrl) await removeUpload(previous.mediaUrl)
  if (uploadedCover && previous.coverUrl) await removeUpload(previous.coverUrl)

  const updated: Episode = {
    ...previous,
    niches,
    mediaType,
    mediaUrl: uploadedMedia ?? previous.mediaUrl,
    coverUrl: uploadedCover ?? previous.coverUrl,
    slug: str(formData, 'slug') || slugify(title) || originalSlug,
    status: str(formData, 'status') === 'published' ? 'published' : 'draft',
    number: num(formData, 'number') || previous.number,
    title,
    subtitle: str(formData, 'subtitle'),
    metaDescription: str(formData, 'metaDescription'),
    summary: str(formData, 'summary'),
    youtubeId: parseYouTubeId(str(formData, 'youtubeId')),
    durationSeconds: parseDuration(str(formData, 'duration')),
    publishedAt: str(formData, 'publishedAt') || previous.publishedAt,
    updatedAt: new Date().toISOString().slice(0, 10),
    guests: parseGuests(str(formData, 'guests')),
    topics: parseLines(str(formData, 'topics')),
    keywords: parseLines(str(formData, 'keywords')),
    chapters: parseChapters(str(formData, 'chapters')),
    keyTakeaways: parseLines(str(formData, 'keyTakeaways')),
    faqs: parseFaqs(str(formData, 'faqs')),
    transcript: str(formData, 'transcript'),
    translations: readTranslations(formData, previous.translations, {
      texto: ['title', 'subtitle', 'metaDescription', 'summary', 'transcript'],
      lineas: ['keyTakeaways', 'topics', 'keywords'],
      faqs: ['faqs'],
    }),
  }

  await saveEpisode(updated, originalSlug)

  // Regenera las páginas públicas afectadas
  updateTag(CONTENT_TAG)
  revalidatePath('/')
  revalidatePath('/v-podcast')
  revalidatePath(`/v-podcast/${originalSlug}`)
  revalidatePath(`/v-podcast/${updated.slug}`)
  for (const nicheSlug of await nicheSlugsFor([...previous.niches, ...niches])) {
    revalidatePath(`/${nicheSlug}`)
  }
  revalidatePath('/admin', 'layout')

  redirect(`/admin/episodios/${updated.slug}?guardado=1`)
}

/** Traduce ids de nicho a sus rutas públicas, para revalidar sólo lo afectado. */
async function nicheSlugsFor(ids: string[]): Promise<string[]> {
  const niches = await getNiches()
  return [...new Set(ids)]
    .map((id) => niches.find((n) => n.id === id)?.slug)
    .filter((slug): slug is string => Boolean(slug))
}

export async function createEpisode(formData: FormData) {
  const title = str(formData, 'title')
  if (!title) throw new Error('El título es obligatorio')

  const episodes = await getEpisodes()
  const slug = slugify(title)

  if (episodes.some((e) => e.slug === slug)) {
    throw new Error('Ya existe un episodio con ese título')
  }

  const nicheId = str(formData, 'niche')

  const episode: Episode = {
    slug,
    niches: nicheId ? [nicheId] : [],
    mediaType: 'youtube',
    mediaUrl: '',
    coverUrl: '',
    status: 'draft',
    number: Math.max(0, ...episodes.map((e) => e.number)) + 1,
    title,
    subtitle: '',
    metaDescription: '',
    summary: '',
    youtubeId: parseYouTubeId(str(formData, 'youtubeId')),
    durationSeconds: 0,
    publishedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    guests: [],
    topics: [],
    keywords: [],
    chapters: [],
    keyTakeaways: [],
    faqs: [],
    transcript: '',
  }

  await saveEpisode(episode)
  revalidatePath('/admin', 'layout')
  redirect(`/admin/episodios/${slug}`)
}

export async function deleteEpisode(formData: FormData) {
  const slug = str(formData, 'slug')

  const target = await getEpisode(slug)
  if (target?.mediaUrl) await removeUpload(target.mediaUrl)
  if (target?.coverUrl) await removeUpload(target.coverUrl)
  await deleteEpisodeBySlug(slug)

  updateTag(CONTENT_TAG)

  revalidatePath('/')
  revalidatePath('/v-podcast')
  for (const nicheSlug of await nicheSlugsFor(target?.niches ?? [])) {
    revalidatePath(`/${nicheSlug}`)
  }
  revalidatePath('/admin', 'layout')
  redirect('/admin/episodios')
}
