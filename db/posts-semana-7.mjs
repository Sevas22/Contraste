/**
 * Séptima tanda de artículos del blog (semana del 2026-11-03).
 *
 * Con 32 artículos publicados, las lagunas que quedaban no eran de concepto
 * sino de servicio: cosas que la agencia hace o puede hacer y que el blog no
 * nombraba en ninguna parte, cada una con búsqueda propia.
 *
 *   · Activación de patrocinio: marcas que ya pagaron el patrocinio y no lo
 *     activan. Es el artículo con más intención comercial de la tanda, porque
 *     quien lo busca ya tiene el presupuesto comprometido.
 *   · Endomarketing: la activación hacia adentro. Término con búsqueda propia
 *     y servicio que no aparecía en el sitio.
 *   · Visual merchandising: complementa «Material POP», que cubre las piezas
 *     pero no la exhibición.
 *   · Auditoría de punto de venta: el servicio que vuelve medible todo lo
 *     anterior y que se vende solo cuando se explica.
 *   · Regreso a clases: estacional. Enero se cotiza en noviembre, igual que
 *     diciembre se cotizaba en octubre.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 32 artículos ya en vivo.
 *
 * Reglas de redacción (iguales a las seis tandas anteriores):
 *   · Cada cifra va atribuida a quien la dijo. Nada de precios inventados.
 *   · Los casos dicen lo que dice su publicación, ni un resultado de más.
 *   · No se nombran marcas que no estén en el muro de clientes o en un caso
 *     publicado. En particular, no se cita ningún patrocinio concreto porque
 *     no hay ninguno publicado.
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=7 --escribir --publicar
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
  bogota: '/blog/agencia-btl-en-bogota',
  retail: '/blog/activaciones-btl-en-supermercados-y-retail',
  stands: '/blog/stands-para-ferias-que-funcionan',
  embajadores: '/blog/embajadores-de-marca-brand-ambassador',
  vsEventos: '/blog/agencia-btl-o-agencia-de-eventos',
  // Blog de esta tanda
  patrocinio: '/blog/activacion-de-patrocinio',
  endomarketing: '/blog/endomarketing-activaciones-hacia-adentro',
  merchandising: '/blog/visual-merchandising-en-punto-de-venta',
  auditoria: '/blog/auditoria-de-punto-de-venta',
  regreso: '/blog/activaciones-btl-regreso-a-clases',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activacion-de-patrocinio',
    publishedAt: '2026-11-03',
    title: 'Activación de patrocinio: cómo rentabilizarlo',
    excerpt:
      'Pagar el patrocinio es la mitad del gasto y ninguna de la ganancia. Lo que decide si sirvió es lo que la marca hace dentro del evento. Qué incluye activar un patrocinio y cómo se mide.',
    metaDescription:
      'Qué es la activación de un patrocinio, por qué el logo no basta, qué se negocia además del derecho de marca y cómo medir si el patrocinio se rentabilizó.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Colombia',
    niches: ['bebidas', 'consumo-masivo', 'tecnologia'],
    keywords: [
      'activación de patrocinio',
      'patrocinio de marca',
      'activaciones de marca',
      'marketing experiencial',
      'activaciones BTL',
    ],
    body: `Una marca paga el patrocinio de un festival, un torneo o una feria. Pone su logo en el pendón, en la camiseta y en la pantalla. Y se acabó. Ese es el escenario más común y también el más caro, porque el derecho de patrocinio suele ser sólo la entrada: lo que produce resultados es lo que la marca hace una vez dentro.

Eso es la **activación de patrocinio**: convertir un derecho de presencia en una experiencia que la gente recuerde. Si vienes de más atrás, en [Qué es BTL](${L.queEsBtl}) está el marco general y en [Marketing experiencial](${L.experiencial}) el enfoque.

## Por qué el logo no basta

Porque la gente no fue por ti. Fue por el partido, por la banda, por la feria. Tu logo compite con todo lo que está pasando, y en un entorno saturado de marcas el reconocimiento pasivo es bajísimo.

Hay tres cosas que un logo no puede hacer y una activación sí:

- **Que prueben el producto.** La diferencia entre que alguien te vea y que alguien te pruebe es toda la diferencia. Está en [Degustaciones y sampling](${L.degustaciones}).
- **Que te dejen sus datos.** Un patrocinio sin captura de contactos no deja nada aprovechable después.
- **Que se lleven algo que contar.** Una foto, un objeto, una experiencia. Eso sobrevive al evento.

## Qué se negocia además del derecho

Esta es la parte que casi nadie pide y que suele estar disponible:

- **Espacio físico propio** dentro del recinto, no sólo presencia en la cartelería. Cómo se diseña está en [Stands para ferias](${L.stands}).
- **Acceso a la base de asistentes**, cuando el organizador la tiene y lo permite.
- **Mecánica dentro de la programación**: un momento en el escenario, una dinámica entre tiempos, una mención con una acción detrás.
- **Derechos de contenido**: poder grabar y usar el material después, que es lo que convierte un día en meses de contenido.
- **Exclusividad de categoría**, para no compartir visibilidad con un competidor directo.

Si el contrato ya está firmado sin nada de esto, aún queda margen: casi siempre se puede sumar presencia operativa aunque los derechos estén cerrados.

## Cómo se arma la activación

1. **Definir qué pasa dentro.** Una mecánica que se entienda en segundos y que tenga que ver con la marca, no un juego genérico con un logo pegado.
2. **Elegir el punto dentro del recinto.** Entrada, zona de descanso, barra, fila. Cada uno tiene un estado de ánimo distinto y una disponibilidad de atención distinta.
3. **Poner equipo entrenado.** En un evento la gente está distraída, y abordar bien ahí es más difícil que en un supermercado. Está en [Promotoras e impulsadoras](${L.equipo}).
4. **Capturar.** Datos con consentimiento, material de gente real participando, y lo que la gente preguntó.
5. **Planear el después.** Quién contacta y cuándo, que es donde se pierde la mitad del valor. En [Del lead a la venta](${L.leads}).

El detalle de montaje y logística está en [Producción de eventos BTL](${L.produccion}).

## Cómo se mide si el patrocinio valió

No por asistentes al evento: ese es un dato del organizador, no tuyo. Lo que decide:

- **Contactos efectivos** en tu espacio, no gente que pasó cerca.
- **Pruebas de producto** entregadas.
- **Datos capturados** y qué se hizo con ellos.
- **Costo por contacto efectivo**, que es lo que permite comparar este patrocinio con el del año pasado o con otra inversión.
- **Contenido utilizable** generado, que tiene un valor real y casi nunca se contabiliza.

El criterio para separar lo que decide de lo que decora está en [Cómo medir una activación BTL](${L.metricas}).

## El error que se repite

Gastar el 90 % del presupuesto en el derecho y dejar el 10 % para la activación. Es mejor un patrocinio más pequeño bien activado que uno grande con un logo colgado. Un ejemplo de marca presente en algo que la gente ya quería hacer es [este partido con leyendas](${L.futbol}).

¿Tienes un patrocinio comprometido y no sabes qué hacer dentro? [Cuéntanos cuál es](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es la activación de un patrocinio?',
        a: 'Es lo que la marca hace dentro del evento que patrocina para convertir un derecho de presencia en una experiencia: un espacio propio, una mecánica, prueba de producto y captura de contactos. El derecho de patrocinio es la entrada; la activación es lo que produce resultados.',
      },
      {
        q: '¿Por qué no basta con poner el logo en un evento patrocinado?',
        a: 'Porque la gente no fue por la marca y el logo compite con todo lo que ocurre alrededor. Un logo no consigue que prueben el producto, no captura contactos y no deja nada que la persona pueda contar después. El reconocimiento pasivo en entornos saturados es muy bajo.',
      },
      {
        q: '¿Qué se puede negociar además del derecho de patrocinio?',
        a: 'Espacio físico propio dentro del recinto, acceso a la base de asistentes cuando el organizador lo permite, una mecánica dentro de la programación, derechos para grabar y usar el contenido después, y exclusividad de categoría para no compartir visibilidad con un competidor.',
      },
      {
        q: '¿Qué presupuesto conviene dejar para activar un patrocinio?',
        a: 'El error habitual es gastar casi todo en el derecho y dejar una fracción para la activación. Rinde más un patrocinio de menor tamaño bien activado que uno grande con sólo presencia de marca, porque lo que produce contactos y pruebas es lo que ocurre en el espacio propio.',
      },
      {
        q: '¿Cómo se mide si un patrocinio valió la pena?',
        a: 'Con contactos efectivos en el espacio de la marca, pruebas de producto entregadas, datos capturados y lo que se hizo con ellos, costo por contacto efectivo para poder comparar con otras inversiones, y el contenido utilizable que generó. Los asistentes al evento son un dato del organizador, no un resultado de la marca.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'endomarketing-activaciones-hacia-adentro',
    publishedAt: '2026-11-04',
    title: 'Endomarketing: activaciones de marca hacia adentro',
    excerpt:
      'La fuerza de ventas y el equipo de planta son el primer público de una marca, y casi siempre el peor informado. Qué es el endomarketing, cuándo hace falta y qué tiene en común con una activación de calle.',
    metaDescription:
      'Qué es el endomarketing, en qué se diferencia de la comunicación interna y cómo se diseñan activaciones de marca para empleados y fuerza de ventas.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'tecnologia', 'inmobiliario'],
    keywords: [
      'endomarketing',
      'marketing interno',
      'activaciones para empleados',
      'activaciones de marca',
      'marketing experiencial',
    ],
    body: `Una marca lanza un producto, monta la campaña, sale a la calle. Y el vendedor que lo tiene que ofrecer se enteró por un correo. El **endomarketing** es tratar al equipo propio como lo que es: el primer público de la marca, y el que más veces va a tener que explicarla.

No es comunicación interna. La comunicación interna informa; el endomarketing busca que el equipo **viva** la marca con la misma lógica de una activación de calle, que es lo que explicamos en [Marketing experiencial](${L.experiencial}).

## Cuándo hace falta

- **Antes de un lanzamiento.** Si la fuerza de ventas no conoce el producto, la campaña empieza coja. Está desarrollado en [Lanzamiento de producto](${L.lanzamientoPost}).
- **Cuando la marca cambia.** Nuevo posicionamiento, nueva identidad, nueva promesa: si adentro no se entiende, afuera no se sostiene.
- **En operaciones con mucha rotación.** Punto de venta, call center, planta: donde entra gente nueva cada mes y el mensaje se diluye.
- **Cuando hay distancia entre áreas.** El equipo comercial sabe una cosa y el de producto otra, y el cliente escucha las dos.

## Qué lo diferencia de una reunión

Una reunión informa. Una activación interna hace que pase algo:

| | Comunicación interna | Endomarketing |
|---|---|---|
| Formato | Correo, circular, reunión | Experiencia con participación |
| Qué deja | Información | Entendimiento y recuerdo |
| Quién habla | La empresa | La gente también |
| Cómo se mide | Apertura, asistencia | Qué sabe y qué hace el equipo después |

## Cómo se diseña

Igual que una activación de calle, con la ventaja de que el público es cautivo y está identificado:

1. **Un objetivo concreto.** No «que conozcan la marca», sino «que cualquiera de los 40 vendedores pueda explicar las tres razones por las que este producto es distinto».
2. **Una mecánica con participación.** Probar el producto, competir, resolver casos reales de cliente. Lo que no se hace, no se recuerda.
3. **El entorno.** Una activación montada en la planta o en la sala de ventas pesa más que un auditorio alquilado, porque ocurre donde se trabaja.
4. **Material que sobreviva al día.** Algo que quede en el puesto de trabajo y recuerde el mensaje. Es la misma lógica del [material POP](${L.pop}), aplicada adentro.
5. **Medición.** Antes y después: qué sabían y qué saben. Y sobre todo, si cambió algo en la operación.

El orden completo de una campaña, que aplica igual aquí, está en [Campañas BTL: del brief a la calle](${L.campanas}).

## Qué se suele medir mal

Asistencia y satisfacción. Las dos salen siempre bien y no dicen nada: es el mismo problema de las métricas de vanidad que explicamos en [Cómo medir una activación BTL](${L.metricas}).

Lo que sirve:

- **Conocimiento, medido antes y después** con las mismas preguntas.
- **Uso real**: si el argumentario aparece en las conversaciones con cliente.
- **Indicadores de la operación** que el endomarketing pretendía mover: rotación del equipo, tiempo de formación de los nuevos, cumplimiento de protocolo en punto.

## Por qué lo hace una agencia BTL y no sólo recursos humanos

Porque el trabajo es el mismo que una activación: definir una mecánica, producir un montaje, poner gente entrenada, ejecutar y medir. Lo que cambia es el público. Una agencia que monta activaciones en calle tiene exactamente esas capacidades, descritas en [Qué hace una agencia BTL](${L.queHace}) y en [Producción de eventos BTL](${L.produccion}).

Lo ideal es que el equipo interno reciba el mismo nivel de producción que el cliente final. Si la activación de afuera es buena y la de adentro es una presentación, el equipo entiende perfectamente dónde está la prioridad.

¿Tienes un lanzamiento y un equipo que todavía no lo conoce? [Escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el endomarketing?',
        a: 'Es aplicar la lógica de una activación de marca hacia adentro de la empresa: diseñar una experiencia con participación para que el equipo propio entienda y viva la marca, en lugar de limitarse a informarle por correo o en una reunión.',
      },
      {
        q: '¿Cuál es la diferencia entre endomarketing y comunicación interna?',
        a: 'La comunicación interna informa, con correos, circulares y reuniones, y se mide por apertura y asistencia. El endomarketing busca entendimiento y recuerdo a través de la participación, y se mide por lo que el equipo sabe y hace después.',
      },
      {
        q: '¿Cuándo hace falta una activación de endomarketing?',
        a: 'Antes de un lanzamiento, para que la fuerza de ventas conozca el producto; cuando la marca cambia de posicionamiento o identidad; en operaciones con mucha rotación, donde el mensaje se diluye; y cuando hay distancia entre lo que sabe el área comercial y lo que sabe producto.',
      },
      {
        q: '¿Cómo se mide una campaña de endomarketing?',
        a: 'Midiendo conocimiento antes y después con las mismas preguntas, comprobando si el argumentario aparece de verdad en las conversaciones con cliente, y mirando los indicadores de operación que se pretendía mover. Asistencia y satisfacción son métricas de vanidad: siempre salen bien.',
      },
      {
        q: '¿Por qué contratar una agencia BTL para endomarketing?',
        a: 'Porque el trabajo es el mismo que el de una activación: definir una mecánica, producir un montaje, poner equipo entrenado, ejecutar y medir. Sólo cambia el público. Una agencia que opera en calle ya tiene esas capacidades montadas.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'visual-merchandising-en-punto-de-venta',
    publishedAt: '2026-11-05',
    title: 'Visual merchandising: que el producto se vea',
    excerpt:
      'La mayoría de las decisiones de compra se toman frente al lineal, y ahí no hay quien argumente. Qué es el visual merchandising, qué reglas sigue y en qué se diferencia del material POP.',
    metaDescription:
      'Qué es el visual merchandising en punto de venta, qué reglas de exhibición sigue, en qué se diferencia del material POP y cómo se mide su efecto.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'visual merchandising',
      'exhibición en punto de venta',
      'material POP',
      'trade marketing',
      'activaciones BTL',
    ],
    body: `Frente al lineal no hay promotor, no hay anuncio y no hay tiempo. Hay una persona con prisa, varias marcas a la vista y unos segundos. El **visual merchandising** es el trabajo de hacer que, en esos segundos, el producto se vea, se entienda y se coja.

Se confunde con el material POP y no son lo mismo. El [material POP](${L.pop}) son las piezas: exhibidores, cenefas, habladores. El visual merchandising es **la decisión de dónde va cada cosa y por qué**. Las piezas sin criterio son decoración; el criterio sin piezas no se ejecuta.

## Las reglas que de verdad importan

**La altura manda.** Lo que está a la altura de los ojos se vende; lo que está a ras de suelo, no. Por eso esa ubicación se negocia y se paga.

**El bloque gana al disperso.** Un producto agrupado ocupando un bloque vertical se ve desde lejos. El mismo producto repartido en el lineal desaparece.

**El orden cuenta una historia.** De menor a mayor tamaño, por variedad, por ocasión de uso. Un lineal sin lógica obliga a buscar, y quien busca mucho se va.

**La cara del producto se respeta.** El envase está diseñado para verse de frente. Medio lineal con productos girados es media inversión en empaque tirada.

**Los espacios vacíos se leen.** Un hueco dice «se agotó» o dice «nadie atiende esto», y las dos cosas son malas.

## En qué se diferencia del trade marketing

El trade marketing es la estrategia completa de canal: qué producto, a qué precio, con qué promoción y en qué puntos. Lo desarrollamos en [Trade marketing en canal tradicional](${L.tat}) y, para cadena, en [Activaciones BTL en supermercados](${L.retail}).

El visual merchandising es una pieza de eso: cómo se ve el producto una vez que ya está ahí.

## Qué cambia según el canal

**Retail moderno.** Hay planogramas, reglas de la cadena y espacios negociados. El margen de maniobra está en lo que se consigue negociar y en ejecutarlo bien.

**Canal tradicional.** No hay planograma: hay un tendero con poco espacio y muchas marcas pidiéndoselo. Aquí gana quien facilita las cosas: material que quepa, que se instale en dos minutos y que al tendero le sirva.

**Punto propio o sala de ventas.** Control total, y por eso menos excusas. En inmobiliario esto es determinante y está en [Sala de ventas](${L.sala}).

## Cuando el espacio es mínimo

La mayoría de los manuales de exhibición están escritos para un lineal amplio, y la realidad de muchos puntos es medio metro. Ahí sirven otras reglas:

- **Elegir una sola referencia** para defender bien, en vez de meter todo el portafolio y que no se vea ninguno.
- **Jugar con la altura, no con el ancho.** Si no hay espacio a los lados, se construye hacia arriba.
- **Usar lo que el punto ya tiene.** La nevera, la caja, el mostrador: ubicaciones con más tráfico que cualquier estante.
- **Material pequeño y fácil de instalar.** Si al tendero le estorba o le lleva tiempo, acaba en la bodega por mucho que haya aceptado ponerlo.

## Por qué se ejecuta mal casi siempre

No por falta de criterio, sino por falta de verificación. Se define una exhibición perfecta en una presentación, se envía el material y nadie vuelve a mirar. A las dos semanas el exhibidor está en la bodega, la cenefa se cayó y el producto volvió al estante de abajo.

Por eso el visual merchandising sin [auditoría de punto de venta](${L.auditoria}) es una intención, no un trabajo.

## Cómo se mide

Con dos niveles:

- **Cumplimiento**: qué porcentaje de los puntos tiene la exhibición como se definió, con evidencia fotográfica fechada y por punto.
- **Efecto**: la rotación de los puntos con exhibición correcta frente a puntos equivalentes sin ella, en el mismo periodo.

Ese segundo cruce es el que convierte el visual merchandising en una inversión defendible. El marco completo está en [Estrategias BTL](${L.estrategias}) y el criterio de qué contar, en [Cómo medir una activación BTL](${L.metricas}).

Si quieres saber cómo se ve hoy tu producto en los puntos donde está, [escríbenos](${L.contacto}) y lo revisamos. También puedes ver cómo se aplica a [consumo masivo](${L.consumo}) y a [bebidas](${L.bebidas}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es el visual merchandising?',
        a: 'Es el trabajo de decidir cómo se exhibe un producto en el punto de venta para que se vea, se entienda y se coja en los pocos segundos que dura la decisión frente al lineal: altura, agrupación, orden, orientación del envase y ausencia de huecos.',
      },
      {
        q: '¿Cuál es la diferencia entre visual merchandising y material POP?',
        a: 'El material POP son las piezas físicas —exhibidores, cenefas, habladores, stoppers—. El visual merchandising es el criterio de dónde va cada cosa y por qué. Las piezas sin criterio son decoración, y el criterio sin piezas no se ejecuta.',
      },
      {
        q: '¿Qué reglas básicas sigue una buena exhibición?',
        a: 'Ubicar el producto a la altura de los ojos, agruparlo en bloque en vez de dispersarlo, ordenar el lineal con una lógica que el comprador entienda, respetar la cara frontal del envase y no dejar espacios vacíos, que se leen como agotado o como abandono.',
      },
      {
        q: '¿Por qué una exhibición definida no se ejecuta en el punto?',
        a: 'Porque casi nunca se verifica. Se define la exhibición, se envía el material y nadie vuelve a mirar: a las pocas semanas el exhibidor está guardado, las piezas se cayeron y el producto volvió a su estante. Sin auditoría de punto de venta es una intención, no un trabajo.',
      },
      {
        q: '¿Cómo se mide el visual merchandising?',
        a: 'En dos niveles: cumplimiento, que es qué porcentaje de puntos tiene la exhibición como se definió con evidencia fotográfica fechada; y efecto, que es comparar la rotación de los puntos bien exhibidos con la de puntos equivalentes sin esa exhibición en el mismo periodo.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'auditoria-de-punto-de-venta',
    publishedAt: '2026-11-06',
    title: 'Auditoría de punto de venta: qué se revisa',
    excerpt:
      'Lo que la marca cree que pasa en el punto y lo que pasa de verdad son dos cosas distintas. Qué revisa una auditoría, cómo se hace para que sirva y qué decisiones permite tomar.',
    metaDescription:
      'Qué revisa una auditoría de punto de venta: exhibición, precio, material, agotados y ejecución. Cómo se hace, con qué frecuencia y qué decisiones permite.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'auditoría de punto de venta',
      'trade marketing',
      'material POP',
      'ejecución en punto de venta',
      'medición de activaciones',
    ],
    body: `Toda marca tiene una versión de lo que ocurre en sus puntos de venta: el producto está, se ve, el precio es el acordado y el material está instalado. La **auditoría de punto de venta** existe porque esa versión y la realidad casi nunca coinciden, y porque las decisiones se toman con la primera.

No es desconfianza del canal: es que nadie puede estar en trescientos puntos a la vez.

## Qué se revisa

**Presencia.** Si el producto está. Parece obvio y es el hallazgo más frecuente: referencias que la marca da por distribuidas y que llevan semanas agotadas en el punto.

**Exhibición.** Si está donde se acordó, a la altura acordada y con la cara del envase al frente. Las reglas están en [Visual merchandising](${L.merchandising}).

**Precio.** Si el precio al público es el pactado. Una referencia mal precificada mata la promoción que la marca está pagando.

**Material POP.** Si lo que se envió está instalado, en qué estado y desde cuándo. Es el punto donde más inversión se pierde, y lo desarrollamos en [Material POP](${L.pop}).

**Competencia.** Qué está haciendo al lado: precio, exhibición, promoción, material. Es la mitad del valor de una auditoría y la que más se olvida.

**La ejecución de la activación**, cuando la hay: si el promotor está, a qué hora llegó y si la mecánica se está haciendo como se definió.

## Cómo se hace para que sirva

Una auditoría mal hecha produce un informe bonito que nadie usa. Cuatro condiciones:

1. **Un formulario cerrado.** Las mismas preguntas en todos los puntos, con respuestas comparables. Si cada auditor escribe lo que le parece, no hay dato.
2. **Evidencia obligatoria.** Foto con fecha, hora y ubicación. Sin eso, el informe es una opinión.
3. **Una muestra que represente.** No sólo los puntos buenos ni sólo los de la ciudad principal. El sesgo de muestra es lo que hace que los informes siempre salgan bien.
4. **Frecuencia fija.** Una auditoría aislada es una foto; una serie es una tendencia, y las decisiones se toman con tendencias.

## Qué decisiones permite tomar

Esto es lo que justifica el gasto:

- **Dónde reponer material** y dónde no vale la pena volver a enviarlo.
- **Qué puntos merecen activación** y cuáles son una pérdida de equipo.
- **Dónde hay un problema de distribución** disfrazado de problema de demanda.
- **Qué rutas del equipo de calle están funcionando**, que conecta con lo de [Trade marketing en canal tradicional](${L.tat}).
- **Si la promoción llegó al consumidor** o se quedó en el camino.

## Quién la hace

Puede hacerla el propio equipo comercial, con un problema: audita su propio trabajo. Por eso lo habitual es que la haga un tercero, con el mismo formulario y sin interés en el resultado.

En operaciones grandes se combina: el equipo comercial reporta en cada visita y una auditoría externa verifica una muestra. Las diferencias entre las dos fuentes son, por sí solas, un dato muy útil.

## Cómo se conecta con el resto

La auditoría es lo que vuelve medible todo lo demás. Sin ella, el material POP es un envío, la exhibición es una intención y la activación es un gasto. Con ella, las tres se convierten en algo que se puede comparar entre puntos y entre periodos, que es de lo que hablamos en [Cómo medir una activación BTL](${L.metricas}) y en [Estrategias BTL](${L.estrategias}).

Y hay un efecto que no aparece en ningún informe: cuando el canal sabe que hay auditoría, la ejecución mejora sola.

¿Quieres saber qué está pasando de verdad en tus puntos? [Escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué es una auditoría de punto de venta?',
        a: 'Es la verificación en terreno de lo que realmente ocurre en los puntos donde está el producto: si está presente, cómo se exhibe, a qué precio, qué material está instalado y qué hace la competencia. Existe porque la versión que tiene la marca y la realidad casi nunca coinciden.',
      },
      {
        q: '¿Qué se revisa en una auditoría de punto de venta?',
        a: 'Presencia del producto y agotados, exhibición y ubicación, precio al público frente al pactado, estado e instalación del material POP, actividad de la competencia y, cuando hay activación, si el promotor está y si la mecánica se ejecuta como se definió.',
      },
      {
        q: '¿Cómo se hace una auditoría para que sirva?',
        a: 'Con un formulario cerrado e idéntico en todos los puntos para que las respuestas sean comparables, evidencia fotográfica obligatoria con fecha y ubicación, una muestra que represente de verdad la distribución y no sólo los puntos buenos, y una frecuencia fija que permita ver tendencias.',
      },
      {
        q: '¿Quién debe hacer la auditoría de punto de venta?',
        a: 'Lo habitual es un tercero, porque el equipo comercial auditaría su propio trabajo. En operaciones grandes se combinan las dos fuentes: el equipo reporta en cada visita y una auditoría externa verifica una muestra. Las diferencias entre ambas son por sí solas un dato útil.',
      },
      {
        q: '¿Qué decisiones permite tomar una auditoría?',
        a: 'Dónde reponer material y dónde no, qué puntos merecen una activación y cuáles no, dónde hay un problema de distribución disfrazado de falta de demanda, qué rutas del equipo de calle funcionan y si la promoción llegó de verdad al consumidor.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-regreso-a-clases',
    publishedAt: '2026-11-07',
    title: 'Activaciones BTL para el regreso a clases',
    excerpt:
      'La temporada escolar concentra en pocas semanas la compra de categorías enteras, y quien decide no siempre es quien paga. Qué cambia al activar en esta temporada y cuándo hay que tenerlo cerrado.',
    metaDescription:
      'Cómo se planean las activaciones BTL para el regreso a clases: calendario, canales, mecánicas que funcionan y qué hay que cerrar en noviembre.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'tecnologia'],
    keywords: [
      'activaciones BTL',
      'regreso a clases',
      'temporada escolar',
      'trade marketing',
      'activaciones de marca',
    ],
    body: `El regreso a clases es, después de diciembre, la temporada que más concentra compra en Colombia. Papelería, uniformes, calzado, tecnología, alimentación, transporte: categorías enteras se juegan el año en unas pocas semanas.

Y tiene una particularidad que ninguna otra temporada comparte: **quien usa el producto, quien lo elige y quien lo paga suelen ser tres personas distintas**, o al menos dos. Eso cambia la mecánica entera.

Si buscas el marco de planeación general, está en [Campañas BTL: del brief a la calle](${L.campanas}); la lógica de temporada alta, en [Activaciones BTL de fin de año](${L.finDeAno}).

## Los tres públicos

**El niño o el joven elige**, sobre todo en categorías con marca visible: morral, calzado, tecnología, snacks. Decide por preferencia, no por precio.

**El adulto paga** y tiene una lista, un presupuesto y poca paciencia. Decide por precio, durabilidad y por no tener que volver.

**El colegio condiciona**, con listas de útiles, uniformes obligatorios y requisitos que acotan la decisión antes de que nadie entre a la tienda.

Una mecánica que entusiasma al niño pero no le da ningún argumento al adulto deja la venta a medias. Una que sólo habla de precio pierde frente a la marca que el niño quiere.

## El calendario

En Colombia hay dos calendarios escolares y eso duplica la ventana, pero la concentración sigue siendo alta:

**Noviembre.** Se define objetivo y mecánica, y se negocian los espacios en retail. Los buenos puntos de temporada escolar se asignan ahora, igual que pasa con diciembre. Está explicado en [Activaciones BTL en supermercados](${L.retail}).

**Diciembre.** Producción y material. Nada se produce bien en enero.

**Enero.** El pico del calendario A. Las dos primeras semanas concentran el grueso.

**Mitad de año.** La ventana del calendario B, más pequeña pero con menos competencia por el espacio.

Y una advertencia que vale la pena repetir: en diciembre todo se encarece y la disponibilidad de personal y producción cae. Lo que se vaya a producir para enero se cierra antes.

## Qué funciona en esta temporada

- **Mecánicas que resuelven la lista.** Lo que le ahorre tiempo al adulto gana. Combos, señalización clara, personal que sepa orientar.
- **Prueba y demostración** para lo que se elige por preferencia: que el niño lo toque, se lo pruebe, lo use. Es [marketing experiencial](${L.experiencial}) puro.
- **Visibilidad fuerte en el punto**, porque la temporada satura el lineal. Las reglas están en [Visual merchandising](${L.merchandising}).
- **Cobertura en canal tradicional**, que en papelería y alimentación pesa mucho. Ver [Trade marketing en canal tradicional](${L.tat}).

## Dónde activar

La temporada escolar se reparte entre canales que no se parecen entre sí, y la mecánica tiene que cambiar en cada uno:

- **Grandes superficies**, donde se hace la compra grande de la lista y la familia va completa. Es el canal de mayor volumen y el que antes se agota en espacios.
- **Papelerías y misceláneas de barrio**, que resuelven lo que faltó y lo que se rompió en febrero. Cobertura por ruta, como explicamos en [Trade marketing en canal tradicional](${L.tat}).
- **Centros comerciales**, para las categorías que se eligen por preferencia: calzado, tecnología, morrales. Ahí la mecánica puede ser más larga porque la gente va con otro ánimo. Está en [Activaciones BTL en centros comerciales y ferias](${L.centros}).
- **Alrededores de colegios**, en las primeras semanas, para categorías de consumo diario.

## Qué no funciona

Dinámicas largas. En temporada escolar las familias van con lista, con niños cansados y con prisa. Cualquier cosa que exija más de un minuto se rechaza.

Y activar sin inventario asegurado para toda la ventana. En una temporada tan concentrada, agotarse la primera semana es perder la temporada entera, no un día de ventas. La lógica está en [Lanzamiento de producto](${L.lanzamientoPost}).

## Cómo se mide

Con lo de siempre —contactos efectivos, pruebas, datos capturados, costo por contacto— y un indicador que en esta temporada es especialmente claro: **la rotación en los puntos activados frente a puntos equivalentes sin activación**, porque la ventana es corta y el efecto se ve limpio.

El criterio de qué contar está en [Cómo medir una activación BTL](${L.metricas}).

Si la temporada escolar es parte de tu año, noviembre es el mes para decidirlo. [Escríbenos](${L.contacto}) y lo armamos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuándo se planea una activación para el regreso a clases?',
        a: 'En noviembre se define objetivo y mecánica y se negocian los espacios en retail, que se asignan con la misma anticipación que los de diciembre. En diciembre va la producción y el material. En enero se ejecuta el pico del calendario A, concentrado en las dos primeras semanas.',
      },
      {
        q: '¿Qué hace distinta a la temporada escolar de otras temporadas?',
        a: 'Que quien usa el producto, quien lo elige y quien lo paga suelen ser personas distintas. El niño o joven elige por preferencia, el adulto paga y decide por precio y durabilidad, y el colegio condiciona con listas y uniformes obligatorios antes de que nadie entre a la tienda.',
      },
      {
        q: '¿Qué mecánicas funcionan en el regreso a clases?',
        a: 'Las que resuelven la lista y ahorran tiempo al adulto, como combos, señalización clara y personal que oriente; y la prueba o demostración para las categorías que el niño elige por preferencia. Más una visibilidad fuerte en el punto, porque la temporada satura el lineal.',
      },
      {
        q: '¿Qué errores se repiten en las campañas de temporada escolar?',
        a: 'Montar dinámicas largas, cuando las familias van con lista, con niños cansados y con prisa; y activar sin inventario asegurado para toda la ventana, porque en una temporada tan concentrada agotarse la primera semana significa perder la temporada entera.',
      },
      {
        q: '¿Cómo se mide una activación de regreso a clases?',
        a: 'Con contactos efectivos, pruebas de producto, datos capturados y costo por contacto, y sobre todo comparando la rotación de los puntos activados con la de puntos equivalentes sin activación. Como la ventana es corta, el efecto se ve especialmente limpio.',
      },
    ],
  },
]
