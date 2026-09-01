'use server'

import { redirect } from 'next/navigation'
import { authenticate, endSession, startSession } from '@/lib/auth'

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) redirect('/login?error=credenciales')

  let ok = false
  try {
    ok = await authenticate(email, password)
  } catch {
    // Fallo de configuración (sin DATABASE_URL o sin AUTH_SECRET): no se
    // distingue del error de credenciales hacia el usuario, pero sí en el log.
    redirect('/login?error=servidor')
  }

  if (!ok) redirect('/login?error=credenciales')

  await startSession(email)
  redirect('/admin')
}

export async function logout() {
  await endSession()
  redirect('/login')
}
