/**
 * Bilingüe español / inglés.
 *
 * El español vive en la RAÍZ (`/`, `/marketing-btl-...`) y el inglés bajo
 * `/en`. No se usa `/es` a propósito: las rutas en español son las URLs exactas
 * que ya tenía el WordPress y mover el idioma por defecto a un prefijo tiraría
 * por la borda toda la indexación existente, que es justo lo que el cliente
 * pidió conservar.
 *
 * Cada página existe en los dos idiomas con su propio HTML, su `hreflang` y su
 * entrada en el sitemap: Google indexa las dos y una búsqueda en inglés puede
 * llegar. Un simple interruptor de idioma sin cambiar la URL no consigue nada
 * de eso.
 */

export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'es'

/** Códigos completos para `lang`, `hreflang` y `og:locale`. */
export const LOCALE_TAGS: Record<Locale, string> = {
  es: 'es-CO',
  en: 'en',
}

export const OG_LOCALES: Record<Locale, string> = {
  es: 'es_CO',
  en: 'en_US',
}

/**
 * Antepone el prefijo de idioma a una ruta interna.
 * El español no lleva prefijo, así que devuelve la ruta tal cual.
 */
export function localePath(locale: Locale, path: string): string {
  const limpia = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return limpia
  return limpia === '/' ? '/en' : `/en${limpia}`
}

/** Quita el prefijo de idioma: `/en/blog` → `/blog`. Útil para el conmutador. */
export function stripLocale(path: string): string {
  if (path === '/en') return '/'
  return path.startsWith('/en/') ? path.slice(3) : path
}

/**
 * Alternates de idioma para el `metadata` de Next.
 *
 * `x-default` apunta al español porque es el mercado principal y la versión
 * más completa; es lo que Google sirve cuando no puede deducir el idioma del
 * visitante.
 */
export function alternatesFor(path: string) {
  const base = stripLocale(path)
  return {
    /**
     * El canónico es la URL DE ESTA página, no la española.
     *
     * Apuntar `/en` al canónico de `/` le dice a Google que la versión inglesa
     * es un duplicado que no debe indexar — justo lo contrario de lo que se
     * busca. El hreflang de abajo es el que las empareja como traducciones;
     * el canónico sólo evita duplicados DENTRO de un mismo idioma.
     */
    canonical: path,
    languages: {
      'es-CO': localePath('es', base),
      en: localePath('en', base),
      'x-default': localePath('es', base),
    },
  }
}

/**
 * Nombre del nicho en el idioma pedido.
 *
 * Cae al nombre que trae la base si el slug no está traducido, que es lo que
 * pasará con cualquier nicho que el cliente cree desde el panel.
 */
export function nicheName(
  nombres: Record<string, string>,
  slug: string,
  reserva: string,
): string {
  return nombres[slug] ?? reserva
}
