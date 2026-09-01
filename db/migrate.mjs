/**
 * Aplica el esquema y migra el contenido de `content/*.json` a Postgres.
 *
 *   pnpm db:migrate    → crea tablas y carga el contenido
 *   pnpm db:user       → crea un usuario del panel
 *
 * Es idempotente: usa `create table if not exists` y `on conflict do update`,
 * así que se puede correr varias veces sin duplicar nada.
 */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

async function loadEnv() {
  try {
    const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!match) continue
      if (!process.env[match[1]]) process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    /* sin .env.local: se usan las variables del entorno */
  }
}

const readJson = async (name) =>
  JSON.parse(await readFile(path.join(process.cwd(), 'content', name), 'utf8'))

async function main() {
  await loadEnv()

  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL. Copia .env.example a .env.local y rellénala.\n')
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)

  /* ── Esquema ──
     Se aplican TODAS las migraciones en orden de nombre, no sólo la inicial.
     Antes leía únicamente 0001_init.sql, así que 0002, 0003 y 0004 nunca
     corrían desde aquí: había que aplicarlas a mano y no se notaba hasta que
     algo fallaba por una columna inexistente. Todas usan `if not exists`, así
     que repetirlas es inofensivo. */
  const migraciones = (await readdir(path.join(process.cwd(), 'db')))
    .filter((n) => n.endsWith('.sql'))
    .sort()

  let totalSentencias = 0
  for (const nombre of migraciones) {
    const schema = await readFile(path.join(process.cwd(), 'db', nombre), 'utf8')
    // El driver HTTP ejecuta una sentencia por llamada: se parte por ';' a nivel raíz
    const statements = schema
      .split(/;\s*$/m)
      .map((s) => s.replace(/^\s*--.*$/gm, '').trim())
      .filter(Boolean)

    for (const statement of statements) {
      await sql.query(statement)
    }
    totalSentencias += statements.length
    console.log(`  · ${nombre} — ${statements.length} sentencias`)
  }
  console.log(`✓ Esquema aplicado: ${migraciones.length} migraciones, ${totalSentencias} sentencias`)

  /* ── ¿Sembrar contenido? ──
     El seed sobrescribe las filas con lo que hay en content/*.json, y eso
     PISA lo que el cliente haya editado desde el panel. Pasó: al correr esto
     un post publicado volvió a borrador porque el JSON lo tenía así.
     Ahora hay que pedirlo a propósito con --seed. */
  const sembrar = process.argv.includes('--seed')
  if (!sembrar) {
    console.log('\nContenido: intacto (usa --seed para volver a sembrarlo desde content/*.json)')
    return
  }

  /* ── Nichos ── */
  const niches = await readJson('niches.json')
  for (const n of niches) {
    await sql`
      insert into niches (id, slug, name, menu_label, headline, subheadline,
                          description, intro, keywords, capabilities, faqs, accent, sort_order)
      values (${n.id}, ${n.slug}, ${n.name}, ${n.menuLabel}, ${n.headline}, ${n.subheadline},
              ${n.description}, ${n.intro}, ${n.keywords}, ${n.capabilities},
              ${JSON.stringify(n.faqs)}::jsonb, ${n.accent}, ${n.order})
      on conflict (id) do update set
        slug = excluded.slug, name = excluded.name, menu_label = excluded.menu_label,
        headline = excluded.headline, subheadline = excluded.subheadline,
        description = excluded.description, intro = excluded.intro,
        keywords = excluded.keywords, capabilities = excluded.capabilities,
        faqs = excluded.faqs, accent = excluded.accent, sort_order = excluded.sort_order
    `
  }
  console.log(`✓ ${niches.length} nichos`)

  /* ── Episodios ── */
  const episodes = await readJson('episodes.json')
  for (const e of episodes) {
    await sql`
      insert into episodes (slug, status, number, title, subtitle, meta_description, summary,
                            media_type, youtube_id, media_url, cover_url, duration_seconds,
                            published_at, updated_at, guests, topics, keywords, chapters,
                            key_takeaways, faqs, transcript)
      values (${e.slug}, ${e.status}, ${e.number}, ${e.title}, ${e.subtitle},
              ${e.metaDescription}, ${e.summary}, ${e.mediaType}, ${e.youtubeId},
              ${e.mediaUrl}, ${e.coverUrl}, ${e.durationSeconds},
              ${e.publishedAt}, ${e.updatedAt},
              ${JSON.stringify(e.guests)}::jsonb, ${e.topics}, ${e.keywords},
              ${JSON.stringify(e.chapters)}::jsonb, ${e.keyTakeaways},
              ${JSON.stringify(e.faqs)}::jsonb, ${e.transcript})
      on conflict (slug) do update set
        status = excluded.status, number = excluded.number, title = excluded.title,
        subtitle = excluded.subtitle, meta_description = excluded.meta_description,
        summary = excluded.summary, media_type = excluded.media_type,
        youtube_id = excluded.youtube_id, media_url = excluded.media_url,
        cover_url = excluded.cover_url, duration_seconds = excluded.duration_seconds,
        published_at = excluded.published_at, updated_at = excluded.updated_at,
        guests = excluded.guests, topics = excluded.topics, keywords = excluded.keywords,
        chapters = excluded.chapters, key_takeaways = excluded.key_takeaways,
        faqs = excluded.faqs, transcript = excluded.transcript
    `
    for (const nicheId of e.niches) {
      await sql`
        insert into episode_niches (episode_slug, niche_id)
        values (${e.slug}, ${nicheId}) on conflict do nothing
      `
    }
  }
  console.log(`✓ ${episodes.length} episodios`)

  /* ── Posts ── */
  const posts = await readJson('posts.json')
  for (const p of posts) {
    await sql`
      insert into posts (slug, status, title, excerpt, meta_description, body, cover_url,
                         author, location, keywords, faqs, published_at, updated_at)
      values (${p.slug}, ${p.status}, ${p.title}, ${p.excerpt}, ${p.metaDescription},
              ${p.body}, ${p.coverUrl}, ${p.author}, ${p.location}, ${p.keywords},
              ${JSON.stringify(p.faqs)}::jsonb, ${p.publishedAt}, ${p.updatedAt})
      on conflict (slug) do update set
        status = excluded.status, title = excluded.title, excerpt = excluded.excerpt,
        meta_description = excluded.meta_description, body = excluded.body,
        cover_url = excluded.cover_url, author = excluded.author,
        location = excluded.location, keywords = excluded.keywords,
        faqs = excluded.faqs, published_at = excluded.published_at,
        updated_at = excluded.updated_at
    `
    for (const nicheId of p.niches) {
      await sql`
        insert into post_niches (post_slug, niche_id)
        values (${p.slug}, ${nicheId}) on conflict do nothing
      `
    }
  }
  console.log(`✓ ${posts.length} posts`)

  const [{ count }] = await sql`select count(*)::int as count from users`
  console.log(`\n✓ Migración completa. El sitio ya lee de Postgres.`)
  if (count === 0) {
    console.log('\n⚠ No hay usuarios del panel todavía. Crea uno con:')
    console.log('   pnpm db:user correo@contrasteagencia.com "Nombre" "contraseña"\n')
  }
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
