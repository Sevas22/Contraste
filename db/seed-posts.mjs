/**
 * Carga tres artículos de muestra en el blog.
 *   node <ruta>/posts.mjs
 *
 * El contenido es método y criterio de industria, no resultados atribuidos a
 * Contraste: no se inventan cifras, clientes ni casos.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

async function loadEnv() {
  const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const posts = [
  {
    slug: 'como-medir-una-activacion-btl-sin-metricas-de-vanidad',
    status: 'published',
    title: 'Cómo medir una activación BTL sin métricas de vanidad',
    excerpt:
      'Impactos y alcance no dicen si una activación funcionó. Estas son las métricas que sí explican el retorno de una acción en calle o en punto de venta.',
    metaDescription:
      'Guía para medir activaciones BTL con métricas reales: costo por contacto, tasa de prueba y conversión. Cómo dejar de reportar impactos.',
    cover_url: '/media/activacion-01.jpg',
    location: 'Medellín',
    niches: ['consumo-masivo'],
    keywords: [
      'medir activaciones BTL',
      'costo por contacto marketing',
      'ROI marketing experiencial',
      'métricas trade marketing',
    ],
    publishedAt: '2026-08-12',
    body: `Casi todos los informes de activación empiezan igual: un número enorme de "impactos". Suele ser la cantidad de personas que pasaron cerca del punto. No dice nada sobre si alguien se detuvo, probó el producto o volvió a comprarlo.

El problema no es que el número sea falso. Es que no responde a la única pregunta que importa: ¿esta activación devolvió más de lo que costó?

## Por qué el alcance no sirve para decidir

El alcance mide oportunidad, no resultado. Si montas una activación en un centro comercial con cien mil visitantes semanales, puedes reportar cien mil impactos sin haber hablado con nadie.

Sirve para dimensionar el escenario antes de ejecutar. No sirve para justificar la inversión después. Cuando un informe se apoya solo en alcance, normalmente es porque no se midió nada más.

## Las cuatro métricas que sí explican el retorno

**Contactos efectivos.** Personas con las que el promotor realmente interactuó: hubo conversación, demostración o entrega. Se cuenta con un registro por turno, no estimando sobre el flujo del punto.

**Tasa de prueba.** Del total de contactos, cuántos probaron el producto. Es la métrica que separa una activación de una repartición de volantes. Si la tasa es baja, el problema casi siempre está en la mecánica o en la ubicación, no en el equipo.

**Costo por contacto.** La inversión total dividida entre los contactos efectivos. Es el número que permite comparar una activación contra otra, y contra cualquier otro canal. Un costo por contacto alto no es malo por sí solo: depende de qué tan cerca de la compra esté ese contacto.

**Conversión en punto.** Cuántos de los que probaron compraron ahí mismo. Requiere coordinación con el punto de venta para leer el movimiento de inventario durante la activación.

## Qué hace falta para poder medirlo

Ninguna de esas métricas aparece sola. Exigen tres cosas antes de salir a calle.

- Un formato de registro que el promotor pueda llenar sin dejar de atender
- Supervisión que valide en sitio, porque un registro sin control se infla
- Acuerdo previo con el punto de venta para leer el inventario

Si el proyecto no contempla esto desde el diseño, el informe final será de alcance otra vez. No por mala fe: porque no hay de dónde sacar el resto.

## El error de medir solo el día de la activación

Una activación de prueba de producto no busca la venta del día. Busca la recompra.

Medir únicamente lo que pasó durante las horas de operación subestima el efecto de las mecánicas de sampling y sobrevalora las de descuento inmediato. Un seguimiento a treinta días en los mismos puntos, comparado contra puntos sin activación, es lo que muestra el efecto real.

Es más trabajo. También es la diferencia entre saber si la inversión sirvió y suponerlo.

## Cómo leer un informe que te presenten

Tres preguntas bastan para saber si el informe es sólido:

- ¿De dónde salió cada número? Si la respuesta es "estimado sobre el flujo del punto", es alcance disfrazado.
- ¿Cuál fue el costo por contacto? Si no está, no se puede comparar con nada.
- ¿Qué pasó las semanas siguientes? Sin eso, solo se midió el día.

Una agencia que mide de verdad responde las tres sin incomodarse. Las cifras pueden no ser las esperadas, y precisamente por eso sirven: permiten corregir la siguiente activación en vez de repetir la misma.

## Qué hacer con los números una vez los tienes

Medir sin cambiar nada es un gasto. El valor aparece cuando los datos entran en la decisión siguiente.

Con el costo por contacto de varias activaciones se puede ordenar los formatos de más a menos eficiente para esa categoría. Con la tasa de prueba por punto se identifica qué ubicaciones funcionan y cuáles se repiten por costumbre. Con la conversión se ajusta la mecánica: si la gente prueba pero no compra, el problema rara vez está en el promotor.

Ese histórico es el activo real. Una marca que lleva dos años midiendo igual puede planear la temporada siguiente con criterio en vez de con intuición, y negociar mejor con sus proveedores porque sabe qué le cuesta cada contacto.`,
    faqs: [
      {
        q: '¿Qué es el costo por contacto en una activación BTL?',
        a: 'Es la inversión total de la activación dividida entre el número de contactos efectivos, es decir, personas con las que el promotor realmente interactuó. Permite comparar una activación contra otra y contra otros canales de marketing.',
      },
      {
        q: '¿Por qué el alcance no sirve para medir una activación?',
        a: 'Porque mide oportunidad, no resultado: cuenta a quienes pasaron cerca del punto, aunque nadie se haya detenido ni probado el producto. Sirve para dimensionar el escenario antes de ejecutar, no para justificar la inversión después.',
      },
      {
        q: '¿Cuánto tiempo hay que medir después de una activación?',
        a: 'Al menos treinta días, comparando los puntos activados contra puntos similares sin activación. Medir solo el día de la operación subestima las mecánicas de prueba de producto, que buscan recompra y no venta inmediata.',
      },
      {
        q: '¿Qué se necesita para poder medir bien desde el inicio?',
        a: 'Tres cosas definidas antes de salir a calle: un formato de registro que el promotor pueda llenar mientras atiende, supervisión que valide en sitio, y un acuerdo con el punto de venta para leer el movimiento de inventario.',
      },
    ],
  },

  {
    slug: 'que-pedirle-a-una-agencia-btl-antes-de-firmar',
    status: 'published',
    title: 'Qué pedirle a una agencia BTL antes de firmar',
    excerpt:
      'Una propuesta bonita no garantiza una buena ejecución. Estas son las preguntas que separan a quien va a operar de quien solo va a presentar.',
    metaDescription:
      'Checklist para contratar agencia BTL en Colombia: qué exigir en la propuesta, cómo evaluar la operación y qué señales de alarma revisar antes de firmar.',
    cover_url: '/media/hero-agencia.jpg',
    location: 'Medellín',
    niches: ['consumo-masivo', 'bebidas'],
    keywords: [
      'contratar agencia BTL Colombia',
      'cómo elegir agencia de activaciones',
      'agencia marketing experiencial Medellín',
      'propuesta activación de marca',
    ],
    publishedAt: '2026-08-20',
    body: `La mayoría de las propuestas de activación se parecen. Referencias visuales atractivas, un concepto creativo y un presupuesto. Lo que distingue a una agencia que va a ejecutar bien de una que solo presenta bien no está en esa parte del documento.

Está en lo que pasa cuando preguntas por la operación.

## Pide el plan de operación, no solo el concepto

El concepto explica qué se va a vivir. El plan de operación explica cómo llega eso a la calle: cuántas personas, en qué turnos, con qué transporte, quién supervisa y qué pasa si llueve.

Una agencia con experiencia real tiene ese documento antes de que lo pidas. Si aparece después de insistir, o llega como una lista genérica, es señal de que la operación se resolverá improvisando.

## Pregunta quién supervisa y cuántas veces

En BTL casi todo se decide en punto. Un promotor sin supervisión rinde distinto al segundo día.

Vale la pena saber:

- Cuántos supervisores hay por cantidad de puntos
- Con qué frecuencia visitan cada punto
- Qué evidencia dejan de cada visita
- Qué pasa cuando un promotor no llega

La respuesta a la última es la más reveladora. Toda operación tiene ausencias; lo que importa es si hay un reemplazo previsto o se pierde el turno.

## Exige saber cómo se va a medir antes de ejecutar

Si la conversación sobre medición aparece al final, el informe será de alcance. Las métricas útiles —contactos efectivos, tasa de prueba, costo por contacto— exigen formatos y acuerdos definidos desde el diseño.

Pregunta qué se va a reportar, con qué periodicidad y de dónde saldrá cada dato. Una agencia que mide de verdad puede responderlo en la reunión, sin consultarlo.

## Revisa el equipo real, no el portafolio

El portafolio muestra lo mejor de varios años, a veces de personas que ya no están.

Pregunta quién va a estar en tu cuenta: quién coordina, quién supervisa en calle y quién responde cuando algo falla un sábado. Que esos nombres aparezcan en la propuesta cambia la relación.

## Señales de alarma

Hay tres que se repiten:

- **Presupuesto sin desglose.** Un número global impide saber si estás pagando producción, personal o margen.
- **Promesas de resultado sin base.** Nadie puede garantizar una cifra de ventas antes de conocer el punto y la categoría.
- **Referencias que no se pueden contactar.** Un cliente satisfecho suele aceptar una llamada de quince minutos.

## Lo que sí conviene ceder

No todo es exigir. Hay dos cosas que conviene conceder para que la operación funcione.

La primera es tiempo. Una activación bien producida necesita permisos, contratación y formación del equipo. Los proyectos comprimidos se ejecutan, pero con menos margen para corregir.

La segunda es acceso al punto de venta. Sin acuerdo previo con la cadena, la agencia no puede leer inventario ni medir conversión, por buena que sea.

## Cómo comparar dos propuestas que cuestan distinto

La comparación por precio total casi siempre engaña, porque rara vez cubren lo mismo.

Conviene llevar ambas a una misma unidad: cuánto cuesta cada punto activado por día, y cuántas horas de promotoría incluye cada una. Dos propuestas con veinte por ciento de diferencia pueden esconder el doble de cobertura, o la mitad de supervisión.

También vale revisar qué está fuera. Transporte entre ciudades, permisos, material de reposición y horas extra suelen ser los rubros que aparecen después si no se nombran antes.

Firmar con una agencia BTL es contratar una operación, no un documento. Las preguntas de arriba no buscan incomodar: buscan asegurarse de que del otro lado hay alguien preparado para responder cuando algo se salga del plan. Porque algo siempre se sale.`,
    faqs: [
      {
        q: '¿Qué debe incluir la propuesta de una agencia BTL?',
        a: 'Además del concepto creativo, un plan de operación con número de personas, turnos, logística, esquema de supervisión y plan de contingencia; el presupuesto desglosado por producción, personal y margen; y la definición de qué se va a medir y cómo.',
      },
      {
        q: '¿Cómo sé si una agencia va a medir bien la activación?',
        a: 'Pregunta en la primera reunión qué se va a reportar y de dónde saldrá cada dato. Si la conversación sobre medición aparece solo al final del proyecto, el informe será de alcance, porque las métricas útiles exigen formatos y acuerdos definidos desde el diseño.',
      },
      {
        q: '¿Qué señales de alarma hay al contratar una agencia de activaciones?',
        a: 'Presupuestos sin desglose, promesas de cifras de venta antes de conocer el punto y la categoría, y referencias de clientes que no se pueden contactar. Las tres indican que la propuesta se construyó para cerrar la venta, no para ejecutar.',
      },
      {
        q: '¿Cuánto tiempo necesita una activación bien producida?',
        a: 'Depende del alcance, pero hay que contemplar permisos, contratación y formación del equipo antes del primer día en calle. Los proyectos comprimidos se ejecutan igual, pero dejan menos margen para corregir sobre la marcha.',
      },
    ],
  },

  {
    slug: 'sala-de-ventas-por-que-la-primera-visita-decide-el-cierre',
    status: 'published',
    title: 'Sala de ventas: por qué la primera visita decide',
    excerpt:
      'En vivienda, el cierre no se juega en la firma sino en los primeros veinte minutos de la visita. Qué hace que una sala de ventas convierta y otra no.',
    metaDescription:
      'Cómo convertir más en sala de ventas: qué mide una visita, por qué se pierden los leads calificados y qué cambiar en la experiencia del proyecto.',
    cover_url: '/media/activacion-02.jpg',
    location: 'Medellín',
    niches: ['inmobiliario'],
    keywords: [
      'sala de ventas inmobiliaria',
      'conversión leads inmobiliarios',
      'marketing proyectos de vivienda',
      'experiencia sala de ventas Medellín',
    ],
    publishedAt: '2026-08-26',
    body: `Comprar vivienda es la decisión financiera más grande que toma la mayoría de las familias. Nadie la resuelve en una visita. Pero casi todas las visitas definen si va a haber una segunda.

Eso convierte a la sala de ventas en el punto más caro del embudo: es donde llega el lead que ya costó dinero atraer, y donde se pierde con más facilidad.

## El problema no suele ser el proyecto

Cuando un proyecto no convierte, la primera reacción es revisar el precio o el producto. Muchas veces el problema está antes: en qué se encuentra la persona cuando llega.

Una sala que obliga a esperar sin contexto, un asesor que empieza por las especificaciones técnicas, una maqueta que no deja entender el entorno. Nada de eso aparece en el reporte de ventas, pero decide el tono de los primeros veinte minutos.

## Qué debería resolver una visita

La persona llega con tres preguntas, casi siempre en este orden:

- ¿Puedo pagar esto?
- ¿Cómo va a ser mi vida acá?
- ¿Confío en quien lo construye?

Las salas que convierten resuelven la primera rápido, porque hasta que no está resuelta la persona no escucha nada más. Las que no convierten empiezan por los acabados.

En vivienda VIS esto se acentúa: buena parte de la visita debería dedicarse a subsidio y crédito. Es información que el comprador no puede resolver solo y que difícilmente encuentra bien explicada en internet.

## Qué medir en una sala de ventas

El número de visitas no dice nada por sí solo. Estas cuatro cosas sí:

**Visitas agendadas contra visitas efectivas.** Cuánta gente que agendó realmente llegó. Una brecha grande indica un problema en la confirmación, no en el proyecto.

**Tiempo promedio de visita.** Las visitas muy cortas suelen significar que la persona descartó por precio en los primeros minutos. Vale la pena saber si el filtro previo está funcionando.

**Perfil de crédito calificado en sitio.** De los que visitaron, cuántos cumplían condiciones reales de compra. Es lo que separa el tráfico del lead.

**Segunda visita.** La métrica que mejor anticipa el cierre. Casi nadie compra en la primera; el porcentaje que vuelve dice más que cualquier encuesta de satisfacción.

## La activación fuera de la sala

Buena parte del trabajo ocurre antes de que la persona llegue. Una sala itinerante en el sector, presencia en ferias o una activación en el barrio donde está el proyecto cumplen dos funciones: acercan el proyecto a quien vive cerca y permiten calificar antes de invertir una visita completa.

El beneficio no es solo volumen. Es que la persona llega a la sala sabiendo aproximadamente qué va a encontrar, y eso acorta la conversación difícil.

## Lo que suele sobrar

Tres cosas aparecen en casi todas las salas y rara vez ayudan:

- Material impreso extenso que nadie lee y encarece el proyecto
- Recorridos virtuales que sustituyen a la maqueta en vez de complementarla
- Bases de datos infladas con contactos que nunca calificaron

La última es la más costosa: convierte el reporte comercial en ficción y hace imposible saber qué canal está funcionando.

## El seguimiento después de la visita

La mayoría de los proyectos pierde leads calificados en los días posteriores, no en la sala.

Una persona que visitó y no compró casi nunca dijo que no: dijo que lo iba a pensar. Lo que pase en las siguientes setenta y dos horas determina si vuelve. Un mensaje que retoma exactamente lo que quedó pendiente —la simulación de crédito, la fecha de entrega, la comparación con otra tipología— funciona mucho mejor que un recordatorio genérico del proyecto.

Eso exige que el asesor registre en qué quedó cada visita, no solo los datos de contacto. Sin ese registro, el seguimiento es el mismo para todos y se siente como publicidad.

Una sala de ventas no es un espacio de exhibición. Es el lugar donde una familia decide si puede confiarte la compra más grande de su vida. Diseñarla desde esa pregunta cambia casi todas las decisiones.`,
    faqs: [
      {
        q: '¿Qué métricas debe seguir una sala de ventas inmobiliaria?',
        a: 'Visitas agendadas contra efectivas, tiempo promedio de visita, perfil de crédito calificado en sitio y porcentaje de segundas visitas. Esta última es la que mejor anticipa el cierre, porque casi nadie compra en la primera visita.',
      },
      {
        q: '¿Por qué no convierten las visitas a sala de ventas?',
        a: 'Con frecuencia porque la visita empieza por especificaciones técnicas y acabados en lugar de resolver primero si la persona puede pagar el proyecto. Hasta que esa pregunta no está resuelta, el comprador no procesa el resto de la información.',
      },
      {
        q: '¿Qué debe priorizarse en una sala de ventas de vivienda VIS?',
        a: 'La explicación de subsidio y crédito. Es información que el comprador no puede resolver solo, que rara vez encuentra bien explicada en internet, y que determina si la compra es viable antes de hablar de producto.',
      },
      {
        q: '¿Sirven las activaciones fuera de la sala de ventas?',
        a: 'Sí, y no solo por volumen. Una sala itinerante o una activación en el sector permite calificar al interesado antes de invertir una visita completa, y hace que llegue a la sala sabiendo qué va a encontrar.',
      },
    ],
  },
]

async function main() {
  await loadEnv()
  const sql = neon(process.env.DATABASE_URL)
  const hoy = new Date().toISOString().slice(0, 10)

  for (const p of posts) {
    await sql`
      insert into posts (slug, status, title, excerpt, meta_description, body, cover_url,
                         author, location, keywords, faqs, published_at, updated_at)
      values (${p.slug}, ${p.status}, ${p.title}, ${p.excerpt}, ${p.metaDescription},
              ${p.body}, ${p.cover_url}, 'Contraste Agencia', ${p.location}, ${p.keywords},
              ${JSON.stringify(p.faqs)}::jsonb, ${p.publishedAt}, ${hoy})
      on conflict (slug) do update set
        status = excluded.status, title = excluded.title, excerpt = excluded.excerpt,
        meta_description = excluded.meta_description, body = excluded.body,
        cover_url = excluded.cover_url, location = excluded.location,
        keywords = excluded.keywords, faqs = excluded.faqs,
        published_at = excluded.published_at, updated_at = excluded.updated_at
    `
    await sql`delete from post_niches where post_slug = ${p.slug}`
    for (const n of p.niches) {
      await sql`insert into post_niches (post_slug, niche_id) values (${p.slug}, ${n}) on conflict do nothing`
    }
    const palabras = p.body.trim().split(/\s+/).length
    const subtitulos = (p.body.match(/^##\s+/gm) || []).length
    console.log(
      `✓ ${p.title}\n    ${palabras} palabras · ${subtitulos} subtítulos · ${p.faqs.length} FAQs · ${p.title.length} car. de título · ${p.metaDescription.length} de meta`,
    )
  }
}

main().catch((e) => {
  console.error('\n✗', e.message, '\n')
  process.exit(1)
})
