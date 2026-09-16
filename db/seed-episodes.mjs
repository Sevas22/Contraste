/**
 * Carga el contenido escrito de los episodios desde `content/episodes.json` a
 * Postgres.
 *
 *   node db/seed-episodes.mjs            → muestra lo que cambiaría, sin escribir
 *   node db/seed-episodes.mjs --escribir → aplica los cambios
 *
 * Mismo criterio que `seed-niches.mjs` y por la misma razón: `migrate.mjs --seed`
 * pisa la fila entera con lo que haya en el JSON, y eso ya devolvió un post
 * publicado a borrador. Este toca sólo los campos de contenido.
 *
 * Nunca se tocan: `slug` (URL publicada), `number`, `status`, `published_at`,
 * `media_type`, `youtube_id`, `media_url` ni las relaciones de `episode_niches`.
 * Es decir, este script no publica ni despublica nada: sólo rellena el texto.
 *
 * Las traducciones se MEZCLAN: se conserva lo que ya hubiera en inglés y sólo
 * se reemplazan los campos que trae el JSON.
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

/** Campos de texto que este script sí sobrescribe, con su columna en Postgres. */
const CAMPOS = {
  subtitle: 'subtitle',
  metaDescription: 'meta_description',
  summary: 'summary',
  durationSeconds: 'duration_seconds',
  guests: 'guests',
  topics: 'topics',
  keywords: 'keywords',
  chapters: 'chapters',
  keyTakeaways: 'key_takeaways',
  faqs: 'faqs',
  transcript: 'transcript',
}

/** Los que viajan como jsonb; el resto son text o text[]. */
const JSONB = new Set(['guests', 'chapters', 'faqs'])

function normalizar(valor) {
  return JSON.stringify(valor ?? null)
}

async function main() {
  await cargarEntorno()
  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL.\n')
    process.exit(1)
  }
  const escribir = process.argv.includes('--escribir')
  const sql = neon(process.env.DATABASE_URL)

  const episodios = JSON.parse(
    await readFile(path.join(process.cwd(), 'content', 'episodes.json'), 'utf8'),
  )
  const filas = await sql`select * from episodes`

  for (const e of episodios) {
    const fila = filas.find((f) => f.slug === e.slug)
    if (!fila) {
      console.log(`· ${e.slug}: no existe en la base, se omite`)
      continue
    }

    const cambios = Object.entries(CAMPOS)
      .filter(([campo, columna]) => normalizar(fila[columna]) !== normalizar(e[campo]))
      .map(([campo]) => campo)

    const previas = fila.translations ?? {}
    const traducciones = { ...previas }
    for (const [idioma, campos] of Object.entries(e.translations ?? {})) {
      traducciones[idioma] = { ...(previas[idioma] ?? {}), ...campos }
    }
    const cambianTraducciones = JSON.stringify(previas) !== JSON.stringify(traducciones)

    console.log(
      `· ${e.slug}: ${cambios.length ? cambios.join(', ') : 'sin cambios en español'}${cambianTraducciones ? ' + traducciones' : ''}`,
    )

    if (!escribir || (!cambios.length && !cambianTraducciones)) continue

    await sql`
      update episodes set
        subtitle = ${e.subtitle ?? ''},
        meta_description = ${e.metaDescription ?? ''},
        summary = ${e.summary ?? ''},
        duration_seconds = ${e.durationSeconds ?? 0},
        guests = ${JSON.stringify(e.guests ?? [])}::jsonb,
        topics = ${e.topics ?? []},
        keywords = ${e.keywords ?? []},
        chapters = ${JSON.stringify(e.chapters ?? [])}::jsonb,
        key_takeaways = ${e.keyTakeaways ?? []},
        faqs = ${JSON.stringify(e.faqs ?? [])}::jsonb,
        transcript = ${e.transcript ?? ''},
        translations = ${JSON.stringify(traducciones)}::jsonb,
        updated_at = current_date
      where slug = ${e.slug}
    `
  }

  if (!escribir) {
    console.log('\nNo se escribió nada. Repite con --escribir para aplicarlo.')
    return
  }
  console.log(
    '\n✓ Episodios actualizados. El sitio los muestra al redesplegar o al guardar cualquier cosa en el panel (invalida la caché).',
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
