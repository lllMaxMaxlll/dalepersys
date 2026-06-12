'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const paragraphs = [
  'Nacido en Argentina, criado al ritmo del barrio y la pista.',
  'Dale Persys es DJ y productor de RKT y turreo: remixes y edits exclusivos que convierten los éxitos del momento en herramientas de pista.',
  'Un sonido 100% bolichero — graves al frente, vocales arriba, transiciones rápidas y frenadas que levantan a la gente.',
  'Trabaja en comunidad con la movida urbana: colaboraciones cruzadas con Gonzaa Remixxx, Raccoon DJ, Nauperak DJ y Puro Fronteo.',
  'Cada set es puro fronteo. Cada noche, la pista al límite.',
]

const tags = ['RKT', 'Turreo', 'Remixes', 'Open Format', 'Boliche']

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll('[data-line]')
      if (lines) {
        gsap.from(lines, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: linesRef.current,
            start: 'top 75%',
          },
        })
      }

      gsap.to(portraitRef.current, {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="relative mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-2 md:gap-16 md:px-8 md:py-40"
    >
      <div className="relative h-[60vh] overflow-hidden rounded-2xl border border-border md:h-[80vh]">
        <div ref={portraitRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src="/portrait.jpg"
            alt="Dale Persys mezclando en la cabina bajo luces rojas"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      <div className="flex flex-col justify-center" ref={linesRef}>
        <p data-line className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-neon">
          Sección 02 — Sobre Mí
        </p>
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-line
              className={`text-pretty leading-relaxed ${
                i === 0
                  ? 'font-heading text-2xl font-bold text-foreground md:text-3xl'
                  : 'text-lg text-muted-foreground'
              }`}
            >
              {p}
            </p>
          ))}
        </div>
        <ul data-line className="mt-10 flex flex-wrap gap-3">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-neon/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-neon"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
