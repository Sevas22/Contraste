import type { Metadata } from 'next'
import HomePage from '../page'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

/**
 * Home en inglés.
 *
 * Reutiliza el MISMO componente que la versión española pasándole `locale`.
 * Duplicar el archivo entero habría significado mantener dos copias de 350
 * líneas y que se fueran separando con cada cambio de diseño.
 *
 * La página conserva su generación estática: no hay cookies ni cabeceras de por
 * medio, el idioma sale de la ruta.
 */
export const metadata: Metadata = {
  // `absolute` salta la plantilla del layout raíz ("%s | Contraste Agencia"),
  // que si no dejaba el título como "Contraste Agencia | … | Contraste Agencia".
  title: {
    absolute: `${site.legalName} | BTL and experiential marketing agency in Medellín`,
  },
  description:
    'BTL and experiential marketing agency in Medellín. Brand activations, 360 production, field staff management and real AI-backed measurement for brands across Colombia and Latin America.',
  // hreflang: le dice a Google que esta página y la española son la misma en
  // dos idiomas, no contenido duplicado.
  alternates: alternatesFor('/en'),
  openGraph: {
    type: 'website',
    locale: OG_LOCALES.en,
    alternateLocale: OG_LOCALES.es,
    url: '/en',
    siteName: site.legalName,
    title: `${site.legalName} | Experiences you feel, measure and remember`,
    description:
      'BTL and experiential marketing agency in Medellín. Brand activations, 360 production and real measurement.',
  },
}

export default function EnglishHomePage() {
  return (
    <div lang={LOCALE_TAGS.en}>
      <HomePage locale="en" />
    </div>
  )
}
