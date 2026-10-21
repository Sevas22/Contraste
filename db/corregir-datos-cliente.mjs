/**
 * Corrige en Neon los dos datos que rectificó el cliente el 2026-10-08:
 *
 *   · Contraste se creó en 2012, no en 2011.
 *   · La cobertura son las nueve principales ciudades de Colombia, no una
 *     lista de tres con un «y otras ciudades» detrás.
 *
 *   node db/corregir-datos-cliente.mjs            → muestra qué cambiaría
 *   node db/corregir-datos-cliente.mjs --escribir → lo aplica
 *
 * Hace falta porque el texto de las cuatro landings de nicho y el de los
 * artículos vive en la base, no en el repo: cambiar `lib/dictionaries.ts`
 * arregla el home y las FAQs, pero no esto.
 *
 * No se nombran las nueve ciudades. El cliente dio la cifra, no la lista, y
 * publicar nombres que él no dijo es inventarse la cobertura de su empresa.
 *
 * Ojo: escribir aquí no invalida la caché de producción (`unstable_cache`,
 * tag `contenido`). Después hay que redesplegar o guardar algo en el panel.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

/** Del más específico al más general: el primero que encaja es el que manda. */
const REEMPLAZOS = [
  ['en operación desde 2011', 'en operación desde 2012'],
  ['opera desde 2011', 'opera desde 2012'],
  ['desde 2011', 'desde 2012'],

  [
    'en Medellín, Bogotá, Cali, Barranquilla y otras ciudades',
    'en las nueve principales ciudades de Colombia',
  ],
  [
    'en Bogotá, Cali, Barranquilla y otras ciudades de Colombia',
    'en las nueve principales ciudades de Colombia',
  ],
  [
    'en Bogotá, Cali, Barranquilla y Ciudad de México',
    'en las nueve principales ciudades de Colombia y en Ciudad de México',
  ],
  [
    'en Medellín, Bogotá, Cali, Barranquilla y Ciudad de México',
    'en las nueve principales ciudades de Colombia y en Ciudad de México',
  ],
]

/** Columnas de texto que pueden traer esas frases. */
const COLUMNAS = {
  niches: ['description', 'intro', 'body', 'faqs', 'translations'],
  posts: ['excerpt', 'meta_description', 'body', 'faqs'],
}
const CLAVE = { niches: 'id', posts: 'slug' }
/** Las que guardan JSON y hay que volver a castear al escribir. */
const JSONB = new Set(['faqs', 'translations'])

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

function aplicar(texto) {
  let salida = texto
  for (const [viejo, nuevo] of REEMPLAZOS) salida = salida.split(viejo).join(nuevo)
  return salida
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

  let total = 0

  for (const [tabla, columnas] of Object.entries(COLUMNAS)) {
    const clave = CLAVE[tabla]
    const filas = await sql.query(`select ${clave}, ${columnas.join(', ')} from ${tabla}`)

    for (const fila of filas) {
      const cambios = {}

      for (const col of columnas) {
        const valor = fila[col]
        if (valor === null || valor === undefined) continue
        const original = typeof valor === 'string' ? valor : JSON.stringify(valor)
        const nuevo = aplicar(original)
        if (nuevo !== original) cambios[col] = nuevo
      }

      if (!Object.keys(cambios).length) continue
      total++

      console.log(`\n${tabla} · ${fila[clave]}`)
      for (const [col, nuevo] of Object.entries(cambios)) {
        const antes = typeof fila[col] === 'string' ? fila[col] : JSON.stringify(fila[col])
        for (const [viejo] of REEMPLAZOS) {
          let i = -1
          while ((i = antes.indexOf(viejo, i + 1)) >= 0) {
            console.log(`  ${col}: …${antes.slice(Math.max(0, i - 60), i + viejo.length + 40).replace(/\n/g, ' ')}…`)
          }
        }
        void nuevo
      }

      if (!escribir) continue

      for (const [col, nuevo] of Object.entries(cambios)) {
        if (JSONB.has(col)) {
          await sql.query(`update ${tabla} set ${col} = $1::jsonb, updated_at = $2 where ${clave} = $3`, [
            nuevo,
            hoy,
            fila[clave],
          ])
        } else {
          await sql.query(`update ${tabla} set ${col} = $1, updated_at = $2 where ${clave} = $3`, [
            nuevo,
            hoy,
            fila[clave],
          ])
        }
      }
    }
  }

  if (!total) {
    console.log('\n✓ No queda nada por corregir en la base.\n')
    return
  }

  console.log(
    escribir
      ? `\n✓ ${total} registros corregidos en Neon. Sale en el sitio al redesplegar o al guardar algo en el panel.\n`
      : `\n${total} registros cambiarían. No se escribió nada: usa --escribir.\n`,
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
