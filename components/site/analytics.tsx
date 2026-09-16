'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { analytics, isMeasurablePath, measurementEnabled } from '@/lib/analytics'
import { nicheOf, placementOf, track } from '@/lib/track'

const REDES: Record<string, string> = {
  'instagram.com': 'instagram',
  'facebook.com': 'facebook',
  'youtube.com': 'youtube',
  'linkedin.com': 'linkedin',
  'tiktok.com': 'tiktok',
}

/**
 * Convierte clics en enlaces de contacto en eventos de conversión.
 *
 * Un solo escuchador delegado en el documento en vez de un `onClick` en cada
 * botón: hay enlaces de WhatsApp en la cabecera, el pie, el home, los nichos
 * y el componente de Calendly, y varios son Server Components que no pueden
 * llevar manejadores. Además, un enlace nuevo que alguien añada mañana queda
 * medido sin acordarse de nada.
 *
 * Se reconoce el destino por el `href`, que es lo que de verdad define la
 * conversión: da igual el texto del botón o dónde esté.
 */
function ConversionListener() {
  useEffect(() => {
    function alHacerClic(evento: MouseEvent) {
      const enlace = (evento.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!enlace) return
      const href = enlace.getAttribute('href') ?? ''
      const contexto = { placement: placementOf(enlace), niche: nicheOf(enlace) }

      if (/^https?:\/\/(wa\.link|wa\.me|api\.whatsapp\.com)\//.test(href)) {
        track('generate_lead', { method: 'whatsapp', ...contexto })
      } else if (href.startsWith('mailto:')) {
        track('generate_lead', { method: 'email', ...contexto })
      } else if (href.startsWith('tel:')) {
        track('generate_lead', { method: 'phone', ...contexto })
      } else {
        const host = enlace.hostname.replace(/^www\./, '')
        const red = REDES[host]
        if (red) track('social_click', { method: red, link_url: enlace.href, ...contexto })
      }
    }

    function alClicCentral(evento: MouseEvent) {
      // Botón central = abrir en pestaña nueva. `click` no salta con él.
      if (evento.button === 1) alHacerClic(evento)
    }

    // Fase de captura: se mide aunque otro manejador corte la propagación
    document.addEventListener('click', alHacerClic, true)
    document.addEventListener('auxclick', alClicCentral, true)
    return () => {
      document.removeEventListener('click', alHacerClic, true)
      document.removeEventListener('auxclick', alClicCentral, true)
    }
  }, [])

  return null
}

/**
 * El doble conteo de GA4 no da ningún síntoma: no revienta nada, sólo aparecen
 * el doble de sesiones con la mitad de duración y un rebote imposible. Cuando
 * se detecta, ya hay meses de histórico inservible. Por eso el aviso salta aquí
 * —en desarrollo, al arrancar— y no cuando los datos ya están sucios.
 *
 * Sólo es un aviso: si de verdad se quiere GTM para píxeles y GA4 en el código,
 * la combinación es válida siempre que GA4 NO esté también dentro del
 * contenedor. Eso el código no puede verificarlo; sólo puede preguntarlo.
 */
if (process.env.NODE_ENV !== 'production' && analytics.gtm && analytics.ga) {
  console.warn(
    [
      '[medición] NEXT_PUBLIC_GTM_ID y NEXT_PUBLIC_GA_ID están puestas a la vez.',
      'Si GA4 también está configurado como etiqueta dentro de GTM, cada visita',
      'se contará dos veces. Con GTM en marcha lo habitual es dejar',
      'NEXT_PUBLIC_GA_ID vacía y configurar GA4 desde el contenedor.',
    ].join('\n'),
  )
}

/**
 * Etiquetas de medición del sitio público.
 *
 * Se monta en el layout raíz, que también envuelve al panel, así que la propia
 * pieza decide dónde no debe cargarse (ver `isMeasurablePath`). Cuando devuelve
 * `null` no se inyecta ningún script: no es que se cargue y no mida, es que no
 * se descarga.
 */
export function SiteAnalytics() {
  const pathname = usePathname()

  if (!isMeasurablePath(pathname)) return null
  // Las conversiones se escuchan también en desarrollo: sin GTM no salen a
  // ningún sitio, pero se ven en la consola y así se puede comprobar cada botón.
  if (!measurementEnabled) return <ConversionListener />

  return (
    <>
      <ConversionListener />
      {analytics.gtm ? <GoogleTagManager id={analytics.gtm} /> : null}
      {analytics.ga ? <GoogleAnalytics id={analytics.ga} /> : null}
      {analytics.clarity ? <Clarity id={analytics.clarity} /> : null}
    </>
  )
}

/**
 * Google Tag Manager.
 *
 * No mide: reparte. Carga un contenedor que el cliente administra desde
 * tagmanager.google.com, así que añadir mañana un píxel de Meta o una etiqueta
 * de conversión no pasa por un despliegue. Para una agencia esto es lo que
 * hace la diferencia entre medir una campaña el martes o la semana que viene.
 *
 * El `<noscript>` es parte del fragmento oficial y va en el HTML servido —no
 * lo inyecta `next/script`, que sólo actúa cuando hay JavaScript—, por eso
 * este componente se monta al principio del `<body>`, que es donde Google
 * pide ese iframe.
 */
function GoogleTagManager({ id }: { id: string }) {
  return (
    <>
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(id)});`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          // El fragmento de Google no lo trae; sin él es un iframe sin nombre
          // accesible y los auditores de accesibilidad lo marcan.
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}

/**
 * Google Analytics 4 (gtag.js).
 *
 * Sólo se monta si `NEXT_PUBLIC_GA_ID` está puesta. Con GTM en marcha, lo
 * normal es que no lo esté y que GA4 viva dentro del contenedor.
 *
 * `afterInteractive` lo baja en cuanto la página es usable, no antes: la
 * medición nunca debe competir por ancho de banda con el hero.
 *
 * No se envía `page_view` a mano en cada navegación, y es deliberado. GA4 trae
 * activada por defecto la medición mejorada de "cambios de página basados en
 * eventos del historial del navegador", y el App Router navega justo así
 * (`pushState`). Mandarlo también desde aquí duplicaría cada vista de página
 * interna — el error clásico al montar GA4 sobre un SPA.
 *
 * El precio de dejárselo a GA4: en una navegación interna el evento sale en el
 * mismo instante del `pushState`, cuando React todavía no ha escrito el
 * `<title>` nuevo, así que el título puede llegar con un render de retraso. La
 * ruta, que es la dimensión que de verdad se usa para leer el tráfico, siempre
 * es correcta.
 *
 * El `JSON.stringify` del identificador no es adorno: sale de una variable de
 * entorno y se interpola dentro de un script en línea; así una comilla suelta
 * en el `.env` da un error de configuración y no un script roto.
 */
function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        id="ga4-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});`,
        }}
      />
    </>
  )
}

/**
 * Microsoft Clarity.
 *
 * Grabaciones de sesión y mapas de calor. Complementa a GA4 más que solaparse:
 * GA4 dice que la landing de un nicho pierde al 70% antes del formulario,
 * Clarity enseña en qué scroll exacto se van.
 *
 * El fragmento es el oficial de Clarity, tal cual lo entrega el panel: se deja
 * literal a propósito para poder compararlo con su documentación de un vistazo.
 * Sigue las navegaciones del SPA por su cuenta, no hace falta avisarle.
 */
function Clarity({ id }: { id: string }) {
  return (
    <Script
      id="clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(id)});`,
      }}
    />
  )
}
