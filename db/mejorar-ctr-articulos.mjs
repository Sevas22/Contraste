/**
 * Sube el CTR de los dos artículos que YA posicionan en Google pero no se
 * llevan clics (datos de Search Console, 28 días a 2026-10-21):
 *
 *   que-es-btl-significado-y-ejemplos   1.298 + 1.154 + 454 + 341 + 309 + 207
 *                                       impresiones · 3 clics · posición ~8
 *   material-pop-que-es-y-como-auditarlo   197 + 135 impresiones · 0 clics
 *
 * Dos cambios, por las dos razones que explican ese cero:
 *
 * 1. TÍTULO Y META. En «btl que es» el sitio sale quinto, debajo de UNIR,
 *    HubSpot, MKS y Wikipedia, y los cinco prometen lo mismo: una definición.
 *    Ganando el nombre más conocido. Los nuevos títulos prometen lo que esos
 *    cuatro no pueden dar —casos reales en Colombia, y el problema concreto
 *    del POP— y las metas dejan de resolver la duda en el propio fragmento,
 *    que es la otra razón por la que nadie entra.
 *
 * 2. UN PUENTE A LA INTENCIÓN COMERCIAL. Las 298 consultas que traen
 *    impresiones son todas informativas: quien llega buscaba una definición,
 *    no una agencia. El párrafo que se inserta tras la entrada separa las dos
 *    intenciones en la primera pantalla y manda a quien viene a contratar
 *    hacia las páginas que venden, en vez de enterrar el enlace a mitad del
 *    texto.
 *
 *   node db/mejorar-ctr-articulos.mjs            → muestra qué cambiaría
 *   node db/mejorar-ctr-articulos.mjs --escribir → lo aplica
 *
 * Es idempotente: si el puente ya está puesto, no lo duplica.
 *
 * Toca sólo estos dos slugs, campo a campo, en vez de volver a correr el seed
 * de su tanda: ese upsert pisaría cualquier cosa que el cliente haya editado
 * desde el panel. Los mismos textos se dejan también en `db/posts-conexion.mjs`
 * y `db/posts-semana-3.mjs`, para que un seed futuro no los revierta.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

const CAMBIOS = [
  {
    slug: 'que-es-btl-significado-y-ejemplos',
    title: 'Qué es BTL: significado y ejemplos reales en Colombia',
    metaDescription:
      'Qué significa BTL en marketing, qué tipos de acciones incluye y ejemplos reales de activaciones ejecutadas en Colombia, contados por la agencia que las hizo.',
    puente:
      '**¿Buscas la definición o buscas quién lo haga?** Si lo que necesitas es contratar, ve directo a [Qué hace una agencia BTL](/blog/que-hace-una-agencia-btl), a [Cuánto cuesta una activación BTL](/blog/cuanto-cuesta-una-activacion-btl) o a [Agencia BTL en Medellín](/blog/agencia-btl-en-medellin). Si quieres entender primero el concepto, sigue leyendo: esto lo escribe una agencia que ejecuta y mide estas activaciones en Colombia.',
  },
  {
    slug: 'material-pop-que-es-y-como-auditarlo',
    title: 'Material POP: qué es, tipos y por qué no se instala',
    metaDescription:
      'Qué es el material POP y qué tipos existen, por qué una parte nunca llega a instalarse en el punto de venta y cómo auditar su implementación en ruta.',
    puente:
      '**¿Necesitas que alguien audite tu material en el punto?** Eso es parte del servicio de [trade marketing en canal tradicional](/blog/trade-marketing-en-canal-tradicional-tat) y de las campañas de [consumo masivo](/marketing-btl-consumo-masivo-mas-trafico-y-ventas). Si lo que buscas es entender qué es el POP y qué tipos hay, sigue leyendo.',
  },
]

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

/** Mete el puente justo después del párrafo de entrada. */
function conPuente(body, puente) {
  if (body.includes(puente.slice(0, 60))) return null // ya está
  const bloques = body.split(/\n{2,}/)
  bloques.splice(1, 0, puente)
  return bloques.join('\n\n')
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

  for (const c of CAMBIOS) {
    const filas = await sql`select slug, title, meta_description, body from posts where slug = ${c.slug}`
    if (!filas.length) {
      console.error(`✗ ${c.slug}: no está en la base`)
      continue
    }
    const actual = filas[0]
    const body = conPuente(actual.body, c.puente)

    console.log(`\n${c.slug}`)
    console.log(`  título  ${actual.title.length} → ${c.title.length}`)
    console.log(`     antes: ${actual.title}`)
    console.log(`     ahora: ${c.title}`)
    console.log(`  meta    ${actual.meta_description.length} → ${c.metaDescription.length}`)
    console.log(`  puente: ${body ? 'se inserta tras la entrada' : 'ya estaba, no se toca'}`)

    if (!escribir) continue

    await sql`
      update posts
         set title = ${c.title},
             meta_description = ${c.metaDescription},
             body = ${body ?? actual.body},
             updated_at = ${hoy}
       where slug = ${c.slug}
    `
  }

  console.log(
    escribir
      ? '\n✓ Aplicado. Sale en el sitio al redesplegar.\n'
      : '\nNo se escribió nada. Usa --escribir.\n',
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
