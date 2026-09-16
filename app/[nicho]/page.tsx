import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, permanentRedirect } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Prose } from '@/components/site/prose'
import { JsonLd, breadcrumbSchema, nicheSchema } from '@/lib/schema'
import { site, pageTitle } from '@/lib/site'
import {
  getNiche,
  getNiches,
  getEpisodes,
  getPosts,
  getEpisodesByNiche,
  formatDuration,
  episodeCover,
} from '@/lib/content'
import { SectionLabel } from '@/components/site/brand-mark'
import { Marquee } from '@/components/site/marquee'
import { WordmarkMural } from '@/components/site/wordmark-mural'
import { CircularText } from '@/components/site/circular-text'
import { Calendly } from '@/components/site/calendly'
import { Reveal } from '@/components/site/reveal'
import { SplitHeadline } from '@/components/site/split-headline'
import { nicheImage, nicheVideo } from '@/lib/niche-media'
import { getDictionary, fill } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang } from '@/lib/translate-content'
import { DEFAULT_LOCALE, LOCALE_TAGS, alternatesFor, localePath, nicheName, type Locale } from '@/lib/i18n'
import { YouTubeEmbed } from '@/components/site/youtube-embed'

type Props = { params: Promise<{ nicho: string }> }

/**
 * ¿Es una URL del WordPress viejo?
 *
 * Allí los episodios y los posts vivían en la raíz (`/hacia-donde-va-el-…`) y
 * aquí cuelgan de `/v-podcast` y `/blog`. Como esta ruta dinámica recibe
 * cualquier slug de un solo segmento, es el sitio natural para rescatarlas:
 * en vez de un 404 que tira el enlace y su autoridad, un 308 al contenido.
 *
 * Acepta el slug exacto o uno que el nuevo alarga (el WordPress cortaba
 * "…-inmobiliario" donde aquí es "…-inmobiliario-en-colombia"). El mínimo de
 * longitud evita que un slug corto y genérico caiga en cualquier episodio.
 */
async function legacyDestination(slug: string): Promise<string | null> {
  if (slug.length < 12) return null
  const coincide = (candidato: string) => candidato === slug || candidato.startsWith(`${slug}-`)

  const [episodes, posts] = await Promise.all([getEpisodes(), getPosts()])
  const episode = episodes.find((e) => e.status === 'published' && coincide(e.slug))
  if (episode) return `/v-podcast/${episode.slug}`
  const post = posts.find((p) => p.status === 'published' && coincide(p.slug))
  if (post) return `/blog/${post.slug}`
  return null
}

/**
 * Landings de nicho.
 *
 * Las rutas son las URLs EXACTAS que ya tenía el WordPress
 * (p. ej. /marketing-btl-inmobiliario-mas-leads-y-ventas), para conservar
 * la indexación existente. Son slugs largos y con keyword: mal para estética,
 * muy bien para SEO — no vale la pena cambiarlos.
 */
export async function generateStaticParams() {
  return (await getNiches()).map((n) => ({ nicho: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nicho: slug } = await params
  const niche = await getNiche(slug)
  if (!niche) return {}

  const imagen = nicheImage(niche.slug)

  return {
    title: { absolute: pageTitle(niche.headline) },
    description: niche.description,
    keywords: niche.keywords,
    // Con hreflang: antes sólo llevaba el canónico, así que la versión
    // española no declaraba su pareja inglesa (la inglesa sí lo hacía).
    alternates: alternatesFor(`/${niche.slug}`),
    openGraph: {
      type: 'website',
      title: niche.headline,
      description: niche.description,
      url: `/${niche.slug}`,
      // Hay que repetirla: un `openGraph` de página REEMPLAZA al del layout,
      // no lo mezcla, y sin esto la landing se compartía sin imagen.
      images: [{ url: imagen, alt: niche.headline }],
    },
    twitter: { card: 'summary_large_image', title: niche.headline, images: [imagen] },
  }
}

export default async function NichePage({ params, locale = DEFAULT_LOCALE }: Props & { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const { nicho: slug } = await params
  const nicheRaw = await getNiche(slug)
  if (!nicheRaw) {
    const destino = await legacyDestination(slug)
    if (destino) permanentRedirect(ruta(destino))
    notFound()
  }
  const niche = translateNiche(nicheRaw, locale)
  const idiomaCuerpo = contentLang(nicheRaw, locale, 'body')

  const [episodes, allNiches] = await Promise.all([
    getEpisodesByNiche(niche.id),
    getNiches(),
  ])

  // Vídeo de cabecera: el fijado a mano o, si no hay, el del episodio más
  // reciente de este nicho.
  const video = nicheVideo(niche.slug, episodes)
  const nombre = nicheName(t.nichos_nombres, niche.slug, niche.name)

  return (
    <>
      <JsonLd data={nicheSchema(niche, ruta(`/${niche.slug}`))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: niche.name, url: `/${niche.slug}` },
        ])}
      />
      <Header locale={locale} />

      {/* `data-niche`: los eventos de conversión lo leen para atribuir cada
          WhatsApp o cita a su landing (ver lib/track.ts). */}
      <main className="grain pt-32 lg:pt-40" data-niche={niche.id}>
        {/* ── Encabezado ─────────────────────────────────────── */}
        <section className="relative overflow-hidden pb-16">
          {/* Mural detrás del titular: da profundidad sin competir con el texto,
              porque va al 5% y en contorno. */}
          <WordmarkMural rows={10} opacity={0.05} />
          <div className="shell movil-centrado relative">
          <nav aria-label={t.comun.rutaNavegacion} className="mb-10">
            <ol className="fila-icono flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
              <li>
                <Link href={ruta('/')} className="hover:text-foreground">
                  {t.comun.inicio}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{nombre}</li>
            </ol>
          </nav>

          {/* Segundo sello, en el encabezado. Gira en sentido contrario al de la
              sección ácida: si los dos giraran igual el recorrido de la página
              se sentiría repetitivo. En blanco porque hereda el color del
              encabezado por currentColor.
              Va en un contenedor aparte porque el componente ya trae
              `position: relative` en su clase base: pasarle `absolute` por
              className no funciona, gana la que Tailwind declare después.
              Se oculta por debajo de xl: ahí el titular ya ocupa el ancho. */}
          <div className="pointer-events-none absolute right-0 top-4 hidden xl:block">
            <CircularText
              text={t.hero.selloCiudad}
              duration={26}
              className="size-64 text-foreground/85"
            />
          </div>

          <p className="eyebrow flex items-center gap-3" style={{ color: niche.accent }}>
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: niche.accent }}
              aria-hidden="true"
            />
            {t.nichos.nicho} · {nombre}
          </p>

          <Reveal>
            <SplitHeadline
              as="h1"
              text={niche.headline}
              className="mt-7 max-w-5xl text-[clamp(2.3rem,6.2vw,5.4rem)]"
            />
          </Reveal>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{niche.subheadline}</p>

          <div className="mt-12 grid gap-12 border-t border-border pt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-20">
            <div>
              <p className="text-lg leading-relaxed text-foreground/85">{niche.intro}</p>

              <h2 className="eyebrow mt-14">{t.nichos.queHacemos}</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {niche.capabilities.map((capability) => (
                  <li key={capability} className="fila-icono flex items-start gap-4 border-b border-border pb-4">
                    <Check className="mt-0.5 size-4 shrink-0" style={{ color: niche.accent }} />
                    <span className="text-sm leading-relaxed">{capability}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#agendar"
                className="group mt-10 inline-flex items-center gap-3 bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-5"
              >
                {t.contacto.agendarReunion}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Vídeo si el nicho tiene uno, imagen si no. El WordPress viejo
                llevaba un vídeo en cada subpágina de nicho y es lo que el
                cliente quiere conservar.

                Va con la fachada de YouTube, no con el iframe directo: el embed
                arrastra ~1 MB de JavaScript y estas son las páginas
                comerciales, las que tienen que cargar rápido. Se pinta la
                miniatura y el iframe sólo entra al pulsar play.

                La proporción cambia con el contenido: 16:9 manda en el vídeo,
                4:5 en la imagen. Forzar el vídeo a vertical lo dejaría con
                franjas negras arriba y abajo. */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              {video ? (
                <YouTubeEmbed
                  id={video}
                  title={`${niche.name} — Contraste`}
                  poster={nicheImage(niche.slug)}
                />
              ) : (
                /* 16:9 y no 4:5: las piezas de nicho son apaisadas (2.33:1) y
                   con el motivo pegado a la derecha. En un hueco vertical el
                   recorte centrado se comía justo eso —las torres, la pantalla
                   del showroom— y dejaba en pantalla el fondo negro vacío.
                   Además así los cuatro nichos tienen el mismo hueco, lleven
                   vídeo o imagen. */
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                  <Image
                    src={nicheImage(niche.slug)}
                    alt={`Activación de marca de Contraste en el sector ${niche.name.toLowerCase()}`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          </div>
        </section>

        {/* Marquesina con las keywords del nicho: el mismo gesto del home, pero
            diciendo por qué compite este sector. Se usan las keywords y no las
            capacidades porque ya son frases cortas y no hay que recortarlas
            a media palabra. */}
        <Marquee words={niche.keywords} />

        {/* ── Texto largo del nicho ─────────────────────────────
            Es el contenido que hace competir a la landing por la búsqueda del
            sector. Misma rejilla que las preguntas frecuentes (etiqueta fija a
            la izquierda, lectura a la derecha) para que no parezca una sección
            de otro sitio. */}
        {niche.body.trim() && (
          <section className="shell py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="movil-centrado lg:sticky lg:top-32 lg:self-start">
                <SectionLabel>{t.nichos.metodo}</SectionLabel>
                <p className="display mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)]">
                  {fill(t.nichos.metodoTitular, { nicho: nombre.toLowerCase() })}
                </p>
              </div>
              <div className="max-w-2xl" lang={LOCALE_TAGS[idiomaCuerpo]}>
                <Prose body={niche.body} />
              </div>
            </div>
          </section>
        )}

        {/* ── Episodios del nicho ────────────────────────────── */}
        {episodes.length > 0 && (
          <section className="border-y border-border bg-secondary/25 py-20">
            <div className="shell">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <SectionLabel>{t.podcast.etiqueta}</SectionLabel>
                  <h2 className="display mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)]">
                    {t.nichos.conversacionesSector}
                  </h2>
                </div>
                <Link
                  href={ruta('/v-podcast')}
                  className="group inline-flex shrink-0 items-center gap-2 border-b border-accent pb-1 text-sm font-bold"
                >
                  {t.nichos.verTodoPodcast}
                  <ArrowUpRight className="size-4 text-accent-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {episodes.map((episode) => (
                  <article key={episode.slug} className="group">
                    <Link href={ruta(`/v-podcast/${episode.slug}`)}>
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
                        {episodeCover(episode) && (
                          <Image
                            src={episodeCover(episode)}
                            alt={`Portada del episodio: ${episode.title}`}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}
                        {episode.durationSeconds > 0 && (
                          <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 font-mono text-[11px] text-white">
                            {formatDuration(episode.durationSeconds)}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-5 text-lg font-bold leading-snug transition-colors group-hover:text-accent-text">
                        {episode.title}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ del nicho — activo de GEO ──────────────────── */}
        {niche.faqs.length > 0 && (
          <section className="shell py-20 lg:py-28">
            <div className="movil-centrado grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <SectionLabel>{t.faq.etiqueta}</SectionLabel>
                <h2 className="display mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)]">
                  {t.faq.titular.a}
                  <br />
                  {t.faq.titular.b}
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {niche.faqs.map((faq) => (
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
            </div>
          </section>
        )}

        {/* ── Otros nichos: enlazado interno ─────────────────── */}
        <section className="border-t border-border bg-secondary/25 py-16">
          <div className="shell movil-centrado">
            <h2 className="eyebrow">{t.nichos.otrosNichos}</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {allNiches
                .filter((n) => n.id !== niche.id)
                .map((other) => (
                  <li key={other.id}>
                    <Link
                      href={ruta(`/${other.slug}`)}
                      className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent-text"
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: other.accent }}
                        aria-hidden="true"
                      />
                      {nicheName(t.nichos_nombres, other.slug, other.name)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* ── Agendar ────────────────────────────────────────── */}
        <section id="agendar" className="scroll-mt-24 bg-accent py-20 text-accent-foreground lg:py-28">
          <div className="shell movil-centrado flex flex-col justify-between gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em]">
                {t.contacto.agendaUnaReunion}
              </p>
              <h2 className="display mt-7 max-w-3xl text-[clamp(2.1rem,6vw,4.6rem)]">
                {fill(t.contacto.activamosEnNicho, { nicho: nombre.toLowerCase() })}
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-70">
                {t.contacto.treintaMinutos}
              </p>

              <div className="mt-10">
                <Calendly
                  locale={locale}
                  url={site.calendlyUrl}
                  whatsappUrl={site.contact.whatsapp}
                  nicheName={nombre}
                  variant="onAccent"
                />
              </div>
            </div>

            {/* Sello giratorio. Gira al revés que el del home para que las dos
                secciones no se sientan calcadas. Hereda `currentColor`, así que
                sobre el ácido sale en negro sin configurar nada. */}
            <CircularText
              text={`${nombre} · Contraste · `}
              reverse
              className="size-40 shrink-0 self-center lg:size-64"
            />
          </div>
        </section>

      </main>

      <Footer locale={locale} />
    </>
  )
}
