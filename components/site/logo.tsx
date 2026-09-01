import Image from 'next/image'
import Link from 'next/link'

/**
 * Wordmark de Contraste.
 *
 * El archivo es 1000×136: el wordmark recortado a su caja de tinta. Antes era
 * un PNG cuadrado de 500×500 con el 87% de lienzo transparente alrededor, y
 * como el componente declaraba una proporción inventada (5.2:1) el navegador
 * reservaba 32px de alto y luego pintaba 150 — la cabecera acababa midiendo
 * 190px en vez de 84 y había salto de maquetación en cada carga.
 *
 * `priority` sólo donde toca: el logo de la cabecera entra en el primer
 * pantallazo, el del pie no. Marcar los dos le quitaba ancho de banda a la
 * imagen que de verdad decide el LCP.
 */
const RATIO = 1000 / 136

export function Logo({
  className = '',
  width = 168,
  priority = false,
  href = '/',
}: {
  className?: string
  width?: number
  /** Sólo para el logo que se ve sin hacer scroll. */
  priority?: boolean
  /** Destino del logo: en la versión inglesa apunta a /en, no a la raíz. */
  href?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Contraste — inicio"
    >
      <Image
        src="/brand/logo-contraste.png"
        alt="Contraste Agencia"
        width={width}
        height={Math.round(width / RATIO)}
        priority={priority}
        sizes={`${width}px`}
        className="h-auto"
        style={{ width }}
      />
    </Link>
  )
}
