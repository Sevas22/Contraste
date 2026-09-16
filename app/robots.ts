import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Rastreadores de motores de respuesta con IA: se les permite
        // explícitamente. Si no pueden leer el sitio, no pueden citarlo.
        userAgent: [
          '*',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Perplexity-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'Google-Extended',
          'Applebot-Extended',
          // Copilot se alimenta del índice de Bing
          'Bingbot',
          'DuckAssistBot',
          'MistralAI-User',
          'meta-externalagent',
          'Amazonbot',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/admin', '/admin/', '/login'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
