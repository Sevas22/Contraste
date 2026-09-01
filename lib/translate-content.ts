import type { Locale } from './i18n'
import type { Episode, Niche, Post } from './types'

/**
 * Superpone la traducción sobre una ficha de contenido.
 *
 * El español es la fuente y vive en las columnas normales. Las traducciones
 * viven en `translations`, un JSONB con forma `{ en: { title, summary, … } }`,
 * y sólo llevan los campos que de verdad se han traducido.
 *
 * La regla es campo a campo, no ficha a ficha: si un episodio tiene el título
 * en inglés pero no la transcripción, se muestra el título traducido y la
 * transcripción en español. Exigir la ficha completa habría dejado sin efecto
 * cualquier traducción parcial, que es justo el estado normal mientras el
 * cliente va avanzando.
 *
 * Un valor vacío cuenta como no traducido: el panel guarda cadenas vacías
 * cuando el campo se deja en blanco, y publicar un titular vacío sería peor
 * que publicarlo en español.
 */
export type ConTraducciones = { translations?: Record<string, Record<string, unknown>> }

function tieneContenido(valor: unknown): boolean {
  if (valor == null) return false
  if (typeof valor === 'string') return valor.trim().length > 0
  if (Array.isArray(valor)) return valor.length > 0
  return true
}

function superponer<T extends object>(base: T, locale: Locale): T {
  const traducciones = (base as ConTraducciones).translations
  if (locale === 'es' || !traducciones) return base

  const parche = traducciones[locale]
  if (!parche) return base

  const salida = { ...base } as Record<string, unknown>
  for (const [campo, valor] of Object.entries(parche)) {
    if (campo === 'translations') continue
    if (tieneContenido(valor)) salida[campo] = valor
  }
  return salida as T
}

export const translateNiche = (niche: Niche, locale: Locale): Niche => superponer(niche, locale)
export const translateEpisode = (episode: Episode, locale: Locale): Episode =>
  superponer(episode, locale)
export const translatePost = (post: Post, locale: Locale): Post => superponer(post, locale)

export const translateNiches = (niches: Niche[], locale: Locale): Niche[] =>
  locale === 'es' ? niches : niches.map((n) => translateNiche(n, locale))
export const translateEpisodes = (episodes: Episode[], locale: Locale): Episode[] =>
  locale === 'es' ? episodes : episodes.map((e) => translateEpisode(e, locale))
export const translatePosts = (posts: Post[], locale: Locale): Post[] =>
  locale === 'es' ? posts : posts.map((p) => translatePost(p, locale))

/**
 * Idioma real en el que se está mostrando una ficha.
 *
 * Sirve para marcar `lang` en el bloque de contenido: si el artículo sigue en
 * español dentro del sitio inglés, decirlo es lo correcto para el buscador y
 * para un lector de pantalla, que si no lo pronunciaría con fonética inglesa.
 */
export function contentLang(item: ConTraducciones, locale: Locale, campo = 'title'): Locale {
  if (locale === 'es') return 'es'
  return tieneContenido(item.translations?.[locale]?.[campo]) ? locale : 'es'
}
