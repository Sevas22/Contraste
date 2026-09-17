import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { SectionLabel } from '@/components/site/brand-mark'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/lib/schema'
import { getNiches } from '@/lib/content'
import { translateNiches } from '@/lib/translate-content'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, alternatesFor, localePath, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre activaciones de marca y BTL',
  description:
    'Experiencia con marcas de licores, medición en punto de venta, cobertura en varias ciudades y de qué depende el presupuesto de una activación BTL en Colombia.',
  alternates: alternatesFor('/preguntas-frecuentes'),
}

/**
 * Página de preguntas frecuentes.
 *
 * Existe por los motores de respuesta: una pregunta con su respuesta completa
 * en una sola URL es el formato que copian, y el `FAQPage` del JSON-LD se lo
 * entrega ya estructurado. Las del home son de categoría; aquí están además
 * las transaccionales —precio, cobertura, KPI, experiencia con licores— con
 * las dos redacciones con que se busca lo mismo.
 *
 * Al final enlaza a los nichos: la respuesta resuelve la duda y la landing es
 * la que convierte.
 */
export default async function PreguntasFrecuentes({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)
  const niches = translateNiches(await getNiches(), locale)

  // Todas las preguntas de la página, en un único FAQPage
  const todas = [...t.faq_pagina.grupos.flatMap((g) => g.faqs), ...t.faq_home]

  return (
    <>
      <JsonLd data={faqSchema(todas, ruta('/preguntas-frecuentes'))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: t.comun.inicio, url: ruta('/') },
          { name: t.faq_pagina.titulo, url: ruta('/preguntas-frecuentes') },
        ])}
      />
      <Header locale={locale} />

      <main className="pt-32 lg:pt-40">
        <section className="shell movil-centrado pb-14">
          <nav aria-label={t.comun.rutaNavegacion} className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <li>
                <Link href={ruta('/')} className="hover:text-foreground">
                  {t.comun.inicio}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{t.faq_pagina.titulo}</li>
            </ol>
          </nav>

          <SectionLabel>{t.faq_pagina.etiqueta}</SectionLabel>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.2rem,4.8vw,4rem)]">
            {t.faq_pagina.titular.a}
            <br />
            <span className="display-outline display-outline-accent">{t.faq_pagina.titular.b}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.faq_pagina.intro}
          </p>
        </section>

        {/* Un <h2> por grupo y la respuesta siempre en el HTML: nada de
            acordeones que carguen el texto al abrirlos, que es lo que deja a
            un rastreador sin ver la respuesta. */}
        {t.faq_pagina.grupos.map((grupo) => (
          <section key={grupo.titulo} className="shell movil-centrado border-t border-border py-14">
            <h2 className="display text-[clamp(1.5rem,2.6vw,2.1rem)]">{grupo.titulo}</h2>
            <div className="mt-8 flex flex-col gap-6">
              {grupo.faqs.map((faq) => (
                <article key={faq.q} className="rounded-xl border border-border bg-card px-6 py-6">
                  <h3 className="text-base font-bold leading-snug">{faq.q}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="shell movil-centrado border-t border-border py-14">
          <h2 className="display text-[clamp(1.5rem,2.6vw,2.1rem)]">{t.faq.titular.a} {t.faq.titular.b}</h2>
          <div className="mt-8 flex flex-col gap-6">
            {t.faq_home.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-border bg-card px-6 py-6">
                <h3 className="text-base font-bold leading-snug">{faq.q}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell movil-centrado border-t border-border py-14 pb-24">
          <h2 className="display text-[clamp(1.5rem,2.6vw,2.1rem)]">{t.nichos.etiqueta}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {niches.map((niche) => (
              <li key={niche.id}>
                <Link
                  href={ruta(`/${niche.slug}`)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5 transition hover:border-accent/40"
                >
                  <span className="font-bold">{niche.name}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-accent-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-track-placement="preguntas-frecuentes"
            className="group mt-10 inline-flex items-center gap-4 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-6"
          >
            {t.nav.contactanosWhatsapp}
            <ArrowUpRight className="size-4" />
          </a>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  )
}
