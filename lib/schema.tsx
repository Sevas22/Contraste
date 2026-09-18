import { site, hasRealAddress, hasRealPhone } from './site'
import { nicheImage } from './niche-media'
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
    // ProfessionalService es un subtipo de LocalBusiness: sigue siendo elegible
    // para SEO local y le dice a Google a qué se dedica, cosa que el genérico
    // LocalBusiness no hace.
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site.url}/#organization`,
    name: site.brandName,
    legalName: site.razonSocial,
    // NIT sin puntos, como se escribe en los registros; `identifier` lo
    // etiqueta como NIT para que no se lea como un número suelto.
    taxID: site.nit.replace(/\./g, ''),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'NIT',
      value: site.nit.replace(/\./g, ''),
    },
    // Sólo nombres vigentes. «Contraste BTL» estaba aquí y reforzaba que los
    // motores fundieran esta entidad con la ficha vieja de Maps; el nombre
    // anterior se declara como anterior en `disambiguatingDescription`.
    alternateName: site.name,
    disambiguatingDescription: `${site.brandName} (razón social ${site.razonSocial}, NIT ${site.nit}; antes ${site.formerName}), agencia BTL y de marketing experiencial de ${site.contact.city}. No tiene sede abierta al público: atiende con cita y opera en ${site.serviceAreas.join(', ')}. No es ${site.notToConfuseWith.join(', ni ')}.`,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}/#logo`,
      url: `${site.url}/brand/logo-contraste.png`,
      caption: site.brandName,
    },
    image: `${site.url}/media/hero-agencia.jpg`,
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.contact.email,
    // Qué temas domina la entidad. Es de las pocas señales explícitas que
    // existen para que un motor de IA asocie "agencia BTL" con esta marca.
    knowsAbout: site.knowsAbout,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      url: site.contact.whatsapp,
      areaServed: ['CO', 'MX'],
      availableLanguage: ['es', 'en'],
      ...(hasRealPhone ? { telephone: site.contact.phone } : {}),
    },
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

/**
 * El sitio como entidad propia, enlazada a la organización por `@id`.
 * Es lo que Google usa para el nombre del sitio que muestra encima de cada
 * resultado; sin él a veces enseña el dominio en vez de "Contraste Agencia".
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.brandName,
    alternateName: site.name,
    description: site.description,
    inLanguage: ['es-CO', 'en'],
    publisher: { '@id': `${site.url}/#organization` },
  }
}

/** FAQPage suelto, para páginas que no llevan un @graph propio (el home). */
export function faqSchema(faqs: readonly { q: string; a: string }[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site.url}${path === '/' ? '' : path}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceCatalogSchema(services: readonly { title: string; summary: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Servicios de ${site.brandName}`,
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
export function nicheSchema(niche: Niche, path = `/${niche.slug}`) {
  const url = `${site.url}${path}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url,
      name: niche.headline,
      description: niche.description,
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${url}/#service` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${site.url}${nicheImage(niche.slug)}` },
      ...(niche.faqs.length ? { mainEntity: { '@id': `${url}/#faq` } } : {}),
    },
    {
      '@type': 'Service',
      '@id': `${url}/#service`,
      name: niche.headline,
      serviceType: ['Marketing BTL', 'Activaciones de marca', niche.name],
      category: niche.name,
      description: niche.description,
      url,
      provider: { '@id': `${site.url}/#organization` },
      // A quién va dirigido: marcas del sector, no el consumidor final
      audience: { '@type': 'BusinessAudience', audienceType: `Marcas de ${niche.name.toLowerCase()}` },
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

  /**
   * Fuentes del artículo, sacadas de sus enlaces.
   *
   * Los artículos que salen de un episodio o de una publicación de Instagram
   * lo dicen en el JSON-LD: `isBasedOn` para los episodios del V-Podcast y
   * `citation` para lo que vive fuera (YouTube, Instagram). Es la forma de que
   * Google y los motores de IA vean que el contenido tiene origen verificable
   * y que los perfiles sociales pertenecen a la misma marca.
   */
  const enlaces = [...post.body.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map(([, label, href]) => ({
    label,
    href,
  }))
  const textoPlano = post.body.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')
  const vistos = new Set<string>()
  const unico = (href: string) => (vistos.has(href) ? false : (vistos.add(href), true))

  const fuentesInternas = enlaces
    .filter((e) => /^\/v-podcast\/[^/#]+$/.test(e.href) && unico(e.href))
    .map((e) => ({ '@id': `${site.url}${e.href}/#episode` }))

  const citas = enlaces
    .filter((e) => /^https?:\/\//.test(e.href) && unico(e.href))
    .map((e) => {
      if (/youtube\.com|youtu\.be/.test(e.href)) {
        return { '@type': 'VideoObject', name: e.label, url: e.href }
      }
      if (/instagram\.com/.test(e.href)) {
        return {
          '@type': 'SocialMediaPosting',
          headline: e.label,
          url: e.href,
          ...(e.href.includes('agencia_contraste') && { author: { '@id': `${site.url}/#organization` } }),
        }
      }
      return { '@type': 'CreativeWork', name: e.label, url: e.href }
    })

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}/#post`,
      url,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      // Sin la sintaxis de los enlaces: el cuerpo en texto, como lo lee una persona
      articleBody: textoPlano,
      wordCount: textoPlano.trim().split(/\s+/).filter(Boolean).length,
      isPartOf: { '@id': `${site.url}/#website` },
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
      // Apunta al Service de cada landing, no a un nombre suelto: así el grafo
      // une el artículo con la página comercial que lo respalda.
      ...(related.length && {
        about: related.map((n) => ({ '@id': `${site.url}/${n.slug}/#service`, name: n.name })),
      }),
      ...(fuentesInternas.length && { isBasedOn: fuentesInternas }),
      ...(citas.length && { citation: citas }),
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
