import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { site, hasRealAddress, hasRealPhone } from '@/lib/site'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, localePath, nicheName, type Locale } from '@/lib/i18n'
import { getNiches, getPublishedEpisodes } from '@/lib/content'
import { Logo } from './logo'
import { BrandMark } from './brand-mark'
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedinIcon,
} from './social-icons'

const socials = [
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: site.social.youtube, label: 'YouTube', Icon: YoutubeIcon },
  { href: site.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
]

/**
 * Footer.
 *
 * Los enlaces salen de la base, no de una lista fija: así nunca queda
 * desincronizado con lo que realmente existe (la versión anterior seguía
 * enlazando secciones que ya se habían quitado del menú).
 *
 * Es también la mayor superficie de enlazado interno del sitio: desde
 * cualquier página se llega a las cuatro landings comerciales.
 */
export async function Footer({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const [niches, episodes] = await Promise.all([getNiches(), getPublishedEpisodes()])
  const t = getDictionary(locale)
  const ruta = (path: string) => localePath(locale, path)

  return (
    <footer className="relative border-t border-border bg-background">
      {/* ── Llamada de cierre ────────────────────────────────── */}
      <div className="shell movil-centrado grid gap-10 py-16 md:grid-cols-[1.2fr_auto] md:items-end lg:py-20">
        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <BrandMark className="size-3 shrink-0" />
            {t.footer.empezamos}
          </p>
          <p className="display mt-6 text-[clamp(1.9rem,4.5vw,3.6rem)]">
            {t.footer.titular.a}
            <br />
            <span className="text-accent">{t.footer.titular.b}</span>
          </p>
        </div>

        <a
          href={site.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center justify-between gap-8 bg-accent px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-12"
        >
          {t.nav.contactanos}
          <ArrowUpRight className="size-5" />
        </a>
      </div>

      {/* ── Columnas ─────────────────────────────────────────── */}
      <div className="shell movil-centrado grid gap-12 border-t border-border py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Logo width={170} href={ruta('/')} />

          <ul className="fila-icono mt-8 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center border border-border text-muted-foreground transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nichos: las páginas comerciales, en el sitio más enlazado */}
        <nav aria-labelledby="pie-nichos">
          <h2 id="pie-nichos" className="eyebrow">
            {t.nav.nichos}
          </h2>
          <ul className="mt-6 flex flex-col gap-1.5">
            {niches.map((niche) => (
              <li key={niche.id}>
                <Link
                  href={ruta(`/${niche.slug}`)}
                  className="group inline-flex items-center gap-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full transition-transform group-hover:scale-150"
                    style={{ backgroundColor: niche.accent }}
                    aria-hidden="true"
                  />
                  {nicheName(t.nichos_nombres, niche.slug, niche.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="pie-contenido">
          <h2 id="pie-contenido" className="eyebrow">
            {t.footer.contenido}
          </h2>
          <ul className="mt-6 flex flex-col gap-1.5">
            <li>
              <Link
                href={ruta('/v-podcast')}
                className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.nav.podcast}
                <span className="ml-2 font-mono text-[11px] text-muted-foreground/60">
                  {String(episodes.length).padStart(2, '0')}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={ruta('/blog')}
                className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.nav.blog}
              </Link>
            </li>
            <li>
              <Link
                href={ruta('/#agencia')}
                className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footer.laAgencia}
              </Link>
            </li>
            <li>
              <Link
                href={ruta('/#resultados')}
                className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footer.resultados}
              </Link>
            </li>
          </ul>
        </nav>

        {/* NAP visible en HTML: Google lo cruza con el Perfil de Empresa.
            Es una de las señales más fuertes de SEO local. */}
        <address className="not-italic">
          <h2 className="eyebrow">{t.footer.contacto}</h2>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            {/* Mientras la calle sea la de relleno se muestra sólo la ciudad:
                es verdad y sostiene la señal local sin inventarse un domicilio. */}
            <li className="fila-icono flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {hasRealAddress && (
                  <>
                    {site.contact.street}
                    <br />
                  </>
                )}
                {site.contact.city}, {site.contact.region}, Colombia
              </span>
            </li>
            {hasRealPhone && (
              <li className="fila-icono flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-accent" />
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="inline-block py-1 transition-colors hover:text-foreground"
                >
                  {site.contact.phone}
                </a>
              </li>
            )}
            <li className="fila-icono flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-accent" />
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-block py-1 transition-colors hover:text-foreground"
              >
                {site.contact.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      {/* ── Wordmark gigante ─────────────────────────────────────
          El cierre visual del sitio: la marca a sangre, en contorno,
          recortada por abajo para que se lea como una firma y no como
          un titular más. */}
      <div className="relative overflow-hidden border-t border-border pt-10">
        <p
          aria-hidden="true"
          className="display display-outline select-none whitespace-nowrap text-center leading-[0.78] text-[13.5vw] opacity-25"
        >
          Contraste
        </p>
      </div>

      {/* ── Legal ────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="shell flex flex-col justify-between gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>{site.serviceAreas.join(' · ')}</p>
        </div>
      </div>
    </footer>
  )
}
