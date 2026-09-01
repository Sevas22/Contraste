# Contraste Agencia — rediseño SEO / GEO

Rediseño del sitio de [contrasteagencia.com](https://contrasteagencia.com) sobre Next.js 16,
enfocado en posicionamiento en Google (SEO) y en motores de respuesta con IA (GEO).

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local     # y rellenar
pnpm db:migrate                # crea las tablas y carga el contenido
pnpm db:user tu@correo.com "Tu nombre" "una-contraseña-larga"
pnpm dev
```

- Sitio público → http://localhost:3000
- Panel administrativo → http://localhost:3000/admin (pide login)

## Infraestructura

| Pieza | Servicio |
|---|---|
| Hosting | Vercel |
| Base de datos | Neon (PostgreSQL) |
| Archivos (MP3, video, portadas) | Vercel Blob |
| Sesión del panel | Cookie firmada + tabla `users` con scrypt |

Variables de entorno (las tres van también en Vercel → Settings → Environment Variables):

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Cadena **pooled** de Neon |
| `AUTH_SECRET` | Firma de la cookie de sesión (32+ caracteres) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob. Sin él las subidas caen a `public/media/` |

Sin `DATABASE_URL` el sitio cae automáticamente a los JSON de `content/`, para poder
trabajar sin base de datos. Ese respaldo (`jsonRepo` en `lib/repo.ts`) es andamiaje:
se puede borrar en cuanto la base sea la única fuente.

### Seguridad del panel

Dos capas:
1. `middleware.ts` rechaza en el borde toda petición a `/admin` sin cookie.
2. `app/admin/layout.tsx` verifica la **firma** de la cookie con `getSession()`.

El middleware corre en Edge y no tiene `node:crypto`, por eso sólo comprueba presencia;
una cookie falsificada pasa la primera capa y muere en la segunda.

### ⚠️ Subidas grandes en Vercel

Vercel impone un tope duro de **4.5 MB** al body de una Server Action, que
`serverActions.bodySizeLimit` **no** levanta. En local funciona subir un MP3 de 30 MB;
en producción fallará. La solución es subir desde el navegador directo a Vercel Blob con
`handleUpload` y una URL de cliente, y guardar sólo la URL resultante en la Server Action.
Está pendiente.

## Arquitectura de información

Se conserva la estructura que el cliente pidió mantener: **Inicio · Nichos · V-Podcast**.

| Sección | Qué es | Ruta |
|---|---|---|
| **Nichos** | Las 4 verticales comerciales de la agencia | URLs heredadas del WP (ver abajo) |
| **V-Podcast** | Donde se centraliza *todo* el contenido de Óscar | `/v-podcast` |

Las URLs de las landings de nicho son **exactamente las del WordPress**. Son slugs largos y con
keyword — feos a la vista, muy buenos para SEO — y cambiarlos tiraría a la basura la indexación
ya ganada:

```
/marketing-btl-para-bebidas-degustacion-y-experiencia   Bebidas Alcohólicas
/marketing-btl-inmobiliario-mas-leads-y-ventas          Desarrollo Inmobiliario
/marketing-btl-consumo-masivo-mas-trafico-y-ventas      Consumo Masivo
/activaciones-btl-tecnologia-alto-impacto               Tecnología
```

Un episodio del V-Podcast puede marcarse con varios nichos. Al hacerlo aparece en la landing de
cada uno: así el contenido editorial alimenta tráfico hacia las páginas comerciales.

## Por qué se reestructuró

Los problemas del sitio original están medidos, no supuestos:

| Problema en el WordPress | Estado aquí |
|---|---|
| Landings de nicho con **~460 caracteres**, y ese texto era el mismo feed de podcast repetido | 1.770–1.960 caracteres de contenido propio |
| Páginas de episodio con **40–57 caracteres** | 1.300–1.600 caracteres |
| **15 `<h1>`** en el home | Exactamente 1 por página |
| Menú inyectado por JS: el crawler no veía ninguna landing | Los 12 enlaces están en el HTML servido |
| Sin `VideoObject`, `FAQPage`, `Service` ni `PodcastEpisode` | Los cuatro, generados automáticamente |
| 16 bloques de *lorem ipsum* publicados | Contenido real |
| Sin `sitemap.xml` dinámico ni `llms.txt` | Ambos, generados desde el contenido |
| Bots de IA sin permiso explícito | `robots.txt` los permite por nombre |
| Optimización de imágenes desactivada | AVIF/WebP activados |

## Marca

Tomada del sitio en producción, no inventada:

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#6E53F9` | Violeta de marca: botones, superficies, barras |
| `--accent-text` | `#9B85FF` | Sólo texto pequeño sobre fondo oscuro |
| `--background` | `#0D0E13` | Fondo |
| `--foreground` | `#FAFAFF` | Texto |

> El `#6E53F9` sobre el fondo oscuro da 3.9:1 de contraste y **no** cumple AA en tamaño pequeño.
> Por eso existe `--accent-text` (6.6:1). Es el mismo color de marca, aclarado lo justo.

**Tipografía: Jost**, la geométrica libre más cercana al wordmark del logo (O circular, A de
vértice puntiagudo, trazo uniforme — familia Futura). Si tu diseñador tiene el nombre real de la
fuente del logo, se cambia en un solo sitio: `app/layout.tsx`.

## Estructura

```
app/
  page.tsx                     Home con slider fullscreen
  login/                       Entrada al panel
  [nicho]/page.tsx             Las 4 landings — Service + FAQPage
  v-podcast/
    page.tsx                   Hub del podcast — PodcastSeries
    [slug]/page.tsx            Episodio — PodcastEpisode + VideoObject + FAQPage
  blog/
    page.tsx                   Índice del blog
    [slug]/page.tsx            Post — BlogPosting + FAQPage
  admin/
    actions.ts                 Server Actions de podcasts
    post-actions.ts            Server Actions de blog
    blog/[slug]/               Editor de post
    episodios/[slug]/          Editor de podcast (con subida de archivos)
  sitemap.ts  robots.ts  llms.txt/
content/
  niches.json                  Los 4 nichos
  episodes.json                Podcasts  ← el panel escribe aquí
  posts.json                   Posts del blog  ← el panel escribe aquí
lib/
  site.ts                      Marca y NAP (fuente única de verdad)
  types.ts                     Tipos del contenido
  db.ts                        Cliente de Neon
  repo.ts                      Acceso a datos (Postgres | JSON de respaldo)
  content.ts                   Consultas + auditoría SEO/GEO
  schema.tsx                   Generadores de JSON-LD
  uploads.ts                   Subida de archivos (Vercel Blob | disco)
  auth.ts                      Sesión y contraseñas (scrypt + HMAC)
db/
  0001_init.sql                Esquema
  migrate.mjs                  Aplica esquema + carga contenido
  create-user.mjs              Crea usuarios del panel
middleware.ts                  Primera capa de protección de /admin
```

## El panel

Cuatro secciones: **Resumen · Blog · Podcasts · Nichos**.

### Blog
Crear post → escribir → publicar. Cada post genera `/blog/[slug]` con schema
`BlogPosting` + `FAQPage`. El cuerpo usa Markdown mínimo (`##` subtítulo, `-` viñeta,
línea en blanco entre párrafos) para no arrastrar un parser completo y su superficie de XSS.

El campo **ciudad objetivo** alimenta `contentLocation` en el schema: es lo que hace que el
artículo compita en búsquedas locales en vez de contra todo el país.

### Podcasts
Tres orígenes por episodio, elegibles con un radio:

| Origen | Límite | Schema que genera |
|---|---|---|
| YouTube (pegar enlace) | — | `VideoObject` |
| Video subido (MP4/WebM/MOV) | 500 MB | `VideoObject` |
| Audio subido (MP3/M4A/WAV) | 200 MB | `AudioObject` |

Los archivos van a `public/media/podcast/`. Al subir un reemplazo se borra el anterior para no
dejar basura en disco. La portada es opcional: si se deja vacía se usa la miniatura de YouTube.

### Propagación automática
Al publicar un podcast, sin tocar nada más:

1. Aparece como subpágina en el menú **V-Podcast** (el header lee los episodios publicados)
2. Se genera su página en `/v-podcast/[slug]`
3. Aparece en la landing de cada nicho que tenga marcado
4. Entra al `sitemap.xml` y al `llms.txt`

Los borradores no aparecen en el menú ni en el sitemap, y llevan `noindex`.

## Cómo funciona el scoring

No es una demo visual: escribe en `content/episodes.json` mediante Server Actions y llama a
`revalidatePath`, así que las páginas públicas se regeneran al guardar.

Cada episodio recibe un puntaje 0–100 con 9 reglas (`lib/content.ts` → `auditEpisode`). Cada regla
explica qué señal de posicionamiento habilita. Las de mayor peso son las de GEO —conclusiones
clave, preguntas frecuentes y transcripción— porque son el formato que ChatGPT y Perplexity
extraen para citar.

Formatos de los campos multilínea (una entrada por línea):

| Campo | Formato |
|---|---|
| Capítulos | `00:00 — Introducción` |
| Preguntas frecuentes | `¿Pregunta? :: Respuesta` |
| Invitados | `Nombre :: Cargo :: @handle` |
| Keywords / Temas / Conclusiones | texto plano |

## Pendientes antes de producción

1. **Completar el NAP real** en `lib/site.ts` — dirección, teléfono y coordenadas son placeholder.
   Google los cruza con el Perfil de Empresa; un NAP inconsistente es la causa más común de no
   aparecer en el mapa local.
2. **Comprimir el video del hero.** `public/media/hero-ron-viejo-de-caldas.mp4` pesa 63 MB tal como
   venía del WordPress. Objetivo: menos de 5 MB.
   ```bash
   ffmpeg -i public/media/hero-ron-viejo-de-caldas.mp4 -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -an public/media/hero-ron-viejo-de-caldas.min.mp4
   ```
3. **Rotar las credenciales de Neon** antes de desplegar: la cadena de conexión actual se
   compartió por chat. Neon → Roles → `neondb_owner` → Reset password.
4. **Resolver las subidas grandes en Vercel** (ver arriba): hoy fallarían archivos de más de 4.5 MB.
5. **Rellenar el contenido editorial** de los episodios 2, 3 y 4 desde el panel.
6. **Redirecciones 301** de las URLs viejas que sí cambian (`/hacia-donde-va-el-mercado-inmobiliario`
   → `/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia`).
7. **Retirar el respaldo JSON** de `lib/repo.ts` (y la carpeta `content/`) cuando Neon sea la
   única fuente. Hoy sólo se activa si falta `DATABASE_URL`.
8. **Corregir el cruce de videos** heredado: en el WordPress, la página "Tendencias que transforman
   el marketing" tiene embebido el video del mercado inmobiliario.
