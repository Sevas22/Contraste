'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localePath, stripLocale, type Locale } from '@/lib/i18n'

/**
 * Conmutador ES / EN.
 *
 * Lleva a la MISMA página en el otro idioma, no al home: se calcula desde la
 * ruta actual. Mandar siempre al inicio es el error clásico de los selectores
 * de idioma — el visitante pierde el artículo que estaba leyendo y casi nunca
 * vuelve a buscarlo.
 *
 * Son dos `<Link>` reales y no un botón con JavaScript, para que Google vea el
 * enlace a la otra versión y lo relacione con los `hreflang` de la cabecera.
 * `hrefLang` en cada uno se lo dice también al navegador.
 */
export function LanguageSwitch({
  locale,
  etiqueta,
  className = '',
}: {
  locale: Locale
  /** Texto accesible del grupo, ya traducido. */
  etiqueta: string
  className?: string
}) {
  const pathname = usePathname() || '/'
  const base = stripLocale(pathname)

  const opciones: { code: Locale; label: string; hrefLang: string }[] = [
    { code: 'es', label: 'ES', hrefLang: 'es-CO' },
    { code: 'en', label: 'EN', hrefLang: 'en' },
  ]

  return (
    <div
      role="group"
      aria-label={etiqueta}
      className={`flex items-center rounded-full border border-border ${className}`}
    >
      {opciones.map(({ code, label, hrefLang }) => {
        const activo = code === locale
        return (
          <Link
            key={code}
            href={localePath(code, base)}
            hrefLang={hrefLang}
            lang={code}
            aria-current={activo ? 'true' : undefined}
            className={`px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition first:rounded-l-full last:rounded-r-full ${
              activo
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
