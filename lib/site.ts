/**
 * Fuente única de verdad de la marca.
 * Todo lo que alimenta metadata, JSON-LD, sitemap y llms.txt sale de aquí,
 * para que el NAP (nombre/dirección/teléfono) sea idéntico en todas partes:
 * la consistencia del NAP es lo que sostiene el SEO local y el GEO.
 */

export const site = {
  name: 'Contraste',
  legalName: 'Contraste Agencia',
  url: 'https://contrasteagencia.com',
  tagline: 'Creamos experiencias que se sienten, se miden y se recuerdan',
  description:
    'Agencia BTL y de marketing experiencial en Medellín. Activaciones de marca, producción 360, gestión de promotores y medición real con IA para marcas en Colombia y Latinoamérica.',
  foundingYear: 2011,
  yearsOfExperience: 14,
  brandsManaged: 100,
  activations: 500,

  // ⚠️ COMPLETAR con los datos reales: Google los cruza con tu Perfil de Empresa.
  // Un NAP inconsistente es la causa #1 de que no aparezcas en el mapa local.
  contact: {
    email: 'negocios@contrasteagencia.com',
    phone: '+57 300 000 0000',
    // Enlace corto de WhatsApp Business (wa.link). Se usa tal cual: ya lleva
    // el número y el mensaje preconfigurados desde el panel de Meta.
    whatsapp: 'https://wa.link/wu3jmt',
    street: 'Carrera 00 #00-00',
    city: 'Medellín',
    region: 'Antioquia',
    postalCode: '050021',
    country: 'CO',
    latitude: 6.2442,
    longitude: -75.5812,
  },

  /**
   * Calendly para agendar reunión. Va en cada landing de nicho.
   * Pegar la URL del tipo de evento, p. ej.
   *   https://calendly.com/contraste/reunion-estrategica
   * Vacío = se muestra el botón de WhatsApp en su lugar, sin romper nada.
   */
  calendlyUrl: 'https://calendly.com/estrategiacontraste/creacionbrief',

  social: {
    instagram: 'https://www.instagram.com/agencia_contraste/',
    facebook: 'https://www.facebook.com/contrastebtl',
    youtube: 'https://www.youtube.com/@agenciacontraste',
    linkedin: 'https://www.linkedin.com/company/contraste-agencia',
  },

  // Ciudades donde opera — cada una genera señales de GEO local
  serviceAreas: ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Ciudad de México'],
} as const


/**
 * ¿Están puestos los datos reales de contacto?
 *
 * Mientras sean los de relleno ('Carrera 00 #00-00', '+57 300 000 0000') no se
 * publican: ni en el JSON-LD ni en el pie. Google cruza el NAP con el Perfil de
 * Empresa, y un NAP inventado no es 'todavía no lo tenemos' sino una señal
 * contradictoria que hunde el SEO local — es peor que no poner nada.
 *
 * En cuanto se rellenen en `site.contact`, aparecen solos en los dos sitios.
 */
export const hasRealAddress = !site.contact.street.includes('00 #00-00')
export const hasRealPhone = !site.contact.phone.includes('300 000 0000')

/**
 * Navegación principal. Replica la estructura que el cliente quiere conservar:
 * INICIO · NICHOS (4 verticales) · V-PODCAST.
 * Los hijos de NICHOS se generan desde content/niches.json, y los de V-PODCAST
 * desde los episodios publicados, para que el menú nunca quede desincronizado.
 */
export const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Nichos', href: '/#nichos', dynamic: 'niches' as const },
  { label: 'V-Podcast', href: '/v-podcast', dynamic: 'episodes' as const },
  { label: 'Agencia', href: '/#agencia' },
  { label: 'Contacto', href: '/#contacto' },
] as const

export const services = [
  {
    slug: 'estrategia-de-marca',
    title: 'Estrategia y planificación de marca',
    summary:
      'Definimos qué debe sentir tu audiencia antes de decidir qué vamos a producir. Territorio de marca, mensaje y plan de contacto.',
  },
  {
    slug: 'produccion-logistica-360',
    title: 'Producción y logística 360°',
    summary:
      'Montaje, transporte, permisos y operación en calle. Ejecutamos en varias ciudades a la vez sin perder el estándar de marca.',
  },
  {
    slug: 'creatividad-experiencial',
    title: 'Creatividad y diseño experiencial',
    summary:
      'Conceptos que funcionan en el espacio físico: stands, activaciones y piezas pensadas para que la gente quiera participar.',
  },
  {
    slug: 'gestion-de-promotores',
    title: 'Gestión de promotores',
    summary:
      'Selección, formación y supervisión del equipo que representa tu marca. Con reporte de desempeño por punto y por turno.',
  },
  {
    slug: 'data-y-performance',
    title: 'Data & Performance',
    summary:
      'Trazabilidad real de cada activación: alcance, interacciones, conversión y costo por contacto. Datos, no estimaciones.',
  },
] as const

/**
 * Marcas atendidas. El logo de cada una vive en public/clients.
 *
 * Los archivos apuntan a `/clients/blanco/`: siluetas en blanco sin fondo,
 * generadas a partir de los originales. Los originales siguen en
 * `/clients/` por si hiciera falta volver a procesarlos.
 *
 * Se hizo así porque venían con el fondo incrustado —blanco, naranja, rojo—
 * y varios en JPG sin transparencia: sueltos sobre el negro se veían como
 * rectángulos de color en vez de logos.
 */
export const clients = [
  { name: 'IBM', logo: '/clients/blanco/ibm.png' },
  { name: 'Alcaldía de Medellín', logo: '/clients/blanco/alcaldia-medellin.png' },
  { name: 'Cámara de Comercio de Medellín', logo: '/clients/blanco/camara-comercio-medellin.png' },
  { name: 'Cabify', logo: '/clients/blanco/cabify.png' },
  { name: 'Vélez', logo: '/clients/blanco/velez.png' },
  { name: 'Ron Viejo de Caldas', logo: '/clients/blanco/ron-viejo-de-caldas.png' },
  { name: 'Aguardiente Amarillo', logo: '/clients/blanco/aguardiente-amarillo.png' },
  { name: 'Confiar', logo: '/clients/blanco/confiar.png' },
  { name: 'Equidad Seguros', logo: '/clients/blanco/equidad-seguros.png' },
  { name: 'Premium Plaza', logo: '/clients/blanco/premium-plaza.png' },
  { name: 'Movo', logo: '/clients/blanco/movo.png' },
  { name: 'COMD', logo: '/clients/blanco/comd.png' },
] as const

/** Slides del hero a pantalla completa — mismo ritmo que el slider del WordPress. */
export const heroSlides = [
  {
    id: 'resultados',
    kicker: 'Data & Performance',
    title: ['Resultados', '+ IA'],
    body: 'Cada activación se mide. Alcance, interacciones y costo por contacto en tiempo real.',
    type: 'image' as const,
    src: '/media/hero-resultados.jpg',
    alt: 'Equipo de Contraste ejecutando una activación de marca en Medellín',
  },
  {
    id: 'agencia',
    kicker: 'Marketing experiencial',
    title: ['Agencia', 'Contraste'],
    body: '14 años convirtiendo ideas en experiencias vivas para más de 100 marcas.',
    type: 'image' as const,
    src: '/media/hero-agencia.jpg',
    alt: 'Activación de marca de Contraste con público participando',
  },
  {
    id: 'servicios',
    kicker: 'Caso — Ron Viejo de Caldas',
    title: ['Servicios de', 'Experiencia'],
    body: 'Producción 360, promotoría y trazabilidad. De la idea a la calle, sin intermediarios.',
    type: 'video' as const,
    src: '/media/hero-ron-viejo-de-caldas.mp4',
    poster: '/media/hero-resultados.jpg',
    alt: 'Activación de marca de Ron Viejo de Caldas producida por Contraste',
  },
] as const
