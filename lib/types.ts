/**
 * Tipos del contenido. En su propio archivo para que `lib/repo.ts` los use
 * sin crear una dependencia circular con `lib/content.ts`.
 */

export type MediaType = 'youtube' | 'video' | 'audio'

export type Chapter = { at: string; label: string }
export type Faq = { q: string; a: string }
export type Guest = { name: string; role: string; handle?: string }

export type Niche = {
  /** Clave corta usada para relacionar episodios. */
  id: string
  /** Ruta pública — se conserva la URL exacta del WordPress para no perder indexación. */
  slug: string
  name: string
  menuLabel: string
  headline: string
  subheadline: string
  description: string
  intro: string
  /**
   * Texto largo de la landing, en el mismo Markdown ligero que los posts.
   * Es lo que la hace competir por la búsqueda del sector: con sólo la intro
   * y cuatro viñetas la página no llegaba a 300 palabras propias.
   */
  body: string
  keywords: string[]
  capabilities: string[]
  faqs: Faq[]
  accent: string
  order: number
  /** Última edición de la landing (YYYY-MM-DD). Opcional: el JSON de respaldo no la trae. */
  updatedAt?: string
  /**
   * Traducciones por idioma: { en: { title, summary, … } }.
   * Sólo lleva los campos realmente traducidos; el resto cae al español.
   */
  translations?: Record<string, Record<string, unknown>>
}

export type Episode = {
  slug: string
  /** Ids de nicho relacionados. Un episodio puede servir a varias verticales. */
  niches: string[]
  status: 'published' | 'draft'
  number: number
  title: string
  subtitle: string
  metaDescription: string
  summary: string
  /** 'youtube' | 'video' (MP4 subido) | 'audio' (MP3 subido) */
  mediaType: MediaType
  youtubeId: string
  /** Ruta pública del archivo subido, p. ej. /media/podcast/mi-episodio.mp3 */
  mediaUrl: string
  /** Portada propia. Para YouTube se usa la miniatura si está vacía. */
  coverUrl: string
  durationSeconds: number
  publishedAt: string
  updatedAt: string
  guests: Guest[]
  topics: string[]
  keywords: string[]
  chapters: Chapter[]
  keyTakeaways: string[]
  faqs: Faq[]
  transcript: string
  /**
   * Traducciones por idioma: { en: { title, summary, … } }.
   * Sólo lleva los campos realmente traducidos; el resto cae al español.
   */
  translations?: Record<string, Record<string, unknown>>
}

export type Post = {
  slug: string
  status: 'published' | 'draft'
  title: string
  excerpt: string
  metaDescription: string
  /** Cuerpo en Markdown ligero: ## para subtítulos, - para listas, líneas en blanco entre párrafos. */
  body: string
  coverUrl: string
  author: string
  /** Ciudad o región objetivo. Es la señal más fuerte de SEO local. */
  location: string
  /** Ids de nicho relacionados. */
  niches: string[]
  keywords: string[]
  faqs: Faq[]
  publishedAt: string
  updatedAt: string
  /**
   * Traducciones por idioma: { en: { title, summary, … } }.
   * Sólo lleva los campos realmente traducidos; el resto cae al español.
   */
  translations?: Record<string, Record<string, unknown>>
}

export type InstagramMediaType = 'image' | 'video' | 'carousel'

export type InstagramPost = {
  id: string
  permalink: string
  imageUrl: string
  /** Clip re-alojado. Vacío = la publicación es sólo imagen. */
  videoUrl: string
  caption: string
  mediaType: InstagramMediaType
  postedAt: string
  order: number
  visible: boolean
}
