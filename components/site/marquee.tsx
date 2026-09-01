import { BrandMark } from './brand-mark'

/**
 * Marquesina doble: una fila sólida y otra en contorno corriendo al revés.
 * El cruce de direcciones es lo que da sensación de energía; una sola fila
 * se lee como decoración.
 */
export function Marquee({ words }: { words: string[] }) {
  const track = [...words, ...words]

  return (
    <div
      className="relative overflow-hidden border-y border-border bg-background py-8 lg:py-10"
      aria-hidden="true"
    >
      <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {track.map((word, i) => (
          <span key={`a-${i}`} className="flex items-center gap-8">
            <span className="display text-[clamp(1.8rem,4vw,3.2rem)] text-foreground">{word}</span>
            <BrandMark className="size-4 shrink-0 text-accent" />
          </span>
        ))}
      </div>

      <div className="animate-marquee-reverse mt-3 flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {track.map((word, i) => (
          <span key={`b-${i}`} className="flex items-center gap-8">
            <span className="display display-outline text-[clamp(1.8rem,4vw,3.2rem)] opacity-40">
              {word}
            </span>
            <BrandMark className="size-4 shrink-0 text-violet" />
          </span>
        ))}
      </div>
    </div>
  )
}
