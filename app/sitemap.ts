import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { getNiches, getPublishedEpisodes, getIndexablePosts } from '@/lib/content'
import { localePath } from '@/lib/i18n'
import { hasEnglish } from '@/lib/translate-content'

/**
 * Sitemap bilingüe.
 *
 * Cada página aparece UNA vez con su bloque `alternates.languages`, que Next
 * traduce a `xhtml:link rel="alternate" hreflang="…"`. Es la forma que Google
 * recomienda para sitios en varios idiomas: listar las dos URLs por separado y
 * sin emparejar deja que las trate como contenido duplicado.
 */
type Entrada = {
  ruta: string
  /** false = sólo existe en español: no se anuncia la versión /en */
  traducida?: boolean
  lastModified: Date | undefined
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [niches, episodes, posts] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    // Sólo los posts con texto suficiente: uno publicado vacío no se ofrece
    getIndexablePosts(),
  ])

  /**
   * `lastmod` real, no la hora del build.
   *
   * Antes el home y los nichos llevaban `new Date()`: en cada despliegue
   * "cambiaban" todas las páginas. Google aprende que ese `lastmod` miente y
   * deja de usarlo para decidir qué volver a rastrear — también cuando sí hay
   * un episodio nuevo. Las páginas índice cambian cuando cambia lo último que
   * listan.
   */
  const fecha = (iso: string) => new Date(`${iso}T12:00:00Z`)
  // Sin fechas conocidas no se inventa una: mejor sin <lastmod> que con uno falso
  const masReciente = (fechas: (string | undefined)[]) => {
    const validas = fechas.filter((f): f is string => Boolean(f)).sort()
    return validas.length ? fecha(validas[validas.length - 1]) : undefined
  }
  const ultimoEpisodio = masReciente(episodes.map((e) => e.updatedAt))
  const ultimoPost = masReciente(posts.map((p) => p.updatedAt))
  const ultimoContenido = masReciente([
    ...episodes.map((e) => e.updatedAt),
    ...posts.map((p) => p.updatedAt),
    ...niches.map((n) => n.updatedAt),
  ])

  const entradas: Entrada[] = [
    { ruta: '/', lastModified: ultimoContenido, changeFrequency: 'weekly', priority: 1 },
    // Landings de nicho: son las páginas comerciales, van con prioridad alta
    ...niches.map((niche) => ({
      ruta: `/${niche.slug}`,
      // Cambia cuando se edita su texto o cuando entra un episodio de su nicho
      lastModified: masReciente([
        niche.updatedAt,
        ...episodes.filter((e) => e.niches.includes(niche.id)).map((e) => e.updatedAt),
      ]),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { ruta: '/v-podcast', lastModified: ultimoEpisodio, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...episodes.map((episode) => ({
      ruta: `/v-podcast/${episode.slug}`,
      traducida: hasEnglish(episode),
      lastModified: fecha(episode.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { ruta: '/blog', lastModified: ultimoPost, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...posts.map((post) => ({
      ruta: `/blog/${post.slug}`,
      traducida: hasEnglish(post),
      lastModified: fecha(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const absoluta = (ruta: string) => `${site.url}${ruta === '/' ? '' : ruta}`

  return entradas.map(({ ruta, lastModified, traducida = true, ...resto }) => ({
    url: absoluta(ruta),
    ...(lastModified ? { lastModified } : {}),
    ...resto,
    alternates: {
      languages: {
        'es-CO': absoluta(localePath('es', ruta)),
        ...(traducida ? { en: absoluta(localePath('en', ruta)) } : {}),
      },
    },
  }))
}
