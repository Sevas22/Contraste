'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCw } from 'lucide-react'
import { site } from '@/lib/site'

/**
 * Pantalla de error en tiempo de ejecución.
 *
 * Sin este archivo, un fallo en producción —la base de datos que no responde,
 * por ejemplo— muestra la pantalla genérica de Next, en inglés y sin salida.
 *
 * No se enseña el mensaje del error: puede llevar dentro rutas del servidor o
 * detalles de la consulta. El `digest` sí, porque es un identificador opaco
 * que permite encontrar la traza real en los registros de Vercel.
 *
 * Va sin cabecera ni pie a propósito: si lo que falló fue justamente la
 * consulta que los alimenta, volverían a fallar aquí y la pantalla de error
 * también se caería.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-accent-text">
          Algo se rompió
        </p>

        <h1 className="display mt-6 text-[clamp(2rem,5vw,3.4rem)]">
          No pudimos
          <br />
          <span className="text-accent">cargar esta página.</span>
        </h1>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          Es un fallo nuestro, no tuyo. Puedes reintentar; si sigue igual, escríbenos y lo
          revisamos.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-3 bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition hover:gap-5"
          >
            <RotateCw className="size-4" />
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-3 border-b-2 border-border pb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-foreground"
          >
            Ir al inicio
          </Link>
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-b-2 border-border pb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-foreground"
          >
            Avisarnos
          </a>
        </div>

        {error.digest && (
          <p className="mt-12 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
            Referencia del error: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
