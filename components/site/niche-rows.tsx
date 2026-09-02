import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Niche } from '@/lib/types'
import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, nicheName, type Locale } from '@/lib/i18n'

/**
 * Nichos como bloques a pantalla completa.
 *
 * Cada nicho ocupa el alto del viewport: al bajar, entra uno cada vez y se lee
 * como una sección propia, no como un elemento de lista. Es lo que convierte
 * las cuatro líneas de negocio en cuatro momentos y no en una tabla.
 *
 * La foto está siempre presente pero atenuada, y sube de intensidad al pasar
 * el cursor: aparecer sólo en hover hacía que el bloque se viera vacío hasta
 * que lo tocabas, y en móvil no aparecía nunca.
 */
export function NicheRows({
  niches,
  images,
  locale = DEFAULT_LOCALE,
}: {
  niches: Niche[]
  images: string[]
  locale?: Locale
}) {
  const t = getDictionary(locale)
  return (
    <ul>
      {niches.map((niche, i) => (
        <li key={niche.id} className="relative border-t border-border">
          <Link
            href={localePath(locale, `/${niche.slug}`)}
            className="group relative flex min-h-[50svh] items-center overflow-hidden py-14 sm:min-h-[62svh] lg:min-h-[85svh] lg:py-20"
          >
            {/* Fondo */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* La foto se mueve más lento que el texto: da profundidad sin
                  que el bloque deje de leerse como una unidad. */}
              <Parallax distance={90} className="absolute -inset-y-16 inset-x-0">
                <Image
                  src={images[i % images.length]}
                  alt=""
                  fill
                  sizes="100vw"
                  className="scale-105 object-cover opacity-25 transition-all duration-[1200ms] ease-out group-hover:scale-100 group-hover:opacity-45"
                />
              </Parallax>
              <span className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            </span>

            <div className="shell relative w-full">
              <Reveal>
                <div className="movil-centrado flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                  <div className="min-w-0">
                    {/* Número a escala de titular: es el ancla visual del bloque */}
                    <span
                      aria-hidden="true"
                      className="display block text-[clamp(2.6rem,9vw,8rem)] leading-none text-foreground/15 transition-colors duration-500 group-hover:text-accent"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="display mt-4 block text-[clamp(2.2rem,7vw,5.5rem)] transition-transform duration-500 lg:mt-6 lg:group-hover:translate-x-4">
                      {nicheName(t.nichos_nombres, niche.slug, niche.name)}
                    </span>

                    <span className="mt-5 block max-w-xl text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/75 lg:mt-7 lg:text-base">
                      {niche.description}
                    </span>
                  </div>

                  {/* `self-center` y no text-align: es un elemento flex, así que
                     el centrado por texto del contenedor no le llega. Además
                     así el filete inferior mide lo que el texto en vez de
                     cruzar la fila entera. */}
                  <span className="flex shrink-0 items-center gap-4 self-center border-b-2 border-border pb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-500 group-hover:border-accent group-hover:text-accent lg:self-auto">
                    {t.nichos.verNicho}
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Reveal>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
