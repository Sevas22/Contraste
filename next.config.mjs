/** @type {import('next').NextConfig} */

/**
 * Cabeceras de seguridad.
 *
 * No hay Content-Security-Policy a propósito: el sitio embebe Calendly,
 * YouTube y Vercel Analytics, y una CSP mal ajustada rompe el agendamiento
 * sin avisar. Estas cuatro cubren lo que de verdad se explota en un sitio de
 * marketing y no tienen efectos secundarios.
 */
const securityHeaders = [
  // Sin esto, un archivo subido al panel que el navegador decida interpretar
  // como HTML puede ejecutar scripts desde nuestro dominio.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Que nadie meta el sitio en un iframe para hacer clickjacking sobre el panel
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // No filtrar la ruta completa a terceros al salir del sitio
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // El sitio no usa cámara, micrófono ni geolocalización
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    /**
     * Tope en 2048px.
     * Por defecto Next llega a 3840, y medido en el home el navegador pedía
     * justo esa variante para el hero en una pantalla de 1900px con densidad
     * 2. A partir de 2048 la mejora que se ve es nula y el coste es real:
     * la portada pasaba de ~60 KB a 117 KB por imagen.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      // Portadas de episodios que vienen de YouTube
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
      /**
       * Vercel Blob: aquí aterriza TODO lo que el cliente sube por el panel
       * (portadas de blog, carátulas de episodios, miniaturas de Instagram).
       * Sin este patrón, next/image rechaza esas URLs y la página revienta con
       * "hostname is not configured" en cuanto se publique el primer post con
       * imagen. El subdominio depende del store, de ahí el comodín.
       */
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      /**
       * www → dominio sin www.
       *
       * Medido el 2026-09-15: www.contrasteagencia.com respondía 200 con el
       * sitio entero. El canónico apunta al dominio desnudo y eso evita lo
       * peor, pero los enlaces que otros pongan con www reparten autoridad
       * entre dos hosts. Un 308 la concentra en uno.
       *
       * Lo ideal es configurarlo también en Vercel → Settings → Domains
       * (www → "Redirect to contrasteagencia.com"); esto lo cubre mientras.
       */
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.contrasteagencia.com' }],
        destination: 'https://contrasteagencia.com/:path*',
        permanent: true,
      },
      /**
       * URLs del WordPress viejo que cambiaron de sitio.
       *
       * Sólo las que se conocen con certeza. Las de episodios y posts que
       * vivían en la raíz las recoge además `app/[nicho]/page.tsx`, que manda
       * al episodio o post con ese slug en vez de dar 404.
       *
       * La lista completa sale de Search Console → Indexación → Páginas →
       * "No se ha encontrado (404)" una vez verificada la propiedad.
       */
      {
        source: '/hacia-donde-va-el-mercado-inmobiliario',
        destination: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: {
      // Un MP3 de 30 min pesa ~30 MB y un MP4 en 1080p mucho más.
      // El límite por defecto es 1 MB.
      //
      // ⚠️ En Vercel el body de una Server Action tiene un tope duro de 4.5 MB
      // que esto NO levanta. Para archivos grandes en producción hay que subir
      // desde el navegador directo a Vercel Blob con `handleUpload`.
      // Ver README → "Subidas grandes en Vercel".
      bodySizeLimit: '512mb',
    },
  },
}

export default nextConfig
