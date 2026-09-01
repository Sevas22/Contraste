'use client'

import { useEffect, useRef } from 'react'

/**
 * Parallax de scroll.
 *
 * Desplaza el contenido a distinta velocidad que la página para dar
 * profundidad. Se calcula en `requestAnimationFrame` y sólo mientras el bloque
 * está en pantalla: escuchar el scroll para elementos que no se ven es el
 * error que convierte un parallax en un problema de rendimiento.
 *
 * Escribe sólo `transform`, que el navegador resuelve en la capa de
 * composición sin recalcular el layout.
 */
export function Parallax({
  children,
  /** Recorrido total en píxeles a lo largo de toda la travesía por pantalla. */
  distance = 80,
  className = '',
}: {
  children: React.ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let visible = false
    let frame = 0

    const update = () => {
      const rect = el.getBoundingClientRect()
      // 0 cuando el bloque entra por abajo, 1 cuando sale por arriba
      const progreso = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
      const y = (progreso - 0.5) * distance
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
      frame = visible ? requestAnimationFrame(update) : 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(update)
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [distance])

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

/**
 * Contador que cuenta hacia arriba al entrar en pantalla.
 * El valor final se renderiza en el servidor, así que si el JS no llega el
 * número correcto ya está en el HTML — importa para SEO y para lectores.
 */
export function CountUp({
  value,
  prefix = '',
  duration = 1400,
  className = '',
}: {
  value: number
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const inicio = performance.now()
        const tick = (ahora: number) => {
          const t = Math.min((ahora - inicio) / duration, 1)
          // Desaceleración cúbica: el número frena al acercarse al final
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = prefix + Math.round(value * eased).toLocaleString('es-CO')
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, prefix, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('es-CO')}
    </span>
  )
}
