import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import {
  fetchNiches,
  fetchEpisodes,
  fetchPosts,
  upsertEpisode,
  upsertPost,
  removeEpisode,
  removePost,
  fetchInstagramPosts,
  upsertInstagramPost,
  removeInstagramPost,
} from './repo'
import type { Episode, InstagramPost, Niche, Post } from './types'

export type {
  Chapter,
  Episode,
  Faq,
  Guest,
  InstagramMediaType,
  InstagramPost,
  MediaType,
  Niche,
  Post,
} from './types'

/* ── Caché ─────────────────────────────────────────────────────
   Dos niveles, porque resuelven problemas distintos:

   1. `unstable_cache` guarda el resultado ENTRE peticiones. Sin esto,
      cada visita vuelve a consultar Neon. Se invalida por etiqueta desde
      las Server Actions al guardar contenido.

   2. `cache` de React deduplica DENTRO de una misma petición. El Header
      y la página piden los mismos nichos; sin esto son dos consultas.

   Importa porque cada ida y vuelta al driver HTTP de Neon cuesta cientos
   de milisegundos, y se acumulan en serie.                            */

export const CONTENT_TAG = 'contenido'

const cachedNiches = unstable_cache(async () => fetchNiches(), ['niches'], {
  tags: [CONTENT_TAG],
})
const cachedEpisodes = unstable_cache(async () => fetchEpisodes(), ['episodes'], {
  tags: [CONTENT_TAG],
})
const cachedPosts = unstable_cache(async () => fetchPosts(), ['posts'], {
  tags: [CONTENT_TAG],
})
const cachedInstagram = unstable_cache(async () => fetchInstagramPosts(), ['instagram'], {
  tags: [CONTENT_TAG],
})

/* ── Consultas ────────────────────────────────────────────────── */

export const getNiches = cache(async (): Promise<Niche[]> => cachedNiches())

/** Busca por ruta pública (la URL heredada del WordPress). */
export async function getNiche(slug: string): Promise<Niche | undefined> {
  return (await getNiches()).find((n) => n.slug === slug)
}

/** Busca por id corto (el que referencian episodios y posts). */
export async function getNicheById(id: string): Promise<Niche | undefined> {
  return (await getNiches()).find((n) => n.id === id)
}

export const getEpisodes = cache(async (): Promise<Episode[]> => cachedEpisodes())

export async function getPublishedEpisodes(): Promise<Episode[]> {
  return (await getEpisodes()).filter((e) => e.status === 'published')
}

export async function getEpisodesByNiche(nicheId: string, includeDrafts = false): Promise<Episode[]> {
  return (await getEpisodes()).filter(
    (e) => e.niches.includes(nicheId) && (includeDrafts || e.status === 'published'),
  )
}

export async function getEpisode(slug: string): Promise<Episode | undefined> {
  return (await getEpisodes()).find((e) => e.slug === slug)
}

export async function saveEpisode(episode: Episode, originalSlug?: string): Promise<void> {
  return upsertEpisode(episode, originalSlug)
}

export async function deleteEpisodeBySlug(slug: string): Promise<void> {
  return removeEpisode(slug)
}

export const getPosts = cache(async (): Promise<Post[]> => cachedPosts())

export async function getPublishedPosts(): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.status === 'published')
}

export async function getPostsByNiche(nicheId: string, includeDrafts = false): Promise<Post[]> {
  return (await getPosts()).filter(
    (p) => p.niches.includes(nicheId) && (includeDrafts || p.status === 'published'),
  )
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug)
}

export async function savePost(post: Post, originalSlug?: string): Promise<void> {
  return upsertPost(post, originalSlug)
}

export async function deletePostBySlug(slug: string): Promise<void> {
  return removePost(slug)
}

/* ── Utilidades de formato ───────────────────────────────────── */

export function formatDuration(seconds: number): string {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Duración en formato ISO-8601 — lo que exige schema.org para VideoObject. */
export function isoDuration(seconds: number): string {
  if (!seconds) return 'PT0S'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `PT${m}M${s}S`
}

export function formatDate(iso: string, locale: 'es' | 'en' = 'es'): string {
  // 'es-CO' da '1 de diciembre de 2025'; 'en-US' da 'December 1, 2025'.
  // Sin esto las fechas se quedaban en español dentro del sitio inglés.
  return new Date(iso + 'T12:00:00Z').toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function youtubeThumb(id: string): string {
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : ''
}

/** Portada de un episodio: la propia si existe, si no la miniatura de YouTube. */
export function episodeCover(episode: Pick<Episode, 'coverUrl' | 'youtubeId'>): string {
  return episode.coverUrl || youtubeThumb(episode.youtubeId)
}

/* ── Scoring SEO / GEO ────────────────────────────────────────
   Cada regla vale puntos y explica POR QUÉ importa. El panel las
   muestra como tareas pendientes: es la diferencia entre un episodio
   invisible y uno que Google indexa y que ChatGPT o Perplexity citan. */

export type Rule = {
  id: string
  label: string
  why: string
  weight: number
  kind: 'seo' | 'geo'
  done: boolean
}

export function auditEpisode(episode: Episode): {
  score: number
  rules: Rule[]
  pending: Rule[]
} {
  const words = episode.transcript.trim().split(/\s+/).filter(Boolean).length

  const rules: Rule[] = [
    {
      id: 'meta',
      label: 'Meta description de 120–160 caracteres',
      why: 'Es el texto que Google muestra bajo el título. Sin él, inventa uno peor.',
      weight: 10,
      kind: 'seo',
      done: episode.metaDescription.length >= 120 && episode.metaDescription.length <= 160,
    },
    {
      id: 'summary',
      label: 'Resumen del episodio (mín. 300 caracteres)',
      why: 'Es el único texto real que un buscador puede leer de un video. Hoy tus páginas tienen 40 caracteres.',
      weight: 15,
      kind: 'seo',
      done: episode.summary.trim().length >= 300,
    },
    {
      id: 'video',
      label: 'Video vinculado',
      why: 'Habilita el schema VideoObject y la aparición en la pestaña Videos de Google.',
      weight: 10,
      kind: 'seo',
      done: Boolean(episode.youtubeId),
    },
    {
      id: 'duration',
      label: 'Duración registrada',
      why: 'schema.org exige la duración para mostrar el video como resultado enriquecido.',
      weight: 5,
      kind: 'seo',
      done: episode.durationSeconds > 0,
    },
    {
      id: 'keywords',
      label: 'Al menos 3 keywords objetivo',
      why: 'Define para qué búsquedas compites en vez de esperar que Google adivine.',
      weight: 10,
      kind: 'seo',
      done: episode.keywords.length >= 3,
    },
    {
      id: 'chapters',
      label: 'Capítulos con marcas de tiempo',
      why: 'Google los convierte en enlaces de "momentos clave" dentro del resultado de búsqueda.',
      weight: 10,
      kind: 'seo',
      done: episode.chapters.length >= 3,
    },
    {
      id: 'takeaways',
      label: 'Conclusiones clave (mín. 3)',
      why: 'Frases cortas y afirmativas: es el formato exacto que los motores de IA extraen y citan.',
      weight: 15,
      kind: 'geo',
      done: episode.keyTakeaways.length >= 3,
    },
    {
      id: 'faqs',
      label: 'Preguntas frecuentes (mín. 3)',
      why: 'Lo que más pesa en GEO. ChatGPT y Perplexity responden con pares pregunta/respuesta como estos.',
      weight: 15,
      kind: 'geo',
      done: episode.faqs.length >= 3,
    },
    {
      id: 'transcript',
      label: `Transcripción (mín. 500 palabras — vas en ${words})`,
      why: 'Convierte 29 minutos de audio en texto rastreable. Es la mayor fuente de long-tail que tienes.',
      weight: 10,
      kind: 'geo',
      done: words >= 500,
    },
  ]

  const total = rules.reduce((sum, r) => sum + r.weight, 0)
  const earned = rules.reduce((sum, r) => sum + (r.done ? r.weight : 0), 0)

  return {
    score: Math.round((earned / total) * 100),
    rules,
    pending: rules.filter((r) => !r.done),
  }
}

export async function auditAll() {
  const episodes = await getEpisodes()
  const audits = episodes.map((e) => ({ episode: e, ...auditEpisode(e) }))
  const average = audits.length
    ? Math.round(audits.reduce((s, a) => s + a.score, 0) / audits.length)
    : 0
  return { audits, average }
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Auditoría de un post. Mismo criterio que los episodios: cada regla explica
 * qué señal habilita, para que el checklist sea accionable y no decorativo.
 */
export function auditPost(post: Post): { score: number; rules: Rule[]; pending: Rule[] } {
  const words = wordCount(post.body)

  const rules: Rule[] = [
    {
      id: 'meta',
      label: 'Meta description de 120–160 caracteres',
      why: 'Es el texto que Google muestra bajo el título. Sin él, recorta el primer párrafo.',
      weight: 10,
      kind: 'seo',
      done: post.metaDescription.length >= 120 && post.metaDescription.length <= 160,
    },
    {
      id: 'title',
      label: 'Título de 30–65 caracteres',
      why: 'Más largo se corta en el resultado de búsqueda y pierde la keyword del final.',
      weight: 10,
      kind: 'seo',
      done: post.title.length >= 30 && post.title.length <= 65,
    },
    {
      id: 'excerpt',
      label: 'Resumen para las tarjetas del listado',
      why: 'Se usa en el índice del blog y en redes cuando se comparte el enlace.',
      weight: 5,
      kind: 'seo',
      done: post.excerpt.trim().length >= 80,
    },
    {
      id: 'body',
      label: `Cuerpo de mínimo 600 palabras — vas en ${words}`,
      why: 'Por debajo de 600 palabras es difícil competir por una búsqueda con intención comercial.',
      weight: 20,
      kind: 'seo',
      done: words >= 600,
    },
    {
      id: 'headings',
      label: 'Al menos 3 subtítulos (##)',
      why: 'Estructuran el texto y son de donde Google saca los fragmentos destacados.',
      weight: 10,
      kind: 'seo',
      done: (post.body.match(/^##\s+/gm) || []).length >= 3,
    },
    {
      id: 'location',
      label: 'Ciudad o región objetivo',
      why: 'Es la señal más fuerte de SEO local: sin ella compites contra todo el país.',
      weight: 10,
      kind: 'seo',
      done: post.location.trim().length > 0,
    },
    {
      id: 'keywords',
      label: 'Al menos 3 keywords objetivo',
      why: 'Define para qué búsquedas compites en vez de esperar que Google adivine.',
      weight: 10,
      kind: 'seo',
      done: post.keywords.length >= 3,
    },
    {
      id: 'cover',
      label: 'Imagen de portada',
      why: 'Sin ella, al compartir el enlace no aparece tarjeta y el clic cae.',
      weight: 5,
      kind: 'seo',
      done: Boolean(post.coverUrl),
    },
    {
      id: 'faqs',
      label: 'Preguntas frecuentes (mín. 3)',
      why: 'Lo que más pesa en GEO: ChatGPT y Perplexity responden con pares pregunta/respuesta.',
      weight: 15,
      kind: 'geo',
      done: post.faqs.length >= 3,
    },
    {
      id: 'niches',
      label: 'Relacionado con al menos un nicho',
      why: 'Enlaza el artículo con la landing comercial y reparte autoridad hacia ella.',
      weight: 5,
      kind: 'seo',
      done: post.niches.length > 0,
    },
  ]

  const total = rules.reduce((sum, r) => sum + r.weight, 0)
  const earned = rules.reduce((sum, r) => sum + (r.done ? r.weight : 0), 0)

  return {
    score: Math.round((earned / total) * 100),
    rules,
    pending: rules.filter((r) => !r.done),
  }
}

export async function auditAllPosts() {
  const posts = await getPosts()
  const audits = posts.map((p) => ({ post: p, ...auditPost(p) }))
  const average = audits.length
    ? Math.round(audits.reduce((s, a) => s + a.score, 0) / audits.length)
    : 0
  return { audits, average }
}

/* ── Instagram ────────────────────────────────────────────────── */

export const getInstagramPosts = cache(async (): Promise<InstagramPost[]> => cachedInstagram())

export async function getVisibleInstagramPosts(limit = 10): Promise<InstagramPost[]> {
  return (await fetchInstagramPosts()).filter((p) => p.visible).slice(0, limit)
}

export async function saveInstagramPost(post: InstagramPost): Promise<void> {
  return upsertInstagramPost(post)
}

export async function deleteInstagramPost(id: string): Promise<void> {
  return removeInstagramPost(id)
}
