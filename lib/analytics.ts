/**
 * Medición de tráfico: fuente única de los identificadores.
 *
 * Cuatro piezas:
 *   · Google Tag Manager → el contenedor. No mide nada por sí mismo: es el
 *                          panel desde donde el cliente enciende y apaga
 *                          etiquetas (GA4, píxeles, Clarity) sin redesplegar.
 *   · Google Analytics 4 → cuánta gente entra, de dónde y qué hace.
 *   · Search Console     → con qué búsquedas aparece el sitio en Google.
 *                          No lleva script: se verifica con una etiqueta
 *                          `<meta>` que se monta en `app/layout.tsx`.
 *   · Microsoft Clarity  → grabaciones de sesión y mapas de calor. Es lo que
 *                          explica el *por qué* de lo que GA4 mide.
 *
 * Los identificadores no son secretos (viajan en el HTML de todas formas), por
 * eso van con prefijo NEXT_PUBLIC_. Los tokens de verificación sí se leen sólo
 * en el servidor, en `app/layout.tsx`.
 *
 * Si una variable está vacía, esa herramienta simplemente no se carga: el sitio
 * funciona igual y se pueden ir activando de una en una.
 */

export const analytics = {
  /** GTM-XXXXXXX — tagmanager.google.com → el contenedor del sitio */
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  /**
   * G-XXXXXXXXXX — GA4 → Administrar → Flujos de datos → Web.
   *
   * ⚠️ O esto, o una etiqueta de GA4 dentro de GTM. Las dos a la vez cuentan
   * cada visita dos veces, y lo peor es que no se nota: no falla nada, sólo
   * salen el doble de sesiones con la mitad de duración. Con GTM en marcha,
   * lo normal es dejar esta variable VACÍA y configurar GA4 desde GTM.
   */
  ga: process.env.NEXT_PUBLIC_GA_ID ?? '',
  /**
   * 10 caracteres — clarity.microsoft.com → Settings → Overview.
   * Mismo criterio que GA4: si Clarity se instala como etiqueta de GTM, esta
   * variable se deja vacía.
   */
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? '',
} as const

/**
 * En desarrollo no se carga nada.
 *
 * Mismo criterio que ya se aplicaba a Vercel Analytics: cada `pnpm dev` con
 * recarga en caliente contaría como visita real y ensuciaría el histórico
 * justo cuando hay menos datos y más pesa cada sesión falsa.
 *
 * Ojo: los despliegues de vista previa de Vercel también corren en modo
 * producción, así que también miden. Si llega a molestar, se filtran desde
 * GA4 con una regla de tráfico interno por `hostname`.
 */
export const measurementEnabled = process.env.NODE_ENV === 'production'

/**
 * El panel y el login son uso interno del cliente: medirlos infla las sesiones
 * y ensucia los informes de comportamiento con las visitas del propio equipo.
 * Además, Clarity graba la pantalla, y ahí dentro hay datos de contacto y
 * contenido sin publicar que no tienen por qué salir del navegador.
 */
const RUTAS_PRIVADAS = ['/admin', '/login']

export function isMeasurablePath(pathname: string): boolean {
  return !RUTAS_PRIVADAS.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`),
  )
}
