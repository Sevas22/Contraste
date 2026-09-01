import { BrandMark } from './brand-mark'

/**
 * Sello de texto circular en rotación.
 *
 * Técnica: un `<textPath>` sobre una circunferencia SVG, rotado con una
 * animación CSS. Es SVG puro, así que no necesita JavaScript, escala sin
 * pixelarse y sigue siendo Server Component.
 *
 * El texto se ajusta a UNA vuelta exacta con `textLength`: SVG reparte el
 * espacio entre letras hasta cubrir justo la circunferencia. Sin eso, un texto
 * más largo que el perímetro da más de una vuelta y la cola se monta sobre el
 * principio; uno más corto deja un hueco al girar. Así funciona con cualquier
 * texto sin tener que medirlo a mano.
 *
 * Va con `aria-hidden` porque es un gesto gráfico: el mensaje real ya está en
 * el titular de la sección.
 */
export function CircularText({
  text = 'Contraste · Marketing experiencial · ',
  className = '',
  duration = 22,
  reverse = false,
}: {
  text?: string
  className?: string
  /** Segundos por vuelta. Más lento se lee mejor y marea menos. */
  duration?: number
  reverse?: boolean
}) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 300"
        aria-hidden="true"
        focusable="false"
        className="size-full"
        style={{
          animation: `spin ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        <defs>
          {/* Circunferencia de radio 120 centrada en 150,150 */}
          <path
            id="sello-contraste"
            fill="none"
            d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
          />
        </defs>
        <text fill="currentColor" className="font-mono uppercase" style={{ fontSize: '19px', fontWeight: 600 }}>
          {/* 2πr con r = 120 → 754. Es el perímetro exacto del path de arriba. */}
          <textPath
            href="#sello-contraste"
            startOffset="0%"
            textLength={754}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>

      {/* La marca queda quieta en el centro mientras el aro gira */}
      <BrandMark className="absolute size-[22%]" />
    </span>
  )
}
