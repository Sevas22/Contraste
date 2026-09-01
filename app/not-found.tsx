import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { SectionLabel } from '@/components/site/brand-mark'
import { WordmarkMural } from '@/components/site/wordmark-mural'
import { getNiches } from '@/lib/content'

/**
 * Página 404.
 *
 * Importa porque el WordPress viejo tenía URLs que van a seguir circulando en
 * enlaces y en el índice de Google durante meses. Sin esto, quien llegue a una
 * de ellas se encuentra la pantalla por defecto de Next: sin cabecera, sin
 * salida y en inglés.
 *
 * Lleva enlaces a los cuatro nichos porque son las páginas comerciales: si
 * alguien aterriza perdido, lo útil es empujarlo a la que le corresponda.
 */
export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default async function NotFound() {
  const niches = await getNiches()

  return (
    <>
      <Header />

      <main className="grain relative flex min-h-[70svh] items-center overflow-hidden pt-32 lg:pt-40">
        <WordmarkMural rows={10} opacity={0.05} />

        <div className="shell relative py-20">
          <SectionLabel>Error 404</SectionLabel>

          <h1 className="display mt-6 max-w-3xl text-[clamp(2.1rem,6vw,4.6rem)]">
            Esta página
            <br />
            <span className="display-outline">ya no existe.</span>
            <br />
            <span className="text-accent">El resto sí.</span>
          </h1>

          <p className="mt-7 max-w-xl leading-relaxed text-muted-foreground">
            Puede que el enlace venga del sitio anterior o que la dirección esté mal escrita. Te
            dejamos por dónde seguir.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-5"
            >
              Volver al inicio
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/v-podcast"
              className="inline-flex items-center gap-3 border-b-2 border-border pb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-foreground"
            >
              Ver el V-Podcast
            </Link>
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <h2 className="eyebrow">Nuestros nichos</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {niches.map((niche) => (
                <li key={niche.id}>
                  <Link
                    href={`/${niche.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent-text"
                  >
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: niche.accent }}
                      aria-hidden="true"
                    />
                    {niche.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
