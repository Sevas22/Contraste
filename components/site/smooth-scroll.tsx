'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

/**
 * Scroll suave con Lenis.
 *
 * Intercepta la rueda y el gesto táctil e interpola la posición en cada
 * fotograma, así la página se desliza en vez de saltar. Es lo que más cambia
 * la percepción de acabado del sitio, y pesa unos 3 KB.
 *
 * No se monta cuando el visitante pide menos movimiento: ahí el scroll nativo
 * es lo correcto.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const lenis = new Lenis({
      duration: 1.05,
      // Curva exponencial: arranca rápido y frena largo, que es lo que da la
      // sensación de peso en lugar de la de deslizamiento infinito.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // El scroll horizontal se deja al navegador: el carrusel de servicios
      // usa scroll nativo con snap y Lenis lo rompería.
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Los enlaces internos (#nichos, #contacto) los tiene que mover Lenis;
    // si no, el salto nativo pelea con la interpolación y da un tirón.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.('a[href^="#"], a[href^="/#"]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const id = href.slice(href.indexOf('#') + 1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /**
   * Volver arriba al cambiar de página.
   *
   * Next pone el scroll del documento a cero en cada navegación, pero Lenis
   * guarda su propia posición y en el siguiente fotograma la vuelve a escribir.
   * Resultado: entrabas a la landing de un nicho y aparecías a la altura del
   * pie, justo donde estabas en el home.
   *
   * Se salta cuando la URL trae ancla (#nichos, #agendar): ahí el destino lo
   * decide el ancla, no el principio de la página.
   */
  useEffect(() => {
    if (window.location.hash) return

    const lenis = lenisRef.current
    if (lenis) {
      // `immediate` evita que se vea el viaje de vuelta arriba; `force` lo
      // aplica aunque Lenis se crea detenido en ese instante.
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      // Sin Lenis (el visitante pidió menos movimiento) basta el nativo.
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
