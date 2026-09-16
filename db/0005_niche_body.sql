-- Texto largo de las landings de nicho.
--
-- Hasta ahora una landing sólo tenía `intro` (un párrafo) y cuatro capacidades:
-- menos de 300 palabras propias, muy poco para competir por "marketing BTL
-- inmobiliario" o "degustaciones de licor" contra páginas que desarrollan el
-- tema. `body` usa el mismo Markdown ligero que los posts (## subtítulo,
-- - viñeta) y se edita desde el panel.
--
-- El valor por defecto es cadena vacía: el código anterior hace `select *` y
-- simplemente ignora la columna, así que aplicarla antes de desplegar no
-- rompe nada.

alter table niches add column if not exists body text not null default '';

-- Fecha de la última edición de la landing. Alimenta el <lastmod> del sitemap:
-- sin ella la landing sólo "cambiaba" cuando se publicaba un episodio de su
-- nicho, y Google no se enteraba de que el texto se había reescrito.
alter table niches add column if not exists updated_at date not null default current_date;
