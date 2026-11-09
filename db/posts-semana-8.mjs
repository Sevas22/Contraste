/**
 * Octava tanda de artículos del blog (semana del 2026-11-09).
 *
 * GA4 a 2026-11-09 (28 días): 181 usuarios (−4,7 %), 913 eventos (−20,3 %)
 * y 72 eventos clave (+105,7 %). El tráfico está plano y las conversiones se
 * duplicaron, que es exactamente lo que se buscaba al cambiar el peso del
 * blog de contenido informativo a contenido de contratación. Esta tanda
 * sigue en esa dirección.
 *
 *   · Cali cierra la serie local (Medellín, Bogotá, Cali), que son las tres
 *     plazas con más búsqueda de «agencia btl» del país.
 *   · Mecánicas promocionales: término con búsqueda propia y la pregunta que
 *     hace toda marca que ya decidió activar («¿y qué hacemos?»).
 *   · Servicios financieros y telecomunicaciones: el sitio tiene cuatro
 *     nichos y ninguno cubre a un banco, una aseguradora o una telco, que
 *     son de los mayores compradores de BTL del país.
 *   · Sampling puerta a puerta: canal que no se nombraba en ninguna parte.
 *   · Universidades: público concreto, con reglas de acceso propias que casi
 *     nadie explica.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 37 artículos ya en vivo.
 *
 * Igual que con Bogotá: no hay casos publicados de Cali ni de sector
 * financiero, así que no se inventa ninguno. La cobertura de ciudades sí se
 * afirma porque la confirmó el cliente el 2026-10-08.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=8 --escribir --publicar
 */

const L = {
  ep1: '/v-podcast/hacia-donde-va-el-mercado-inmobiliario-en-colombia',
  ep2: '/v-podcast/invertir-en-propiedad-raiz-con-poco-dinero',
  ig: 'https://www.instagram.com/agencia_contraste/',
  futbol: 'https://www.instagram.com/agencia_contraste/reel/DSfRC4aDgrj/',
  datos: 'https://www.instagram.com/agencia_contraste/reel/DSkg-apjnKg/',
  jerico: 'https://www.instagram.com/agencia_contraste/reel/DRmuczyjgt7/',
  tropa: 'https://www.instagram.com/agencia_contraste/reel/DV96S1_DOcj/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  faq: '/preguntas-frecuentes',
  contacto: '/#contacto',
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
  bogota: '/blog/agencia-btl-en-bogota',
  retail: '/blog/activaciones-btl-en-supermercados-y-retail',
  stands: '/blog/stands-para-ferias-que-funcionan',
  embajadores: '/blog/embajadores-de-marca-brand-ambassador',
  vsEventos: '/blog/agencia-btl-o-agencia-de-eventos',
  patrocinio: '/blog/activacion-de-patrocinio',
  endomarketing: '/blog/endomarketing-activaciones-hacia-adentro',
  merchandising: '/blog/visual-merchandising-en-punto-de-venta',
  auditoria: '/blog/auditoria-de-punto-de-venta',
  regreso: '/blog/activaciones-btl-regreso-a-clases',
  // Blog de esta tanda
  cali: '/blog/agencia-btl-en-cali',
  mecanicas: '/blog/mecanicas-promocionales-btl',
  servicios: '/blog/btl-para-marcas-de-servicios',
  puerta: '/blog/sampling-puerta-a-puerta',
  universidades: '/blog/activaciones-btl-en-universidades',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'agencia-btl-en-cali',
    publishedAt: '2026-11-09',
    title: 'Agencia BTL en Cali: cómo se activa el Valle',
    excerpt:
      'Cali tiene una relación con la calle, la música y la fiesta que ninguna otra ciudad del país comparte, y eso cambia qué funciona y qué se siente impostado. Cómo se opera una activación aquí.',
    metaDescription:
      'Cómo se opera una activación BTL en Cali y el Valle del Cauca: canales, calendario, perfil del equipo y qué hay que entender de la plaza antes de montar.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Cali, Valle del Cauca',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'agencia BTL Cali',
      'agencias BTL',
      'activaciones BTL Cali',
      'marketing BTL Valle del Cauca',
      'campañas BTL',
    ],
    body: `Cali es la plaza donde más rápido se nota si una marca entiende dónde está. Hay una relación con la calle, con la música y con la celebración que no se puede imitar desde una presentación hecha en otra ciudad: o la activación suena auténtica o suena a disfraz, y la gente lo distingue en segundos.

Con esto cerramos la serie de las tres plazas principales, junto a [Agencia BTL en Medellín](${L.medellin}) y [Agencia BTL en Bogotá](${L.bogota}).

## Qué hay que entender de la plaza

**La calle pesa más.** En Cali el espacio público se usa de verdad, todo el año y a todas horas. Eso abre posibilidades que en otras ciudades no existen y que desarrollamos en [Street marketing y marketing de guerrilla](${L.street}).

**La música no es ambientación, es contenido.** Una activación con música mal elegida resta en vez de sumar. Con la correcta, la gente se queda. Es lo que se vio en los recorridos por municipios de Antioquia con [chirimía en vivo](${L.chirimia}): la música del lugar, no una lista genérica.

**El calendario tiene sus propios picos.** La Feria y las fechas locales concentran actividad de una manera que no se parece al calendario comercial del resto del país. Planear sin eso es planear mal.

**La cercanía manda.** El trato es directo y la gente responde al equipo que se nota de la zona. Un equipo traído de fuera tarda el doble en abrir una conversación.

## Cómo se opera

El método es el mismo que en cualquier plaza —lo explicamos en [Campañas BTL: del brief a la calle](${L.campanas})— con tres ajustes:

1. **Equipo local de verdad.** No gente de la ciudad: gente de la zona donde va a trabajar. Está en [Promotoras e impulsadoras](${L.equipo}).
2. **Mecánicas que acepten música y movimiento.** Lo que funciona en un pasillo de supermercado bogotano puede quedarse corto aquí.
3. **Previsión de clima.** El calor condiciona horarios, duración de turnos, conservación del producto en degustaciones y hasta el tipo de material que se instala.

## Los canales

- **Retail moderno**, con las reglas de cadena de siempre. Ver [Activaciones BTL en supermercados](${L.retail}).
- **Canal tradicional**, que tiene mucho peso en el Valle. Está en [Trade marketing en canal tradicional](${L.tat}).
- **Calle y eventos**, donde la plaza da más que la media del país.
- **Municipios del Valle**, con la misma lógica de ruta que usamos en Antioquia y que explicamos en [Roadshow de marca](${L.roadshow}).

## Qué presupuestar

Lo que cambia respecto a otras ciudades:

- **Desplazamiento regional**, si la campaña sale del área metropolitana.
- **Producción con previsión de calor**: carpa, sombra, conservación en frío.
- **Turnos más cortos** en horas de sol fuerte, lo que puede significar más gente para las mismas horas de cobertura.
- **Música o animación**, cuando la mecánica la pide. No es un extra decorativo.

El desglose general está en [Cuánto cuesta una activación BTL](${L.costos}).

## Cómo trabajamos la plaza

Contraste opera desde Medellín y ejecuta en las nueve principales ciudades de Colombia, Cali incluida, con coordinadores y promotores en cada plaza y un mismo protocolo de producción y de reporte. Eso permite que una marca active en varias ciudades a la vez y pueda comparar resultados, porque todas reportan igual.

Los casos publicados son de Antioquia y están descritos en [Activaciones de marca: ejemplos reales](${L.ejemplos}). Lo que muestran es el estándar de operación, que es el mismo aquí.

## Antes de contratar

Además de lo que está en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}):

1. ¿El equipo es de la zona donde va a trabajar?
2. ¿Quién supervisa y cuántos puntos cubre al día?
3. ¿Cómo se maneja la cadena de frío si hay degustación?
4. ¿Qué pasa si llueve o si el calor obliga a cambiar horarios?
5. ¿El reporte permite comparar Cali con las otras plazas de la campaña?

Si tienes una campaña para el Valle, [cuéntanos el objetivo](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace diferente una activación BTL en Cali?',
        a: 'El uso real del espacio público durante todo el año, el peso de la música como parte del contenido y no como ambientación, un calendario local con picos propios, y la importancia de que el equipo se note de la zona, porque el trato directo abre conversaciones que un equipo de fuera tarda en abrir.',
      },
      {
        q: '¿Qué canales funcionan mejor en el Valle del Cauca?',
        a: 'El canal tradicional tiene mucho peso, la calle y los eventos rinden por encima de la media del país, el retail moderno sigue las mismas reglas de cadena que en el resto, y los municipios del Valle se cubren bien con rutas, igual que se hace en Antioquia.',
      },
      {
        q: '¿Qué hay que presupuestar de más para activar en Cali?',
        a: 'El desplazamiento regional si la campaña sale del área metropolitana, producción con previsión de calor —sombra, carpa y conservación en frío—, turnos más cortos en horas de sol fuerte, que pueden requerir más personal para las mismas horas de cobertura, y música o animación cuando la mecánica la pide.',
      },
      {
        q: '¿Una agencia con sede en Medellín puede operar en Cali?',
        a: 'Sí, cuando tiene coordinadores y promotores propios en la plaza y un mismo protocolo de producción y reporte. Eso es lo que permite activar en varias ciudades a la vez y comparar resultados entre ellas, porque todas reportan con el mismo formato.',
      },
      {
        q: '¿Qué preguntar antes de contratar una activación en Cali?',
        a: 'Si el equipo es de la zona donde va a trabajar, quién supervisa y cuántos puntos cubre al día, cómo se maneja la cadena de frío si hay degustación, qué pasa si llueve o si el calor obliga a cambiar horarios, y si el reporte permite comparar Cali con las otras plazas de la campaña.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'mecanicas-promocionales-btl',
    publishedAt: '2026-11-10',
    title: 'Mecánicas promocionales: cuál elegir y cómo se controla',
    excerpt:
      'Raspa y gana, compra y lleva, códigos, sorteos, premio inmediato. Cada mecánica atrae a un público distinto y tiene un riesgo distinto. Cuál encaja con tu objetivo y qué hay que controlar para que no se vuelva en contra.',
    metaDescription:
      'Qué mecánicas promocionales existen en BTL, cuál conviene según el objetivo, qué riesgos legales y operativos tiene cada una y cómo se controlan.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'mecánicas promocionales',
      'promociones BTL',
      'activaciones de marca',
      'premio inmediato',
      'trade marketing',
    ],
    body: `Cuando una marca decide activar, la siguiente pregunta siempre es la misma: **¿y qué hacemos?** La respuesta no es la mecánica más divertida, es la que encaja con el objetivo. Una promoción que atrae multitudes y no mueve la venta es una fiesta pagada por la marca.

Si vienes de más atrás, el orden completo de una campaña está en [Campañas BTL: del brief a la calle](${L.campanas}).

## Las mecánicas que de verdad se usan

**Premio inmediato (raspa y gana, giro de ruleta).** El participante sabe al instante si ganó. Atrae mucho y rápido.
Sirve para: tráfico y prueba.
Riesgo: atrae a quien viene por el premio y no por el producto.

**Compra y lleva.** Se premia la compra con producto adicional o un obsequio.
Sirve para: volumen y rotación inmediata.
Riesgo: adelanta compras que iban a ocurrir igual.

**Prueba y opinión.** Se prueba el producto y se responde algo.
Sirve para: prueba real y para aprender qué piensa la gente.
Riesgo: ninguno grave, pero rinde menos en volumen.

**Captura y sorteo.** Se dejan datos para participar.
Sirve para: construir base de contactos.
Riesgo: datos falsos si el premio es muy goloso y no se valida nada. Lo que pasa después está en [Del lead a la venta](${L.leads}).

**Mecánica de habilidad o reto.** Competir, acertar, lograr algo.
Sirve para: tiempo de permanencia y recuerdo de marca.
Riesgo: si es difícil, la gente no participa; si es fácil, no genera recuerdo.

**Códigos y segunda compra.** El premio se reclama después, con una nueva compra.
Sirve para: recompra, que es el objetivo más difícil.
Riesgo: fricción alta; cada paso adicional pierde gente.

## Cómo elegir

Con una sola pregunta: **¿qué quieres que haga la persona?**

- Que pruebe → prueba y opinión, o premio inmediato con prueba obligatoria.
- Que compre hoy → compra y lleva.
- Que vuelva a comprar → códigos y segunda compra.
- Que te deje sus datos → captura y sorteo, con formulario de tres campos.
- Que te recuerde → reto o mecánica de habilidad.

Y una regla que ahorra dinero: **si la mecánica se puede ganar sin tocar el producto, no es una mecánica de marca**. Es un juego con un logo encima.

## Lo que hay que controlar

Aquí se cae la mitad de las promociones:

1. **El inventario de premios por punto.** Quedarse sin premios a mitad de jornada enfada a quien ya estaba participando, y eso sí se recuerda.
2. **Las reglas escritas y a la vista.** Quién puede participar, cuántas veces, hasta cuándo y cómo se reclama.
3. **El cumplimiento legal.** En Colombia las promociones con azar tienen requisitos propios y, según el caso, autorización. Esto se revisa con el área legal de la marca antes de imprimir nada.
4. **El control del promotor.** Quien entrega los premios tiene que reportar cuántos entregó y de qué tipo, cuadrando con el inventario.
5. **La trazabilidad.** Si no se puede reconstruir qué pasó en cada punto, no hay auditoría posible. Está en [Auditoría de punto de venta](${L.auditoria}).

## El error más caro

Diseñar la mecánica antes que el objetivo. Pasa constantemente: alguien propone una ruleta porque funcionó en otra campaña, se aprueba, y sólo al final alguien pregunta qué se quería lograr.

El segundo error más caro es no medir la mecánica aparte. Si no sabes cuántas personas participaron frente a cuántas pasaron, no puedes decidir si repetirla. El criterio está en [Cómo medir una activación BTL](${L.metricas}).

## Qué se mide en una mecánica

- **Tasa de participación**: participantes sobre personas abordadas.
- **Prueba efectiva**: cuántos tocaron o probaron el producto de verdad.
- **Costo por participación**, que incluye el premio.
- **Conversión**: cuántos compraron, dejaron datos o volvieron.
- **Calidad de los datos** capturados, no sólo la cantidad.

¿Tienes el objetivo claro y no la mecánica? [Cuéntanos](${L.contacto}) y la diseñamos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué mecánicas promocionales se usan en una activación BTL?',
        a: 'Premio inmediato como raspa y gana o ruleta, compra y lleva, prueba y opinión, captura de datos con sorteo, mecánicas de habilidad o reto, y códigos que se reclaman en una segunda compra. Cada una sirve para un objetivo distinto y tiene su propio riesgo.',
      },
      {
        q: '¿Cómo elegir la mecánica correcta?',
        a: 'Partiendo de qué quieres que haga la persona: que pruebe, que compre hoy, que vuelva a comprar, que deje sus datos o que recuerde la marca. Y con una regla que ahorra dinero: si la mecánica se puede ganar sin tocar el producto, es un juego con un logo encima.',
      },
      {
        q: '¿Qué hay que controlar en una promoción en punto de venta?',
        a: 'El inventario de premios por punto, las reglas escritas y visibles, el cumplimiento legal —en Colombia las promociones con azar tienen requisitos propios—, el reporte del promotor cuadrando con el inventario, y la trazabilidad para poder auditar qué pasó en cada punto.',
      },
      {
        q: '¿Cuál es el error más común al diseñar una promoción?',
        a: 'Elegir la mecánica antes que el objetivo, normalmente copiando una que funcionó en otra campaña. El segundo error es no medir la mecánica por separado: sin saber cuántos participaron frente a cuántos pasaron, no hay forma de decidir si conviene repetirla.',
      },
      {
        q: '¿Cómo se mide si una mecánica promocional funcionó?',
        a: 'Con la tasa de participación sobre personas abordadas, la prueba efectiva de producto, el costo por participación incluyendo el premio, la conversión en compra o datos, y la calidad de los contactos capturados, no sólo su cantidad.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'btl-para-marcas-de-servicios',
    publishedAt: '2026-11-11',
    title: 'BTL para bancos, seguros y telecomunicaciones',
    excerpt:
      'Un servicio no se puede probar ni llevar en una bolsa, y eso cambia la activación entera. Qué se hace cuando no hay producto físico y cómo se mide algo que se contrata semanas después.',
    metaDescription:
      'Cómo se hacen activaciones BTL para marcas de servicios como bancos, seguros y telcos: qué sustituye a la prueba de producto y cómo se mide el resultado.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Colombia',
    niches: ['tecnologia', 'inmobiliario'],
    keywords: [
      'BTL para servicios',
      'activaciones de marca',
      'marketing BTL bancos',
      'captura de leads',
      'marketing experiencial',
    ],
    body: `Toda la lógica del BTL de consumo se apoya en una cosa: que la persona pruebe el producto. Una degustación, una muestra, una demostración. ¿Qué pasa cuando lo que se vende es una cuenta de ahorros, un seguro o un plan de datos?

Que hay que sustituir la prueba por otra cosa. Y esa es toda la diferencia de activar una **marca de servicios**.

## Qué sustituye a la prueba

**Resolver una duda concreta.** La mayoría de la gente tiene una pregunta sin responder sobre su banco, su seguro o su plan. Un espacio donde alguien la responda sin intentar venderle en ese minuto vale más que cualquier folleto.

**Mostrar el proceso, no el producto.** Cuánto tarda, qué papeles hacen falta, cómo se hace desde la aplicación. Enseñar que es fácil es la versión de «probar» en servicios.

**Hacer un cálculo con sus datos.** Cuánto pagaría, cuánto ahorraría, cuánto le cubriría. Lo abstracto se vuelve concreto cuando lleva las cifras de quien pregunta.

**Resolver un trámite ahí mismo.** Si la activación puede dejar algo hecho —una cita, una solicitud iniciada, una actualización—, deja de ser publicidad y pasa a ser servicio.

## Dónde se activa

- **Centros comerciales y corredores de oficinas**, donde está el público con capacidad de contratar. Ver [Activaciones BTL en centros comerciales y ferias](${L.centros}).
- **Dentro de las propias sucursales**, que suelen estar infrautilizadas como espacio de marca.
- **Empresas**, con convenios: un público cautivo y segmentado.
- **Universidades**, para productos de entrada. Está en [Activaciones BTL en universidades](${L.universidades}).
- **Eventos y patrocinios**, donde la marca ya pagó la entrada y casi nunca activa. En [Activación de patrocinio](${L.patrocinio}).

## El equipo es otro

Aquí no sirve una promotora entrenada en un argumentario de producto. Hace falta alguien que pueda responder preguntas reales sin prometer lo que no es, y que sepa cuándo decir «eso tiene que verlo con un asesor».

Es el perfil más cercano a un [embajador de marca](${L.embajadores}) que al de punto de venta, y la formación pesa mucho más: en servicios financieros, una respuesta mal dada no es un error comercial, es un riesgo regulatorio.

## El problema de la medición

En consumo masivo se mide la rotación del punto. En servicios, entre la activación y la contratación pueden pasar semanas, y el cierre ocurre en otro canal: una sucursal, una llamada, la aplicación.

Eso obliga a dos cosas:

1. **Capturar bien el contacto**, con consentimiento explícito y con el dato que permita cruzarlo después.
2. **Tener acordado con la marca cómo se va a atribuir.** Si no se define antes, al final nadie sabe de dónde vino el cliente y la activación aparece como un gasto sin retorno.

Los indicadores que funcionan:

- **Conversaciones efectivas**, no personas abordadas.
- **Cálculos o simulaciones hechas** con datos de la persona.
- **Trámites iniciados** en el punto.
- **Contactos capturados y contactados** en las 48 horas siguientes, que es lo que desarrollamos en [Del lead a la venta](${L.leads}).
- **Contratación atribuida** en la ventana que se haya acordado.

El criterio general está en [Cómo medir una activación BTL](${L.metricas}).

## Lo que no funciona

Montar un stand con el logo y folletos. Es lo más común y lo que menos rinde: no hay nada que hacer ahí, y el servicio sigue siendo igual de abstracto que antes de pasar.

Tampoco funciona capturar datos sin tener quién los trabaje. En servicios, un lead de hace tres semanas está frío.

Si vendes algo que no se puede tocar y quieres llevarlo a la calle, [cuéntanos qué servicio es](${L.contacto}) y miramos qué sustituye a la prueba.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se hace una activación BTL para un servicio que no se puede probar?',
        a: 'Sustituyendo la prueba por otra cosa: resolver una duda concreta sin vender en ese momento, mostrar lo fácil que es el proceso, hacer un cálculo con los datos reales de la persona, o dejar un trámite iniciado ahí mismo. Eso convierte la publicidad en servicio.',
      },
      {
        q: '¿Dónde conviene activar una marca de servicios?',
        a: 'En centros comerciales y corredores de oficinas donde está el público con capacidad de contratar, dentro de las propias sucursales que suelen estar infrautilizadas, en empresas con convenio, en universidades para productos de entrada, y en los eventos que la marca ya patrocina y casi nunca activa.',
      },
      {
        q: '¿Qué perfil de equipo hace falta para activar un servicio financiero?',
        a: 'Alguien que pueda responder preguntas reales sin prometer lo que no es y que sepa cuándo derivar a un asesor. Está más cerca del perfil de embajador de marca que del de promotor de punto de venta, y la formación pesa más: una respuesta mal dada es un riesgo regulatorio, no sólo un error comercial.',
      },
      {
        q: '¿Cómo se mide una activación BTL de servicios?',
        a: 'Con conversaciones efectivas, cálculos o simulaciones hechas con datos de la persona, trámites iniciados en el punto, contactos capturados y contactados en las 48 horas siguientes, y la contratación atribuida dentro de la ventana que se haya acordado con la marca.',
      },
      {
        q: '¿Por qué es más difícil medir el BTL en servicios que en consumo masivo?',
        a: 'Porque entre la activación y la contratación pueden pasar semanas y el cierre ocurre en otro canal: una sucursal, una llamada o la aplicación. Por eso hay que capturar bien el contacto y acordar de antemano cómo se va a atribuir, o la activación acaba figurando como gasto sin retorno.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'sampling-puerta-a-puerta',
    publishedAt: '2026-11-12',
    title: 'Sampling puerta a puerta: cuándo funciona',
    excerpt:
      'Llevar la muestra hasta la casa tiene una ventaja que ningún punto de venta da: el producto se prueba en el momento y el lugar donde se usa. También tiene riesgos que conviene conocer antes.',
    metaDescription:
      'Qué es el sampling puerta a puerta, cuándo conviene frente al punto de venta, cómo se planea la ruta, qué permisos hace falta y cómo se mide.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'sampling puerta a puerta',
      'sampling',
      'muestreo de producto',
      'activaciones BTL',
      'prueba de producto',
    ],
    body: `El **sampling puerta a puerta** hace algo que ninguna degustación en pasillo consigue: deja el producto en la casa, que es donde se va a usar. Un detergente se prueba lavando, no mirándolo en una góndola. Un café se prueba a las seis de la mañana.

Si buscas la versión de punto de venta, está en [Degustaciones y sampling en punto de venta](${L.degustaciones}).

## Cuándo conviene

- **Productos de uso doméstico** que necesitan una situación real para valorarse: limpieza, cuidado personal, alimentos de preparación.
- **Cuando la barrera es el hábito**, no el precio. Quien lleva años con la misma marca no cambia por un descuento, pero puede cambiar si prueba.
- **Para cubrir una zona concreta** alrededor de un punto de venta donde la marca quiere crecer.
- **Lanzamientos en barrio**, cuando el producto ya está disponible en las tiendas de la zona. Está en [Lanzamiento de producto](${L.lanzamientoPost}).

## Cuándo no

- Si el producto necesita explicación larga: en la puerta nadie escucha tres minutos.
- Si no está disponible cerca. Generar ganas de comprar algo que no se consigue a dos cuadras es tirar la muestra.
- Si el objetivo es volumen de contactos: la cobertura por hora es baja comparada con un punto de alto flujo.
- En zonas donde el acceso es difícil o la seguridad del equipo no está garantizada. Esto no se negocia.

## Cómo se planea la ruta

1. **Elegir la zona por distribución, no por demografía.** Primero se mira dónde está el producto disponible; después, qué barrios rodean esos puntos.
2. **Definir la unidad de ruta**: manzanas, conjuntos, edificios. En vivienda vertical se negocia con la administración; en casas se recorre calle por calle.
3. **Horarios reales.** Media mañana y media tarde entre semana es cuando hay alguien en casa. A las ocho de la noche no se toca ninguna puerta.
4. **Material por equipo y reposición prevista**, con inventario de salida y de retorno.
5. **Registro por vivienda**: entregada, no había nadie, rechazada. Sin ese registro no hay cobertura medible.

## Permisos y reglas

- **Conjuntos y edificios** exigen autorización de la administración, y muchas veces un horario concreto y acompañamiento.
- **Algunos municipios** regulan la actividad en espacio público; conviene verificarlo antes.
- **Identificación visible** del equipo, siempre. Nadie abre a un desconocido sin uniforme ni credencial.
- **Protocolo de trato**: qué se dice, qué no se promete y cómo se responde a quien no quiere recibir nada.

Eso último es más importante de lo que parece: el equipo está entrando en el espacio de la gente, y una mala interacción en la puerta de una casa hace más daño a la marca que diez en un supermercado. El perfil y el entrenamiento están en [Promotoras e impulsadoras](${L.equipo}).

## Qué se mide

- **Cobertura**: viviendas alcanzadas sobre viviendas planeadas.
- **Tasa de entrega efectiva**: a cuántas personas se les entregó en mano, no cuántas muestras salieron de la caja.
- **Rechazo**, que dice mucho sobre la zona y el abordaje.
- **Datos capturados**, cuando la mecánica los pide.
- **Rotación en los puntos de venta de la zona**, comparada con una zona equivalente sin sampling. Esta es la medición que de verdad cierra el caso, y la explicamos en [Cómo medir una activación BTL](${L.metricas}).

## El error más común

Medir muestras entregadas. Es la métrica de vanidad perfecta: sube siempre, no se puede comparar con nada y no dice si alguien probó el producto. Lo que importa es qué pasó después en las tiendas de esa zona.

¿Tienes un producto que gana al usarse en casa? [Cuéntanos cuál](${L.contacto}) y miramos si la zona da para una ruta.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el sampling puerta a puerta?',
        a: 'Es la entrega de muestras de producto directamente en las viviendas de una zona, siguiendo una ruta planeada. Su ventaja es que el producto llega al lugar donde se va a usar de verdad, que es donde categorías como limpieza, cuidado personal o alimentos se valoran.',
      },
      {
        q: '¿Cuándo conviene el sampling puerta a puerta frente al punto de venta?',
        a: 'Cuando el producto necesita una situación real para valorarse, cuando la barrera es el hábito y no el precio, cuando se quiere cubrir una zona concreta alrededor de un punto donde la marca quiere crecer, y en lanzamientos de barrio con el producto ya disponible en las tiendas cercanas.',
      },
      {
        q: '¿Qué permisos hace falta para hacer sampling puerta a puerta?',
        a: 'Autorización de la administración en conjuntos y edificios, normalmente con horario acordado y acompañamiento; verificación de la normativa del municipio cuando se usa el espacio público; e identificación visible del equipo, que es imprescindible para que la gente abra la puerta.',
      },
      {
        q: '¿A qué hora se hace el sampling puerta a puerta?',
        a: 'A media mañana y a media tarde entre semana, que es cuando hay alguien en casa. No se tocan puertas de noche: ni rinde ni es apropiado, y una mala interacción en la puerta de una vivienda hace más daño a la marca que diez en un supermercado.',
      },
      {
        q: '¿Cómo se mide una campaña de sampling puerta a puerta?',
        a: 'Con cobertura sobre las viviendas planeadas, tasa de entrega efectiva en mano, tasa de rechazo, datos capturados si la mecánica los pide y, sobre todo, la rotación en los puntos de venta de esa zona comparada con una zona equivalente sin sampling. Contar muestras entregadas es una métrica de vanidad.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-en-universidades',
    publishedAt: '2026-11-13',
    title: 'Activaciones BTL en universidades: cómo entrar',
    excerpt:
      'Miles de personas del mismo perfil, en un espacio cerrado y con rutinas previsibles. El campus es uno de los mejores entornos de activación que existen, y también uno de los más difíciles de conseguir.',
    metaDescription:
      'Cómo se hacen activaciones BTL en universidades: cómo se consigue el permiso, qué mecánicas funcionan en campus, cuándo activar y qué se mide.',
    coverUrl: '/media/nichos/tecnologia.jpg',
    location: 'Colombia',
    niches: ['tecnologia', 'consumo-masivo'],
    keywords: [
      'activaciones en universidades',
      'marketing universitario',
      'activaciones BTL',
      'sampling universitario',
      'marketing experiencial',
    ],
    body: `Un campus universitario es, desde el punto de vista de una marca, un entorno casi ideal: miles de personas con un perfil parecido, en un espacio delimitado, con rutinas que se repiten cada semana y mucho tiempo muerto entre clases. Lo difícil no es la activación: es entrar.

## Cómo se consigue el permiso

Esta es la parte que decide si la campaña existe:

**Hay un área responsable y conviene encontrarla primero.** Según la universidad puede ser bienestar universitario, mercadeo, extensión o la administración del campus. Golpear la puerta equivocada cuesta semanas.

**Las universidades protegen a sus estudiantes.** No dejan entrar cualquier cosa, y menos si parece venta agresiva. Las propuestas que entran son las que aportan algo: información útil, un beneficio real, un contenido que encaje con lo académico.

**Suele haber contraprestación.** Puede ser una tarifa, un convenio, patrocinio de una actividad propia de la universidad o beneficios para los estudiantes.

**Los tiempos son largos.** Entre la solicitud y la autorización pueden pasar semanas, y los comités no se reúnen cuando a la marca le conviene.

**Hay categorías vetadas.** Alcohol, tabaco y, en muchas, productos financieros con condiciones agresivas. Si tu categoría es sensible, se pregunta antes de diseñar nada.

## Cuándo activar

El calendario académico manda:

- **Primeras dos semanas de cada semestre**: máximo flujo, estudiantes nuevos y rutinas sin fijar. Es la mejor ventana.
- **Mitad de semestre**: estabilidad, buen tráfico, menos competencia de otras marcas.
- **Semanas de parciales y finales**: tráfico alto pero atención cero. Sólo funciona lo que alivie el momento.
- **Vacaciones**: no.

## Qué funciona en campus

- **Lo que resuelve el día**: comida, bebida, carga de dispositivos, un sitio para sentarse. La utilidad inmediata compra atención.
- **Mecánicas con competencia**, que en este público funcionan especialmente bien. Las opciones están en [Mecánicas promocionales](${L.mecanicas}).
- **Demostración de producto** para tecnología, que es donde el campus rinde más. Ver [Activaciones BTL para marcas de tecnología](${L.tech}).
- **Sampling** de categorías de consumo diario, con la lógica de [Degustaciones y sampling](${L.degustaciones}).
- **Contenido con valor académico**: charlas, talleres, convocatorias. Es lo que más fácil abre la puerta del permiso.

Lo que no funciona: el stand con folletos. Este público lo ignora con una eficacia notable.

## Dónde ponerse dentro del campus

El campus tiene zonas con comportamientos muy distintos, y elegir mal el sitio cuesta más que elegir mal la mecánica:

- **Entradas y torniquetes**: todo el mundo pasa, pero va de camino a algo. Sirve para entregar, no para conversar.
- **Plazoletas y zonas de comida**: el mejor sitio. La gente ya está parada, con tiempo y acompañada, que es cuando se participa en algo.
- **Pasillos entre facultades**: tránsito constante en los cambios de clase y vacío el resto del tiempo.
- **Bibliotecas y zonas de estudio**: no. Es el espacio donde la interrupción molesta de verdad.

## El equipo

Lo ideal es equipo joven y, si se puede, estudiantes de la propia universidad. Conocen los espacios, los horarios y el lenguaje, y generan menos rechazo que alguien que se nota ajeno. El perfil y el entrenamiento están en [Promotoras e impulsadoras](${L.equipo}).

## Qué se mide

- **Contactos efectivos**, no estudiantes del campus.
- **Participación** en la mecánica.
- **Datos capturados** con consentimiento, teniendo en cuenta que es un público que da su contacto con facilidad y luego no responde: lo que importa es la calidad, no el volumen.
- **Conversión posterior**, que en productos de entrada puede tardar. Está en [Del lead a la venta](${L.leads}).
- **Repetición**: cuántos vuelven al stand un segundo día, que es el mejor indicador de que la mecánica funcionó.

El criterio para separar lo que decide de lo que decora está en [Cómo medir una activación BTL](${L.metricas}).

## Una advertencia

El público universitario detecta lo impostado mejor que ninguno. Una marca que intenta hablar como cree que hablan los estudiantes consigue el efecto contrario. Funciona mejor ser claro y útil que intentar ser cercano.

¿Tu producto tiene sentido para ese público? [Cuéntanos cuál es](${L.contacto}) y miramos qué universidades encajan.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se consigue permiso para activar en una universidad?',
        a: 'Identificando primero el área responsable, que según la institución puede ser bienestar universitario, mercadeo, extensión o administración del campus. Las propuestas que entran son las que aportan algo a los estudiantes, suele haber contraprestación o convenio, y los tiempos de autorización son de semanas.',
      },
      {
        q: '¿Cuándo es mejor activar en un campus universitario?',
        a: 'En las primeras dos semanas de cada semestre, cuando hay máximo flujo y las rutinas aún no están fijadas. La mitad de semestre también funciona, con menos competencia. En semanas de parciales el tráfico es alto pero la atención es nula, y en vacaciones no tiene sentido.',
      },
      {
        q: '¿Qué mecánicas funcionan con público universitario?',
        a: 'Lo que resuelve el día —comida, bebida, carga de dispositivos, un sitio donde sentarse—, las mecánicas con competencia, la demostración de producto en tecnología, el sampling de consumo diario y el contenido con valor académico, que además facilita el permiso. El stand con folletos lo ignoran.',
      },
      {
        q: '¿Qué categorías no pueden activar en universidades?',
        a: 'Alcohol y tabaco en prácticamente todas, y en muchas también productos financieros con condiciones agresivas. Si la categoría es sensible conviene preguntarlo antes de diseñar la activación, porque puede no haber forma de entrar.',
      },
      {
        q: '¿Cómo se mide una activación en universidad?',
        a: 'Con contactos efectivos en vez de estudiantes del campus, participación en la mecánica, datos capturados valorando la calidad por encima del volumen, conversión posterior, y repetición: cuántos vuelven al stand un segundo día, que es el mejor indicador de que la mecánica funcionó.',
      },
    ],
  },
]
