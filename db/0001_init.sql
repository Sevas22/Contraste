-- ============================================================================
-- Contraste Agencia — esquema inicial (PostgreSQL / Neon)
--   pnpm db:migrate
-- ============================================================================

-- ── Nichos ──────────────────────────────────────────────────────────────────
-- `slug` es la URL heredada del WordPress, se conserva tal cual para no perder
-- la indexación. `id` es la clave corta que referencia todo lo demás, para que
-- cambiar una URL no rompa las relaciones.
create table if not exists niches (
  id            text primary key,
  slug          text not null unique,
  name          text not null,
  menu_label    text not null,
  headline      text not null,
  subheadline   text not null default '',
  description   text not null default '',
  intro         text not null default '',
  keywords      text[] not null default '{}',
  capabilities  text[] not null default '{}',
  faqs          jsonb  not null default '[]'::jsonb,
  accent        text   not null default '#6E53F9',
  sort_order    int    not null default 0,
  created_at    timestamptz not null default now()
);

-- ── Episodios del V-Podcast ─────────────────────────────────────────────────
create table if not exists episodes (
  slug             text primary key,
  status           text not null default 'draft'
                     check (status in ('published', 'draft')),
  number           int  not null default 1,
  title            text not null,
  subtitle         text not null default '',
  meta_description text not null default '',
  summary          text not null default '',
  media_type       text not null default 'youtube'
                     check (media_type in ('youtube', 'video', 'audio')),
  youtube_id       text not null default '',
  media_url        text not null default '',
  cover_url        text not null default '',
  duration_seconds int  not null default 0,
  published_at     date not null default current_date,
  updated_at       date not null default current_date,
  guests           jsonb  not null default '[]'::jsonb,
  topics           text[] not null default '{}',
  keywords         text[] not null default '{}',
  chapters         jsonb  not null default '[]'::jsonb,
  key_takeaways    text[] not null default '{}',
  faqs             jsonb  not null default '[]'::jsonb,
  transcript       text   not null default '',
  created_at       timestamptz not null default now()
);

-- ── Posts del blog ──────────────────────────────────────────────────────────
create table if not exists posts (
  slug             text primary key,
  status           text not null default 'draft'
                     check (status in ('published', 'draft')),
  title            text not null,
  excerpt          text not null default '',
  meta_description text not null default '',
  body             text not null default '',
  cover_url        text not null default '',
  author           text not null default 'Contraste Agencia',
  -- Ciudad o región objetivo: la señal más fuerte de SEO local
  location         text not null default '',
  keywords         text[] not null default '{}',
  faqs             jsonb  not null default '[]'::jsonb,
  published_at     date not null default current_date,
  updated_at       date not null default current_date,
  created_at       timestamptz not null default now()
);

-- ── Relaciones N:M ──────────────────────────────────────────────────────────
-- Un episodio o un post pueden alimentar varias landings comerciales.
create table if not exists episode_niches (
  episode_slug text not null references episodes(slug) on delete cascade,
  niche_id     text not null references niches(id)     on delete cascade,
  primary key (episode_slug, niche_id)
);

create table if not exists post_niches (
  post_slug text not null references posts(slug) on delete cascade,
  niche_id  text not null references niches(id)  on delete cascade,
  primary key (post_slug, niche_id)
);

-- ── Usuarios del panel ──────────────────────────────────────────────────────
-- Contraseñas con scrypt (viene en Node, sin dependencias). Nunca en claro.
create table if not exists users (
  email         text primary key,
  name          text not null default '',
  password_hash text not null,
  created_at    timestamptz not null default now(),
  last_login_at timestamptz
);

-- ── Índices ─────────────────────────────────────────────────────────────────
-- Casi todas las consultas públicas filtran por estado y ordenan por fecha.
create index if not exists episodes_published_idx on episodes (status, published_at desc);
create index if not exists posts_published_idx    on posts (status, published_at desc);
create index if not exists niches_order_idx       on niches (sort_order);
create index if not exists episode_niches_niche_idx on episode_niches (niche_id);
create index if not exists post_niches_niche_idx    on post_niches (niche_id);
