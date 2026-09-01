/**
 * La "O" del logo, aislada como marca de sección.
 *
 * Un círculo con la mitad derecha sólida: es el concepto de contraste hecho
 * forma, y la única parte del wordmark que funciona sola. Se reconstruyó
 * midiendo los píxeles de `public/brand/logo-contraste.png`, no a ojo.
 *
 * Usa `currentColor`, así que hereda el color de donde se ponga.
 */
export function BrandMark({ className = 'size-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.6" stroke="currentColor" strokeWidth="2.4" />
      <path d="M12 1.4a10.6 10.6 0 0 1 0 21.2z" fill="currentColor" />
    </svg>
  )
}

/**
 * Etiqueta de sección: la marca + el texto en mayúsculas espaciadas.
 * Reemplaza al `<SectionLabel>` suelto para que cada bloque del sitio
 * arranque con el mismo gesto de marca.
 */
export function SectionLabel({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${className}`} style={style}>
      <BrandMark className="size-3 shrink-0" />
      {children}
    </p>
  )
}
