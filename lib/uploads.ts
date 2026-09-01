import { promises as fs } from 'node:fs'
import path from 'node:path'
import { put, del } from '@vercel/blob'

/**
 * Subida de archivos.
 *
 * Con BLOB_READ_WRITE_TOKEN va a Vercel Blob, que es lo que se usa en producción
 * porque en Vercel el sistema de archivos es de sólo lectura.
 * Sin token cae a `public/media/`, como respaldo de desarrollo.
 */

export const MEDIA_LIMITS = {
  audio: {
    maxBytes: 200 * 1024 * 1024,
    types: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-m4a', 'audio/mp4'],
  },
  video: {
    maxBytes: 500 * 1024 * 1024,
    types: ['video/mp4', 'video/webm', 'video/quicktime'],
  },
  image: {
    maxBytes: 8 * 1024 * 1024,
    types: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
} as const

export type UploadKind = keyof typeof MEDIA_LIMITS

const EXTENSIONS: Record<string, string> = {
  'audio/mpeg': '.mp3',
  'audio/mp3': '.mp3',
  'audio/wav': '.wav',
  'audio/x-m4a': '.m4a',
  'audio/mp4': '.m4a',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
}

const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function validate(file: File, kind: UploadKind): string {
  const limit = MEDIA_LIMITS[kind]
  if (!(limit.types as readonly string[]).includes(file.type)) {
    throw new Error(
      `Tipo de archivo no permitido para ${kind}: "${file.type || 'desconocido'}". Aceptados: ${limit.types.join(', ')}`,
    )
  }
  if (file.size > limit.maxBytes) {
    throw new Error(
      `El archivo pesa ${formatBytes(file.size)} y el máximo para ${kind} es ${formatBytes(limit.maxBytes)}.`,
    )
  }
  return EXTENSIONS[file.type] ?? path.extname(file.name) ?? ''
}

/**
 * Guarda el archivo y devuelve su URL pública, o null si no venía archivo.
 * `folder` es un prefijo lógico ('podcast' o 'blog').
 */
export async function saveUpload(
  file: File | null,
  kind: UploadKind,
  folder: string,
  baseName: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null

  const ext = validate(file, kind)
  // Sufijo de tiempo: evita servir la versión anterior desde caché
  const objectPath = `${folder}/${baseName}-${Date.now().toString(36)}${ext}`

  if (blobEnabled) {
    // addRandomSuffix: false porque el nombre ya lleva su propio sufijo de tiempo
    const blob = await put(objectPath, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })
    return blob.url
  }

  const dir = path.join(process.cwd(), 'public', 'media', folder)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(
    path.join(process.cwd(), 'public', 'media', objectPath),
    Buffer.from(await file.arrayBuffer()),
  )
  return `/media/${objectPath}`
}

/** Borra un archivo subido. Silencioso si ya no existe. */
export async function removeUpload(publicUrl: string): Promise<void> {
  if (!publicUrl) return

  if (publicUrl.startsWith('http')) {
    // Sólo se borran los blobs propios; una URL externa se ignora
    if (!blobEnabled || !publicUrl.includes('.blob.vercel-storage.com')) return
    try {
      await del(publicUrl)
    } catch {
      // ya no existe: no debe interrumpir el guardado
    }
    return
  }

  if (!publicUrl.startsWith('/media/')) return
  try {
    await fs.unlink(path.join(process.cwd(), 'public', publicUrl))
  } catch {
    // ya no está: no debe interrumpir el guardado
  }
}
