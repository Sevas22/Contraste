import { site, hasRealAddress, hasRealPhone } from './site'
import {
  isoDuration,
  youtubeThumb,
  episodeCover,
  type Episode,
  type Niche,
  type Post,
} from './content'

/**
 * Generadores de JSON-LD.
 *
 * Esto es lo que separa "una página con un video" de "una fuente que Google
 * entiende y que un motor de IA puede citar". El WordPress actual sólo emite
 * un bloque Person/Organization genérico: ni VideoObject, ni FAQPage, ni
 * PodcastEpisode, ni LocalBusiness.
 */

/** Absolutiza una ruta local; deja intacta una URL que ya lo es (Vercel Blob). */
function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${site.url}${pathOrUrl}`
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo-contraste.png`,
    image: `${site.url}/media/hero-agencia.jpg`,
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.contact.email,
    // Teléfono y dirección sólo salen si son los de verdad. Publicar el relleno
    // le daría a Google un NAP que no coincide con el Perfil de Empresa, que es
    // exactamente lo que hunde el posicionamiento local. La ciudad sí se
    // mantiene siempre: es cierta y sostiene la señal geográfica mientras
    // llegan la calle y el número.
    ...(hasRealPhone ? { telephone: site.contact.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(hasRealAddress
        ? { streetAddress: site.contact.street, postalCode: site.contact.postalCode }
        : {}),
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    ...(hasRealAddress
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.contact.latitude,
            longitude: site.contact.longitude,
          },
        }
      : {}),
    areaServed: site.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    sameAs: Object.values(site.social),
    slogan: site.tagline,
  }
}

export function serviceCatalogSchema(services: readonly { title: string; summary: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Servicios de ${site.legalName}`,
    itemListElement: services.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.summary,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: site.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
      },
    })),
  }
}

/** Landing de nicho: Service + FAQPage. Es lo que la hace elegible para
 *  resultados enriquecidos y para que una IA la cite como fuente del sector. */
export function nicheSchema(niche: Niche) {
  const url = `${site.url}/${niche.slug}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      '@id': `${url}/#service`,
      name: niche.headline,
      serviceType: niche.name,
      description: niche.description,
      url,
      provider: { '@id': `${site.url}/#organization` },
      areaServed: site.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Capacidades — ${niche.name}`,
        itemListElement: niche.capabilities.map((capability, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Service', name: capability },
        })),
      },
    },
  ]

  if (niche.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}/#faq`,
      mainEntity: niche.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** La serie completa del V-Podcast: un solo PodcastSeries centralizado. */
export function podcastSeriesSchema(episodes: Episode[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': `${site.url}/v-podcast/#series`,
    name: 'V-Podcast — Contraste',
    description:
      'El videopodcast de Contraste: conversaciones con referentes de cada sector sobre negocios, inversión, marca y consumo.',
    url: `${site.url}/v-podcast`,
    publisher: { '@id': `${site.url}/#organization` },
    numberOfEpisodes: episodes.length,
  }
}

export function episodeSchema(episode: Episode) {
  const url = `${site.url}/v-podcast/${episode.slug}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'PodcastEpisode',
      '@id': `${url}/#episode`,
      url,
      name: episode.title,
      episodeNumber: episode.number,
      description: episode.metaDescription || episode.summary.slice(0, 300),
      datePublished: episode.publishedAt,
      dateModified: episode.updatedAt,
      timeRequired: isoDuration(episode.durationSeconds),
      partOfSeries: { '@id': `${site.url}/v-podcast/#series` },
      publisher: { '@id': `${site.url}/#organization` },
      keywords: episode.keywords.join(', '),
      ...(episode.guests.length && {
        actor: episode.guests.map((g) => ({
          '@type': 'Person',
          name: g.name,
          jobTitle: g.role,
        })),
      }),
    },
  ]

  if (episode.mediaType === 'audio' && episode.mediaUrl) {
    graph.push({
      '@type': 'AudioObject',
      '@id': `${url}/#audio`,
      name: episode.title,
      description: episode.metaDescription || episode.summary.slice(0, 300),
      contentUrl: absoluteUrl(episode.mediaUrl),
      encodingFormat: 'audio/mpeg',
      duration: isoDuration(episode.durationSeconds),
      uploadDate: episode.publishedAt,
      ...(episode.coverUrl && { thumbnailUrl: absoluteUrl(episode.coverUrl) }),
      publisher: { '@id': `${site.url}/#organization` },
    })
  } else if (episode.youtubeId || (episode.mediaType === 'video' && episode.mediaUrl)) {
    graph.push({
      '@type': 'VideoObject',
      '@id': `${url}/#video`,
      name: episode.title,
      description: episode.metaDescription || episode.summary.slice(0, 300),
      thumbnailUrl: absoluteUrl(episodeCover(episode)),
      uploadDate: episode.publishedAt,
      duration: isoDuration(episode.durationSeconds),
      ...(episode.youtubeId
        ? {
            embedUrl: `https://www.youtube.com/embed/${episode.youtubeId}`,
            contentUrl: `https://www.youtube.com/watch?v=${episode.youtubeId}`,
          }
        : { contentUrl: absoluteUrl(episode.mediaUrl) }),
      publisher: { '@id': `${site.url}/#organization` },
      ...(episode.chapters.length && {
        hasPart: episode.chapters.map((c) => ({
          '@type': 'Clip',
          name: c.label,
          startOffset: timeToSeconds(c.at),
          url: `${url}#t=${timeToSeconds(c.at)}`,
        })),
      }),
    })
  }

  if (episode.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}/#faq`,
      mainEntity: episode.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  }
}

export function timeToSeconds(stamp: string): number {
  const parts = stamp.split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, part) => acc * 60 + part, 0)
}

/** Componente-helper para inyectar JSON-LD en cualquier Server Component. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Post del blog: BlogPosting + FAQPage. Con `about` apuntando a los nichos. */
export function postSchema(post: Post, niches: Niche[]) {
  const url = `${site.url}/blog/${post.slug}`
  const related = niches.filter((n) => post.niches.includes(n.id))

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}/#post`,
      url,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      articleBody: post.body,
      wordCount: post.body.trim().split(/\s+/).filter(Boolean).length,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: 'es-CO',
      keywords: post.keywords.join(', '),
      author: { '@type': 'Organization', name: post.author, '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(post.coverUrl && { image: absoluteUrl(post.coverUrl) }),
      // Señal de SEO local: ata el artículo a una ciudad concreta
      ...(post.location && {
        contentLocation: { '@type': 'Place', name: post.location },
      }),
      ...(related.length && {
        about: related.map((n) => ({ '@type': 'Thing', name: n.name })),
      }),
    },
  ]

  if (post.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}/#faq`,
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
