/**
 * Cierra el enlazado interno del blog.
 *
 * El problema: los 17 artículos de las tandas 1 a 3 son los que tienen
 * antigüedad e impresiones en Google, y no enlazan a ninguno de los 25 que
 * se publicaron después. El enlace interno es direccional, así que toda esa
 * autoridad se queda parada en artículos informativos mientras los nuevos
 * —los que traen intención de contratar— arrancan de cero.
 *
 * Este script añade al final de cada artículo, justo antes de «Fuentes», un
 * bloque «Seguir leyendo» con tres enlaces elegidos a mano:
 *
 *   · uno del mismo tema, para que la visita siga dentro del tema;
 *   · uno comercial (qué hace una agencia, costos, ciudad), que es donde se
 *     convierte;
 *   · uno complementario, normalmente de los nuevos.
 *
 *   node db/enlaces-relacionados.mjs            → muestra qué cambiaría
 *   node db/enlaces-relacionados.mjs --escribir → lo aplica
 *
 * Es idempotente: si el bloque ya está, lo reemplaza en vez de duplicarlo.
 * Conviene volver a correrlo después de cualquier `seed-posts-conexion.mjs`,
 * porque ese upsert reescribe el body entero con el del archivo .mjs.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

const T = {
  queEsBtl: ['que-es-btl-significado-y-ejemplos', 'Qué es BTL: significado y ejemplos reales'],
  atlBtl: ['atl-y-btl-diferencias-y-actividades', 'ATL y BTL: diferencias y cuándo usar cada uno'],
  ejemplos: ['activaciones-de-marca-ejemplos-btl-antioquia', 'Activaciones de marca: ejemplos reales'],
  centros: ['activaciones-btl-centros-comerciales-y-ferias', 'Activaciones en centros comerciales y ferias'],
  estrategias: ['estrategias-btl-activaciones-con-resultados', 'Estrategias BTL: activaciones con resultados'],
  queHace: ['que-hace-una-agencia-btl', 'Qué hace una agencia BTL'],
  costos: ['cuanto-cuesta-una-activacion-btl', 'Cuánto cuesta una activación BTL'],
  equipo: ['promotoras-e-impulsadoras-equipo-de-calle', 'Promotoras e impulsadoras: el equipo de calle'],
  vivienda: ['experiencias-que-venden-vivienda', 'Experiencias que venden vivienda'],
  leads: ['del-lead-a-la-venta-despues-de-la-activacion', 'Del lead a la venta'],
  agenciaFirmar: ['que-pedirle-a-una-agencia-btl-antes-de-firmar', 'Qué pedirle a una agencia BTL antes de firmar'],
  sala: ['sala-de-ventas-por-que-la-primera-visita-decide-el-cierre', 'Sala de ventas: la primera visita decide'],
  licores: ['publicidad-btl-para-licores', 'Publicidad BTL para licores'],
  degustaciones: ['degustaciones-y-sampling-en-punto-de-venta', 'Degustaciones y sampling en punto de venta'],
  tat: ['trade-marketing-en-canal-tradicional-tat', 'Trade marketing en canal tradicional'],
  tech: ['activaciones-btl-para-marcas-de-tecnologia', 'Activaciones BTL para marcas de tecnología'],
  pop: ['material-pop-que-es-y-como-auditarlo', 'Material POP: qué es y por qué no se instala'],
  medellin: ['agencia-btl-en-medellin', 'Agencia BTL en Medellín'],
  campanas: ['campanas-btl-del-brief-a-la-calle', 'Campañas BTL: del brief a la calle'],
  street: ['street-marketing-y-marketing-de-guerrilla', 'Street marketing y marketing de guerrilla'],
  lanzamiento: ['lanzamiento-de-producto-con-activaciones-btl', 'Lanzamiento de producto'],
  produccion: ['produccion-de-eventos-btl-que-incluye', 'Producción de eventos BTL'],
  experiencial: ['marketing-experiencial-que-es-y-como-se-disena', 'Marketing experiencial'],
  finDeAno: ['activaciones-btl-de-fin-de-ano', 'Activaciones BTL de fin de año'],
  roadshow: ['roadshow-de-marca-que-es-y-cuando-conviene', 'Roadshow de marca'],
  digital: ['btl-y-marketing-digital-como-se-potencian', 'BTL y marketing digital'],
  metricas: ['como-medir-una-activacion-btl-sin-metricas-de-vanidad', 'Cómo medir una activación BTL'],
  bogota: ['agencia-btl-en-bogota', 'Agencia BTL en Bogotá'],
  retail: ['activaciones-btl-en-supermercados-y-retail', 'Activaciones BTL en supermercados y retail'],
  stands: ['stands-para-ferias-que-funcionan', 'Stands para ferias que funcionan'],
  embajadores: ['embajadores-de-marca-brand-ambassador', 'Embajadores de marca'],
  vsEventos: ['agencia-btl-o-agencia-de-eventos', 'Agencia BTL o agencia de eventos'],
  patrocinio: ['activacion-de-patrocinio', 'Activación de patrocinio'],
  endomarketing: ['endomarketing-activaciones-hacia-adentro', 'Endomarketing: activaciones hacia adentro'],
  merchandising: ['visual-merchandising-en-punto-de-venta', 'Visual merchandising en punto de venta'],
  auditoria: ['auditoria-de-punto-de-venta', 'Auditoría de punto de venta'],
  regreso: ['activaciones-btl-regreso-a-clases', 'Activaciones BTL para el regreso a clases'],
  cali: ['agencia-btl-en-cali', 'Agencia BTL en Cali'],
  mecanicas: ['mecanicas-promocionales-btl', 'Mecánicas promocionales'],
  servicios: ['btl-para-marcas-de-servicios', 'BTL para bancos, seguros y telecomunicaciones'],
  puerta: ['sampling-puerta-a-puerta', 'Sampling puerta a puerta'],
  universidades: ['activaciones-btl-en-universidades', 'Activaciones BTL en universidades'],
}

/**
 * Tres destinos por artículo. El orden importa: el primero sigue el tema, el
 * segundo lleva a la decisión de contratar y el tercero abre a otro ángulo.
 */
const RELACIONADOS = {
  // Fundamentos: la gente llega por una definición y hay que llevarla al servicio.
  queEsBtl: ['experiencial', 'queHace', 'ejemplos'],
  atlBtl: ['queEsBtl', 'campanas', 'digital'],
  experiencial: ['queEsBtl', 'queHace', 'patrocinio'],
  estrategias: ['metricas', 'queHace', 'auditoria'],
  metricas: ['estrategias', 'agenciaFirmar', 'auditoria'],
  ejemplos: ['queEsBtl', 'medellin', 'produccion'],

  // Contratación.
  queHace: ['vsEventos', 'costos', 'agenciaFirmar'],
  costos: ['agenciaFirmar', 'queHace', 'produccion'],
  agenciaFirmar: ['costos', 'vsEventos', 'metricas'],
  vsEventos: ['queHace', 'produccion', 'costos'],
  medellin: ['bogota', 'cali', 'queHace'],
  bogota: ['medellin', 'cali', 'retail'],
  cali: ['medellin', 'bogota', 'street'],

  // Punto de venta.
  tat: ['retail', 'merchandising', 'auditoria'],
  retail: ['tat', 'merchandising', 'mecanicas'],
  pop: ['merchandising', 'auditoria', 'tat'],
  merchandising: ['pop', 'auditoria', 'retail'],
  auditoria: ['merchandising', 'pop', 'metricas'],
  degustaciones: ['puerta', 'retail', 'mecanicas'],
  puerta: ['degustaciones', 'lanzamiento', 'metricas'],
  mecanicas: ['degustaciones', 'retail', 'metricas'],

  // Eventos y producción.
  centros: ['stands', 'produccion', 'patrocinio'],
  stands: ['centros', 'produccion', 'patrocinio'],
  produccion: ['costos', 'roadshow', 'stands'],
  roadshow: ['produccion', 'medellin', 'campanas'],
  patrocinio: ['stands', 'experiencial', 'metricas'],
  lanzamiento: ['campanas', 'degustaciones', 'produccion'],
  campanas: ['costos', 'metricas', 'mecanicas'],

  // Equipo.
  equipo: ['embajadores', 'queHace', 'endomarketing'],
  embajadores: ['equipo', 'servicios', 'experiencial'],
  endomarketing: ['equipo', 'lanzamiento', 'experiencial'],

  // Sectores.
  licores: ['degustaciones', 'tat', 'mecanicas'],
  tech: ['servicios', 'universidades', 'stands'],
  servicios: ['tech', 'embajadores', 'leads'],
  vivienda: ['sala', 'leads', 'inmobiliarioLanzamiento'],
  sala: ['vivienda', 'leads', 'experiencial'],
  leads: ['sala', 'digital', 'metricas'],

  // Formatos y temporada.
  street: ['experiencial', 'cali', 'puerta'],
  digital: ['leads', 'metricas', 'experiencial'],
  finDeAno: ['regreso', 'retail', 'campanas'],
  regreso: ['finDeAno', 'retail', 'merchandising'],
  universidades: ['mecanicas', 'tech', 'degustaciones'],
}

// `vivienda` apuntaba a una clave que no existe; se corrige aquí para no
// tocar el mapa de arriba, que se lee mejor agrupado.
RELACIONADOS.vivienda = ['sala', 'leads', 'lanzamiento']

const TITULO = '## Seguir leyendo'
const FUENTES = '## Fuentes'

function bloque(claves) {
  const lineas = claves
    .map((k) => T[k])
    .filter(Boolean)
    .map(([slug, titulo]) => `- [${titulo}](/blog/${slug})`)
  return `${TITULO}\n\n${lineas.join('\n')}`
}

/** Quita un bloque anterior, si lo hubiera, y pone el nuevo antes de Fuentes. */
function conBloque(body, nuevo) {
  let limpio = body
  const yaEsta = limpio.indexOf(TITULO)
  if (yaEsta >= 0) {
    const hastaFuentes = limpio.indexOf(FUENTES, yaEsta)
    limpio =
      hastaFuentes >= 0
        ? limpio.slice(0, yaEsta) + limpio.slice(hastaFuentes)
        : limpio.slice(0, yaEsta).trimEnd()
  }

  const i = limpio.indexOf(FUENTES)
  if (i >= 0) return limpio.slice(0, i) + nuevo + '\n\n' + limpio.slice(i)
  return limpio.trimEnd() + '\n\n' + nuevo
}

async function cargarEntorno() {
  try {
    const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
    for (const linea of raw.split('\n')) {
      const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    /* sin .env.local */
  }
}

async function main() {
  await cargarEntorno()
  const escribir = process.argv.includes('--escribir')

  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL.\n')
    process.exit(1)
  }
  const sql = neon(process.env.DATABASE_URL)
  const hoy = new Date().toISOString().slice(0, 10)

  const porSlug = new Map(Object.entries(T).map(([clave, [slug]]) => [slug, clave]))
  const filas = await sql`select slug, body from posts where status = 'published'`

  let tocados = 0
  const sinMapa = []

  for (const fila of filas) {
    const clave = porSlug.get(fila.slug)
    const destinos = clave && RELACIONADOS[clave]
    if (!destinos) {
      sinMapa.push(fila.slug)
      continue
    }

    // Nadie se enlaza a sí mismo.
    const limpios = destinos.filter((d) => T[d] && T[d][0] !== fila.slug).slice(0, 3)
    const nuevo = bloque(limpios)
    const body = conBloque(fila.body, nuevo)
    if (body === fila.body) continue

    tocados++
    console.log(`${fila.slug}\n    → ${limpios.map((d) => T[d][0]).join(', ')}`)

    if (escribir) {
      await sql`update posts set body = ${body}, updated_at = ${hoy} where slug = ${fila.slug}`
    }
  }

  if (sinMapa.length) console.log(`\nSin relacionados definidos: ${sinMapa.join(', ')}`)

  console.log(
    escribir
      ? `\n✓ ${tocados} artículos con bloque de enlaces. Sale en el sitio al redesplegar.\n`
      : `\n${tocados} artículos cambiarían. No se escribió nada: usa --escribir.\n`,
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
