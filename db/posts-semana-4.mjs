/**
 * Cuarta tanda de artículos del blog (semana del 2026-10-05).
 *
 * Objetivo: cubrir las búsquedas que el blog todavía no tocaba y que el
 * cliente pidió posicionar en el marquee del home.
 *
 *   · "agencia btl medellín" y "agencias btl" → no había ningún artículo con
 *     intención local, que es justo donde se juega el bloque de mapas.
 *   · "campañas btl" → había el qué y el cuánto, pero no el cómo se planea.
 *   · Street marketing y guerrilla → términos con búsqueda propia que el blog
 *     no nombraba en ninguna parte.
 *   · Lanzamiento de producto y producción de eventos → dos servicios reales
 *     de la agencia sin artículo que los explique.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 18 artículos ya en vivo.
 *
 * Reglas de redacción (iguales a las tres tandas anteriores):
 *   · Cada cifra va atribuida a quien la dijo. Nada de precios inventados.
 *   · Los casos dicen lo que dice su publicación, ni un resultado de más.
 *   · No se nombran marcas que no estén en el muro de clientes o en un caso
 *     publicado.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=4 --escribir --publicar
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
  calles: 'https://www.instagram.com/agencia_contraste/p/DdNQtqlDCoL/',
  territorio: 'https://www.instagram.com/agencia_contraste/reel/DXo1VmGDl9K/',
  lanzamiento: 'https://www.instagram.com/agencia_contraste/reel/DXfmY0yDOP2/',
  tropa: 'https://www.instagram.com/agencia_contraste/reel/DV96S1_DOcj/',
  yarumal: 'https://www.instagram.com/agencia_contraste/reel/DVuaDhejFW4/',
  venecia: 'https://www.instagram.com/agencia_contraste/reel/DVGsV7ajkwu/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  // Landings y páginas
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
  // Blog de esta tanda
  medellin: '/blog/agencia-btl-en-medellin',
  campanas: '/blog/campanas-btl-del-brief-a-la-calle',
  street: '/blog/street-marketing-y-marketing-de-guerrilla',
  lanzamientoPost: '/blog/lanzamiento-de-producto-con-activaciones-btl',
  produccion: '/blog/produccion-de-eventos-btl-que-incluye',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'agencia-btl-en-medellin',
    publishedAt: '2026-10-05',
    title: 'Agencia BTL en Medellín: cómo se activa Antioquia',
    excerpt:
      'Medellín y los municipios de Antioquia no se activan igual: cambian los permisos, la logística, el equipo y hasta el día de la semana que funciona. Cómo opera una agencia BTL local.',
    metaDescription:
      'Agencia BTL en Medellín y Antioquia: cómo se planea, se opera y se mide una activación en la ciudad y en los municipios, con casos reales publicados.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Medellín, Antioquia',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'agencia BTL Medellín',
      'agencias BTL',
      'activaciones BTL Medellín',
      'marketing BTL Antioquia',
      'activaciones de marca en municipios',
    ],
    body: `Buscar una **agencia BTL en Medellín** no es lo mismo que buscar una agencia de publicidad. Lo que se contrata aquí es una operación en la calle: gente, montaje, permisos y una logística que tiene que funcionar un sábado a las seis de la tarde en un parque de pueblo, no sólo en una presentación.

Si todavía estás ubicando el término, en [Qué es BTL](${L.queEsBtl}) está la definición y en [ATL y BTL](${L.atlBtl}) la diferencia con la pauta masiva. Este artículo es la versión aterrizada a Antioquia.

## Por qué el territorio cambia la campaña

Una misma marca no se activa igual en El Poblado que en Jericó. Lo que cambia no es el concepto, es todo lo demás:

- **Los permisos.** En centros comerciales y grandes superficies se negocia con la administración, con reglas de montaje, horarios y seguros. En un municipio se habla con la alcaldía y, muchas veces, con la junta de la fiesta.
- **La logística.** En la ciudad el equipo llega por su cuenta. Fuera de ella hay que mover personal, producción y material por carretera, con tiempos de viaje que condicionan la hora de montaje.
- **El calendario.** En Medellín manda el fin de semana y la quincena. En los municipios manda la fiesta patronal, que concentra en tres días lo que en la ciudad pasa en un mes.
- **El equipo.** Una promotora que conoce el pueblo abre conversaciones que una persona traída de fuera tarda media hora en abrir.

## Qué hace una agencia BTL local que no hace una de fuera

Tener base en Medellín no es un dato de la ficha de contacto, es lo que sostiene la operación:

- **Equipo propio y conocido.** No se arma una tropa distinta cada vez. En [Promotoras e impulsadoras](${L.equipo}) explicamos por qué el equipo de calle es el servicio, no un accesorio.
- **Proveedores de la zona** para montaje, sonido, estructura y transporte, que es lo que permite responder a un cambio de última hora.
- **Conocimiento de los canales reales.** El canal tradicional de Antioquia tiene sus propias reglas; las desarrollamos en [Trade marketing en canal tradicional](${L.tat}).
- **Capacidad de volver.** Una campaña en municipios no es una visita: es una ruta que se repite, y eso sólo lo sostiene quien está cerca.

## Activaciones reales en Antioquia

Todas publicadas en el [Instagram de Contraste](${L.ig}):

- **Chirimía de los que saben**: recorrido por Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras y equipo logístico. [Ver](${L.chirimia})
- **RONDANDOS en Jericó**: el parque principal convertido en plataforma de marca, con artistas y dinámicas. [Ver](${L.jerico})
- **Venecia**: música en vivo, degustación y montaje de branding. [Ver](${L.venecia})
- **Yarumal**: show con artistas populares para generar tráfico y objetivos de trade marketing dentro del punto. [Ver](${L.yarumal})
- **La Tropa**: activación móvil por calles y puntos de venta. [Ver](${L.tropa})

Hay siete ejemplos más, con lo que hizo cada uno, en [Activaciones de marca: ejemplos reales](${L.ejemplos}).

## Qué preguntar antes de contratar

Las mismas preguntas que valen para cualquier agencia, más dos que sólo aplican aquí:

1. ¿Quién va a estar en el punto y quién lo supervisa?
2. ¿Qué se reporta y cada cuánto?
3. ¿Quién tramita los permisos del municipio o de la cadena?
4. ¿La agencia ha operado antes en esa subregión?
5. ¿Qué pasa si llueve, si se cae el artista o si el punto no autoriza el montaje?

La lista completa está en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}), y lo que se cobra y por qué, en [Cuánto cuesta una activación BTL](${L.costos}).

## Cómo se mide

Una activación en territorio se mide igual que una en ciudad: contactos efectivos, muestras entregadas, conversaciones reales, datos capturados y rotación del punto frente a un punto equivalente sin activación. El marco completo está en [Estrategias BTL](${L.estrategias}). Y la idea de fondo la resume el propio equipo en [este reel](${L.datos}): un evento sin medición es un gasto, no una inversión.

Si quieres ver cómo se traduce esto a tu sector, están las páginas de [bebidas](${L.bebidas}), [consumo masivo](${L.consumo}), [desarrollo inmobiliario](${L.inmobiliario}) y [tecnología](${L.tecnologia}). Y si prefieres hablarlo, [escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace una agencia BTL en Medellín?',
        a: 'Planea y opera activaciones de marca en la calle, en punto de venta y en eventos: define la mecánica, consigue los permisos, monta la producción, pone el equipo de promotoría y entrega un reporte de lo que pasó en cada punto. En Medellín y Antioquia eso incluye operar tanto en retail de la ciudad como en municipios.',
      },
      {
        q: '¿Cuál es la diferencia entre activar en Medellín y en un municipio?',
        a: 'Cambian los permisos (administración del centro comercial frente a alcaldía y junta de la fiesta), la logística de transporte de equipo y producción, el calendario (fin de semana y quincena frente a fiesta patronal) y el perfil del equipo de calle, que rinde más cuando conoce el municipio.',
      },
      {
        q: '¿Conviene contratar una agencia BTL local?',
        a: 'Sí, cuando la campaña se opera en territorio. Una agencia con base en la región tiene equipo conocido, proveedores de montaje y transporte cerca, y capacidad de repetir la ruta. Eso es lo que permite responder a un cambio de última hora el mismo día.',
      },
      {
        q: '¿En qué municipios de Antioquia se pueden hacer activaciones?',
        a: 'Contraste ha publicado activaciones en Jericó, Venecia, Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros, además de la operación en Medellín y el Valle de Aburrá. La cobertura se define por ruta, no por punto suelto.',
      },
      {
        q: '¿Cómo se mide una activación BTL en territorio?',
        a: 'Con contactos efectivos, muestras entregadas, conversaciones reales, datos capturados y, cuando el canal lo permite, la rotación del punto activado frente a un punto equivalente sin activación durante el mismo periodo.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'campanas-btl-del-brief-a-la-calle',
    publishedAt: '2026-10-06',
    title: 'Campañas BTL: del brief a la calle, paso a paso',
    excerpt:
      'Una campaña BTL no empieza con la idea, empieza con el objetivo. Los seis pasos que separan un brief de una operación en calle que se puede medir, con los tiempos reales de cada uno.',
    metaDescription:
      'Cómo se planea una campaña BTL: objetivo, mecánica, puntos, equipo, permisos, producción y medición. Los seis pasos, en orden y con tiempos reales.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Antioquia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'campañas BTL',
      'BTL marketing',
      'cómo planear una campaña BTL',
      'brief de activación de marca',
      'estrategias BTL',
    ],
    body: `La mayoría de las **campañas BTL** que fallan no fallan en la calle: fallan en el brief. Se aprueba una idea bonita sin haber definido qué tiene que pasar para considerarla buena, y al final nadie sabe decir si sirvió.

Este es el orden que sí funciona. Si vienes de más atrás, en [Qué es BTL](${L.queEsBtl}) está la definición y en [Qué hace una agencia BTL](${L.queHace}) el detalle de quién hace cada cosa.

## Paso 1. El objetivo, antes que la idea

Una campaña BTL puede perseguir cosas muy distintas, y cada una se monta diferente:

- **Prueba de producto**: que alguien lo pruebe por primera vez.
- **Rotación**: que el producto salga más rápido de ese punto.
- **Captura de datos**: salir con contactos que el equipo comercial pueda trabajar.
- **Visibilidad**: que la marca se vea donde hoy no se ve.
- **Recordación**: que la experiencia quede asociada a la marca.

No se pueden perseguir las cinco a la vez con el mismo equipo y el mismo presupuesto. Elegir una principal es lo que define todo lo demás.

## Paso 2. La mecánica

La mecánica es lo que va a pasar en el punto, contado en una frase que cualquiera entienda. Degustación, sampling, dinámica, show, demostración, reto. En [Degustaciones y sampling](${L.degustaciones}) está el detalle de las dos más usadas, y en [Activaciones de marca: ejemplos reales](${L.ejemplos}) hay siete mecánicas distintas ya ejecutadas.

La prueba de que una mecánica está bien definida: el promotor puede explicarla en diez segundos y la persona entiende qué gana.

## Paso 3. Los puntos y el calendario

Aquí se decide el 80 % del resultado. Un buen punto en mal horario rinde la mitad que un punto regular en el momento correcto.

- **Retail moderno**: fines de semana, quincenas, horas de mayor flujo.
- **Canal tradicional**: rutas por zona, con cobertura y frecuencia definidas. Lo desarrollamos en [Trade marketing en canal tradicional](${L.tat}).
- **Centros comerciales y ferias**: con la negociación de espacio por delante, explicada en [Activaciones en centros comerciales](${L.centros}).
- **Territorio**: fiestas de municipio, donde la gente ya salió con la intención de pasarla bien.

## Paso 4. El equipo

Cuánta gente, con qué perfil, con qué entrenamiento y quién la supervisa. Una activación con el doble de puntos y el mismo supervisor no es una campaña más grande: es una campaña sin control. Está desarrollado en [Promotoras e impulsadoras](${L.equipo}).

## Paso 5. Permisos y producción

Lo que no se ve y es lo que hace que el día salga: autorizaciones de la cadena o del municipio, montaje, transporte, sonido, estructura, uniformes, material POP y plan B. El detalle completo está en [Producción de eventos BTL](${L.produccion}) y la auditoría del material, en [Material POP](${L.pop}).

## Paso 6. La medición, definida antes de salir

Esto se decide en el brief, no al final. Qué se cuenta, quién lo cuenta, en qué formato y cada cuánto se reporta. Como mínimo: contactos efectivos, muestras entregadas, datos capturados y evidencia fotográfica por punto y por turno.

El marco completo está en [Estrategias BTL](${L.estrategias}), y lo que viene después de la activación —que es donde se pierde la mitad del valor— en [Del lead a la venta](${L.leads}).

## Cuánto tarda cada paso

Como referencia de planeación, no como promesa:

- Objetivo y mecánica: una o dos semanas, con el cliente.
- Puntos, calendario y negociación de espacios: de dos a cuatro semanas, según canal.
- Permisos de municipio o cadena: el plazo más impredecible; se arranca primero.
- Producción y equipo: dos semanas antes de la fecha.
- Reporte: durante la campaña, no al terminar.

En diciembre y en temporada de fiestas todo se alarga y la disponibilidad de personal y producción se reduce, así que esas fechas se cierran con meses de anticipación. Lo que condiciona el presupuesto está en [Cuánto cuesta una activación BTL](${L.costos}).

Si quieres que revisemos tu brief, [escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es una campaña BTL?',
        a: 'Es un conjunto de activaciones de marca planeadas con un mismo objetivo, una misma mecánica y una cobertura definida de puntos y fechas. A diferencia de una activación suelta, la campaña se diseña para repetirse y para poder comparar resultados entre puntos y periodos.',
      },
      {
        q: '¿Cómo se planea una campaña BTL?',
        a: 'En seis pasos y en este orden: definir el objetivo principal, definir la mecánica, elegir puntos y calendario, armar el equipo, resolver permisos y producción, y dejar definida la medición antes de salir a la calle.',
      },
      {
        q: '¿Qué debe llevar el brief de una campaña BTL?',
        a: 'El objetivo principal expresado en una sola frase, el público, el producto, la cobertura de puntos y fechas, el presupuesto disponible, las restricciones legales o de marca, y cómo se va a medir el resultado.',
      },
      {
        q: '¿Con cuánta anticipación se planea una campaña BTL?',
        a: 'Entre cuatro y ocho semanas en condiciones normales. Los permisos de municipio o de cadena son el plazo más impredecible, así que se tramitan primero. En diciembre y en temporadas de fiestas los tiempos se alargan y conviene cerrar con meses de anticipación.',
      },
      {
        q: '¿Qué se mide en una campaña BTL?',
        a: 'Contactos efectivos, muestras entregadas, conversaciones reales, datos capturados, cumplimiento de la ruta de puntos y, cuando el canal lo permite, la rotación de los puntos activados frente a puntos equivalentes sin activación.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'street-marketing-y-marketing-de-guerrilla',
    publishedAt: '2026-10-07',
    title: 'Street marketing y marketing de guerrilla en BTL',
    excerpt:
      'Se usan como sinónimos y no lo son. Uno busca cobertura en la calle y el otro busca sorprender con poco presupuesto. Qué los diferencia y cuándo conviene cada uno dentro de una campaña BTL.',
    metaDescription:
      'Qué es el street marketing, en qué se diferencia del marketing de guerrilla y cuándo usar cada uno dentro de una campaña BTL, con ejemplos reales.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Antioquia',
    niches: ['consumo-masivo'],
    keywords: [
      'street marketing',
      'marketing de guerrilla',
      'activación BTL en calle',
      'publicidad en BTL',
      'marketing experiencial',
    ],
    body: `**Street marketing** y **marketing de guerrilla** aparecen casi siempre en la misma frase, y son dos cosas distintas. Las dos viven dentro del BTL —el contacto directo que explicamos en [Qué es BTL](${L.queEsBtl})—, pero resuelven problemas diferentes y se presupuestan diferente.

## Qué es el street marketing

Es llevar la marca a la calle de forma planeada y repetible: equipos que recorren una zona, entregan muestras, invitan a una dinámica o acercan a la gente a un punto de venta cercano.

Sus rasgos:

- **Cobertura**: se mide en zonas, rutas y turnos.
- **Repetible**: la misma ruta se puede hacer otra vez y comparar.
- **Previsible**: se sabe cuánta gente se va a contactar por hora.
- **Operación intensiva**: el resultado depende del equipo en calle, no de la idea.

La Tropa de Aguardiente Amarillo es un ejemplo exacto: activación móvil recorriendo calles y puntos de venta. [Ver el reel](${L.tropa}).

## Qué es el marketing de guerrilla

Es buscar un impacto desproporcionado respecto al presupuesto, haciendo algo inesperado en un espacio público. Su materia prima es la sorpresa, no la cobertura.

Sus rasgos:

- **Impacto por sorpresa**: funciona una vez, en un sitio concreto.
- **Bajo costo de medios, alto costo de idea**: lo caro es que se le ocurra a alguien y que se pueda ejecutar.
- **Depende de que se replique**: si nadie lo graba ni lo comparte, se queda en quienes pasaban por ahí.
- **Más riesgo**: permisos, seguridad y la posibilidad de que la broma no se entienda.

## En qué se diferencian de verdad

| | Street marketing | Guerrilla |
|---|---|---|
| Qué busca | Cobertura y contacto | Sorpresa y conversación |
| Cómo se mide | Contactos por turno y por zona | Alcance, menciones, registro |
| Se repite | Sí, por diseño | No, pierde el efecto |
| Qué pesa más | La operación | La idea |

La confusión viene de que ambas pasan en la calle. Pero una campaña de cobertura con mecánica sorpresa no es guerrilla: es street marketing con una buena idea. Y una acción sorpresa aislada no sustituye una ruta de cobertura.

## Cuándo conviene cada uno

**Street marketing** cuando el objetivo es prueba de producto, tráfico a un punto o captura de datos, y hace falta volumen. Es lo que sostiene campañas de consumo masivo y bebidas: lo desarrollamos en [Degustaciones y sampling](${L.degustaciones}) y en [Trade marketing en canal tradicional](${L.tat}).

**Guerrilla** cuando el objetivo es notoriedad, el presupuesto de medios es bajo y la marca puede asumir el riesgo de una acción que o entra muy bien o no entra. Funciona mejor como pieza dentro de una campaña que como campaña entera.

En la práctica se combinan: una acción de impacto que da la conversación, y una ruta de calle que da el volumen. En [Activaciones de marca: ejemplos reales](${L.ejemplos}) hay siete casos donde se ve esa mezcla, desde un parque de pueblo convertido en escenario hasta un partido con leyendas del fútbol.

## Lo que no cambia entre uno y otro

Tres cosas aplican igual a los dos:

1. **Permisos.** Ocupar espacio público, poner sonido o montar estructura necesita autorización. Lo detallamos en [Producción de eventos BTL](${L.produccion}).
2. **El equipo.** En calle, quien habla con la gente es la campaña. Está en [Promotoras e impulsadoras](${L.equipo}).
3. **La medición.** Sin datos, las dos se convierten en una anécdota. El marco está en [Estrategias BTL](${L.estrategias}), y lo resume el propio equipo en [este reel](${L.datos}).

Si no sabes cuál encaja con lo que necesitas, [cuéntanos el objetivo](${L.contacto}) y lo revisamos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el street marketing?',
        a: 'Es llevar la marca a la calle de forma planeada y repetible, con equipos que recorren zonas definidas entregando muestras, invitando a una dinámica o acercando a la gente a un punto de venta. Se mide por cobertura: contactos por turno, por zona y por ruta.',
      },
      {
        q: '¿Qué es el marketing de guerrilla?',
        a: 'Es una acción inesperada en un espacio público que busca un impacto mayor que su presupuesto. Su materia prima es la sorpresa: funciona una vez, en un sitio concreto, y depende de que la gente la comente o la comparta.',
      },
      {
        q: '¿Cuál es la diferencia entre street marketing y marketing de guerrilla?',
        a: 'El street marketing busca cobertura y es repetible; lo que pesa es la operación. La guerrilla busca sorpresa y no se puede repetir sin perder el efecto; lo que pesa es la idea. Se miden distinto: contactos por turno frente a alcance y menciones.',
      },
      {
        q: '¿El street marketing es lo mismo que BTL?',
        a: 'No. El BTL es la categoría: toda la comunicación de contacto directo, que incluye punto de venta, eventos, trade marketing y calle. El street marketing es una de sus formas, la que ocurre en la vía pública.',
      },
      {
        q: '¿Qué permisos necesita una activación en la calle?',
        a: 'Depende del municipio y del espacio. Por lo general, autorización de ocupación del espacio público, permiso para sonido o estructura cuando los hay, y coordinación con la administración del lugar si es un espacio privado de uso público, como un centro comercial.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'lanzamiento-de-producto-con-activaciones-btl',
    publishedAt: '2026-10-08',
    title: 'Lanzamiento de producto: la activación que sostiene',
    excerpt:
      'El día del lanzamiento es el más fácil. Lo difícil son las seis semanas siguientes, cuando el producto ya está en el lineal y nadie lo conoce. Cómo se sostiene un lanzamiento desde el BTL.',
    metaDescription:
      'Cómo acompañar el lanzamiento de un producto con activaciones BTL: prueba, visibilidad, cobertura y medición en las primeras semanas en el mercado.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Antioquia',
    niches: ['consumo-masivo', 'bebidas', 'tecnologia'],
    keywords: [
      'lanzamiento de producto',
      'activaciones BTL',
      'activación de lanzamiento',
      'prueba de producto',
      'marketing experiencial',
    ],
    body: `Un **lanzamiento de producto** se celebra un día y se gana en las seis semanas siguientes. El evento de lanzamiento reúne a quien ya conoce la marca; el problema real empieza cuando el producto está en el lineal, al lado de otros cinco, y nadie sabe qué es ni por qué debería probarlo.

Ahí es donde entran las **activaciones BTL**. No como fiesta de apertura, sino como la operación que sostiene el producto mientras consigue rotación propia.

## Las dos partes de un lanzamiento

**El evento.** Prensa, aliados, equipo comercial, distribuidores. Sirve para dar la noticia y para que la fuerza de ventas vea el producto antes de venderlo. Contraste ha producido lanzamientos con DJ, catering y montaje completo: [este reel](${L.lanzamiento}) es uno.

**La calle.** Las semanas siguientes, donde el producto tiene que explicarse solo frente a alguien que nunca lo ha visto. Esta parte es la que suele quedarse sin presupuesto, y es la que decide si el lanzamiento funcionó.

## Qué necesita un producto nuevo que uno conocido no

Tres cosas, en este orden:

1. **Que lo prueben.** Un producto desconocido no se compra por el empaque. La degustación y el sampling existen justamente para esto: están desarrollados en [Degustaciones y sampling](${L.degustaciones}).
2. **Que se vea.** Un producto nuevo no tiene espacio ganado en el lineal. El material POP y la visibilidad negociada compensan eso durante los primeros meses: cómo se audita está en [Material POP](${L.pop}).
3. **Que alguien lo explique.** Un producto nuevo casi siempre necesita una frase que no cabe en la etiqueta. Esa frase la dice el equipo de calle, y por eso el entrenamiento pesa más aquí que en cualquier otra campaña. Está en [Promotoras e impulsadoras](${L.equipo}).

## Cómo se arma el plan de las primeras semanas

- **Semana 0**: evento de lanzamiento y entrenamiento del equipo con el producto en la mano.
- **Semanas 1 a 3**: máxima concentración. Cobertura intensiva en los puntos donde el producto ya está disponible, con prueba y material instalado. No tiene sentido activar donde el producto todavía no llegó.
- **Semanas 4 a 6**: se mantiene la cobertura en los puntos que respondieron y se retira de los que no.
- **Cierre**: comparación de rotación entre puntos activados y puntos equivalentes sin activación.

Esa última línea es la que convierte el lanzamiento en un dato y no en un recuerdo. El marco completo está en [Estrategias BTL](${L.estrategias}).

## El error más caro

Activar antes de que el producto esté en el punto. Pasa más de lo que parece: se cierra la fecha de la campaña con el calendario de marketing y no con el de distribución, el equipo sale a la calle, la gente pregunta dónde comprarlo y la respuesta es «pronto». Esa inversión se pierde entera.

La regla es simple: primero el producto en el punto, después la activación sobre ese punto.

## Según el sector

- **Bebidas**: la prueba manda, y la restricción de pauta masiva hace que el BTL sea casi el único canal disponible. En [Publicidad BTL para licores](${L.licores}) está el detalle.
- **Consumo masivo**: pesa la cobertura y la rotación. Ver [consumo masivo](${L.consumo}).
- **Tecnología**: pesa la demostración, porque el producto hay que usarlo para entenderlo. Está en [Activaciones BTL para marcas de tecnología](${L.tech}).
- **Inmobiliario**: el lanzamiento de un proyecto se juega en la sala de ventas y en lo que pasa después, explicado en [Experiencias que venden vivienda](${L.vivienda}) y en [Del lead a la venta](${L.leads}).

Si tienes un lanzamiento en el calendario, [cuéntanos la fecha](${L.contacto}) y revisamos qué se puede sostener con el presupuesto que haya.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se lanza un producto con activaciones BTL?',
        a: 'Con dos frentes: un evento de lanzamiento para prensa, aliados y fuerza de ventas, y una operación en calle y punto de venta durante las semanas siguientes, con prueba de producto, material instalado y equipo entrenado para explicarlo.',
      },
      {
        q: '¿Cuánto debe durar la activación de un lanzamiento?',
        a: 'Entre cuatro y seis semanas como referencia, con la mayor concentración en las tres primeras. Después se mantiene la cobertura sólo en los puntos que respondieron y se retira de los que no.',
      },
      {
        q: '¿Qué es lo primero que hay que asegurar antes de activar un lanzamiento?',
        a: 'Que el producto ya esté disponible en los puntos donde se va a activar. Activar antes de que llegue la distribución es el error más caro de un lanzamiento: se genera demanda que no se puede atender y la inversión se pierde completa.',
      },
      {
        q: '¿Por qué un producto nuevo necesita degustación o sampling?',
        a: 'Porque nadie compra por el empaque algo que no conoce. La prueba resuelve en segundos lo que un anuncio tarda semanas en explicar, y deja a la persona con una razón concreta para buscarlo la próxima vez.',
      },
      {
        q: '¿Cómo se mide si el lanzamiento funcionó?',
        a: 'Comparando la rotación de los puntos activados con la de puntos equivalentes sin activación durante el mismo periodo, además de las muestras entregadas, los contactos efectivos y los datos capturados durante la campaña.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'produccion-de-eventos-btl-que-incluye',
    publishedAt: '2026-10-09',
    title: 'Producción de eventos BTL: qué incluye el servicio',
    excerpt:
      'Montaje, logística, personal, permisos, proveedores y plan B. Lo que de verdad se contrata cuando se contrata la producción de un evento BTL, y qué se debe entregar al cierre.',
    metaDescription:
      'Qué incluye la producción de un evento BTL: montaje, logística, personal, permisos, proveedores y plan B. Cómo se controla y qué se entrega al cierre.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'producción de eventos',
      'producción de eventos BTL',
      'logística de activaciones',
      'montaje de activaciones de marca',
      'agencia BTL',
    ],
    body: `La **producción de eventos BTL** es la parte que nadie ve en la presentación y la única que se nota cuando falla. Una idea aprobada no es una campaña: entre la aprobación y el momento en que la primera persona se acerca al stand hay una lista de cosas que tienen que estar resueltas, y casi todas tienen fecha límite.

Si quieres el panorama completo del servicio, está en [Qué hace una agencia BTL](${L.queHace}). Aquí va sólo la producción.

## Qué incluye

**Montaje y escenografía.** Estructura, stand, carpa, tarima, branding, iluminación y sonido. Con medidas que quepan en el espacio negociado y con un plano de montaje que el punto haya aprobado.

**Logística.** Transporte de material y producción, tiempos de viaje, bodegaje, cargue y descargue, y el orden en que llegan las cosas. En campañas de territorio esto es la mitad del trabajo: una ruta por varios municipios se planea como una operación, no como una suma de eventos. Lo contamos en [Agencia BTL en Medellín](${L.medellin}).

**Personal.** Promotoría, anfitrionas, impulso, supervisión, logística de apoyo y, cuando aplica, artistas o animación. Quién entra a qué hora, quién releva a quién y quién responde si alguien no llega. El detalle está en [Promotoras e impulsadoras](${L.equipo}).

**Permisos.** De la cadena o el centro comercial, del municipio, de uso de espacio público, de sonido, y los seguros que exija cada uno. Es lo más impredecible en tiempos y por eso se arranca primero.

**Material.** POP, muestras, uniformes, mecánica, premios y repuestos. Con inventario de salida y de retorno, porque lo que no se cuenta al volver no existe. Cómo se audita está en [Material POP](${L.pop}).

**Plan B.** Lluvia, corte de energía, artista que no llega, punto que cambia la ubicación autorizada el mismo día. Un plan B que no está escrito no es un plan B.

## Cómo se controla el día del evento

Con tres cosas, y ninguna es complicada:

1. **Un cronograma por horas**, no por bloques. Montaje, prueba de sonido, llegada de equipo, apertura, relevos, cierre y desmontaje.
2. **Un responsable único en el punto.** Una persona que decide en el momento, sin llamar a nadie.
3. **Reporte durante, no después.** Evidencia fotográfica con hora, novedades y conteos por turno. Un reporte que llega el lunes siguiente ya no sirve para corregir nada.

## Qué se debe entregar al cierre

Esto es lo que conviene exigir por contrato:

- Conteo de contactos efectivos, muestras entregadas y datos capturados, por punto y por turno.
- Evidencia fotográfica del montaje, de la operación y del desmontaje.
- Inventario de retorno del material.
- Novedades: qué no salió como estaba previsto y qué se hizo.
- Lectura de resultados frente al objetivo del brief, no frente a la expectativa.

En [Estrategias BTL](${L.estrategias}) está el marco de medición completo, y en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}) las preguntas que conviene hacer antes de contratar.

## Qué hace que una producción se encarezca

Para que no sorprenda en la cotización:

- **La fecha.** Diciembre, puentes y temporada de fiestas suben el costo de personal y producción, y reducen la disponibilidad.
- **La distancia.** Cada municipio fuera del Valle de Aburrá añade transporte, tiempos de viaje y a veces alojamiento.
- **La duración del montaje.** Una estructura que tarda seis horas en armarse necesita equipo desde la madrugada.
- **Las exigencias del punto.** Algunas cadenas piden seguros, horarios de montaje específicos y proveedores homologados.

El desglose completo de lo que mueve el presupuesto está en [Cuánto cuesta una activación BTL](${L.costos}).

Hay siete producciones ya ejecutadas, con lo que incluyó cada una, en [Activaciones de marca: ejemplos reales](${L.ejemplos}). Y si tienes una fecha en el calendario, [escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué incluye la producción de un evento BTL?',
        a: 'Montaje y escenografía, logística de transporte y bodegaje, personal de calle y supervisión, permisos de la cadena o del municipio, material POP y muestras con inventario de salida y retorno, y un plan B escrito para lluvia, cortes de energía o cambios de última hora.',
      },
      {
        q: '¿Quién consigue los permisos de una activación?',
        a: 'Debe hacerlo la agencia, y conviene dejarlo claro por contrato. Según el caso se tramitan con la administración del centro comercial o la cadena, con la alcaldía del municipio, y se suman los permisos de sonido, de ocupación de espacio público y los seguros que exija cada lugar.',
      },
      {
        q: '¿Cómo se controla un evento BTL el día de la operación?',
        a: 'Con un cronograma por horas que cubra montaje, apertura, relevos, cierre y desmontaje; un responsable único en el punto con capacidad de decidir en el momento; y reporte durante la jornada, con evidencia fotográfica y conteos por turno, no al día siguiente.',
      },
      {
        q: '¿Qué debe entregar la agencia al cerrar un evento?',
        a: 'Conteo de contactos efectivos, muestras entregadas y datos capturados por punto y por turno; evidencia fotográfica de montaje, operación y desmontaje; inventario de retorno del material; las novedades del día; y la lectura de resultados frente al objetivo definido en el brief.',
      },
      {
        q: '¿Qué encarece la producción de un evento BTL?',
        a: 'La fecha, porque diciembre y las temporadas de fiestas suben el costo de personal y producción; la distancia, porque cada municipio fuera del área metropolitana añade transporte y a veces alojamiento; la complejidad del montaje; y las exigencias del punto, como seguros o proveedores homologados.',
      },
    ],
  },
]
