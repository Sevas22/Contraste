import type { Metadata, Viewport } from 'next'
import { Jost, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/lib/site'
import { JsonLd, organizationSchema, websiteSchema } from '@/lib/schema'
import { SmoothScroll } from '@/components/site/smooth-scroll'
import { SiteAnalytics } from '@/components/site/analytics'
import './globals.css'

// Jost es la geométrica libre más cercana al wordmark del logo
// (Futura-like: O circular, A de vértice puntiagudo, trazo uniforme).
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /**
   * La keyword principal delante y la marca detrás, en 59 caracteres.
   *
   * El anterior ("Contraste Agencia | Agencia BTL y marketing experiencial en
   * Medellín") tenía 68: Google lo cortaba justo en la ciudad. Y el título del
   * WordPress viejo, que es por el que la marca ya salía en "activaciones de
   * marca", llevaba esas palabras; se recuperan.
   *
   * La plantilla usa el nombre corto por lo mismo: " | Contraste Agencia" se
   * comía 20 caracteres de cada título de post y de episodio.
   */
  title: {
    default: `Agencia BTL en Medellín y activaciones de marca | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    'agencia BTL Medellín',
    'marketing experiencial Colombia',
    'activaciones de marca',
    'agencia de activaciones BTL',
    'producción de eventos Medellín',
    'gestión de promotores',
    'trade marketing Colombia',
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: '/',
    // hreflang de la home. Cada página añade el suyo; esto cubre la raíz.
    languages: {
      'es-CO': '/',
      en: '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: site.url,
    siteName: site.legalName,
    title: `${site.legalName} | Experiencias que se sienten, se miden y se recuerdan`,
    description: site.description,
    images: [
      {
        url: '/media/og-contraste.jpg',
        width: 1200,
        height: 630,
        alt: `${site.legalName} — agencia BTL y marketing experiencial en Medellín`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.legalName} | Agencia BTL y marketing experiencial`,
    description: site.tagline,
    images: ['/media/og-contraste.jpg'],
  },
  /**
   * Verificación de propiedad de los buscadores.
   *
   * Search Console → Añadir propiedad → Prefijo de URL → "Etiqueta HTML":
   * copiar SÓLO el valor del atributo content, no la etiqueta entera.
   * Next la imprime como <meta name="google-site-verification">.
   *
   * Bing es opcional pero cuenta para la fase GEO: su índice es el que
   * alimenta a Copilot y a la búsqueda de ChatGPT. Si la variable está
   * vacía, la etiqueta no se imprime.
   *
   * Se leen en el servidor y sin prefijo NEXT_PUBLIC porque el metadata se
   * resuelve en build: tienen que estar también en Vercel antes de desplegar,
   * o el HTML saldrá sin la etiqueta y la verificación fallará.
   */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : {},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // El SVG primero: escala sin pixelarse en pestañas de pantalla densa.
  // El PNG queda de reserva para los navegadores que no aceptan SVG como icono.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08080a',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CO"
      className={`${jost.variable} ${mono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {/* Va primero por el <noscript> de GTM: Google pide ese iframe justo
            tras la apertura del <body>. Los scripts que cuelgan de aquí son
            `afterInteractive`, así que su posición en el árbol da igual. */}
        <SiteAnalytics />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <SmoothScroll />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
