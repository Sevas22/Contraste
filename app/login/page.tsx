import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { getSession } from '@/lib/auth'
import { login } from './actions'

export const metadata: Metadata = {
  title: 'Entrar al panel',
  robots: { index: false, follow: false },
}

type Props = { searchParams: Promise<{ error?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  if (await getSession()) redirect('/admin')
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Logo width={160} />

        <h1 className="display mt-10 text-3xl">Panel administrativo</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Entra con la cuenta que se creó para gestionar el contenido de Contraste.
        </p>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error === 'credenciales'
              ? 'Correo o contraseña incorrectos.'
              : 'No se pudo iniciar sesión. Revisa la configuración del servidor.'}
          </p>
        )}

        <form action={login} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold">Correo</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              autoFocus
              className="w-full rounded-lg border border-border bg-card px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold">Contraseña</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-border bg-card px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-accent"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110"
          >
            <LogIn className="size-4" />
            Entrar
          </button>
        </form>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          ¿Sin cuenta todavía? Se crean desde la terminal:
          <code className="mt-2 block font-mono text-[11px]">
            pnpm db:user correo@contrasteagencia.com &quot;Nombre&quot; &quot;contraseña&quot;
          </code>
        </p>
      </div>
    </div>
  )
}
