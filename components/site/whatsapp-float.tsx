'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/dictionaries'
import { isMeasurablePath } from '@/lib/analytics'
import { WhatsappIcon } from '@/components/site/social-icons'

/**
 * Burbuja flotante de WhatsApp, en todas las páginas públicas.
 *
 * Es el mismo enlace que el botón de la cabecera, así que el escuchador de
 * `analytics.tsx` ya lo mide como `generate_lead`; `data-track-placement`
 * lo separa en GA4 de los demás botones de WhatsApp.
 *
 * Se monta en el layout raíz, que también envuelve al panel y al login: ahí
 * no pinta nada, con el mismo criterio de rutas internas que la medición.
 */
export function WhatsappFloat() {
  const pathname = usePathname()
  const { lista, apartar } = useApartarDeLaBarra(pathname)

  if (!isMeasurablePath(pathname)) return null

  const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
  const etiqueta = getDictionary(locale).nav.contactanosWhatsapp

  return (
    <a
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta}
      data-track-placement="whatsapp-flotante"
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent print:hidden sm:bottom-6 sm:right-6 ${
        !lista ? 'pointer-events-none translate-y-4 opacity-0' : apartar ? '-translate-y-16' : ''
      }`}
    >
      <WhatsappIcon className="size-7" />
      {/* Fuera de la caja del enlace y sin eventos: invisible no tapa ni
          roba clics al contenido que queda a su izquierda. */}
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground opacity-0 ring-1 ring-border transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        {etiqueta}
      </span>
    </a>
  )
}

/**
 * La barra inferior del hero (puntos del carrusel y «Pausar») ocupa justo la
 * esquina de la burbuja. Dejarla siempre más alta la haría flotar sin motivo en
 * el resto de páginas, así que sólo se aparta mientras un elemento marcado con
 * `data-despeja-flotante` está en la franja baja de la pantalla.
 *
 * El servidor no sabe dónde está la barra, así que la burbuja llega oculta y
 * entra ya en su sitio (`lista`). Si se pintara abajo y luego subiera, en el
 * primer segundo del home taparía el botón de pausa y daría un salto.
 */
function useApartarDeLaBarra(pathname: string) {
  const [lista, setLista] = useState(false)
  const [apartar, setApartar] = useState(false)

  useEffect(() => {
    setLista(true)
    const barra = document.querySelector('[data-despeja-flotante]')
    if (!barra) {
      setApartar(false)
      return
    }
    // Primera lectura síncrona: el observador avisa un fotograma tarde
    const { top, bottom } = barra.getBoundingClientRect()
    setApartar(bottom > window.innerHeight * 0.6 && top < window.innerHeight)

    const observer = new IntersectionObserver(([entrada]) => setApartar(entrada.isIntersecting), {
      rootMargin: '-60% 0px 0px 0px',
    })
    observer.observe(barra)
    return () => observer.disconnect()
  }, [pathname])

  return { lista, apartar }
}
