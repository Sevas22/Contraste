import type { Metadata } from 'next'
import NichePage from '../../[nicho]/page'
import { getNiche, getNiches } from '@/lib/content'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'
import { en } from '@/lib/dictionaries'

type Props = { params: Promise<{ nicho: string }> }

/**
 * Landings de nicho en inglés.
 *
 * Conservan el MISMO slug que la versión española (`/en/marketing-btl-...`)
 * a propósito. Traducir el slug daría una URL más bonita en inglés, pero esos
 * slugs son las URLs históricas del WordPress: mantenerlos idénticos hace que
 * las dos versiones se emparejen sola por `hreflang` y que un enlace externo
 * sólo tenga que anteponer `/en` para llegar a la traducción.
 */
export async function generateStaticParams() {
  return (await getNiches()).map((n) => ({ nicho: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nicho: slug } = await params
  const niche = await getNiche(slug)
  if (!niche) return {}

  const nombre = (en.nichos_nombres as Record<string, string>)[slug] ?? niche.name

  return {
    // El titular largo del nicho vive en la base y aún no está traducido, así
    // que el título en inglés se arma con lo que sí lo está: el nombre del
    // sector. Vale más un título corto correcto que uno largo en otro idioma.
    title: `${nombre} — BTL activations`,
    description: niche.description,
    keywords: niche.keywords,
    alternates: alternatesFor(`/en/${niche.slug}`),
    openGraph: {
      type: 'website',
      locale: OG_LOCALES.en,
      alternateLocale: OG_LOCALES.es,
      title: `${nombre} — BTL activations | Contraste`,
      description: niche.description,
      url: `/en/${niche.slug}`,
    },
  }
}

export default function EnglishNichePage({ params }: Props) {
  return (
    <div lang={LOCALE_TAGS.en}>
      <NichePage params={params} locale="en" />
    </div>
  )
}
