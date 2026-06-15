'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Spotify', href: '#spotify' },
  { label: 'Fotos', href: '#fotos' },
  { label: 'Contacto', href: '#contacto' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? 'border-b border-border bg-background/70 backdrop-blur-xl py-3'
        : 'bg-transparent py-5' // Agregado bg-transparent para evitar cortes raros en el degradado del hero
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2 font-heading text-sm font-extrabold tracking-[0.25em] text-foreground select-none"
        >
          {/* Un toque de animación pulse al punto neón le da mucha vida en estéticas de boliche */}
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-neon shadow-[0_0_10px_#f43f5e]" />
          DALE PERSYS
        </a>

        {/* Enlaces de navegación centraditos */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-neon"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden sm:inline-block rounded-full border border-neon/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon transition-all duration-300 hover:bg-neon hover:text-background hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]"
        >
          Contratar
        </a>
      </nav>
    </header>
  )
}