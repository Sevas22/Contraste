import type { Metadata } from 'next'
import EpisodePage from '../../../v-podcast/[slug]/page'
import { getEpisode, getPublishedEpisodes } from '@/lib/content'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'
import { hasEnglish, translateEpisode } from '@/lib/translate-content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedEpisodes()).map((e) => ({ slug: e.slug }))
}

/**
 * El título y el resumen siguen viniendo de la base, en español, porque el
 * episodio todavía no tiene versión traducida — es lo acordado: mostrar el
 * contenido en su idioma real antes que dejar la página vacía.
 *
 * Por eso `lang` se marca en el artículo, no en toda la página: le dice al
 * buscador y al lector de pantalla que ese bloque concreto está en español
 * aunque la interfaz que lo rodea esté en inglés.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const raw = await getEpisode(slug)
  if (!raw) return {}
  const episode = translateEpisode(raw, 'en')

  return {
    title: episode.title,
    description: episode.metaDescription || episode.summary.slice(0, 160),
    alternates: alternatesFor(`/en/v-podcast/${episode.slug}`, { traducida: hasEnglish(raw) }),
    ...(hasEnglish(raw) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: 'article',
      locale: OG_LOCALES.en,
      alternateLocale: OG_LOCALES.es,
      title: episode.title,
      url: `/en/v-podcast/${episode.slug}`,
    },
  }
}

export default function EnglishEpisodePage({ params }: Props) {
  return (
    <div lang={LOCALE_TAGS.en}>
      <EpisodePage params={params} locale="en" />
    </div>
  )
}
