/**
 * Mural de marca: el wordmark en contorno, repetido y desfasado por filas,
 * como fondo de sección.
 *
 * El desfase alterno es lo que lo hace leer como un muro pintado y no como
 * una lista de texto centrado. Va detrás del contenido, sin capturar el
 * puntero y oculto para lectores de pantalla: es textura, no información.
 *
 * Tres cosas que estaban mal y se corrigieron midiendo:
 *
 * 1. Cada fila medía justo lo que la sección (1885 px en una pantalla de 1900)
 *    pero se desplazaba hasta −603 px, así que dejaba una franja desnuda de
 *    600 px en el borde derecho. Ahora la fila se repite hasta cubrir más del
 *    doble del ancho, y el desfase nunca puede descubrir el canto.
 *
 * 2. La tipografía iba a 11vw — 209 px en esa misma pantalla — y solo cabían
 *    dos palabras: se leía como letras sueltas, no como un patrón. A 7vw el
 *    wordmark se reconoce y el muro se lee como muro.
 *
 * 3. Las filas se centraban verticalmente y cubrían 770 de 1085 px, dejando
 *    bandas vacías arriba y abajo. Ahora fluyen desde arriba y lo que sobra se
 *    recorta, que es como se comporta un patrón de verdad.
 *
 * La opacidad se mantiene baja a propósito. El texto que va encima necesita
 * conservar su contraste AA contra el fondo, y el contorno ya aporta suficiente
 * ruido visual a poca intensidad.
 */
export function WordmarkMural({
  word = 'Contraste',
  /**
   * Filas a pintar. Conviene pasarse de largo: lo que sobra se recorta, y
   * quedarse corto deja la parte de abajo desnuda.
   */
  rows = 10,
  className = '',
  opacity = 0.07,
}: {
  word?: string
  rows?: number
  className?: string
  opacity?: number
}) {
  // Suficientes repeticiones para que la fila mida más del doble que la
  // sección: así el desfase de la derecha nunca descubre el borde.
  const linea = Array.from({ length: 8 }, () => word).join(' ')

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
    >
      <span
        className="absolute inset-0 flex flex-col"
        style={{
          opacity,
          /* El muro se desvanece hacia abajo. En pantallas estrechas la
             tipografía es pequeña y las filas no llegan al fondo de la sección;
             sin este fundido se vería dónde termina el patrón. Con él, la
             cobertura parcial parece intencionada. */
          maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
        }}
      >
        {Array.from({ length: rows }).map((_, i) => (
          <span
            key={i}
            className="display display-outline shrink-0 whitespace-nowrap text-[7vw] leading-[0.92]"
            // Filas impares desplazadas: rompe la rejilla y da aspecto de muro.
            // El desfase es pequeño porque la fila ya es ancha; con los −32%
            // de antes se perdía media sección.
            style={{ transform: `translateX(${i % 2 === 0 ? -4 : -13}%)` }}
          >
            {linea}
          </span>
        ))}
      </span>
    </span>
  )
}
