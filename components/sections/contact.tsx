'use client'

import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+54 9 11 0000 0000',
    href: 'https://wa.me/5491100000000',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@dalepersys',
    href: 'https://instagram.com/dalepersys',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'booking@dalepersys.com',
    href: 'mailto:booking@dalepersys.com',
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-32 md:px-8 md:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,102,0.25) 0%, rgba(0,255,102,0) 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-neon">
          Sección 08 — Contacto
        </p>
        <h2 className="font-heading text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground text-balance sm:text-6xl md:text-8xl">
          Armemos la{' '}
          <span className="text-neon text-glow">noche.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-pretty text-lg text-muted-foreground">
          Disponible para boliches, fiestas y eventos privados. Llevá el RKT y
          la energía de la pista a tu próxima fecha.
        </p>

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neon px-10 py-5 font-heading text-base font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 hover:glow-neon"
          >
            <span className="relative z-10">Contratá al DJ</span>
            <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border p-6 transition-all duration-300 hover:border-neon/60 hover:bg-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-neon/60 group-hover:text-neon">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-neon">
                  {c.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <span className="flex items-center gap-2 font-heading text-sm font-extrabold tracking-[0.25em] text-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-neon" />
          DALE PERSYS
        </span>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dale Persys — RKT, turreo y remixes
          bolicheros.
        </p>
      </div>
    </footer>
  )
}
