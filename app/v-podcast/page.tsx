import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JsonLd, breadcrumbSchema, podcastSeriesSchema } from '@/lib/schema'
import {
  getNiches,
  getPublishedEpisodes,
  formatDate,
  formatDuration,
  episodeCover,
} from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'
import { getDictionary } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang } from '@/lib/translate-content'
import { DEFAULT_LOCALE, localePath, nicheName, type Locale } from '@/lib/i18n'
import { SplitHeadline } from '@/components/site/split-headline'
import { WordmarkMural } from '@/components/site/wordmark-mural'

export const metadata: Metadata = {
  title: 'V-Podcast — conversaciones de negocio por sector',
  description:
    'El videopodcast de Contraste: mercado inmobiliario, bebidas, consumo masivo y tecnología. Cada episodio con resumen, capítulos y preguntas frecuentes.',
  alternates: { canonical: '/v-podcast' },
  openGraph: {
    type: 'website',
    title: 'V-Podcast | Contraste',
    description: 'Conversaciones con referentes de cada sector. Negocio real, resultados reales.',
    url: '/v-podcast',
  },
}

export default async function VPodcastPage({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const [episodesRaw, nichesRaw] = await Promise.all([getPublishedEpisodes(), getNiches()])
  const episodes = translateEpisodes(episodesRaw, locale)
  const niches = translateNiches(nichesRaw, locale)
  const [featured, ...rest] = episodes

  return (
    <>
      <JsonLd data={podcastSeriesSchema(episodes)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'V-Podcast', url: '/v-podcast' },
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
              <li className="text-foreground">V-Podcast</li>
            </ol>
          </nav>

          <SectionLabel>{t.podcast.subtitulo}</SectionLabel>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.2rem,4.8vw,4rem)]">
            V-Podcast
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Conversaciones con referentes de cada sector sobre negocio real: cómo se invierte, cómo
            se construye marca y qué está cambiando en el mercado. Todo el contenido vive aquí, y
            cada episodio alimenta el nicho al que pertenece.
          </p>
        </section>

        {/* ── Episodio destacado ─────────────────────────────── */}
        {featured && (
          <section className="shell pb-16">
            <Link
              href={ruta(`/v-podcast/${featured.slug}`)}
              className="group grid gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-accent/40 md:grid-cols-[1.15fr_1fr] md:gap-10 lg:gap-12 lg:p-8"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                {episodeCover(featured) && (
                  <Image
                    src={episodeCover(featured)}
                    alt={`Portada del episodio: ${featured.title}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                )}
                {featured.durationSeconds > 0 && (
                  <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 font-mono text-[11px] text-white">
                    {formatDuration(featured.durationSeconds)}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <SectionLabel>{t.podcast.ultimoEpisodio}</SectionLabel>
                <SplitHeadline
                  text={featured.title}
                  maxParts={2}
                  className="mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)]"
                />
                {featured.subtitle && (
                  <p className="mt-4 text-muted-foreground">{featured.subtitle}</p>
                )}
                <p className="mt-6 font-mono text-xs text-muted-foreground">
                  Episodio {String(featured.number).padStart(2, '0')} ·{' '}
                  {formatDate(featured.publishedAt, locale)}
                  {featured.guests.length > 0 &&
                    ` · Con ${featured.guests.map((g) => g.name).join(', ')}`}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent-text">
                  {t.podcast.verEpisodio}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* ── Filtro por nicho ───────────────────────────────── */}
        <section className="shell pb-8">
          <h2 className="eyebrow">{t.nichos.explorarPorNicho}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {niches.map((niche) => {
              const count = episodes.filter((e) => e.niches.includes(niche.id)).length
              return (
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
                    <span className="font-mono text-xs text-muted-foreground">{count}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ── Todos los episodios ────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-border pb-24 pt-16 lg:pb-32">
          <WordmarkMural />
          <div className="shell relative">
          <h2 className="eyebrow border-t border-border pt-10">
            {episodes.length} {episodes.length === 1 ? 'episodio' : 'episodios'}
          </h2>

          <ul className="mt-8 flex flex-col">
            {rest.map((episode) => (
              <li key={episode.slug}>
                <Link
                  href={ruta(`/v-podcast/${episode.slug}`)}
                  className="group grid gap-6 border-b border-border py-8 md:grid-cols-[260px_1fr] md:gap-10"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
                    {episodeCover(episode) && (
                      <Image
                        src={episodeCover(episode)}
                        alt={`Portada del episodio: ${episode.title}`}
                        fill
                        sizes="260px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    {episode.durationSeconds > 0 && (
                      <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 font-mono text-[11px] text-white">
                        {formatDuration(episode.durationSeconds)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-xs text-muted-foreground">
                      Episodio {String(episode.number).padStart(2, '0')} ·{' '}
                      {formatDate(episode.publishedAt, locale)}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-accent-text lg:text-2xl">
                      {episode.title}
                    </h3>
                    {episode.subtitle && (
                      <p className="mt-2 text-sm text-muted-foreground">{episode.subtitle}</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {episode.niches.map((id) => {
                        const niche = niches.find((n) => n.id === id)
                        if (!niche) return null
                        return (
                          <span
                            key={id}
                            className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
                          >
                            {nicheName(t.nichos_nombres, niche.slug, niche.name)}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {episodes.length === 0 && (
            <p className="mt-10 max-w-lg text-muted-foreground">
              Todavía no hay episodios publicados. Los que se publiquen desde el panel aparecerán
              aquí automáticamente.
            </p>
          )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  )
}
