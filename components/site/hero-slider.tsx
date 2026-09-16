'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '@/lib/site'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, type Locale } from '@/lib/i18n'
import { BrandMark } from './brand-mark'

const DURATION = 6500

function SlideTitle({
  asH1,
  className,
  children,
}: {
  asH1: boolean
  className?: string
  children: React.ReactNode
}) {
  const Tag = asH1 ? 'h1' : 'p'
  return <Tag className={className}>{children}</Tag>
}

export function HeroSlider({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  // El copy de cada diapositiva vive en el diccionario, indexado por su id;
  // de site.ts sólo se usan la imagen, el tipo y el texto alternativo.
  const copy = (id: string) => (t.hero_slides as Record<string, { kicker: string; title: string[]; body: string }>)[id]
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const go = useCallback((index: number) => {
    setActive(((index % heroSlides.length) + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => go(active + 1), DURATION)
    return () => clearTimeout(timer)
  }, [active, playing, go])

  /**
   * El vídeo sólo corre en su propia diapositiva, y ni eso si la conexión no
   * da para ello.
   *
   * Aunque sólo se reproduzca en su turno, el navegador bufferiza por delante:
   * medido, al llegar a esa diapositiva lanzaba peticiones de 22 s y 10 s.
   * Con `saveData` activado o en 2G/3G se queda el póster, que ya es la misma
   * imagen y pesa unos 30 KB en vez de decenas de megas.
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const conexionPobre =
      conexion?.saveData === true || /^(slow-)?2g$|^3g$/.test(conexion?.effectiveType ?? '')

    if (heroSlides[active]?.type === 'video' && !conexionPobre) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={t.hero.carrusel}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black"
    >
      {heroSlides.map((slide, index) => {
        const current = index === active
        return (
          <article
            key={slide.id}
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} / ${heroSlides.length}: ${copy(slide.id).title.join(' ')}`}
            aria-hidden={!current}
            className={`absolute inset-0 transition-opacity duration-[900ms] ${
              current ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                ref={videoRef}
                className="absolute inset-0 size-full object-cover"
                src={slide.src}
                poster={slide.poster}
                muted
                loop
                playsInline
                preload="none"
                aria-label={slide.alt}
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                /**
                 * Las tres diapositivas se descargan de entrada, pero sólo la
                 * primera lleva `priority`.
                 *
                 * Estaban en diferido salvo la primera y, aunque ocupan el
                 * viewport entero, el navegador no las tenía listas al pulsar
                 * los puntos del carrusel: se saltaba a la segunda y sólo se
                 * veía negro hasta que terminaba de bajar. Medido: la variante
                 * de 1920px tarda ~800 ms la primera vez.
                 *
                 * `priority` en las tres sería peor: precargarlas todas le
                 * quita ancho de banda a la que decide el LCP, que es la
                 * primera. Con `eager` se piden ya, pero sin adelantarse a ella.
                 */
                priority={index === 0}
                loading={index === 0 ? undefined : 'eager'}
                sizes="100vw"
                className={`object-cover transition-transform duration-[7000ms] ease-out ${
                  current ? 'scale-105' : 'scale-100'
                }`}
              />
            )}

            {/* Oscurecido concentrado abajo-izquierda: da contraste al texto
                sin apagar la foto ni tapar las caras. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />
          </article>
        )
      })}

      {/* Etiqueta vertical en el borde: gesto editorial, fija entre slides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 items-center justify-center 2xl:flex">
        <span className="eyebrow -rotate-90 whitespace-nowrap text-white/35">
          Medellín · Colombia · Latam
        </span>
      </div>

      {/* Contenido */}
      <div className="shell pointer-events-none relative flex h-full flex-col justify-end pb-28 lg:pb-32">
        <div className="movil-centrado pointer-events-auto max-w-lg lg:max-w-xl">
          <p className="eyebrow mb-5 flex items-center gap-2.5">
            <BrandMark className="size-3 shrink-0" />
            {copy(heroSlides[active].id).kicker}
          </p>

          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={index === active ? 'block' : 'hidden'}
              aria-hidden={index !== active}
            >
              {/* Sólida + hueca: el contraste tipográfico sustituye a un
                  segundo color y hace que el bloque no se lea plano. */}
              <SlideTitle
                asH1={index === 0}
                className="display text-[clamp(2.1rem,5vw,4.2rem)] text-white"
              >
                {/* El único <h1> del home decía sólo "Resultados + IA": ni la
                    categoría ni la ciudad por las que compite la página. El
                    prefijo va oculto a la vista para no tocar el diseño del
                    hero, que el cliente cerró; lo leen el buscador y el lector
                    de pantalla, y describe con verdad lo que hay en pantalla. */}
                {index === 0 && <span className="sr-only">{t.hero.h1Categoria} </span>}
                {copy(slide.id).title[0]}
                <br />
                <span className="display-outline display-outline-accent">{copy(slide.id).title[1]}</span>
              </SlideTitle>
            </div>
          ))}

          <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
            {copy(heroSlides[active].id).body}
          </p>

          <Link
            href={localePath(locale, '/#contacto')}
            className="group mt-8 inline-flex items-center gap-4 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-6"
          >
            {t.hero.agendarCita}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Barra inferior */}
      <div data-despeja-flotante className="shell absolute inset-x-0 bottom-0 z-10 pb-7">
        <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5">
          <div className="flex items-center gap-4">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(index)}
                aria-label={`${t.hero.diapositiva} ${index + 1}`}
                aria-current={index === active}
                className="group -my-3 py-5"
              >
                <span
                  className={`block h-[3px] transition-all duration-500 ${
                    index === active ? 'w-16 bg-accent' : 'w-8 bg-white/25 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
            <span className="ml-1 font-mono text-[11px] text-white/40">
              {String(active + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40 sm:flex">
              <ArrowDown className="size-3 animate-bounce" />
              {t.hero.scroll}
            </span>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? t.hero.pausarCarrusel : t.hero.reanudarCarrusel}
              className="-my-3 flex items-center gap-2 py-3 font-mono text-[11px] uppercase tracking-widest text-white/40 transition hover:text-white"
            >
              {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
              {playing ? t.hero.pausar : t.hero.reanudar}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
