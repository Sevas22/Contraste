/**
 * Quinta tanda de artículos del blog (semana del 2026-10-13).
 *
 * Objetivo:
 *   · "marketing experiencial" es el término que el sitio usa en todas partes
 *     —está hasta en el <title> de varias páginas— y no tenía ni un artículo
 *     propio detrás. Es la laguna más grande que quedaba.
 *   · Diciembre se cotiza en octubre. El artículo de fin de año sale ahora
 *     porque es cuando se toma la decisión, no en noviembre.
 *   · Roadshow y la combinación con digital son dos búsquedas que el blog no
 *     nombraba y que describen servicios que la agencia ya presta.
 *   · El quinto NO es nuevo: rellena `como-medir-una-activacion-btl-sin-
 *     metricas-de-vanidad`, que está publicado desde el 2026-09-15 con el
 *     cuerpo vacío y por eso sale con noindex y fuera del sitemap. Mismo slug
 *     a propósito: el upsert lo actualiza y la URL deja de ser una página
 *     muerta.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 23 artículos de las tandas 1 a 4.
 *
 * Reglas de redacción (iguales a las cuatro tandas anteriores):
 *   · Cada cifra va atribuida a quien la dijo. Nada de precios inventados.
 *   · Los casos dicen lo que dice su publicación, ni un resultado de más.
 *   · No se nombran marcas que no estén en el muro de clientes o en un caso
 *     publicado.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=5 --escribir --publicar
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
  // Blog de las tandas 1 a 3
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
  // Blog de la tanda 4
  medellin: '/blog/agencia-btl-en-medellin',
  campanas: '/blog/campanas-btl-del-brief-a-la-calle',
  street: '/blog/street-marketing-y-marketing-de-guerrilla',
  lanzamientoPost: '/blog/lanzamiento-de-producto-con-activaciones-btl',
  produccion: '/blog/produccion-de-eventos-btl-que-incluye',
  // Blog de esta tanda
  experiencial: '/blog/marketing-experiencial-que-es-y-como-se-disena',
  finDeAno: '/blog/activaciones-btl-de-fin-de-ano',
  roadshow: '/blog/roadshow-de-marca-que-es-y-cuando-conviene',
  digital: '/blog/btl-y-marketing-digital-como-se-potencian',
  metricas: '/blog/como-medir-una-activacion-btl-sin-metricas-de-vanidad',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'marketing-experiencial-que-es-y-como-se-disena',
    publishedAt: '2026-10-13',
    title: 'Marketing experiencial: qué es y cómo se diseña',
    excerpt:
      'No es poner una carpa con una marca encima. El marketing experiencial es diseñar algo que la persona hace, no que mira, y que después recuerda. Qué lo compone y cómo se construye una experiencia que sí deja algo.',
    metaDescription:
      'Qué es el marketing experiencial, en qué se diferencia del BTL, cómo se diseña una experiencia de marca paso a paso y cómo se mide lo que deja.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo', 'tecnologia'],
    keywords: [
      'marketing experiencial',
      'experiencia de marca',
      'activaciones de marca',
      'BTL marketing',
      'marketing de experiencia',
    ],
    body: `El **marketing experiencial** parte de una idea simple: una persona recuerda mucho mejor lo que hizo que lo que vio. Un anuncio se ve; una experiencia se vive, y eso deja una huella distinta.

La confusión habitual es creer que es lo mismo que BTL. No lo es, y la diferencia importa a la hora de contratar. El **BTL es el canal**: toda la comunicación de contacto directo, fuera de los medios masivos, que explicamos en [Qué es BTL](${L.queEsBtl}). El **marketing experiencial es el enfoque**: que la persona participe en vez de mirar. Se puede hacer BTL sin experiencia —una valla dentro de un supermercado lo es— y se puede diseñar experiencia en canales que no son BTL.

En la práctica se trabajan juntos, y es lo que separa una activación que la gente comenta de una que pasó desapercibida.

## Qué tiene una experiencia de marca que una activación normal no

Cuatro cosas:

- **Participación.** La persona hace algo: prueba, juega, elige, compite, aprende. No recibe un volante.
- **Un momento con sentido.** La experiencia dice algo de la marca. Si cualquier marca pudiera montar lo mismo, no es experiencia de marca, es entretenimiento con un logo.
- **Un recuerdo transportable.** Algo que se llevan: la muestra, la foto, el dato aprendido, la historia que van a contar.
- **Una continuación.** Qué pasa después. Sin eso, la experiencia muere en el punto.

## Cómo se diseña, en orden

**1. El sentimiento, antes que la mecánica.** Qué quieres que sienta la persona: sorpresa, pertenencia, orgullo, confianza, diversión. Esa palabra ordena todas las decisiones que vienen.

**2. La traducción a algo que se hace.** Si la palabra es «pertenencia», la mecánica tiene que crear grupo. Si es «confianza», tiene que haber prueba y demostración. En [Degustaciones y sampling](${L.degustaciones}) está la mecánica de prueba desarrollada, y en [Activaciones BTL para marcas de tecnología](${L.tech}) la de demostración.

**3. El contexto.** La misma mecánica funciona distinto en un supermercado, en la plaza de un municipio en fiestas o en una feria. En el parque de Jericó, por ejemplo, la gente ya salió de casa dispuesta a pasarla bien, y la marca entra en ese plan en vez de interrumpir una compra. [Ver el caso](${L.jerico}).

**4. Las personas que la ejecutan.** Una experiencia la sostiene quien está ahí. Un montaje impecable con un equipo que recita un libreto no produce nada. Está desarrollado en [Promotoras e impulsadoras](${L.equipo}).

**5. La huella.** Qué queda: el producto probado, el contacto capturado, la foto que se comparte, el dato que se lleva.

**6. La medición.** Decidida antes de salir, no después. En [Cómo medir una activación BTL](${L.metricas}) está qué contar y qué ignorar.

## Tres experiencias reales

Todas publicadas en el [Instagram de Contraste](${L.ig}):

- **Chirimía de los que saben**: en vez de montar una degustación estándar, se llevó chirimía en vivo a cuatro municipios del norte de Antioquia. La música es parte del territorio, no un añadido. [Ver](${L.chirimia})
- **Venecia**: artistas en vivo, degustación y branding montado para que la marca se sintiera, no sólo se viera. [Ver](${L.venecia})
- **Partido con leyendas**: una marca presente en algo que la gente ya quería hacer. [Ver](${L.futbol})

Hay siete ejemplos más, con lo que incluyó cada uno, en [Activaciones de marca: ejemplos reales](${L.ejemplos}).

## El error más común

Diseñar para que se vea bien en una foto y no para que la persona haga algo. Una experiencia que se fotografía bien pero donde el visitante sólo pasa por delante genera material para redes y ningún recuerdo de marca.

La prueba está en una pregunta: **¿qué hizo la persona?** Si la respuesta es «miró», no es una experiencia.

## Cómo se mide

Con lo que indica que algo pasó: tiempo de permanencia, participación efectiva en la mecánica, pruebas de producto, datos capturados, conversaciones reales y, cuando el canal lo permite, la rotación del punto activado frente a uno equivalente sin activación. El marco completo está en [Estrategias BTL](${L.estrategias}).

Si quieres ver cómo se traduce a tu sector, están [bebidas](${L.bebidas}), [consumo masivo](${L.consumo}), [desarrollo inmobiliario](${L.inmobiliario}) y [tecnología](${L.tecnologia}). O [cuéntanos el objetivo](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el marketing experiencial?',
        a: 'Es el enfoque que busca que la persona viva la marca en vez de sólo verla: participa en algo, prueba, juega o aprende, y se lleva un recuerdo. Se apoya en el contacto directo, pero lo que lo define no es el canal sino que haya participación real.',
      },
      {
        q: '¿Cuál es la diferencia entre marketing experiencial y BTL?',
        a: 'El BTL es el canal: toda la comunicación de contacto directo, fuera de los medios masivos. El marketing experiencial es el enfoque: que la persona participe. Se puede hacer BTL sin experiencia, como una pieza de visibilidad dentro de un supermercado, y en la práctica los dos se trabajan juntos.',
      },
      {
        q: '¿Cómo se diseña una experiencia de marca?',
        a: 'Primero se define qué debe sentir la persona, y esa palabra ordena lo demás. Luego se traduce a algo que se hace, se elige el contexto, se arma el equipo que la ejecuta, se decide qué se lleva la persona y se define la medición antes de salir a la calle.',
      },
      {
        q: '¿Cómo se sabe si una activación fue una experiencia de verdad?',
        a: 'Con una pregunta: qué hizo la persona. Si la respuesta es que miró, pasó al lado o recibió un volante, no fue una experiencia. Si probó, participó, eligió o compitió, sí lo fue.',
      },
      {
        q: '¿Cómo se mide el marketing experiencial?',
        a: 'Con tiempo de permanencia, participación efectiva en la mecánica, pruebas de producto, datos capturados y conversaciones reales. Cuando el canal lo permite, se compara además la rotación del punto activado con la de un punto equivalente sin activación.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-de-fin-de-ano',
    publishedAt: '2026-10-14',
    title: 'Activaciones BTL de fin de año: planear diciembre',
    excerpt:
      'En diciembre todo se vende más y todo cuesta más. Personal, producción y espacios se agotan semanas antes. Qué hay que tener cerrado en octubre para que la campaña de fin de año salga.',
    metaDescription:
      'Cómo planear las activaciones BTL de fin de año: cuándo se cierra cada cosa, qué sube de precio en diciembre y qué mecánicas funcionan en temporada.',
    coverUrl: '/media/nichos/bebidas-alcoholicas.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'activaciones BTL',
      'campañas BTL de fin de año',
      'activaciones de marca en diciembre',
      'temporada navideña',
      'trade marketing',
    ],
    body: `Diciembre es el mes en que casi todas las categorías venden más, y por eso es el mes en que es más difícil activar. No por falta de ideas: por disponibilidad. El personal, la producción y los espacios se comprometen semanas antes, y la marca que llama en noviembre se encuentra con que lo que queda es lo que nadie quiso.

Este artículo es un calendario, no una lista de ideas. Si buscas cómo se arma la campaña en sí, está en [Campañas BTL: del brief a la calle](${L.campanas}).

## Qué cambia en temporada

- **El costo sube.** Personal, transporte, montaje y producción se encarecen por demanda, no por capricho del proveedor.
- **La disponibilidad cae.** Las promotoras con experiencia están comprometidas, y los proveedores de montaje trabajan al límite.
- **Los espacios se agotan.** Los lugares de alto flujo en centros comerciales se negocian con meses de anticipación. Está explicado en [Activaciones en centros comerciales y ferias](${L.centros}).
- **La gente tiene menos paciencia y más intención.** Hay más tráfico, pero cada persona tiene menos tiempo. La mecánica tiene que entenderse en segundos.

## El calendario real

Como referencia de planeación:

**Octubre.** Se define objetivo, mecánica y cobertura. Se negocian los espacios en retail y centros comerciales, que es lo que primero se agota. Se reserva el equipo de calle.

**Noviembre.** Producción: montaje, material POP, uniformes, muestras. Se cierran permisos de cadena y de municipio. Se entrena al equipo. Cómo se audita el material está en [Material POP](${L.pop}).

**Primera quincena de diciembre.** El pico. Fines de semana, puentes y la semana de quincena concentran el grueso del tráfico.

**Segunda quincena.** Cambia el comportamiento: menos compra de reposición y más compra de regalo y de celebración. La mecánica debería cambiar con ella.

**Enero.** El mes olvidado. El tráfico cae, pero cae también la competencia por el espacio, y es cuando se puede negociar bien lo del año siguiente.

## Qué funciona en temporada

- **La prueba por encima del argumento.** Nadie se detiene a escuchar una explicación larga en un pasillo lleno. En [Degustaciones y sampling](${L.degustaciones}) está el detalle.
- **La visibilidad negociada.** En diciembre el lineal está saturado; lo que se ve es lo que se compra.
- **El territorio.** Las fiestas de municipio concentran en pocos días lo que en ciudad toma semanas, con la gente ya predispuesta. Es lo que se ve en los recorridos por Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros. [Ver](${L.chirimia})
- **La cobertura por ruta en canal tradicional**, donde diciembre pesa especialmente. Está en [Trade marketing en canal tradicional](${L.tat}).

## Qué no funciona

Mecánicas que exigen tiempo o concentración: formularios largos, dinámicas de varios pasos, explicaciones técnicas. En temporada, cada segundo de atención cuesta el doble.

Y activar sin haber asegurado inventario en el punto. Generar demanda en diciembre para un producto que se agota el día 10 es regalarle la venta a la competencia. La lógica está en [Lanzamiento de producto](${L.lanzamientoPost}).

## Lo que conviene cerrar por contrato

Antes de firmar la campaña de temporada:

1. Quién cubre el sobrecosto si hay que reponer personal un 24 o un 31.
2. Qué pasa si el punto cambia la ubicación autorizada en plena temporada.
3. Cómo y cada cuánto llega el reporte, que en diciembre tiene que ser diario para poder corregir.
4. Cuándo se desmonta y quién retira el material.

Las preguntas completas están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}), y lo que mueve el presupuesto en [Cuánto cuesta una activación BTL](${L.costos}).

Si diciembre está en tu plan, [escríbenos ahora](${L.contacto}): en octubre todavía se puede elegir.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Con cuánta anticipación se planea una activación BTL para diciembre?',
        a: 'En octubre se define objetivo, mecánica y cobertura, y se negocian los espacios en retail, que son lo primero que se agota. En noviembre va la producción, los permisos y el entrenamiento del equipo. Llamar en noviembre para activar en diciembre deja sólo lo que nadie reservó.',
      },
      {
        q: '¿Por qué cuesta más una activación en diciembre?',
        a: 'Porque sube la demanda de todo lo que la compone: personal de calle, transporte, montaje y producción. No es un recargo del proveedor, es que la misma capacidad la están pidiendo muchas marcas a la vez y la disponibilidad cae.',
      },
      {
        q: '¿Qué mecánicas funcionan mejor en temporada navideña?',
        a: 'Las que se entienden en segundos: prueba de producto, visibilidad negociada en el punto y presencia en eventos donde la gente ya está. Las dinámicas de varios pasos o con formularios largos rinden mal, porque en temporada hay más tráfico pero menos tiempo por persona.',
      },
      {
        q: '¿Qué hay que asegurar antes de activar en temporada alta?',
        a: 'Que haya inventario suficiente en los puntos donde se va a activar durante toda la campaña. Generar demanda para un producto que se agota a mitad de mes le entrega esa venta a la competencia.',
      },
      {
        q: '¿Sirve de algo activar en enero?',
        a: 'Sí, con otro objetivo. El tráfico cae, pero también cae la competencia por los espacios y el costo de producción vuelve a lo normal. Es el mes para negociar la ocupación del resto del año y para campañas de prueba que en diciembre no cabrían.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'roadshow-de-marca-que-es-y-cuando-conviene',
    publishedAt: '2026-10-15',
    title: 'Roadshow de marca: qué es y cuándo conviene',
    excerpt:
      'Una sola activación que se mueve: mismo montaje, mismo equipo, varias ciudades o municipios, una ruta planeada. Qué es un roadshow, qué cuesta de verdad y cuándo rinde más que montar activaciones sueltas.',
    metaDescription:
      'Qué es un roadshow de marca, cómo se planea una ruta de activaciones por varias ciudades, qué cuesta y en qué casos rinde más que activar punto a punto.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo', 'tecnologia'],
    keywords: [
      'roadshow de marca',
      'activaciones BTL',
      'ruta de activaciones',
      'campañas BTL',
      'marketing experiencial',
    ],
    body: `Un **roadshow** es una activación que viaja. El mismo montaje, el mismo equipo y la misma mecánica recorren varias ciudades o municipios siguiendo una ruta planeada, en vez de montar cada plaza desde cero.

Suena a detalle logístico y es una decisión de presupuesto: lo que se amortiza en un roadshow es precisamente lo caro de una activación, que es la producción.

## Qué lo diferencia de activar ciudad por ciudad

| | Roadshow | Activaciones sueltas |
|---|---|---|
| Producción | Una vez, viaja | Se monta en cada plaza |
| Equipo | El mismo núcleo | Se arma en cada ciudad |
| Consistencia | Alta por diseño | Depende de cada equipo |
| Flexibilidad | Baja: la ruta manda | Alta, plaza por plaza |
| Riesgo | Un retraso arrastra la ruta | Aislado |

La consistencia es el argumento fuerte. Cuando el mismo equipo repite la mecánica diez veces, en la décima la hace mejor que nadie. Cuando se arman diez equipos distintos, las diez salen diferentes.

## Cuándo conviene

- **Cuando la mecánica es compleja.** Una demostración de producto técnico o un montaje grande no se pueden replicar con equipos improvisados. Está desarrollado en [Activaciones BTL para marcas de tecnología](${L.tech}).
- **Cuando hay que cubrir territorio, no ciudades.** Municipios cercanos entre sí se cubren mucho mejor por ruta: es exactamente lo que se hizo en el recorrido por Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros. [Ver](${L.chirimia})
- **Cuando el calendario manda.** Fiestas de municipio y ferias caen en fechas fijas y seguidas; la ruta se arma alrededor de ellas.
- **Cuando la marca necesita el mismo estándar en todas partes.** Un lanzamiento regional, por ejemplo: en [Lanzamiento de producto](${L.lanzamientoPost}) está el contexto.

## Cuándo no

- Si los puntos están muy separados, el transporte se come el ahorro de producción.
- Si cada plaza necesita una mecánica distinta, el roadshow pierde su ventaja.
- Si el objetivo es cobertura masiva y simultánea, conviene más una operación paralela con equipos locales, como se explica en [Agencia BTL en Medellín](${L.medellin}).

## Qué incluye de verdad

Más de lo que parece desde fuera:

- **La ruta**: orden de plazas, tiempos de viaje, horas de montaje y desmontaje en cada una.
- **El vehículo y el transporte** del montaje, el material y a veces del equipo.
- **El alojamiento y la alimentación** cuando la ruta sale del área metropolitana.
- **El montaje desarmable**, pensado para armarse y desarmarse muchas veces sin deteriorarse.
- **Los permisos de cada municipio**, que son distintos en cada uno y se tramitan por separado.
- **El material por plaza**, calculado para toda la ruta y con reposición prevista.
- **El reporte por plaza**, para poder comparar.

El detalle operativo está en [Producción de eventos BTL](${L.produccion}).

## El riesgo que hay que presupuestar

En un roadshow, un retraso no afecta a una plaza: afecta a todas las que vienen detrás. Si el montaje del martes se cae, el miércoles arranca tarde.

Por eso una ruta seria lleva **un día de holgura cada cierto número de plazas** y un plan B escrito por tipo de fallo: vehículo, clima, permiso que no sale, persona que no llega. Una ruta sin holgura es una ruta que se cumple sólo si no pasa nada, y en calle siempre pasa algo.

## Cómo se mide

Igual que cualquier activación, con una ventaja: como todas las plazas son iguales, se pueden comparar. Contactos efectivos, muestras entregadas, datos capturados y conversaciones, plaza por plaza. Las diferencias entre plazas dicen mucho más que el total. El marco está en [Cómo medir una activación BTL](${L.metricas}) y en [Estrategias BTL](${L.estrategias}).

¿Tienes varias plazas en el plan? [Cuéntanos cuáles](${L.contacto}) y miramos si sale mejor por ruta.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es un roadshow de marca?',
        a: 'Es una activación que viaja: el mismo montaje, el mismo equipo y la misma mecánica recorren varias ciudades o municipios siguiendo una ruta planeada, en vez de montar cada plaza desde cero con producción y personal distintos.',
      },
      {
        q: '¿Cuándo conviene un roadshow en vez de activaciones sueltas?',
        a: 'Cuando la mecánica es compleja y no se puede replicar con equipos improvisados, cuando hay que cubrir municipios cercanos entre sí, cuando el calendario de ferias y fiestas marca las fechas, o cuando la marca necesita exactamente el mismo estándar en todas las plazas.',
      },
      {
        q: '¿Qué incluye la producción de un roadshow?',
        a: 'La planeación de la ruta con tiempos de viaje y montaje, el transporte del montaje y el material, alojamiento y alimentación del equipo cuando sale del área metropolitana, un montaje desarmable que resista varios ciclos, los permisos de cada municipio por separado, el material calculado para toda la ruta y el reporte plaza por plaza.',
      },
      {
        q: '¿Cuál es el mayor riesgo de un roadshow?',
        a: 'Que un retraso arrastra toda la ruta: si el montaje de una plaza se cae, las siguientes empiezan tarde. Por eso una ruta bien planeada incluye días de holgura y un plan B escrito para vehículo, clima, permisos y personal.',
      },
      {
        q: '¿Cómo se mide un roadshow?',
        a: 'Con los mismos indicadores de cualquier activación —contactos efectivos, muestras, datos capturados y conversaciones—, pero plaza por plaza. Como todas las plazas ejecutan igual, las diferencias entre ellas son el dato más útil del reporte.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'btl-y-marketing-digital-como-se-potencian',
    publishedAt: '2026-10-16',
    title: 'BTL y marketing digital: cómo se potencian',
    excerpt:
      'Se presentan como alternativas y son complementos. Lo digital lleva gente al punto y lo recoge después; el BTL da la prueba y la conversación que ninguna pauta puede dar. Cómo se conectan los dos sin duplicar presupuesto.',
    metaDescription:
      'Cómo se combinan el BTL y el marketing digital: antes, durante y después de la activación, qué aporta cada uno y cómo se mide el resultado conjunto.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Antioquia',
    niches: ['consumo-masivo', 'inmobiliario', 'tecnologia'],
    keywords: [
      'BTL marketing',
      'BTL y marketing digital',
      'activaciones de marca',
      'captura de datos en activaciones',
      'medición de activaciones',
    ],
    body: `La pregunta «¿invertimos en BTL o en digital?» está mal planteada. No compiten por lo mismo: lo digital es bueno llegando a mucha gente y malo convenciéndola de probar algo; el **BTL** es lo contrario.

Si vienes de más atrás, la diferencia entre medios masivos y contacto directo está en [ATL y BTL](${L.atlBtl}).

## Qué aporta cada uno

**Digital:** alcance, segmentación, costo por impacto bajo, capacidad de repetir el mensaje y de medirlo todo. Lo que no puede hacer: que alguien pruebe el producto, resuelva una duda concreta en el momento o se lleve una experiencia física.

**BTL:** prueba real, conversación, demostración y una huella que dura. Lo que no puede hacer: llegar a cien mil personas, ni estar en todas partes a la vez.

Juntos cubren el hueco del otro.

## Cómo se conectan, en tres momentos

**Antes: llevar gente al punto.**

La activación que mejor rinde no es la que espera a que pase alguien, es la que avisó. Pauta geolocalizada alrededor del punto, historias en el Instagram de la marca, un mensaje a la base de datos de la zona. Un sábado de activación anunciado con 48 horas rinde distinto a uno sin anunciar.

No hace falta un presupuesto aparte: una inversión pequeña, concentrada en un radio corto y en las 48 horas previas, suele mover más tráfico al punto que la misma plata repartida durante un mes.

**Durante: capturar lo que pasó.**

Aquí es donde se pierde más valor. Una activación genera conversaciones, caras, pruebas, reacciones, y casi nada de eso queda registrado. Lo que conviene capturar:

- **Datos de contacto**, con consentimiento y con un formulario de tres campos como máximo.
- **Material de verdad**: fotos y vídeo de gente real participando, no del montaje vacío.
- **Lo que preguntó la gente**, que es la mejor fuente de contenido que existe y nadie la anota.

**Después: no soltar el contacto.**

Un dato capturado el sábado y contactado tres semanas después está frío. Esto es lo que desarrollamos en [Del lead a la venta](${L.leads}), y es el punto donde se cae la mitad de las campañas: la activación funcionó y nadie recogió lo que dejó.

## Lo que la activación le da al digital

Esta parte casi nunca se aprovecha:

- **Contenido real.** Una semana de activación produce más material utilizable que una sesión de fotos, y además es creíble. En el [Instagram de Contraste](${L.ig}) está lleno de ejemplos.
- **Audiencias.** Quien participó en una activación es una audiencia mucho mejor que una segmentación por intereses.
- **Argumentos.** Las objeciones que la gente dice en el punto son las que hay que responder en la pauta.
- **Prueba social.** Gente real usando el producto, que es lo que una marca nueva no tiene.

## Tres errores que se repiten

**Tratarlos como presupuestos rivales.** Cuando cada área defiende el suyo, nadie financia la parte que los une: el aviso previo y el seguimiento posterior, que son baratos y los que más rinden.

**No llevarse nada de la calle.** Una activación entera sin una foto utilizable ni una sola pregunta anotada es contenido perdido que ya estaba pagado.

**Capturar datos que nadie va a contactar.** Si no hay quién llame el lunes, el formulario sobra: es pedirle información a alguien a cambio de nada.

## Cómo se mide el conjunto

El error clásico es medirlos por separado y pelear por atribuirse la venta. Lo que tiene sentido es medir el recorrido completo: cuántos vieron el aviso, cuántos llegaron al punto, cuántos participaron, cuántos dejaron datos, cuántos fueron contactados y cuántos compraron.

Ese embudo es el que permite decidir dónde invertir el año siguiente. En [Cómo medir una activación BTL](${L.metricas}) está qué contar en la parte de calle, y en [Estrategias BTL](${L.estrategias}) el marco general.

## Dónde encaja según el sector

- **Inmobiliario**: el digital genera el lead y la sala de ventas cierra. Ver [Experiencias que venden vivienda](${L.vivienda}) y [Sala de ventas](${L.sala}).
- **Consumo masivo**: el digital construye recordación y el punto de venta convierte. Ver [consumo masivo](${L.consumo}).
- **Tecnología**: el digital explica y la demostración convence. Ver [Activaciones BTL para tecnología](${L.tech}).

Si quieres que revisemos cómo conectar lo que ya estás haciendo en digital con la calle, [escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Es mejor invertir en BTL o en marketing digital?',
        a: 'No compiten por lo mismo. El digital da alcance, segmentación y costo por impacto bajo; el BTL da prueba real, conversación y una huella física. Lo que rinde es conectarlos: el digital lleva gente al punto y recoge el contacto después, y la activación entrega la prueba que ninguna pauta puede dar.',
      },
      {
        q: '¿Cómo se usa lo digital para que una activación rinda más?',
        a: 'Avisando antes con pauta geolocalizada alrededor del punto y con las redes de la marca, capturando datos y material durante la activación, y contactando rápido después. Una activación anunciada con 48 horas de anticipación rinde distinto a una que espera a que pase gente.',
      },
      {
        q: '¿Qué le aporta una activación BTL a la estrategia digital?',
        a: 'Contenido real de gente usando el producto, que es más creíble que una sesión de fotos; audiencias de personas que ya interactuaron con la marca; los argumentos y objeciones que la gente dice en el punto; y prueba social, que es justo lo que le falta a una marca nueva.',
      },
      {
        q: '¿Qué datos conviene capturar durante una activación?',
        a: 'Datos de contacto con consentimiento y un formulario de tres campos como máximo, material fotográfico y de vídeo de personas reales participando, y las preguntas que hizo la gente, que son la mejor fuente de contenido y casi nunca se anotan.',
      },
      {
        q: '¿Cómo se mide una campaña que combina BTL y digital?',
        a: 'Midiendo el recorrido completo en vez de atribuirle la venta a un canal: cuántos vieron el aviso, cuántos llegaron al punto, cuántos participaron, cuántos dejaron datos, cuántos fueron contactados y cuántos compraron.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'como-medir-una-activacion-btl-sin-metricas-de-vanidad',
    publishedAt: '2026-10-17',
    title: 'Cómo medir una activación BTL sin métricas vanas',
    excerpt:
      'Diez mil personas impactadas no significa nada si nadie puede decir qué hicieron esas personas. Qué indicadores sirven para decidir, cuáles sólo sirven para quedar bien en una presentación y cómo se arma un reporte honesto.',
    metaDescription:
      'Qué indicadores sirven para medir una activación BTL y cuáles son métricas de vanidad. Cómo se arma un reporte que permita decidir dónde invertir.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo', 'inmobiliario', 'tecnologia'],
    keywords: [
      'medir activaciones BTL',
      'métricas de vanidad',
      'KPI de activaciones de marca',
      'reporte de activación BTL',
      'estrategias BTL',
    ],
    body: `El informe de una activación casi siempre abre con un número grande: «impactamos a 12.000 personas». Nadie pregunta qué significa, y debería, porque suele significar que 12.000 personas pasaron a menos de diez metros del stand.

Lo resume bien el propio equipo en [este reel](${L.datos}): un evento sin medición es un gasto, no una inversión. El problema es que medir mal se parece bastante a no medir.

## Qué es una métrica de vanidad

Una métrica de vanidad es un número que sube siempre, que nadie puede bajar y con el que no se puede tomar ninguna decisión. Tiene tres señales:

1. **No se puede comparar.** Si no sabes cuánto es mucho, el número no dice nada.
2. **No tiene un «y entonces».** Si el dato sube y no cambia ninguna decisión, sobra.
3. **Nadie puede quedar mal.** Un indicador que siempre sale bien no está midiendo, está decorando.

Las más comunes en BTL:

- **Personas impactadas**: casi siempre es tráfico del lugar, no gente que hizo algo.
- **Material entregado**: mide cuántos volantes salieron de la caja, no cuántos sirvieron.
- **Alcance en redes**: mide la publicación, no la activación.
- **Asistentes al evento**: cuántos entraron, no cuántos participaron.
- **Fotos del montaje**: demuestran que se montó, no que funcionó.

Ninguna está prohibida. El problema es que ocupen el lugar de las que sí deciden.

## Qué sí se mide

**Contactos efectivos.** No quien pasó: quien se detuvo y tuvo una interacción real. Se cuenta con un criterio escrito antes de salir —por ejemplo, que la persona haya probado, preguntado o participado— para que todos los puntos cuenten igual.

**Pruebas de producto.** Cuántas personas probaron de verdad. Es el indicador central de la mayoría de activaciones de bebidas y consumo masivo, desarrollado en [Degustaciones y sampling](${L.degustaciones}).

**Datos capturados con consentimiento.** Cuántos y de qué calidad: un número de teléfono que contesta vale más que diez correos inventados para llevarse el premio.

**Conversión posterior.** Cuántos de esos datos se contactaron y qué pasó. Sin esto, la activación nunca se puede defender. Está en [Del lead a la venta](${L.leads}).

**Costo por contacto efectivo.** El presupuesto dividido entre los contactos reales. Es el número que permite comparar una activación con otra, y una ciudad con otra.

**Rotación del punto.** Cuando el canal lo permite, la comparación entre puntos activados y puntos equivalentes sin activación durante el mismo periodo. Es la prueba más dura que existe en BTL.

## Cómo se arma un reporte honesto

Cuatro reglas:

**1. Los criterios se escriben antes.** Qué cuenta como contacto efectivo se decide en el brief, no cuando se ve el resultado. En [Campañas BTL](${L.campanas}) está el orden completo.

**2. Se reporta por punto, por turno y por promotor.** Un promedio esconde que tres puntos funcionaron y siete no. El detalle es lo que permite corregir a mitad de campaña.

**3. Se reporta durante, no al final.** Un informe que llega el lunes siguiente sirve para archivar. Uno que llega cada noche sirve para cambiar algo el martes.

**4. Las novedades van en el informe.** Qué falló, qué punto no autorizó el montaje, qué día llovió. Un reporte sin problemas no es un reporte bueno: es uno incompleto.

## La pregunta que ordena todo

Antes de elegir qué medir, una sola pregunta: **¿qué decisión vas a tomar con este número?**

- Si el dato es «personas impactadas» y la respuesta es «ninguna», fuera.
- Si es «costo por contacto efectivo por ciudad» y la respuesta es «el año que viene pongo más presupuesto donde salió más barato», ese sí.

El marco completo está en [Estrategias BTL](${L.estrategias}), y lo que se le debe exigir a la agencia por contrato en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

Si quieres que revisemos cómo se está midiendo lo que haces hoy, [escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es una métrica de vanidad en una activación BTL?',
        a: 'Un número que siempre sube, que no se puede comparar con nada y con el que no se toma ninguna decisión. Las más comunes son personas impactadas, material entregado, alcance en redes y fotos del montaje: describen que la activación ocurrió, no que funcionó.',
      },
      {
        q: '¿Qué indicadores sirven para medir una activación BTL?',
        a: 'Contactos efectivos con un criterio definido antes de salir, pruebas de producto, datos capturados con consentimiento y su calidad, conversión posterior de esos datos, costo por contacto efectivo y, cuando el canal lo permite, la rotación del punto activado frente a uno equivalente sin activación.',
      },
      {
        q: '¿Qué es un contacto efectivo?',
        a: 'Una persona que se detuvo y tuvo una interacción real: probó, preguntó o participó en la mecánica. No es quien pasó cerca del stand. El criterio exacto se escribe en el brief antes de la campaña, para que todos los puntos cuenten igual y los resultados se puedan comparar.',
      },
      {
        q: '¿Cada cuánto debe reportar una agencia durante una activación?',
        a: 'Durante la campaña, no al terminarla, y con detalle por punto, por turno y por promotor. Un informe que llega cuando ya acabó todo sólo sirve para archivar; uno diario permite mover equipo o cambiar la mecánica mientras la campaña está viva.',
      },
      {
        q: '¿Cómo saber si un indicador sirve o no?',
        a: 'Preguntando qué decisión se va a tomar con ese número. Si la respuesta es ninguna, el indicador sobra. Si la respuesta es concreta, como mover presupuesto a la ciudad con menor costo por contacto efectivo, ese indicador se queda.',
      },
    ],
  },
]
