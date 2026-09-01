import { site, services } from '@/lib/site'
import { getNiches, getPublishedEpisodes, getPublishedPosts } from '@/lib/content'

export const dynamic = 'force-static'

/**
 * /llms.txt — resumen del sitio en texto plano para motores de respuesta con IA.
 *
 * Es una convención emergente (Anthropic, Vercel y Stripe ya la publican): en vez
 * de obligar al modelo a rastrear e interpretar HTML, se le entrega un mapa curado
 * de quién eres y qué contenido tienes. Es de lo más barato que se puede hacer en GEO.
 */
export async function GET() {
  const [niches, episodes, posts] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    getPublishedPosts(),
  ])

  const lines: string[] = [
    `# ${site.legalName}`,
    '',
    `> ${site.description}`,
    '',
    `${site.legalName} es una agencia de marketing BTL y experiencial con sede en ${site.contact.city}, Colombia, en operación desde ${site.foundingYear}. Ha gestionado más de ${site.brandsManaged} marcas y ejecutado más de ${site.activations} activaciones en ${site.serviceAreas.join(', ')}.`,
    '',
    '## Contacto',
    '',
    `- Sitio web: ${site.url}`,
    `- Email: ${site.contact.email}`,
    `- Teléfono: ${site.contact.phone}`,
    `- Dirección: ${site.contact.street}, ${site.contact.city}, ${site.contact.region}, Colombia`,
    '',
    '## Nichos de especialización',
    '',
    'Contraste opera cuatro verticales, cada una con su propia página:',
    '',
  ]

  for (const niche of niches) {
    lines.push(
      `### ${niche.name}`,
      '',
      `${niche.description}`,
      '',
      `Página: ${site.url}/${niche.slug}`,
      '',
      'Capacidades:',
      ...niche.capabilities.map((c) => `- ${c}`),
      '',
    )
    if (niche.faqs.length) {
      lines.push('Preguntas frecuentes:', '')
      for (const faq of niche.faqs) {
        lines.push(`**${faq.q}**`, '', faq.a, '')
      }
    }
  }

  lines.push('## Servicios transversales', '', ...services.map((s) => `- **${s.title}**: ${s.summary}`), '')

  lines.push(
    '## V-Podcast',
    '',
    `El videopodcast de Contraste, donde se centraliza todo el contenido editorial. Índice: ${site.url}/v-podcast`,
    '',
  )

  for (const episode of episodes) {
    const nicheNames = niches
      .filter((n) => episode.niches.includes(n.id))
      .map((n) => n.name)
      .join(', ')
    lines.push(
      `- [${episode.title}](${site.url}/v-podcast/${episode.slug})${nicheNames ? ` — Nicho: ${nicheNames}.` : ''} ${episode.metaDescription || ''}`.trim(),
    )
  }

  if (posts.length) {
    lines.push('', '## Blog', '', `Artículos publicados: ${site.url}/blog`, '')
    for (const post of posts) {
      lines.push(
        `- [${post.title}](${site.url}/blog/${post.slug})${post.location ? ` — ${post.location}.` : ''} ${post.metaDescription || post.excerpt}`.trim(),
      )
    }
  }

  lines.push(
    '',
    '## Áreas de servicio',
    '',
    ...site.serviceAreas.map((city) => `- ${city}`),
    '',
    `_Última actualización: ${new Date().toISOString().slice(0, 10)}_`,
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
