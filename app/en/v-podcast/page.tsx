import type { Metadata } from 'next'
import VPodcastPage from '../../v-podcast/page'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'V-Podcast — real business conversations',
  description:
    "Contraste's video podcast: conversations with leaders from each sector about business, investment, brand and consumers.",
  alternates: alternatesFor('/en/v-podcast'),
  openGraph: {
    type: 'website',
    locale: OG_LOCALES.en,
    alternateLocale: OG_LOCALES.es,
    url: '/en/v-podcast',
  },
}

export default function EnglishPodcastPage() {
  return (
    <div lang={LOCALE_TAGS.en}>
      <VPodcastPage locale="en" />
    </div>
  )
}
