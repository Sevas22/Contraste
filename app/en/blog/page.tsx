import type { Metadata } from 'next'
import BlogIndex from '../../blog/page'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Blog — BTL marketing, activations and data',
  description:
    'What we learn running brand activations in the street: method, measurement and field lessons.',
  alternates: alternatesFor('/en/blog'),
  openGraph: {
    type: 'website',
    locale: OG_LOCALES.en,
    alternateLocale: OG_LOCALES.es,
    url: '/en/blog',
  },
}

export default function EnglishBlogPage() {
  return (
    <div lang={LOCALE_TAGS.en}>
      <BlogIndex locale="en" />
    </div>
  )
}
