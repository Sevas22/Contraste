'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveUpload, removeUpload } from '@/lib/uploads'
import {
  getNiches,
  getPost,
  getPosts,
  savePost,
  deletePostBySlug,
  type Faq,
  type Post,
  CONTENT_TAG,
} from '@/lib/content'

function parseLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

/** "¿Pregunta? :: Respuesta" */
function parseFaqs(value: string): Faq[] {
  return parseLines(value)
    .map((line) => {
      const [q, ...rest] = line.split('::')
      const a = rest.join('::').trim()
      return q && a ? { q: q.trim(), a } : null
    })
    .filter((f): f is Faq => Boolean(f))
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim()
}

async function nicheSlugsFor(ids: string[]): Promise<string[]> {
  const niches = await getNiches()
  return [...new Set(ids)]
    .map((id) => niches.find((n) => n.id === id)?.slug)
    .filter((slug): slug is string => Boolean(slug))
}


/**
 * Arma el objeto de traducción a partir de los campos `en_*` del formulario.
 *
 * Sólo entra lo que tenga contenido: un campo vacío NO se guarda, para que la
 * superposición lo deje caer al español en vez de publicar un titular en blanco.
 * Si no queda nada, devuelve el objeto sin la clave del idioma — así una ficha
 * sin traducir no arrastra basura en la base.
 */
function readTranslations(
  formData: FormData,
  previas: Record<string, Record<string, unknown>> | undefined,
  campos: { texto: string[]; lineas?: string[]; faqs?: string[] },
): Record<string, Record<string, unknown>> {
  const en: Record<string, unknown> = {}

  for (const campo of campos.texto) {
    const v = String(formData.get(`en_${campo}`) ?? '').trim()
    if (v) en[campo] = v
  }
  for (const campo of campos.lineas ?? []) {
    const v = parseLines(String(formData.get(`en_${campo}`) ?? ''))
    if (v.length) en[campo] = v
  }
  for (const campo of campos.faqs ?? []) {
    const v = parseFaqs(String(formData.get(`en_${campo}`) ?? ''))
    if (v.length) en[campo] = v
  }

  const resto = { ...(previas ?? {}) }
  if (Object.keys(en).length) resto.en = en
  else delete resto.en
  return resto
}

export async function createPost(formData: FormData) {
  const title = str(formData, 'title')
  if (!title) throw new Error('El título es obligatorio')

  const posts = await getPosts()
  const slug = slugify(title)
  if (posts.some((p) => p.slug === slug)) {
    throw new Error('Ya existe un post con ese título')
  }

  const today = new Date().toISOString().slice(0, 10)
  const post: Post = {
    slug,
    status: 'draft',
    title,
    excerpt: '',
    metaDescription: '',
    body: '',
    coverUrl: '',
    author: 'Contraste Agencia',
    location: str(formData, 'location'),
    niches: [],
    keywords: [],
    faqs: [],
    publishedAt: today,
    updatedAt: today,
  }

  await savePost(post)
  revalidatePath('/admin', 'layout')
  redirect(`/admin/blog/${slug}`)
}

export async function updatePost(formData: FormData) {
  const originalSlug = str(formData, 'originalSlug')

  const previous = await getPost(originalSlug)
  if (!previous) throw new Error(`Post no encontrado: ${originalSlug}`)
  const niches = formData.getAll('niches').map(String).filter(Boolean)

  const uploadedCover = await saveUpload(
    formData.get('coverFile') as File | null,
    'image',
    'blog',
    originalSlug,
  )
  if (uploadedCover && previous.coverUrl) await removeUpload(previous.coverUrl)

  const title = str(formData, 'title')
  const updated: Post = {
    ...previous,
    slug: str(formData, 'slug') || slugify(title) || originalSlug,
    status: str(formData, 'status') === 'published' ? 'published' : 'draft',
    title,
    excerpt: str(formData, 'excerpt'),
    metaDescription: str(formData, 'metaDescription'),
    body: String(formData.get('body') ?? ''),
    coverUrl: uploadedCover ?? str(formData, 'coverUrl'),
    author: str(formData, 'author') || previous.author,
    location: str(formData, 'location'),
    niches,
    keywords: parseLines(str(formData, 'keywords')),
    faqs: parseFaqs(str(formData, 'faqs')),
    publishedAt: str(formData, 'publishedAt') || previous.publishedAt,
    updatedAt: new Date().toISOString().slice(0, 10),
    translations: readTranslations(formData, previous.translations, {
      texto: ['title', 'excerpt', 'metaDescription', 'body'],
      lineas: ['keywords'],
      faqs: ['faqs'],
    }),
  }

  await savePost(updated, originalSlug)

  updateTag(CONTENT_TAG)

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${originalSlug}`)
  revalidatePath(`/blog/${updated.slug}`)
  for (const nicheSlug of await nicheSlugsFor([...previous.niches, ...niches])) {
    revalidatePath(`/${nicheSlug}`)
  }
  revalidatePath('/admin', 'layout')

  redirect(`/admin/blog/${updated.slug}?guardado=1`)
}

export async function deletePost(formData: FormData) {
  const slug = str(formData, 'slug')

  const target = await getPost(slug)
  if (target?.coverUrl) await removeUpload(target.coverUrl)
  await deletePostBySlug(slug)

  updateTag(CONTENT_TAG)

  revalidatePath('/')
  revalidatePath('/blog')
  for (const nicheSlug of await nicheSlugsFor(target?.niches ?? [])) {
    revalidatePath(`/${nicheSlug}`)
  }
  revalidatePath('/admin', 'layout')
  redirect('/admin/blog')
}
