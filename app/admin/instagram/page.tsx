import Image from 'next/image'
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { getInstagramPosts } from '@/lib/content'
import { site } from '@/lib/site'
import { SectionLabel } from '@/components/site/brand-mark'
import {
  addInstagramPost,
  moveInstagramPost,
  removeInstagramPostAction,
  toggleInstagramPost,
} from './actions'

type Props = { searchParams: Promise<{ guardado?: string; error?: string }> }

const field =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-accent'

export default async function InstagramAdmin({ searchParams }: Props) {
  const { guardado, error } = await searchParams
  const posts = await getInstagramPosts()
  const visibles = posts.filter((p) => p.visible).length

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Redes</SectionLabel>
          <h1 className="display mt-4 text-4xl lg:text-5xl">Feed de Instagram</h1>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl">
            {visibles}
            <span className="text-sm text-muted-foreground">/{posts.length}</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">visibles</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-bold">Por qué se cargan a mano</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Instagram cerró el acceso público a los perfiles: hoy sólo se puede leer con un token
          oficial de la Graph API (cuenta Business vinculada a una página de Facebook, app en Meta
          for Developers y renovación cada 60 días). Mientras tanto, aquí controlas exactamente qué
          se muestra — que además suele verse mejor que un volcado automático del perfil.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          La imagen se guarda en nuestro almacenamiento a propósito: las URLs del CDN de Instagram
          llevan firma y caducan en días.
        </p>
      </div>

      {guardado && (
        <p className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          <Check className="size-4" />
          Publicación añadida al feed.
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error === 'enlace'
            ? 'El enlace no parece de Instagram. Debe ser del tipo instagram.com/p/… o /reel/…'
            : 'Falta la imagen de la publicación.'}
        </p>
      )}

      {/* Alta */}
      <form action={addInstagramPost} className="mt-8 rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-accent-text">
          Añadir publicación
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-xs font-bold">Enlace de la publicación</span>
            <span className="-mt-1 text-xs text-muted-foreground">
              Abre el post en Instagram y copia la URL. Acepta /p/, /reel/ y /tv/.
            </span>
            <input
              name="permalink"
              required
              placeholder="https://www.instagram.com/p/DAbCdEfGhIj/"
              className={field}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold">Imagen o portada</span>
            <span className="-mt-1 text-xs text-muted-foreground">
              Obligatoria. Si subes clip, esta imagen hace de póster. Máx. 8 MB.
            </span>
            <input
              type="file"
              name="image"
              required
              accept="image/jpeg,image/png,image/webp,image/avif"
              className={`${field} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground`}
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-xs font-bold">Clip de video (opcional)</span>
            <span className="-mt-1 text-xs leading-relaxed text-muted-foreground">
              Sube el MP4 del reel. Se reproduce dentro del diseño del sitio, sin
              cargar el reproductor de Instagram. Máximo 500 MB.
            </span>
            <input
              type="file"
              name="video"
              accept="video/mp4,video/webm,video/quicktime"
              className={`${field} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground`}
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold">Formato</span>
              <select name="mediaType" defaultValue="image" className={field}>
                <option value="image">Imagen</option>
                <option value="video">Video / Reel</option>
                <option value="carousel">Carrusel</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold">Fecha</span>
              <input type="date" name="postedAt" className={field} />
            </label>
          </div>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-xs font-bold">Texto</span>
            <span className="-mt-1 text-xs text-muted-foreground">
              Se muestra al pasar el cursor y es el texto alternativo de la imagen.
            </span>
            <textarea name="caption" rows={2} className={`${field} resize-y`} />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:brightness-110"
        >
          <Plus className="size-4" />
          Añadir al feed
        </button>
      </form>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          El feed está vacío. La sección no aparece en el home hasta que añadas la primera
          publicación.
        </p>
      ) : (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {posts.map((post, index) => (
            <li
              key={post.id}
              className={`flex gap-4 rounded-xl border border-border bg-card p-4 ${
                post.visible ? '' : 'opacity-50'
              }`}
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={post.imageUrl} alt="" fill sizes="96px" className="object-cover" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {post.mediaType} · #{index + 1}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {post.caption || 'Sin texto'}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5">
                  <form action={moveInstagramPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="dir" value="-1" />
                    <button
                      type="submit"
                      aria-label="Subir"
                      className="rounded border border-border p-1.5 transition hover:text-accent-text"
                    >
                      <ArrowUp className="size-3" />
                    </button>
                  </form>
                  <form action={moveInstagramPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="dir" value="1" />
                    <button
                      type="submit"
                      aria-label="Bajar"
                      className="rounded border border-border p-1.5 transition hover:text-accent-text"
                    >
                      <ArrowDown className="size-3" />
                    </button>
                  </form>
                  <form action={toggleInstagramPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      aria-label={post.visible ? 'Ocultar' : 'Mostrar'}
                      className="rounded border border-border p-1.5 transition hover:text-accent-text"
                    >
                      {post.visible ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                    </button>
                  </form>
                  <form action={removeInstagramPostAction} className="ml-auto">
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      aria-label="Eliminar"
                      className="rounded border border-border p-1.5 text-red-400 transition hover:text-red-300"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 rounded-xl border border-dashed border-border p-5 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Sincronización automática:</strong> cuando tengas el
        token de la Graph API, se activa poniendo <code className="font-mono">IG_ACCESS_TOKEN</code>{' '}
        e <code className="font-mono">IG_USER_ID</code> en el entorno. El conector está en{' '}
        <code className="font-mono">lib/instagram.ts</code> y escribe en esta misma tabla, así que
        lo que cargues a mano seguirá funcionando. Perfil actual:{' '}
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-text hover:underline"
        >
          @agencia_contraste
        </a>
        .
      </p>
    </div>
  )
}
