import type { Metadata } from 'next'
import NichePage from '../../[nicho]/page'
import { getNiche, getNiches } from '@/lib/content'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'
import { en } from '@/lib/dictionaries'
import { translateNiche } from '@/lib/translate-content'
import { nicheImage } from '@/lib/niche-media'
import { pageTitle } from '@/lib/site'

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
  const raw = await getNiche(slug)
  if (!raw) return {}

  // El <head> tiene que salir en inglés: antes el título sí, pero la
  // description se servía en español y es lo que Google enseña bajo el enlace.
  const niche = translateNiche(raw, 'en')
  const nombre = (en.nichos_nombres as Record<string, string>)[slug] ?? niche.name
  const titular = raw.translations?.en?.headline ? niche.headline : `${nombre} — BTL activations`
  const imagen = nicheImage(slug)

  return {
    title: { absolute: pageTitle(titular) },
    description: niche.description,
    keywords: niche.keywords,
    alternates: alternatesFor(`/en/${niche.slug}`),
    openGraph: {
      type: 'website',
      locale: OG_LOCALES.en,
      alternateLocale: OG_LOCALES.es,
      title: titular,
      description: niche.description,
      url: `/en/${niche.slug}`,
      images: [{ url: imagen, alt: titular }],
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
