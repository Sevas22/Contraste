import { neon } from '@neondatabase/serverless'

/**
 * Cliente de Neon.
 *
 * El driver `neon()` habla por HTTP, no por TCP: es lo que hace que funcione
 * en las funciones serverless de Vercel, donde no se puede mantener un pool
 * de conexiones vivo entre invocaciones.
 *
 * Se usa siempre con plantillas etiquetadas —`sql`... ${valor}``— porque así
 * los valores viajan como parámetros y no como texto concatenado. Nunca
 * construyas una consulta con interpolación de strings.
 *
 * ── Reintentos ──────────────────────────────────────────────────────────
 * Neon suspende el cómputo cuando la base lleva un rato inactiva. El primer
 * acceso después de eso tarda varios segundos y a veces supera el timeout de
 * conexión, lo que tumba la página con un 500 aunque no haya nada roto.
 * Se reintenta con espera creciente sólo ante fallos de red o de arranque;
 * un error de SQL (tabla inexistente, restricción violada) se propaga tal cual,
 * porque reintentarlo daría el mismo resultado tres veces.
 */

/**
 * `CONTENT_SOURCE=json` fuerza el respaldo de `content/*.json` aunque haya
 * `DATABASE_URL`. Sirve para probar en local contenido nuevo antes de cargarlo
 * a Neon, que es la misma base que lee producción. Vaciar `DATABASE_URL` no
 * basta: Next vuelve a rellenarla desde `.env.local`.
 */
const connectionString =
  process.env.CONTENT_SOURCE === 'json' ? undefined : process.env.DATABASE_URL

export const isDatabaseEnabled = Boolean(connectionString)

const MAX_ATTEMPTS = 3

function isTransient(error: unknown): boolean {
  const message = String((error as Error)?.message ?? error).toLowerCase()
  return (
    message.includes('fetch failed') ||
    message.includes('timeout') ||
    message.includes('econnreset') ||
    message.includes('enotfound') ||
    message.includes('socket') ||
    message.includes('error connecting to database')
  )
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function run<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (!isTransient(error) || attempt === MAX_ATTEMPTS) throw error
      // 400 ms, 800 ms: suficiente para que el cómputo de Neon despierte
      await wait(400 * 2 ** (attempt - 1))
    }
  }

  throw lastError
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let client: any = null

export function sql(): any {
  if (!connectionString) {
    throw new Error(
      'Falta DATABASE_URL. Copia .env.example a .env.local y pon la cadena de conexión de Neon.',
    )
  }

  if (!client) {
    const base = neon(connectionString)

    // Envoltura que conserva las dos formas de uso del driver:
    // plantilla etiquetada —sql`...`— y sql.query('...', [params])
    const wrapped: any = (strings: TemplateStringsArray, ...values: unknown[]) =>
      run(() => (base as any)(strings, ...values))
    wrapped.query = (query: string, params?: unknown[]) =>
      run(() => (base as any).query(query, params))

    client = wrapped
  }

  return client
}
