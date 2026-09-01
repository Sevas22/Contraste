'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Gauge, Menu, X } from 'lucide-react'
import { site } from '@/lib/site'
import type { Dictionary } from '@/lib/dictionaries'
import { localePath, type Locale } from '@/lib/i18n'
import { LanguageSwitch } from './language-switch'
import { Logo } from './logo'

export type MenuItem = {
  label: string
  href: string
  children: { label: string; href: string }[]
}

export function HeaderShell({
  menu,
  adminHref,
  locale,
  t,
}: {
  menu: MenuItem[]
  adminHref: string
  locale: Locale
  t: Dictionary
}) {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el desplegable con Escape — requisito de accesibilidad de teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Pequeño retardo al salir: evita que el menú se cierre al cruzar el hueco
  // entre el botón y el panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open || openMenu ? 'border-b border-border bg-background/90 backdrop-blur-xl' : ''
      }`}
    >
      <div className="shell flex items-center justify-between py-5">
        <Logo width={150} priority href={localePath(locale, '/')} />

        <nav aria-label={t.nav.navPrincipal} className="hidden items-center gap-1 lg:flex">
          {menu.map((item) => {
            const hasChildren = item.children.length > 0
            const isOpen = openMenu === item.label

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose()
                  if (hasChildren) setOpenMenu(item.label)
                }}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  onFocus={() => hasChildren && setOpenMenu(item.label)}
                  aria-expanded={hasChildren ? isOpen : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-wider transition-colors ${
                    isOpen ? 'text-accent-text' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      className={`size-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {/* El panel se mantiene SIEMPRE montado y sólo se oculta con CSS.
                    Si se montara condicionalmente, los enlaces no existirían en el
                    HTML y el crawler no vería las landings de nicho — que es
                    justo lo que le pasa hoy al menú del WordPress. */}
                {hasChildren && (
                  <div
                    onMouseEnter={() => {
                      cancelClose()
                      setOpenMenu(item.label)
                    }}
                    onMouseLeave={scheduleClose}
                    className={`absolute left-0 top-full w-72 pt-2 transition duration-150 ${
                      isOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-1 opacity-0'
                    }`}
                  >
                    <ul className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-2xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            tabIndex={isOpen ? 0 : -1}
                            className="block rounded-lg px-4 py-3 text-sm leading-snug text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Se oculta por debajo de sm junto al resto de acciones: en móvil vive
              dentro del menú desplegado, donde hay sitio. */}
          <LanguageSwitch locale={locale} etiqueta={t.nav.idioma} className="hidden sm:flex" />

          <Link
            href={adminHref}
            aria-label={t.nav.panel}
            title={t.nav.panel}
            className="hidden size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Gauge className="size-4" />
          </Link>

          {/* Va directo a WhatsApp, no a la sección de contacto: es el canal
              por el que el cliente realmente responde, y así funciona igual
              desde cualquier página sin depender de un ancla del home. */}
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110 sm:inline-flex"
          >
            {t.nav.contactanos}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.nav.cerrarMenu : t.nav.abrirMenu}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 text-xs font-bold uppercase tracking-wider lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
            {t.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          data-lenis-prevent
          className="shell max-h-[calc(100svh-84px)] overflow-y-auto overscroll-contain border-t border-border pb-10 pt-6 lg:hidden"
        >
          {/* En móvil el botón del header está oculto por espacio, así que el
              contacto vive aquí: es donde WhatsApp más se usa. */}
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mb-6 flex items-center justify-between gap-4 bg-accent px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground"
          >
            {t.nav.contactanosWhatsapp}
            <ArrowUpRight className="size-4" />
          </a>

          <nav aria-label={t.nav.navMovil} className="flex flex-col">
            {menu.map((item) => (
              <div key={item.label} className="border-b border-border py-4">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block text-3xl text-foreground/85 transition-colors hover:text-accent-text"
                >
                  {item.label}
                </Link>
                {item.children.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-2.5 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

            <div className="mt-6 sm:hidden">
              <LanguageSwitch locale={locale} etiqueta={t.nav.idioma} className="w-fit" />
            </div>

            <Link
              href={adminHref}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-3 border border-border px-5 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              <Gauge className="size-4" />
              {t.nav.panel}
            </Link>
        </div>
      )}
    </header>
  )
}
