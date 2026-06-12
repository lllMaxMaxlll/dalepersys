'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { Play } from 'lucide-react'

const features = [
  {
    src: '/gallery-1.png',
    title: 'SET RKT #1',
    meta: 'con Puro Fronteo · 2026',
  },
  {
    src: '/lasers.png',
    title: 'DAKITI RKT',
    meta: 'con Gonzaa Remixxx & Nauperak DJ · 2026',
  },
  {
    src: '/crowd.png',
    title: 'EnKNTA2rA',
    meta: 'Remix · 2026',
  },
  {
    src: '/gallery-3.png',
    title: 'KoKo RKT',
    meta: 'Remix · 2026',
  },
]

export function VideoShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon">
        Sección 05 — Lanzamientos
      </p>
      <h2 className="mb-14 max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl">
        Sets y remixes para romper la pista.
      </h2>

      <Reveal className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        {features.map((f) => (
          <article
            key={f.title}
            data-reveal
            className="group relative aspect-video overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-neon/60 hover:glow-neon"
          >
            <Image
              src={f.src || '/placeholder.svg'}
              alt={f.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neon/60 bg-background/40 text-neon backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-neon group-hover:text-primary-foreground">
                <Play className="h-6 w-6 fill-current" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs text-neon">{f.meta}</span>
              <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                {f.title}
              </h3>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  )
}
