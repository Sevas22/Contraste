'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'

type Service = {
  slug: string
  title: string
  summary: string
}

const INTERVALO = 4200

/**
 * Carrusel de servicios con avance automático.
 *
 * Usa scroll nativo con `scroll-snap` en vez de transformar un track con JS:
 * así funciona de entrada con dedo, trackpad, rueda y teclado, y no se rompe
 * si el JS tarda. Las flechas y el avance automático sólo empujan ese scroll.
 *
 * El avance es por tarjetas y no continuo: las tarjetas llevan texto y una
 * marquesina obligaría a leer en movimiento.
 */
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, type Locale } from '@/lib/i18n'

export function ServicesCarousel({
  services,
  locale = DEFAULT_LOCALE,
}: {
  services: readonly Service[]
  locale?: Locale
}) {
  const t = getDictionary(locale)
  const trackRef = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [paused, setPaused] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft > max - 8)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    // Sin `behavior: 'smooth'` a propósito: combinado con scroll-snap-type
    // mandatory el navegador cancela la animación y el scroll no se mueve.
    // El suavizado lo aplica la clase `scroll-smooth` del contenedor.
    el.scrollBy({ left: step * dir })
  }, [])

  // Avance automático. Se detiene con el puntero encima o con el foco dentro,
  // para no mover la tarjeta que alguien está leyendo o tabulando.
  useEffect(() => {
    if (!playing || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth
      // Al llegar al final vuelve al principio en vez de quedarse clavado
      if (el.scrollLeft > max - 8) el.scrollTo({ left: 0 })
      else scrollByCard(1)
    }, INTERVALO)

    return () => clearInterval(timer)
  }, [playing, paused, scrollByCard])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Controles */}
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="h-px flex-1 bg-border">
          <div
            className="h-px bg-accent transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 6)}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? 'Pausar el carrusel' : 'Reanudar el carrusel'}
            className="mr-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
          >
            {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
            {playing ? 'Pausar' : 'Reanudar'}
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label={t.servicios.anteriores}
            className="flex size-11 items-center justify-center rounded-full border border-border transition hover:border-accent hover:text-accent-text disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label={t.servicios.siguientes}
            className="flex size-11 items-center justify-center rounded-full border border-border transition hover:border-accent hover:text-accent-text disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Pista: scrollable y enfocable por teclado.
          `scroll-pl-*` es imprescindible: sin él, el snap ignora el padding que
          compensa el margen negativo y ancla las tarjetas en posiciones que no
          corresponden, con lo que el scroll salta o rebota. */}
      <ul
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={t.servicios.region}
        className="-mx-6 flex snap-x snap-mandatory scroll-smooth scroll-pl-6 gap-4 overflow-x-auto px-6 pb-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-accent lg:-mx-10 lg:scroll-pl-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service, i) => (
          <li
            key={service.slug}
            className="w-[85vw] shrink-0 snap-start sm:w-[380px] lg:w-[420px]"
          >
            <article className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-accent/50 lg:p-10">
              {/* Número grande de fondo: da escala sin añadir ruido */}
              <span
                aria-hidden="true"
                className="display pointer-events-none absolute -right-2 -top-6 text-[7rem] leading-none text-foreground/[0.04] transition-colors duration-300 group-hover:text-accent/10"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative">
                <span className="font-mono text-xs text-accent-text">
                  {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </span>
                <h3 className="display mt-8 text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">
                  {(t.servicios_lista as any)[service.slug]?.title ?? service.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {(t.servicios_lista as any)[service.slug]?.summary ?? service.summary}
                </p>
              </div>

              <Link
                href={localePath(locale, '/#contacto')}
                className="relative -mb-1.5 mt-7 inline-flex items-center gap-2 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-foreground/60 transition group-hover:text-accent-text"
              >
                {t.servicios.consultar}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
