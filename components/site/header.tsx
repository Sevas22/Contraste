import { getNiches, getPublishedEpisodes, getPublishedPosts } from '@/lib/content'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, nicheName, type Locale } from '@/lib/i18n'
import { translateEpisodes, translatePosts } from '@/lib/translate-content'
import { HeaderShell } from './header-shell'

/**
 * Server Component: arma el menú con datos reales y lo pasa al shell interactivo.
 * Así los enlaces de Nichos y V-Podcast quedan en el HTML — rastreables — en vez
 * de inyectarse por JS como en el WordPress actual.
 *
 * Los `href` se construyen con `localePath`, así que en la versión inglesa todo
 * el menú apunta dentro de `/en` y no devuelve al visitante al sitio español a
 * la primera.
 */
export async function Header({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const [niches, episodesRaw, postsRaw] = await Promise.all([
    getNiches(),
    getPublishedEpisodes(),
    getPublishedPosts(),
  ])

  // Los títulos del desplegable también se traducen: son navegación, y verlos
  // en español dentro del sitio inglés era justo lo que se veía mal.
  const episodes = translateEpisodes(episodesRaw, locale)
  const posts = translatePosts(postsRaw, locale)

  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)

  const menu = [
    { label: t.nav.inicio, href: ruta('/'), children: [] },
    {
      label: t.nav.nichos,
      href: ruta('/#nichos'),
      children: niches.map((n) => ({
        label: nicheName(t.nichos_nombres, n.slug, n.menuLabel),
        href: ruta(`/${n.slug}`),
      })),
    },
    {
      label: t.nav.podcast,
      href: ruta('/v-podcast'),
      children: episodes.slice(0, 6).map((e) => ({
        label: e.title,
        href: ruta(`/v-podcast/${e.slug}`),
      })),
    },
    {
      label: t.nav.blog,
      href: ruta('/blog'),
      children: posts.slice(0, 6).map((p) => ({ label: p.title, href: ruta(`/blog/${p.slug}`) })),
    },
    // Agencia y Contacto salieron del menú: son secciones del home, no páginas,
    // y el botón fijo "Agendar cita" ya cubre la intención de contacto.
    // Las secciones siguen existiendo y sus anclas (#agencia, #contacto) siguen
    // funcionando para los enlaces que apuntan a ellas desde el resto del sitio.
  ]

  // El icono apunta siempre a /admin y el middleware se encarga: con sesión
  // entra, sin ella redirige al login. Consultar aquí la sesión leería cookies
  // y volvería dinámicas TODAS las páginas del sitio, perdiendo la generación
  // estática de las landings, el blog y los episodios.
  return <HeaderShell menu={menu} adminHref="/admin" locale={locale} t={t} />
}
