-- ============================================================================
-- Video propio en las publicaciones del feed
-- ============================================================================
-- Los clips se re-alojan en nuestro almacenamiento en vez de embeber a
-- Instagram: el embed oficial arrastra su cabecera, su botón de seguir y unos
-- 600 KB de JS por post. Con el archivo propio se reproduce dentro del diseño
-- del sitio y sin dependencia externa.
alter table instagram_posts
  add column if not exists video_url text not null default '';
