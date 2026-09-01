-- ============================================================================
-- Feed de Instagram
-- ============================================================================
-- Los posts se guardan en la base, no se piden a Instagram en cada visita.
-- Dos razones: Instagram exige token oficial (no hay acceso público), y aunque
-- lo hubiera, depender de una API externa en el render dejaría el home caído
-- cada vez que Meta falle o el token expire.
create table if not exists instagram_posts (
  id           text primary key,
  -- Enlace al post en Instagram
  permalink    text not null,
  -- Imagen servida desde nuestro almacenamiento, no desde el CDN de Instagram:
  -- sus URLs caducan y romperían el feed en días.
  image_url    text not null,
  caption      text not null default '',
  media_type   text not null default 'image'
                 check (media_type in ('image', 'video', 'carousel')),
  posted_at    date,
  sort_order   int  not null default 0,
  visible      boolean not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists instagram_visible_idx
  on instagram_posts (visible, sort_order);
