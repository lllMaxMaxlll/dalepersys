'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const photos = [
  { src: '/foto-1.jpg', alt: 'Dale Persys mezclando en la cabina bajo luces azules' },
  { src: '/foto-2.jpg', alt: 'Dale Persys en plena mezcla, retrato en blanco y negro' },
  { src: '/foto-3.jpg', alt: 'Dale Persys al micrófono frente a la pantalla del boliche' },
]

export function Gallery() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('figure').forEach((fig, i) => {
        gsap.from(fig, {
          y: 70,
          scale: 0.92,
          opacity: 0,
          duration: 1,
          delay: (i % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: fig, start: 'top 90%' },
        })
      })

      el.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -14 : -7,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="fotos"
      className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon">
        Sección 04 — Fotos
      </p>
      <h2 className="mb-14 max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl">
        Postales desde la pista.
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {photos.map((p, i) => (
          <figure
            key={i}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border sm:aspect-[2/3]"
          >
            <div
              data-parallax
              className="absolute inset-0 scale-125 will-change-transform"
            >
              <Image
                src={p.src || '/placeholder.svg'}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-background/10 transition-colors duration-500 group-hover:bg-transparent" />
          </figure>
        ))}
      </div>
    </section>
  )
}
