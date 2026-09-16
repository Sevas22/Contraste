/**
 * Carga el contenido de los nichos desde `content/niches.json` a Postgres.
 *
 *   node db/seed-niches.mjs            → muestra lo que cambiaría, sin escribir
 *   node db/seed-niches.mjs --escribir → aplica los cambios
 *
 * Existe aparte de `migrate.mjs --seed` porque aquel pisa TAMBIÉN episodios y
 * posts con lo que haya en los JSON, y eso ya devolvió un post publicado a
 * borrador. Este sólo toca las cuatro filas de `niches`, y sólo los campos de
 * contenido: el `slug` (URL heredada) y el `id` no se tocan nunca.
 *
 * Las traducciones se MEZCLAN: se conserva lo que ya hubiera en inglés y sólo
 * se reemplazan los campos que trae el JSON.
 *
 * Aplica antes la migración 0005 (columna `body`), que es idempotente.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

async function cargarEntorno() {
  try {
    const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
    for (const linea of raw.split('\n')) {
      const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    /* sin .env.local: se usan las variables del entorno */
  }
}

const CAMPOS = ['description', 'intro', 'body', 'keywords', 'faqs']

async function main() {
  await cargarEntorno()
  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL.\n')
    process.exit(1)
  }
  const escribir = process.argv.includes('--escribir')
  const sql = neon(process.env.DATABASE_URL)

  const nichos = JSON.parse(await readFile(path.join(process.cwd(), 'content', 'niches.json'), 'utf8'))

  if (escribir) {
    await sql`alter table niches add column if not exists body text not null default ''`
    await sql`alter table niches add column if not exists updated_at date not null default current_date`
  }

  const filas = await sql`select * from niches`

  for (const n of nichos) {
    const fila = filas.find((f) => f.id === n.id)
    if (!fila) {
      console.log(`· ${n.id}: no existe en la base, se omite`)
      continue
    }

    const cambios = CAMPOS.filter((c) => JSON.stringify(fila[c] ?? null) !== JSON.stringify(n[c] ?? null))
    const previas = fila.translations ?? {}
    const traducciones = { ...previas }
    for (const [idioma, campos] of Object.entries(n.translations ?? {})) {
      traducciones[idioma] = { ...(previas[idioma] ?? {}), ...campos }
    }
    const cambianTraducciones = JSON.stringify(previas) !== JSON.stringify(traducciones)

    console.log(
      `· ${n.id}: ${cambios.length ? cambios.join(', ') : 'sin cambios en español'}${cambianTraducciones ? ' + traducciones' : ''}`,
    )

    if (!escribir || (!cambios.length && !cambianTraducciones)) continue

    await sql`
      update niches set
        description = ${n.description}, intro = ${n.intro}, body = ${n.body ?? ''},
        keywords = ${n.keywords}, faqs = ${JSON.stringify(n.faqs)}::jsonb,
        translations = ${JSON.stringify(traducciones)}::jsonb,
        updated_at = current_date
      where id = ${n.id}
    `
  }

  if (!escribir) {
    console.log('\nNo se escribió nada. Repite con --escribir para aplicarlo.')
    return
  }
  console.log(
    '\n✓ Nichos actualizados. El sitio los muestra al redesplegar o al guardar cualquier cosa en el panel (invalida la caché).',
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
