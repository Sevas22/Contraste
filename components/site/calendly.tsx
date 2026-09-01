'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n'

/**
 * Agendamiento con Calendly.
 *
 * El widget se carga sólo al hacer clic: el script de Calendly pesa unos
 * 100 KB y va en las cuatro landings de nicho, así que cargarlo de entrada
 * penalizaría el LCP de las páginas comerciales sin que casi nadie lo use.
 *
 * Si no hay URL configurada muestra el botón de WhatsApp, para que la sección
 * nunca quede rota ni vacía.
 */
export function Calendly({
  url,
  whatsappUrl,
  nicheName,
  variant = 'onDark',
  locale = DEFAULT_LOCALE,
}: {
  url: string
  whatsappUrl: string
  nicheName?: string
  /** 'onDark' = botón ácido sobre fondo oscuro.
   *  'onAccent' = botón negro sobre fondo ácido (si no, sería ácido sobre ácido). */
  variant?: 'onDark' | 'onAccent'
  locale?: Locale
}) {
  const t = getDictionary(locale)
  const primary =
    variant === 'onAccent'
      ? 'bg-accent-foreground text-accent'
      : 'bg-accent text-accent-foreground'
  const secondary =
    variant === 'onAccent'
      ? 'border-accent-foreground/30 text-accent-foreground/70 hover:border-accent-foreground hover:text-accent-foreground'
      : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !url) return

    const CSS_ID = 'calendly-css'
    const SCRIPT_ID = 'calendly-js'

    if (!document.getElementById(CSS_ID)) {
      const link = document.createElement('link')
      link.id = CSS_ID
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    const init = () => {
      const calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: unknown) => void } })
        .Calendly
      if (!calendly || !containerRef.current) return
      // Se pasa el nicho como UTM: así se sabe de qué landing vino cada reunión
      const target = nicheName
        ? `${url}${url.includes('?') ? '&' : '?'}utm_content=${encodeURIComponent(nicheName)}`
        : url
      calendly.initInlineWidget({ url: target, parentElement: containerRef.current })
      setLoading(false)
    }

    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      init()
      return
    }

    setLoading(true)
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = init
    script.onerror = () => setLoading(false)
    document.body.appendChild(script)
  }, [open, url, nicheName])

  // Sin URL configurada: WhatsApp como única vía, sin dejar hueco
  if (!url) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:gap-6 ${primary}`}
      >
        {t.contacto.agendarWhatsapp}
        <ArrowUpRight className="size-4" />
      </a>
    )
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`group inline-flex items-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:gap-6 ${primary}`}
        >
          <CalendarDays className="size-4" />
          {t.contacto.agendarReunion}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 border-b-2 pb-1 text-xs font-bold uppercase tracking-[0.18em] transition ${secondary}`}
        >
          {t.contacto.oWhatsapp}
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    )
  }

  return (
    <div>
      {loading && (
        <p className="font-mono text-xs text-muted-foreground">{t.contacto.cargandoCalendario}</p>
      )}
      {/*
        Alto por CONSULTA DE CONTENEDOR, no por ancho de pantalla.
        Calendly cambia a su maqueta de dos columnas cuando el iframe pasa de
        unos 680px, y ahí necesita bastante menos alto. Medido en esta página,
        el hueco disponible no crece de forma monótona: 327px a 375 de ancho,
        720px a 768, y vuelve a bajar a 608px a 1024, porque ahí el sello se
        coloca al lado. Atarlo a los breakpoints de pantalla daría un alto
        equivocado justo en ese tramo.
      */}
      <div className="@container w-full">
        <div
          ref={containerRef}
          data-calendly
          className="h-[1060px] w-full overflow-hidden bg-background @[680px]:h-[740px]"
          // El widget de Calendly pinta su propio fondo blanco
          style={{ colorScheme: 'light' }}
        />
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center gap-3 border-b-2 pb-1 text-xs font-bold uppercase tracking-[0.18em] transition ${secondary}`}
      >
        {t.contacto.prefieresWhatsapp}
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  )
}
