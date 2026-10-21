/**
 * Baja las fotos de las redes de Contraste y las deja listas para el blog.
 *
 *   node db/descargar-imagenes.mjs           → revisa la lista, no descarga
 *   node db/descargar-imagenes.mjs --bajar   → descarga, normaliza y guarda
 *   node db/descargar-imagenes.mjs --bajar --forzar → rehace las que ya existen
 *
 * Lee `db/imagenes-redes.json`, donde cada entrada es:
 *
 *   {
 *     "destino": "chirimia-yarumal",         → public/media/blog/<destino>.jpg
 *     "origen":  "https://… | C:/ruta/foto.jpg",
 *     "pie":     "Texto que va como alt y como pie de foto",
 *     "fuente":  "https://www.instagram.com/…/"   (opcional, para el crédito)
 *   }
 *
 * Por qué se re-alojan en vez de enlazar la URL original: las direcciones del
 * CDN de Instagram van firmadas y caducan en días, así que un artículo que
 * apunte allí se queda sin imagen sin que nadie se entere. Y las de YouTube no
 * caducan pero dependen de que el vídeo siga publicado.
 *
 * Todo se normaliza a 1600×1067 (3:2) porque `Prose` pinta las imágenes del
 * cuerpo con esa proporción fija: así el recorte se decide aquí, una vez, y no
 * en cada pantalla. Las fotos verticales de un reel pierden parte del alto,
 * que es el precio de que la columna de lectura mantenga su ritmo.
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ANCHO = 1600
const ALTO = 1067
const DESTINO = path.join(process.cwd(), 'public', 'media', 'blog')
const LISTA = path.join(process.cwd(), 'db', 'imagenes-redes.json')
const TEMPORAL = path.join(process.cwd(), '.imagenes-tmp')

const bajar = process.argv.includes('--bajar')
const forzar = process.argv.includes('--forzar')

/** ffmpeg no siempre está en el PATH de Git Bash recién instalado por winget. */
function buscarFfmpeg() {
  return new Promise((resolve) => {
    const p = spawn('ffmpeg', ['-version'])
    p.on('error', () => resolve(null))
    p.on('close', (code) => resolve(code === 0 ? 'ffmpeg' : null))
  })
}

function correr(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args)
    let err = ''
    p.stderr.on('data', (d) => (err += d))
    p.on('error', reject)
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err.split('\n').slice(-6).join('\n')))))
  })
}

async function main() {
  let lista
  try {
    lista = JSON.parse(await readFile(LISTA, 'utf8'))
  } catch {
    console.error(`
✗ Falta ${path.relative(process.cwd(), LISTA)}. Créalo con la lista de fotos.
`)
    process.exit(1)
  }

  const ffmpeg = await buscarFfmpeg()
  const problemas = []
  const vistos = new Set()

  for (const item of lista) {
    if (!item.destino || !/^[a-z0-9-]+$/.test(item.destino))
      problemas.push(`destino inválido: ${JSON.stringify(item.destino)}`)
    if (vistos.has(item.destino)) problemas.push(`destino repetido: ${item.destino}`)
    vistos.add(item.destino)
    if (!item.origen) problemas.push(`${item.destino}: sin origen`)
    if (!item.pie || item.pie.trim().length < 15)
      problemas.push(`${item.destino}: el pie es el alt de la imagen, no puede ir vacío ni ser de dos palabras`)
    if (item.origen && !/^https?:\/\//i.test(item.origen) && !existsSync(item.origen))
      problemas.push(`${item.destino}: no existe el archivo ${item.origen}`)
  }

  if (problemas.length) {
    console.error('\n✗ ' + problemas.join('\n✗ ') + '\n')
    process.exit(1)
  }

  console.log(`${lista.length} imágenes en la lista. Destino: public/media/blog/\n`)

  if (!bajar) {
    for (const item of lista) {
      const ya = existsSync(path.join(DESTINO, `${item.destino}.jpg`))
      console.log(`  ${ya ? '•' : '+'} ${item.destino}.jpg ${ya ? '(ya está)' : ''}`)
    }
    console.log('\nNo se descargó nada. Usa --bajar.')
    return
  }

  if (!ffmpeg) {
    console.error(`
✗ No encuentro ffmpeg en el PATH. Si se instaló con winget, está en
  %LOCALAPPDATA%/Microsoft/WinGet/Packages/Gyan.FFmpeg_*/ffmpeg-*/bin/
`)
    process.exit(1)
  }

  await mkdir(DESTINO, { recursive: true })
  await mkdir(TEMPORAL, { recursive: true })

  let hechas = 0
  let saltadas = 0

  for (const item of lista) {
    const final = path.join(DESTINO, `${item.destino}.jpg`)
    if (existsSync(final) && !forzar) {
      saltadas++
      continue
    }

    const crudo = path.join(TEMPORAL, `${item.destino}.bin`)

    try {
      if (/^https?:\/\//i.test(item.origen)) {
        const res = await fetch(item.origen, {
          headers: {
            // Sin user agent de navegador, los CDN de Instagram y YouTube
            // devuelven 403 a una petición de servidor.
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
            accept: 'image/avif,image/webp,image/jpeg,image/png,*/*',
          },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const buf = Buffer.from(await res.arrayBuffer())
        if (buf.length < 5000) throw new Error(`respuesta de ${buf.length} bytes, no parece una foto`)
        await writeFile(crudo, buf)
      } else {
        await writeFile(crudo, await readFile(item.origen))
      }

      await correr(ffmpeg, [
        '-y',
        '-i',
        crudo,
        '-vf',
        `scale=${ANCHO}:${ALTO}:force_original_aspect_ratio=increase,crop=${ANCHO}:${ALTO}`,
        '-q:v',
        '4',
        final,
      ])

      console.log(`✓ ${item.destino}.jpg`)
      hechas++
    } catch (error) {
      console.error(`✗ ${item.destino}: ${error.message}`)
    }
  }

  await rm(TEMPORAL, { recursive: true, force: true })

  console.log(
    `\n${hechas} descargadas${saltadas ? `, ${saltadas} ya estaban (usa --forzar para rehacerlas)` : ''}.` +
      `\nEn el cuerpo del artículo se usan así:\n\n    ![Pie de la foto](/media/blog/<destino>.jpg)\n`,
  )
}

main().catch((error) => {
  console.error('\n✗', error.message, '\n')
  process.exit(1)
})
