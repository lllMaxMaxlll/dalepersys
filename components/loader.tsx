'use client'

import { useEffect, useState } from 'react'

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 12 + 4)
        if (next >= 100) clearInterval(interval)
        return next
      })
    }, 130)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 650)
      return () => clearTimeout(t)
    }
  }, [progress])

  useEffect(() => {
    if (!done) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new CustomEvent('lenis-stop'))
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('lenis-start'))
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('lenis-start'))
    }
  }, [done])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        progress >= 100 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`relative w-[72vw] max-w-[460px] ${
          progress >= 100 ? 'loader-pulse' : ''
        }`}
        style={{ aspectRatio: '1818 / 749' }}
      >
        <div className="logo-mask absolute inset-0 bg-foreground/10" />
        <div
          className="logo-mask absolute inset-0 bg-neon transition-[clip-path] duration-200 ease-out"
          style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
        />
      </div>
      <div className="mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-muted-foreground">
        <span>CARGANDO</span>
        <span className="text-neon">{Math.floor(progress)}%</span>
      </div>
    </div>
  )
}
