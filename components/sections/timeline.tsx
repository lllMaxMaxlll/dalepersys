'use client'

import { Reveal } from '@/components/reveal'

const events = [
  {
    date: 'JUL 2026',
    title: 'Noche de Turreo',
    location: 'Buenos Aires, AR',
    status: 'upcoming',
  },
  {
    date: 'AGO 2026',
    title: 'RKT Session — Open Format',
    location: 'Córdoba, AR',
    status: 'upcoming',
  },
  {
    date: 'SEP 2026',
    title: 'Puro Fronteo — Fecha Especial',
    location: 'Rosario, AR',
    status: 'upcoming',
  },
  {
    date: 'JUN 2026',
    title: 'Lanzamiento SET RKT #1',
    location: 'con Puro Fronteo',
    status: 'past',
  },
  {
    date: 'MAY 2026',
    title: 'DAKITI RKT — Estreno',
    location: 'con Gonzaa Remixxx & Nauperak DJ',
    status: 'past',
  },
]

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative border-y border-border bg-card/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-neon">
          Sección 07 — Fechas
        </p>
        <h2 className="mb-16 font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground text-balance md:text-5xl">
          Dónde sigue la noche.
        </h2>

        <Reveal as="ul" className="relative" stagger={0.12} y={30}>
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon/60 via-border to-transparent"
          />
          {events.map((e) => (
            <li
              key={e.title}
              data-reveal
              className="relative grid grid-cols-[auto_1fr] gap-5 pb-10 pl-0 last:pb-0 md:grid-cols-[120px_auto_1fr] md:gap-8"
            >
              <span className="relative col-start-1 mt-1.5 flex h-4 w-4 items-center justify-center md:order-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    e.status === 'upcoming'
                      ? 'bg-neon glow-neon'
                      : 'border border-muted-foreground bg-background'
                  }`}
                />
              </span>
              <span className="font-mono text-sm text-neon md:order-1 md:text-right">
                {e.date}
              </span>
              <div className="md:order-3">
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {e.location}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    e.status === 'upcoming'
                      ? 'border border-neon/40 text-neon'
                      : 'border border-border text-muted-foreground'
                  }`}
                >
                  {e.status === 'upcoming' ? 'Próxima' : 'Pasada'}
                </span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
