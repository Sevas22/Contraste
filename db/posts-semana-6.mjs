/**
 * Sexta tanda de artículos del blog (semana del 2026-10-26).
 *
 * Search Console (28 días a 2026-10-21) dejó claro el problema: las 298
 * consultas que traen impresiones son todas informativas —«btl que es»,
 * «btl significado», «que es material pop»— y ninguna comercial. El sitio
 * está catalogado como glosario, no como proveedor. Esta tanda va entera a
 * corregir eso.
 *
 *   · Bogotá: hay artículo local para Medellín y ninguno para la plaza más
 *     grande del país, que es donde está el presupuesto de las marcas.
 *   · Retail moderno: el canal tradicional (TAT) estaba cubierto y el de
 *     supermercados y grandes superficies no, aunque es donde se negocia la
 *     mayor parte de las activaciones de consumo masivo.
 *   · Stands: «Activaciones en centros comerciales y ferias» toca el espacio,
 *     no la pieza. Quien busca «stand para feria» busca otra cosa.
 *   · Embajadores de marca: término con búsqueda propia que el blog no
 *     nombraba, y servicio que la agencia presta.
 *   · Agencia BTL o agencia de eventos: la duda exacta de quien ya decidió
 *     contratar y no sabe a quién. Es la consulta con más intención de toda
 *     la tanda.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 27 artículos ya en vivo.
 *
 * OJO con Bogotá: no hay ningún caso publicado de esa ciudad. La cobertura
 * sí está confirmada por el cliente (2026-10-08, «las nueve principales
 * ciudades de Colombia»), así que el artículo explica cómo se opera la plaza
 * y cita como ejemplos los casos de Antioquia, que son los que existen. No
 * se inventa un caso bogotano.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=6 --escribir --publicar
 */

const L = {
  // V-Podcast
  ep1: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
  ep2: '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
  // Redes
  ig: 'https://www.instagram.com/agencia_contraste/',
  futbol: 'https://www.instagram.com/agencia_contraste/reel/DSfRC4aDgrj/',
  datos: 'https://www.instagram.com/agencia_contraste/reel/DSkg-apjnKg/',
  jerico: 'https://www.instagram.com/agencia_contraste/reel/DRmuczyjgt7/',
  lanzamiento: 'https://www.instagram.com/agencia_contraste/reel/DXfmY0yDOP2/',
  tropa: 'https://www.instagram.com/agencia_contraste/reel/DV96S1_DOcj/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  // Landings y páginas
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  faq: '/preguntas-frecuentes',
  contacto: '/#contacto',
  // Blog ya publicado
  queEsBtl: '/blog/que-es-btl-significado-y-ejemplos',
  atlBtl: '/blog/atl-y-btl-diferencias-y-actividades',
  ejemplos: '/blog/activaciones-de-marca-ejemplos-btl-antioquia',
  centros: '/blog/activaciones-btl-centros-comerciales-y-ferias',
  estrategias: '/blog/estrategias-btl-activaciones-con-resultados',
  queHace: '/blog/que-hace-una-agencia-btl',
  costos: '/blog/cuanto-cuesta-una-activacion-btl',
  equipo: '/blog/promotoras-e-impulsadoras-equipo-de-calle',
  vivienda: '/blog/experiencias-que-venden-vivienda',
  leads: '/blog/del-lead-a-la-venta-despues-de-la-activacion',
  agenciaFirmar: '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
  sala: '/blog/sala-de-ventas-por-que-la-primera-visita-decide-el-cierre',
  licores: '/blog/publicidad-btl-para-licores',
  degustaciones: '/blog/degustaciones-y-sampling-en-punto-de-venta',
  tat: '/blog/trade-marketing-en-canal-tradicional-tat',
  tech: '/blog/activaciones-btl-para-marcas-de-tecnologia',
  pop: '/blog/material-pop-que-es-y-como-auditarlo',
  medellin: '/blog/agencia-btl-en-medellin',
  campanas: '/blog/campanas-btl-del-brief-a-la-calle',
  street: '/blog/street-marketing-y-marketing-de-guerrilla',
  lanzamientoPost: '/blog/lanzamiento-de-producto-con-activaciones-btl',
  produccion: '/blog/produccion-de-eventos-btl-que-incluye',
  experiencial: '/blog/marketing-experiencial-que-es-y-como-se-disena',
  finDeAno: '/blog/activaciones-btl-de-fin-de-ano',
  roadshow: '/blog/roadshow-de-marca-que-es-y-cuando-conviene',
  digital: '/blog/btl-y-marketing-digital-como-se-potencian',
  metricas: '/blog/como-medir-una-activacion-btl-sin-metricas-de-vanidad',
  // Blog de esta tanda
  bogota: '/blog/agencia-btl-en-bogota',
  retail: '/blog/activaciones-btl-en-supermercados-y-retail',
  stands: '/blog/stands-para-ferias-que-funcionan',
  embajadores: '/blog/embajadores-de-marca-brand-ambassador',
  vsEventos: '/blog/agencia-btl-o-agencia-de-eventos',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'agencia-btl-en-bogota',
    publishedAt: '2026-10-26',
    title: 'Agencia BTL en Bogotá: cómo se opera la plaza',
    excerpt:
      'Bogotá no es una ciudad grande: son varias ciudades pegadas, con tráfico que condiciona cada montaje y un retail que negocia distinto. Qué cambia al activar una marca aquí y qué hay que presupuestar.',
    metaDescription:
      'Cómo se opera una activación BTL en Bogotá: zonas, canales, negociación de espacios, tiempos de desplazamiento y qué encarece una campaña en la capital.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Bogotá',
    niches: ['consumo-masivo', 'bebidas', 'inmobiliario'],
    keywords: [
      'agencia BTL Bogotá',
      'agencias BTL',
      'activaciones BTL Bogotá',
      'campañas BTL',
      'trade marketing Bogotá',
    ],
    body: `Activar una marca en Bogotá no es activar en una ciudad grande: es activar en varias ciudades pegadas, cada una con su público, su canal dominante y sus tiempos. Una campaña diseñada para una plaza de tamaño medio se rompe aquí por una razón banal: el equipo no llega a tiempo.

Si vienes de más atrás, en [Qué hace una agencia BTL](${L.queHace}) está el servicio completo, y la versión de esto para Antioquia en [Agencia BTL en Medellín](${L.medellin}).

## Lo que de verdad cambia

**La distancia manda.** Entre un punto del norte y uno del sur hay, en hora pico, más tiempo que entre Medellín y un municipio cercano. Eso no es un detalle logístico: define cuántos puntos puede cubrir un supervisor en un día y cuántos turnos se pueden encadenar.

**El retail negocia distinto.** Las grandes cadenas tienen áreas dedicadas a espacios comerciales, calendarios cerrados con meses de antelación y reglas de montaje estrictas. Lo desarrollamos en [Activaciones BTL en supermercados](${L.retail}).

**La zona no es un dato demográfico, es operativo.** El mismo producto se activa distinto en un centro comercial del norte, en una plaza del sur o en un corredor de oficinas al mediodía. Cambia la mecánica, el perfil del equipo y hasta la duración del turno.

**La competencia por el espacio es real.** En temporada alta, los buenos puntos están tomados. Eso está desarrollado en [Activaciones BTL de fin de año](${L.finDeAno}).

## Cómo se arma una campaña aquí

1. **Zonificar antes que listar puntos.** Primero se decide en qué zonas tiene sentido estar; los puntos salen de ahí, no al revés.
2. **Agrupar por ruta.** Puntos cercanos en el mismo turno, para que el desplazamiento no se coma la jornada.
3. **Un supervisor por zona, no por campaña.** Con las distancias de Bogotá, una sola persona supervisando toda la ciudad no supervisa nada.
4. **Equipo que viva cerca de su punto.** Reduce retrasos y rotación, que es el problema crónico de las campañas largas.
5. **Reporte por zona además de por punto.** Comparar norte con sur dice más que el promedio de la ciudad.

El orden completo de una campaña está en [Campañas BTL: del brief a la calle](${L.campanas}).

## Qué encarece una campaña en Bogotá

Para que no sorprenda en la cotización:

- **El desplazamiento**, que se paga en horas de equipo aunque no se vea en la factura como una línea aparte.
- **Los espacios en retail de alto flujo**, que son los más disputados del país.
- **La supervisión**, porque hacen falta más supervisores para la misma cantidad de puntos.
- **El almacenamiento**, cuando la campaña es larga y el material no puede viajar cada día.

El desglose general de lo que mueve un presupuesto está en [Cuánto cuesta una activación BTL](${L.costos}).

## Cómo trabajamos la plaza

Contraste opera desde Medellín y ejecuta en las nueve principales ciudades de Colombia, Bogotá incluida, con coordinadores y promotores en cada plaza y un mismo protocolo de producción y de reporte. Eso es lo que permite que una marca salga el mismo día en dos ciudades y pueda comparar los resultados, porque las dos reportan igual.

Los casos publicados son de Antioquia —[la ruta de chirimía por el norte](${L.chirimia}), [el parque de Jericó](${L.jerico}), [La Tropa en calle](${L.tropa})—, y son los que mejor muestran el estándar de operación: el mismo que se aplica aquí. Hay siete descritos en [Activaciones de marca: ejemplos reales](${L.ejemplos}).

## Qué preguntar antes de contratar en Bogotá

Además de lo habitual, que está en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}):

1. ¿Cuántos supervisores hay por zona?
2. ¿El equipo es de la zona donde va a trabajar?
3. ¿Cómo se mueve el material entre puntos y dónde se guarda?
4. ¿Qué pasa si un punto cambia el espacio autorizado el mismo día?
5. ¿El reporte llega por zona o sólo un total de ciudad?

Si tienes una campaña para Bogotá, [cuéntanos el objetivo](${L.contacto}) y la zonificamos contigo.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace diferente una activación BTL en Bogotá?',
        a: 'Las distancias y el tráfico, que definen cuántos puntos cubre un supervisor al día; la negociación con grandes cadenas, que cierran calendarios con meses de antelación; y la diferencia operativa entre zonas, que cambia la mecánica, el perfil del equipo y la duración del turno.',
      },
      {
        q: '¿Cómo se organiza una campaña BTL en Bogotá?',
        a: 'Zonificando primero y eligiendo los puntos después, agrupando puntos cercanos en el mismo turno, poniendo un supervisor por zona en lugar de uno para toda la ciudad, contratando equipo que viva cerca de su punto y reportando por zona además de por punto.',
      },
      {
        q: '¿Qué encarece una activación en Bogotá frente a otras ciudades?',
        a: 'El desplazamiento, que se paga en horas de equipo; los espacios en retail de alto flujo, los más disputados del país; la supervisión, porque hacen falta más supervisores para los mismos puntos; y el almacenamiento del material en campañas largas.',
      },
      {
        q: '¿Una agencia con sede en Medellín puede operar en Bogotá?',
        a: 'Sí, cuando tiene coordinadores y promotores propios en la plaza y un mismo protocolo de producción y reporte. Eso es lo que permite que una marca salga el mismo día en varias ciudades y pueda comparar resultados entre ellas, porque todas reportan igual.',
      },
      {
        q: '¿Qué preguntar a una agencia antes de contratar una campaña en Bogotá?',
        a: 'Cuántos supervisores hay por zona, si el equipo es de la zona donde trabajará, cómo se mueve y dónde se guarda el material, qué pasa si un punto cambia el espacio autorizado el mismo día, y si el reporte llega desglosado por zona o sólo como total de ciudad.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-en-supermercados-y-retail',
    publishedAt: '2026-10-27',
    title: 'Activaciones BTL en supermercados y retail',
    excerpt:
      'En el canal moderno no se activa donde uno quiere: se activa donde la cadena autoriza, cuando autoriza y con las reglas que pone. Cómo se negocia el espacio y qué hay que tener listo antes de pisar la tienda.',
    metaDescription:
      'Cómo se hacen activaciones BTL en supermercados y grandes superficies: negociación del espacio, reglas de montaje, equipo, permisos y qué se mide.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'activaciones BTL',
      'activaciones en supermercados',
      'trade marketing',
      'impulso en punto de venta',
      'retail moderno',
    ],
    body: `En el canal tradicional la conversación es con el tendero y se resuelve en el mostrador. En el **retail moderno** —supermercados, hipermercados, grandes superficies— la conversación es con un área comercial, hay un calendario cerrado, un tarifario y un manual de montaje. Quien llega con la idea pero sin el espacio negociado no activa.

Este artículo es la contraparte de [Trade marketing en canal tradicional](${L.tat}), que cubre el TAT.

## Cómo se consigue el espacio

**No se improvisa.** Las cadenas asignan espacios comerciales con semanas o meses de antelación, y las fechas buenas —quincenas, fines de semana, temporada— son las primeras en irse.

**El espacio tiene nombre y precio.** Isla, cabecera de góndola, punta de pasillo, exhibición adicional: cada ubicación cuesta distinto y rinde distinto. No es lo mismo estar en el pasillo correcto que estar donde quedó sitio.

**Hay reglas que no se negocian.** Horarios de montaje y desmontaje, dimensiones máximas, materiales permitidos, seguros, uniformes, manipulación de alimentos si hay degustación. Saltarse una suele costar el espacio entero.

**La marca no siempre decide sola.** En muchos casos el espacio se negocia junto con el comprador de la categoría, y entra dentro de un acuerdo comercial más grande.

## Qué hay que tener listo antes

- **La autorización escrita**, con fecha, punto, ubicación exacta y horario.
- **El montaje a medida del espacio** autorizado, no uno genérico que «más o menos cabe».
- **Material POP aprobado**, que es lo que convierte un metro cuadrado en presencia de marca. Cómo se audita está en [Material POP](${L.pop}).
- **El equipo entrenado en el producto y en las normas de la cadena**, que no son las mismas en todas. Está en [Promotoras e impulsadoras](${L.equipo}).
- **Inventario suficiente en ese punto** para toda la activación. Generar demanda donde el producto se agota el segundo día es regalar la venta.

## Las mecánicas que funcionan en este canal

- **Degustación e impulso**, la más usada y la que mejor rinde cuando el producto gana al probarlo. Desarrollada en [Degustaciones y sampling](${L.degustaciones}).
- **Demostración**, para productos que hay que ver funcionando. Ver [Activaciones BTL para marcas de tecnología](${L.tech}).
- **Visibilidad ampliada**, cuando el objetivo es que el producto deje de perderse en el lineal.
- **Mecánicas de recompra**, que buscan que la segunda compra ocurra sin activación.

Lo que no funciona: cualquier cosa que exija más de unos segundos de atención. Quien está haciendo mercado tiene una lista y prisa.

## Cuándo activar

El día y la hora pesan tanto como la ubicación. Un espacio excelente un martes por la mañana rinde la mitad que un espacio mediano un sábado al mediodía, y cuesta lo mismo.

- **Fines de semana y quincenas**, que concentran el mercado grande del hogar.
- **Las horas de mayor flujo de cada punto**, que no son iguales en una tienda de barrio alto que en una de corredor de oficinas. La cadena suele tener ese dato y conviene pedirlo.
- **Vísperas de temporada**, antes de que el lineal se sature y la atención se disperse. Está desarrollado en [Activaciones BTL de fin de año](${L.finDeAno}).

Y una advertencia que se repite: no tiene sentido activar en un punto donde el producto todavía no llegó. Primero la distribución, después la activación, como explicamos en [Lanzamiento de producto](${L.lanzamientoPost}).

## Cómo se mide aquí

El canal moderno tiene una ventaja sobre todos los demás: **los datos de venta existen**. Eso permite la medición más dura que hay en BTL, que es comparar la rotación del punto activado con la de un punto equivalente sin activación, en el mismo periodo.

A eso se suman los indicadores de calle: contactos efectivos, pruebas entregadas y conversión. Qué contar y qué ignorar está en [Cómo medir una activación BTL](${L.metricas}), y el marco general en [Estrategias BTL](${L.estrategias}).

## El error más caro

Pagar el espacio y descuidar el equipo. Una isla en la mejor ubicación de la tienda, con una persona que no sabe explicar el producto, rinde menos que una ubicación mediocre con alguien que sí. El espacio se compra; la conversación no.

Si quieres activar en cadena y no sabes por dónde empezar la negociación, [escríbenos](${L.contacto}). También puedes ver cómo se aplica esto a [consumo masivo](${L.consumo}) y a [bebidas](${L.bebidas}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se consigue un espacio para activar en un supermercado?',
        a: 'Se negocia con el área comercial de la cadena, normalmente con semanas o meses de antelación y dentro de un calendario de espacios. Cada ubicación —isla, cabecera de góndola, punta de pasillo— tiene su precio y sus reglas, y en muchos casos se acuerda junto con el comprador de la categoría.',
      },
      {
        q: '¿Qué reglas pone una cadena para una activación?',
        a: 'Horarios fijos de montaje y desmontaje, dimensiones máximas, materiales permitidos, seguros, uniformes y, si hay degustación, requisitos de manipulación de alimentos. Incumplir una suele costar el espacio completo, así que se revisan antes de diseñar el montaje.',
      },
      {
        q: '¿Qué diferencia hay entre activar en supermercado y en tienda de barrio?',
        a: 'En el canal moderno se negocia con un área comercial, hay calendario, tarifario y manual de montaje. En el canal tradicional la conversación es directa con el tendero y lo que pesa es la cobertura y la frecuencia de la ruta, no la negociación del espacio.',
      },
      {
        q: '¿Qué mecánicas funcionan mejor en un supermercado?',
        a: 'La degustación y el impulso cuando el producto gana al probarlo, la demostración cuando hay que verlo funcionando, la visibilidad ampliada cuando el problema es que se pierde en el lineal, y las mecánicas de recompra. Nada que exija más de unos segundos: la gente va con lista y con prisa.',
      },
      {
        q: '¿Cómo se mide una activación en retail moderno?',
        a: 'Con la ventaja de que los datos de venta existen: se compara la rotación del punto activado con la de un punto equivalente sin activación durante el mismo periodo. A eso se suman contactos efectivos, pruebas entregadas y conversión.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'stands-para-ferias-que-funcionan',
    publishedAt: '2026-10-28',
    title: 'Stands para ferias: qué hace que uno funcione',
    excerpt:
      'Un stand bonito y vacío es el resultado más caro de una feria. Qué decide que la gente entre, cuánto se invierte en estructura frente a equipo y qué hay que tener resuelto antes del montaje.',
    metaDescription:
      'Cómo se diseña un stand de feria que atraiga gente: ubicación, apertura, mecánica, equipo y montaje. Qué presupuestar y qué errores salen caros.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Colombia',
    niches: ['tecnologia', 'inmobiliario', 'consumo-masivo'],
    keywords: [
      'stands para ferias',
      'diseño de stands',
      'activaciones BTL',
      'ferias y eventos',
      'producción de eventos',
    ],
    body: `El resultado más caro de una feria es un **stand** impecable al que no entra nadie. Pasa más de lo que parece: se invierte casi todo el presupuesto en la estructura y casi nada en lo que hace que la gente se acerque.

Si lo que buscas es el panorama del canal, está en [Activaciones BTL en centros comerciales y ferias](${L.centros}). Esto va sobre la pieza.

## Qué decide que la gente entre

**La apertura.** Un stand cerrado por tres lados, con mostrador al frente, le dice a la gente que ahí van a venderle algo. Uno abierto, por el que se puede pasar, invita. La diferencia en tráfico entre los dos es enorme y no cuesta más.

**Que se entienda en tres segundos.** Desde el pasillo tiene que leerse qué marca es y qué se puede hacer ahí. Si hay que acercarse para entenderlo, no se acercan.

**Que haya algo que hacer.** No algo que mirar: algo que hacer. Probar, jugar, competir, configurar, recibir algo. Es la diferencia entre un expositor y una experiencia, que desarrollamos en [Marketing experiencial](${L.experiencial}).

**Quién está dentro.** Un equipo de pie, atento y que aborda bien convierte un stand mediano en el más visitado del pabellón. Tres personas sentadas mirando el teléfono vacían el mejor stand de la feria. Está en [Promotoras e impulsadoras](${L.equipo}).

## Dónde se va el presupuesto

Una referencia útil para repartirlo:

- **Espacio**: lo fija la feria y es lo primero que se cierra. Las esquinas y los pasillos principales cuestan más y lo valen.
- **Estructura y montaje**: lo que más tiende a inflarse. Un stand modular reutilizable en varias ferias sale mucho mejor que uno a medida de un solo uso.
- **Contenido y mecánica**: lo que la gente va a hacer. Suele ser lo primero que se recorta y es justo lo que trae gente.
- **Equipo**: el que convierte visitas en conversaciones.
- **Captura de datos**: formulario corto, con consentimiento, y alguien que vaya a contactar después.

Esa última línea es la que decide si la feria sirvió. Lo desarrollamos en [Del lead a la venta](${L.leads}).

## Lo que hay que tener resuelto antes del montaje

- **El plano aprobado** por la organización, con medidas, alturas y conexiones eléctricas.
- **Los horarios de montaje y desmontaje**, que en ferias son estrictos y suelen ser de madrugada.
- **El inventario de material** que entra y el que debe volver.
- **El plan B** para lo de siempre: una pieza que no llega, una pantalla que no enciende, una persona que falta.

El detalle completo está en [Producción de eventos BTL](${L.produccion}).

## Tres errores que se repiten

**Diseñar para la foto.** Un stand pensado para que se vea bien en una foto suele estar pensado para mirarse, no para entrar.

**Llevar material y no mecánica.** Mil folletos no atraen a nadie; una razón para detenerse, sí.

**No tener qué hacer con los datos.** Se capturan trescientos contactos en tres días, vuelven a la oficina y nadie los llama. Esa feria se perdió entera, por mucho que el stand estuviera lleno.

## El equipo: cuántos y en qué turnos

Es la parte que se improvisa y la que decide el resultado. Dos criterios:

- **Nunca menos de dos personas por turno.** Una sola no puede atender a alguien y abordar al que pasa al mismo tiempo, y en el momento en que se distrae el stand queda vacío a la vista de todos.
- **Turnos cortos.** Abordar con energía durante nueve horas seguidas no lo hace nadie. En ferias largas, dos turnos rinden mucho más que uno estirado, aunque cueste más.

A eso se suma un responsable que no atienda público: el que resuelve lo que se rompe, repone material y mantiene el ritmo. Cómo se arma y se entrena ese equipo está en [Promotoras e impulsadoras](${L.equipo}).

## Cómo se mide una feria

No por visitantes del pabellón, que es un dato de la feria y no tuyo. Por **contactos efectivos en el stand**, participaciones en la mecánica, datos capturados con su calidad y, sobre todo, qué pasó con esos datos después. Qué contar y qué ignorar está en [Cómo medir una activación BTL](${L.metricas}).

Si tienes una feria en el calendario, [escríbenos](${L.contacto}) y lo revisamos antes de que se cierre el espacio.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace que un stand de feria atraiga gente?',
        a: 'Que esté abierto y se pueda pasar por él en vez de cerrado con un mostrador al frente; que desde el pasillo se entienda en tres segundos de qué marca es y qué se puede hacer; que haya algo que hacer y no sólo que mirar; y un equipo de pie y atento que sepa abordar.',
      },
      {
        q: '¿Cómo se reparte el presupuesto de un stand?',
        a: 'Entre el espacio que fija la feria, la estructura y el montaje, el contenido o mecánica, el equipo que atiende y la captura de datos. El error habitual es inflar la estructura y recortar la mecánica y el equipo, que son justo lo que trae y convierte gente.',
      },
      {
        q: '¿Conviene un stand a medida o uno modular?',
        a: 'Si se va a más de una feria, el modular reutilizable sale mucho mejor: se amortiza entre eventos y se arma y desarma sin deteriorarse. El stand a medida de un solo uso sólo se justifica cuando la pieza en sí es el mensaje.',
      },
      {
        q: '¿Qué hay que tener listo antes del montaje de una feria?',
        a: 'El plano aprobado por la organización con medidas, alturas y conexiones eléctricas; los horarios de montaje y desmontaje, que suelen ser de madrugada y son estrictos; el inventario de lo que entra y lo que debe volver; y un plan B escrito para piezas que no llegan, equipos que fallan o personal que falta.',
      },
      {
        q: '¿Cómo se mide si una feria valió la pena?',
        a: 'No por los visitantes del pabellón, que es un dato de la feria. Por contactos efectivos en el stand, participaciones en la mecánica, datos capturados y su calidad, y sobre todo por qué pasó con esos datos después del evento.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'embajadores-de-marca-brand-ambassador',
    publishedAt: '2026-10-29',
    title: 'Embajadores de marca: cuándo valen la pena',
    excerpt:
      'Un embajador no es una promotora con otro nombre ni un influencer barato. Es alguien que representa la marca de forma sostenida y con criterio propio. Cuándo tiene sentido, cómo se selecciona y cómo se mide.',
    metaDescription:
      'Qué es un embajador de marca, en qué se diferencia de una promotora y de un influencer, cuándo conviene tener uno y cómo se selecciona, entrena y mide.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Colombia',
    niches: ['bebidas', 'tecnologia', 'consumo-masivo'],
    keywords: [
      'embajadores de marca',
      'brand ambassador',
      'activaciones de marca',
      'promotoría',
      'marketing experiencial',
    ],
    body: `**Embajador de marca** se usa hoy para tres cosas distintas, y de ahí vienen la mitad de las decepciones: para una promotora con uniforme bonito, para un influencer con descuento y para lo que de verdad es un embajador.

Un embajador es alguien que representa la marca **de forma sostenida**, que la conoce a fondo y que habla de ella con criterio propio, no con un libreto. La diferencia con las otras dos figuras no es de categoría: es de duración y de profundidad.

## En qué se diferencia de una promotora

No es mejor ni peor, es otro trabajo:

| | Promotor en punto | Embajador |
|---|---|---|
| Duración | Por campaña o turno | Sostenida en el tiempo |
| Conocimiento | Del producto y la mecánica | De la marca, la categoría y la competencia |
| Qué dice | Un argumentario definido | Criterio propio sobre una base |
| Dónde actúa | El punto asignado | Varios contextos, dentro y fuera de la activación |
| Qué construye | Prueba y venta inmediata | Relación y credibilidad |

El trabajo de calle está desarrollado en [Promotoras e impulsadoras](${L.equipo}). Las dos figuras se complementan: el embajador suele ser quien forma y sostiene al equipo de punto.

## Y de un influencer

El influencer aporta **alcance prestado**: su audiencia. El embajador aporta **conocimiento y presencia**: está donde está la marca y responde preguntas difíciles. Uno se mide en impresiones; el otro, en conversaciones y en lo que pasa después.

Pueden ser la misma persona, pero son dos contratos distintos y conviene no confundirlos al negociar.

## Cuándo tiene sentido

- **Categorías donde hay que saber.** Licores, tecnología, productos con una historia o un proceso detrás. Alguien tiene que poder responder la pregunta incómoda. Es el caso de [bebidas](${L.bebidas}) y de [tecnología](${L.tech}).
- **Marcas en construcción.** Cuando la marca aún no tiene reconocimiento, una cara constante vale más que muchas caras distintas.
- **Operaciones largas.** Una campaña de meses con rotación alta de personal necesita a alguien que mantenga el estándar.
- **Territorio.** En plaza propia, alguien conocido abre puertas que un desconocido tarda semanas en abrir.

## Cuándo no

- Si lo que necesitas es cobertura amplia y rápida: eso es promotoría, y está en [Campañas BTL](${L.campanas}).
- Si el producto se explica solo y lo que falta es prueba: eso es [degustación y sampling](${L.degustaciones}).
- Si el presupuesto sólo da para un mes. Un embajador por un mes es un promotor caro.

## Cómo se selecciona

Tres criterios, en este orden:

1. **Que encaje con la categoría**, no sólo con la marca. Alguien que ya se mueve en ese mundo entiende las preguntas antes de que se las hagan.
2. **Que sepa escuchar.** El trabajo no es hablar bien: es sostener una conversación donde la otra persona dice lo que piensa del producto.
3. **Que resista la repetición.** Decir lo mismo con la misma energía la vez número cuarenta es el trabajo real.

Y después: formación de verdad sobre el producto, la categoría y la competencia, con límites claros de qué se puede afirmar y qué no.

## Cómo se mide

Aquí está el riesgo: el embajador es el sitio donde más fácil se cuelan las métricas de vanidad. Seguidores, publicaciones, apariciones. Lo que sirve:

- **Conversaciones sostenidas** en los contextos donde actúa.
- **Datos capturados** y qué pasó con ellos, que está en [Del lead a la venta](${L.leads}).
- **Calidad del equipo que forma**: si los promotores a su cargo rinden mejor, el embajador está trabajando.
- **Repetición de compra o de contacto** en la plaza donde actúa.

El criterio para separar lo que decide de lo que decora está en [Cómo medir una activación BTL](${L.metricas}).

¿Tienes una categoría que necesita que alguien sepa explicarla? [Cuéntanos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es un embajador de marca?',
        a: 'Alguien que representa la marca de forma sostenida en el tiempo, la conoce a fondo junto con su categoría y su competencia, y habla de ella con criterio propio en vez de con un libreto. Lo que lo define no es el cargo, es la duración y la profundidad del conocimiento.',
      },
      {
        q: '¿Cuál es la diferencia entre un embajador de marca y una promotora?',
        a: 'La promotora trabaja por campaña o por turno en un punto asignado, con un argumentario definido, y busca prueba y venta inmediata. El embajador actúa de forma sostenida en varios contextos, responde con criterio propio y construye relación y credibilidad. Suele ser además quien forma al equipo de punto.',
      },
      {
        q: '¿Un embajador de marca es lo mismo que un influencer?',
        a: 'No. El influencer aporta alcance prestado a través de su audiencia y se mide en impresiones. El embajador aporta conocimiento y presencia física donde está la marca, y se mide en conversaciones y en lo que ocurre después. Pueden ser la misma persona, pero son dos contratos distintos.',
      },
      {
        q: '¿Cuándo conviene tener un embajador de marca?',
        a: 'En categorías donde hay que saber para responder preguntas difíciles, como licores o tecnología; en marcas que aún están construyendo reconocimiento; en operaciones largas con rotación alta de personal; y en plazas donde alguien conocido abre puertas más rápido.',
      },
      {
        q: '¿Cómo se mide el trabajo de un embajador de marca?',
        a: 'Con conversaciones sostenidas en los contextos donde actúa, datos capturados y lo que pasó con ellos, el rendimiento del equipo que forma, y la repetición de compra o de contacto en su plaza. Seguidores y número de apariciones son métricas de vanidad.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'agencia-btl-o-agencia-de-eventos',
    publishedAt: '2026-10-30',
    title: 'Agencia BTL o agencia de eventos: cuál necesitas',
    excerpt:
      'Se parecen bastante y cobran parecido, pero resuelven cosas distintas. Una produce un momento y la otra persigue un resultado comercial. Cómo saber cuál te hace falta antes de pedir cotizaciones.',
    metaDescription:
      'Diferencias entre una agencia BTL y una agencia de eventos: qué hace cada una, cómo cobran, qué entregan al final y cómo elegir según tu objetivo.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Colombia',
    niches: ['bebidas', 'consumo-masivo', 'inmobiliario', 'tecnologia'],
    keywords: [
      'agencia BTL',
      'agencia de eventos',
      'agencias BTL',
      'activaciones de marca',
      'producción de eventos',
    ],
    body: `Es una duda razonable y nadie la responde con claridad, porque las dos cosas se solapan: las dos montan, las dos ponen personal y las dos cobran parecido. La diferencia está en **qué persiguen** y, por tanto, en qué te entregan al final.

Si quieres el detalle del servicio, está en [Qué hace una agencia BTL](${L.queHace}).

## La diferencia de fondo

**Una agencia de eventos produce un momento.** Su éxito es que el evento salga bien: que todo esté a tiempo, que la experiencia sea buena, que nadie note los problemas. El entregable es el evento.

**Una agencia BTL persigue un resultado comercial.** El montaje es un medio. Su éxito es que algo cambie: que se pruebe el producto, que se capturen contactos, que rote más ese punto. El entregable es el evento **y el dato de qué produjo**.

Por eso una cotización de BTL seria incluye siempre una línea que en eventos no suele estar: qué se va a medir y cómo se va a reportar.

## Cómo se nota en la práctica

| | Agencia de eventos | Agencia BTL |
|---|---|---|
| Objetivo | Que el evento salga bien | Que el negocio se mueva |
| Dónde ocurre | Un lugar y una fecha | Rutas, puntos, canales, repetición |
| Equipo | Logístico y de protocolo | Promotoría entrenada en el producto |
| Entregable | El evento y su registro | El evento, el reporte y la lectura |
| Se repite | Cada evento es único | Por diseño, para poder comparar |

## Cuál necesitas

**Agencia de eventos** si lo que tienes es una fecha y un público convocado: un aniversario, una convención, una premiación, una celebración interna. El objetivo es la experiencia, no la conversión.

**Agencia BTL** si lo que tienes es un objetivo comercial: que prueben un producto nuevo, que rote más en ciertos puntos, que lleguen contactos para el equipo de ventas, que la marca esté donde se decide la compra. Ahí el evento es la herramienta.

Los casos intermedios existen y son los más comunes: un lanzamiento de producto necesita las dos cosas. Está desarrollado en [Lanzamiento de producto](${L.lanzamientoPost}), y la parte de montaje en [Producción de eventos BTL](${L.produccion}).

## La pregunta que lo resuelve

Antes de pedir cotizaciones, responde esto: **¿cómo vas a saber si funcionó?**

- Si la respuesta tiene que ver con cómo salió y cómo se sintió la gente → agencia de eventos.
- Si tiene que ver con cuántos probaron, cuántos dejaron datos o cuánto rotó → agencia BTL.

Si la respuesta es «no sé», ese es el primer trabajo, y una agencia BTL seria debería ayudarte a definirlo antes de cotizar. El marco está en [Estrategias BTL](${L.estrategias}) y en [Cómo medir una activación BTL](${L.metricas}).

## Cómo leer las dos cotizaciones

Si pides a las dos, vas a ver propuestas que parecen iguales. Mira estas líneas:

1. **¿Hay indicadores definidos?** Si no los hay, estás comprando un evento.
2. **¿Quién está en el punto y con qué entrenamiento?** Logística y promotoría no son lo mismo.
3. **¿Cuándo llega el reporte?** Durante la campaña o la semana siguiente marca la diferencia entre corregir y archivar.
4. **¿Qué pasa después?** Quién contacta a la gente que dejó sus datos. Eso está en [Del lead a la venta](${L.leads}).
5. **¿Se puede repetir?** Una activación que no se puede replicar no se puede comparar.

Las preguntas completas están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}), y lo que mueve el presupuesto, en [Cuánto cuesta una activación BTL](${L.costos}).

## Qué hace Contraste

Contraste es una agencia BTL: diseña, produce y **mide** activaciones de marca. Produce el montaje cuando hace falta —lanzamientos, ferias, eventos de marca— pero lo que entrega al final es el reporte de qué pasó por punto, por turno y por promotor. Lo resume el propio equipo en [este reel](${L.datos}): un evento sin medición es un gasto, no una inversión.

Si no tienes claro cuál necesitas, [cuéntanos el objetivo](${L.contacto}) y te decimos con franqueza si esto es para nosotros o para una agencia de eventos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuál es la diferencia entre una agencia BTL y una agencia de eventos?',
        a: 'La agencia de eventos produce un momento y su éxito es que el evento salga bien. La agencia BTL persigue un resultado comercial y el montaje es un medio: su entregable es el evento y además el dato de qué produjo, con un reporte de lo que pasó.',
      },
      {
        q: '¿Cómo sé cuál de las dos necesito?',
        a: 'Respondiendo cómo vas a saber si funcionó. Si la respuesta tiene que ver con cómo salió y cómo se sintió la gente, necesitas una agencia de eventos. Si tiene que ver con cuántos probaron, cuántos dejaron datos o cuánto rotó el producto, necesitas una agencia BTL.',
      },
      {
        q: '¿Una agencia BTL también produce eventos?',
        a: 'Sí. Monta lanzamientos, ferias y eventos de marca, con estructura, logística, personal y permisos. La diferencia es que el montaje se diseña alrededor de un objetivo comercial y se entrega acompañado del reporte de resultados.',
      },
      {
        q: '¿Qué debe incluir una cotización de BTL que una de eventos no incluye?',
        a: 'Los indicadores que se van a medir y cómo se va a reportar: por punto, por turno y por promotor, y con qué frecuencia. Si una propuesta no define qué se va a medir, lo que estás comprando es un evento, por mucho que se llame activación.',
      },
      {
        q: '¿Un lanzamiento de producto necesita agencia BTL o de eventos?',
        a: 'Las dos cosas, y por eso es el caso más común. El acto de lanzamiento es producción de evento; las semanas siguientes en calle y punto de venta, con prueba, visibilidad y medición, son trabajo BTL. Una agencia BTL con capacidad de producción cubre ambas partes.',
      },
    ],
  },
]
