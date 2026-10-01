/**
 * Tercera tanda de artículos del blog (semana del 2026-09-28).
 *
 * Objetivo: tapar los dos huecos del blog. Bebidas alcohólicas tenía todos los
 * casos reales y la campaña de FAQs en marcha pero ningún artículo propio, y
 * tecnología no tenía ninguno. Los otros dos completan consumo masivo, que
 * sólo estaba cubierto por el de promotoría.
 *
 * Fuentes, todas ya verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026) con los casos
 *     de Ron Viejo de Caldas, Licor Esencial y Aguardiente Amarillo.
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · El contenido de las cuatro landings de nicho, ya en vivo.
 *
 * Reglas de redacción (iguales a las dos tandas anteriores):
 *   · Cada cifra va atribuida a quien la dijo. Nada de precios inventados.
 *   · Los casos dicen lo que dice su publicación, ni un resultado de más.
 *   · No se nombran marcas que no estén en el muro de clientes o en un caso
 *     publicado.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=3 --escribir --publicar
 */

const L = {
  // V-Podcast
  ep1: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
  ep2: '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
  ep2yt: 'https://www.youtube.com/watch?v=nImG23dqoso',
  ep1yt: 'https://www.youtube.com/watch?v=CDTOJja6R9U',
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
  chirimiaFotos: 'https://www.instagram.com/agencia_contraste/p/DTsdBH6DvgB/',
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
  // Blog de esta tanda
  licores: '/blog/publicidad-btl-para-licores',
  degustaciones: '/blog/degustaciones-y-sampling-en-punto-de-venta',
  tat: '/blog/trade-marketing-en-canal-tradicional-tat',
  tech: '/blog/activaciones-btl-para-marcas-de-tecnologia',
  pop: '/blog/material-pop-que-es-y-como-auditarlo',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'publicidad-btl-para-licores',
    publishedAt: '2026-09-28',
    title: 'Publicidad BTL para licores: cómo se activa la marca',
    excerpt:
      'En licores la pauta masiva está restringida y la decisión se toma frente al lineal o en la barra. Qué incluye una campaña de publicidad BTL para una marca de licor y qué se mide.',
    metaDescription:
      'Publicidad BTL para marcas de licor: canales, mecánicas, permisos y medición. Casos reales de activaciones con Ron Viejo de Caldas y Aguardiente Amarillo.',
    coverUrl: '/media/nichos/bebidas-alcoholicas.jpg',
    location: 'Antioquia',
    niches: ['bebidas'],
    keywords: [
      'publicidad BTL',
      'publicidad BTL para licores',
      'activaciones para marcas de licor',
      'marketing de bebidas alcohólicas',
      'degustación de licor en punto de venta',
    ],
    body: `La **publicidad BTL** para una marca de licor no es un anuncio: es presencia en el lugar donde alguien decide qué se va a tomar. La góndola del supermercado, la tienda de barrio, la barra, la plaza del pueblo en una fiesta. Ahí es donde una marca de licor puede hacer algo que la pauta masiva no le permite: servir una prueba, explicar el producto y responder una duda en el momento.

Si vienes de más atrás, en [Qué es BTL](${L.queEsBtl}) está la definición general. Este artículo es la versión aplicada al sector.

## Por qué el licor se juega en el punto de venta

Tres razones prácticas:

- **La pauta masiva tiene límites.** La publicidad de bebidas alcohólicas está restringida en medios, horarios y contenidos, y eso empuja la inversión hacia el contacto directo.
- **La decisión es rápida y comparativa.** Frente al lineal hay varias marcas a la vista y pocos segundos para elegir.
- **La prueba pesa más que el argumento.** Quien prueba un producto en buenas condiciones sale con una razón concreta para repetir.

## Qué incluye una campaña de publicidad BTL para bebidas

Se contrata como una operación completa, no como piezas sueltas:

- **Material POP y señalización** en el punto: exhibidores, habladores, cenefas y visibilidad negociada con el establecimiento.
- **Montaje de visibilidad** dentro del local: dónde se ve la marca y desde dónde.
- **Promotoría entrenada** en el producto, en argumentación y en consumo responsable.
- **La mecánica**: degustación, impulso, dinámica o show, según el canal y el objetivo.
- **Permisos** de la cadena, del establecimiento y del municipio.
- **Reporte** por punto, por turno y por promotor.

Lo que separa una campaña seria de un gasto es esa última línea. Lo explicamos en [Estrategias BTL](${L.estrategias}) y lo resume el propio equipo en [este reel](${L.datos}): un evento sin medición es sólo un gasto.

## Dónde se activa una marca de licor

- **Retail moderno**: supermercados y grandes superficies, con espacios negociados y reglas estrictas de montaje.
- **Canal tradicional**: tiendas de barrio y estanquillos, donde la cobertura y el control son el reto. Lo desarrollamos en [Trade marketing en canal tradicional](${L.tat}).
- **HORECA**: bares, restaurantes y discotecas, donde pesa más la experiencia de marca que la muestra.
- **Territorio y eventos**: ferias, fiestas de municipio y activaciones en calle, que es donde la marca se mezcla con el plan de la gente.

## Cinco activaciones reales

Todas publicadas en el [Instagram de Contraste](${L.ig}):

- **Chirimía de los que saben**: Licor Esencial de Ron Viejo de Caldas recorrió Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras, equipo logístico y una camioneta rodando con la marca. [Ver](${L.chirimia})
- **RONDANDOS en Jericó**: el parque principal convertido en plataforma de marca con cantantes, animación y dinámicas. [Ver](${L.jerico})
- **Venecia, Antioquia**: artistas en vivo, degustación y montaje de branding para que la marca se sintiera, no sólo se viera. [Ver](${L.venecia})
- **Yarumal**: show con artistas populares para generar tráfico, impulso con promotoras y visibilidad dentro del establecimiento, con objetivos de trade marketing. [Ver](${L.yarumal})
- **La Tropa Aguardiente Amarillo**: activación móvil por calles y puntos de venta. [Ver](${L.tropa})

Hay dos más, un lanzamiento con DJ y catering y un partido con leyendas del Once Caldas, en [Activaciones de marca: 7 ejemplos reales](${L.ejemplos}).

## Cuándo activar

El calendario pesa tanto como el punto. En licores la demanda se concentra en fines de semana, quincenas, puentes y fiestas locales, y una activación en martes por la mañana cuesta lo mismo y rinde la mitad. Las fiestas de municipio, además, tienen una ventaja que no da el supermercado: la gente ya salió de casa con la intención de pasarla bien, y la marca entra en ese plan en vez de interrumpir una compra.

En diciembre todo se encarece y la disponibilidad de personal y producción se reduce, así que lo que se quiera hacer esos días se cierra con meses de anticipación.

## Consumo responsable y permisos

La degustación se ofrece sólo a mayores de edad, en porciones controladas y respetando horarios y restricciones de material visible de cada municipio y cada cadena. No es un trámite: una activación suspendida por un permiso mal gestionado cuesta más que la activación entera, y en esta categoría la marca responde por cómo se sirvió su producto.

## Cinco errores que se repiten

- Activar en un punto **sin inventario** para la demanda que se va a generar.
- Mandar promotoría **sin entrenar** en el producto: en licores el consumidor pregunta.
- Copiar la misma mecánica en **supermercado, tienda y bar**.
- Dejar la **visibilidad sin negociar** con el establecimiento y montarla donde estorba.
- Reportar **muestras entregadas** en vez de conversión y rotación.

## Qué se mide

- Pruebas de producto entregadas.
- Rotación en el punto durante la activación frente a un periodo de referencia.
- Cotizaciones o ventas generadas.
- Costo por impacto y por prueba.

Todo por punto, por turno y por promotor. El método completo está en la landing de [marketing BTL para bebidas](${L.bebidas}), y las dudas más frecuentes del sector, respondidas una por una, en [preguntas frecuentes](${L.faq}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig}), donde están publicados los cinco casos.
- [Preguntas frecuentes sobre publicidad BTL](${L.faq}).`,
    faqs: [
      {
        q: '¿Qué es la publicidad BTL para una marca de licores?',
        a: 'Es el conjunto de acciones que ponen la marca en contacto directo con el consumidor allí donde decide qué tomar: degustaciones e impulso en punto de venta, visibilidad y material POP, activaciones en bares y restaurantes, y presencia en ferias y fiestas de territorio. Se diferencia de la publicidad tradicional en que se puede medir y en que permite dirigirse sólo a mayores de edad.',
      },
      {
        q: '¿Dónde conviene activar una marca de licor?',
        a: 'Depende del objetivo. El retail moderno sirve para prueba y conversión frente al lineal; el canal tradicional, para cobertura y cercanía; el canal HORECA, para experiencia de marca; y las fiestas de municipio y ferias, para recordación y volumen de contactos en poco tiempo.',
      },
      {
        q: '¿Qué permisos se necesitan para activar un licor en un punto de venta?',
        a: 'La autorización del establecimiento o de la cadena, con sus reglas de montaje, horarios y material visible, y lo que exija el municipio para degustación de alcohol. Se gestionan antes del montaje, porque una activación detenida ese día pierde la inversión completa.',
      },
      {
        q: '¿Cómo se mide una campaña de publicidad BTL de licores?',
        a: 'Con pruebas de producto entregadas, rotación en el punto durante la activación frente a un periodo de referencia, cotizaciones o ventas generadas y costo por impacto. Los datos se entregan por punto, turno y promotor para saber qué plaza y qué horario funcionaron.',
      },
      {
        q: '¿Qué marcas de licor ha activado Contraste?',
        a: 'Entre sus casos publicados están Ron Viejo de Caldas, su Licor Esencial y Aguardiente Amarillo de Manzanares, con activaciones en Jericó, Venecia, Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros, además de lanzamientos y eventos de marca.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'degustaciones-y-sampling-en-punto-de-venta',
    publishedAt: '2026-09-29',
    title: 'Degustaciones y sampling en punto de venta: guía',
    excerpt:
      'Regalar muestras no es una estrategia. Cómo se diseña una degustación que termina en venta y en recompra, qué equipo necesita y qué errores la arruinan.',
    metaDescription:
      'Cómo diseñar degustaciones y sampling en punto de venta: diferencia con el impulso, mecánica, equipo, permisos y qué medir para saber si funcionó.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Medellín',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'degustación en punto de venta',
      'sampling de producto',
      'prueba de producto',
      'impulso en punto de venta',
      'sampling en supermercados',
    ],
    body: `La **degustación** y el **sampling** son la forma más directa de que alguien conozca un producto: probarlo. Pero entregar muestras no es, por sí solo, una estrategia. La diferencia entre una degustación que mueve la venta y una que sólo regala producto está en cómo se diseña.

## Degustación, sampling e impulso no son lo mismo

- **Degustación**: la persona prueba el producto en el punto, normalmente alimentos o bebidas, con alguien que le explica qué está probando.
- **Sampling**: se entrega una muestra para que la pruebe después, en su casa. Sirve para categorías donde el consumo no es inmediato.
- **Impulso**: el promotor argumenta frente al lineal para cerrar la venta en ese momento, con o sin prueba de producto.

Los tres se suelen mezclar en la misma activación, pero se miden distinto: el impulso por unidades vendidas en el turno, la degustación por conversión sobre pruebas, y el sampling por recompra semanas después.

## Cómo se diseña una degustación que vende

- **Objetivo primero**: prueba, conversión inmediata o recordación. Cada uno cambia la mecánica.
- **Ubicación**: cerca de la categoría, no en la entrada. Quien ya está decidiendo entre marcas es quien vale.
- **Horario**: las horas de tráfico real del punto, que no siempre son las que supone la marca.
- **Mecánica que no interrumpe**: la persona prueba, entiende y sigue. Un proceso largo espanta a quien iba con prisa.
- **Argumento corto**: una frase que diga qué diferencia al producto, no el folleto entero.
- **Puente a la compra**: el producto a la vista y a la mano, con su precio claro. Una prueba excelente junto a un lineal vacío no sirve de nada.

## El equipo lo es todo

La misma mecánica rinde distinto según quién la ejecute. El equipo se selecciona por perfil, se entrena en el producto y en la conversación, y se supervisa en calle. Cómo se arma está en [Promotoras e impulsadoras](${L.equipo}).

En licores hay una capa más: la prueba se ofrece sólo a mayores de edad y en porciones controladas, y esa decisión la toma la persona que está sirviendo. Se entrena antes, no se improvisa.

## Permisos, antes del montaje

Cada cadena tiene sus reglas de degustación, y cada municipio las suyas para el alcohol: horarios, espacio, material visible. Se resuelven antes, porque una activación detenida a media mañana pierde el día completo. Lo detallamos en [Publicidad BTL para licores](${L.licores}).

## Qué medir

- **Pruebas entregadas** por punto y por turno.
- **Conversión**: cuántas de esas pruebas terminaron en compra ahí mismo.
- **Costo por prueba** y **costo por venta**.
- **Rotación** del producto durante la activación frente a un periodo sin ella.
- **Comentarios del consumidor**, que son información gratuita para la marca.

El marco completo está en [Estrategias BTL](${L.estrategias}), y las métricas por sector en las landings de [bebidas](${L.bebidas}) y [consumo masivo](${L.consumo}).

## Cuántas pruebas hacen falta para que el dato sirva

Una jornada suelta no dice nada: el clima, un partido o una promoción de la competencia mueven el resultado más que la mecánica. Para que el número sea leíble hacen falta varias jornadas en el mismo punto y, si se puede, un punto de control parecido sin activación durante los mismos días. Con eso la comparación deja de ser una impresión y pasa a ser un dato.

## Lo que dice la gente también es el resultado

En una jornada de degustación pasan por el punto decenas de personas que dicen en voz alta lo que piensan del producto, del precio y de la competencia. Si el promotor recoge esas objeciones de forma ordenada —tres o cuatro categorías, marcadas en el mismo reporte del turno—, la marca termina la campaña con información que ningún estudio le da tan barata.

## Cinco errores que arruinan una degustación

- Activar en un punto **sin inventario suficiente** para la demanda que se va a generar.
- Poner a alguien a servir **sin saber del producto**.
- Elegir el **horario de menor tráfico** porque es el que dio el punto.
- **No medir** y reportar sólo la cantidad de muestras entregadas.
- Repetir la misma mecánica en **canales distintos**: lo que funciona en un supermercado no funciona en una tienda de barrio ni en un bar.

## Cómo se ve bien hecho

En [Venecia, Antioquia](${L.venecia}), la degustación de Licor Esencial se combinó con artistas en vivo y un montaje de branding, de modo que la prueba ocurría dentro de un plan y no como una interrupción. En la gira de [Chirimía de los que saben](${L.chirimia}), la degustación responsable iba acompañada de música en vivo y de acompañamiento al comercio de cada municipio.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuál es la diferencia entre degustación y sampling?',
        a: 'En la degustación la persona prueba el producto en el punto de venta, con alguien que le explica qué está probando. En el sampling se le entrega una muestra para que la use después en su casa. La degustación busca la compra inmediata; el sampling, la recompra posterior.',
      },
      {
        q: '¿Cuánto dura una activación de degustación?',
        a: 'Se organiza por turnos dentro de las horas de mayor tráfico del punto, y la campaña puede ir de un fin de semana a varias semanas según el objetivo. Lo que define la duración no es el calendario sino cuántas pruebas se necesitan para que el dato sea representativo.',
      },
      {
        q: '¿Qué se necesita para hacer sampling en un supermercado?',
        a: 'La autorización de la cadena con su espacio y horarios asignados, el montaje aprobado, el producto y los consumibles, personal entrenado y un sistema de registro para contar pruebas y ventas. En alimentos y bebidas se suman las condiciones de manipulación e higiene.',
      },
      {
        q: '¿Cómo se sabe si una degustación funcionó?',
        a: 'Comparando las unidades vendidas en el punto durante la activación con un periodo de referencia sin ella, y cruzándolo con el número de pruebas entregadas. Eso da la conversión real y el costo por venta, en vez de un recuento de muestras.',
      },
      {
        q: '¿Se puede hacer degustación de licor en cualquier punto de venta?',
        a: 'No. Cada cadena y cada municipio tienen reglas distintas sobre degustación de alcohol, horarios y material visible, y la prueba sólo puede ofrecerse a mayores de edad. Los permisos se gestionan antes del montaje.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'trade-marketing-en-canal-tradicional-tat',
    publishedAt: '2026-09-30',
    title: 'Trade marketing en canal tradicional: activar el TAT',
    excerpt:
      'La tienda de barrio mueve una parte enorme del consumo en Colombia y casi ninguna marca la activa bien. Cómo se arma una ruta TAT y cómo se controla.',
    metaDescription:
      'Cómo hacer trade marketing en canal tradicional (TAT): rutas, cobertura, relación con el tendero, material POP y control de la operación tienda a tienda.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Antioquia',
    niches: ['consumo-masivo'],
    keywords: [
      'trade marketing',
      'canal tradicional TAT',
      'activación tienda a tienda',
      'impulso en tiendas de barrio',
      'cobertura canal tradicional',
    ],
    body: `El **canal tradicional** —la tienda de barrio, el estanquillo, el minimercado— mueve una parte enorme del consumo en Colombia, y es también el que peor se activa. No porque sea difícil de entender, sino porque exige cobertura, control y una relación con el tendero que no se resuelve enviando material por transportadora.

## Qué es el TAT y en qué se diferencia del canal moderno

TAT significa tienda a tienda: la operación va punto por punto, con rutas. Frente al canal moderno —supermercados y grandes superficies— cambian tres cosas:

- **Las reglas**: en la cadena hay espacios negociados, horarios y montajes aprobados. En la tienda manda el tendero.
- **La escala**: en vez de veinte puntos grandes son cientos de puntos pequeños y dispersos.
- **La verificación**: nadie audita por ti. Si no hay evidencia, no hay forma de saber qué pasó.

Cómo se reparte el trabajo entre los dos canales está en la landing de [consumo masivo](${L.consumo}).

## Cómo se arma una ruta TAT

- **Zonificación**: se agrupan los puntos por barrio y por tipo de tienda, no por cercanía en el mapa.
- **Frecuencia**: cuántas veces se visita cada punto durante la campaña. Una sola visita rara vez cambia algo.
- **Kit de la visita**: material POP adecuado al tamaño real de la tienda, producto y guion.
- **Incentivo al tendero**: una razón concreta para ceder espacio, que no siempre es dinero.
- **Registro**: lo que el promotor tiene que capturar en cada punto antes de irse.

## Cómo se eligen los puntos

No todas las tiendas valen lo mismo. La selección se hace con criterios que el propio canal da: volumen de venta de la categoría, tráfico de la esquina, cercanía a colegios, oficinas o paraderos, tamaño del espacio disponible y presencia de la competencia. Activar 200 puntos mal elegidos rinde menos que 80 bien escogidos, y cuesta más.

## El tendero es el aliado, no el obstáculo

En el canal tradicional la marca no le vende al tendero: le vende con el tendero. Él decide qué exhibe, qué recomienda y qué guarda debajo del mostrador. Por eso las activaciones que funcionan lo incluyen.

En la gira de [Chirimía de los que saben](${L.chirimia}), la activación recorrió cuatro municipios de Antioquia acompañando directamente a los clientes del comercio, además de llegar al consumidor. En [RONDANDOS en Jericó](${L.jerico}) el trabajo se hizo junto a los aliados de la marca en la zona. Ese acompañamiento es lo que hace que la marca siga presente cuando la tropa ya se fue.

## Control: sin evidencia no pasó

- **Registro de entrada y salida** por punto y por promotor.
- **Foto del antes y el después** de la exhibición.
- **Unidades movidas** por referencia.
- **Estado del material POP**: instalado, mal instalado o ausente.
- **Consolidación diaria**, para corregir la ruta mientras la campaña sigue viva.

Ese control es lo que convierte una ruta en datos. Cómo lo trabaja el equipo en calle está en [Promotoras e impulsadoras](${L.equipo}).

## Qué pasa después de la ruta

Una visita única deja poco rastro. Lo que sostiene la rotación es la segunda vuelta: volver a los puntos donde el material se instaló, reponer lo que se cayó o se retiró, confirmar que el pedido llegó y registrar qué cambió desde la primera visita. Esa segunda pasada es también la que convierte al promotor en una cara conocida, que en el canal tradicional vale más que cualquier pieza de material.

## Qué medir en una campaña TAT

- **Cobertura**: puntos visitados frente a puntos planificados.
- **Efectividad de la visita**: cuántos terminaron con exhibición o pedido.
- **Implementación de material**: cuántos puntos quedaron con el POP puesto, no enviado. Lo explicamos en [Material POP](${L.pop}).
- **Rotación** por punto y por referencia.
- **Costo por punto activado**.

## Cuándo conviene y cuándo no

El TAT tiene sentido cuando el producto se compra por impulso y cerca de casa, cuando la marca necesita presencia en barrios o municipios donde no llega la cadena, y cuando el objetivo es rotación sostenida. No tiene sentido si el producto necesita una demostración larga o si la distribución todavía no garantiza que haya inventario en esos puntos: activar donde no hay producto es pagar por frustrar a un cliente.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig}), con las giras por municipios de Antioquia.
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué significa TAT en trade marketing?',
        a: 'TAT quiere decir tienda a tienda. Es la operación en canal tradicional —tiendas de barrio, estanquillos y minimercados— que se ejecuta con rutas punto por punto, en vez de con espacios negociados como en las grandes superficies.',
      },
      {
        q: '¿En qué se diferencia activar en canal tradicional y en canal moderno?',
        a: 'En el canal moderno hay reglas de la cadena, espacios negociados y montajes aprobados, con pocos puntos grandes. En el tradicional hay cientos de puntos pequeños y dispersos donde manda el tendero, así que el reto es la cobertura, la relación con él y la verificación de lo que realmente ocurrió.',
      },
      {
        q: '¿Cómo se convence a un tendero de exhibir una marca?',
        a: 'Con una razón concreta para él: que el producto rote, que el material le sirva para ordenar su espacio, que la visita le resuelva algo. El incentivo no siempre es económico, pero sí tiene que existir, porque el espacio del mostrador es su activo más escaso.',
      },
      {
        q: '¿Cómo se controla una operación tienda a tienda?',
        a: 'Con registro de entrada y salida por punto y promotor, fotografías del antes y el después de la exhibición, reporte de unidades por referencia y estado del material POP. La consolidación diaria permite corregir la ruta durante la campaña y no al final.',
      },
      {
        q: '¿Qué se mide en una campaña de trade marketing en TAT?',
        a: 'Cobertura de puntos visitados frente a planificados, efectividad de cada visita, porcentaje de puntos con el material realmente instalado, rotación por punto y referencia, y costo por punto activado.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-para-marcas-de-tecnologia',
    publishedAt: '2026-10-01',
    title: 'Activaciones BTL para marcas de tecnología',
    excerpt:
      'Un producto tecnológico rara vez se vende explicándolo: se vende cuando alguien lo usa. Qué formatos funcionan, con qué equipo y qué se mide en cada uno.',
    metaDescription:
      'Activaciones BTL para tecnología: demos guiadas, experiencias interactivas, stands de feria y eventos B2B. Qué formato elegir y cómo medir el resultado.',
    coverUrl: '/media/nichos/tecnologia.jpg',
    location: 'Medellín',
    niches: ['tecnologia'],
    keywords: [
      'activaciones BTL de tecnología',
      'lanzamiento de producto tecnológico',
      'experiencias interactivas de marca',
      'stands para ferias de tecnología',
      'marketing experiencial B2B',
    ],
    body: `Las marcas de tecnología tienen un problema de explicación: el producto hace mucho y cuesta contarlo. Una activación resuelve eso poniéndolo en las manos de la persona. Una demostración de tres minutos deja más que una presentación de treinta, porque la memoria de usar algo pesa más que la de escucharlo.

## Cuatro formatos, cuatro objetivos

- **Demostración guiada**: un recorrido corto con guion, para que el visitante complete una tarea real con el producto. Sirve para explicar lo que no se entiende en una diapositiva.
- **Experiencia interactiva**: un reto, un juego o una instalación donde la tecnología es el medio. Sirve para captar atención en un lugar con mucho tráfico.
- **Stand en feria o congreso**: espacio de marca en un evento del sector. Sirve para captar y calificar contactos en dos o tres días.
- **Evento privado B2B**: pocos invitados, conversación larga. Sirve cuando el público es reducido y difícil de reunir.

Cuál elegir depende de si vendes a empresas o a consumidores, algo que cambia por completo la mecánica y la medición.

## B2B: pocas personas, mucha conversación

En tecnología para empresas el objetivo de una activación no es el alcance, es abrir conversaciones con quien decide. Eso favorece los formatos cerrados: eventos privados, demostraciones en ferias especializadas y experiencias diseñadas para un perfil concreto.

Sobre esto hay una observación útil en el [episodio 002 de Conexión Podcast](${L.ep2}). Santiago Cardona, gerente general de Grupo REDI, contaba que buena parte de su mercadeo se hace hoy en eventos privados para inversionistas y en eventos con invitación, porque el público al que necesitan llegar es pequeño y difícil de reunir. La lógica es idéntica en tecnología B2B: veinte personas correctas valen más que dos mil visitantes.

En el mismo episodio defendía que la realidad virtual y la aumentada llegaron para quedarse como apoyo a la venta, y describía centros de experiencia donde el cliente toca lo que va a recibir en vez de verlo en un render. Un showroom de producto tecnológico cumple exactamente esa función.

## Consumo: prueba, tráfico y facilidad

En tecnología de consumo el objetivo es la prueba y la intención de compra, así que pesan el punto de venta, el tráfico y lo fácil que sea probar el producto sin ayuda. Aquí funcionan los centros comerciales, donde el público llega con tiempo: lo desarrollamos en [Activaciones BTL en centros comerciales y ferias](${L.centros}).

## El personal es parte del producto

Un visitante que hace una pregunta técnica y recibe una respuesta vaga se va con la impresión contraria a la que buscaba la marca. El equipo se entrena antes en el producto, en el guion de la demostración, en las preguntas frecuentes del público y en el momento exacto de pasar el contacto a un asesor comercial. Cómo se selecciona y se entrena está en [Promotoras e impulsadoras](${L.equipo}).

## Cómo se prepara la demostración

Una demo se ensaya como se ensaya una presentación: con guion, con tiempos y con plan B. Tres cosas que conviene dejar resueltas antes:

- **Qué tiene que lograr hacer la persona** en los primeros dos minutos, y cómo se le guía hasta ahí.
- **Qué pasa si falla la conexión o el equipo**: un vídeo de respaldo, un segundo dispositivo cargado, una versión offline.
- **Cómo se cierra**: qué se le entrega, qué se le pregunta y quién le da seguimiento.

## Qué medir

- **Demostraciones completadas**, no visitantes que pasaron.
- **Tiempo de uso** por persona.
- **Preguntas recogidas en sitio**, que además alimentan al equipo de producto.
- **Intención de compra declarada**.
- **Contactos calificados** entregados al equipo comercial, y qué pasó con ellos después: eso está en [Del lead a la venta](${L.leads}).

Un stand se juzga por demostraciones completadas y contactos calificados, no por cuánta gente pasó por el pasillo.

## Qué te llevas de una feria

Además de los contactos, una feria deja tres cosas que casi nadie recoge: las preguntas que más se repitieron —que son el guion de ventas del próximo trimestre—, las objeciones que frenaron a quien no dejó datos, y el material audiovisual de gente real usando el producto, que después alimenta las redes y la propia web. Si nadie se encarga de registrarlo, se pierde con el desmontaje.

## Cómo se diseña el espacio

Partiendo de lo que el visitante tiene que hacer, no de cómo se ve: un punto de demostración visible desde el pasillo, recorridos cortos, pantallas que muestren el producto funcionando y un lugar tranquilo para conversar con quien tiene interés real. El resto es decoración.

El método por el que trabajamos este sector está en la landing de [activaciones BTL de tecnología](${L.tecnologia}), y si estás comparando proveedores, las preguntas que conviene hacer están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

## Fuentes

- [Conexión Podcast, episodio 002, con Santiago Cardona (YouTube)](${L.ep2yt})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es una activación BTL para una marca de tecnología?',
        a: 'Es una experiencia diseñada para que el público use el producto en lugar de escuchar cómo funciona: una demostración guiada, una instalación interactiva, un stand en una feria del sector o un evento privado para clientes y aliados. El objetivo es que la persona entienda el producto usándolo y deje un contacto útil.',
      },
      {
        q: '¿Qué formato conviene para lanzar un producto tecnológico?',
        a: 'Para público general, uno que permita probarlo en pocos minutos y en un lugar con tráfico. Para empresas, un evento cerrado con demostraciones para quienes toman la decisión de compra. En ambos casos, una demostración corta convierte más que una presentación larga.',
      },
      {
        q: '¿Cómo se mide una activación de tecnología?',
        a: 'Por demostraciones completadas, tiempo de uso por persona, preguntas recogidas en sitio, intención de compra declarada y contactos calificados entregados al equipo comercial. El número de visitantes por sí solo no dice nada.',
      },
      {
        q: '¿Sirve la realidad virtual en una activación?',
        a: 'Sirve como apoyo cuando el producto no se puede llevar al lugar o todavía no existe físicamente. Según Santiago Cardona, de Grupo REDI, la realidad virtual y la aumentada llegaron para quedarse, pero no reemplazan a la experiencia física cuando la venta es muy sensorial.',
      },
      {
        q: '¿Cómo se diseña un stand para una feria de tecnología?',
        a: 'Partiendo de lo que el visitante tiene que hacer: un punto de demostración visible desde el pasillo, recorridos cortos, pantallas con el producto funcionando y un espacio para conversar con quien muestra interés real. Se evalúa por demostraciones completadas y contactos calificados.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'material-pop-que-es-y-como-auditarlo',
    publishedAt: '2026-10-02',
    title: 'Material POP: qué es, tipos y cómo auditar su uso',
    excerpt:
      'Una parte del material POP que una marca manda al punto de venta nunca se instala. Qué tipos hay, por qué se pierde por el camino y cómo controlarlo.',
    metaDescription:
      'Qué es el material POP, qué tipos existen y cómo auditar su implementación en punto de venta para que no se quede en la bodega de la tienda.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Medellín',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'material POP',
      'qué es material POP',
      'exhibición en punto de venta',
      'implementación de material POP',
      'auditoría de punto de venta',
    ],
    body: `El **material POP** (point of purchase) son las piezas de marca que viven en el punto de venta: lo que hace que un producto se vea antes que los de al lado. Es la parte más barata de una campaña de trade marketing y también la que más se desperdicia, porque una parte del material que se envía nunca llega a instalarse o se instala mal.

## Qué tipos hay

- **Exhibidores y displays**: estructuras que sacan el producto del lineal y le dan su propio espacio.
- **Cenefas**: tiras que recorren el borde de la góndola.
- **Habladores**: piezas pequeñas que cuelgan o se clavan junto al producto con un mensaje corto.
- **Stoppers**: piezas que salen perpendiculares al lineal para cortar el paso de la mirada.
- **Rompetráficos**: elementos que interrumpen el recorrido natural del pasillo.
- **Vinilos y señalización**: para suelo, vidrios y neveras.
- **Material de canal tradicional**: afiches, portavasos, canastas y todo lo que cabe en una tienda pequeña.

El material tiene que estar diseñado para el tamaño real del punto. Un exhibidor pensado para una gran superficie no entra en una tienda de barrio, y ahí es donde empieza el desperdicio.

## Por qué se pierde por el camino

- Llega a un punto donde **no hay espacio físico** para ponerlo.
- El **tendero o el administrador no autoriza** esa ubicación.
- Llega **tarde**, cuando la campaña ya arrancó.
- Se instala, pero **alguien lo retira** a los tres días.
- Nadie **verifica**, así que la marca asume que está puesto.

## Cómo se audita la implementación

La auditoría de punto de venta responde una pregunta simple: ¿el material está puesto, donde debía y en buen estado? Se resuelve con un procedimiento, no con buena voluntad:

- **Checklist por punto**: qué piezas debían instalarse y dónde.
- **Evidencia fotográfica** del antes y el después, con fecha y ubicación.
- **Estado**: instalado, mal instalado, ausente o retirado.
- **Reposición**: qué se repuso y en qué visita.
- **Consolidación** por punto, por ciudad y por tipo de pieza.

Con eso se obtiene el indicador que importa: **porcentaje de puntos con material realmente implementado**, que casi nunca coincide con el porcentaje de material despachado.

## Cuánto material producir

El cálculo se hace por punto real, no por ciudad. Producir de más deja cajas en una bodega y producir de menos obliga a decidir sobre la marcha qué punto se queda sin nada, que siempre termina siendo el más lejano. Conviene además prever un porcentaje de reposición: en canal tradicional el material se moja, se raya y se lo llevan, y una campaña de varias semanas sin piezas de repuesto pierde visibilidad justo cuando ya había arrancado.

## El material no trabaja solo

Una exhibición bien montada mejora la visibilidad, pero quien convierte es la combinación de visibilidad, producto disponible y alguien que argumente. En la activación de [Yarumal](${L.yarumal}) el montaje de visibilidad dentro del establecimiento iba acompañado de impulso con promotoras y de un show para generar tráfico y permanencia: las tres cosas empujando el mismo objetivo, que era la rotación del producto.

## Vida útil y retiro

Un material que se queda puesto después de la campaña deja de ser visibilidad y pasa a ser desorden: promociones vencidas, precios que ya no son y piezas descoloridas asociadas a la marca. El plan de implementación tiene que incluir cuándo se retira cada pieza, igual que incluye cuándo se pone.

## Reglas del canal

En cadenas y grandes superficies el material se negocia: hay espacios asignados, formatos permitidos y tiempos de exhibición. En canal tradicional depende del tendero y del espacio que ceda, y ahí el criterio del promotor pesa más que el plano de implementación. Cómo cambia la operación entre uno y otro está en [Trade marketing en canal tradicional](${L.tat}).

## Qué reportarle a la marca

- Cobertura de implementación por punto y por ciudad.
- Permanencia: cuántos puntos conservan el material en la segunda y tercera visita.
- Fotos organizadas por punto, no un álbum suelto.
- Incidencias: por qué no se instaló donde no se instaló.
- Relación entre puntos con material y rotación frente a puntos sin él.

Ese último cruce es el que convierte el POP en una inversión defendible y no en un costo de producción. El marco de medición completo está en [Estrategias BTL](${L.estrategias}) y el detalle del nicho en la landing de [consumo masivo](${L.consumo}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el material POP?',
        a: 'POP viene de point of purchase. Son las piezas de marca que se instalan en el punto de venta para que el producto se vea y se entienda: exhibidores, displays, cenefas, habladores, stoppers, rompetráficos, vinilos y señalización.',
      },
      {
        q: '¿Qué tipos de material POP existen?',
        a: 'Exhibidores y displays que sacan el producto del lineal, cenefas que recorren la góndola, habladores junto al producto, stoppers perpendiculares al lineal, rompetráficos en el pasillo, vinilos para suelo y neveras, y piezas pequeñas pensadas para tiendas de barrio como afiches y canastas.',
      },
      {
        q: '¿Por qué no se instala todo el material POP que se envía?',
        a: 'Porque llega a puntos sin espacio para él, porque el administrador o el tendero no autoriza esa ubicación, porque llega tarde, porque alguien lo retira a los pocos días o, sobre todo, porque nadie verifica que se haya puesto.',
      },
      {
        q: '¿Cómo se audita el material POP en punto de venta?',
        a: 'Con un checklist por punto de qué piezas debían instalarse, evidencia fotográfica del antes y el después con fecha y ubicación, registro del estado de cada pieza, plan de reposición y consolidación por punto, ciudad y tipo de material.',
      },
      {
        q: '¿Cómo se sabe si el material POP sirvió para vender más?',
        a: 'Comparando la rotación de los puntos que quedaron con el material implementado frente a puntos equivalentes sin él, durante el mismo periodo. Ese cruce es lo que convierte el POP en una inversión medible y no en un costo de producción.',
      },
    ],
  },
]
