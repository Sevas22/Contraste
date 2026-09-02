import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CalendarDays, MapPin, User } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Prose } from '@/components/site/prose'
import { JsonLd, breadcrumbSchema, postSchema } from '@/lib/schema'
import { getNiches, getPost, getPosts, getPublishedPosts, formatDate } from '@/lib/content'
import { getDictionary, fill } from '@/lib/dictionaries'
import { translateEpisode, translateEpisodes, translateNiche, translateNiches, translatePost, translatePosts, contentLang } from '@/lib/translate-content'
import { DEFAULT_LOCALE, localePath, type Locale } from '@/lib/i18n'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const description = post.metaDescription || post.excerpt || post.title

  return {
    title: post.title,
    description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
    robots: post.status === 'draft' ? { index: false, follow: false } : undefined,
  }
}

export default async function PostPage({ params, locale = DEFAULT_LOCALE }: Props & { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const { slug } = await params
  const [postRaw, nichesRaw, publishedRaw] = await Promise.all([
    getPost(slug),
    getNiches(),
    getPublishedPosts(),
  ])
  if (!postRaw) notFound()

  const post = translatePost(postRaw, locale)
  const niches = translateNiches(nichesRaw, locale)
  const published = translatePosts(publishedRaw, locale)
  // Idioma REAL del artículo: puede seguir en español dentro del sitio inglés.
  const idiomaContenido = contentLang(postRaw, locale)

  const postNiches = niches.filter((n) => post.niches.includes(n.id))
  const related = published.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={postSchema(post, niches)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <Header locale={locale} />

      <main className="pt-32 lg:pt-40">
        {/* lang real del contenido: si el episodio/artículo sigue en español
            dentro del sitio inglés hay que decirlo. Google lo usa para no
            tomarlo por inglés malo, y un lector de pantalla cambia la fonética
            en vez de leer español con acento inglés. */}
        <article lang={idiomaContenido}>
          <header className="shell movil-centrado pb-10">
            <nav aria-label={t.comun.rutaNavegacion} className="mb-10">
              <ol className="fila-icono flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <li>
                  <Link href={ruta('/')} className="hover:text-foreground">
                    {t.comun.inicio}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={ruta('/blog')} className="hover:text-foreground">
                    {t.nav.blog}
                  </Link>
                </li>
              </ol>
            </nav>

            <h1 className="display max-w-4xl text-[clamp(2rem,4.2vw,3.4rem)]">{post.title}</h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-accent-text" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              </span>
              {post.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent-text" />
                  {post.location}
                </span>
              )}
              <span className="flex items-center gap-2">
                <User className="size-4 text-accent-text" />
                {post.author}
              </span>
            </div>

            {postNiches.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {postNiches.map((niche) => (
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

          {post.coverUrl && (
            <div className="shell pb-12">
              {/* Altura fija, no proporción.

                  Con aspect-[16/7] la portada medía 616 px en escritorio y
                  empujaba el artículo entero por debajo del pliegue: el lector
                  aterrizaba en la pieza y sólo veía una foto.

                  Y toparla con max-height tampoco valía: al recortar el alto,
                  el navegador encoge TAMBIÉN el ancho para respetar la
                  proporción, y la imagen quedaba en 905 px dentro de un
                  contenedor de 1408 — más estrecha que el texto de abajo.
                  Con altura directa ocupa todo el ancho y el object-cover se
                  encarga del encuadre.

                  La altura fija sólo sirve de lg en adelante: en móvil, 64svh
                  de una pantalla de 812 daría una portada casi cuadrada sobre
                  312 px de ancho. Por debajo manda 16:9, la misma proporción
                  que usan el listado y el V-Podcast.

                  El tope es generoso a propósito (hasta 660 px): la foto tiene
                  que verse, no quedar en una tira recortada. */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted lg:aspect-auto lg:h-[clamp(420px,64svh,660px)]">
                <Image
                  src={post.coverUrl}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="shell movil-centrado grid gap-16 pb-24 lg:grid-cols-[1fr_300px] lg:gap-20 lg:pb-32">
            <div className="min-w-0">
              {post.excerpt && (
                // Fuera del centrado: el filete ácido va pegado al margen
                // izquierdo y un texto centrado junto a una regla izquierda se
                // lee como un error de maquetación, no como una decisión.
                <p className="sin-centrar mb-10 border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground/85">
                  {post.excerpt}
                </p>
              )}

              {post.body.trim() ? (
                <Prose body={post.body} />
              ) : (
                <div className="rounded-xl border border-dashed border-border p-8">
                  <h2 className="text-lg font-bold">{t.blog.sinContenido}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.blog.sinContenidoCuerpo}
                  </p>
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground"
                  >
                    {t.blog.escribirPanel}
                  </Link>
                </div>
              )}

              {post.faqs.length > 0 && (
                <section className="mt-16">
                  <h2 className="eyebrow">{t.faq.etiqueta}</h2>
                  <div className="mt-6 flex flex-col gap-3">
                    {post.faqs.map((faq) => (
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
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              {related.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="eyebrow">{t.blog.masArticulos}</h2>
                  <ul className="mt-5 flex flex-col gap-5">
                    {related.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/blog/${other.slug}`}
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
                  {post.location
                    ? fill(t.contacto.ctaLugar, { lugar: post.location })
                    : t.contacto.ctaPais}
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
