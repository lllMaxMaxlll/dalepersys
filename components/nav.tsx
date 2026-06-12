'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Energía', href: '#energy' },
  { label: 'Bio', href: '#about' },
  { label: 'En Vivo', href: '#live' },
  { label: 'Fechas', href: '#timeline' },
  { label: 'Contacto', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl py-3'
          : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2 font-heading text-sm font-extrabold tracking-[0.25em] text-foreground"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-neon glow-neon" />
          DALE PERSYS
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-neon"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-neon/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon transition-all hover:bg-neon hover:text-primary-foreground"
        >
          Contratar
        </a>
      </nav>
    </header>
  )
}
