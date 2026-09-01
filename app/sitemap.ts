import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { getNiches, getPublishedEpisodes, getPublishedPosts } from '@/lib/content'
import { localePath } from '@/lib/i18n'

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
  lastModified: Date
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [niches, episodes, posts] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    getPublishedPosts(),
  ])
  const now = new Date()

  const entradas: Entrada[] = [
    { ruta: '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    // Landings de nicho: son las páginas comerciales, van con prioridad alta
    ...niches.map((niche) => ({
      ruta: `/${niche.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { ruta: '/v-podcast', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...episodes.map((episode) => ({
      ruta: `/v-podcast/${episode.slug}`,
      lastModified: new Date(episode.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { ruta: '/blog', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...posts.map((post) => ({
      ruta: `/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const absoluta = (ruta: string) => `${site.url}${ruta === '/' ? '' : ruta}`

  return entradas.map(({ ruta, ...resto }) => ({
    url: absoluta(ruta),
    ...resto,
    alternates: {
      languages: {
        'es-CO': absoluta(localePath('es', ruta)),
        en: absoluta(localePath('en', ruta)),
      },
    },
  }))
}
