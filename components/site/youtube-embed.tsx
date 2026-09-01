'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Fachada de YouTube: muestra la miniatura y sólo carga el iframe al hacer clic.
 * El embed de YouTube pesa ~1 MB de JS y arrastra el LCP; el WordPress actual
 * lo carga con autoplay en cada visita.
 */
export function YouTubeEmbed({
  id,
  title,
  poster,
}: {
  id: string
  title: string
  poster: string
}) {
  const [active, setActive] = useState(false)

  if (!id) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Sin video vinculado
      </div>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 size-full cursor-pointer"
          aria-label={`Reproducir: ${title}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition group-hover:scale-110">
            <Play className="ml-1 size-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}
