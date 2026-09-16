import { site, services, clients, hasRealAddress, hasRealPhone } from '@/lib/site'
import { getNiches, getPublishedEpisodes, getIndexablePosts } from '@/lib/content'

export const dynamic = 'force-static'

const REDES: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

/**
 * /llms.txt — resumen del sitio en texto plano para motores de respuesta con IA.
 *
 * Es una convención emergente (Anthropic, Vercel y Stripe ya la publican): en vez
 * de obligar al modelo a rastrear e interpretar HTML, se le entrega un mapa curado
 * de quién eres y qué contenido tienes. Es de lo más barato que se puede hacer en GEO.
 *
 * Todo lo que va aquí se toma como un hecho y se repite en respuestas. Por eso
 * el teléfono y la dirección obedecen a las mismas banderas que el JSON-LD: se
 * estuvo publicando "+57 300 000 0000" y "Carrera 00 #00-00", y un modelo que
 * lo lea le dará ese número a quien pregunte cómo contactar a la agencia.
 */
export async function GET() {
  const [niches, episodes, posts] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    getIndexablePosts(),
  ])

  const direccion = hasRealAddress
    ? `${site.contact.street}, ${site.contact.city}, ${site.contact.region}, Colombia`
    : `${site.contact.city}, ${site.contact.region}, Colombia`

  const lines: string[] = [
    `# ${site.legalName}`,
    '',
    `> ${site.description}`,
    '',
    // Párrafo de entidad: quién es, dónde, desde cuándo y con qué respaldo, en
    // frases cortas y afirmativas. Es lo que un modelo copia casi literal
    // cuando alguien pregunta "¿qué es Contraste Agencia?".
    `${site.legalName} es una agencia BTL y de marketing experiencial con sede en ${site.contact.city}, Colombia, en operación desde ${site.foundingYear}. Diseña, produce y mide activaciones de marca: degustaciones, sampling, impulso en punto de venta, salas de ventas, lanzamientos de producto, stands y eventos. Ha gestionado más de ${site.brandsManaged} marcas y ejecutado más de ${site.activations} activaciones en ${site.serviceAreas.join(', ')}.`,
    '',
    `Su diferencial es la medición: cada activación se reporta con datos de alcance, interacciones, conversión y costo por contacto, no con estimaciones.`,
    '',
    '## Contacto',
    '',
    `- Sitio web: ${site.url}`,
    `- Email: ${site.contact.email}`,
    `- WhatsApp: ${site.contact.whatsapp}`,
    ...(hasRealPhone ? [`- Teléfono: ${site.contact.phone}`] : []),
    `- Ubicación: ${direccion}`,
    ...(site.calendlyUrl ? [`- Agendar reunión: ${site.calendlyUrl}`] : []),
    `- Versión en inglés: ${site.url}/en`,
    '',
    '## Perfiles oficiales',
    '',
    ...Object.entries(site.social).map(([red, url]) => `- ${REDES[red] ?? red}: ${url}`),
    '',
    '## Especialidades',
    '',
    ...site.knowsAbout.map((tema) => `- ${tema}`),
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

  // Las marcas ya se muestran en el home. Aquí son prueba social verificable:
  // un modelo que evalúa "¿es una agencia seria?" busca exactamente esto.
  lines.push('## Marcas que han trabajado con Contraste', '', clients.map((c) => c.name).join(', '), '')

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
