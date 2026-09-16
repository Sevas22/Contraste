import type { Metadata } from 'next'
import PostPage from '../../../blog/[slug]/page'
import { getPost, getPublishedPosts, isIndexablePost } from '@/lib/content'
import { alternatesFor, LOCALE_TAGS, OG_LOCALES } from '@/lib/i18n'
import { hasEnglish, translatePost } from '@/lib/translate-content'
import { pageTitle } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const raw = await getPost(slug)
  if (!raw) return {}
  // El título del <head> tiene que salir traducido: es lo que se ve en Google.
  const post = translatePost(raw, 'en')

  return {
    title: { absolute: pageTitle(post.title) },
    description: post.metaDescription || post.excerpt.slice(0, 160),
    alternates: alternatesFor(`/en/blog/${post.slug}`, { traducida: hasEnglish(raw) }),
    // Sin traducir es el mismo texto que /blog/…: se sirve, pero no se indexa
    robots: isIndexablePost(raw) && hasEnglish(raw) ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'article',
      locale: OG_LOCALES.en,
      alternateLocale: OG_LOCALES.es,
      title: post.title,
      url: `/en/blog/${post.slug}`,
    },
  }
}

export default function EnglishPostPage({ params }: Props) {
  return (
    <div lang={LOCALE_TAGS.en}>
      <PostPage params={params} locale="en" />
    </div>
  )
}
