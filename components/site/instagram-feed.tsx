import { ArrowUpRight } from 'lucide-react'
import { site } from '@/lib/site'
import { SectionLabel } from './brand-mark'
import { InstagramTile } from './instagram-tile'
import type { InstagramPost } from '@/lib/types'

/**
 * Feed de Instagram.
 *
 * Las imágenes se sirven desde nuestro almacenamiento, no desde el CDN de
 * Instagram: sus URLs llevan firma y caducan en días, así que enlazarlas
 * directamente dejaría el feed roto en una semana.
 */
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, type Locale } from '@/lib/i18n'

export function InstagramFeed({
  posts,
  locale = DEFAULT_LOCALE,
}: {
  posts: InstagramPost[]
  locale?: Locale
}) {
  const t = getDictionary(locale)
  if (posts.length === 0) return null

  return (
    <section
      id="instagram"
      className="scroll-mt-24 border-y border-border bg-secondary/25 py-20 lg:py-28"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>{t.instagram.etiqueta}</SectionLabel>
            <h2 className="display mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)]">
              {t.instagram.titular.a}
              <br />
              <span className="text-accent">{t.instagram.titular.b}</span>
            </h2>
          </div>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-border px-5 py-3 text-sm font-bold transition hover:border-accent sm:self-auto"
          >
            @agencia_contraste
            <ArrowUpRight className="size-4 text-accent-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <li key={post.id}>
              <InstagramTile post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
