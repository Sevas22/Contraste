import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Marquee } from '@/components/site/marquee'
import { HeroSlider } from '@/components/site/hero-slider'
import { NicheRows } from '@/components/site/niche-rows'
import { nicheImage } from '@/lib/niche-media'
import { ServicesCarousel } from '@/components/site/services-carousel'
import { InstagramFeed } from '@/components/site/instagram-feed'
import { ClientsWall } from '@/components/site/clients-wall'
import { Reveal } from '@/components/site/reveal'
import { CountUp, Parallax } from '@/components/site/parallax'
import { Calendly } from '@/components/site/calendly'
import { CircularText } from '@/components/site/circular-text'
import { WordmarkMural } from '@/components/site/wordmark-mural'
import { SectionLabel } from '@/components/site/brand-mark'
import { site, services } from '@/lib/site'
import { JsonLd, serviceCatalogSchema } from '@/lib/schema'
import { getDictionary, fill } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang } from '@/lib/translate-content'
import { DEFAULT_LOCALE, localePath, alternatesFor, LOCALE_TAGS, type Locale } from '@/lib/i18n'
import {
  getNiches,
  getPublishedEpisodes,
  getVisibleInstagramPosts,
  formatDate,
  formatDuration,
  episodeCover,
} from '@/lib/content'

export default async function HomePage({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const [niches, episodes, instagram] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    getVisibleInstagramPosts(10),
  ])
  // El español es la fuente; en inglés se superpone lo que esté traducido y
  // lo que falte cae solo al español.
  const latest = translateEpisodes(episodes.slice(0, 4), locale)

  return (
    <>
      <JsonLd data={serviceCatalogSchema(services)} />
      <Header locale={locale} />

      <main id="contenido" className="grain">
        <HeroSlider locale={locale} />

        <Marquee words={t.marquee} />

        {/* ── Manifiesto ──────────────────────────────────────── */}
        <section id="agencia" className="scroll-mt-24 py-24 lg:py-36">
          <div className="shell">
            <div className="movil-centrado grid gap-14 md:grid-cols-[170px_1fr] md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionLabel>{t.agencia.etiqueta}</SectionLabel>
                <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
                  {t.agencia.desde}
                  <br />
                  {t.agencia.lugar}
                </p>
              </div>

              <div>
                <Reveal>
                  <h2 className="display text-[clamp(2.4rem,6.5vw,6rem)]">
                    {t.agencia.titular.a}
                    <br />
                    <span className="display-outline">{t.agencia.titular.b}</span>
                    <br />
                    {t.agencia.titular.c} <span className="text-accent">{t.agencia.titular.d}</span>
                  </h2>
                </Reveal>

                <Reveal delay={120}>
                  <p className="mt-12 max-w-2xl text-xl leading-relaxed text-foreground/80 lg:text-2xl">
                    {t.agencia.cuerpo}
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <dl className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-3">
                    {[
                      { value: site.yearsOfExperience, prefix: '', label: t.agencia.aniosOperacion },
                      { value: site.brandsManaged, prefix: '+', label: t.agencia.marcasGestionadas },
                      { value: site.activations, prefix: '+', label: t.agencia.activacionesEjecutadas },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-background p-6 md:p-5 lg:p-9">
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <CountUp
                            value={stat.value}
                            prefix={stat.prefix}
                            className="display block whitespace-nowrap text-[clamp(2.2rem,5vw,4.5rem)] text-accent"
                          />
                          <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            {stat.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nichos ──────────────────────────────────────────── */}
        <section id="nichos" className="scroll-mt-24 bg-secondary/40">
          {/* La portada de la sección ocupa pantalla igual que cada nicho:
              así el bloque entero se recorre como una secuencia de pantallas
              y no como un titular seguido de una lista. */}
          <div className="flex min-h-[85svh] items-center py-20">
            <div className="shell movil-centrado w-full">
              <SectionLabel>{t.nichos.etiqueta}</SectionLabel>
              <Reveal>
                <h2 className="display mt-8 max-w-5xl text-[clamp(2.6rem,8vw,6.5rem)]">
                  {t.nichos.titular.a}
                  <br />
                  <span className="text-accent">{t.nichos.titular.b}</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-10 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">
                  No aplicamos la misma receta a un licor que a un proyecto de vivienda. Estas son
                  las cuatro verticales donde tenemos operación, equipo y método propio.
                </p>
                <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {fill(t.nichos.pista, { n: String(niches.length).padStart(2, '0') })}
                </p>
              </Reveal>
            </div>
          </div>

          <NicheRows
            niches={niches}
            images={niches.map((n) => nicheImage(n.slug))}
            locale={locale}
          />
        </section>

        {/* ── Servicios ───────────────────────────────────────── */}
        <section id="servicios" className="scroll-mt-24 py-24 lg:py-32">
          <div className="shell">
            <div className="movil-centrado flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <SectionLabel>{t.servicios.etiqueta}</SectionLabel>
                <Reveal>
                  <h2 className="display mt-6 max-w-2xl text-[clamp(1.9rem,5.5vw,4.4rem)]">
                    {t.servicios.titular.a}
                    <br />
                    {t.servicios.titular.b} <span className="display-outline display-outline-accent">{t.servicios.titular.c}</span>
                  </h2>
                </Reveal>
              </div>
              <Link
                href={ruta('/#contacto')}
                className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold"
              >
                {t.resultados.hablemosDeTuMarca}
                <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-16">
              <ServicesCarousel services={services} locale={locale} />
            </div>
          </div>
        </section>

        {/* ── Resultados ──────────────────────────────────────── */}
        <section
          id="resultados"
          className="grain scroll-mt-24 relative overflow-hidden border-y border-border bg-secondary/40"
        >
          {/* Mural de marca al 4%: la misma textura que sostiene las landings de
              nicho. Sin él este bloque era el único plano liso del recorrido. */}
          <WordmarkMural rows={10} opacity={0.04} />

          {/* La foto sangra hasta el borde derecho de la pantalla en vez de
              flotar en un recuadro redondeado. Era el único punto del sitio con
              una imagen "en caja": el hero y los nichos siempre recortan a
              sangre, y por eso esta sección se sentía pegada.
              Va en absoluto sólo desde lg; por debajo se muestra en el flujo,
              después del texto. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block xl:w-[46%]">
            <Parallax distance={70} className="absolute -inset-y-12 inset-x-0">
              <Image
                src="/media/activacion-01.jpg"
                alt={t.resultados.altFoto}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </Parallax>
            {/* Degradado hacia la izquierda: funde la foto con el fondo para que
                no quede un corte recto contra el texto. */}
            <span className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/45 to-transparent" />
            {/* Filete ácido en el canto: el mismo gesto del pie de página. */}
            <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          </div>

          {/* Alto contenido: medido, con py-32 la sección llegaba a 956 px
              contra 900 de viewport y el último punto de la lista quedaba
              cortado. Ahora entra entera en una pantalla estándar. */}
          <div className="shell relative py-20 lg:py-24">
            <div className="movil-centrado lg:max-w-[46%]">
              <SectionLabel>{t.resultados.etiqueta}</SectionLabel>
              <Reveal>
                <h2 className="display mt-5 text-[clamp(1.9rem,5vw,3.9rem)]">
                  {t.resultados.titular.a}
                  <br />
                  <span className="text-accent">{t.resultados.titular.b}</span>
                </h2>
              </Reveal>
              <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
                {t.resultados.cuerpo}
              </p>

              {/* Los tres puntos son las tres fases de la operación, así que se
                  leen como una secuencia y no como una lista suelta. El número
                  va en contorno y a escala de titular, igual que en las filas de
                  nicho: es lo que sube el bloque al nivel del resto. */}
              <ol className="mt-10 border-t border-border/70">
                {t.resultados_lista.map((item, i) => (
                  <li
                    key={item}
                    className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-border/70 py-5 lg:gap-7"
                  >
                    <span
                      aria-hidden="true"
                      className="display display-outline w-[2.2em] text-[clamp(1.9rem,4vw,2.9rem)] leading-none text-foreground/30 transition-colors duration-500 group-hover:text-accent"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-snug transition-colors duration-500 group-hover:text-foreground lg:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Móvil y tableta: la foto va debajo, ya en el flujo. */}
            <Reveal delay={100}>
              <div className="relative mt-14 aspect-[16/10] overflow-hidden lg:hidden">
                <Image
                  src="/media/activacion-01.jpg"
                  alt={t.resultados.altFoto}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              </div>
            </Reveal>
          </div>
        </section>

        <ClientsWall locale={locale} />

        {/* ── V-Podcast ───────────────────────────────────────── */}
        <section id="v-podcast" className="scroll-mt-24 py-24 lg:py-32">
          <div className="shell">
            <div className="movil-centrado flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <SectionLabel>{t.podcast.etiqueta}</SectionLabel>
                <Reveal>
                  <h2 className="display mt-6 max-w-2xl text-[clamp(1.9rem,5.5vw,4.4rem)]">
                    {t.podcast.titular.a}
                    <br />
                    <span className="text-accent">{t.podcast.titular.b}</span>
                  </h2>
                </Reveal>
              </div>
              <Link
                href={ruta('/v-podcast')}
                className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold"
              >
                {t.podcast.verTodos}
                <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {latest.length > 0 && (
              <ul className="mt-16 border-t border-border">
                {latest.map((episode, i) => (
                  <Reveal as="li" key={episode.slug} delay={i * 60}>
                    <Link
                      href={`/v-podcast/${episode.slug}`}
                      className="group grid gap-5 border-b border-border py-7 md:grid-cols-[80px_180px_1fr_auto] md:items-center md:gap-8"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(episode.number).padStart(2, '0')}
                      </span>

                      <span className="relative block aspect-video overflow-hidden bg-muted md:aspect-[16/10]">
                        {episodeCover(episode) && (
                          <Image
                            src={episodeCover(episode)}
                            alt={`Portada del episodio: ${episode.title}`}
                            fill
                            sizes="180px"
                            className="object-cover transition duration-700 group-hover:scale-110"
                          />
                        )}
                      </span>

                      <span className="min-w-0">
                        <span className="block text-lg font-bold leading-snug transition-colors group-hover:text-accent lg:text-xl">
                          {episode.title}
                        </span>
                        <span className="mt-2 block font-mono text-[11px] text-muted-foreground">
                          {formatDate(episode.publishedAt, locale)}
                          {episode.durationSeconds > 0 &&
                            ` · ${formatDuration(episode.durationSeconds)}`}
                        </span>
                      </span>

                      <ArrowUpRight className="hidden size-6 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:block" />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>

        <InstagramFeed posts={instagram} locale={locale} />

        {/* ── Contacto ────────────────────────────────────────── */}
        <section
          id="contacto"
          className="scroll-mt-24 bg-accent py-24 text-accent-foreground lg:py-32"
        >
          <div className="shell movil-centrado">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em]">
              {t.contacto.etiqueta}
            </p>
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <Reveal>
                <h2 className="display mt-8 text-[clamp(2.8rem,9vw,8rem)]">
                  {t.contacto.titular.a}
                  <br />
                  {t.contacto.titular.b}
                </h2>
              </Reveal>

              {/* Sello giratorio: el gesto que da movimiento a una sección que
                  de otro modo es sólo tipografía sobre un plano de color. */}
              <CircularText
                text={t.hero.selloMarca}
                className="size-40 shrink-0 self-center lg:size-56"
              />
            </div>

            <div className="mt-14">
              <Calendly url={site.calendlyUrl} whatsappUrl={site.contact.whatsapp} variant="onAccent" locale={locale} />
            </div>

            <div className="mt-14 grid gap-px border border-accent-foreground/20 bg-accent-foreground/20 sm:grid-cols-2">
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-center justify-between gap-4 bg-accent p-6 transition hover:bg-accent-foreground hover:text-accent sm:gap-6 lg:p-9"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">
                    {t.contacto.escribenos}
                  </span>
                  <span className="mt-2 block break-all text-base font-bold sm:text-lg">{site.contact.email}</span>
                </span>
                <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-accent p-6 transition hover:bg-accent-foreground hover:text-accent sm:gap-6 lg:p-9"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">
                    {t.contacto.whatsapp}
                  </span>
                  <span className="mt-2 block text-lg font-bold">{t.contacto.hablemosAhora}</span>
                </span>
                <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  )
}
