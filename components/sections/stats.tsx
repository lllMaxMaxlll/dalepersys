'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 100, suffix: '+', label: 'Remixes y Edits' },
  { value: 30, suffix: '+', label: 'Colaboraciones' },
  { value: 200, suffix: '+', label: 'Noches de Boliche' },
  { value: 100, suffix: ' BPM', label: 'Puro RKT' },
]

function Counter({
  value,
  suffix,
  start,
}: {
  value: number
  suffix: string
  start: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf = 0
    const duration = 2000
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.floor(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  const formatted =
    value >= 1000 ? display.toLocaleString('es-AR') : String(display)

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="live"
      className="relative border-y border-border bg-card/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon">
          Sección 04 — En Vivo
        </p>
        <h2 className="mb-16 max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl">
          La pista al límite, toda la noche.
        </h2>
        <dl className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="font-heading text-4xl font-extrabold text-neon text-glow md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} start={active} />
              </dt>
              <dd className="mt-3 text-sm uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
