import type { Metadata } from 'next'
import PreguntasFrecuentes from '../../preguntas-frecuentes/page'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'FAQ — brand activations and BTL in Colombia',
  description:
    'Experience with spirits brands, in-store measurement, coverage across several cities and what the budget of a BTL activation in Colombia depends on.',
  alternates: alternatesFor('/en/preguntas-frecuentes'),
  openGraph: {
    type: 'website',
    locale: OG_LOCALES.en,
    alternateLocale: OG_LOCALES.es,
    url: '/en/preguntas-frecuentes',
  },
}

export default function EnglishFaqPage() {
  return (
    <div lang={LOCALE_TAGS.en}>
      <PreguntasFrecuentes locale="en" />
    </div>
  )
}
