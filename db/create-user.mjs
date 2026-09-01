/**
 * Crea o actualiza un usuario del panel.
 *   pnpm db:user correo@dominio.com "Nombre" "contraseña"
 *
 * La contraseña se hashea con scrypt y sal única antes de tocar la base.
 * Nunca se guarda en claro.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'
import { neon } from '@neondatabase/serverless'

const scryptAsync = promisify(scrypt)

async function loadEnv() {
  try {
    const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {}
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const derived = await scryptAsync(password, salt, 64)
  return `${salt}:${derived.toString('hex')}`
}

async function main() {
  await loadEnv()
  const [email, name, password] = process.argv.slice(2)

  if (!email || !password) {
    console.error('\nUso: pnpm db:user correo@dominio.com "Nombre" "contraseña"\n')
    process.exit(1)
  }
  if (password.length < 10) {
    console.error('\n✗ La contraseña debe tener al menos 10 caracteres.\n')
    process.exit(1)
  }
  if (!process.env.DATABASE_URL) {
    console.error('\n✗ Falta DATABASE_URL en .env.local\n')
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)
  const hash = await hashPassword(password)

  await sql`
    insert into users (email, name, password_hash)
    values (${email.toLowerCase().trim()}, ${name ?? ''}, ${hash})
    on conflict (email) do update set
      name = excluded.name, password_hash = excluded.password_hash
  `
  console.log(`\n✓ Usuario listo: ${email}\n  Entra en /login\n`)
}

main().catch((e) => {
  console.error('\n✗', e.message, '\n')
  process.exit(1)
})
