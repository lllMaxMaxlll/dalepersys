'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const slides = [
  { src: '/crowd.png', title: 'La Gente', label: '01' },
  { src: '/lasers.png', title: 'Las Luces', label: '02' },
  { src: '/booth.png', title: 'La Cabina', label: '03' },
  { src: '/smoke.png', title: 'El Ambiente', label: '04' },
]

function SoundWave() {
  return (
    <div
      aria-hidden="true"
      className="flex items-end gap-1 h-8"
    >
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="wave-bar w-1 rounded-full bg-neon/70"
          style={{
            height: '100%',
            animationDelay: `${(i % 7) * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Energy() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const scrollAmount = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // parallax on each image
      track.querySelectorAll<HTMLElement>('[data-img]').forEach((img) => {
        gsap.to(img, {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            scrub: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="energy" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-5 top-24 z-20 md:left-8">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-neon">
          Sección 02
        </p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-5xl">
          La Energía
        </h2>
        <div className="mt-4 w-32">
          <SoundWave />
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex h-screen min-h-[640px] w-max items-center gap-6 px-5 will-change-transform md:gap-10 md:px-8"
      >
        {slides.map((s) => (
          <article
            key={s.label}
            className="group relative h-[70vh] w-[82vw] shrink-0 overflow-hidden rounded-2xl border border-border sm:w-[60vw] md:w-[44vw]"
          >
            <div data-img className="absolute inset-0 scale-110 will-change-transform">
              <Image
                src={s.src || '/placeholder.svg'}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 82vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="font-mono text-xs text-neon">{s.label}</span>
              <h3 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
                {s.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
