import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ExternalLink, Gauge, Mic, Layers, FileText, LogOut } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { InstagramIcon } from '@/components/site/social-icons'
import { getSession } from '@/lib/auth'
import { logout } from '../login/actions'
import { SectionLabel } from '@/components/site/brand-mark'

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

const menu = [
  { href: '/admin', label: 'Resumen', Icon: Gauge },
  { href: '/admin/blog', label: 'Blog', Icon: FileText },
  { href: '/admin/episodios', label: 'Podcasts', Icon: Mic },
  { href: '/admin/nichos', label: 'Nichos', Icon: Layers },
  { href: '/admin/instagram', label: 'Instagram', Icon: InstagramIcon },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verificación real de la sesión (firma incluida). El middleware ya filtró
  // las peticiones sin cookie; esto es la segunda capa, la que de verdad valida.
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="border-b border-border bg-card px-6 py-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
        <Logo width={140} />

        <SectionLabel className="mt-10 hidden lg:block">Workspace</SectionLabel>

        <nav aria-label="Panel" className="mt-4 flex flex-wrap gap-2 lg:mt-5 lg:flex-col">
          {menu.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground lg:mt-6 lg:flex"
        >
          <ExternalLink className="size-3.5" />
          Ver el sitio
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4 lg:mt-6 lg:block lg:pt-5">
          <p className="truncate text-xs text-muted-foreground">{session?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground lg:mt-3"
            >
              <LogOut className="size-3.5" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-6 py-10 lg:px-12 lg:py-14">{children}</main>
    </div>
  )
}
