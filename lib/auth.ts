import { createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { sql } from './db'

/**
 * Autenticación del panel.
 *
 * Sin dependencias externas: scrypt y HMAC vienen en Node. Las contraseñas se
 * guardan hasheadas con sal por usuario, y la sesión es una cookie firmada
 * (no cifrada: no contiene nada secreto, sólo el correo y la expiración, y la
 * firma impide manipularla).
 */

const scryptAsync = promisify(scrypt)

export const SESSION_COOKIE = 'contraste_session'
const SESSION_DAYS = 7

function secret(): string {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) {
    throw new Error(
      'Falta AUTH_SECRET (mínimo 32 caracteres). Genera uno con:\n' +
        '  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
    )
  }
  return value
}

/* ── Contraseñas ──────────────────────────────────────────────── */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derived = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}:${derived.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = (await scryptAsync(password, salt, 64)) as Buffer
  const expected = Buffer.from(hash, 'hex')
  // Comparación en tiempo constante: evita filtrar el hash por temporización
  if (expected.length !== derived.length) return false
  return timingSafeEqual(expected, derived)
}

/* ── Sesión ───────────────────────────────────────────────────── */

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

function createToken(email: string): string {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function readToken(token: string | undefined): { email: string } | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  // Verificar la firma ANTES de confiar en el contenido
  const expected = sign(payload)
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null
  }

  try {
    const { email, expiresAt } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (!email || typeof expiresAt !== 'number' || Date.now() > expiresAt) return null
    return { email }
  } catch {
    return null
  }
}

/* ── API para Server Components y Actions ─────────────────────── */

export async function getSession(): Promise<{ email: string } | null> {
  try {
    return readToken((await cookies()).get(SESSION_COOKIE)?.value)
  } catch {
    return null
  }
}

export async function startSession(email: string): Promise<void> {
  ;(await cookies()).set(SESSION_COOKIE, createToken(email), {
    httpOnly: true, // no accesible desde JavaScript: mitiga el robo por XSS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function endSession(): Promise<void> {
  ;(await cookies()).delete(SESSION_COOKIE)
}

/* ── Usuarios ─────────────────────────────────────────────────── */

export async function authenticate(email: string, password: string): Promise<boolean> {
  const rows = (await sql()`
    select email, password_hash from users where email = ${email.toLowerCase().trim()}
  `) as { email: string; password_hash: string }[]

  const user = rows[0]
  if (!user) {
    // Se hashea igual aunque no exista el usuario: si respondiéramos de
    // inmediato, el tiempo de respuesta revelaría qué correos están registrados.
    await hashPassword(password)
    return false
  }

  const ok = await verifyPassword(password, user.password_hash)
  if (ok) {
    await sql()`update users set last_login_at = now() where email = ${user.email}`
  }
  return ok
}

export async function countUsers(): Promise<number> {
  const rows = (await sql()`select count(*)::int as count from users`) as { count: number }[]
  return rows[0]?.count ?? 0
}
