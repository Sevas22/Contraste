import { promises as fs } from 'node:fs'
import path from 'node:path'
import { isDatabaseEnabled, sql } from './db'
import type { Episode, InstagramPost, Niche, Post } from './types'

/**
 * Capa de acceso a datos.
 *
 * Dos implementaciones tras la misma interfaz:
 *  - Postgres (Neon), cuando existe DATABASE_URL. Es lo que corre en producción.
 *  - Archivos JSON en `content/`, como respaldo de desarrollo.
 *
 * El respaldo JSON es andamiaje: en cuanto la base esté poblada se puede borrar
 * `jsonRepo` y el ternario del final sin tocar nada más, porque las páginas sólo
 * conocen las funciones exportadas abajo.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')

/* ── Respaldo en JSON ──────────────────────────────────────────── */

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(path.join(CONTENT_DIR, file), 'utf8')) as T
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.writeFile(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8')
}

const jsonRepo = {
  async niches(): Promise<Niche[]> {
    return (await readJson<Niche[]>('niches.json')).sort((a, b) => a.order - b.order)
  },
  async episodes(): Promise<Episode[]> {
    return (await readJson<Episode[]>('episodes.json')).sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    )
  },
  async posts(): Promise<Post[]> {
    return (await readJson<Post[]>('posts.json')).sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    )
  },
  async upsertEpisode(episode: Episode, originalSlug?: string): Promise<void> {
    const all = await readJson<Episode[]>('episodes.json')
    const key = originalSlug ?? episode.slug
    const index = all.findIndex((e) => e.slug === key)
    if (index === -1) all.push(episode)
    else all[index] = episode
    await writeJson('episodes.json', all)
  },
  async deleteEpisode(slug: string): Promise<void> {
    const all = await readJson<Episode[]>('episodes.json')
    await writeJson('episodes.json', all.filter((e) => e.slug !== slug))
  },
  async upsertPost(post: Post, originalSlug?: string): Promise<void> {
    const all = await readJson<Post[]>('posts.json')
    const key = originalSlug ?? post.slug
    const index = all.findIndex((p) => p.slug === key)
    if (index === -1) all.push(post)
    else all[index] = post
    await writeJson('posts.json', all)
  },
  async deletePost(slug: string): Promise<void> {
    const all = await readJson<Post[]>('posts.json')
    await writeJson('posts.json', all.filter((p) => p.slug !== slug))
  },
}

/* ── Postgres ──────────────────────────────────────────────────── */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Las columnas `date` vuelven como Date o string según el driver. */
function toDateString(value: any): string {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

function rowToNiche(row: any): Niche {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    menuLabel: row.menu_label,
    headline: row.headline,
    subheadline: row.subheadline ?? '',
    description: row.description ?? '',
    intro: row.intro ?? '',
    keywords: row.keywords ?? [],
    capabilities: row.capabilities ?? [],
    faqs: row.faqs ?? [],
    accent: row.accent,
    translations: row.translations ?? {},
    order: row.sort_order ?? 0,
  }
}

function rowToEpisode(row: any): Episode {
  return {
    slug: row.slug,
    // `niches` llega del array_agg del LEFT JOIN; puede venir [null] si no hay
    niches: (row.niches ?? []).filter(Boolean),
    status: row.status,
    number: row.number,
    title: row.title,
    subtitle: row.subtitle ?? '',
    metaDescription: row.meta_description ?? '',
    summary: row.summary ?? '',
    mediaType: row.media_type,
    youtubeId: row.youtube_id ?? '',
    mediaUrl: row.media_url ?? '',
    coverUrl: row.cover_url ?? '',
    durationSeconds: row.duration_seconds ?? 0,
    publishedAt: toDateString(row.published_at),
    updatedAt: toDateString(row.updated_at),
    guests: row.guests ?? [],
    topics: row.topics ?? [],
    keywords: row.keywords ?? [],
    chapters: row.chapters ?? [],
    keyTakeaways: row.key_takeaways ?? [],
    faqs: row.faqs ?? [],
    transcript: row.transcript ?? '',
    translations: row.translations ?? {},
  }
}

function rowToPost(row: any): Post {
  return {
    slug: row.slug,
    niches: (row.niches ?? []).filter(Boolean),
    status: row.status,
    title: row.title,
    excerpt: row.excerpt ?? '',
    metaDescription: row.meta_description ?? '',
    body: row.body ?? '',
    coverUrl: row.cover_url ?? '',
    author: row.author ?? 'Contraste Agencia',
    location: row.location ?? '',
    keywords: row.keywords ?? [],
    faqs: row.faqs ?? [],
    publishedAt: toDateString(row.published_at),
    updatedAt: toDateString(row.updated_at),
    translations: row.translations ?? {},
  }
}

const pgRepo = {
  async niches(): Promise<Niche[]> {
    const rows = await sql()`select * from niches order by sort_order`
    return (rows as any[]).map(rowToNiche)
  },

  async episodes(): Promise<Episode[]> {
    const rows = await sql()`
      select e.*,
             coalesce(array_agg(en.niche_id) filter (where en.niche_id is not null), '{}') as niches
        from episodes e
        left join episode_niches en on en.episode_slug = e.slug
       group by e.slug
       order by e.published_at desc
    `
    return (rows as any[]).map(rowToEpisode)
  },

  async posts(): Promise<Post[]> {
    const rows = await sql()`
      select p.*,
             coalesce(array_agg(pn.niche_id) filter (where pn.niche_id is not null), '{}') as niches
        from posts p
        left join post_niches pn on pn.post_slug = p.slug
       group by p.slug
       order by p.published_at desc
    `
    return (rows as any[]).map(rowToPost)
  },

  async upsertEpisode(episode: Episode, originalSlug?: string): Promise<void> {
    const db = sql()

    // Renombrar el slug cambia la clave primaria: se borra la fila vieja para
    // no dejar duplicados ni relaciones huérfanas (el cascade limpia el join).
    if (originalSlug && originalSlug !== episode.slug) {
      await db`delete from episodes where slug = ${originalSlug}`
    }

    await db`
      insert into episodes (
        slug, status, number, title, subtitle, meta_description, summary,
        media_type, youtube_id, media_url, cover_url, duration_seconds,
        published_at, updated_at, guests, topics, keywords, chapters,
        key_takeaways, faqs, transcript, translations
      ) values (
        ${episode.slug}, ${episode.status}, ${episode.number}, ${episode.title},
        ${episode.subtitle}, ${episode.metaDescription}, ${episode.summary},
        ${episode.mediaType}, ${episode.youtubeId}, ${episode.mediaUrl},
        ${episode.coverUrl}, ${episode.durationSeconds},
        ${episode.publishedAt}, ${episode.updatedAt},
        ${JSON.stringify(episode.guests)}::jsonb, ${episode.topics}, ${episode.keywords},
        ${JSON.stringify(episode.chapters)}::jsonb, ${episode.keyTakeaways},
        ${JSON.stringify(episode.faqs)}::jsonb, ${episode.transcript},
        ${JSON.stringify(episode.translations ?? {})}::jsonb
      )
      on conflict (slug) do update set
        status = excluded.status, number = excluded.number, title = excluded.title,
        subtitle = excluded.subtitle, meta_description = excluded.meta_description,
        summary = excluded.summary, media_type = excluded.media_type,
        youtube_id = excluded.youtube_id, media_url = excluded.media_url,
        cover_url = excluded.cover_url, duration_seconds = excluded.duration_seconds,
        published_at = excluded.published_at, updated_at = excluded.updated_at,
        guests = excluded.guests, topics = excluded.topics, keywords = excluded.keywords,
        chapters = excluded.chapters, key_takeaways = excluded.key_takeaways,
        faqs = excluded.faqs, transcript = excluded.transcript,
        translations = excluded.translations
    `

    await db`delete from episode_niches where episode_slug = ${episode.slug}`
    for (const nicheId of episode.niches) {
      await db`
        insert into episode_niches (episode_slug, niche_id)
        values (${episode.slug}, ${nicheId})
        on conflict do nothing
      `
    }
  },

  async deleteEpisode(slug: string): Promise<void> {
    await sql()`delete from episodes where slug = ${slug}`
  },

  async upsertPost(post: Post, originalSlug?: string): Promise<void> {
    const db = sql()

    if (originalSlug && originalSlug !== post.slug) {
      await db`delete from posts where slug = ${originalSlug}`
    }

    await db`
      insert into posts (
        slug, status, title, excerpt, meta_description, body, cover_url,
        author, location, keywords, faqs, published_at, updated_at, translations
      ) values (
        ${post.slug}, ${post.status}, ${post.title}, ${post.excerpt},
        ${post.metaDescription}, ${post.body}, ${post.coverUrl},
        ${post.author}, ${post.location}, ${post.keywords},
        ${JSON.stringify(post.faqs)}::jsonb, ${post.publishedAt}, ${post.updatedAt},
        ${JSON.stringify(post.translations ?? {})}::jsonb
      )
      on conflict (slug) do update set
        status = excluded.status, title = excluded.title, excerpt = excluded.excerpt,
        meta_description = excluded.meta_description, body = excluded.body,
        cover_url = excluded.cover_url, author = excluded.author,
        location = excluded.location, keywords = excluded.keywords,
        faqs = excluded.faqs, published_at = excluded.published_at,
        updated_at = excluded.updated_at, translations = excluded.translations
    `

    await db`delete from post_niches where post_slug = ${post.slug}`
    for (const nicheId of post.niches) {
      await db`
        insert into post_niches (post_slug, niche_id)
        values (${post.slug}, ${nicheId})
        on conflict do nothing
      `
    }
  },

  async deletePost(slug: string): Promise<void> {
    await sql()`delete from posts where slug = ${slug}`
  },
}

/* ── Interfaz pública ──────────────────────────────────────────── */

const repo = isDatabaseEnabled ? pgRepo : jsonRepo

export const dataSource = isDatabaseEnabled ? 'postgres' : 'json'

export const {
  niches: fetchNiches,
  episodes: fetchEpisodes,
  posts: fetchPosts,
  upsertEpisode,
  deleteEpisode: removeEpisode,
  upsertPost,
  deletePost: removePost,
} = repo

/* ── Instagram ─────────────────────────────────────────────────── */

const IG_FILE = 'instagram.json'

function rowToInstagram(row: any): InstagramPost {
  return {
    id: row.id,
    permalink: row.permalink,
    imageUrl: row.image_url,
    videoUrl: row.video_url ?? '',
    caption: row.caption ?? '',
    mediaType: row.media_type,
    postedAt: toDateString(row.posted_at),
    order: row.sort_order ?? 0,
    visible: row.visible ?? true,
  }
}

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  if (!isDatabaseEnabled) {
    try {
      const all = await readJson<InstagramPost[]>(IG_FILE)
      return all.sort((a, b) => a.order - b.order)
    } catch {
      return []
    }
  }
  const rows = await sql()`select * from instagram_posts order by sort_order, posted_at desc`
  return (rows as any[]).map(rowToInstagram)
}

export async function upsertInstagramPost(post: InstagramPost): Promise<void> {
  if (!isDatabaseEnabled) {
    let all: InstagramPost[] = []
    try {
      all = await readJson<InstagramPost[]>(IG_FILE)
    } catch {
      all = []
    }
    const index = all.findIndex((p) => p.id === post.id)
    if (index === -1) all.push(post)
    else all[index] = post
    await writeJson(IG_FILE, all)
    return
  }

  await sql()`
    insert into instagram_posts (id, permalink, image_url, video_url, caption,
                                 media_type, posted_at, sort_order, visible)
    values (${post.id}, ${post.permalink}, ${post.imageUrl}, ${post.videoUrl},
            ${post.caption}, ${post.mediaType}, ${post.postedAt || null},
            ${post.order}, ${post.visible})
    on conflict (id) do update set
      permalink = excluded.permalink, image_url = excluded.image_url,
      video_url = excluded.video_url, caption = excluded.caption,
      media_type = excluded.media_type, posted_at = excluded.posted_at,
      sort_order = excluded.sort_order, visible = excluded.visible
  `
}

export async function removeInstagramPost(id: string): Promise<void> {
  if (!isDatabaseEnabled) {
    const all = await readJson<InstagramPost[]>(IG_FILE).catch(() => [] as InstagramPost[])
    await writeJson(IG_FILE, all.filter((p) => p.id !== id))
    return
  }
  await sql()`delete from instagram_posts where id = ${id}`
}
