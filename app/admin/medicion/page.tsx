import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { CircleCheck, CircleDashed, ExternalLink } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { SectionLabel } from '@/components/site/brand-mark'

export const dynamic = 'force-dynamic'

/**
 * Estado de la medición del sitio.
 *
 * No enseña datos de GA4 (para eso haría falta una cuenta de servicio con
 * acceso a la API y no aporta nada que el propio GA4 no muestre mejor). Lo que
 * sí hace falta en el panel es saber, sin abrir Vercel ni leer código, qué
 * herramientas están conectadas en ESTE despliegue y qué falta configurar
 * fuera del código para que las conversiones lleguen a los informes.
 */

type Estado = { nombre: string; activo: boolean; detalle: string; url: string }

function verificacionPorArchivo(): boolean {
  try {
    const publico = path.join(process.cwd(), 'public')
    return existsSync(publico) && readdirSync(publico).some((n) => /^google[0-9a-f]+\.html$/.test(n))
  } catch {
    return false
  }
}

const EVENTOS = [
  {
    nombre: 'generate_lead',
    clave: true,
    cuando: 'Clic en WhatsApp, correo o teléfono, o cita confirmada en Calendly.',
  },
  { nombre: 'calendly_open', clave: false, cuando: 'Abre el calendario. Intención, todavía no conversión.' },
  { nombre: 'podcast_play', clave: false, cuando: 'Da play a un episodio o al vídeo de un nicho.' },
  { nombre: 'social_click', clave: false, cuando: 'Va a Instagram, Facebook, YouTube o LinkedIn.' },
]

const PASOS = [
  'GTM → Administrar → Importar contenedor → docs/gtm/contraste-gtm-contenedor.json (Combinar).',
  'GTM → Vista previa: clic en WhatsApp del sitio y comprobar que dispara «GA4 · Evento».',
  'GTM → Enviar → Publicar. Sin publicar no llega nada a GA4.',
  'GA4 → Administrar → Eventos clave → marcar generate_lead.',
  'GA4 → Definiciones personalizadas → dimensiones de evento «placement» y «niche».',
  'Search Console → Sitemaps → enviar https://contrasteagencia.com/sitemap.xml.',
  'Bing Webmaster Tools → importar desde Search Console (alimenta Copilot y ChatGPT).',
]

export default function MedicionAdmin() {
  const produccion = process.env.NODE_ENV === 'production'
  const herramientas: Estado[] = [
    {
      nombre: 'Google Tag Manager',
      activo: Boolean(analytics.gtm),
      detalle: analytics.gtm || 'Falta NEXT_PUBLIC_GTM_ID',
      url: 'https://tagmanager.google.com/',
    },
    {
      nombre: 'Google Analytics 4',
      activo: Boolean(analytics.gtm || analytics.ga),
      detalle: analytics.ga
        ? `${analytics.ga} (directo en el código)`
        : analytics.gtm
          ? 'Dentro de GTM (G-VC1KRWDJ7K)'
          : 'Sin GTM ni NEXT_PUBLIC_GA_ID',
      url: 'https://analytics.google.com/',
    },
    {
      nombre: 'Microsoft Clarity',
      activo: Boolean(analytics.clarity),
      detalle: analytics.clarity || 'Falta NEXT_PUBLIC_CLARITY_ID',
      url: 'https://clarity.microsoft.com/projects',
    },
    {
      nombre: 'Search Console',
      activo: Boolean(process.env.GOOGLE_SITE_VERIFICATION) || verificacionPorArchivo(),
      detalle: process.env.GOOGLE_SITE_VERIFICATION
        ? 'Verificada con etiqueta <meta>'
        : verificacionPorArchivo()
          ? 'Verificación por archivo HTML en /public'
          : 'Sin verificar',
      url: 'https://search.google.com/search-console',
    },
    {
      nombre: 'Bing Webmaster Tools',
      activo: Boolean(process.env.BING_SITE_VERIFICATION),
      detalle: process.env.BING_SITE_VERIFICATION ? 'Verificada' : 'Opcional: se puede importar desde Search Console',
      url: 'https://www.bing.com/webmasters',
    },
  ]

  return (
    <div className="max-w-5xl">
      <SectionLabel>Analítica</SectionLabel>
      <h1 className="display mt-4 text-4xl lg:text-5xl">Medición</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Qué herramientas están conectadas en este despliegue y qué conversiones envía el sitio.
        Los identificadores se cambian en Vercel → Settings → Environment Variables y requieren
        redesplegar.
      </p>

      {!produccion && (
        <p className="mt-6 rounded-lg border border-border bg-secondary/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          Estás en desarrollo: aquí no se carga ninguna etiqueta. Los eventos se ven en la consola
          del navegador como <code className="font-mono">[medición]</code>.
        </p>
      )}

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {herramientas.map((h) => (
          <li key={h.nombre} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex min-w-0 items-start gap-3">
              {h.activo ? (
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
              ) : (
                <CircleDashed className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-bold">{h.nombre}</p>
                <p className="mt-1 break-words font-mono text-[11px] text-muted-foreground">{h.detalle}</p>
              </div>
            </div>
            <a
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${h.nombre}`}
              className="shrink-0 text-muted-foreground transition hover:text-accent-text"
            >
              <ExternalLink className="size-4" />
            </a>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="eyebrow">Conversiones que envía el sitio</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {EVENTOS.map((e) => (
            <li
              key={e.nombre}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="font-mono text-sm font-bold">{e.nombre}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.cuando}</p>
              </div>
              {e.clave && (
                <span className="w-fit shrink-0 rounded bg-accent/20 px-2 py-1 font-mono text-[10px] uppercase text-accent-text">
                  evento clave
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-accent/40 bg-accent/5 p-6">
        <h2 className="text-sm font-bold">Configuración fuera del código (una sola vez)</h2>
        <ol className="mt-5 flex flex-col gap-3">
          {PASOS.map((paso, i) => (
            <li key={paso} className="grid grid-cols-[1.75rem_1fr] gap-2 text-xs leading-relaxed">
              <span className="font-mono text-accent-text">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-foreground/85">{paso}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
