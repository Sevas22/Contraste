import { put } from '@vercel/blob'
import { saveInstagramPost, getInstagramPosts, type InstagramPost } from './content'

/**
 * Sincronización con la Instagram Graph API.
 *
 * Requiere dos variables de entorno:
 *   IG_ACCESS_TOKEN  token de larga duración (caduca a los 60 días)
 *   IG_USER_ID       id de la cuenta de Instagram Business
 *
 * Para obtenerlos: cuenta de Instagram Business o Creator → vinculada a una
 * página de Facebook → app en Meta for Developers con el producto
 * "Instagram Graph API" → permisos instagram_basic + pages_show_list.
 *
 * Mientras no existan, `isInstagramSyncEnabled` es false y el feed se gestiona
 * a mano desde el panel.
 */

const API = 'https://graph.instagram.com'

export const isInstagramSyncEnabled = Boolean(
  process.env.IG_ACCESS_TOKEN && process.env.IG_USER_ID,
)

type ApiMedia = {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

function toMediaType(apiType: ApiMedia['media_type']): InstagramPost['mediaType'] {
  if (apiType === 'VIDEO') return 'video'
  if (apiType === 'CAROUSEL_ALBUM') return 'carousel'
  return 'image'
}

/**
 * Copia la imagen a nuestro almacenamiento.
 * Las URLs que devuelve Instagram llevan firma y caducan en días: guardarlas
 * tal cual dejaría el feed roto en una semana.
 */
async function mirrorImage(url: string, id: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`No se pudo descargar la imagen ${id}: ${response.status}`)

  const blob = await response.blob()
  const stored = await put(`instagram/${id}.jpg`, blob, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: false,
  })
  return stored.url
}

/** Trae las últimas publicaciones y las guarda. Devuelve cuántas se sincronizaron. */
export async function syncInstagram(limit = 12): Promise<number> {
  const token = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID
  if (!token || !userId) {
    throw new Error('Faltan IG_ACCESS_TOKEN e IG_USER_ID en el entorno.')
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  const response = await fetch(
    `${API}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Instagram Graph API respondió ${response.status}: ${body.slice(0, 200)}`)
  }

  const { data } = (await response.json()) as { data: ApiMedia[] }
  const existing = await getInstagramPosts()

  let synced = 0
  for (const [index, media] of data.entries()) {
    // Los videos no traen media_url usable como imagen: se usa la miniatura
    const source = media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url
    if (!source) continue

    const previous = existing.find((p) => p.id === media.id)

    await saveInstagramPost({
      id: media.id,
      permalink: media.permalink,
      // Si ya estaba, se conserva la imagen guardada en vez de volver a bajarla
      imageUrl: previous?.imageUrl ?? (await mirrorImage(source, media.id)),
      // La Graph API no entrega el archivo de video, sólo la miniatura: el clip
      // se sube a mano desde el panel si se quiere reproducir en el sitio.
      videoUrl: previous?.videoUrl ?? '',
      caption: media.caption ?? '',
      mediaType: toMediaType(media.media_type),
      postedAt: media.timestamp.slice(0, 10),
      order: index,
      // Se respeta si alguien lo ocultó a mano
      visible: previous?.visible ?? true,
    })
    synced++
  }

  return synced
}
