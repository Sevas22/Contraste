/**
 * Cinco artículos del blog sacados del contenido propio de Contraste.
 *
 * Fuentes (revisadas el 2026-09-15):
 *   · Transcripciones de Conexión Podcast en YouTube, canal "Conexión real podcast."
 *     - 000 De cero a una vida con propósito (Óscar Arroyave y Vivi)
 *     - 001 Mercado inmobiliario, con Andrés Giraldo
 *     - 002 Invertir en propiedad raíz, con Santiago Cardona (Grupo REDI)
 *   · Publicaciones de @agencia_contraste en Instagram (nov 2025 – sep 2026).
 *
 * Reglas con las que están escritos:
 *   · Toda cifra va atribuida a quien la dijo en el episodio. No son datos
 *     verificados por la agencia y el texto no los presenta como tales.
 *   · Los casos son los que la propia agencia publicó, con lo que dice su
 *     publicación. No se añaden resultados que no aparezcan allí.
 *   · Las keywords salen de Semrush (búsquedas en Colombia): "btl", "que es btl",
 *     "activaciones de marca", "publicidad btl", "estrategias btl"…
 *
 * Se cargan con `node db/seed-posts-conexion.mjs` (ver ese archivo).
 */

const L = {
  // V-Podcast en el sitio
  ep0: '/v-podcast/de-cero-a-una-vida-con-proposito',
  ep1: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
  ep2: '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
  // Los mismos episodios en YouTube
  ep0yt: 'https://www.youtube.com/watch?v=64dXCld4I8o',
  ep1yt: 'https://www.youtube.com/watch?v=CDTOJja6R9U',
  ep2yt: 'https://www.youtube.com/watch?v=nImG23dqoso',
  // Redes
  ig: 'https://www.instagram.com/agencia_contraste/',
  igPodcast: 'https://www.instagram.com/conexionrealpodcast/',
  futbol: 'https://www.instagram.com/agencia_contraste/reel/DSfRC4aDgrj/',
  datos: 'https://www.instagram.com/agencia_contraste/reel/DSkg-apjnKg/',
  jerico: 'https://www.instagram.com/agencia_contraste/reel/DRmuczyjgt7/',
  lanzamiento: 'https://www.instagram.com/agencia_contraste/reel/DXfmY0yDOP2/',
  tropa: 'https://www.instagram.com/agencia_contraste/reel/DV96S1_DOcj/',
  yarumal: 'https://www.instagram.com/agencia_contraste/reel/DVuaDhejFW4/',
  venecia: 'https://www.instagram.com/agencia_contraste/reel/DVGsV7ajkwu/',
  clipSantiago: 'https://www.instagram.com/agencia_contraste/reel/DU8SfldjtGV/',
  chirimiaFotos: 'https://www.instagram.com/agencia_contraste/p/DTsdBH6DvgB/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  // Landings de nicho
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  // Blog
  queEsBtl: '/blog/que-es-btl-significado-y-ejemplos',
  atlBtl: '/blog/atl-y-btl-diferencias-y-actividades',
  ejemplos: '/blog/activaciones-de-marca-ejemplos-btl-antioquia',
  centros: '/blog/activaciones-btl-centros-comerciales-y-ferias',
  estrategias: '/blog/estrategias-btl-activaciones-con-resultados',
  agencia: '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
  salaVentas: '/blog/sala-de-ventas-por-que-la-primera-visita-decide-el-cierre',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'que-es-btl-significado-y-ejemplos',
    title: 'Qué es BTL: significado, ejemplos y cómo funciona',
    excerpt:
      'BTL es la parte del marketing que no sale en televisión: se vive en la calle, en el punto de venta y en los eventos. Qué significa, cómo funciona y ejemplos reales en Colombia.',
    metaDescription:
      'BTL significa below the line: acciones de marca en contacto directo con el público. Qué es BTL en marketing, tipos de acciones y ejemplos reales.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Medellín',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'qué es BTL',
      'BTL significado',
      'qué es BTL en marketing',
      'BTL marketing',
      'publicidad BTL',
      'BTL ejemplos',
    ],
    body: `**BTL** significa below the line, «debajo de la línea». En marketing se llama así a las acciones que llevan una marca al contacto directo con las personas —activaciones, degustaciones, impulso en punto de venta, eventos, stands— en lugar de hablarle a todo el mundo a la vez desde un medio masivo. Si la publicidad tradicional busca que te enteres de una marca, el BTL busca que la pruebes, la vivas y la recuerdes.

## Qué significa BTL y de dónde viene el nombre

La expresión viene de la forma en que las agencias organizaban sus presupuestos. Por encima de la línea (above the line, ATL) quedaban los medios masivos: televisión, radio, prensa y vallas. Por debajo quedaba todo lo demás: las acciones directas, segmentadas y más fáciles de medir.

Esa línea ya no aparece en ninguna factura, pero la distinción se quedó porque sigue siendo útil. No es lo mismo pagar para que muchas personas vean un mensaje que diseñar el momento en que una persona concreta interactúa con la marca.

## Qué es BTL en marketing

En la práctica, el marketing BTL tiene cuatro rasgos:

- **Contacto directo**: la marca llega a la persona en un lugar y un momento concretos.
- **Segmentación**: se elige a quién hablarle —un municipio, un tipo de establecimiento, el público de una feria— en vez de a todos.
- **Participación**: la persona prueba, juega, pregunta o comparte; no se limita a mirar.
- **Medición**: como el contacto es directo, se pueden contar pruebas de producto, interacciones, datos captados y ventas en el punto.

Por eso la publicidad BTL rara vez es un anuncio. Es una experiencia con un objetivo comercial detrás.

## Tipos de acciones BTL

- **Activaciones de marca**: experiencias en calle, plazas, centros comerciales o eventos donde el público interactúa con la marca. Hay siete casos reales en [Activaciones de marca: 7 ejemplos reales de BTL en Antioquia](${L.ejemplos}).
- **Degustaciones y sampling**: prueba de producto, clave en bebidas y consumo masivo.
- **Impulso en punto de venta**: promotoras y promotores que recomiendan el producto frente al lineal.
- **Trade marketing**: exhibición, material POP y acciones con el canal para que el producto rote.
- **Eventos y lanzamientos**: presentar un producto como una experiencia y no como un comunicado.
- **Stands y ferias**: espacios donde la marca capta y califica prospectos. Lo desarrollamos en [Activaciones BTL en centros comerciales y ferias de vivienda](${L.centros}).

## Ejemplos de BTL en Colombia

Tres activaciones recientes de Contraste en Antioquia, publicadas en el [Instagram de la agencia](${L.ig}):

- **Chirimía de los que saben**: Licor Esencial de Ron Viejo de Caldas recorrió Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras, equipo logístico y una camioneta con la marca. Además de la degustación responsable, acompañó a los clientes del comercio de cada municipio. [Ver el recorrido en Instagram](${L.chirimia}).
- **La Tropa Aguardiente Amarillo**: música, energía e interacción en calles y puntos de venta para activar el consumo justo donde se decide. [Ver la Tropa en Instagram](${L.tropa}).
- **Venecia, Antioquia**: artistas en vivo, degustación y un montaje de branding para que Licor Esencial no sólo se viera, sino que se sintiera. [Ver la activación en Instagram](${L.venecia}).

En los tres casos la marca no compra un espacio para aparecer: construye el momento en que la gente la prueba.

## Por qué el BTL está ganando peso

Hay dos cambios en el consumidor que ayudan a entenderlo, y los dos salieron en [Conexión Podcast](/v-podcast), el videopodcast de Óscar Arroyave, fundador de Contraste.

El primero es la atención. En el [episodio con Andrés Giraldo](${L.ep1}), economista y exdirector de estudios económicos de Camacol Antioquia, se habló de que hace diez años bastaban unas 16 exposiciones para que alguien conectara con una marca y que hoy se habla de más de 32. Cuantos más mensajes compiten por la misma persona, más vale el contacto que sí consigue su atención completa.

El segundo es el gasto en experiencias. Según los datos que compartió Giraldo en ese episodio, el entretenimiento fue la rama de la economía colombiana que más creció entre 2019 y 2025, alrededor de un 115 %. La gente está destinando tiempo y dinero a vivir cosas. Una marca que se integra a esa vivencia —un concierto en la plaza, un partido, una degustación con música— entra por una puerta que el consumidor ya abrió.

Óscar lo resume con una palabra que la agencia lleva en las camisetas de sus activaciones: conectar. En el [episodio cero del podcast](${L.ep0}) explica que las redes sirven para difundir, pero que la conexión real sigue pasando por sentir la voz y la cara del otro.

## Cómo saber si una acción BTL funcionó

Un evento sin medición es sólo un gasto. Así lo plantea Contraste en [este reel sobre presupuesto y retorno](${L.datos}): las marcas ya no buscan activaciones, buscan retorno y decisiones basadas en datos.

Antes de producir, define qué vas a medir —pruebas, interacciones, prospectos calificados, unidades vendidas— y con qué lo vas a comparar. Las métricas de cada sector están en las landings de [bebidas alcohólicas](${L.bebidas}), [consumo masivo](${L.consumo}) y [desarrollo inmobiliario](${L.inmobiliario}), y las decisiones que convierten una activación en resultados, en [Estrategias BTL](${L.estrategias}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 001: ¿Hacia dónde va el mercado inmobiliario en Colombia? (YouTube)](${L.ep1yt})
- [Conexión Podcast, episodio 000: De cero a una vida con propósito (YouTube)](${L.ep0yt})
- [Instagram de Contraste Agencia, @agencia_contraste](${L.ig})`,
    faqs: [
      {
        q: '¿En qué se diferencia la publicidad BTL de la tradicional para una marca de licores?',
        a: 'La publicidad tradicional compra medios para que mucha gente vea la marca; la publicidad BTL la lleva a donde se elige el trago: la góndola, la tienda de barrio o la barra. En licores la diferencia pesa más, porque la pauta masiva está restringida y el punto de venta permite ofrecer la degustación sólo a mayores de edad, con alguien que resuelve la duda en el momento.',
      },
      {
        q: '¿Qué significa BTL?',
        a: 'BTL significa below the line, «debajo de la línea». En marketing designa las acciones de marca en contacto directo con el público, como activaciones, degustaciones, impulso en punto de venta, eventos y stands, por oposición a la publicidad en medios masivos, que se conoce como ATL.',
      },
      {
        q: '¿Qué es BTL en marketing?',
        a: 'Es la estrategia de llevar una marca a un lugar y un momento concretos para que las personas la prueben o interactúen con ella. Se caracteriza por el contacto directo, la segmentación del público, la participación y la posibilidad de medir resultados como pruebas de producto, datos captados o ventas.',
      },
      {
        q: '¿Cuál es un ejemplo de BTL?',
        a: 'Una degustación con promotoras en un punto de venta o una activación en la plaza de un municipio. Por ejemplo, Contraste llevó Licor Esencial de Ron Viejo de Caldas a Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras y degustación responsable.',
      },
      {
        q: '¿Qué diferencia hay entre BTL y ATL?',
        a: 'El ATL usa medios masivos, como televisión, radio, prensa o vallas, para llegar a mucha gente a la vez y construir notoriedad. El BTL usa acciones directas y segmentadas, como activaciones, degustaciones o eventos, para que la gente pruebe o interactúe con la marca, y permite medir los resultados con más precisión.',
      },
      {
        q: '¿Cuánto cuesta una campaña BTL?',
        a: 'Depende del número de puntos, ciudades y días, del equipo de promotores y de la producción que requiera la experiencia. Por eso una agencia BTL seria cotiza después de conocer el objetivo, el público y el territorio: sin esa información cualquier cifra sería una suposición.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'atl-y-btl-diferencias-y-actividades',
    title: 'ATL y BTL: diferencias, actividades y cuándo usar cada uno',
    excerpt:
      'El ATL da alcance y el BTL da contacto. La pregunta ya no es cuál elegir, sino cómo combinarlos cuando se necesitan más de 30 exposiciones para que alguien conecte con una marca.',
    metaDescription:
      'Diferencias entre ATL y BTL, qué actividades pertenecen a cada uno, qué es TTL y cómo repartir el presupuesto, con ideas del Conexión Podcast.',
    coverUrl: 'https://i.ytimg.com/vi/CDTOJja6R9U/maxresdefault.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'inmobiliario'],
    keywords: [
      'ATL y BTL',
      'actividades ATL y BTL',
      'diferencia entre ATL y BTL',
      'activaciones BTL y ATL',
      'publicidad BTL',
      'estrategia TTL',
    ],
    body: `ATL y BTL son las dos grandes formas de llevar una marca al público. **ATL** (above the line) usa medios masivos para que mucha gente vea un mensaje. **BTL** (below the line) usa acciones directas y segmentadas para que una persona concreta pruebe, participe o compre. Una construye notoriedad; la otra, experiencia y conversión. Casi ninguna marca que crece usa sólo una de las dos.

## Qué es ATL

El marketing ATL agrupa los medios de alcance masivo: televisión, radio, prensa, vallas y buena parte de la pauta digital orientada a alcance. Su fuerza es la cobertura, porque pone el nombre de la marca frente a muchas personas en poco tiempo. Su límite es que la relación va en una sola dirección y resulta difícil saber qué hizo cada persona después de ver el anuncio.

## Qué es BTL

El marketing BTL lleva la marca al contacto directo: activaciones, degustaciones, impulso en punto de venta, eventos, lanzamientos, stands y ferias. Su fuerza es la participación y la medición. Explicamos el término a fondo en [Qué es BTL: significado, ejemplos y cómo funciona](${L.queEsBtl}).

## Diferencias entre ATL y BTL

- **Objetivo**: el ATL busca notoriedad y recordación a gran escala; el BTL busca prueba, interacción, prospectos y venta.
- **Público**: el ATL habla a audiencias amplias; el BTL elige un territorio, un canal o un segmento concreto.
- **Relación**: el ATL comunica en una sola vía; en el BTL la persona responde, prueba y pregunta.
- **Medición**: el ATL se mide en alcance e impresiones; el BTL permite contar pruebas, datos captados y unidades vendidas.
- **Tiempo**: el ATL construye marca a largo plazo; el BTL suele mover indicadores en el mismo momento de la acción.

## Actividades ATL y actividades BTL

Actividades ATL habituales:

- Comerciales de televisión y cuñas de radio.
- Avisos en prensa y revistas.
- Vallas y publicidad exterior de gran formato.
- Pauta digital masiva orientada a alcance.

Actividades BTL habituales:

- Activaciones de marca en calle, plazas, centros comerciales y eventos.
- Degustaciones y sampling.
- Impulso y promotoría en punto de venta.
- Material POP y acciones de trade marketing.
- Lanzamientos, stands, ferias y eventos privados.

## Qué es TTL y por qué ya no se trata de elegir

TTL (through the line) es la integración de los dos: una campaña que usa medios masivos para generar notoriedad y acciones BTL para convertir esa notoriedad en prueba y venta. Hoy es lo habitual, y hay razones concretas.

En el [episodio 001 de Conexión Podcast](${L.ep1}), Andrés Giraldo, economista y exdirector de estudios económicos de Camacol Antioquia, recordó que hace diez años una persona necesitaba ver una marca unas 16 veces para conectar con ella y que hoy se habla de más de 32. Con tanta competencia por la atención, el alcance solo no basta: hace falta un momento en que la persona se detenga.

Giraldo añadió otra idea útil para cualquier plan: segmentar por hábitos generacionales. La atención que se consigue de un baby boomer, y el tiempo que dedica a un mensaje, no se parecen a los de alguien de la generación Z. El mismo presupuesto rinde distinto según a quién se le hable y por qué canal.

## Cómo repartir el presupuesto entre ATL, digital y BTL

No existe una proporción universal. En el [episodio 002](${L.ep2}), Santiago Cardona, gerente general de Grupo REDI y profesor de posgrados en EAFIT, contó que en su empresa las redes sociales ya se llevan entre el 50 % y el 70 % del presupuesto de mercadeo, según el proyecto. Pero dejó claro que el mercadeo físico sigue siendo importante: cuando venden condominios destinan una parte relevante a experiencias en el sitio, porque hay productos que la gente necesita tocar antes de decidir.

De esa conversación salen tres criterios prácticos:

- **Tipo de compra**: cuanto más consultiva y costosa es la decisión, más peso necesita la experiencia presencial.
- **Etapa de la marca**: un lanzamiento necesita alcance para darse a conocer y BTL para generar las primeras pruebas; una marca ya conocida puede invertir más en punto de venta y rotación.
- **Lugar de la decisión**: si la compra se decide frente al lineal o dentro del establecimiento, el BTL tiene que estar ahí.

Óscar Arroyave, fundador de Contraste, lo resume en el [episodio cero](${L.ep0}): las redes difunden, pero conectar sigue siendo algo de la vida real. La mejor combinación usa cada canal para lo que hace mejor y hace que se alimenten entre sí: la activación genera contenido y el contenido lleva gente a la siguiente activación.

## Un ejemplo de integración

En diciembre de 2025, Contraste organizó un partido de fútbol entre influencers y leyendas del Once Caldas campeón de la Copa Libertadores, con Ron Viejo de Caldas, Aguardiente Amarillo de Manzanares y cócteles de la marca. La experiencia fue BTL —la gente jugó, compitió y probó—, pero el contenido que produjo circuló en redes y amplió su alcance mucho más allá de la cancha. [Ver el partido en Instagram](${L.futbol}).

Otros seis casos, con lo que se hizo en cada uno, están en [Activaciones de marca: 7 ejemplos reales de BTL en Antioquia](${L.ejemplos}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 001, con Andrés Giraldo (YouTube)](${L.ep1yt})
- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Instagram de Conexión Podcast, @conexionrealpodcast](${L.igPodcast})
- [Instagram de Contraste Agencia, @agencia_contraste](${L.ig})`,
    faqs: [
      {
        q: '¿Qué es mejor, ATL o BTL?',
        a: 'Ninguno es mejor por sí mismo, porque cumplen funciones distintas. El ATL da alcance y notoriedad; el BTL convierte esa notoriedad en prueba, interacción y venta. Las campañas que mejor funcionan combinan los dos en una estrategia TTL, según el tipo de compra y el lugar donde se toma la decisión.',
      },
      {
        q: '¿Las redes sociales son ATL o BTL?',
        a: 'Depende de cómo se usen. La pauta masiva en redes funciona como un medio de alcance, más cercano al ATL. Las acciones digitales segmentadas y con interacción directa se acercan al BTL. Lo habitual hoy es combinarlas: la activación física genera contenido que después se distribuye en redes.',
      },
      {
        q: '¿Qué es TTL en marketing?',
        a: 'TTL significa through the line. Es la estrategia que integra medios masivos (ATL) y acciones directas (BTL) en una misma campaña, para que la notoriedad que genera uno se convierta en prueba y venta gracias al otro.',
      },
      {
        q: '¿Qué actividades son BTL?',
        a: 'Las activaciones de marca, las degustaciones y el sampling, el impulso y la promotoría en punto de venta, el material POP y el trade marketing, los lanzamientos de producto, los stands, las ferias y los eventos privados.',
      },
      {
        q: '¿Una feria es ATL o BTL?',
        a: 'Es BTL. La marca está en contacto directo con un público concreto, puede captar y calificar prospectos en el sitio y medir cuántos visitantes terminan en una cita o una compra.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-de-marca-ejemplos-btl-antioquia',
    title: 'Activaciones de marca: 7 ejemplos reales de BTL en Antioquia',
    excerpt:
      'Un partido con leyendas del Once Caldas, una chirimía que recorrió cuatro municipios y un show en Yarumal. Siete activaciones BTL reales y qué se puede aprender de cada una.',
    metaDescription:
      'Siete activaciones de marca reales en Antioquia: fútbol, chirimía, conciertos y trade marketing con Ron Viejo de Caldas y Aguardiente Amarillo.',
    coverUrl: '/media/nichos/bebidas-alcoholicas.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'activaciones de marca',
      'activaciones BTL',
      'ejemplos de activaciones BTL',
      'activaciones BTL creativas',
      'activaciones BTL interactivas',
      'BTL ejemplos',
    ],
    body: `Una **activación de marca** es una experiencia diseñada para que las personas interactúen con un producto en un lugar y un momento concretos: lo prueban, participan, lo comparten y lo recuerdan. Es la pieza central del marketing BTL. Para entenderla sirve más ver casos que leer definiciones, así que aquí van siete activaciones reales que Contraste ejecutó en Antioquia y publicó en su [Instagram](${L.ig}).

## 1. Fútbol con leyendas del Once Caldas

**Marcas**: Ron Viejo de Caldas y Aguardiente Amarillo de Manzanares.
**Qué se hizo**: un partido entre influencers y leyendas del Once Caldas campeón de la Copa Libertadores, con cócteles de la marca como el mojito y el cuba libre.
**Por qué funciona**: el fútbol ya reúne emoción y conversación. La marca se integra al juego en vez de interrumpirlo, y los participantes crean contenido que circula por su cuenta.
[Ver el partido en Instagram](${L.futbol})

## 2. RONDANDOS en el parque principal de Jericó

**Marcas**: Ron Viejo de Caldas y Aguardiente Amarillo, con los aliados de la marca en Antioquia.
**Qué se hizo**: el parque principal de Jericó se convirtió en una plataforma de marca con cantantes, animación y dinámicas con el público. En una sola noche activó a cientos de personas.
**Por qué funciona**: lleva la marca a donde el consumidor ya está —la calle, el fin de semana— y la asocia a un buen momento en su propio pueblo.
[Ver la activación en Instagram](${L.jerico})

## 3. Chirimía de los que saben: cuatro municipios, una tropa

**Marca**: Licor Esencial de Ron Viejo de Caldas.
**Qué se hizo**: un recorrido por Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras, equipo logístico y una camioneta rodando con la marca por cada municipio.
**Por qué funciona**: junta tres cosas que rara vez van de la mano: presencia constante en la calle, degustación responsable y acompañamiento directo a los clientes del comercio. La música tradicional crea una conexión emocional con la cultura local.
[Ver el recorrido](${L.chirimia}) · [Ver las fotos](${L.chirimiaFotos})

## 4. Venecia, Antioquia: artistas, degustación y branding

**Marca**: Licor Esencial de Ron Viejo de Caldas.
**Qué se hizo**: una experiencia completa con artistas en vivo, degustación, interacción con el público y un montaje de branding pensado para que la marca se sintiera, no sólo se viera.
**Por qué funciona**: cuando una persona prueba y disfruta un producto en un momento real, la recordación y la intención de compra suben de forma natural.
[Ver la activación en Instagram](${L.venecia})

## 5. Yarumal: una activación con objetivos de trade marketing

**Marca**: Aguardiente Amarillo de Manzanares.
**Qué se hizo**: un show principal con artistas populares para generar tráfico y permanencia, impulso con promotoras para recomendar el producto, un montaje de visibilidad dentro del establecimiento y presencia de marca en el momento de consumo.
**Por qué funciona**: cada elemento responde a un objetivo comercial. Lo que se buscaba no era sólo recordación, sino que el producto rotara en el punto.
[Ver la activación en Instagram](${L.yarumal})

## 6. La Tropa Aguardiente Amarillo

**Marca**: Aguardiente Amarillo.
**Qué se hizo**: una tropa que se tomó calles y puntos de venta con música, energía e interacción.
**Por qué funciona**: es una activación móvil. En vez de esperar al público en un stand, la marca va a buscarlo y convierte cada parada en un momento de marca.
[Ver la Tropa en Instagram](${L.tropa})

## 7. Un lanzamiento que se vive: Ron Viejo de Caldas

**Marca**: Ron Viejo de Caldas.
**Qué se hizo**: un lanzamiento con DJ en vivo, catering y una ambientación pensada para que cada detalle transmitiera la esencia de la marca.
**Por qué funciona**: un lanzamiento no se anuncia, se vive. El invitado no sólo conoce el producto: lo prueba en el ambiente que la marca quiere asociarle.
[Ver el lanzamiento en Instagram](${L.lanzamiento})

## Qué tienen en común estas activaciones BTL

- **Territorio**: ocurren donde el consumidor vive y compra, no en un lugar neutro.
- **Cultura local**: la música, el fútbol, la chirimía y la fiesta del pueblo son la puerta de entrada.
- **Prueba de producto**: la degustación responsable está en el centro de la experiencia.
- **Canal**: el comercio y los aliados de la marca participan, no sólo el consumidor final.
- **Contenido**: cada experiencia se graba y se comparte, así que su alcance sigue después del evento.

## Cómo diseñar una activación creativa e interactiva

Una activación creativa no es la más llamativa, sino la que le da a la gente algo que hacer. Antes de producir, conviene responder cinco preguntas:

- ¿Qué tiene que pasar para que la activación se considere un éxito: pruebas, ventas, datos o contenido?
- ¿Dónde y cuándo se toma la decisión de compra de este producto?
- ¿Qué va a hacer la persona, además de mirar?
- ¿Qué parte de la cultura local convierte la marca en un plan y no en una interrupción?
- ¿Cómo se va a medir y quién recibe el reporte?

Si la marca es de licor, la normativa entra desde el diseño: permisos del municipio y del establecimiento, horarios y degustación sólo para mayores de edad. Lo explicamos en la landing de [marketing BTL para bebidas](${L.bebidas}). En consumo masivo la clave está en el punto de venta: ver [marketing BTL para consumo masivo](${L.consumo}). Y para pasar de la idea al plan, las seis decisiones de [Estrategias BTL: cómo convertir una activación en resultados](${L.estrategias}).

## Fuentes

Todas las activaciones de este artículo están publicadas en el Instagram de Contraste Agencia, [@agencia_contraste](${L.ig}), con vídeo o fotos de cada una.`,
    faqs: [
      {
        q: '¿Qué es una activación de marca?',
        a: 'Es una experiencia diseñada para que las personas interactúen con un producto en un lugar y un momento concretos: lo prueban, participan y lo recuerdan. Es la acción central del marketing BTL y puede hacerse en calles, plazas, puntos de venta, centros comerciales o eventos.',
      },
      {
        q: '¿Qué es una activación BTL interactiva?',
        a: 'Es una activación en la que el público hace algo en vez de sólo mirar: juega un partido, participa en una dinámica, prueba el producto o crea contenido. La interacción alarga el contacto con la marca y aumenta la probabilidad de que la persona la recuerde y la comparta.',
      },
      {
        q: '¿Qué hace creativa a una activación BTL?',
        a: 'Que le dé a la gente una razón para participar conectada con su cultura y con su momento. Un partido con leyendas del fútbol o una chirimía que recorre los municipios funcionan porque convierten la marca en un plan, no porque sean más llamativos.',
      },
      {
        q: '¿Se pueden hacer activaciones de marca en municipios pequeños?',
        a: 'Sí, y suelen funcionar muy bien porque la marca se integra a la vida del pueblo. Contraste ha hecho activaciones en Jericó, Venecia, Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros, en Antioquia.',
      },
      {
        q: '¿Cómo se hace una degustación de licor responsable en una activación?',
        a: 'Ofreciendo el producto sólo a mayores de edad, en porciones controladas, con promotoras entrenadas en el producto y en consumo responsable, y con los permisos del municipio y del establecimiento gestionados antes del montaje.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-centros-comerciales-y-ferias',
    title: 'Activaciones BTL en centros comerciales y ferias de vivienda',
    excerpt:
      'El centro comercial dejó de ser sólo un lugar para comprar y la feria dejó de ser sólo un stand. Lo que contó Santiago Cardona en Conexión Podcast sobre vender vivienda con experiencias.',
    metaDescription:
      'Cómo usar activaciones BTL en centros comerciales y ferias para vender proyectos de vivienda: experiencias, showrooms y prospectos calificados.',
    coverUrl: 'https://i.ytimg.com/vi/nImG23dqoso/maxresdefault.jpg',
    location: 'Medellín',
    niches: ['inmobiliario'],
    keywords: [
      'activaciones BTL en centros comerciales',
      'activaciones en ferias de vivienda',
      'marketing inmobiliario experiencial',
      'experiencias en centros comerciales',
      'leads inmobiliarios',
    ],
    body: `Las **activaciones BTL en centros comerciales y ferias** funcionan cuando dejan de ser un stand con folletos y se convierten en una experiencia: algo que la persona toca, prueba o vive antes de decidir. En el sector inmobiliario es todavía más cierto, porque la compra es grande, consultiva y emocional. Este artículo recoge lo que Santiago Cardona —gerente general de Grupo REDI, ingeniero civil y profesor de posgrados en EAFIT— le contó a Óscar Arroyave en el [episodio 002 de Conexión Podcast](${L.ep2}).

## El centro comercial ya no es sólo para comprar

Cardona lo describió así: antes los centros comerciales se hacían como puntos de venta y hoy son lugares de experiencias y diversión. La gente va a comerse un helado, a ver una prenda, y muchas veces termina comprándola por internet porque le sale con descuento. Citó incluso una estadística según la cual un centro comercial debería llegar a un 60 % de experiencia y dejar como máximo un 40 % para almacenes.

Para una marca eso cambia la pregunta. Ya no se trata sólo de tener un punto donde exhibir el producto, sino de aprovechar que el público llega con tiempo y con ganas de vivir algo.

## Qué activaciones BTL funcionan en un centro comercial

- **Demostraciones interactivas**: la persona usa el producto en vez de escuchar cómo funciona.
- **Degustaciones y sampling**: prueba inmediata en un lugar con mucho tráfico.
- **Espacios de experiencia de producto**: en vivienda, un showroom de acabados donde se tocan pisos, texturas de muros y mesones.
- **Realidad virtual y aumentada**: para recorrer un proyecto que todavía no existe.
- **Dinámicas con registro**: juegos o retos que, además de entretener, captan los datos de quien tiene interés real.

La activación tiene que convivir con las reglas del centro comercial —horarios, espacio negociado, montaje y seguridad—, así que conviene resolverlas antes de diseñar la mecánica.

## Ferias de vivienda: de la visita al prospecto calificado

Óscar estuvo en la feria de la vivienda de La Lonja y lo contó en el [episodio 001](${L.ep1}): se metió entre el público para escuchar qué decía la gente, y lo que más se repetía era que el metro cuadrado estaba caro. En El Poblado, recordó, en 2019 se conseguía por 8 o 9 millones de pesos, y en la feria vio proyectos de 17 a 21 millones. Una feria es, antes que nada, un lugar para escuchar objeciones.

También es un lugar para captar prospectos, y ahí conviene tener expectativas realistas. Cardona explicó cómo se mueve el embudo en su compañía: un proyecto puede recibir entre 500 y 1.000 prospectos al mes, y la conversión de quien llega medio interesado a quien compra suele estar entre el 0,5 % y el 2 %. Según su experiencia, cerca del 70 % de esos contactos no tenía un interés real. Por eso calificar en el sitio vale tanto como captar: saber para qué busca vivienda la persona, en qué plazo y con qué capacidad de pago.

Lo que pasa después de la feria cuenta igual. Con el resto de la base, contó Cardona, se hace remarketing en cada lanzamiento para que la persona siga identificando la marca. Y si el prospecto llega a la sala de ventas, la primera visita pesa mucho: lo explicamos en [Sala de ventas: por qué la primera visita decide](${L.salaVentas}).

## Showrooms, realidad virtual y experiencias en el sitio

En vivienda la gente quiere tocar la pared, le dijo Óscar a Cardona durante la conversación. Él coincidió: hay productos inmobiliarios que siguen necesitando una sala de negocios porque su venta es muy experiencial. Pero la tecnología y la creatividad abren alternativas:

- **Realidad virtual y realidad aumentada**, que en su opinión llegaron para quedarse.
- **Centros de experiencia sin apartamento modelo**, donde se muestran los materiales reales: el piso, la textura de los muros, el mesón de la cocina.
- **Experiencias en el lote**: en condominios campestres, su equipo lleva a los interesados al terreno, les marca el sitio y les ayuda a imaginar la casa. Incluso han pensado en un picnic de experiencia.

Cardona también dejó una idea que la agencia recogió en [este clip del episodio](${L.clipSantiago}): en un mercado donde muchos ofrecen lo mismo, la diferencia está en la experiencia que vive el cliente antes de comprar.

## A quién le estás hablando

La experiencia sólo funciona si está pensada para el comprador real, y ese comprador cambió. Andrés Giraldo señaló en el episodio 001 que hoy quien compra vivienda puede ser una persona sola, una pareja con mascotas o una familia multiespecie, y que entre 2023 y 2024 se conformaron en Colombia unos 225.000 hogares unipersonales.

Cardona sumó otro público que empieza a pesar: la comunidad plateada, personas mayores de 55 o 60 años —y cada vez más desde los 40— con hijos grandes, más expectativa de vida y dinero disponible para invertir y disfrutar. Una activación en un centro comercial pensada para ellos no se parece a una hecha para la familia tradicional de hace diez años.

## Qué medir en una activación inmobiliaria

- Personas que interactuaron con la experiencia.
- Prospectos captados y, de ellos, cuántos cumplen el perfil de compra.
- Visitas agendadas y visitas realizadas.
- Cierres atribuibles a la activación y costo por prospecto calificado.

Cómo trabajamos cada punto está en la landing de [marketing BTL inmobiliario](${L.inmobiliario}). Si todavía estás definiendo qué papel tiene cada canal, revisa [ATL y BTL: diferencias, actividades y cuándo usar cada uno](${L.atlBtl}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Clip del episodio en Instagram: qué experiencias atraen compradores](${L.clipSantiago})
- [Conexión Podcast, episodio 001, con Andrés Giraldo (YouTube)](${L.ep1yt})`,
    faqs: [
      {
        q: '¿Qué es una activación BTL en un centro comercial?',
        a: 'Es una experiencia de marca montada en un centro comercial para que el público pruebe, use o viva un producto, aprovechando el tráfico y el tiempo libre de los visitantes. Puede ser una demostración, una degustación, un espacio de experiencia o una dinámica con registro de datos.',
      },
      {
        q: '¿Qué se necesita para hacer una activación en un centro comercial?',
        a: 'Un objetivo medible, la autorización y las condiciones de la administración (espacio, horarios, montaje y seguridad), una mecánica que invite a participar sin bloquear el paso y personal entrenado para atender y calificar a los interesados.',
      },
      {
        q: '¿Sirven las ferias de vivienda para vender?',
        a: 'Sí, si se llega con una mecánica de captación y calificación en el sitio y con un seguimiento acordado con el equipo comercial. Según Santiago Cardona, de Grupo REDI, la conversión de prospectos a compra en proyectos inmobiliarios suele estar entre el 0,5 % y el 2 %, así que la calidad del prospecto importa más que el volumen.',
      },
      {
        q: '¿La realidad virtual reemplaza a la sala de ventas?',
        a: 'No del todo. Santiago Cardona considera que la realidad virtual y la aumentada llegaron para quedarse, pero que hay productos inmobiliarios cuya venta es muy experiencial y siguen necesitando un espacio físico, al menos un showroom donde el comprador pueda tocar los acabados.',
      },
      {
        q: '¿Cómo se mide una activación en una feria inmobiliaria?',
        a: 'Por prospectos calificados y visitas agendadas, no por volantes entregados ni por visitantes del stand. Lo útil es registrar cuántas personas cumplen el perfil de compra, cuántas agendan visita al proyecto y cuántas terminan en un cierre.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'estrategias-btl-activaciones-con-resultados',
    title: 'Estrategias BTL: cómo convertir una activación en resultados',
    excerpt:
      'Un evento sin medición es sólo un gasto. Seis decisiones que separan una estrategia BTL que mueve el negocio de una activación que sólo se ve bien en fotos.',
    metaDescription:
      'Seis estrategias BTL para que una activación genere ventas y datos, no sólo visibilidad: objetivo, territorio, experiencia, canal, contenido y medición.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Medellín',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'estrategias BTL',
      'campaña BTL',
      'marketing experiencial',
      'trade marketing',
      'activaciones BTL con resultados',
    ],
    body: `Una **estrategia BTL** es el plan que conecta una activación con un objetivo de negocio: qué se quiere lograr, dónde, con quién, cómo va a participar la gente y cómo se va a medir. Sin estrategia, una activación es un evento. Con ella, es una inversión que se puede defender. En Contraste lo dicen con una frase que publicaron en [Instagram](${L.datos}): un evento sin medición es sólo un gasto.

Estas son seis decisiones que separan una campaña BTL que mueve el negocio de una que sólo se ve bien en fotos.

## 1. Empieza por el objetivo, no por la idea

La primera pregunta no es qué vamos a hacer, sino qué tiene que cambiar: más prueba de producto, más rotación en el punto de venta, más prospectos calificados o más recordación en un territorio nuevo. Cada objetivo pide una mecánica distinta. Una activación para generar prueba necesita degustación; una para mover rotación necesita estar dentro del establecimiento; una para conseguir prospectos necesita captar y calificar datos.

## 2. Activa donde se toma la decisión

En la [activación de Aguardiente Amarillo de Manzanares en Yarumal](${L.yarumal}), la marca se llevó al punto de encuentro del público, justo donde se decide qué se consume. Cada pieza tenía una función: un show con artistas populares para generar tráfico y permanencia, promotoras para recomendar el producto de forma directa, un montaje de visibilidad dentro del establecimiento y presencia de marca en el momento de consumo. Lo que se buscaba era que el producto rotara, no sólo la foto.

## 3. Diseña para que la gente participe

El consumidor está dispuesto a gastar en experiencias. En el [episodio 001 de Conexión Podcast](${L.ep1}), el economista Andrés Giraldo explicó que el entretenimiento fue lo que más creció en la economía colombiana entre 2019 y 2025, cerca de un 115 %. Una estrategia BTL aprovecha esa disposición: en lugar de interrumpir, ofrece un plan.

El [partido entre influencers y leyendas del Once Caldas](${L.futbol}) con Ron Viejo de Caldas y Aguardiente Amarillo es un buen ejemplo: la gente compite, se ríe, crea contenido, y la marca forma parte del juego. Hay más casos en [Activaciones de marca: 7 ejemplos reales de BTL en Antioquia](${L.ejemplos}).

## 4. Integra al canal: comercio, promotoras y aliados

Las activaciones que dejan huella no se quedan en el consumidor final. En [Chirimía de los que saben](${L.chirimia}), Licor Esencial de Ron Viejo de Caldas recorrió cuatro municipios con promotoras, equipo logístico y música en vivo, y acompañó directamente a los clientes del comercio. En [RONDANDOS en Jericó](${L.jerico}), la activación se desarrolló junto a los aliados de la marca. Cuando el tendero y el distribuidor viven la activación, la marca sigue presente el lunes siguiente.

## 5. Conecta lo físico con lo digital

Una activación bien diseñada produce contenido, y ese contenido tiene que tener un destino. En el [episodio 002](${L.ep2}), Santiago Cardona, gerente general de Grupo REDI, contó que en su empresa las redes sociales se llevan entre el 50 % y el 70 % del presupuesto de mercadeo según el proyecto, y que la base de interesados que no compra de inmediato se sigue trabajando con remarketing. La activación y el digital no compiten: la experiencia física da de qué hablar y lo digital lo multiplica y hace el seguimiento.

## 6. Mide para decidir la siguiente fase

Medir no es un informe final: es lo que permite decidir dónde invertir la próxima vez. Contraste plantea que cada experiencia debe pensarse para maximizar la recordación de marca, medir la interacción y el comportamiento del público, convertir la emoción en información accionable y justificar la inversión con un impacto tangible. En la práctica, eso significa acordar antes de producir:

- **Qué se va a contar**: pruebas, interacciones, prospectos o unidades vendidas.
- **Con qué se va a comparar**: un periodo sin activación, otro punto u otra ciudad.
- **Cómo se va a reportar**: por punto, por turno y por promotor.

Cardona dio una referencia útil del sector inmobiliario: de cada 500 prospectos, convertir entre el 0,5 % y el 2 % en compradores ya es un rango normal. Conocer la tasa real de tu categoría evita juzgar una activación con expectativas imposibles.

## Cómo elegir quién ejecuta la estrategia

Una buena estrategia BTL se cae con una mala operación. Antes de contratar, revisa las preguntas de [Qué pedirle a una agencia BTL antes de firmar](${L.agencia}). Y para ver cómo se aplica en cada sector, entra a las landings de [bebidas alcohólicas](${L.bebidas}), [consumo masivo](${L.consumo}), [desarrollo inmobiliario](${L.inmobiliario}) y [tecnología](${L.tecnologia}).

## Fuentes y dónde verlo

- [Reel de Contraste: presupuesto, retorno y experiencias medibles](${L.datos})
- [Activación con objetivos de trade marketing en Yarumal](${L.yarumal})
- [Conexión Podcast, episodio 001, con Andrés Giraldo (YouTube)](${L.ep1yt})
- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})`,
    faqs: [
      {
        q: '¿Qué es una estrategia BTL?',
        a: 'Es el plan que conecta una o varias activaciones con un objetivo de negocio. Define qué se quiere lograr, en qué territorio y momento de compra, cómo va a participar el público, qué papel tiene el canal y cómo se van a medir los resultados.',
      },
      {
        q: '¿Cuáles son las mejores estrategias BTL?',
        a: 'Las que parten de un objetivo medible y activan la marca donde se toma la decisión de compra. Funcionan especialmente bien las que combinan experiencia y prueba de producto, integran al comercio y a los aliados, conectan la activación con las redes sociales y definen la medición antes de producir.',
      },
      {
        q: '¿Qué diferencia hay entre una activación y una estrategia BTL?',
        a: 'La activación es la acción concreta: una degustación, un show, un stand. La estrategia es el plan que decide para qué sirve esa acción, dónde se hace, cómo se conecta con el resto de la campaña y cómo se mide su resultado.',
      },
      {
        q: '¿Qué es una campaña BTL?',
        a: 'Es un conjunto de acciones BTL coordinadas durante un periodo con un mismo objetivo. Por ejemplo, una gira de activaciones por varios municipios con degustación, promotoras y presencia en el comercio, medida con los mismos indicadores en cada punto.',
      },
      {
        q: '¿Cómo se mide el retorno de una estrategia BTL?',
        a: 'Definiendo antes de producir qué se va a contar (pruebas, interacciones, prospectos o ventas), con qué se va a comparar (un periodo o un punto sin activación) y cómo se va a reportar (por punto, turno y promotor). Con eso se calcula el costo por resultado y se decide dónde invertir en la siguiente fase.',
      },
    ],
  },
]
