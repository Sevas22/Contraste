import type { Episode } from './content'

/**
 * Pieza de cabecera de cada nicho: vídeo si lo hay, imagen si no.
 *
 * Se indexa por SLUG y no por posición: si el cliente reordena los nichos desde
 * el panel, cada uno conserva su pieza. Antes se resolvía con
 * `images[i % images.length]`, así que bastaba mover uno de sitio para que se
 * cruzaran.
 *
 * Sobre las imágenes:
 *
 * - `bebidas-alcoholicas` es un fotograma real de la activación de Ron Viejo de
 *   Caldas, virado al naranja del nicho.
 * - Las otras tres son composiciones gráficas hechas con el color de cada
 *   nicho, no fotos. No hay material propio de esos sectores, y usar fotogramas
 *   del mismo vídeo habría dejado los banderines de un cliente de licores
 *   detrás de "Desarrollo Inmobiliario" y "Tecnología".
 *
 * Cuando lleguen fotos reales, se sustituye el archivo y ya: los nombres no
 * cambian.
 */
const IMAGENES: Record<string, string> = {
  'marketing-btl-para-bebidas-degustacion-y-experiencia': '/media/nichos/bebidas-alcoholicas.jpg',
  'marketing-btl-inmobiliario-mas-leads-y-ventas': '/media/nichos/desarrollo-inmobiliario.jpg',
  'marketing-btl-consumo-masivo-mas-trafico-y-ventas': '/media/nichos/consumo-masivo.jpg',
  'activaciones-btl-tecnologia-alto-impacto': '/media/nichos/tecnologia.jpg',
}

/** Reserva para un nicho creado desde el panel que aún no tenga pieza propia. */
const POR_DEFECTO = '/media/activacion-01.jpg'

/**
 * Vídeo fijado a mano para un nicho.
 *
 * Sirve para los casos en que el vídeo que toca NO es el de un episodio
 * asignado a ese nicho. Bebidas es justo eso: el WordPress viejo tenía ahí "De
 * cero a una vida con propósito", que en nuestros datos no cuelga de ningún
 * nicho.
 *
 * Lo que no esté aquí se resuelve solo con el episodio más reciente del nicho,
 * así que asignar un episodio desde el panel basta para que su vídeo aparezca.
 */
const VIDEOS_FIJADOS: Record<string, string> = {
  'marketing-btl-para-bebidas-degustacion-y-experiencia': '64dXCld4I8o',
}

export function nicheImage(slug: string): string {
  return IMAGENES[slug] ?? POR_DEFECTO
}

/**
 * Devuelve el vídeo de YouTube del nicho, o null si no hay ninguno.
 *
 * Orden: primero lo fijado a mano, y si no, el episodio publicado más reciente
 * de ese nicho que tenga vídeo. Los episodios llegan ya ordenados por fecha
 * descendente desde `getEpisodesByNiche`.
 */
export function nicheVideo(slug: string, episodes: Episode[] = []): string | null {
  const fijado = VIDEOS_FIJADOS[slug]
  if (fijado) return fijado

  return episodes.find((e) => e.youtubeId)?.youtubeId ?? null
}
