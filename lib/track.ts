/**
 * Eventos de conversión.
 *
 * GA4 ya cuenta visitas, páginas, scroll y clics salientes por su cuenta
 * (medición mejorada). Lo que no puede saber es cuáles de esos clics son un
 * cliente potencial: que alguien abra WhatsApp desde la landing inmobiliaria
 * vale más que cien vistas del home. Eso es lo que se manda desde aquí.
 *
 * Se empuja al `dataLayer`, no a `gtag()`: GA4 vive DENTRO de GTM (ver
 * `lib/analytics.ts`), y es el contenedor quien decide a qué herramientas
 * reenviar cada evento. Mañana el mismo `generate_lead` puede alimentar
 * también un píxel de Meta sin tocar código. La configuración del contenedor
 * está en `docs/gtm/`.
 *
 * Nombres y parámetros son los recomendados por Google cuando existen:
 *   · `generate_lead` es el evento estándar de captación de clientes, y GA4 lo
 *     reconoce en los informes de leads.
 *   · `method`, `video_title`, `video_provider` y `link_url` son dimensiones
 *     que GA4 ya trae: se ven en los informes sin registrar nada.
 *   · `placement` y `niche` son propias: hay que darlas de alta como
 *     dimensiones personalizadas (README → Conversiones).
 */

export type EventoMedicion =
  /** Contacto iniciado: clic en WhatsApp, correo o teléfono, o cita agendada en Calendly. */
  | 'generate_lead'
  /** Abrió el calendario de Calendly. Intención, todavía no conversión. */
  | 'calendly_open'
  /** Dio play a un episodio o al vídeo de un nicho. */
  | 'podcast_play'
  /** Fue a un perfil oficial de la marca. */
  | 'social_click'

export type ParametrosMedicion = {
  /** Canal del contacto: whatsapp · email · phone · calendly. Para social_click, la red. */
  method?: string
  /** Dónde estaba el elemento: header, footer, hero, contacto, agendar… */
  placement?: string
  /** Id del nicho si ocurrió dentro de una landing de nicho. */
  niche?: string
  video_title?: string
  video_provider?: string
  link_url?: string
}

/**
 * Todas las claves, vacías.
 *
 * GTM no reemplaza el estado del dataLayer en cada evento: lo MEZCLA. Si un
 * `generate_lead` lleva `niche: 'inmobiliario'` y el siguiente `social_click`
 * no dice nada del nicho, la variable de GTM sigue devolviendo 'inmobiliario' y
 * el clic en Instagram del home quedaría atribuido a esa landing. Mandar cada
 * clave explícitamente como `undefined` limpia lo que dejó el evento anterior.
 */
const VACIO: Record<keyof ParametrosMedicion, undefined> = {
  method: undefined,
  placement: undefined,
  niche: undefined,
  video_title: undefined,
  video_provider: undefined,
  link_url: undefined,
}

type ConDataLayer = Window & { dataLayer?: Record<string, unknown>[] }

export function track(event: EventoMedicion, params: ParametrosMedicion = {}): void {
  if (typeof window === 'undefined') return
  const w = window as ConDataLayer
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...VACIO, ...params })

  // En desarrollo GTM no se carga (ver lib/analytics.ts): el aviso por consola
  // es la forma de comprobar que cada botón dispara lo que debe.
  if (process.env.NODE_ENV !== 'production') {
    console.info('[medición]', event, params)
  }
}

/**
 * Sección de la página en la que está un elemento.
 *
 * Primero una marca explícita (`data-track-placement`), luego la cabecera o el
 * pie, y si no el `id` de la sección. Así casi ningún componente necesita
 * saber que se mide: los `id` de sección ya existen por los anclajes del menú.
 */
export function placementOf(el: Element | null): string {
  if (!el) return 'page'
  const marcado = el.closest<HTMLElement>('[data-track-placement]')
  if (marcado?.dataset.trackPlacement) return marcado.dataset.trackPlacement
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  const seccion = el.closest('section[id]')
  if (seccion) return seccion.id
  return 'page'
}

/**
 * Nicho de la landing en la que ocurre el clic (`data-niche` en el <main>).
 *
 * Es una propiedad de la PÁGINA, no del elemento: la cabecera y el pie quedan
 * fuera del <main>, y un WhatsApp pulsado desde la cabecera de la landing
 * inmobiliaria sigue siendo un lead inmobiliario.
 */
export function nicheOf(el: Element | null): string | undefined {
  const marcado =
    el?.closest<HTMLElement>('[data-niche]') ??
    (typeof document !== 'undefined' ? document.querySelector<HTMLElement>('main[data-niche]') : null)
  return marcado?.dataset.niche || undefined
}
