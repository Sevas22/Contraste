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

Variables de entorno (todas van también en Vercel → Settings → Environment Variables):

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Cadena **pooled** de Neon |
| `AUTH_SECRET` | Firma de la cookie de sesión (32+ caracteres) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob. Sin él las subidas caen a `public/media/` |
| `NEXT_PUBLIC_GTM_ID` | Contenedor de Google Tag Manager (`GTM-…`). Opcional |
| `NEXT_PUBLIC_GA_ID` | GA4 directo (`G-…`). Vacía si GA4 va dentro de GTM |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity. Opcional |
| `GOOGLE_SITE_VERIFICATION` | Etiqueta `<meta>` de Search Console. Opcional |
| `BING_SITE_VERIFICATION` | Ídem para Bing Webmaster Tools. Opcional |

Las cuatro de medición son opcionales: vacías, esa herramienta no se carga y el sitio
funciona igual. Ver [Medición](#medición-ga4--search-console--clarity).

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

## Medición (GTM · GA4 · Search Console · Clarity)

Cada pieza responde a una pregunta distinta. Con una sola no se cierra el ciclo:

| Herramienta | Responde | Cómo se conecta |
|---|---|---|
| **Google Tag Manager** | nada por sí mismo: es el contenedor desde el que se encienden las demás | script + `<noscript>` |
| **Google Analytics 4** | cuánta gente entra, por qué canal y qué páginas ve | etiqueta dentro de GTM |
| **Search Console** | con qué búsquedas aparece el sitio y en qué posición | etiqueta `<meta>` + sitemap |
| **Microsoft Clarity** | por qué se van: grabaciones de sesión y mapas de calor | etiqueta de GTM, o script |

GA4 dice que la landing de un nicho pierde al 70% antes del formulario; Clarity enseña
en qué punto exacto; Search Console dice si esa gente venía buscando lo que ofrecemos.

**Identificadores de este proyecto**

| Pieza | Valor |
|---|---|
| Contenedor de GTM | `GTM-K9CMNWDW` |
| Propiedad de GA4 | `Contraste Analytics` (553861649) |
| Flujo web de GA4 | `Web 2026-Nueva` → `G-VC1KRWDJ7K` |

El `G-…` **no va en el código**: se configura como etiqueta dentro de GTM, y por eso
`NEXT_PUBLIC_GA_ID` se queda vacía. Ninguno de los dos es secreto — viajan en el HTML
de cada página —, están aquí para que no haya que ir a buscarlos a dos paneles.

Vercel Analytics sigue montado y no estorba: mide visitas sin cookies y sirve de
contraste cuando un bloqueador de anuncios tumbe a GA4 (pasa en un 20–30% del tráfico).

### Puesta en marcha

**1. Google Tag Manager** — [tagmanager.google.com](https://tagmanager.google.com) →
contenedor **Web**. El ID (`GTM-XXXXXXX`) va en `NEXT_PUBLIC_GTM_ID`.
Dentro del contenedor se añade la etiqueta **Google Analytics: evento de GA4** con
el ID de medición de GA4, activador *Initialization — All Pages*, y se publica.
Dejar activada la *medición mejorada* de GA4 (viene por defecto): de ella depende que
se cuenten las navegaciones internas del sitio.

> ⚠️ **GA4 va en un sitio o en el otro, nunca en los dos.** Si se configura como
> etiqueta de GTM **y** además se rellena `NEXT_PUBLIC_GA_ID`, cada visita se cuenta
> dos veces. No falla nada: sólo aparecen el doble de sesiones, con la mitad de
> duración y un rebote imposible, y cuando se nota ya hay meses de histórico
> inservible. Con GTM en marcha, `NEXT_PUBLIC_GA_ID` se deja **vacía** —
> `pnpm dev` avisa por consola si se ponen las dos.

Lo mismo vale para Clarity: o como etiqueta de GTM, o con `NEXT_PUBLIC_CLARITY_ID`.
Ahí la duplicación no falsea informes (Clarity deduplica la sesión), pero se descarga
el script dos veces.

**2. Search Console** — [search.google.com/search-console](https://search.google.com/search-console).
Dos formas de verificar y conviene entender la diferencia:

- **Propiedad de dominio (DNS)** — recomendada. Un registro TXT en el DNS de
  `contrasteagencia.com`. Se puede hacer **hoy**, antes de desplegar el sitio nuevo,
  y cubre `http`, `https`, `www` y subdominios de una vez.
- **Prefijo de URL (etiqueta HTML)** — el valor va en `GOOGLE_SITE_VERIFICATION`.
  Sólo funciona **cuando el sitio nuevo ya esté en el dominio**: hoy ahí sigue el
  WordPress viejo y Google leería su HTML, no el nuestro.

Tras desplegar: **Sitemaps → añadir** `https://contrasteagencia.com/sitemap.xml`
(ya lo genera `app/sitemap.ts`, con sus `hreflang` es/en).

**3. Clarity** — [clarity.microsoft.com](https://clarity.microsoft.com) → nuevo proyecto →
Settings → Overview → copiar el **Clarity ID** a `NEXT_PUBLIC_CLARITY_ID`.
En *Setup* se puede enlazar con GA4 para cruzar ambos informes.

Las variables hay que ponerlas también en **Vercel → Settings → Environment Variables**.
Las de verificación se resuelven en *build*: si se añaden después, hay que **redesplegar**.

### Lo que ya decide el código

- **En desarrollo no mide nada.** `pnpm dev` con recarga en caliente contaría como
  visitas reales.
- **`/admin` y `/login` quedan fuera.** Ni sesiones infladas por el equipo, ni
  grabaciones de Clarity con contenido sin publicar dentro.
- **Sin ID, sin script.** No se descarga lo que no está configurado.
- **Las vistas de página internas las cuenta GA4**, no el código. Enviarlas a mano
  además duplicaría cada navegación — el error clásico de GA4 sobre un SPA.

### Comprobar que mide

```bash
pnpm build && pnpm start        # producción en local, puerto 3001
curl -s localhost:3001 | grep -oE "gtm.js|ns.html|clarity.ms|site-verification"
```

En el navegador: DevTools → Network, filtrar por `collect` (GA4) y `clarity`.
En GA4, *Informes → Tiempo real* debe registrar la visita en menos de un minuto.
Para depurar el contenedor, el **modo Vista previa** de GTM es más rápido que leer HTML.

## Conversiones

GA4 cuenta visitas por su cuenta. Lo que no sabe es cuáles de ellas son un cliente potencial,
y eso es lo que manda el código (`lib/track.ts`) al `dataLayer`:

| Evento | Cuándo salta | Parámetros |
|---|---|---|
| `generate_lead` | Clic en WhatsApp, correo o teléfono · **cita confirmada** en Calendly | `method` (whatsapp · email · phone · calendly), `placement`, `niche` |
| `calendly_open` | Abre el calendario (intención, aún no conversión) | `placement`, `niche` |
| `podcast_play` | Play en un episodio o en el vídeo de un nicho | `video_title`, `video_provider` |
| `social_click` | Clic hacia Instagram, Facebook, YouTube o LinkedIn | `method` (la red), `link_url`, `placement` |

`placement` es la sección (header, footer, contacto, agendar…) y `niche` el id del nicho
cuando pasa dentro de su landing. Con eso se responde "¿qué landing trae más WhatsApps?".

En desarrollo cada evento se ve en la consola del navegador como `[medición]`.

### Configurar GTM y GA4 (una sola vez)

1. **Importar el contenedor.** GTM → Administrar → *Importar contenedor* →
   [`docs/gtm/contraste-gtm-contenedor.json`](docs/gtm/contraste-gtm-contenedor.json) →
   espacio de trabajo *Predeterminado* → **Combinar** → *Cambiar el nombre de los conflictos*.
   Crea la etiqueta de Google (`G-VC1KRWDJ7K`, todas las páginas), la etiqueta de evento de
   GA4, el activador de los cuatro eventos y sus seis variables.
2. **Probar** con *Vista previa*: un clic en WhatsApp debe mostrar `generate_lead` y la
   etiqueta *GA4 · Evento* disparada.
3. **Publicar** el contenedor. Sin publicar, nada llega a GA4.
4. **GA4 → Administrar → Eventos → Eventos clave**: marcar `generate_lead` como evento clave.
   Es la conversión que se reporta al cliente.
5. **GA4 → Administrar → Definiciones personalizadas → Crear dimensión personalizada**
   (ámbito *Evento*): `placement` y `niche`. `method`, `video_title` y `link_url` ya vienen
   de serie.

Si la importación falla, a mano son las mismas cuatro piezas: variables de capa de datos
`method`, `placement`, `niche`, `video_title`, `video_provider`, `link_url`; activador de
evento personalizado con la expresión regular
`^(generate_lead|calendly_open|podcast_play|social_click)$`; y una etiqueta *Evento de GA4*
con nombre `{{Event}}` y esos seis parámetros.

> Los parámetros nuevos tardan 24–48 h en aparecer en los informes estándar de GA4.
> En *Tiempo real* y en *DebugView* se ven al instante.

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
  [nicho]/page.tsx             Las 4 landings — WebPage + Service + FAQPage
                               (y 308 de URLs viejas del WordPress a episodio o post)
  v-podcast/
    page.tsx                   Hub del podcast — PodcastSeries
    [slug]/page.tsx            Episodio — PodcastEpisode + VideoObject + FAQPage
  blog/
    page.tsx                   Índice del blog
    [slug]/page.tsx            Post — BlogPosting + FAQPage
  admin/
    actions.ts                 Server Actions de podcasts
    post-actions.ts            Server Actions de blog
    niche-actions.ts           Server Action de las landings de nicho
    blog/[slug]/               Editor de post
    nichos/[id]/               Editor de landing de nicho
    medicion/                  Estado de GTM, GA4, Clarity y Search Console
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
  analytics.ts                 Identificadores de GTM, GA4 y Clarity
  track.ts                     Eventos de conversión (dataLayer)
db/
  0001_init.sql                Esquema
  0005_niche_body.sql          Texto largo y fecha de edición de los nichos
  migrate.mjs                  Aplica esquema + carga contenido
  seed-niches.mjs              Carga SÓLO los nichos desde content/niches.json
  create-user.mjs              Crea usuarios del panel
middleware.ts                  Primera capa de protección de /admin
docs/gtm/                      Contenedor de GTM listo para importar
```

## El panel

Seis secciones: **Resumen · Blog · Podcasts · Nichos · Instagram · Medición**.

### Nichos
Cada landing se edita desde el panel: titular, meta description, keywords, introducción,
capacidades, **texto largo** y preguntas frecuentes, en español y en inglés. El nombre, el color
y la URL no: la URL es la heredada del WordPress.

Cada landing tiene su puntaje 0–100 (`auditNiche`): titular ≤ 60 caracteres, meta description,
600+ palabras visibles, subtítulos, mención de ciudades, keywords, 5+ preguntas frecuentes y
traducción. El editor enseña además cómo se verá el resultado en Google.

El contenido de partida de las cuatro landings está en `content/niches.json`. Para cargarlo a
Neon sin tocar episodios ni posts:

```bash
node db/seed-niches.mjs             # muestra qué cambiaría
node db/seed-niches.mjs --escribir  # lo aplica (incluye la migración 0005)
```

Para verlo en local antes de cargarlo: `CONTENT_SOURCE=json pnpm dev`.

### Medición
Qué herramientas están activas en el despliegue, qué conversiones envía el sitio y los pasos
que faltan fuera del código. Ver [Conversiones](#conversiones).

### Blog
Crear post → escribir → publicar. Cada post genera `/blog/[slug]` con schema
`BlogPosting` + `FAQPage`. El cuerpo usa Markdown mínimo (`##` subtítulo, `-` viñeta,
línea en blanco entre párrafos) para no arrastrar un parser completo y su superficie de XSS.

El campo **ciudad objetivo** alimenta `contentLocation` en el schema: es lo que hace que el
artículo compita en búsquedas locales en vez de contra todo el país.

Además del Markdown mínimo, el cuerpo admite `[texto](url)` para enlaces y `**texto**` para
negrita. Los enlaces a episodios del V-Podcast salen en el JSON-LD como `isBasedOn`, y los de
YouTube e Instagram como `citation`: así el artículo declara de dónde sale y ata los perfiles
sociales a la marca. Sólo se aceptan rutas internas y `http(s)`.

Un post sin traducción al inglés no anuncia `hreflang="en"` y su versión `/en/blog/…` sale con
`noindex`: si no, sería el mismo texto en español marcado como inglés.

**Contenido desde Conexión Podcast.** `db/posts-conexion.mjs` tiene cinco artículos escritos a partir
de las transcripciones de los episodios 000, 001 y 002 y de las publicaciones de
@agencia_contraste, sobre las búsquedas de Semrush ("qué es BTL", "activaciones de marca",
"ATL y BTL", "estrategias BTL"…). Cada cifra va atribuida a quien la dijo.

```bash
node db/seed-posts-conexion.mjs                        # revisión, no escribe
node db/seed-posts-conexion.mjs --escribir             # a Neon como borrador
node db/seed-posts-conexion.mjs --escribir --publicar  # publicados, fecha de hoy
```

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
2. ~~Comprimir el video del hero~~. El hero ya usa `hero-ron-viejo-de-caldas-ligero.mp4` (4 MB).
   El original de 63 MB sigue en `public/media/` y se puede borrar.
3. **Rotar las credenciales de Neon** antes de desplegar: la cadena de conexión actual se
   compartió por chat. Neon → Roles → `neondb_owner` → Reset password.
4. **Resolver las subidas grandes en Vercel** (ver arriba): hoy fallarían archivos de más de 4.5 MB.
5. **Rellenar el contenido editorial** de los episodios 2, 3 y 4 desde el panel.
6. **Redirecciones de URLs viejas.** Hechas la conocida (`next.config.mjs`) y el rescate automático
   de slugs de episodios y posts en la raíz (`app/[nicho]/page.tsx`). Falta cruzar la lista real de
   404 en Search Console → Indexación → Páginas, una vez verificada la propiedad.
7. **Retirar el respaldo JSON** de `lib/repo.ts` (y la carpeta `content/`) cuando Neon sea la
   única fuente. Hoy sólo se activa si falta `DATABASE_URL`.
8. **Corregir el cruce de videos** heredado: en el WordPress, la página "Tendencias que transforman
   el marketing" tiene embebido el video del mercado inmobiliario.
9. **Cargar el contenido nuevo de los nichos** a Neon con `node db/seed-niches.mjs --escribir`,
   después de que el cliente revise el texto. Afirma sólo lo que el sitio ya publicaba (año,
   ciudades, marcas del muro de clientes), pero es copy nuevo con su nombre.
10. **www en Vercel.** `next.config.mjs` ya redirige `www` → dominio desnudo; conviene dejarlo también
    en Vercel → Settings → Domains para que ni siquiera llegue a la aplicación.
11. **Perfil de Empresa de Google** con el mismo nombre, ciudad y categoría ("Agencia de marketing")
    que el JSON-LD. Es lo que decide la aparición en el mapa para "agencia BTL Medellín".
