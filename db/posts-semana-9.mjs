/**
 * Novena tanda de artículos del blog (semana del 2026-11-17).
 *
 * CAMBIO DE ESTRATEGIA DE KEYWORDS, medido el 2026-11-17 en Google desde
 * Colombia:
 *
 *   · «activaciones de marca»      → no aparece en el top 20
 *   · «publicidad btl»             → no aparece en el top 20
 *   · «activaciones btl medellín»  → no aparece en el top 20
 *   · «agencia btl medellín»       → no aparece (medido el 2026-10-21)
 *   · «btl que es»                 → puesto 5, bajo Wikipedia y HubSpot
 *
 * O sea: el sitio sólo entra en consultas informativas. En las comerciales
 * de cabeza compite contra dominios con años de antigüedad y backlinks, y
 * con el perfil actual no se ganan por mucho que se escriba sobre ellas.
 *
 * Así que esta tanda deja de perseguir cabezas y va a **long tail
 * transaccional**: consultas de cuatro o más palabras, con menos volumen,
 * mucha menos competencia y mucha más intención de contratar. Son las que un
 * dominio joven sí puede ganar, y las que traen a alguien que ya tiene
 * presupuesto.
 *
 *   · Cómo contratar una agencia BTL: el proceso entero, de necesidad a
 *     firma. Complementa «Qué pedirle a una agencia antes de firmar», que
 *     son las preguntas, no el proceso.
 *   · Leer una cotización: la duda concreta de quien ya tiene propuestas
 *     sobre la mesa y no sabe compararlas.
 *   · Cuántas promotoras: pregunta literal, con respuesta numérica, que hoy
 *     nadie responde bien en español.
 *   · Alimentos: sector de alto volumen sin cubrir en el sitio.
 *   · Errores: formato que atrae y además cualifica, porque quien lo lee ya
 *     está planeando una activación.
 *
 * Fuentes, todas verificadas en sesiones anteriores:
 *   · Publicaciones de @agencia_contraste (nov 2025 – sep 2026).
 *   · Transcripciones de Conexión Podcast, episodios 001 y 002.
 *   · Las cuatro landings de nicho y los 42 artículos ya en vivo.
 *
 * Nada de precios inventados: donde toca hablar de dinero se explica qué
 * mueve el presupuesto y se remite a «Cuánto cuesta una activación BTL».
 *
 * Carga: node db/seed-posts-conexion.mjs --tanda=9 --escribir --publicar
 * Después: node db/enlaces-relacionados.mjs --escribir
 */

const L = {
  ig: 'https://www.instagram.com/agencia_contraste/',
  datos: 'https://www.instagram.com/agencia_contraste/reel/DSkg-apjnKg/',
  chirimia: 'https://www.instagram.com/agencia_contraste/reel/DTksp0ljlt4/',
  bebidas: '/marketing-btl-para-bebidas-degustacion-y-experiencia',
  inmobiliario: '/marketing-btl-inmobiliario-mas-leads-y-ventas',
  consumo: '/marketing-btl-consumo-masivo-mas-trafico-y-ventas',
  tecnologia: '/activaciones-btl-tecnologia-alto-impacto',
  faq: '/preguntas-frecuentes',
  contacto: '/#contacto',
  queEsBtl: '/blog/que-es-btl-significado-y-ejemplos',
  ejemplos: '/blog/activaciones-de-marca-ejemplos-btl-antioquia',
  estrategias: '/blog/estrategias-btl-activaciones-con-resultados',
  queHace: '/blog/que-hace-una-agencia-btl',
  costos: '/blog/cuanto-cuesta-una-activacion-btl',
  equipo: '/blog/promotoras-e-impulsadoras-equipo-de-calle',
  leads: '/blog/del-lead-a-la-venta-despues-de-la-activacion',
  agenciaFirmar: '/blog/que-pedirle-a-una-agencia-btl-antes-de-firmar',
  degustaciones: '/blog/degustaciones-y-sampling-en-punto-de-venta',
  tat: '/blog/trade-marketing-en-canal-tradicional-tat',
  pop: '/blog/material-pop-que-es-y-como-auditarlo',
  medellin: '/blog/agencia-btl-en-medellin',
  bogota: '/blog/agencia-btl-en-bogota',
  finDeAno: '/blog/activaciones-btl-de-fin-de-ano',
  campanas: '/blog/campanas-btl-del-brief-a-la-calle',
  lanzamiento: '/blog/lanzamiento-de-producto-con-activaciones-btl',
  produccion: '/blog/produccion-de-eventos-btl-que-incluye',
  metricas: '/blog/como-medir-una-activacion-btl-sin-metricas-de-vanidad',
  retail: '/blog/activaciones-btl-en-supermercados-y-retail',
  vsEventos: '/blog/agencia-btl-o-agencia-de-eventos',
  auditoria: '/blog/auditoria-de-punto-de-venta',
  merchandising: '/blog/visual-merchandising-en-punto-de-venta',
  mecanicas: '/blog/mecanicas-promocionales-btl',
  puerta: '/blog/sampling-puerta-a-puerta',
  // Esta tanda
  contratar: '/blog/como-contratar-una-agencia-btl',
  cotizacion: '/blog/cotizacion-de-activacion-btl',
  cuantas: '/blog/cuantas-promotoras-necesita-una-activacion',
  alimentos: '/blog/activaciones-btl-para-marcas-de-alimentos',
  errores: '/blog/errores-en-activaciones-btl',
}

export const posts = [
  /* ── 1 ─────────────────────────────────────────────────────────── */
  {
    slug: 'como-contratar-una-agencia-btl',
    publishedAt: '2026-11-17',
    title: 'Cómo contratar una agencia BTL paso a paso',
    excerpt:
      'De la necesidad a la firma: cómo se define qué pedir, a cuántas agencias convocar, qué debe traer una propuesta y qué conviene dejar escrito antes de empezar. El proceso completo, en orden.',
    metaDescription:
      'El proceso completo para contratar una agencia BTL: definir la necesidad, armar el brief, convocar, comparar propuestas y qué dejar por contrato.',
    coverUrl: '/media/hero-agencia.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas', 'inmobiliario'],
    keywords: [
      'cómo contratar una agencia BTL',
      'contratar agencia BTL',
      'agencia BTL',
      'brief de activación',
      'propuesta BTL',
    ],
    body: `Contratar una agencia BTL suele hacerse al revés: se piden tres cotizaciones, se compara el precio final y se elige la más barata. Después, cuando el resultado no se puede medir, nadie sabe si fue culpa de la agencia o del encargo.

Este es el orden que evita eso. Si lo que buscas son las preguntas concretas que hacer, están en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}); esto es el proceso que las rodea.

## 1. Define la necesidad, no la solución

El error de partida es pedir «una activación». Eso no es una necesidad, es un formato.

La necesidad se escribe así: *«necesitamos que la gente pruebe el producto nuevo en los 40 puntos donde ya está distribuido, antes de que termine el trimestre»*. Con esa frase, cualquier agencia seria puede proponer algo. Sin ella, todas proponen lo mismo que le vendieron al cliente anterior.

Si no tienes claro si lo tuyo es BTL o producción de eventos, está explicado en [Agencia BTL o agencia de eventos](${L.vsEventos}).

## 2. Escribe un brief, aunque sea de una página

Lo mínimo que tiene que llevar:

- **El objetivo principal**, uno solo, en una frase.
- **El público** y dónde está.
- **La cobertura**: cuántos puntos o ciudades, en qué fechas.
- **El presupuesto disponible**, o al menos el rango.
- **Las restricciones**: legales, de marca, de categoría.
- **Cómo se va a medir el resultado.**

Ese último punto filtra agencias solo. El contenido completo de un brief está en [Campañas BTL: del brief a la calle](${L.campanas}).

**Y sí, hay que dar el presupuesto.** Ocultarlo no consigue una propuesta más barata: consigue tres propuestas que no se pueden comparar porque cada una imagina un tamaño distinto.

## 3. Convoca a tres, no a ocho

Con tres propuestas bien hechas se decide. Con ocho, se gasta un mes leyendo documentos y las agencias buenas se retiran, porque preparar una propuesta BTL seria cuesta trabajo y nadie lo invierte en una lotería.

Antes de convocar, revisa de cada una: casos publicados y verificables, si opera en las ciudades que necesitas y si tiene equipo propio o subcontrata todo.

## 4. Compara lo que importa

No el total. Cómo leer una propuesta está desarrollado en [Cotización de activación BTL](${L.cotizacion}), pero el resumen es: compara **qué incluye cada línea**, no el número de abajo. Dos propuestas con el mismo precio pueden traer la mitad de supervisión una que otra.

Señales de que una propuesta es seria:

- Dice **qué se va a medir** y con qué frecuencia reporta.
- Detalla **cuánta gente** hay en punto y quién supervisa.
- Separa **producción, equipo y materiales** en líneas distintas.
- Dice qué pasa **si algo falla**.

## 5. Deja esto por contrato

- Qué se entrega al cierre y en qué formato.
- Cada cuánto llega el reporte **durante** la campaña, no después.
- Quién responde por los permisos.
- Qué pasa con el material sobrante.
- Quién es el responsable en terreno y cómo se le contacta.
- Qué ocurre si se cancela una fecha, y con cuánta anticipación.

## 6. Prepara lo tuyo antes de que empiecen

Esto se olvida siempre y hunde campañas buenas:

- **Inventario en los puntos** donde se va a activar. Está en [Lanzamiento de producto](${L.lanzamiento}).
- **Quién recibe los contactos** capturados y en cuánto tiempo los llama. En [Del lead a la venta](${L.leads}).
- **Quién aprueba** cambios de última hora, con teléfono y disponibilidad real.

## Cuánto tarda todo esto

Como referencia: definir necesidad y brief, una semana; convocatoria y propuestas, dos o tres; decisión y contrato, una; producción, dos o tres antes de salir. Entre seis y ocho semanas desde que se decide hasta que se activa, más si hay permisos de cadena o de municipio.

Lo que mueve el presupuesto está en [Cuánto cuesta una activación BTL](${L.costos}), y lo que de verdad hay que medir, en [Cómo medir una activación BTL](${L.metricas}).

¿Tienes la necesidad clara y no el brief? [Escríbenos](${L.contacto}) y lo armamos contigo antes de que pidas propuestas a nadie.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cómo se contrata una agencia BTL?',
        a: 'Definiendo primero la necesidad en una frase concreta y no el formato, escribiendo un brief aunque sea de una página, convocando a tres agencias, comparando qué incluye cada propuesta en vez del total, y dejando por contrato qué se entrega, cada cuánto se reporta y quién responde por los permisos.',
      },
      {
        q: '¿Hay que decirle el presupuesto a la agencia?',
        a: 'Sí, o al menos un rango. Ocultarlo no consigue propuestas más baratas: consigue propuestas que no se pueden comparar, porque cada agencia imagina un tamaño de operación distinto y cotiza cosas diferentes.',
      },
      {
        q: '¿A cuántas agencias conviene pedir propuesta?',
        a: 'A tres. Con ocho se gasta un mes leyendo documentos y las agencias buenas se retiran, porque preparar una propuesta BTL seria cuesta trabajo y no lo invierten en un proceso con pocas probabilidades.',
      },
      {
        q: '¿Qué debe quedar por contrato con una agencia BTL?',
        a: 'Qué se entrega al cierre y en qué formato, cada cuánto llega el reporte durante la campaña, quién responde por los permisos, qué pasa con el material sobrante, quién es el responsable en terreno y qué ocurre si se cancela una fecha.',
      },
      {
        q: '¿Cuánto tiempo toma contratar y ejecutar una activación?',
        a: 'Entre seis y ocho semanas desde que se decide hasta que se activa: una semana para necesidad y brief, dos o tres para propuestas, una para decisión y contrato y dos o tres de producción. Más tiempo si hay permisos de cadena o de municipio de por medio.',
      },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────── */
  {
    slug: 'cotizacion-de-activacion-btl',
    publishedAt: '2026-11-18',
    title: 'Cotización de activación BTL: cómo leerla',
    excerpt:
      'Dos propuestas con el mismo total pueden ser operaciones completamente distintas. Qué líneas mirar, cuáles suelen faltar y cómo comparar tres cotizaciones sin acabar eligiendo por el número de abajo.',
    metaDescription:
      'Cómo leer y comparar una cotización de activación BTL: qué líneas debe traer, cuáles suelen faltar y qué preguntas hacer antes de decidir.',
    coverUrl: '/media/hero-resultados.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'cotización activación BTL',
      'propuesta BTL',
      'presupuesto de activación',
      'contratar agencia BTL',
      'costos BTL',
    ],
    body: `Tienes tres cotizaciones sobre la mesa y se parecen. Una es más barata, otra trae mejores fotos y la tercera llegó tarde. Elegir por el total es la salida fácil y casi siempre la cara, porque lo que separa una propuesta de otra no está en el número de abajo: está en lo que cada una metió y lo que dejó fuera.

El contexto de qué encarece una operación está en [Cuánto cuesta una activación BTL](${L.costos}). Esto es cómo leer el documento.

## Las líneas que debe traer

**Equipo en punto.** Cuántas personas, cuántas horas, cuántos días y en cuántos puntos. Si dice «equipo de promotoría» sin números, no se puede comparar con nada. Cómo se arma está en [Promotoras e impulsadoras](${L.equipo}).

**Supervisión.** Cuántos supervisores y a cuántos puntos atiende cada uno. Es la línea que más se recorta y la que más se nota.

**Producción y montaje.** Qué se construye, de qué material y si es reutilizable o de un solo uso.

**Materiales y muestras.** Cuántas unidades, quién las suministra y qué pasa con lo que sobra.

**Transporte y logística.** Cómo llega todo a cada punto, y dónde se guarda entre jornadas.

**Permisos.** Si están incluidos o si los tramita el cliente. Esta ambigüedad es la causa número uno de campañas que no salen el día previsto.

**Reporte.** Qué se entrega, con qué frecuencia y en qué formato.

**Coordinación.** Las horas de quien planea y responde. Que no aparezca no significa que no se cobre: significa que está repartida en otras líneas.

## Lo que casi siempre falta

Revisa si están, porque si no, aparecerán después como «adicionales»:

- **Uniformes** del equipo.
- **Alimentación y transporte** del personal en jornadas largas.
- **Reposición** de material dañado o perdido.
- **Horas extra** si la jornada se alarga.
- **Desmontaje y retiro** del material.
- **Almacenamiento** entre fechas en campañas largas.
- **Impuestos**, que a veces están y a veces no.

## Cómo comparar tres propuestas

Pon las tres en una tabla con las líneas de arriba como filas. Vas a ver de inmediato que una trae la mitad de supervisión, otra no incluye permisos y la tercera cotizó menos días. En ese momento la comparación de precios empieza a significar algo.

Y haz una cuenta que nadie hace: **divide el total entre los contactos efectivos que la propuesta promete**. Ese costo por contacto es lo único realmente comparable entre operaciones distintas. Si una propuesta no se atreve a estimar contactos, es un dato en sí mismo.

## Las preguntas que resuelven el resto

1. ¿Quién está en el punto el primer día y quién el último? (La rotación de personal es invisible en el papel.)
2. ¿Qué pasa si llueve o si el punto no autoriza el montaje?
3. ¿El reporte llega durante la campaña o al terminar?
4. ¿Las fotos de los casos son de campañas propias?
5. ¿Qué parte se subcontrata?

La lista completa está en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

## Una señal de alarma

Una propuesta que no menciona **qué se va a medir** está vendiendo presencia, no resultados. Da igual lo bien maquetada que esté: si nadie define qué cuenta como éxito antes de salir, al final se evalúa con una galería de fotos. Lo desarrollamos en [Cómo medir una activación BTL](${L.metricas}), y lo resume el propio equipo en [este reel](${L.datos}): un evento sin medición es un gasto, no una inversión.

## Y una sobre el precio bajo

Si una propuesta está muy por debajo de las otras dos, pregunta exactamente dónde. Normalmente es menos supervisión, menos días o personal sin entrenar, y las tres cosas se pagan después en resultados que no llegan.

¿Quieres que revisemos una propuesta que ya tienes? [Escríbenos](${L.contacto}), aunque no sea nuestra.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué debe incluir una cotización de activación BTL?',
        a: 'Equipo en punto con números concretos de personas, horas, días y puntos; supervisión; producción y montaje; materiales y muestras; transporte y logística; permisos; el reporte con su frecuencia y formato; y las horas de coordinación.',
      },
      {
        q: '¿Qué partidas suelen faltar en una cotización BTL?',
        a: 'Uniformes, alimentación y transporte del personal en jornadas largas, reposición de material dañado, horas extra, desmontaje y retiro, almacenamiento entre fechas e impuestos. Si no están, suelen aparecer después como adicionales.',
      },
      {
        q: '¿Cómo se comparan varias cotizaciones de BTL?',
        a: 'Poniéndolas en una tabla con las mismas filas para ver qué incluye cada una, y dividiendo el total entre los contactos efectivos que cada propuesta promete. Ese costo por contacto es lo único comparable de verdad entre operaciones distintas.',
      },
      {
        q: '¿Qué señales indican que una propuesta BTL no es seria?',
        a: 'Que no diga qué se va a medir ni con qué frecuencia se reporta, que describa el equipo sin números, que deje ambiguo quién tramita los permisos, o que no se atreva a estimar cuántos contactos efectivos va a generar.',
      },
      {
        q: '¿Por qué una cotización puede ser mucho más barata que las otras?',
        a: 'Casi siempre por menos supervisión, menos días de operación o personal sin entrenamiento. Las tres cosas no se notan en el documento y se pagan después en resultados que no llegan, así que conviene preguntar exactamente dónde está la diferencia.',
      },
    ],
  },

  /* ── 3 ─────────────────────────────────────────────────────────── */
  {
    slug: 'cuantas-promotoras-necesita-una-activacion',
    publishedAt: '2026-11-19',
    title: 'Cuántas promotoras necesita una activación',
    excerpt:
      'La pregunta que se resuelve a ojo y decide el resultado. Cómo se calcula el equipo según el flujo del punto, la duración de la interacción y las horas de operación, con los números de referencia.',
    metaDescription:
      'Cómo calcular cuántas promotoras necesita una activación según el flujo del punto, la duración de la interacción y las horas, con cifras de referencia.',
    coverUrl: '/media/activacion-01.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'cuántas promotoras necesito',
      'equipo de activación',
      'promotoras e impulsadoras',
      'activaciones BTL',
      'costos BTL',
    ],
    body: `Es la pregunta que casi siempre se responde a ojo —«pon dos»— y la que más determina si una activación rinde. Con gente de menos, la mitad de la oportunidad pasa de largo. Con gente de más, se paga por horas que nadie aprovecha.

Se puede calcular. Hace falta saber tres cosas.

## Los tres datos que lo deciden

**1. El flujo del punto.** Cuánta gente pasa por hora delante del espacio. No cuánta entra a la tienda: cuánta pasa por donde va a estar el equipo. La cadena suele tenerlo; si no, se cuenta a mano durante media hora en el horario que importa.

**2. Cuánto dura una interacción.** No es lo mismo entregar una muestra (de 15 a 30 segundos) que hacer una degustación con explicación (de 1 a 3 minutos) o una demostración de producto técnico (de 5 a 10). Las mecánicas están en [Mecánicas promocionales](${L.mecanicas}).

**3. Qué porcentaje quieres abordar.** Aquí está el error de base: nadie aborda al 100 % de quien pasa. Un objetivo realista está entre el 10 % y el 25 %, según lo llamativo del montaje y lo abierto que esté el público.

## La cuenta

Con esos tres datos:

> **Personas necesarias = (flujo por hora × porcentaje a abordar × minutos por interacción) ÷ 60**

Un ejemplo: pasan 300 personas por hora, quieres abordar al 15 % (45 personas) y cada degustación lleva 2 minutos. Son 90 minutos de trabajo por cada hora de operación: **hacen falta dos personas**, no una.

Si esa misma mecánica durara 4 minutos, serían 180 minutos por hora: **tres personas**.

La cuenta no da la respuesta final, pero convierte la discusión en algo verificable.

## Los ajustes que la cuenta no ve

**Nunca una sola persona en un punto.** Mientras atiende a alguien, el resto pasa de largo y el espacio se ve vacío, que es peor que no estar. Dos es el mínimo operativo en cualquier punto con flujo.

**Relevos y descansos.** Una jornada de 8 horas no son 8 horas de abordaje. Con la ley de por medio y el cansancio real, hay que contar pausas: abordar con energía la hora número siete no lo hace nadie.

**Reposición y orden.** Alguien tiene que reponer material, mantener el montaje presentable y llevar el conteo. En equipos pequeños lo hace quien atiende, y eso resta tiempo de abordaje.

**Supervisión.** Un supervisor no sustituye a un promotor. Cuántos puntos cubre cada uno depende de las distancias: en Bogotá, menos que en una ciudad compacta, y lo explicamos en [Agencia BTL en Bogotá](${L.bogota}).

## Referencias rápidas

Para dimensionar sin hacer la cuenta, como punto de partida y no como regla:

- **Punto de venta de barrio**, impulso simple: 1 persona, con un supervisor que rota entre varios puntos.
- **Supermercado, degustación**: 2 personas por punto y turno.
- **Centro comercial, mecánica con montaje**: de 3 a 4, más alguien que no atienda público.
- **Feria o evento grande**: de 4 a 6 por turno, con turnos cortos.
- **Sampling puerta a puerta**: parejas, siempre. Está en [Sampling puerta a puerta](${L.puerta}).

## Qué pasa si te quedas corto

Es el escenario más común y el más caro, porque no se nota: el espacio está ocupado, hay gente trabajando y las fotos salen bien. Lo que no se ve es la gente que pasó de largo mientras la única promotora atendía a alguien.

Por eso el indicador que hay que mirar no es cuántos contactos se hicieron, sino **cuántos se hicieron frente a cuántos pasaron**. Si abordaste al 5 % de un flujo alto, el problema no fue el punto: fue el tamaño del equipo. El criterio está en [Cómo medir una activación BTL](${L.metricas}).

El perfil, la selección y el entrenamiento están en [Promotoras e impulsadoras](${L.equipo}), y lo que esto significa en presupuesto, en [Cuánto cuesta una activación BTL](${L.costos}).

¿Tienes los puntos y no sabes con cuánta gente salir? [Cuéntanos cuáles son](${L.contacto}) y lo calculamos.

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuántas promotoras necesita una activación?',
        a: 'Depende de tres datos: el flujo de personas por hora frente al punto, cuánto dura una interacción y qué porcentaje de ese flujo se quiere abordar. La cuenta es flujo por hora × porcentaje × minutos por interacción, dividido entre 60.',
      },
      {
        q: '¿Se puede hacer una activación con una sola promotora?',
        a: 'En un punto con flujo, no conviene. Mientras atiende a una persona el resto pasa de largo y el espacio se ve vacío, que da peor imagen que no estar. Dos personas es el mínimo operativo; una sola sólo funciona en impulso simple de punto pequeño con supervisión rotativa.',
      },
      {
        q: '¿Qué porcentaje de la gente que pasa se puede abordar?',
        a: 'Entre el 10 % y el 25 %, según lo llamativo del montaje y la disposición del público. Planear sobre la base de abordar a todo el que pasa es el error que lleva a dimensionar mal el equipo.',
      },
      {
        q: '¿Cuántas promotoras por punto según el canal?',
        a: 'Como referencia: una en tienda de barrio con impulso simple y supervisor rotativo, dos en supermercado con degustación, de tres a cuatro en centro comercial con montaje, de cuatro a seis por turno en feria grande, y siempre en parejas para sampling puerta a puerta.',
      },
      {
        q: '¿Cómo saber si el equipo se quedó corto?',
        a: 'Mirando cuántos contactos efectivos se hicieron frente a cuántas personas pasaron por el punto, no sólo el total de contactos. Si el porcentaje abordado es muy bajo con un flujo alto, el problema no fue la ubicación sino el tamaño del equipo.',
      },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────── */
  {
    slug: 'activaciones-btl-para-marcas-de-alimentos',
    publishedAt: '2026-11-20',
    title: 'Activaciones BTL para marcas de alimentos',
    excerpt:
      'En alimentos la prueba lo decide casi todo, y por eso la operación es más exigente: manipulación, cadena de frío, permisos sanitarios y un equipo que sepa de higiene además de vender. Qué cambia.',
    metaDescription:
      'Cómo se hacen activaciones BTL para marcas de alimentos: degustación, manipulación, cadena de frío, permisos sanitarios y medición en punto de venta.',
    coverUrl: '/media/nichos/consumo-masivo.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo'],
    keywords: [
      'activaciones para marcas de alimentos',
      'degustación de alimentos',
      'sampling de alimentos',
      'activaciones BTL',
      'trade marketing',
    ],
    body: `En alimentos, la **prueba** no es una táctica más: es la táctica. Nadie cambia de marca de café, de salsa o de snack porque se lo expliquen bien. Cambia porque lo probó y le gustó.

Eso coloca a las marcas de alimentos en una posición privilegiada para el BTL y, al mismo tiempo, les impone la operación más exigente de todas las categorías.

## Por qué la operación es más dura

**Hay normativa sanitaria de por medio.** Manipular alimentos para consumo del público no es como entregar una muestra sellada: hay requisitos de manipulación, de conservación y de quien la realiza. Esto se verifica con el área de calidad de la marca y con la cadena antes de cerrar nada.

**La cadena de frío no admite improvisación.** Si el producto la necesita, hace falta equipamiento, control de temperatura y un plan para cuando el punto no tenga dónde conectar.

**El montaje tiene requisitos propios.** Superficies lavables, manejo de residuos, agua, separación entre producto y público.

**El equipo necesita formación doble:** la del producto y la de higiene. Lo segundo no es opcional y lo primero es lo que convierte. El perfil está en [Promotoras e impulsadoras](${L.equipo}).

## Qué mecánicas funcionan

- **Degustación preparada en el punto**, la más potente y la más exigente. Desarrollada en [Degustaciones y sampling](${L.degustaciones}).
- **Muestra sellada para llevar**, cuando preparar no es viable: menos impacto inmediato, pero el producto se prueba en casa, que es donde se decide la recompra. Es la lógica de [Sampling puerta a puerta](${L.puerta}).
- **Receta o uso sugerido.** En alimentos, enseñar qué hacer con el producto resuelve la objeción real, que muchas veces no es el sabor sino «no sé cómo usarlo».
- **Combos y compra inmediata**, para convertir la prueba en venta el mismo día. Las opciones están en [Mecánicas promocionales](${L.mecanicas}).

## Dónde se activa

**Supermercado**, donde está la compra planeada y el dato de rotación. Las reglas de cadena están en [Activaciones BTL en supermercados](${L.retail}).

**Canal tradicional**, que en alimentos pesa muchísimo en Colombia: la tienda de barrio resuelve el día a día. Ver [Trade marketing en canal tradicional](${L.tat}).

**Plazas y eventos**, donde la gente va predispuesta a probar.

**Puerta a puerta**, para productos de preparación en casa.

## Cuándo activar

En alimentos el momento del día pesa más que en casi ninguna otra categoría, porque la disposición a probar cambia con el hambre:

- **Antes del almuerzo y a media tarde** rinden mucho más que la primera hora de la mañana.
- **Fin de semana en supermercado**, cuando se hace la compra grande y la familia va completa.
- **Evitar la hora pico de caja**, cuando la gente ya sólo quiere salir.

Y una advertencia de temporada: en diciembre el lineal se satura y la atención se dispersa, así que conviene adelantar lo que se pueda. Está en [Activaciones BTL de fin de año](${L.finDeAno}).

## El detalle que marca la diferencia

En alimentos, **la presentación de la muestra vale tanto como el producto**. Una degustación servida en una porción miserable, en un vaso arrugado o a temperatura equivocada no enseña el producto: enseña una versión mala del producto, y eso es peor que no activar.

Vale la pena gastar en el menaje y en el equipamiento de servicio lo que haga falta. Es la parte del presupuesto que más se recorta y la que más daño hace cuando se recorta.

## Cómo se mide

Alimentos tiene la ventaja de que el efecto se ve rápido, porque el ciclo de recompra es corto:

- **Pruebas efectivas**, no muestras entregadas.
- **Conversión inmediata**: cuántos compraron en el punto después de probar.
- **Rotación del punto activado** frente a un punto equivalente sin activación, durante las semanas siguientes. Esta es la que cierra el caso.
- **Reacción cualitativa**: qué dijo la gente del sabor, del precio, del empaque. En alimentos esto vale oro para producto y casi nadie lo anota.

El criterio general está en [Cómo medir una activación BTL](${L.metricas}) y el marco en [Estrategias BTL](${L.estrategias}).

¿Tienes un producto que gana cuando lo prueban? [Cuéntanos cuál es](${L.contacto}). Y si quieres ver cómo trabajamos la categoría, está en [consumo masivo](${L.consumo}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Qué hace diferente una activación BTL de alimentos?',
        a: 'Que la prueba lo decide casi todo y que la operación es más exigente: hay normativa sanitaria de manipulación, cadena de frío cuando el producto la necesita, requisitos de montaje como superficies lavables y manejo de residuos, y un equipo que debe estar formado en higiene además de en el producto.',
      },
      {
        q: '¿Qué permisos hace falta para una degustación de alimentos?',
        a: 'Los requisitos sanitarios de manipulación y conservación que apliquen a la categoría, más las condiciones que imponga la cadena o el establecimiento. Se verifican con el área de calidad de la marca y con el punto antes de cerrar la operación, no después.',
      },
      {
        q: '¿Qué mecánicas funcionan mejor para marcas de alimentos?',
        a: 'La degustación preparada en el punto, que es la más potente; la muestra sellada para llevar cuando preparar no es viable, porque el producto se prueba en casa; enseñar una receta o uso sugerido, que resuelve la objeción de no saber cómo usarlo; y combos para convertir la prueba en compra el mismo día.',
      },
      {
        q: '¿Por qué importa tanto la presentación de la muestra?',
        a: 'Porque una degustación servida en una porción escasa, en un recipiente malo o a la temperatura equivocada no enseña el producto: enseña una versión mala de él. Es peor que no activar, y suele ser la partida del presupuesto que más se recorta.',
      },
      {
        q: '¿Cómo se mide una activación de alimentos?',
        a: 'Con pruebas efectivas en vez de muestras entregadas, conversión inmediata en el punto, rotación del punto activado frente a uno equivalente sin activación en las semanas siguientes, y la reacción cualitativa sobre sabor, precio y empaque, que en alimentos vale mucho para el área de producto.',
      },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────── */
  {
    slug: 'errores-en-activaciones-btl',
    publishedAt: '2026-11-21',
    title: 'Siete errores que arruinan una activación BTL',
    excerpt:
      'Ninguno es espectacular y todos son frecuentes: activar donde no hay producto, poner una sola persona, medir lo que no decide. Los siete fallos que más veces convierten una buena idea en un gasto.',
    metaDescription:
      'Los siete errores más frecuentes en activaciones BTL y cómo evitarlos: distribución, equipo, mecánica, permisos, medición y seguimiento de contactos.',
    coverUrl: '/media/activacion-02.jpg',
    location: 'Colombia',
    niches: ['consumo-masivo', 'bebidas', 'inmobiliario', 'tecnologia'],
    keywords: [
      'errores en activaciones BTL',
      'activaciones de marca',
      'campañas BTL',
      'medición de activaciones',
      'estrategias BTL',
    ],
    body: `Las activaciones rara vez fallan por una mala idea. Fallan por cosas aburridas que se podían prever y que se repiten campaña tras campaña. Estas son las siete que más veces hemos visto convertir una buena idea en un gasto.

## 1. Activar donde el producto no está

El más caro y el más frecuente. Se cierra la fecha con el calendario de mercadeo y no con el de distribución, el equipo sale a la calle, la gente pregunta dónde comprarlo y la respuesta es «pronto». Esa inversión se pierde entera, y además deja a la competencia una venta servida.

La regla es simple: **primero el producto en el punto, después la activación sobre ese punto**. Está en [Lanzamiento de producto](${L.lanzamiento}).

## 2. Poner una sola persona en un punto con flujo

Mientras atiende a alguien, el resto pasa de largo. Y un stand con una persona ocupada se ve vacío, que es peor que no estar. Dos es el mínimo operativo. Cómo se calcula el equipo está en [Cuántas promotoras necesita una activación](${L.cuantas}).

## 3. Elegir la mecánica antes que el objetivo

Alguien propone una ruleta porque funcionó en otra campaña, se aprueba, y sólo al final alguien pregunta qué se quería lograr. La mecánica se elige después de saber qué tiene que hacer la persona: probar, comprar, dejar datos o volver. Las opciones están en [Mecánicas promocionales](${L.mecanicas}).

## 4. Dejar los permisos para el final

Los permisos de cadena y de municipio son lo más impredecible de toda la operación y lo único que puede cancelar una fecha ya pagada. Se tramitan primero, no cuando ya está todo lo demás listo. El detalle está en [Producción de eventos BTL](${L.produccion}).

## 5. Medir lo que siempre sale bien

«Impactamos a 12.000 personas» es tráfico del lugar, no gente que hizo algo. Las muestras entregadas cuentan lo que salió de la caja, no lo que alguien probó. Si el indicador sube siempre y no cambia ninguna decisión, está decorando. Lo desarrollamos en [Cómo medir una activación BTL](${L.metricas}).

## 6. Capturar contactos que nadie va a llamar

Se consiguen trescientos datos en un fin de semana, vuelven a la oficina y ahí se quedan. A las tres semanas están fríos y la activación figura como un gasto sin retorno, cuando en realidad hizo su parte y el fallo vino después. Antes de poner un formulario hay que saber quién llama y en cuánto tiempo: está en [Del lead a la venta](${L.leads}).

## 7. No volver a mirar el punto

Se define una exhibición, se envía el material y nadie verifica. A las dos semanas el exhibidor está en la bodega, la cenefa se cayó y el producto volvió al estante de abajo. Sin verificación, lo que se diseñó es una intención. Lo cubren [Material POP](${L.pop}), [Visual merchandising](${L.merchandising}) y [Auditoría de punto de venta](${L.auditoria}).

## El patrón

Fíjate en que ninguno de los siete tiene que ver con la creatividad. Todos tienen que ver con **la operación y con el antes y el después**: distribución, dimensionamiento, orden de decisiones, trámites, criterios de medición y seguimiento.

Eso es, en el fondo, lo que separa a una agencia BTL de una productora de eventos: no el montaje, sino quién se hace cargo de esas siete cosas. Está desarrollado en [Agencia BTL o agencia de eventos](${L.vsEventos}).

## Cómo evitarlos sin complicarse

Antes de aprobar cualquier activación, responde seis preguntas:

1. ¿Está el producto en todos los puntos donde vamos a activar?
2. ¿Cuánta gente hay por punto y quién supervisa?
3. ¿Qué tiene que hacer la persona, en una frase?
4. ¿Los permisos están tramitados o sólo solicitados?
5. ¿Qué número vamos a mirar al final y qué decisión vamos a tomar con él?
6. ¿Quién llama a los contactos y en cuántas horas?

Si alguna no tiene respuesta clara, ahí está el riesgo. El orden completo de una campaña está en [Campañas BTL: del brief a la calle](${L.campanas}), y lo que conviene exigir por contrato, en [Qué pedirle a una agencia BTL antes de firmar](${L.agenciaFirmar}).

¿Tienes una activación en marcha y quieres que la revisemos antes de que salga? [Escríbenos](${L.contacto}).

## Fuentes

- [Instagram de Contraste Agencia](${L.ig})
- [Preguntas frecuentes](${L.faq})`,
    faqs: [
      {
        q: '¿Cuál es el error más caro en una activación BTL?',
        a: 'Activar en puntos donde el producto todavía no está distribuido. Se genera demanda que no se puede atender, la inversión se pierde completa y además se le entrega esa venta a la competencia. La regla es primero distribución y después activación.',
      },
      {
        q: '¿Por qué no funciona poner una sola promotora en un punto?',
        a: 'Porque mientras atiende a una persona el resto del flujo pasa de largo, y un espacio con alguien ocupado se percibe vacío, que da peor imagen que no estar presente. En cualquier punto con flujo real, dos personas es el mínimo operativo.',
      },
      {
        q: '¿Cuándo se deben tramitar los permisos de una activación?',
        a: 'Primero, antes que cualquier otra cosa. Los permisos de cadena y de municipio son lo más impredecible de la operación y lo único capaz de cancelar una fecha ya pagada. Dejarlos para el final es el error que más campañas aplaza.',
      },
      {
        q: '¿Qué indicadores no sirven para evaluar una activación?',
        a: 'Personas impactadas, que es tráfico del lugar y no gente que hizo algo; muestras entregadas, que cuenta lo que salió de la caja; alcance en redes, que mide la publicación; y las fotos del montaje, que demuestran que se montó pero no que funcionó.',
      },
      {
        q: '¿Qué preguntas hacer antes de aprobar una activación?',
        a: 'Si el producto está en todos los puntos, cuánta gente hay por punto y quién supervisa, qué tiene que hacer la persona en una frase, si los permisos están tramitados o sólo solicitados, qué número se va a mirar al final y qué decisión se tomará con él, y quién llama a los contactos capturados.',
      },
    ],
  },
]
