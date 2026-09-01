'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Play, Layers } from 'lucide-react'
import type { InstagramPost } from '@/lib/types'

/**
 * Baldosa del feed.
 *
 * Si la publicación tiene clip re-alojado, el video arranca solo cuando entra
 * en pantalla —en silencio y en bucle, como en el propio Instagram— y se
 * detiene al salir. Se evita a propósito el embed oficial: trae su cabecera,
 * su botón de seguir y unos 600 KB de JS por post, y rompe el diseño del sitio.
 *
 * El `<video>` sólo se monta cuando el clip ya es visible: precargar cuatro o
 * más reels de golpe arruinaría la carga del home.
 */
export function InstagramTile({ post }: { post: InstagramPost }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [enPantalla, setEnPantalla] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !post.videoUrl) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => setEnPantalla(entry.isIntersecting),
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [post.videoUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (enPantalla) video.play().catch(() => {})
    else video.pause()
  }, [enPantalla])

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden border border-border bg-muted"
    >
      <div ref={ref} className="absolute inset-0">
        <Image
          src={post.imageUrl}
          alt={post.caption ? post.caption.slice(0, 120) : 'Publicación de Contraste en Instagram'}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {post.videoUrl && enPantalla && (
          <video
            ref={videoRef}
            src={post.videoUrl}
            poster={post.imageUrl}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>

      {/* Indicador de formato */}
      {post.mediaType !== 'image' && (
        <span className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white backdrop-blur">
          {post.mediaType === 'video' ? (
            <Play className="size-3.5 fill-current" />
          ) : (
            <Layers className="size-3.5" />
          )}
        </span>
      )}

      {post.caption && (
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/95 to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
          <span className="line-clamp-3 text-[11px] leading-relaxed text-white/85">
            {post.caption}
          </span>
        </span>
      )}
    </a>
  )
}
