'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import type { MediaType } from '@/lib/content'
import { SectionLabel } from './brand-mark'
import { track } from '@/lib/track'

type Props = {
  mediaType: MediaType
  youtubeId: string
  mediaUrl: string
  poster: string
  title: string
}

/**
 * Reproductor único para los tres formatos que admite el panel:
 * YouTube (fachada con clic para cargar), MP4 subido y MP3 subido.
 */
export function EpisodePlayer({ mediaType, youtubeId, mediaUrl, poster, title }: Props) {
  const [active, setActive] = useState(false)
  // Un play por visita: pausar y reanudar no es otra reproducción
  const medido = useRef(false)
  const alReproducir = (proveedor: string) => {
    if (medido.current) return
    medido.current = true
    track('podcast_play', { video_title: title, video_provider: proveedor })
  }

  if (mediaType === 'audio' && mediaUrl) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid gap-6 p-6 sm:grid-cols-[180px_1fr] sm:items-center sm:p-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            {poster ? (
              <Image src={poster} alt="" fill sizes="180px" className="object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center text-muted-foreground">
                <Play className="size-10" />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <SectionLabel>Episodio en audio</SectionLabel>
            <p className="mt-3 text-lg font-bold leading-snug">{title}</p>
            {/* Controles nativos: accesibles por teclado y sin JS extra */}
            <audio
              controls
              preload="metadata"
              className="mt-6 w-full"
              src={mediaUrl}
              onPlay={() => alReproducir('audio')}
            >
              Tu navegador no soporta la reproducción de audio.{' '}
              <a href={mediaUrl}>Descargar el episodio</a>.
            </audio>
          </div>
        </div>
      </div>
    )
  }

  if (mediaType === 'video' && mediaUrl) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
        <video
          controls
          preload="metadata"
          poster={poster || undefined}
          className="size-full"
          src={mediaUrl}
          onPlay={() => alReproducir('video')}
        >
          Tu navegador no soporta la reproducción de video.{' '}
          <a href={mediaUrl}>Descargar el episodio</a>.
        </video>
      </div>
    )
  }

  if (!youtubeId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Sin medio vinculado
      </div>
    )
  }

  // Fachada de YouTube: el embed pesa ~1 MB de JS, así que sólo carga al hacer clic
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            alReproducir('youtube')
            setActive(true)
          }}
          className="group absolute inset-0 size-full cursor-pointer"
          aria-label={`Reproducir: ${title}`}
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          )}
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition group-hover:scale-110">
            <Play className="ml-1 size-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}
