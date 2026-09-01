import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'
import { getNiches, getPublishedPosts, formatDate } from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'
import { getDictionary } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang } from '@/lib/translate-content'
import { DEFAULT_LOCALE, localePath, nicheName, type Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Blog — marketing BTL, activaciones y datos',
  description:
    'Artículos sobre marketing experiencial, activaciones BTL, trade marketing y medición real, escritos desde la operación en Colombia.',
  alternates: { canonical: '/blog' },
}

export default async function BlogIndex({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const [postsRaw, nichesRaw] = await Promise.all([getPublishedPosts(), getNiches()])
  const posts = translatePosts(postsRaw, locale)
  const niches = translateNiches(nichesRaw, locale)
  const [featured, ...rest] = posts

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />
      <Header locale={locale} />

      <main className="pt-32 lg:pt-40">
        <section className="shell pb-14">
          <nav aria-label={t.comun.rutaNavegacion} className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <li>
                <Link href={ruta('/')} className="hover:text-foreground">
                  {t.comun.inicio}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </nav>

          <SectionLabel>{t.blog.subtitulo}</SectionLabel>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.2rem,4.8vw,4rem)]">Blog</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Lo que aprendemos ejecutando en calle y en punto de venta: qué se mide, qué funciona y
            qué no, sector por sector y ciudad por ciudad.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="shell pb-32">
            <p className="text-muted-foreground">
              Todavía no hay artículos publicados. Los que se publiquen desde el panel aparecerán
              aquí automáticamente.
            </p>
          </section>
        ) : (
          <>
            {featured && (
              <section className="shell pb-16">
                <Link
                  href={ruta(`/blog/${featured.slug}`)}
                  className="group grid gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-accent/40 md:grid-cols-[1.15fr_1fr] md:gap-10 lg:gap-12 lg:p-8"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                    {featured.coverUrl && (
                      <Image
                        src={featured.coverUrl}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <SectionLabel>{t.blog.masReciente}</SectionLabel>
                    <h2 className="display mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] transition-colors group-hover:text-accent-text">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {featured.excerpt}
                      </p>
                    )}
                    <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
                      <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt, locale)}</time>
                      {featured.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="size-3.5" />
                          {featured.location}
                        </span>
                      )}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent-text">
                      {t.blog.leerArticulo}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </section>
            )}

            <section className="shell pb-24 lg:pb-32">
              {rest.length > 0 && (
                <>
                  <h2 className="eyebrow border-t border-border pt-10">
                    {rest.length} {rest.length === 1 ? 'artículo más' : 'artículos más'}
                  </h2>
                  <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <article key={post.slug} className="group">
                        <Link href={ruta(`/blog/${post.slug}`)}>
                          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
                            {post.coverUrl && (
                              <Image
                                src={post.coverUrl}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 33vw, 100vw"
                                className="object-cover transition duration-500 group-hover:scale-105"
                              />
                            )}
                          </div>
                          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                            {post.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="size-3" />
                                {post.location}
                              </span>
                            )}
                          </p>
                          <h3 className="mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-accent-text">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                              {post.excerpt}
                            </p>
                          )}
                        </Link>
                      </article>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-20 border-t border-border pt-10">
                <h2 className="eyebrow">{t.nichos.explorarPorNicho}</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {niches.map((niche) => (
                    <li key={niche.id}>
                      <Link
                        href={ruta(`/${niche.slug}`)}
                        className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent-text"
                      >
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: niche.accent }}
                          aria-hidden="true"
                        />
                        {nicheName(t.nichos_nombres, niche.slug, niche.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer locale={locale} />
    </>
  )
}
