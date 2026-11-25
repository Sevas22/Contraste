/**
 * Décima tanda de artículos del blog (semana del 2026-11-24).
 *
 * El cliente pidió el 2026-11-19 posicionar la marca en Bogotá y Medellín, y
 * eligió la opción C: hacerlo desde el blog, sin tocar la estructura del
 * sitio ni crear landings de ciudad. Esta tanda es eso.
 *
 *   · «Dónde activar» en cada ciudad: contenido local de verdad, del tipo que
 *     sólo puede escribir quien opera ahí, y la clase de consulta que hace
 *     alguien que ya tiene una campaña entre manos.
 *   · Permisos en espacio público: una de las dudas que más se repite y que
 *     casi nadie responde.
 *   · Municipios de Antioquia: el diferencial real de Contraste, y lo único
 *     de esta tanda con casos propios publicados.
 *   · Cómo elegir los puntos: long tail transaccional, en la línea de la
 *     tanda 9.
 *
 * CUIDADO CON LOS PERMISOS. No hay fuente verificada de los trámites
 * concretos de cada alcaldía, y las normas cambian. El artículo explica cómo
 * funciona el proceso y quién concede qué, SIN inventar nombres de
 * formularios, plazos oficiales ni tarifas, y diciendo de forma explícita que
 * los requisitos exactos los fija cada autoridad y hay que confirmarlos. Si
 * algún día el cliente pasa los trámites reales que ha hecho, se concreta.
 *
 * Lo mismo con las zonas: se nombran sectores y tipos de espacio que son
 * conocimiento público de las dos ciudades, sin atribuir a Contraste
 * activaciones que no estén publicadas. Los únicos casos propios que se citan
 * son los de Antioquia, que sí están en el Instagram de la agencia.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Las cuatro landings de nicho y los 47 artículos ya en vivo.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=10 --escribir --publicar
 * Después: node db/enlaces-relacionados.mjs --escribir
 */

const L = {
  ig: 'https://www.instagram.com/agencia_contraste/',
  datos: 'https://www.instagram.com/agencia_contraste/reel/DSkg-apjnKg/',
  jerico: 'https://www.instagram.com/agencia_contraste/reel/DRmuczyjgt7/',
  venecia: 'https://www.instagram.com/agencia_contraste/reel/DVGsV7ajkwu/',
  yarumal: 'https://www.instagram.com/agencia_contraste/reel/DVuaDhejFW4/',
  tropa: 'https://www.instagram.com/agencia_contraste/reel/DV96S1_DOcj/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  faq: '/preguntas-frecuentes',
  contacto: '/#contacto',
  queEsBtl: '/blog/que-es-btl-significado-y-ejemplos',
  ejemplos: '/blog/activaciones-de-marca-ejemplos-btl-antioquia',
  centros: '/blog/activaciones-btl-centros-comerciales-y-ferias',
  estrategias: '/blog/estrategias-btl-activaciones-con-resultados',
  queHace: '/blog/que-hace-una-agencia-btl',
  costos: '/blog/cuanto-cuesta-una-activacion-btl',
  equipo: '/blog/promotoras-e-impulsadoras-equipo-de-calle',
  agenciaFirmar: '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
  degustaciones: '/blog/degustaciones-y-sampling-en-punto-de-venta',
  tat: '/blog/trade-marketing-en-canal-tradicional-tat',
  medellin: '/blog/agencia-btl-en-medellin',
  bogota: '/blog/agencia-btl-en-bogota',
  cali: '/blog/agencia-btl-en-cali',
  campanas: '/blog/campanas-btl-del-brief-a-la-calle',
  street: '/blog/street-marketing-y-marketing-de-guerrilla',
  produccion: '/blog/produccion-de-eventos-btl-que-incluye',
  roadshow: '/blog/roadshow-de-marca-que-es-y-cuando-conviene',
  metricas: '/blog/como-medir-una-activacion-btl-sin-metricas-de-vanidad',
  retail: '/blog/activaciones-btl-en-supermercados-y-retail',
  stands: '/blog/stands-para-ferias-que-funcionan',
  universidades: '/blog/activaciones-btl-en-universidades',
  mecanicas: '/blog/mecanicas-promocionales-btl',
  puerta: '/blog/sampling-puerta-a-puerta',
  contratar: '/blog/como-contratar-una-agencia-btl',
  cuantas: '/blog/cuantas-promotoras-necesita-una-activacion',
  errores: '/blog/errores-en-activaciones-btl',
  // Esta tanda
  dondeMedellin: '/blog/donde-activar-una-marca-en-medellin',
  dondeBogota: '/blog/donde-activar-una-marca-en-bogota',
  permisos: '/blog/permisos-para-activaciones-en-espacio-publico',
  municipios: '/blog/activaciones-btl-en-municipios-de-antioquia',
  puntos: '/blog/como-elegir-los-puntos-de-una-activacion',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'donde-activar-una-marca-en-medellin',
    publishedAt: '2026-11-24',
    title: 'Dónde activar una marca en Medellín',
    excerpt:
      'La ciudad tiene entornos muy distintos y cada uno pide una mecánica. Centros comerciales, corredores comerciales de barrio, parques, zonas universitarias y el Valle de Aburrá entero: qué funciona en cada sitio.',
    metaDescription:
      'Dónde activar una marca en Medellín: centros comerciales, corredores de barrio, parques, zonas universitarias y municipios del Valle de Aburrá.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Medellín, Antioquia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'dónde activar una marca en Medellín',
      'activaciones BTL Medellín',
      'agencia BTL Medellín',
      'activaciones de marca',
      'puntos de activación',
    ],
    body: `Elegir mal el sitio es el error que más caro sale en una activación, porque todo lo demás —el montaje, el equipo, la mecánica— puede estar perfecto y aun así no pasar nada. En Medellín la decisión tiene más matices de los que parece, porque la ciudad cambia mucho de un sector a otro.

Si buscas cómo se opera la plaza en general, está en [Agencia BTL en Medellín](${L.medellin}). Esto es la guía de dónde.

## Centros comerciales

El entorno más previsible y el más caro. Flujo alto, público con intención de compra y tiempo, techo y servicios. A cambio: espacios que se negocian con meses de antelación, reglas de montaje estrictas y competencia por las mejores ubicaciones.

Funciona para mecánicas que piden tiempo y montaje: demostraciones, retos, experiencias con cola. Las reglas de este canal están en [Activaciones BTL en centros comerciales y ferias](${L.centros}).

Dentro de uno, la ubicación importa tanto como el centro: la plazoleta de comidas no es lo mismo que el pasillo de entrada ni que la zona de bancos.

## Corredores comerciales de barrio

Las calles comerciales de los barrios concentran tráfico peatonal real, de gente que vive ahí y repite recorrido. Son el mejor sitio para construir presencia sostenida en una zona concreta, con la ventaja de que el costo es una fracción del centro comercial.

Pide mecánicas rápidas, equipo que conecte con el barrio y, normalmente, permisos de espacio público. Lo explicamos en [Permisos para activaciones en espacio público](${L.permisos}).

## Supermercados y canal tradicional

Dos canales distintos que conviven en toda la ciudad:

- **Grandes superficies**, con la compra planeada y datos de rotación. Ver [Activaciones BTL en supermercados](${L.retail}).
- **Tiendas de barrio**, que en Medellín pesan muchísimo y se trabajan por ruta. Está en [Trade marketing en canal tradicional](${L.tat}).

## Parques y espacio público

Los parques de la ciudad dan algo que ningún centro comercial da: gente que no está comprando y tiene tiempo. Funcionan muy bien los fines de semana y en eventos de ciudad, y son el terreno natural del [street marketing](${L.street}).

Requieren permiso, previsión de clima y una mecánica que se sostenga sin paredes.

## Zonas universitarias

El Valle de Aburrá concentra varias universidades grandes, y el entorno de cada una —no sólo el campus— tiene público joven, previsible y con rutinas. Entrar al campus tiene sus propias reglas, que están en [Activaciones BTL en universidades](${L.universidades}).

## El Valle de Aburrá, no sólo Medellín

Envigado, Itagüí, Bello, Sabaneta y Rionegro son parte del mismo mercado y suelen quedarse fuera de los planes por inercia. Para marcas de consumo masivo, cubrir el área metropolitana por ruta rinde más que concentrar todo en El Poblado. La lógica de ruta está en [Roadshow de marca](${L.roadshow}).

Y más allá del área metropolitana están los municipios, que son un capítulo aparte: [Activaciones BTL en municipios de Antioquia](${L.municipios}).

## Cuándo, no sólo dónde

El mismo punto rinde distinto según el día y la hora, y eso cuesta lo mismo:

- **Centros comerciales**: viernes por la tarde, sábado y domingo. Entre semana, sólo la franja del mediodía en los que tienen oficinas cerca.
- **Corredores de barrio**: final de la tarde, cuando la gente vuelve a casa, y sábado por la mañana.
- **Supermercados**: fines de semana y quincenas, que es cuando se hace la compra grande.
- **Parques**: domingo, y los días de evento de ciudad.

Y un factor que en Medellín se olvida: **la lluvia de media tarde**. Cualquier activación a cielo abierto necesita plan B escrito, no improvisado el mismo día.

## Cómo decidir entre todos

Tres preguntas, en este orden:

1. **¿Dónde está disponible el producto?** No tiene sentido activar donde no se puede comprar.
2. **¿Qué tiene que hacer la persona?** Si la mecánica dura tres minutos, el pasillo de un supermercado no sirve.
3. **¿Cuánto presupuesto hay por punto?** Un centro comercial bien hecho puede costar lo que cinco puntos de barrio.

El método completo está en [Cómo elegir los puntos de una activación](${L.puntos}), y lo que mueve el presupuesto, en [Cuánto cuesta una activación BTL](${L.costos}).

¿Tienes una campaña para Medellín y no sabes dónde ponerla? [Cuéntanos el objetivo](${L.contacto}) y lo armamos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Dónde conviene activar una marca en Medellín?',
        a: 'Depende del objetivo: centros comerciales para mecánicas con montaje y tiempo, corredores comerciales de barrio para presencia sostenida a menor costo, supermercados y tiendas de barrio para rotación, parques para experiencias de fin de semana y zonas universitarias para público joven.',
      },
      {
        q: '¿Qué cuesta más, un centro comercial o la calle?',
        a: 'El centro comercial, con diferencia: el espacio se negocia con meses de antelación y tiene tarifa. Un punto en corredor comercial de barrio cuesta una fracción, aunque suele necesitar permiso de espacio público y una mecánica más rápida.',
      },
      {
        q: '¿Vale la pena activar fuera de Medellín, en el Valle de Aburrá?',
        a: 'Sí, sobre todo en consumo masivo. Envigado, Itagüí, Bello, Sabaneta y Rionegro son parte del mismo mercado y suelen quedar fuera de los planes por inercia. Cubrir el área metropolitana por ruta rinde más que concentrar toda la inversión en un solo sector.',
      },
      {
        q: '¿Cómo se eligen los puntos de una activación en Medellín?',
        a: 'Con tres preguntas en orden: dónde está disponible el producto, qué tiene que hacer la persona —porque una mecánica larga no cabe en un pasillo de supermercado— y cuánto presupuesto hay por punto, teniendo en cuenta que un centro comercial puede costar lo que cinco puntos de barrio.',
      },
      {
        q: '¿Hace falta permiso para activar en la calle en Medellín?',
        a: 'Sí, el uso de espacio público para una actividad comercial requiere autorización, y los requisitos los fija la autoridad local. Conviene confirmarlos antes de cerrar fechas, porque es el trámite más impredecible de toda la operación.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'donde-activar-una-marca-en-bogota',
    publishedAt: '2026-11-25',
    title: 'Dónde activar una marca en Bogotá, zona por zona',
    excerpt:
      'Bogotá no se cubre entera: se elige. Qué ofrece cada tipo de zona —centros comerciales, corredores de oficinas, barrios, universidades— y cómo agrupar puntos para que el tráfico no se coma la jornada.',
    metaDescription:
      'Dónde activar una marca en Bogotá: centros comerciales, corredores de oficinas, zonas residenciales y universitarias, y cómo agrupar los puntos por ruta.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Bogotá',
    niches: ['consumo-masivo', 'tecnologia', 'inmobiliario'],
    keywords: [
      'dónde activar una marca en Bogotá',
      'activaciones BTL Bogotá',
      'agencia BTL Bogotá',
      'puntos de activación',
      'campañas BTL',
    ],
    body: `En Bogotá la primera decisión no es qué mecánica hacer: es **en qué parte de la ciudad**. Y la segunda es cómo agrupar los puntos, porque aquí el desplazamiento se paga en horas de equipo y puede comerse media jornada sin que nadie lo vea en la factura.

Cómo se opera la plaza en general está en [Agencia BTL en Bogotá](${L.bogota}). Esto es dónde.

## Centros comerciales

La ciudad tiene una densidad de centros comerciales que no tiene ninguna otra del país, y entre ellos hay diferencias enormes de público. El error típico es elegir el más grande en vez del que coincide con el público objetivo.

Flujo alto, reglas estrictas, espacios con calendario cerrado. Es el canal para mecánicas que necesitan montaje y tiempo de permanencia, explicado en [Activaciones BTL en centros comerciales y ferias](${L.centros}).

## Corredores de oficinas

Zonas con alta concentración de trabajo tienen un comportamiento muy particular: picos clarísimos a la hora de entrada, al mediodía y a la salida, y público con capacidad de compra pero con poquísimo tiempo.

Funcionan para mecánicas de segundos, para muestras de consumo inmediato y para servicios: es el entorno natural de lo que explicamos en [BTL para bancos, seguros y telecomunicaciones](/blog/btl-para-marcas-de-servicios).

Fuera de esas tres franjas horarias, están vacíos. Planear una jornada completa ahí es tirar horas.

## Zonas residenciales

Conjuntos, corredores comerciales de barrio y supermercados de proximidad. Es donde vive la compra del hogar, y donde tiene sentido el [sampling puerta a puerta](${L.puerta}) y la cobertura por ruta en [canal tradicional](${L.tat}).

Menos espectacular que un centro comercial y mucho más barato por contacto.

## Zonas universitarias

Bogotá concentra buena parte de la población universitaria del país, y el entorno de cada campus funciona incluso sin entrar en él. Las reglas para entrar están en [Activaciones BTL en universidades](${L.universidades}).

## Plazas, parques y eventos de ciudad

Dan volumen y gente con tiempo, con dos condicionantes serios: el permiso de espacio público, que está en [Permisos para activaciones en espacio público](${L.permisos}), y el clima, que en Bogotá obliga a tener plan B por escrito en cualquier época del año.

## Lo que de verdad decide: agrupar por ruta

Esta es la diferencia entre una campaña que cumple y una que se queda a medias. Entre dos puntos alejados en hora pico puede haber más tiempo que entre dos ciudades pequeñas. Por eso:

- **Agrupa puntos cercanos en el mismo turno**, no los mejores puntos de la ciudad en el mismo día.
- **Un supervisor por zona**, nunca uno para toda la ciudad.
- **Equipo que viva cerca** de donde trabaja: menos retrasos y menos rotación.
- **Reporta por zona**, no sólo el total: comparar norte con sur dice mucho más que el promedio.

Cómo dimensionar el equipo está en [Cuántas promotoras necesita una activación](${L.cuantas}).

## El horario importa tanto como la zona

En una ciudad donde moverse cuesta tiempo, el turno mal elegido desperdicia la jornada entera:

- **Centros comerciales**: de viernes a domingo. Entre semana sólo rinde la franja del mediodía.
- **Corredores de oficinas**: entrada, almuerzo y salida. Nada más.
- **Zonas residenciales**: final de la tarde y sábado por la mañana.
- **Universidades**: entre clases, y las primeras semanas de semestre.

A eso se suma la lluvia, que en Bogotá no tiene temporada fija: cualquier activación a cielo abierto necesita una alternativa decidida de antemano, no resuelta el mismo día.

## Cómo elegir entre tantas opciones

Las mismas tres preguntas de siempre: dónde está el producto disponible, qué tiene que hacer la persona y cuánto presupuesto hay por punto. El método está en [Cómo elegir los puntos de una activación](${L.puntos}).

Y una advertencia propia de Bogotá: **es mejor cubrir bien dos zonas que mal seis**. La tentación de poner un punto en cada parte de la ciudad termina en una operación imposible de supervisar.

¿Tienes una campaña para Bogotá? [Cuéntanos el objetivo](${L.contacto}) y la zonificamos contigo.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿En qué zonas de Bogotá conviene activar una marca?',
        a: 'Centros comerciales para mecánicas con montaje y permanencia, corredores de oficinas para mecánicas de segundos y servicios, zonas residenciales para compra del hogar y cobertura por ruta, entornos universitarios para público joven, y plazas y parques para volumen con permiso de espacio público.',
      },
      {
        q: '¿Por qué importa tanto agrupar los puntos por ruta en Bogotá?',
        a: 'Porque el desplazamiento se paga en horas de equipo y entre dos puntos alejados en hora pico puede haber más tiempo que entre dos ciudades pequeñas. Agrupar puntos cercanos en el mismo turno es lo que hace que la jornada rinda.',
      },
      {
        q: '¿Cuándo funcionan los corredores de oficinas?',
        a: 'En tres franjas concretas: entrada, mediodía y salida. Fuera de ellas están prácticamente vacíos, así que planear una jornada completa ahí es desperdiciar horas de equipo. Piden mecánicas que se resuelvan en segundos.',
      },
      {
        q: '¿Cuántos supervisores hacen falta para una campaña en Bogotá?',
        a: 'Uno por zona, nunca uno para toda la ciudad. Con las distancias y el tráfico, una sola persona supervisando puntos repartidos por Bogotá no alcanza a estar en ninguno el tiempo suficiente.',
      },
      {
        q: '¿Es mejor cubrir muchas zonas o pocas?',
        a: 'Pocas y bien. La tentación de poner un punto en cada parte de la ciudad termina en una operación que no se puede supervisar y en resultados que no se pueden comparar. Cubrir bien dos zonas rinde más que cubrir mal seis.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'permisos-para-activaciones-en-espacio-publico',
    publishedAt: '2026-11-26',
    title: 'Permisos para activaciones en espacio público',
    excerpt:
      'Es el trámite que más campañas aplaza y el que menos se planea. Qué tipos de autorización existen, quién concede cada una, qué suele pedirse y con cuánta anticipación conviene empezar.',
    metaDescription:
      'Qué permisos necesita una activación de marca en espacio público, quién los concede, qué suele exigirse y con cuánta anticipación hay que tramitarlos.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'permisos para activaciones',
      'permiso espacio público',
      'activaciones BTL',
      'producción de eventos',
      'campañas BTL',
    ],
    body: `De todo lo que compone una activación, el permiso es lo único que puede cancelar una fecha ya pagada. Y es, casi siempre, lo último que se tramita.

Antes de nada, una advertencia que conviene tomarse en serio: **los requisitos concretos los fija cada autoridad y cambian**. Lo que sigue es cómo funciona el proceso y qué suele pedirse, para que sepas qué preguntar y con cuánto tiempo. Los documentos exactos, los plazos y las tarifas hay que confirmarlos siempre con la entidad que corresponda antes de cerrar fechas.

## Quién autoriza qué

**Espacio público de la ciudad** —calles, plazas, parques, andenes—: lo autoriza la administración municipal o distrital, normalmente a través del área encargada del espacio público o del uso temporal del mismo. Es el trámite más variable entre municipios.

**Espacio privado de uso público** —centros comerciales, estaciones, recintos feriales—: no interviene la alcaldía, sino la administración del lugar. Tiene su propio reglamento, calendario y tarifas, y suele ser más rápido pero más estricto en el montaje. Está en [Activaciones BTL en centros comerciales y ferias](${L.centros}).

**Interior de un establecimiento** —un supermercado, una tienda—: lo autoriza la cadena o el propietario. Las reglas de cadena están en [Activaciones BTL en supermercados](${L.retail}).

**Fiestas y eventos de municipio**: además de la alcaldía, suele haber una junta o comité organizador que decide quién entra y en qué condiciones.

## Qué se suele pedir

Varía, pero estos elementos aparecen casi siempre:

- **Descripción de la actividad**: qué se va a hacer, cuánta gente, qué se instala y qué dimensiones ocupa.
- **Fechas y horarios**, incluidos montaje y desmontaje.
- **Plano o esquema** de lo que se va a instalar.
- **Pólizas o seguros** de responsabilidad civil.
- **Datos del responsable** en terreno.
- **Manejo de residuos** y compromiso de dejar el espacio como estaba.
- **Requisitos adicionales** si hay sonido amplificado, estructuras de cierta altura, manipulación de alimentos o entrega de bebidas alcohólicas.

Esas últimas tres son las que más complican: una activación con tarima y sonido no se tramita igual que una mesa con muestras.

## Cuándo empezar

La regla práctica: **el permiso se tramita primero, antes que la producción**. No al revés.

Como referencia de planeación, no como promesa: cuenta semanas, no días, y más si la activación cae en temporada alta o en un municipio pequeño, donde los comités no se reúnen todos los días. En diciembre y en fechas de fiestas locales, los plazos se alargan.

Lo que nunca falla: preguntar a la autoridad **antes** de cerrar la fecha con el cliente.

## Quién debe tramitarlo

Debe quedar escrito en el contrato con la agencia. Es la ambigüedad que más campañas descarrila: cada parte da por hecho que lo hace la otra y, cuando alguien pregunta, ya no hay tiempo.

Lo normal es que lo gestione la agencia, que es quien conoce el proceso y tiene el histórico con los puntos. Está entre las preguntas de [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}), y el detalle operativo en [Producción de eventos BTL](${L.produccion}).

## Qué suele costar

Depende por completo del lugar y del tipo de actividad, así que aquí no hay cifras que sirvan de referencia general. Lo que sí conviene saber es **qué conceptos pueden aparecer**, para que ninguno sorprenda a mitad del trámite:

- La tarifa o derecho de uso del espacio, cuando el lugar la cobra.
- Las pólizas o seguros exigidos, que se contratan aparte.
- Los costos asociados a sonido, estructuras o manipulación de alimentos.
- Depósitos o garantías que se devuelven si el espacio queda como estaba.

Conviene pedir el detalle **por escrito y antes** de cerrar la fecha, porque algunos de estos conceptos no aparecen en la primera conversación.

## El plan B

Un permiso puede llegar tarde, llegar recortado o no llegar. Por eso toda activación en espacio público necesita una alternativa escrita: otra fecha, otra ubicación o una versión reducida que sí esté autorizada.

Es uno de los siete fallos que desarrollamos en [Errores que arruinan una activación BTL](${L.errores}).

¿Tienes una fecha pensada y dudas de si es viable? [Cuéntanos dónde y cuándo](${L.contacto}) y lo revisamos antes de que comprometas nada.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué permisos necesita una activación en la calle?',
        a: 'La autorización de uso temporal del espacio público, que concede la administración municipal o distrital, y permisos adicionales si hay sonido amplificado, estructuras, manipulación de alimentos o bebidas alcohólicas. Los requisitos exactos los fija cada autoridad y conviene confirmarlos antes de cerrar fechas.',
      },
      {
        q: '¿Quién autoriza una activación en un centro comercial?',
        a: 'La administración del centro comercial, no la alcaldía, porque es espacio privado de uso público. Tiene su propio reglamento, calendario de espacios y tarifas, y suele ser más rápido de gestionar pero más estricto en las condiciones de montaje.',
      },
      {
        q: '¿Qué documentos suelen pedir para autorizar una activación?',
        a: 'Descripción de la actividad con dimensiones de lo que se instala, fechas y horarios incluyendo montaje y desmontaje, un plano o esquema, pólizas de responsabilidad civil, datos del responsable en terreno y el compromiso de manejo de residuos.',
      },
      {
        q: '¿Con cuánta anticipación se tramita un permiso de activación?',
        a: 'Semanas, no días, y más en temporada alta o en municipios pequeños donde los comités no se reúnen a diario. La regla práctica es tramitar el permiso antes que la producción, y preguntar a la autoridad antes de cerrar la fecha con el cliente.',
      },
      {
        q: '¿Quién debe gestionar los permisos, la marca o la agencia?',
        a: 'Lo normal es que los gestione la agencia, que conoce el proceso y tiene histórico con los puntos, pero debe quedar escrito en el contrato. Esa ambigüedad —cada parte asume que lo hace la otra— es una de las causas más frecuentes de campañas aplazadas.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-en-municipios-de-antioquia',
    publishedAt: '2026-11-27',
    title: 'Activaciones BTL en municipios de Antioquia',
    excerpt:
      'Fuera de las capitales la activación cambia de reglas: manda la fiesta del pueblo, el permiso se habla distinto y la gente ya salió de casa con ganas. Cómo se opera el territorio, con casos reales.',
    metaDescription:
      'Cómo se hacen activaciones BTL en municipios de Antioquia: calendario de fiestas, permisos, logística de ruta y casos reales en Jericó, Yarumal y Venecia.',
    coverUrl: '/media/nichos/bebidas-alcoholicas.jpg',
    location: 'Antioquia',
    niches: ['bebidas', 'consumo-masivo'],
    keywords: [
      'activaciones en municipios',
      'activaciones BTL Antioquia',
      'marketing en territorio',
      'activaciones de marca',
      'agencia BTL Medellín',
    ],
    body: `Casi todas las marcas planean en capitales y casi ninguna baja al municipio. Y en categorías como bebidas, consumo masivo y telecomunicaciones, el municipio es donde está una parte grande del volumen y, sobre todo, donde la competencia no está haciendo nada.

Este es el terreno donde Contraste tiene casos propios publicados. Si buscas el panorama de la plaza principal, está en [Agencia BTL en Medellín](${L.medellin}).

## Qué cambia respecto a la ciudad

**Manda el calendario, no el mes.** En la ciudad el pico es el fin de semana y la quincena. En el municipio es la fiesta patronal, la feria o el evento del año, que concentra en tres días lo que en la ciudad pasa en un mes. Planear fuera de esas fechas es activar en un pueblo tranquilo.

**La gente ya salió predispuesta.** En un supermercado interrumpes una compra. En la plaza durante las fiestas, la marca entra en un plan que ya existía: pasarla bien. Es la diferencia entre molestar y sumar.

**El permiso se habla distinto.** Además de la alcaldía suele haber una junta o comité de la fiesta que decide quién entra. Lo general está en [Permisos para activaciones en espacio público](${L.permisos}).

**La logística es la mitad del trabajo.** Mover producción, material y equipo por carretera condiciona la hora de montaje y, con ella, todo el día.

**El equipo local vale doble.** Alguien conocido en el pueblo abre conversaciones que un desconocido tarda media hora en abrir. Está en [Promotoras e impulsadoras](${L.equipo}).

## Cómo se opera: por ruta

Un municipio suelto rara vez justifica mover una producción entera. Varios municipios cercanos en una ruta, sí: la producción se amortiza entre plazas y el equipo mejora en cada parada.

Es exactamente la lógica del [roadshow](${L.roadshow}), y es como se hizo **Chirimía de los que saben**: Licor Esencial de Ron Viejo de Caldas recorrió Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros con chirimía en vivo, promotoras, equipo logístico y una camioneta rodando con la marca. [Ver el recorrido](${L.chirimia}).

## Casos publicados

Todos en el [Instagram de Contraste](${L.ig}):

- **RONDANDOS en Jericó**: el parque principal convertido en plataforma de marca, con cantantes, animación y dinámicas. [Ver](${L.jerico})
- **Venecia**: artistas en vivo, degustación y montaje de branding para que la marca se sintiera, no sólo se viera. [Ver](${L.venecia})
- **Yarumal**: show con artistas populares para generar tráfico, impulso con promotoras y visibilidad dentro del establecimiento. [Ver](${L.yarumal})
- **La Tropa Aguardiente Amarillo**: activación móvil por calles y puntos de venta. [Ver](${L.tropa})

Hay siete descritos con detalle en [Activaciones de marca: ejemplos reales](${L.ejemplos}).

## Lo que hay que presupuestar de más

- **Transporte** de producción, material y a veces del equipo.
- **Alojamiento y alimentación** cuando la ruta no permite volver el mismo día.
- **Montaje desarmable**, pensado para armarse y desarmarse varias veces.
- **Material calculado para toda la ruta**, con reposición prevista.
- **Días de holgura**: en una ruta, un retraso arrastra todas las plazas siguientes.
- **Música o animación**, cuando la mecánica la pide. En territorio no es decoración.

El desglose general está en [Cuánto cuesta una activación BTL](${L.costos}).

## Cómo se mide

Igual que en ciudad, con una ventaja: como todas las plazas ejecutan lo mismo, **se pueden comparar entre sí**. Contactos efectivos, pruebas, datos capturados y conversaciones, plaza por plaza. Las diferencias entre municipios dicen más que el total, y son lo que permite decidir la ruta del año siguiente.

El criterio está en [Cómo medir una activación BTL](${L.metricas}) y lo resume el equipo en [este reel](${L.datos}): un evento sin medición es un gasto, no una inversión.

¿Tu marca se vende en los municipios y nunca ha estado ahí? [Cuéntanos la categoría](${L.contacto}) y miramos qué ruta tiene sentido.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué cambia al activar una marca en un municipio?',
        a: 'Manda el calendario local —la fiesta patronal o la feria concentran en días lo que en ciudad pasa en un mes—, la gente ya salió predispuesta a pasarla bien, el permiso se habla también con la junta de la fiesta, la logística de carretera condiciona el montaje y el equipo local abre puertas mucho más rápido.',
      },
      {
        q: '¿Conviene activar en un municipio suelto o en una ruta?',
        a: 'En ruta. Un municipio aislado rara vez justifica mover una producción completa; varios municipios cercanos amortizan esa producción entre plazas y, además, el equipo ejecuta mejor en cada parada al repetir la misma mecánica.',
      },
      {
        q: '¿Qué municipios de Antioquia ha trabajado Contraste?',
        a: 'Tiene activaciones publicadas en Jericó, Venecia, Yarumal, Donmatías, Santa Rosa de Osos y San Pedro de los Milagros, además de la operación en Medellín y el Valle de Aburrá.',
      },
      {
        q: '¿Qué hay que presupuestar de más en una activación en territorio?',
        a: 'Transporte de producción, material y equipo; alojamiento y alimentación si la ruta no permite volver el mismo día; un montaje desarmable que resista varios ciclos; material calculado para toda la ruta con reposición; días de holgura, porque un retraso arrastra las plazas siguientes; y música o animación cuando la mecánica la pide.',
      },
      {
        q: '¿Cómo se mide una activación en municipios?',
        a: 'Con contactos efectivos, pruebas de producto, datos capturados y conversaciones, medidos plaza por plaza. Como todas ejecutan la misma mecánica, las diferencias entre municipios son el dato más útil y lo que permite decidir la ruta del año siguiente.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'como-elegir-los-puntos-de-una-activacion',
    publishedAt: '2026-11-28',
    title: 'Cómo elegir los puntos de una activación',
    excerpt:
      'El 80 % del resultado se decide aquí, y casi siempre se decide por inercia o por el punto que alguien recuerda. Los criterios que sí predicen, en el orden en que hay que aplicarlos.',
    metaDescription:
      'Cómo elegir los puntos de una activación BTL: criterios de distribución, flujo, perfil, costo y capacidad de supervisión, en el orden correcto.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas', 'tecnologia'],
    keywords: [
      'cómo elegir los puntos de una activación',
      'puntos de activación',
      'campañas BTL',
      'trade marketing',
      'activaciones BTL',
    ],
    body: `La elección de los puntos decide más que la mecánica, más que el montaje y más que la creatividad. Y suele hacerse de la peor manera posible: con la lista de puntos de la campaña anterior, o con el que alguien del equipo conoce.

Hay criterios que sí predicen. Estos son, en el orden en que deben aplicarse, porque el orden importa tanto como la lista.

## 1. Distribución: ¿está el producto ahí?

Antes que nada. Activar donde el producto no está disponible es el error más caro de todos, y lo desarrollamos en [Errores que arruinan una activación BTL](${L.errores}).

Y no basta con que esté: tiene que haber **inventario suficiente para toda la campaña**. Agotarse el segundo día convierte la activación en publicidad para la competencia.

Este criterio elimina puntos. Los que no lo pasan, fuera, por buenos que parezcan.

## 2. Flujo: ¿cuánta gente pasa y cuándo?

No cuánta gente entra al establecimiento: cuánta pasa por donde va a estar el equipo. Son números distintos.

Y el flujo no es un dato único: es una curva por hora y por día. Un punto excelente un sábado al mediodía puede ser un desierto un martes por la mañana, y cuesta lo mismo.

Esto determina además cuánta gente hace falta, que está en [Cuántas promotoras necesita una activación](${L.cuantas}).

## 3. Perfil: ¿es tu gente?

Un flujo alto de público equivocado rinde menos que un flujo medio del correcto. Aquí conviene ser honesto: un punto con mucho tránsito pero sin capacidad de compra del producto infla los contactos y no mueve la venta.

## 4. Compatibilidad con la mecánica

Si la mecánica dura tres minutos, necesitas un sitio donde la gente pueda detenerse tres minutos. Un pasillo de supermercado no lo es; una plazoleta sí.

Este criterio descarta más puntos de los que parece, y descartarlos a tiempo evita campañas donde el equipo no consigue que nadie se pare. Las opciones están en [Mecánicas promocionales](${L.mecanicas}).

## 5. Costo por punto

Recién aquí entra el dinero. Un centro comercial puede costar lo que cinco puntos de barrio, y eso no lo hace peor ni mejor: lo hace distinto. La pregunta correcta no es cuánto cuesta el punto, sino **cuánto costará cada contacto efectivo en ese punto**.

Lo que mueve el presupuesto está en [Cuánto cuesta una activación BTL](${L.costos}).

## 6. Capacidad de supervisar

El último filtro y el más olvidado. Si no puedes supervisar un punto, no lo pongas: una activación sin supervisión es un gasto con fotos.

Esto limita la dispersión geográfica, sobre todo en ciudades grandes, como explicamos en [Dónde activar una marca en Bogotá](${L.dondeBogota}).

## La prueba de los puntos iguales

Si quieres medir de verdad, reserva algo: elige **puntos equivalentes que no vas a activar**. Mismo canal, mismo tamaño, mismo perfil.

Al final, comparar la rotación de los activados contra los no activados es la prueba más dura que existe en BTL, y vale más que cualquier reporte de contactos. Está en [Cómo medir una activación BTL](${L.metricas}).

Casi nadie lo hace y es gratis: sólo hay que decidirlo antes de empezar.

## Cuántos puntos

La tentación es maximizar. La realidad es que **es mejor cubrir bien pocos puntos que mal muchos**: con el mismo presupuesto repartido en el doble de puntos, cada uno recibe la mitad de equipo, la mitad de material y la mitad de supervisión.

Una regla práctica: si no puedes decir quién está en cada punto y quién lo supervisa, tienes demasiados.

El orden completo de la planeación está en [Campañas BTL: del brief a la calle](${L.campanas}), y las guías por ciudad en [Medellín](${L.dondeMedellin}) y [Bogotá](${L.dondeBogota}).

¿Tienes una lista de puntos heredada de la campaña anterior? [Pásanosla](${L.contacto}) y la revisamos con estos criterios.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se eligen los puntos de una activación?',
        a: 'Con seis criterios en orden: que el producto esté distribuido ahí con inventario para toda la campaña, el flujo de gente por hora frente al punto, si ese público es el adecuado, si el sitio permite la mecánica prevista, el costo por contacto efectivo y si se puede supervisar.',
      },
      {
        q: '¿Qué criterio va primero al elegir puntos?',
        a: 'La distribución. Si el producto no está disponible en ese punto, o no hay inventario para toda la campaña, el punto queda fuera por bueno que parezca. Activar donde no se puede comprar es el error más caro de una campaña.',
      },
      {
        q: '¿Es mejor activar en muchos puntos o en pocos?',
        a: 'En pocos y bien. Con el mismo presupuesto repartido en el doble de puntos, cada uno recibe la mitad de equipo, material y supervisión. Una regla práctica: si no puedes decir quién está en cada punto y quién lo supervisa, tienes demasiados.',
      },
      {
        q: '¿Qué son los puntos de control en una activación?',
        a: 'Puntos equivalentes en canal, tamaño y perfil que se dejan sin activar a propósito. Comparar la rotación de los activados contra ellos durante el mismo periodo es la prueba más dura que existe en BTL, y es gratis: sólo hay que decidirlo antes de empezar.',
      },
      {
        q: '¿Vale la pena un punto con mucho flujo pero público equivocado?',
        a: 'No. Un flujo alto de público que no compra la categoría infla el número de contactos y no mueve la venta, lo que además deja un reporte que parece bueno y no sirve para decidir nada. Rinde más un flujo medio del público correcto.',
      },
    ],
  },
]
