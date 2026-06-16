'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -64 },
    })

    lenis.on('scroll', ScrollTrigger.update)

    // Pause Lenis initially if overflow-hidden is already active from the loader
    if (
      document.documentElement.style.overflow === 'hidden' ||
      document.body.style.overflow === 'hidden'
    ) {
      lenis.stop()
    }

    const handleStop = () => lenis.stop()
    const handleStart = () => lenis.start()

    window.addEventListener('lenis-stop', handleStop)
    window.addEventListener('lenis-start', handleStart)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('lenis-stop', handleStop)
      window.removeEventListener('lenis-start', handleStart)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
