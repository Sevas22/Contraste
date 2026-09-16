import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, Clock, User } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { EpisodePlayer } from '@/components/site/episode-player'
import { SplitHeadline } from '@/components/site/split-headline'
import { JsonLd, breadcrumbSchema, episodeSchema, timeToSeconds } from '@/lib/schema'
import {
  getEpisode,
  getEpisodes,
  getPublishedEpisodes,
  getNiches,
  formatDate,
  formatDuration,
  youtubeThumb,
  episodeCover,
} from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'
import { getDictionary, fill } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang, hasEnglish } from '@/lib/translate-content'
import { DEFAULT_LOCALE, alternatesFor, localePath, type Locale } from '@/lib/i18n'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getEpisodes()).map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const episode = await getEpisode(slug)
  if (!episode) return {}

  const description = episode.metaDescription || episode.summary.slice(0, 155) || episode.title

  return {
    title: episode.subtitle ? `${episode.title} — ${episode.subtitle}` : episode.title,
    description,
    keywords: episode.keywords,
    alternates: alternatesFor(`/v-podcast/${slug}`, { traducida: hasEnglish(episode) }),
    openGraph: {
      type: 'article',
      title: episode.title,
      description,
      url: `/v-podcast/${slug}`,
      publishedTime: episode.publishedAt,
      modifiedTime: episode.updatedAt,
      images: episodeCover(episode) ? [episodeCover(episode)] : undefined,
    },
    robots: episode.status === 'draft' ? { index: false, follow: false } : undefined,
  }
}

export default async function EpisodePage({ params, locale = DEFAULT_LOCALE }: Props & { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const { slug } = await params
  const [episodeRaw, nichesRaw, publishedRaw] = await Promise.all([
    getEpisode(slug),
    getNiches(),
    getPublishedEpisodes(),
  ])
  if (!episodeRaw) notFound()

  const episode = translateEpisode(episodeRaw, locale)
  const niches = translateNiches(nichesRaw, locale)
  const published = translateEpisodes(publishedRaw, locale)
  // Idioma REAL del episodio: puede seguir en español dentro del sitio inglés.
  const idiomaContenido = contentLang(episodeRaw, locale)

  const episodeNiches = niches.filter((n) => episode.niches.includes(n.id))
  const related = published.filter((e) => e.slug !== episode.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={episodeSchema(episode)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'V-Podcast', url: '/v-podcast' },
          { name: episode.title, url: `/v-podcast/${episode.slug}` },
        ])}
      />
      <Header locale={locale} />

      <main className="pt-32 lg:pt-40">
        {/* lang real del contenido: si el episodio/artículo sigue en español
            dentro del sitio inglés hay que decirlo. Google lo usa para no
            tomarlo por inglés malo, y un lector de pantalla cambia la fonética
            en vez de leer español con acento inglés. */}
        <article lang={idiomaContenido}>
          <header className="shell movil-centrado pb-12">
            <nav aria-label={t.comun.rutaNavegacion} className="mb-10">
              <ol className="fila-icono flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <li>
                  <Link href={ruta('/')} className="hover:text-foreground">
                    {t.comun.inicio}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={ruta('/v-podcast')} className="hover:text-foreground">
                    {t.nav.podcast}
                  </Link>
                </li>
              </ol>
            </nav>

            <SectionLabel>Episodio {String(episode.number).padStart(2, '0')}</SectionLabel>
            <SplitHeadline
              as="h1"
              text={episode.title}
              className="mt-6 max-w-4xl text-[clamp(2rem,4.6vw,3.8rem)]"
            />
            {episode.subtitle && (
              <p className="mt-5 max-w-2xl text-xl text-muted-foreground">{episode.subtitle}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-accent-text" />
                <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt, locale)}</time>
              </span>
              {episode.durationSeconds > 0 && (
                <span className="flex items-center gap-2">
                  <Clock className="size-4 text-accent-text" />
                  {formatDuration(episode.durationSeconds)} min
                </span>
              )}
              {episode.guests.map((guest) => (
                <span key={guest.name} className="flex items-center gap-2">
                  <User className="size-4 text-accent-text" />
                  {guest.name}
                  {guest.role && <span className="text-muted-foreground/70">· {guest.role}</span>}
                </span>
              ))}
            </div>

            {episodeNiches.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {episodeNiches.map((niche) => (
                  <li key={niche.id}>
                    <Link
                      href={`/${niche.slug}`}
                      className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-xs transition hover:border-accent hover:text-accent-text"
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: niche.accent }}
                        aria-hidden="true"
                      />
                      {niche.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="shell movil-centrado pb-16">
            <EpisodePlayer
              mediaType={episode.mediaType}
              youtubeId={episode.youtubeId}
              mediaUrl={episode.mediaUrl}
              poster={episodeCover(episode)}
              title={episode.title}
            />
          </div>

          <div className="shell movil-centrado grid gap-16 pb-24 lg:grid-cols-[1fr_320px] lg:gap-20 lg:pb-32">
            <div className="min-w-0">
              {episode.summary && (
                <section>
                  <h2 className="eyebrow">{t.podcast.deQueHabla}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-foreground/85">
                    {episode.summary}
                  </p>
                </section>
              )}

              {episode.keyTakeaways.length > 0 && (
                <section className="mt-16">
                  <h2 className="eyebrow">{t.podcast.conclusiones}</h2>
                  <ul className="mt-6 flex flex-col gap-5">
                    {episode.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex gap-5 border-b border-border pb-5">
                        <span className="display shrink-0 text-2xl text-accent-text">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="leading-relaxed text-foreground/85">{takeaway}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {episode.chapters.length > 0 && (
                <section className="mt-16">
                  <h2 className="eyebrow">{t.podcast.capitulos}</h2>
                  <ol className="mt-6 flex flex-col">
                    {episode.chapters.map((chapter) => (
                      <li
                        key={chapter.at}
                        className="flex items-baseline gap-6 border-b border-border py-4"
                      >
                        <a
                          href={`https://www.youtube.com/watch?v=${episode.youtubeId}&t=${timeToSeconds(chapter.at)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 font-mono text-sm text-accent-text hover:underline"
                        >
                          {chapter.at}
                        </a>
                        <span className="text-sm">{chapter.label}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {episode.faqs.length > 0 && (
                <section className="mt-16">
                  <h2 className="eyebrow">{t.faq.etiqueta}</h2>
                  <div className="mt-6 flex flex-col gap-3">
                    {episode.faqs.map((faq) => (
                      <details
                        key={faq.q}
                        className="group rounded-xl border border-border bg-card px-6 py-5"
                      >
                        <summary className="cursor-pointer list-none text-base font-bold marker:hidden">
                          <span className="flex items-start justify-between gap-6">
                            {faq.q}
                            <span className="mt-1 shrink-0 text-accent-text transition-transform group-open:rotate-45">
                              +
                            </span>
                          </span>
                        </summary>
                        <p className="mt-4 leading-relaxed text-muted-foreground">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {episode.transcript && (
                <section className="mt-16">
                  <h2 className="eyebrow">{t.podcast.transcripcion}</h2>
                  <div className="mt-6 flex flex-col gap-4 leading-relaxed text-muted-foreground">
                    {episode.transcript.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {!episode.summary && !episode.keyTakeaways.length && !episode.faqs.length && (
                <section className="rounded-xl border border-dashed border-border p-8">
                  <h2 className="text-lg font-bold">{t.podcast.sinContenido}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.podcast.sinContenidoCuerpo}
                  </p>
                  <Link
                    href={`/admin/episodios/${episode.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground"
                  >
                    {t.podcast.completarPanel}
                  </Link>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              {episode.topics.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="eyebrow">{t.podcast.temas}</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {episode.topics.map((topic) => (
                      <li key={topic} className="text-sm leading-relaxed text-muted-foreground">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {related.length > 0 && (
                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                  <h2 className="eyebrow">{t.podcast.masEpisodios}</h2>
                  <ul className="mt-5 flex flex-col gap-5">
                    {related.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/v-podcast/${other.slug}`}
                          className="text-sm font-semibold leading-snug transition-colors hover:text-accent-text"
                        >
                          {other.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 rounded-xl bg-accent p-6 text-accent-foreground">
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  {t.contacto.activamosTuMarca}
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  {t.contacto.ctaPais}
                </p>
                <Link
                  href={ruta('/#contacto')}
                  className="mt-6 inline-flex rounded-full bg-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent"
                >
                  {t.hero.agendarCita}
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer locale={locale} />
    </>
  )
}
