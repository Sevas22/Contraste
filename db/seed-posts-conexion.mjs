/**
 * Carga los cinco artículos de `db/posts-conexion.mjs`.
 *
 *   node db/seed-posts-conexion.mjs                     → revisa, no escribe nada
 *   node db/seed-posts-conexion.mjs --json              → los deja en content/posts.json
 *                                                         (para verlos con CONTENT_SOURCE=json)
 *   node db/seed-posts-conexion.mjs --escribir          → Neon, como BORRADOR
 *   node db/seed-posts-conexion.mjs --escribir --publicar → Neon, publicados con fecha de hoy
 *
 * Borrador por defecto a propósito: Neon es la base que lee producción, y los
 * artículos usan enlaces en el cuerpo (`[texto](url)`), que el código
 * desplegado antes del 2026-09-15 no sabe pintar. Publicarlos antes de
 * desplegar ese cambio dejaría la sintaxis a la vista.
 *
 * Sólo toca estos cinco slugs. No pisa ningún otro post.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'
import { posts } from './posts-conexion.mjs'

async function cargarEntorno() {
  try {
    const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
    for (const linea of raw.split('\n')) {
      const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    /* sin .env.local */
  }
}

const hoy = new Date().toISOString().slice(0, 10)
const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length

/** Las mismas reglas que `auditPost` en lib/content.ts, para no descubrir fallos en el panel. */
function revisar(p) {
  const texto = p.body.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1')
  const fallos = []
  if (p.title.length < 30 || p.title.length > 65) fallos.push(`título de ${p.title.length} caracteres`)
  if (p.metaDescription.length < 120 || p.metaDescription.length > 160)
    fallos.push(`meta de ${p.metaDescription.length} caracteres`)
  if (p.excerpt.length < 80) fallos.push('resumen corto')
  if (palabras(texto) < 600) fallos.push(`${palabras(texto)} palabras`)
  if ((p.body.match(/^##\s+/gm) || []).length < 3) fallos.push('menos de 3 subtítulos')
  if (p.faqs.length < 3) fallos.push('menos de 3 FAQs')
  if (p.keywords.length < 3) fallos.push('menos de 3 keywords')
  if (!p.coverUrl) fallos.push('sin portada')
  return { texto, fallos }
}

async function main() {
  await cargarEntorno()
  const escribir = process.argv.includes('--escribir')
  const publicar = process.argv.includes('--publicar')
  const aJson = process.argv.includes('--json')

  const nichos = JSON.parse(await readFile(path.join(process.cwd(), 'content', 'niches.json'), 'utf8'))
  const rutasValidas = new Set([
    '/',
    '/v-podcast',
    '/blog',
    '/v-podcast/de-cero-a-una-vida-con-proposito',
    '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
    '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
    '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
    '/blog/sala-de-ventas-por-que-la-primera-visita-decide-el-cierre',
    ...nichos.map((n) => `/${n.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ])

  let hayFallos = false
  for (const p of posts) {
    const { texto, fallos } = revisar(p)
    const enlaces = [...p.body.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map((m) => m[2])
    const internosRotos = enlaces.filter((u) => u.startsWith('/') && !rutasValidas.has(u.split('#')[0]))
    if (internosRotos.length) fallos.push(`enlaces internos rotos: ${internosRotos.join(', ')}`)
    const externos = enlaces.filter((u) => u.startsWith('http')).length
    hayFallos ||= fallos.length > 0

    console.log(
      `${fallos.length ? '✗' : '✓'} ${p.title}\n` +
        `    ${palabras(texto)} palabras · ${(p.body.match(/^##\s+/gm) || []).length} subtítulos · ${p.faqs.length} FAQs · ` +
        `${enlaces.length - externos} enlaces internos · ${externos} externos · título ${p.title.length} · meta ${p.metaDescription.length}` +
        (fallos.length ? `\n    → ${fallos.join(' · ')}` : ''),
    )
  }

  if (hayFallos) {
    console.error('\n✗ Hay artículos que no pasan la revisión. No se escribe nada.\n')
    process.exit(1)
  }

  const estado = publicar ? 'published' : 'draft'
  const filas = posts.map((p) => ({
    slug: p.slug,
    status: estado,
    title: p.title,
    excerpt: p.excerpt,
    metaDescription: p.metaDescription,
    body: p.body,
    coverUrl: p.coverUrl,
    author: 'Contraste Agencia',
    location: p.location,
    niches: p.niches,
    keywords: p.keywords,
    faqs: p.faqs,
    publishedAt: hoy,
    updatedAt: hoy,
  }))

  if (aJson) {
    const archivo = path.join(process.cwd(), 'content', 'posts.json')
    const actuales = JSON.parse(await readFile(archivo, 'utf8'))
    const slugs = new Set(filas.map((f) => f.slug))
    const resultado = [...actuales.filter((p) => !slugs.has(p.slug)), ...filas.map((f) => ({ ...f, status: 'published' }))]
    await writeFile(archivo, JSON.stringify(resultado, null, 2) + '\n', 'utf8')
    console.log(`\n✓ ${filas.length} artículos en content/posts.json (publicados, sólo para verlos en local)`)
  }

  if (!escribir) {
    if (!aJson) console.log('\nNo se escribió nada. Usa --escribir (borrador) o --escribir --publicar.')
    return
  }

  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL.\n')
    process.exit(1)
  }
  const sql = neon(process.env.DATABASE_URL)

  for (const f of filas) {
    await sql`
      insert into posts (slug, status, title, excerpt, meta_description, body, cover_url,
                         author, location, keywords, faqs, published_at, updated_at)
      values (${f.slug}, ${f.status}, ${f.title}, ${f.excerpt}, ${f.metaDescription}, ${f.body},
              ${f.coverUrl}, ${f.author}, ${f.location}, ${f.keywords},
              ${JSON.stringify(f.faqs)}::jsonb, ${f.publishedAt}, ${f.updatedAt})
      on conflict (slug) do update set
        status = excluded.status, title = excluded.title, excerpt = excluded.excerpt,
        meta_description = excluded.meta_description, body = excluded.body,
        cover_url = excluded.cover_url, location = excluded.location,
        keywords = excluded.keywords, faqs = excluded.faqs,
        published_at = excluded.published_at, updated_at = excluded.updated_at
    `
    await sql`delete from post_niches where post_slug = ${f.slug}`
    for (const n of f.niches) {
      await sql`insert into post_niches (post_slug, niche_id) values (${f.slug}, ${n}) on conflict do nothing`
    }
  }

  console.log(
    `\n✓ ${filas.length} artículos en Neon como ${publicar ? 'PUBLICADOS' : 'BORRADOR'}.` +
      (publicar
        ? ' Salen en el sitio al redesplegar o al guardar cualquier cosa en el panel.'
        : ' Se revisan y publican desde el panel → Blog.'),
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
