import type { Locale } from './i18n'

/**
 * Textos fijos de la interfaz, en los dos idiomas.
 *
 * El español es la fuente: `Dictionary` se deriva de él, así que si se añade
 * una clave y no se traduce, TypeScript lo dice al compilar en vez de dejar un
 * hueco en producción.
 *
 * Los titulares van partidos en las mismas piezas que la maqueta (`a`, `b`,
 * `c`), porque el diseño alterna sólido / contorno / acento línea a línea. Si
 * se guardaran como una sola cadena habría que volver a partirlos al pintar y
 * el punto de corte cambiaría con la longitud de cada idioma.
 *
 * El inglés NO es traducción literal: es copy de marketing y suena mal palabra
 * por palabra. "De multinacionales a marcas de barrio" es "From global names to
 * neighborhood brands", no "From multinationals to neighborhood brands".
 */
export const es = {
  /**
   * Copy del hero y de los servicios.
   *
   * Vivía en `lib/site.ts` como dato de configuración, pero es texto de
   * marketing: en cuanto hubo dos idiomas quedó claro que su sitio es el
   * diccionario. `site.ts` conserva lo que NO se traduce (rutas de archivo,
   * tipo de medio, textos alternativos de imagen).
   *
   * Se indexa por el `id` / `slug` de cada pieza, no por posición.
   */
  hero_slides: {
    resultados: {
      kicker: 'Data & Performance',
      title: ['Resultados', '+ IA'],
      body: 'Cada activación se mide. Alcance, interacciones y costo por contacto en tiempo real.',
    },
    agencia: {
      kicker: 'Marketing experiencial',
      title: ['Agencia', 'Contraste'],
      body: '14 años convirtiendo ideas en experiencias vivas para más de 100 marcas.',
    },
    servicios: {
      kicker: 'Caso — Ron Viejo de Caldas',
      title: ['Servicios de', 'Experiencia'],
      body: 'Producción 360, promotoría y trazabilidad. De la idea a la calle, sin intermediarios.',
    },
  },

  servicios_lista: {
    'estrategia-de-marca': {
      title: 'Estrategia y planificación de marca',
      summary:
        'Definimos qué debe sentir tu audiencia antes de decidir qué vamos a producir. Territorio de marca, mensaje y plan de contacto.',
    },
    'produccion-logistica-360': {
      title: 'Producción y logística 360°',
      summary:
        'Montaje, transporte, permisos y operación en calle. Ejecutamos en varias ciudades a la vez sin perder el estándar de marca.',
    },
    'creatividad-experiencial': {
      title: 'Creatividad y diseño experiencial',
      summary:
        'Conceptos que funcionan en el espacio físico: stands, activaciones y piezas pensadas para que la gente quiera participar.',
    },
    'gestion-de-promotores': {
      title: 'Gestión de promotores',
      summary:
        'Selección, formación y supervisión del equipo que representa tu marca. Con reporte de desempeño por punto y por turno.',
    },
    'data-y-performance': {
      title: 'Data & Performance',
      summary:
        'Trazabilidad real de cada activación: alcance, interacciones, conversión y costo por contacto. Datos, no estimaciones.',
    },
  },

  resultados_lista: [
    'Trazabilidad por punto, turno y promotor',
    'Reporte en tiempo real durante la activación',
    'Cierre con costo por contacto y aprendizajes',
  ],
  /** Palabras de la marquesina del home. */
  marquee: ['Marketing experiencial', 'Activaciones BTL', 'Producción 360', 'Data'],

  /**
   * Nombres de los cuatro nichos.
   *
   * Van por slug y con reserva al nombre de la base: si el cliente crea un
   * nicho nuevo desde el panel, aparece con su nombre en español en vez de
   * romperse. Son etiquetas de navegación, cortas y estables — el contenido
   * largo de cada landing sí vive en la base.
   */
  nichos_nombres: {
    'marketing-btl-para-bebidas-degustacion-y-experiencia': 'Bebidas Alcohólicas',
    'marketing-btl-inmobiliario-mas-leads-y-ventas': 'Desarrollo Inmobiliario',
    'marketing-btl-consumo-masivo-mas-trafico-y-ventas': 'Consumo Masivo',
    'activaciones-btl-tecnologia-alto-impacto': 'Tecnología',
  },

  nav: {
    inicio: 'Inicio',
    nichos: 'Nichos',
    podcast: 'V-Podcast',
    blog: 'Blog',
    contactanos: 'Contáctanos',
    contactanosWhatsapp: 'Contáctanos por WhatsApp',
    panel: 'Panel administrativo',
    menu: 'Menu',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    navPrincipal: 'Principal',
    navMovil: 'Móvil',
    idioma: 'Idioma',
    verEnIngles: 'Ver en inglés',
    verEnEspanol: 'Ver en español',
  },

  hero: {
    etiquetaLateral: 'Medellín · Colombia · Latam',
    // Texto de los sellos circulares. Lleva separador y espacio al final
    // porque se repite en bucle sobre la circunferencia.
    selloMarca: 'Contraste · Marketing experiencial · ',
    selloCiudad: 'Marketing experiencial · Medellín · ',
    agendarCita: 'Agendar cita',
    scroll: 'Scroll',
    pausar: 'Pausar',
    reanudar: 'Reanudar',
    carrusel: 'Presentación de Contraste',
    diapositiva: 'Ir a la diapositiva',
    pausarCarrusel: 'Pausar carrusel',
    reanudarCarrusel: 'Reanudar carrusel',
  },

  agencia: {
    etiqueta: 'La agencia',
    desde: 'Desde 2011',
    lugar: 'Medellín, Colombia',
    titular: { a: 'No hacemos', b: 'ruido.', c: 'Hacemos', d: 'impacto.' },
    cuerpo:
      'Somos Contraste, la agencia donde la emoción y los datos trabajan juntos para transformar cada activación en resultados medibles y memorables.',
    aniosOperacion: 'años en operación',
    marcasGestionadas: 'marcas gestionadas',
    activacionesEjecutadas: 'activaciones ejecutadas',
  },

  nichos: {
    etiqueta: 'Nichos',
    titular: { a: 'Cada sector', b: 'se activa distinto.' },
    verNicho: 'Ver nicho',
    otrosNichos: 'Otros nichos',
    explorarPorNicho: 'Explorar por nicho',
    queHacemos: 'Qué hacemos en este nicho',
    conversacionesSector: 'Conversaciones de este sector',
    verTodoPodcast: 'Ver todo el V-Podcast',
    nicho: 'Nicho',
    pista: '{n} nichos · baja para recorrerlos',
  },

  servicios: {
    etiqueta: 'Lo que hacemos',
    titular: { a: 'Del primer impacto', b: 'al', c: 'siguiente cliente.' },
    consultar: 'Consultar',
    anteriores: 'Servicios anteriores',
    siguientes: 'Servicios siguientes',
    region: 'Servicios de Contraste',
  },

  resultados: {
    etiqueta: 'Resultados que hablan',
    titular: { a: 'Más que activaciones,', b: 'resultados medibles.' },
    cuerpo:
      'Cada acción se traza y se reporta: alcance real, interacciones, conversión y costo por contacto. Sin estimaciones ni métricas de vanidad.',
    hablemosDeTuMarca: 'Hablemos de tu marca',
    altFoto: 'Promotores de Contraste durante una activación de marca en punto de venta',
  },

  clientes: {
    etiqueta: 'Marcas que confían',
    titular: { a: 'De multinacionales', b: 'a marcas de barrio.' },
    // Plantilla con marcadores, no función: el diccionario viaja del servidor
    // al cliente (la cabecera es interactiva) y React no puede serializar
    // funciones a través de esa frontera.
    resumen: '+{marcas} marcas gestionadas en {anios} años de operación.',
  },

  podcast: {
    etiqueta: 'V-Podcast',
    titular: { a: 'Conversaciones', b: 'de negocio real.' },
    subtitulo: 'El contenido, centralizado',
    ultimoEpisodio: 'Último episodio',
    verEpisodio: 'Ver episodio',
    verTodos: 'Ver todos los episodios',
    masEpisodios: 'Más episodios',
    deQueHabla: 'De qué habla este episodio',
    conclusiones: 'Conclusiones clave',
    capitulos: 'Capítulos',
    transcripcion: 'Transcripción',
    temas: 'Temas tratados',
    sinContenido: 'Este episodio aún no tiene contenido escrito',
    sinContenidoCuerpo:
      'Sin resumen, conclusiones ni preguntas frecuentes, esta página no le da a Google ni a los motores de IA nada que leer. Complétalo desde el panel para que empiece a posicionar.',
    completarPanel: 'Completar en el panel',
    audio: 'Episodio en audio',
    descargar: 'Descargar el episodio',
    sinMedio: 'Sin medio vinculado',
    sinVideo: 'Sin video vinculado',
    reproducir: 'Reproducir',
    episodio: 'Episodio',
  },

  blog: {
    etiqueta: 'Blog',
    subtitulo: 'Desde la operación',
    masReciente: 'Lo más reciente',
    leerArticulo: 'Leer artículo',
    masArticulos: 'Más artículos',
    sinContenido: 'Este artículo aún no tiene contenido',
    escribirPanel: 'Escribir en el panel',
    sinContenidoCuerpo:
      'Sin cuerpo, la página no le da a Google ni a los motores de IA nada que leer. Complétalo desde el panel para que empiece a posicionar.',
    porAutor: 'Por',
  },

  instagram: {
    etiqueta: 'En la calle',
    titular: { a: 'Lo que estamos', b: 'activando ahora.' },
  },

  contacto: {
    etiqueta: '¿Listos para contrastar?',
    titular: { a: 'Hagamos algo', b: 'que se note.' },
    escribenos: 'Escríbenos',
    whatsapp: 'WhatsApp',
    hablemosAhora: 'Hablemos ahora',
    agendarReunion: 'Agendar reunión',
    agendaUnaReunion: 'Agenda una reunión',
    agendarWhatsapp: 'Agendar por WhatsApp',
    oWhatsapp: 'O escríbenos por WhatsApp',
    prefieresWhatsapp: '¿Prefieres WhatsApp?',
    cargandoCalendario: 'Cargando calendario…',
    treintaMinutos:
      '30 minutos para entender tu objetivo y decirte si podemos ayudarte. Sin presentación corporativa de por medio.',
    activamosTuMarca: '¿Activamos tu marca?',
    activamosEnNicho: '¿Activamos tu marca en {nicho}?',
    ctaLugar: 'Diseñamos y ejecutamos experiencias de marca medibles en {lugar} y el resto del país.',
    ctaPais: 'Diseñamos y ejecutamos experiencias de marca medibles en Colombia y Latinoamérica.',
  },

  footer: {
    empezamos: '¿Empezamos?',
    titular: { a: 'Cuéntanos qué marca', b: 'quieres activar.' },
    contenido: 'Contenido',
    laAgencia: 'La agencia',
    resultados: 'Resultados',
    contacto: 'Contacto',
  },

  faq: {
    etiqueta: 'Preguntas frecuentes',
    titular: { a: 'Lo que más', b: 'nos preguntan.' },
  },

  comun: {
    inicio: 'Inicio',
    rutaNavegacion: 'Ruta de navegación',
    volverInicio: 'Volver al inicio',
  },

  notFound: {
    etiqueta: 'Error 404',
    titulo: 'Página no encontrada',
    titular: { a: 'Esta página', b: 'ya no existe.', c: 'El resto sí.' },
    cuerpo:
      'Puede que el enlace venga del sitio anterior o que la dirección esté mal escrita. Te dejamos por dónde seguir.',
    verPodcast: 'Ver el V-Podcast',
    nuestrosNichos: 'Nuestros nichos',
  },

  error: {
    etiqueta: 'Algo se rompió',
    titular: { a: 'No pudimos', b: 'cargar esta página.' },
    cuerpo:
      'Es un fallo nuestro, no tuyo. Puedes reintentar; si sigue igual, escríbenos y lo revisamos.',
    reintentar: 'Reintentar',
    irInicio: 'Ir al inicio',
    avisarnos: 'Avisarnos',
    referencia: 'Referencia del error:',
  },
  // Sin `as const`: congelaba cada texto español como tipo literal y entonces
  // el inglés no podía decir otra cosa. Sin él, TypeScript sigue exigiendo la
  // misma FORMA (mismas claves, misma anidación) pero deja variar el valor.
}

export type Dictionary = typeof es

export const en: Dictionary = {
  hero_slides: {
    resultados: {
      kicker: 'Data & Performance',
      title: ['Results', '+ AI'],
      body: 'Every activation is measured. Reach, interactions and cost per contact in real time.',
    },
    agencia: {
      kicker: 'Experiential marketing',
      title: ['Contraste', 'Agency'],
      body: '14 years turning ideas into living experiences for more than 100 brands.',
    },
    servicios: {
      kicker: 'Case — Ron Viejo de Caldas',
      title: ['Experience', 'Services'],
      body: '360 production, field staff and traceability. From idea to street, with no middlemen.',
    },
  },

  servicios_lista: {
    'estrategia-de-marca': {
      title: 'Brand strategy and planning',
      summary:
        'We define what your audience should feel before deciding what to produce. Brand territory, message and contact plan.',
    },
    'produccion-logistica-360': {
      title: '360° production and logistics',
      summary:
        'Build, transport, permits and street operations. We run several cities at once without dropping the brand standard.',
    },
    'creatividad-experiencial': {
      title: 'Experiential creative and design',
      summary:
        'Concepts that work in physical space: stands, activations and pieces designed to make people want to join in.',
    },
    'gestion-de-promotores': {
      title: 'Field staff management',
      summary:
        'Selection, training and supervision of the team representing your brand. With performance reporting by location and shift.',
    },
    'data-y-performance': {
      title: 'Data & Performance',
      summary:
        'Real traceability for every activation: reach, interactions, conversion and cost per contact. Data, not estimates.',
    },
  },

  resultados_lista: [
    'Traceability by location, shift and staff member',
    'Live reporting while the activation runs',
    'Wrap-up with cost per contact and lessons learned',
  ],
  marquee: ['Experiential marketing', 'BTL activations', '360 production', 'Data'],

  nichos_nombres: {
    'marketing-btl-para-bebidas-degustacion-y-experiencia': 'Alcoholic Beverages',
    'marketing-btl-inmobiliario-mas-leads-y-ventas': 'Real Estate Development',
    'marketing-btl-consumo-masivo-mas-trafico-y-ventas': 'Consumer Goods',
    'activaciones-btl-tecnologia-alto-impacto': 'Technology',
  },

  nav: {
    inicio: 'Home',
    nichos: 'Sectors',
    podcast: 'V-Podcast',
    blog: 'Blog',
    contactanos: 'Get in touch',
    contactanosWhatsapp: 'Message us on WhatsApp',
    panel: 'Admin panel',
    menu: 'Menu',
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
    navPrincipal: 'Main',
    navMovil: 'Mobile',
    idioma: 'Language',
    verEnIngles: 'View in English',
    verEnEspanol: 'Ver en español',
  },

  hero: {
    etiquetaLateral: 'Medellín · Colombia · Latam',
    selloMarca: 'Contraste · Experiential marketing · ',
    selloCiudad: 'Experiential marketing · Medellín · ',
    agendarCita: 'Book a call',
    scroll: 'Scroll',
    pausar: 'Pause',
    reanudar: 'Play',
    carrusel: 'Contraste showcase',
    diapositiva: 'Go to slide',
    pausarCarrusel: 'Pause carousel',
    reanudarCarrusel: 'Resume carousel',
  },

  agencia: {
    etiqueta: 'The agency',
    desde: 'Since 2011',
    lugar: 'Medellín, Colombia',
    titular: { a: "We don't make", b: 'noise.', c: 'We make', d: 'impact.' },
    cuerpo:
      'We are Contraste, the agency where emotion and data work together to turn every activation into results you can measure and remember.',
    aniosOperacion: 'years in business',
    marcasGestionadas: 'brands handled',
    activacionesEjecutadas: 'activations delivered',
  },

  nichos: {
    etiqueta: 'Sectors',
    titular: { a: 'Every sector', b: 'activates differently.' },
    verNicho: 'View sector',
    otrosNichos: 'Other sectors',
    explorarPorNicho: 'Browse by sector',
    queHacemos: 'What we do in this sector',
    conversacionesSector: 'Conversations from this sector',
    verTodoPodcast: 'See the whole V-Podcast',
    nicho: 'Sector',
    pista: '{n} sectors · scroll to explore',
  },

  servicios: {
    etiqueta: 'What we do',
    titular: { a: 'From first impact', b: 'to', c: 'next customer.' },
    consultar: 'Ask us',
    anteriores: 'Previous services',
    siguientes: 'Next services',
    region: 'Contraste services',
  },

  resultados: {
    etiqueta: 'Results that speak',
    titular: { a: 'More than activations,', b: 'measurable results.' },
    cuerpo:
      'Every action is tracked and reported: real reach, interactions, conversion and cost per contact. No estimates, no vanity metrics.',
    hablemosDeTuMarca: "Let's talk about your brand",
    altFoto: 'Contraste field staff running a brand activation at the point of sale',
  },

  clientes: {
    etiqueta: 'Brands that trust us',
    titular: { a: 'From global names', b: 'to neighborhood brands.' },
    resumen: '{marcas}+ brands handled over {anios} years in business.',
  },

  podcast: {
    etiqueta: 'V-Podcast',
    titular: { a: 'Real business', b: 'conversations.' },
    subtitulo: 'All the content, in one place',
    ultimoEpisodio: 'Latest episode',
    verEpisodio: 'Watch episode',
    verTodos: 'See all episodes',
    masEpisodios: 'More episodes',
    deQueHabla: 'What this episode covers',
    conclusiones: 'Key takeaways',
    capitulos: 'Chapters',
    transcripcion: 'Transcript',
    temas: 'Topics covered',
    sinContenido: 'This episode has no written content yet',
    sinContenidoCuerpo:
      'With no summary, takeaways or FAQs, this page gives Google and AI engines nothing to read. Fill it in from the panel so it starts ranking.',
    completarPanel: 'Complete it in the panel',
    audio: 'Audio episode',
    descargar: 'Download the episode',
    sinMedio: 'No media linked',
    sinVideo: 'No video linked',
    reproducir: 'Play',
    episodio: 'Episode',
  },

  blog: {
    etiqueta: 'Blog',
    subtitulo: 'From the field',
    masReciente: 'Latest',
    leerArticulo: 'Read article',
    masArticulos: 'More articles',
    sinContenido: 'This article has no content yet',
    escribirPanel: 'Write it in the panel',
    sinContenidoCuerpo:
      'With no body text, the page gives Google and AI engines nothing to read. Fill it in from the panel so it starts ranking.',
    porAutor: 'By',
  },

  instagram: {
    etiqueta: 'On the street',
    titular: { a: 'What we are', b: 'activating right now.' },
  },

  contacto: {
    etiqueta: 'Ready to create contrast?',
    titular: { a: "Let's make something", b: 'people notice.' },
    escribenos: 'Email us',
    whatsapp: 'WhatsApp',
    hablemosAhora: 'Chat with us now',
    agendarReunion: 'Book a meeting',
    agendaUnaReunion: 'Book a meeting',
    agendarWhatsapp: 'Book via WhatsApp',
    oWhatsapp: 'Or message us on WhatsApp',
    prefieresWhatsapp: 'Prefer WhatsApp?',
    cargandoCalendario: 'Loading calendar…',
    treintaMinutos:
      '30 minutes to understand your goal and tell you whether we can help. No corporate deck involved.',
    activamosTuMarca: 'Shall we activate your brand?',
    activamosEnNicho: 'Shall we activate your brand in {nicho}?',
    ctaLugar: 'We design and run measurable brand experiences in {lugar} and across the country.',
    ctaPais: 'We design and run measurable brand experiences across Colombia and Latin America.',
  },

  footer: {
    empezamos: 'Shall we start?',
    titular: { a: 'Tell us which brand', b: 'you want to activate.' },
    contenido: 'Content',
    laAgencia: 'The agency',
    resultados: 'Results',
    contacto: 'Contact',
  },

  faq: {
    etiqueta: 'Frequently asked',
    titular: { a: 'What people', b: 'ask us most.' },
  },

  comun: {
    inicio: 'Home',
    rutaNavegacion: 'Breadcrumb',
    volverInicio: 'Back to home',
  },

  notFound: {
    etiqueta: 'Error 404',
    titulo: 'Page not found',
    titular: { a: 'This page', b: 'no longer exists.', c: 'The rest does.' },
    cuerpo:
      'The link may come from the old site, or the address may be misspelled. Here is where to go next.',
    verPodcast: 'See the V-Podcast',
    nuestrosNichos: 'Our sectors',
  },

  error: {
    etiqueta: 'Something broke',
    titular: { a: 'We could not', b: 'load this page.' },
    cuerpo:
      "This one is on us, not you. Try again; if it keeps happening, write to us and we'll look into it.",
    reintentar: 'Try again',
    irInicio: 'Go to home',
    avisarnos: 'Report it',
    referencia: 'Error reference:',
  },
}

const DICCIONARIOS: Record<Locale, Dictionary> = { es, en }

export function getDictionary(locale: Locale): Dictionary {
  return DICCIONARIOS[locale]
}

/** Sustituye {marcadores} en una plantilla del diccionario. */
export function fill(plantilla: string, valores: Record<string, string | number>): string {
  return plantilla.replace(/{(w+)}/g, (_, k) => String(valores[k] ?? `{${k}}`))
}
