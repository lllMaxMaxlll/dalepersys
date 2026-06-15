'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/foto-1.jpg', alt: 'Dale Persys mezclando en la cabina bajo luces azules' },
  { src: '/foto-2.jpg', alt: 'Dale Persys en plena mezcla, retrato en blanco y negro' },
  { src: '/foto-3.jpg', alt: 'Dale Persys al micrófono frente a la pantalla del boliche' },
  { src: '/foto-4.jpg', alt: 'Dale Persys pinchando discos en vivo, ambiente neon y lasers' },
  { src: '/foto-5.jpg', alt: 'Detalle de la cabina de mezcla de Dale Persys con luces led encendidas' },
  { src: '/foto-6.jpg', alt: 'Dale Persys con auriculares ajustando la consola en el estudio' },
  { src: '/foto-7.jpg', alt: 'Bandeja de vinilo girando en la cabina de Dale Persys' },
]

export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

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

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const { scrollLeft, scrollWidth, clientWidth } = container
    const totalScroll = scrollWidth - clientWidth
    if (totalScroll <= 0) {
      setScrollProgress(0)
    } else {
      const progress = (scrollLeft / totalScroll) * 100
      setScrollProgress(progress)
    }
  }

  const scrollPrev = () => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.75
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }

  const scrollNext = () => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.75
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="fotos"
      className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon">
        Sección 04 — Fotos
      </p>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-14">
        <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl">
          Postales desde la pista.
        </h2>
        
        {/* Navigation Buttons (desktop only) */}
        <div className="hidden gap-3 md:flex">
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/40 text-foreground backdrop-blur-md transition-all duration-300 hover:border-neon hover:text-neon active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/40 text-foreground backdrop-blur-md transition-all duration-300 hover:border-neon hover:text-neon active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        >
          {photos.map((p, i) => (
            <figure
              key={i}
              className="group relative aspect-[3/4] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border snap-start sm:w-[360px] md:w-[420px]"
            >
              <div
                data-parallax
                className="absolute inset-0 scale-125 will-change-transform"
              >
                <Image
                  src={p.src || '/placeholder.svg'}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-background/10 transition-colors duration-500 group-hover:bg-transparent" />
            </figure>
          ))}
        </div>

        {/* Progress Bar / Scroll Indicator */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="relative h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-border">
            <div
              className="absolute left-0 top-0 h-full bg-neon transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </section>
  )
}
