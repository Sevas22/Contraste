'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveUpload, removeUpload } from '@/lib/uploads'
import {
  getInstagramPosts,
  saveInstagramPost,
  deleteInstagramPost,
  type InstagramPost,
  CONTENT_TAG,
} from '@/lib/content'

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim()
}

/** Extrae el código del post de cualquier formato de enlace de Instagram. */
function parsePermalink(raw: string): { permalink: string; id: string } | null {
  const match = raw.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/)
  if (!match) return null
  const code = match[1]
  // Se normaliza a /p/: es la forma canónica y funciona también para reels
  return { permalink: `https://www.instagram.com/p/${code}/`, id: code }
}

export async function addInstagramPost(formData: FormData) {
  const parsed = parsePermalink(str(formData, 'permalink'))
  if (!parsed) {
    redirect('/admin/instagram?error=enlace')
  }

  const file = formData.get('image') as File | null
  if (!file || file.size === 0) {
    redirect('/admin/instagram?error=imagen')
  }

  const imageUrl = await saveUpload(file, 'image', 'instagram', parsed.id)
  if (!imageUrl) redirect('/admin/instagram?error=imagen')

  // El clip es opcional: sin él la publicación se muestra como imagen fija.
  // La imagen sigue siendo obligatoria porque hace de póster del video.
  const videoUrl = await saveUpload(
    formData.get('video') as File | null,
    'video',
    'instagram',
    `${parsed.id}-clip`,
  )

  const existing = await getInstagramPosts()

  const post: InstagramPost = {
    id: parsed.id,
    permalink: parsed.permalink,
    imageUrl,
    videoUrl: videoUrl ?? '',
    caption: str(formData, 'caption'),
    mediaType: (['image', 'video', 'carousel'] as const).includes(
      str(formData, 'mediaType') as never,
    )
      ? (str(formData, 'mediaType') as InstagramPost['mediaType'])
      : 'image',
    postedAt: str(formData, 'postedAt'),
    order: existing.length,
    visible: true,
  }

  await saveInstagramPost(post)
  updateTag(CONTENT_TAG)
  revalidatePath('/')
  revalidatePath('/admin/instagram')
  redirect('/admin/instagram?guardado=1')
}

export async function toggleInstagramPost(formData: FormData) {
  const id = str(formData, 'id')
  const post = (await getInstagramPosts()).find((p) => p.id === id)
  if (!post) return

  await saveInstagramPost({ ...post, visible: !post.visible })
  updateTag(CONTENT_TAG)
  revalidatePath('/')
  revalidatePath('/admin/instagram')
}

/** Mueve un post una posición. `dir` es -1 (arriba) o 1 (abajo). */
export async function moveInstagramPost(formData: FormData) {
  const id = str(formData, 'id')
  const dir = Number(formData.get('dir')) === 1 ? 1 : -1

  const posts = [...(await getInstagramPosts())].sort((a, b) => a.order - b.order)
  const index = posts.findIndex((p) => p.id === id)
  const target = index + dir
  if (index === -1 || target < 0 || target >= posts.length) return

  ;[posts[index], posts[target]] = [posts[target], posts[index]]

  // Se reescribe el orden completo: evita huecos y empates tras varios movimientos
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].order !== i) await saveInstagramPost({ ...posts[i], order: i })
  }

  updateTag(CONTENT_TAG)

  revalidatePath('/')
  revalidatePath('/admin/instagram')
}

export async function removeInstagramPostAction(formData: FormData) {
  const id = str(formData, 'id')
  const post = (await getInstagramPosts()).find((p) => p.id === id)
  if (post?.imageUrl) await removeUpload(post.imageUrl)
  if (post?.videoUrl) await removeUpload(post.videoUrl)

  await deleteInstagramPost(id)
  updateTag(CONTENT_TAG)
  revalidatePath('/')
  revalidatePath('/admin/instagram')
}
