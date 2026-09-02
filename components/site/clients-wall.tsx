import Image from 'next/image'
import { clients, site } from '@/lib/site'
import { SectionLabel } from './brand-mark'
import { getDictionary, fill } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, type Locale } from '@/lib/i18n'

/**
 * Muro de marcas en carrusel continuo.
 *
 * Dos filas cruzadas en direcciones opuestas, como las marquesinas de texto del
 * resto del sitio. Se eligió movimiento y no rejilla porque una rejilla estática
 * de doce logos ocupa media pantalla y se lee como un anexo; en marquesina el
 * bloque es compacto y transmite volumen de clientes.
 *
 * Los logos van SUELTOS sobre el fondo oscuro, sin loseta. Antes iban dentro de
 * un recuadro blanco porque los archivos traían el fondo incrustado; ahora se
 * usan las versiones de `/clients/blanco/`, siluetas blancas con transparencia
 * real generadas a partir de los originales.
 *
 * Los doce archivos comparten lienzo (800×320) y están normalizados POR ÁREA:
 * una firma ancha como Vélez y un emblema cuadrado como Ron Viejo ocupan la
 * misma superficie de tinta. Normalizar por altura —lo evidente— dejaba las
 * firmas anchas como barras enormes y los emblemas como sellos diminutos.
 * Como el encuadre ya viene resuelto en el archivo, aquí basta con fijar la
 * altura: todos los elementos miden igual sin cálculos ni casos especiales.
 *
 * La animación es CSS pura, así que esto sigue siendo Server Component y
 * respeta `prefers-reduced-motion` desde globals.css.
 */

function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <Image
      src={logo}
      alt={name}
      width={800}
      height={320}
      /**
       * Sin `sizes`, Next sirve la variante de 1920px para una caja de 160:
       * doce logos pesando cada uno lo que una foto de portada. Aquí el tamaño
       * es fijo y conocido, así que se declara y se acabó.
       */
      sizes="(min-width: 1024px) 200px, 160px"
      /**
       * Altura explícita, no `h-auto`: con auto la caja mide 0 antes de cargar
       * y la carga diferida no llega a dispararse.
       *
       * Al 70% de opacidad las marcas acompañan sin competir con el titular;
       * en hover suben a opacidad plena, que es lo que hace que la fila se
       * sienta viva y no un pie de página decorativo.
       */
      className="h-16 w-auto shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100 lg:h-20"
    />
  )
}

export function ClientsWall({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale)
  // El track se duplica porque la animación desplaza -50%: así el bucle cierra
  // sin salto visible.
  const track = [...clients, ...clients]

  return (
    <section className="overflow-hidden border-t border-border py-20 lg:py-28">
      <div className="shell">
        <div className="movil-centrado flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>{t.clientes.etiqueta}</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(1.8rem,3.6vw,3rem)]">
              {t.clientes.titular.a}
              <br />
              <span className="text-accent">{t.clientes.titular.b}</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-right">
            {fill(t.clientes.resumen, { marcas: site.brandsManaged, anios: site.yearsOfExperience })}
          </p>
        </div>
      </div>

      {/* Filas a sangre completa. Los bordes se desvanecen con una máscara: sin
          ella el logo aparece y desaparece de golpe contra el corte del
          contenedor, que es justo lo que delata que hay un bucle detrás. */}
      <div
        className="group mt-14 flex flex-col gap-4 lg:gap-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="flex overflow-hidden">
          <ul className="animate-marquee flex shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused] lg:gap-8 lg:pr-8">
            {track.map((client, i) => (
              <li key={`a-${i}`} className="flex" aria-hidden={i >= clients.length}>
                <Logo name={client.name} logo={client.logo} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex overflow-hidden">
          <ul
            aria-hidden="true"
            className="animate-marquee-reverse flex shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused] lg:gap-8 lg:pr-8"
          >
            {[...track].reverse().map((client, i) => (
              <li key={`b-${i}`} className="flex">
                <Logo name={client.name} logo={client.logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
