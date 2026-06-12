'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { YouTubeVideo } from '@/components/youtube-video'

// Pegá en "youtube" el link de cada video (vale link completo, youtu.be o ID)
const videos = [
  {
    youtube: '',
    poster: '/gallery-1.jpg',
    title: 'SET RKT #1',
    meta: 'con Puro Fronteo · 2026',
  },
  {
    youtube: '',
    poster: '/lasers.jpg',
    title: 'DAKITI RKT',
    meta: 'con Gonzaa Remixxx & Nauperak DJ · 2026',
  },
  {
    youtube: '',
    poster: '/crowd.jpg',
    title: 'EnKNTA2rA',
    meta: 'Remix · 2026',
  },
  {
    youtube: '',
    poster: '/gallery-3.jpg',
    title: 'KoKo RKT',
    meta: 'Remix · 2026',
  },
]

export function Spotify() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('[data-spotify-header]', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 75%' },
      })

      gsap.from('[data-spotify-embed]', {
        y: 90,
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-spotify-embed]', start: 'top 85%' },
      })

      gsap.utils
        .toArray<HTMLElement>('[data-spotify-card]')
        .forEach((card, i) => {
          gsap.from(card, {
            x: i % 2 === 0 ? -90 : 90,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })
        })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="spotify"
      className="relative border-y border-border bg-card/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p
          data-spotify-header
          className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon"
        >
          Sección 03 — Spotify
        </p>
        <h2
          data-spotify-header
          className="mb-14 max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl"
        >
          Sets y remixes para romper la pista.
        </h2>

        <div
          data-spotify-embed
          className="mb-6 overflow-hidden rounded-2xl border border-border bg-card/30 p-2 transition-colors duration-500 hover:border-neon/60 md:mb-10 will-change-transform"
        >
          <iframe
            title="Dale Persys en Spotify"
            src="https://open.spotify.com/embed/artist/1ovNq4y5Rd0pp4PKdxdc2y?utm_source=generator&theme=0"
            width="100%"
            height={352}
            style={{ borderRadius: '12px', border: 0 }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <div key={v.title} data-spotify-card className="will-change-transform">
              <YouTubeVideo
                url={v.youtube}
                title={v.title}
                meta={v.meta}
                poster={v.poster}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
