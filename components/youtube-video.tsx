'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

function extractYouTubeId(input: string): string | null {
  if (!input) return null
  if (/^[\w-]{11}$/.test(input)) return input
  const match = input.match(/(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)([\w-]{11})/)
  return match ? match[1] : null
}

export function YouTubeVideo({
  url,
  title,
  meta,
  poster,
}: {
  url: string
  title: string
  meta: string
  poster: string
}) {
  const [playing, setPlaying] = useState(false)
  const id = extractYouTubeId(url)

  if (playing && id) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-neon/60 glow-neon">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => id && setPlaying(true)}
      disabled={!id}
      aria-label={id ? `Reproducir ${title}` : `${title} — video próximamente`}
      className="group relative block w-full aspect-video overflow-hidden rounded-2xl border border-border text-left transition-all duration-500 enabled:cursor-pointer enabled:hover:border-neon/60 enabled:hover:glow-neon"
    >
      <Image
        src={poster}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-enabled:group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neon/60 bg-background/40 text-neon backdrop-blur-sm transition-all duration-500 group-enabled:group-hover:scale-110 group-enabled:group-hover:bg-neon group-enabled:group-hover:text-primary-foreground">
          <Play className="h-6 w-6 fill-current" />
        </span>
      </div>
      {!id && (
        <span className="absolute right-4 top-4 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
          Próximamente
        </span>
      )}
      <div className="absolute bottom-0 left-0 p-6">
        <span className="font-mono text-xs text-neon">{meta}</span>
        <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
          {title}
        </h3>
      </div>
    </button>
  )
}
