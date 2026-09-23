/**
 * Segunda tanda de artículos del blog (semana del 2026-09-23).
 *
 * Fuente: transcripción completa del episodio 002 de Conexión Podcast,
 * "¿Es posible invertir en propiedad raíz con poco dinero en 2025/2026?",
 * con Santiago Cardona Balbín —ingeniero civil, profesor de posgrados en EAFIT
 * y gerente general de Grupo REDI—, conducido por Óscar Arroyave. 44 minutos.
 * Se completa con las publicaciones de @agencia_contraste ya verificadas.
 *
 * Objetivo de esta tanda: que la marca aparezca en las búsquedas de quien está
 * BUSCANDO AGENCIA, no sólo en las de quien quiere saber qué significa BTL.
 * Por eso los cinco títulos apuntan a intención comercial: qué hace una
 * agencia, cuánto cuesta, con qué equipo, qué entrega después.
 *
 * Mismas reglas que la primera tanda:
 *   · Cada cifra va atribuida a quien la dijo en el episodio.
 *   · Los casos son los que la agencia publicó, con lo que dice su publicación.
 *   · Nada de precios inventados: el artículo de costos explica las partidas,
 *     no cifras que nadie ha confirmado.
 *
 * Carga: node db/seed-posts-conexion.mjs --archivo db/posts-semana-2.mjs
 */

const L = {
  // V-Podcast
  ep0: '/v-podcast/de-cero-a-una-vida-con-proposito',
  ep1: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
  ep2: '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
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
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  // Landings
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  faq: '/preguntas-frecuentes',
  contacto: '/#contacto',
  // Blog publicado
  queEsBtl: '/blog/que-es-btl-significado-y-ejemplos',
  atlBtl: '/blog/atl-y-btl-diferencias-y-actividades',
  ejemplos: '/blog/activaciones-de-marca-ejemplos-btl-antioquia',
  centros: '/blog/activaciones-btl-centros-comerciales-y-ferias',
  estrategias: '/blog/estrategias-btl-activaciones-con-resultados',
  agenciaFirmar: '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
  salaVentas: '/blog/sala-de-ventas-por-que-la-primera-visita-decide-el-cierre',
  // Blog de esta tanda
  queHace: '/blog/que-hace-una-agencia-btl',
  costos: '/blog/cuanto-cuesta-una-activacion-btl',
  equipo: '/blog/promotoras-e-impulsadoras-equipo-de-calle',
  vivienda: '/blog/experiencias-que-venden-vivienda',
  leads: '/blog/del-lead-a-la-venta-despues-de-la-activacion',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'que-hace-una-agencia-btl',
    publishedAt: '2026-09-23',
    title: 'Qué hace una agencia BTL y cuándo conviene contratar una',
    excerpt:
      'Una agencia BTL no es una productora de eventos ni una agencia de publicidad. Qué entrega de verdad, con qué equipo trabaja y en qué momento vale la pena contratarla.',
    metaDescription:
      'Qué hace una agencia BTL: estrategia, producción, promotoría, permisos y medición. Cuándo conviene contratarla y en qué se diferencia de una agencia de eventos.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Medellín',
    niches: ['bebidas', 'consumo-masivo', 'inmobiliario'],
    keywords: [
      'agencia BTL',
      'qué hace una agencia BTL',
      'empresas BTL',
      'agencia de activaciones de marca',
      'contratar agencia BTL',
      'agencia BTL Medellín',
    ],
    body: `Una **agencia BTL** diseña, produce y mide las acciones de una marca en contacto directo con las personas: activaciones, degustaciones, impulso en punto de venta, lanzamientos, stands y eventos. No es una agencia de publicidad, que compra medios, ni una productora de eventos, que monta lo que alguien ya decidió. Su trabajo empieza antes, en el objetivo comercial, y termina después, en el reporte.

Si todavía no tienes claro el término, empieza por [Qué es BTL: significado, ejemplos y cómo funciona](${L.queEsBtl}).

## Qué entrega una agencia BTL

- **Estrategia**: a qué público, en qué territorio y en qué momento de compra se va a activar la marca, y qué indicador tiene que moverse.
- **Concepto y creatividad**: la mecánica concreta que hace que la gente participe, no sólo mire.
- **Producción y logística**: montaje, transporte, materiales, personal y operación en calle, muchas veces en varias ciudades a la vez.
- **Promotoría**: selección, entrenamiento y supervisión del equipo que representa a la marca.
- **Permisos y cumplimiento**: reglas de cada cadena, de cada municipio y de cada categoría. En licores esto no es un trámite: decide si la activación se puede hacer.
- **Medición y reporte**: qué pasó, punto por punto y turno por turno, con datos comparables.

Las cinco primeras las ofrece casi todo el mercado. La sexta es la que separa a una agencia que ejecuta de una que sólo produce, y es también la que más piden hoy las marcas: en [este reel](${L.datos}) lo resumimos así, un evento sin medición es sólo un gasto.

## En qué se diferencia de una agencia de eventos o de publicidad

Una agencia de publicidad trabaja el mensaje y los medios; una agencia de eventos garantiza que el montaje ocurra. Una agencia BTL responde por el resultado comercial de una experiencia: cuántas personas probaron el producto, cuántos datos útiles quedaron, cuánto se movió la venta en ese punto.

Esa diferencia se nota en las preguntas que hace cada una al empezar. La agencia de eventos pregunta cuántos invitados y qué tarima. La agencia BTL pregunta qué tiene que pasar para que la inversión valga la pena. En [ATL y BTL](${L.atlBtl}) explicamos cómo se reparte el trabajo con los medios masivos.

## Cuándo conviene contratar una agencia BTL

- **Cuando la decisión de compra se toma frente al producto**: en el lineal, en la barra, en la sala de ventas.
- **Cuando hay que operar en varias ciudades a la vez** con el mismo estándar de marca y un solo reporte.
- **Cuando la categoría tiene reglas propias**, como licores, y una activación mal gestionada se cae el mismo día.
- **Cuando el producto se entiende usándolo** y una pieza publicitaria no alcanza a explicarlo.
- **Cuando necesitas datos**, no fotos: prospectos calificados, pruebas, rotación.

Si el objetivo es sólo notoriedad y no hay contacto directo con el público, probablemente no necesites una agencia BTL todavía.

## Lo que las marcas están pidiendo hoy

En el [episodio 002 de Conexión Podcast](${L.ep2}), Óscar Arroyave, fundador de Contraste, le preguntó a Santiago Cardona —gerente general de Grupo REDI— cuáles son las experiencias que los desarrolladores buscan para acercar sus proyectos a clientes e inversionistas. La respuesta apunta a algo que aplica a cualquier categoría: en un mercado donde varios ofrecen lo mismo, la diferencia está en la experiencia que vive el cliente antes de comprar.

Cardona contó además que su compañía nunca ha tenido una sala de ventas tradicional y que trabaja con un equipo capacitado en todo el portafolio, porque, en sus palabras, hay cliente para el producto y producto para el cliente. La misma lógica aplica al equipo de calle de una activación: si sólo sabe de una referencia, pierde la mitad de las conversaciones.

## Cómo trabaja Contraste

Contraste es una agencia BTL con sede en Medellín, en operación desde 2011, que ejecuta activaciones en Bogotá, Cali, Barranquilla y otras ciudades de Colombia. Trabaja cuatro nichos con método propio: [bebidas alcohólicas](${L.bebidas}), [consumo masivo](${L.consumo}), [desarrollo inmobiliario](${L.inmobiliario}) y [tecnología](${L.tecnologia}).

Los casos se publican con nombre y lugar en el [Instagram de la agencia](${L.ig}): [una gira con chirimía en vivo por cuatro municipios de Antioquia](${L.chirimia}), [una activación con objetivos de trade marketing en Yarumal](${L.yarumal}) o [un partido con leyendas del Once Caldas](${L.futbol}). Hay siete casos explicados en [Activaciones de marca: 7 ejemplos reales de BTL en Antioquia](${L.ejemplos}).

## Antes de firmar

Pide el plan de operación, no sólo el concepto, y define con la agencia qué se va a medir. Las preguntas concretas están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}), y el presupuesto se entiende mejor con [Cuánto cuesta una activación BTL](${L.costos}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Clip del episodio en Instagram](${L.clipSantiago})
- [Preguntas frecuentes sobre marketing BTL](${L.faq})`,
    faqs: [
      {
        q: '¿Qué incluye un servicio de publicidad BTL en punto de venta?',
        a: 'Material POP y señalización, montaje de visibilidad en el establecimiento, personal promocional entrenado, la mecánica de degustación o impulso, la gestión de permisos con la cadena o el municipio y el reporte por punto, turno y promotor. Se contrata como una operación completa: si la marca compra las piezas por separado, termina coordinando proveedores en vez de vender.',
      },
      {
        q: '¿Qué hace una agencia BTL?',
        a: 'Diseña, produce y mide acciones de marca en contacto directo con el público: activaciones, degustaciones, impulso en punto de venta, lanzamientos, stands y eventos. Se encarga de la estrategia, la creatividad, la producción y la logística, el equipo de promotoría, los permisos y el reporte de resultados.',
      },
      {
        q: '¿Cuál es la diferencia entre una agencia BTL y una agencia de eventos?',
        a: 'La agencia de eventos responde por el montaje y por que la actividad ocurra. La agencia BTL responde por el resultado comercial de esa experiencia: cuántas personas probaron el producto, cuántos prospectos calificados quedaron y cómo se movió la venta en el punto.',
      },
      {
        q: '¿Cuándo conviene contratar una agencia BTL?',
        a: 'Cuando la decisión de compra se toma frente al producto, cuando hay que operar en varias ciudades con el mismo estándar, cuando la categoría tiene reglas propias como los licores, cuando el producto se entiende usándolo o cuando se necesitan datos de la activación y no sólo registro fotográfico.',
      },
      {
        q: '¿Qué debe entregar una agencia BTL al final de una activación?',
        a: 'Un reporte con datos comparables: pruebas de producto o interacciones, prospectos captados y calificados, unidades movidas por referencia, y el detalle por punto, turno y promotor, además de la evidencia fotográfica de la exhibición.',
      },
      {
        q: '¿Contraste trabaja fuera de Medellín?',
        a: 'Sí. La agencia tiene sede en Medellín y ejecuta activaciones en Bogotá, Cali, Barranquilla y otras ciudades de Colombia, con el mismo estándar de selección, entrenamiento y reporte en todas.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'cuanto-cuesta-una-activacion-btl',
    publishedAt: '2026-09-24',
    title: 'Cuánto cuesta una activación BTL y qué la encarece',
    excerpt:
      'No hay tarifa única, pero sí partidas que siempre están. Qué compone el presupuesto de una activación, qué la encarece y cómo pedir cotizaciones que se puedan comparar.',
    metaDescription:
      'Qué compone el presupuesto de una activación BTL: producción, promotoría, logística, permisos y medición. Qué la encarece y cómo comparar cotizaciones.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'cuánto cuesta una activación BTL',
      'presupuesto de una activación de marca',
      'costo marketing BTL',
      'cotizar activación BTL',
      'presupuesto trade marketing',
    ],
    body: `La pregunta más frecuente cuando una marca considera su primera activación es cuánto cuesta. La respuesta honesta es que depende, y este artículo explica de qué depende, para que puedas armar un presupuesto realista y comparar propuestas sin llevarte sorpresas.

## Las partidas que siempre están

- **Estrategia y creatividad**: el diseño de la mecánica y los materiales de marca. Se paga una vez y se reutiliza en toda la campaña.
- **Producción y montaje**: estructuras, stands, barras, mobiliario, gráfica y su instalación.
- **Equipo en calle**: promotoras, impulsadores, anfitriones, supervisión y coordinación, por turno y por punto.
- **Logística**: transporte de material entre ciudades, bodegaje, alimentación y transporte del equipo.
- **Producto y consumibles**: el muestreo, los vasos, el hielo, el material POP que se entrega.
- **Permisos y seguros**: autorizaciones de la cadena, del centro comercial o del municipio, y pólizas cuando aplican.
- **Medición y reporte**: registro, supervisión, consolidación y entrega de los datos.

Esa última partida a veces se recorta para bajar el precio. Es la peor decisión posible: sin ella no hay forma de saber si el resto del presupuesto sirvió de algo. Lo desarrollamos en [Estrategias BTL: cómo convertir una activación en resultados](${L.estrategias}).

## Qué hace subir el presupuesto

- **Número de puntos y de ciudades**: cada plaza suma equipo, transporte y supervisión propia.
- **Días y turnos**: no es lo mismo un fin de semana que una gira de un mes.
- **Canal**: una activación en centro comercial suele implicar espacio negociado y montaje aprobado; una en canal tradicional implica cubrir muchos puntos pequeños y dispersos.
- **Perfil del equipo**: un producto técnico o un licor exigen entrenamiento específico y eso se refleja en el costo por turno.
- **Producción a la medida**: una estructura diseñada desde cero cuesta más que una adaptación, aunque se amortiza si la campaña es larga.
- **Artistas o talento**: música en vivo o figuras públicas cambian por completo el orden de magnitud.

## Por qué no existe una tarifa de lista

Una activación es una operación, no un producto de catálogo. Vale la pena entender cómo se comporta la estructura de costos en negocios que se parecen. En el [episodio 002 de Conexión Podcast](${L.ep2}), Santiago Cardona, gerente general de Grupo REDI, contó que en desarrollo inmobiliario el lote pasó de pesar entre el 5 % y el 10 % de un proyecto a pesar entre el 10 % y el 20 %, y que ha visto negocios en Bogotá del 18 %. Añadió algo que suele sorprender: el margen bruto sobre la venta de un proyecto rara vez llega al 10 %, y en vivienda de interés social no alcanza el 5 %.

La lección aplica al BTL. Cuando un insumo sube —el transporte, el talento, el personal—, el precio final se mueve aunque la agencia no gane más. Por eso una propuesta seria explica qué incluye cada partida en vez de entregar una cifra global.

## Cómo pedir cotizaciones que se puedan comparar

Pide a todas las agencias lo mismo:

- El objetivo y el indicador que se va a medir, escrito en la propuesta.
- El número de puntos, días y turnos, con el equipo asignado a cada uno.
- Qué incluye y qué no: producto, transporte, permisos, seguros.
- Quién supervisa en calle y con qué frecuencia.
- Qué reporte se entrega, con qué desglose y en qué plazo.

Dos propuestas con el mismo precio pueden tener alcances muy distintos. La lista completa de preguntas está en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

## Qué se puede ajustar sin romper la activación

- **Concentrar puntos**: menos plazas bien elegidas rinden más que muchas mal cubiertas.
- **Reutilizar producción**: una estructura pensada para viajar se amortiza entre ciudades y fases.
- **Ajustar turnos al tráfico real**: no todas las horas de un punto valen lo mismo.
- **Escalonar la campaña**: una primera fase corta y medida sirve para decidir dónde poner el resto del presupuesto.
- **Negociar material con el canal**: parte de la visibilidad puede resolverse con lo que la cadena ya permite.

Lo que no conviene recortar es la supervisión ni la medición. Sin supervisión, la operación se cae el segundo día y nadie se entera; sin medición, no hay forma de justificar la inversión ni de mejorar la siguiente.

## Cómo saber si valió la pena

El precio sólo tiene sentido al lado del resultado. Una activación de sampling se juzga por costo por prueba; una de trade marketing, por unidades movidas en el punto; una inmobiliaria, por costo por prospecto calificado. Ese último caso tiene una referencia útil que dio Cardona en el mismo episodio: de los prospectos que llegan a un proyecto, convertir entre el 0,5 % y el 2 % en compradores es un rango normal. Conocer la tasa de tu categoría evita pedirle a una activación lo que ninguna puede dar.

## Qué necesitamos para cotizarte

En Contraste la cotización sale después de una conversación corta: objetivo, público, territorio, fechas y qué se quiere medir. Con eso se arma una propuesta con alcance cerrado. Puedes escribirnos desde [la página de contacto](${L.contacto}) o revisar antes [qué hace exactamente una agencia BTL](${L.queHace}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Reel de Contraste sobre presupuesto, retorno y medición](${L.datos})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuánto cuesta hacer publicidad BTL en varios puntos de venta al mismo tiempo?',
        a: 'Menos de lo que sugiere multiplicar: la creatividad y la producción se amortizan entre plazas, mientras que el equipo en calle, la logística y la supervisión sí crecen con cada punto. El presupuesto se arma por punto y por turno, así que la cifra sale cuando están definidos cuántos puntos y ciudades, cuántos días y qué se va a medir.',
      },
      {
        q: '¿Cuánto cuesta una activación BTL en Colombia?',
        a: 'No existe una tarifa única. El presupuesto depende del número de puntos, ciudades, días y turnos, del perfil y tamaño del equipo en calle, de la producción y el montaje, de los permisos y del producto que se entrega. Por eso una agencia seria cotiza después de conocer el objetivo, el público y el territorio.',
      },
      {
        q: '¿Qué incluye el presupuesto de una activación de marca?',
        a: 'Estrategia y creatividad, producción y montaje, equipo en calle con supervisión, logística y transporte, producto y consumibles, permisos y seguros cuando aplican, y la medición con su reporte final.',
      },
      {
        q: '¿Qué encarece más una activación BTL?',
        a: 'Multiplicar puntos y ciudades, extender los días de operación, exigir perfiles de equipo muy especializados, producir estructuras a la medida y contratar talento o música en vivo. El canal también influye: un centro comercial implica espacio negociado y montaje aprobado.',
      },
      {
        q: '¿Se puede hacer una activación con presupuesto pequeño?',
        a: 'Sí, si se concentra. Es mejor activar pocos puntos bien elegidos, con equipo entrenado y medición, que repartir el presupuesto en muchos puntos sin control. Una prueba pequeña y bien medida sirve además para decidir dónde invertir en la siguiente fase.',
      },
      {
        q: '¿Cómo se compara la cotización de dos agencias BTL?',
        a: 'Pidiendo a las dos el mismo alcance: objetivo e indicador, número de puntos, días y turnos, equipo por punto, qué incluye y qué no, quién supervisa en calle y qué reporte se entrega. Dos precios iguales pueden esconder alcances muy distintos.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'promotoras-e-impulsadoras-equipo-de-calle',
    publishedAt: '2026-09-25',
    title: 'Promotoras e impulsadoras: cómo se arma el equipo de calle',
    excerpt:
      'La activación la ejecuta el equipo que está en el punto. Qué roles existen, cómo se seleccionan y entrenan, y qué controles evitan que la operación se caiga.',
    metaDescription:
      'Cómo se arma el equipo de una activación BTL: promotoras, impulsadores, mercaderistas y supervisión. Selección, entrenamiento, control de turnos y reporte.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Medellín',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'agencia de impulsadoras',
      'promotoras para activaciones',
      'impulsadoras en Medellín',
      'promotoría en punto de venta',
      'equipo de activación BTL',
    ],
    body: `La estrategia se escribe en una presentación, pero la activación la ejecuta la persona que está parada en el punto de venta un martes a las once de la mañana. Por eso el equipo de calle no es un detalle operativo: es el producto que la marca está comprando.

## Los roles de una activación

- **Impulsadora o impulsador**: representa la marca frente al consumidor, ofrece la degustación, explica el producto y acompaña la decisión de compra.
- **Mercaderista**: se encarga de que el producto esté disponible y bien exhibido, surte el lineal, revisa precios y fechas y reporta agotados.
- **Anfitrión o anfitriona de experiencia**: recibe, explica la mecánica y mantiene el flujo cuando la activación tiene dinámica o juego.
- **Supervisión en calle**: verifica exhibición, material y cumplimiento de turnos, y resuelve lo que se rompe el mismo día.
- **Coordinación y logística**: mueve material y personal entre puntos y ciudades, y sostiene la operación cuando se activa en varias plazas a la vez.

La diferencia entre impulso y sampling, y entre impulsadora y mercaderista, está explicada en la landing de [consumo masivo](${L.consumo}).

## Selección: perfil antes que apariencia

El casting de una activación no se resuelve con fotos. Se define por el tipo de conversación que la persona tiene que sostener: no es lo mismo recomendar un licor en una barra que explicar un producto técnico en un centro comercial o atender a una familia en una sala de ventas.

En categorías reguladas el perfil incluye criterio. En licores, por ejemplo, la persona tiene que saber cuándo no ofrecer una degustación: la prueba es sólo para mayores de edad y con porciones controladas. Ese criterio se entrena, no se improvisa. Los detalles por categoría están en la landing de [bebidas alcohólicas](${L.bebidas}).

## Entrenamiento: producto, guion y momento de entrega

Un asistente que hace una pregunta y recibe una respuesta vaga no vuelve. El equipo se entrena en tres cosas: el producto y sus diferencias frente a la competencia, el guion de la conversación —incluidas las objeciones que van a aparecer— y el momento exacto en que hay que pasar el contacto a un asesor comercial.

Aquí sirve una idea que dejó Santiago Cardona, gerente general de Grupo REDI, en el [episodio 002 de Conexión Podcast](${L.ep2}). Contó que en su compañía todo el equipo comercial está capacitado para ofrecer el portafolio completo, porque hay cliente para el producto y producto para el cliente: si alguien pregunta por un proyecto que no le encaja, la conversación no se pierde, se redirige. En una activación pasa igual. Un equipo que sólo conoce una referencia desperdicia la mitad de los contactos que genera.

## Control: lo que separa una operación seria

- **Registro de entrada y salida por turno**, por persona y por punto.
- **Evidencia fotográfica** del lineal, la exhibición y el material POP.
- **Reporte de unidades movidas** por referencia, no sólo de asistencia.
- **Supervisión en ruta** que verifica en sitio y no por WhatsApp.
- **Consolidación diaria**, para corregir mientras la campaña está viva y no cuando ya terminó.

Ese control es lo que permite responder la pregunta que de verdad importa: qué puntos, qué turnos y qué mensajes funcionaron.

## El brief que el equipo necesita

Antes de salir a calle, cada persona debería tener en una página: el objetivo de la activación, los tres argumentos principales del producto, las objeciones más frecuentes con su respuesta, lo que la normativa prohíbe, a quién llamar si algo se cae y qué tiene que reportar al final del turno. Un equipo bien seleccionado pero sin brief improvisa, y lo que improvisa queda asociado a la marca.

## Rotación, respaldo y continuidad

En una gira de varios días siempre falla alguien. Una operación seria trabaja con reemplazos previstos y con más de una persona entrenada por punto, para que la baja de un turno no se convierta en un punto sin marca. Cuando la campaña se repite, mantener al mismo equipo vale oro: ya conoce el producto, al administrador del punto y a los clientes frecuentes.

## Cómo se ve en la calle

En la gira de [Chirimía de los que saben](${L.chirimia}), Licor Esencial de Ron Viejo de Caldas recorrió Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con promotoras, equipo logístico, músicos en vivo y una camioneta rodando con la marca por cada municipio. En [Yarumal](${L.yarumal}), el impulso con promotoras se combinó con un show para generar tráfico y con visibilidad dentro del establecimiento. Y con [La Tropa Aguardiente Amarillo](${L.tropa}) el equipo se movió entre calles y puntos de venta en vez de esperar al público en un solo lugar.

Más casos, con lo que se hizo en cada uno, en [Activaciones de marca: 7 ejemplos reales de BTL en Antioquia](${L.ejemplos}).

## Qué preguntarle a la agencia sobre su equipo

Cómo selecciona, cuántas horas entrena antes de salir a calle, quién supervisa y con qué frecuencia, cómo controla la asistencia y qué pasa si una persona falla en mitad de una gira. Las demás preguntas de contratación están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace una impulsadora en una activación?',
        a: 'Representa a la marca frente al consumidor en el punto de venta: ofrece la degustación o la demostración, explica el producto, resuelve dudas y acompaña la decisión de compra. Al final del turno reporta pruebas realizadas y unidades movidas.',
      },
      {
        q: '¿Cuál es la diferencia entre una impulsadora y una mercaderista?',
        a: 'La impulsadora le vende y le explica el producto al consumidor. La mercaderista se ocupa de que el producto esté disponible y bien exhibido: surte el lineal, ordena las caras de la marca, revisa precios y fechas y reporta agotados. Sin su trabajo, la venta no puede ocurrir.',
      },
      {
        q: '¿Cómo se entrena al equipo de una activación BTL?',
        a: 'En el producto y sus diferencias frente a la competencia, en el guion de la conversación con sus objeciones frecuentes y en el momento de pasar el contacto a un asesor comercial. En categorías reguladas, como los licores, se entrena además el criterio para no ofrecer producto a menores de edad.',
      },
      {
        q: '¿Cómo se controla que el equipo esté en el punto?',
        a: 'Con registro de entrada y salida por turno, evidencia fotográfica del lineal y la exhibición, reporte de unidades movidas por referencia y supervisión en ruta que verifica en sitio. La consolidación diaria permite corregir mientras la campaña sigue viva.',
      },
      {
        q: '¿Cuántas promotoras necesita una activación?',
        a: 'Depende del tráfico del punto, de la mecánica y de la duración del turno: un punto con alto flujo y degustación necesita más personas que una demostración guiada por cita. Lo que define el número es cuántas conversaciones completas se quieren sostener por hora sin que la gente tenga que esperar.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'experiencias-que-venden-vivienda',
    publishedAt: '2026-09-26',
    title: 'Experiencias que venden vivienda: qué piden hoy',
    excerpt:
      'El producto inmobiliario cambió: unidades más pequeñas, rentas cortas, inversionistas y comunidad plateada. Qué experiencias necesita cada uno de esos públicos.',
    metaDescription:
      'Qué experiencias piden hoy los desarrolladores para vender vivienda: eventos para inversionistas, showrooms, recorridos en el lote y contenido que educa.',
    coverUrl: 'https://i.ytimg.com/vi/nImG23dqoso/maxresdefault.jpg',
    location: 'Medellín',
    niches: ['inmobiliario'],
    keywords: [
      'marketing para constructoras',
      'experiencias para proyectos inmobiliarios',
      'eventos para inversionistas inmobiliarios',
      'lanzamiento de proyecto de vivienda',
      'showroom de acabados',
    ],
    body: `Vender vivienda dejó de ser mostrar un apartamento modelo. Cambió el producto, cambió quién compra y cambió lo que esa persona necesita vivir antes de decidir. Este artículo recoge lo que contó Santiago Cardona —ingeniero civil, profesor de posgrados en EAFIT y gerente general de Grupo REDI— en el [episodio 002 de Conexión Podcast](${L.ep2}), y lo traduce a experiencias concretas.

## El producto cambió

Según Cardona, el mercado de Medellín está pasando de ser un mercado de vivienda a uno de usos múltiples: proyectos de hipermixtura donde conviven vivienda, servicios, rentas cortas y comercio pensado a largo plazo. Las unidades son más pequeñas, porque ya no se diseñan para la familia de dos o tres hijos sino también para hogares unipersonales. Y aparece un comprador que no va a vivir ahí: el inversionista que busca flujo de caja.

En el [episodio 001](${L.ep1}), el economista Andrés Giraldo apuntaba en la misma dirección con otro dato: entre 2023 y 2024 se conformaron en Colombia unos 225.000 hogares unipersonales.

Cada uno de esos públicos necesita una experiencia distinta. Y ahí es donde entra el marketing experiencial.

## Por qué cambió quien compra

El cambio de producto no es una moda, viene del mercado. Cardona recordó que entre 2020 y 2022 hubo una bonanza de venta de vivienda —del orden de 250.000 a 260.000 unidades al año—, que la supresión casi total de los subsidios dejó 2023 y 2024 muy duros, y que hoy se ven indicios de reactivación, pero lentos. A eso se suma que el suelo escasea en Medellín por un plan de ordenamiento territorial restrictivo, que el lote pesa cada vez más dentro del proyecto y que el ingreso de los hogares sube más despacio que el precio del metro cuadrado.

El resultado es que ser propietario de una vivienda propia es cada vez más difícil para una parte de la población, y que el desarrollador tiene que hablarle a públicos que antes no eran su cliente. Marketing no resuelve el precio, pero sí decide si esos públicos entienden la propuesta.

## Cuatro experiencias que sí mueven la aguja

**1. Eventos privados para inversionistas.** Cardona explicó que buena parte del mercadeo inmobiliario se hace hoy en ferias, en eventos privados para inversionistas y en eventos con invitación. Son públicos pequeños y difíciles de reunir, así que el valor está en la conversación, no en el alcance.

**2. Showroom de acabados.** No siempre hace falta un apartamento modelo completo. Cardona describió centros de experiencia donde el comprador toca lo que va a recibir: el piso, la textura de los muros, el mesón de la cocina. En vivienda la gente quiere tocar la pared, y eso no se resuelve con un render.

**3. Recorridos en el lote.** Para condominios campestres, su equipo destina una parte importante del presupuesto a experiencias en el sitio: llevar al interesado al terreno, marcarle dónde iría la casa y ayudarle a imaginarla. Incluso han pensado en un picnic de experiencia para que la visita deje de ser un trámite.

**4. Realidad virtual y aumentada.** En su opinión llegaron para quedarse, pero como apoyo: hay productos cuya venta es tan experiencial que siguen necesitando un espacio físico.

## El público que casi nadie está atendiendo

Cardona insistió en un segmento que empieza a pesar: la comunidad plateada. Personas mayores de 55 o 60 años —y cada vez más desde los 40— con los hijos ya grandes, mayor expectativa de vida y excedentes para invertir y disfrutar. Son actores de consumo, no jubilados en retirada, y él mismo se preguntaba qué producto y qué experiencia se les va a ofrecer.

Para una marca eso significa activaciones pensadas para otro ritmo y otro tipo de conversación: menos mecánica ruidosa y más atención personal, horarios distintos y contenido que respete su forma de decidir.

## Educar también es una experiencia

La parte más interesante del episodio es la apuesta de Cardona por democratizar la inversión en bienes raíces: bajar el ticket de entrada con módulos de rentas cortas desde 250 millones de pesos y, más adelante, con mecanismos de fraccionamiento de la propiedad. Para que eso funcione, dijo, hace falta educación jurídica y financiera: que la gente entienda y vuelva a confiar en figuras como los derechos fiduciarios.

Esa necesidad es una oportunidad de marketing experiencial clarísima. Talleres para compradores, sesiones con expertos, contenido en video y eventos donde alguien explique cómo funciona el negocio construyen algo que ninguna pauta compra: confianza. Es exactamente lo que hace el propio [Conexión Podcast](/v-podcast).

## Dónde se conecta con la operación

La experiencia sirve si termina en un prospecto calificado y en una visita agendada. Cómo se captan y califican en ferias y centros comerciales está en [Activaciones BTL en centros comerciales y ferias de vivienda](${L.centros}); qué pasa con esos datos después, en [Del lead a la venta](${L.leads}); y por qué la primera visita pesa tanto, en [Sala de ventas](${L.salaVentas}).

Todo el método por el que Contraste trabaja este sector está en la landing de [marketing BTL inmobiliario](${L.inmobiliario}).

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Clip del episodio en Instagram: qué experiencias atraen compradores](${L.clipSantiago})
- [Conexión Podcast, episodio 001, con Andrés Giraldo (YouTube)](${L.ep1yt})
- [Instagram de Conexión Podcast](${L.igPodcast})`,
    faqs: [
      {
        q: '¿Qué experiencias funcionan para vender un proyecto de vivienda?',
        a: 'Eventos privados para inversionistas, showrooms donde el comprador toca los acabados reales, recorridos en el lote para proyectos campestres y apoyos de realidad virtual o aumentada. Según Santiago Cardona, de Grupo REDI, hay productos cuya venta es tan experiencial que siguen necesitando un espacio físico.',
      },
      {
        q: '¿Qué es un showroom de acabados y para qué sirve?',
        a: 'Es un espacio donde el comprador ve y toca los materiales que va a recibir: pisos, texturas de muros y mesones de cocina. Permite resolver la parte sensorial de la decisión sin montar un apartamento modelo completo, que es mucho más costoso.',
      },
      {
        q: '¿Cómo se le vende a un inversionista y no a un usuario final?',
        a: 'Con datos y con formatos de conversación cerrada: eventos privados, sesiones con expertos y material que explique el modelo de negocio, la operación del activo y el flujo esperado. El inversionista valida el producto, pero decide por el número y por quién respalda ese número.',
      },
      {
        q: '¿Qué es la comunidad plateada en marketing inmobiliario?',
        a: 'Es el público mayor de 55 o 60 años —y cada vez más desde los 40— con hijos ya grandes, alta expectativa de vida y capacidad de consumo e inversión. Santiago Cardona lo señala como un segmento creciente que necesita productos y experiencias diseñados a propósito para él.',
      },
      {
        q: '¿Sirve el contenido educativo para vender vivienda?',
        a: 'Sí. Cuando el comprador o el inversionista no entiende el mecanismo —crédito, subsidios, derechos fiduciarios—, la duda frena la decisión. Talleres, sesiones con expertos y contenido en video construyen la confianza que la publicidad por sí sola no genera.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'del-lead-a-la-venta-despues-de-la-activacion',
    publishedAt: '2026-09-27',
    title: 'Del lead a la venta: qué pasa después de la activación',
    excerpt:
      'La activación termina y empieza lo que decide el retorno: qué datos se entregan, cómo se califican, quién hace seguimiento y qué se hace con el 98 % que no compra hoy.',
    metaDescription:
      'Qué hacer con los prospectos de una activación BTL: calificación, entrega al equipo comercial, seguimiento y remarketing, con datos del Conexión Podcast.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Medellín',
    niches: ['inmobiliario', 'consumo-masivo'],
    keywords: [
      'leads de activaciones BTL',
      'calificación de prospectos',
      'seguimiento comercial de leads',
      'remarketing',
      'costo por lead calificado',
    ],
    body: `La foto final de una activación suele mostrar gente sonriendo y una base de datos llena. Lo que decide el retorno ocurre después, y casi nunca aparece en el informe: qué se hace con esos contactos, quién los llama, en cuánto tiempo y con qué argumento.

## El embudo real, con números de alguien que lo opera

En el [episodio 002 de Conexión Podcast](${L.ep2}), Santiago Cardona, gerente general de Grupo REDI, describió cómo se mueve el embudo en sus proyectos. Un proyecto puede recibir entre 500 y 1.000 prospectos al mes. De los que llegan con algún interés, la conversión a compra suele estar entre el 0,5 % y el 2 %: de 500 personas, entre cinco y diez terminan comprando. Y de esa base, calculaba, cerca del 70 % no tenía un interés real; algunos dejaron sus datos a las once de la noche y otros pulsaron el botón sin querer.

Ese es el escenario normal, no un mal resultado. Quien mide una activación esperando que la mitad de los contactos compre, siempre va a concluir que no funcionó.

## Calificar en el sitio, no después

La diferencia entre una base grande y una base útil se construye durante la activación. El equipo en calle puede resolver en una conversación corta lo que después cuesta semanas de llamadas: qué busca la persona, en qué plazo, con qué capacidad de compra y si el producto le encaja.

Eso exige entrenar al equipo para preguntar sin interrogar y para registrar de forma homogénea. Cómo se arma y se entrena ese equipo está en [Promotoras e impulsadoras: cómo se arma el equipo de calle](${L.equipo}).

## Qué debe entregar la agencia

- **El contacto con contexto**: qué preguntó, qué probó, qué objeción puso.
- **Una calificación clara**: quién cumple el perfil y quién no, con el criterio acordado antes de salir a calle.
- **Trazabilidad**: de qué punto, turno y promotor viene cada dato.
- **El dato a tiempo**: una base que llega una semana después ya perdió la mitad de su valor.
- **Los agregados**: pruebas, interacciones y unidades movidas, para leer el resultado completo.

Una entrega así permite calcular lo único que importa al final: el costo por prospecto calificado y por venta. En [Estrategias BTL](${L.estrategias}) está el marco completo de medición.

## Las preguntas que califican sin interrogar

No hace falta un formulario largo. Con tres o cuatro preguntas bien puestas dentro de la conversación se sabe casi todo: para qué busca el producto, en qué plazo, qué la haría decidirse y si ya conocía la marca. Lo importante es que el equipo las haga siempre igual, para que los datos de dos puntos distintos se puedan comparar.

## Atribución: saber qué venta salió de la activación

Si el origen no queda marcado en el CRM, en dos semanas nadie sabrá de dónde vino cada cierre y la activación se quedará sin crédito por las ventas que generó. Marcar el origen, el punto y la fecha cuesta un campo en el formulario y es lo que permite calcular el costo por venta al cierre de la campaña. Cardona lo resumió en el episodio: esa capacidad la construyeron con estructuras que tardaron entre año y medio y dos años en montarse, porque, en sus palabras, hoy estamos en la era de la información.

## El 98 % que no compra hoy

Cardona explicó qué hace su equipo con el resto de la base: remarketing en cada lanzamiento, con el objetivo mínimo de que la persona siga identificando la marca. Puede que el producto de hoy no sea el suyo y el del próximo trimestre sí.

Ahí es donde lo físico y lo digital se cierran. En su compañía, contó, las redes sociales ya se llevan entre el 50 % y el 70 % del presupuesto de mercadeo según el proyecto, y no es capricho: la gente pasa entre tres y cinco horas al día en el celular. La activación genera el contacto y el contenido; lo digital lo mantiene vivo. Cómo se reparte ese trabajo está en [ATL y BTL](${L.atlBtl}).

## Acuerdos que hay que cerrar antes de la activación

- Quién recibe los datos y en qué formato.
- En cuánto tiempo se hace el primer contacto.
- Qué se le dice a quien dejó sus datos, y qué se le ofrece.
- Cómo se marca en el CRM el origen, para poder atribuir la venta a la activación.
- Quién revisa el embudo y con qué frecuencia.

Sin estos acuerdos, la mejor activación del año termina siendo una base de datos que nadie llamó.

## Y el consentimiento

Si se capturan datos personales hay que decir para qué se van a usar y guardar la autorización. En Colombia lo exige la Ley 1581 de 2012 sobre protección de datos personales. Un formulario con casilla de autorización y una política clara no es burocracia: es lo que permite usar esa base después sin problemas.

## Fuentes y dónde verlo

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Reel de Contraste sobre medición y retorno](${L.datos})
- [Qué hace una agencia BTL](${L.queHace})`,
    faqs: [
      {
        q: '¿Cuántos leads de una activación terminan en venta?',
        a: 'Depende de la categoría. En proyectos inmobiliarios, Santiago Cardona, de Grupo REDI, sitúa la conversión entre el 0,5 % y el 2 % de los prospectos que llegan con algún interés, y calcula que cerca del 70 % de esa base no tenía interés real. Conocer la tasa propia evita juzgar una activación con expectativas imposibles.',
      },
      {
        q: '¿Qué es un lead calificado en una activación BTL?',
        a: 'Es el contacto que, además de dejar sus datos, cumple las condiciones para comprar: tiene la intención, el plazo y la capacidad, y el producto le encaja. Se identifica durante la activación con unas pocas preguntas, no después por teléfono.',
      },
      {
        q: '¿En cuánto tiempo hay que contactar a un prospecto de una activación?',
        a: 'Lo antes posible, mientras la experiencia sigue fresca. Lo importante es acordar el plazo antes de la activación y dejar claro quién llama, con qué mensaje y con qué oferta, porque una base que se entrega sin dueño no la llama nadie.',
      },
      {
        q: '¿Qué se hace con los contactos que no compran?',
        a: 'Se trabajan con remarketing en los siguientes lanzamientos para sostener el reconocimiento de marca, que es lo que hace Grupo REDI según contó su gerente general. El producto de hoy puede no ser el indicado para esa persona y el del próximo trimestre sí.',
      },
      {
        q: '¿Se pueden usar libremente los datos captados en una activación?',
        a: 'No. Hay que informar para qué se van a usar y conservar la autorización de la persona, como exige la Ley 1581 de 2012 de protección de datos personales en Colombia. Sin ese consentimiento, la base no se puede utilizar para campañas posteriores.',
      },
    ],
  },
]
