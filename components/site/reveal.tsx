'use client'

import { useEffect, useRef } from 'react'

/**
 * Aparición al entrar en pantalla.
 *
 * El estado inicial (oculto y desplazado) está en CSS, no en JS: si el
 * componente tardara en hidratar, el contenido no se quedaría invisible —
 * el observer sólo cambia el atributo a "in".
 *
 * Se desconecta tras revelar: no hay razón para seguir observando.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Si ya está en pantalla al montar (o no hay soporte), se muestra directo
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.reveal = 'in'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.style.transitionDelay = `${delay}ms`
        el.dataset.reveal = 'in'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // @ts-expect-error — Tag es una unión de etiquetas válidas
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  )
}
