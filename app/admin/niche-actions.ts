'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getNicheById, saveNiche, CONTENT_TAG, type Faq, type Niche } from '@/lib/content'

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

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim()
}

const TEXTO_EN = ['headline', 'subheadline', 'description', 'intro', 'body'] as const
const LINEAS_EN = ['keywords', 'capabilities'] as const

/**
 * Guarda una landing de nicho.
 *
 * A diferencia de posts y episodios, las traducciones se MEZCLAN con las que
 * ya había en vez de reemplazarse: el inglés del nicho lleva también `name` y
 * `menuLabel`, que no están en este formulario porque son del menú. Reemplazar
 * el objeto entero los habría borrado al primer guardado.
 */
export async function updateNiche(formData: FormData) {
  // Las Server Actions son endpoints públicos: el layout del panel protege la
  // página, no la acción. Sin esto cualquiera podría reescribir una landing.
  if (!(await getSession())) throw new Error('Sesión no válida')

  const id = str(formData, 'id')
  const previous = await getNicheById(id)
  if (!previous) throw new Error(`Nicho no encontrado: ${id}`)

  const enPrevio = { ...(previous.translations?.en ?? {}) }
  for (const campo of TEXTO_EN) {
    const v = String(formData.get(`en_${campo}`) ?? '').trim()
    if (v) enPrevio[campo] = v
    else delete enPrevio[campo]
  }
  for (const campo of LINEAS_EN) {
    const v = parseLines(String(formData.get(`en_${campo}`) ?? ''))
    if (v.length) enPrevio[campo] = v
    else delete enPrevio[campo]
  }
  const enFaqs = parseFaqs(String(formData.get('en_faqs') ?? ''))
  if (enFaqs.length) enPrevio.faqs = enFaqs
  else delete enPrevio.faqs

  const translations = { ...(previous.translations ?? {}) }
  if (Object.keys(enPrevio).length) translations.en = enPrevio
  else delete translations.en

  const updated: Niche = {
    ...previous,
    headline: str(formData, 'headline') || previous.headline,
    subheadline: str(formData, 'subheadline'),
    description: str(formData, 'description'),
    intro: str(formData, 'intro'),
    body: String(formData.get('body') ?? '').trim(),
    keywords: parseLines(str(formData, 'keywords')),
    capabilities: parseLines(str(formData, 'capabilities')),
    faqs: parseFaqs(str(formData, 'faqs')),
    translations,
    updatedAt: new Date().toISOString().slice(0, 10),
  }

  await saveNiche(updated)

  updateTag(CONTENT_TAG)
  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath(`/${previous.slug}`)
  revalidatePath(`/en/${previous.slug}`)
  revalidatePath('/llms.txt')
  revalidatePath('/admin', 'layout')

  redirect(`/admin/nichos/${id}?guardado=1`)
}
