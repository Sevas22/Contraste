-- Traducciones del contenido editable.
--
-- Una sola columna JSONB por tabla en vez de una pareja de columnas por campo
-- (`title_en`, `summary_en`, `excerpt_en`…). Con doce campos traducibles por
-- tabla eso habrían sido más de treinta columnas nuevas, y añadir un tercer
-- idioma habría exigido otra migración. Así el idioma es una clave del objeto:
--
--   { "en": { "title": "...", "summary": "...", "faqs": [...] } }
--
-- Sólo se guardan los campos que de verdad estén traducidos. Lo que falte cae
-- al español, que es la fuente. Por eso el valor por defecto es un objeto
-- vacío: una fila sin traducir se comporta exactamente como antes.

alter table niches   add column if not exists translations jsonb not null default '{}'::jsonb;
alter table episodes add column if not exists translations jsonb not null default '{}'::jsonb;
alter table posts    add column if not exists translations jsonb not null default '{}'::jsonb;

-- Índice para poder preguntar "qué falta por traducir" sin recorrer la tabla
-- entera. El panel lo usa para marcar las fichas incompletas.
create index if not exists niches_translations_idx   on niches   using gin (translations);
create index if not exists episodes_translations_idx on episodes using gin (translations);
create index if not exists posts_translations_idx    on posts    using gin (translations);
