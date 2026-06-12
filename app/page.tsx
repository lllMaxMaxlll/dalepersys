import { SmoothScroll } from '@/components/smooth-scroll'
import { Loader } from '@/components/loader'
import { Particles } from '@/components/particles'
import { CursorGlow } from '@/components/cursor-glow'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Spotify } from '@/components/sections/spotify'
import { Gallery } from '@/components/sections/gallery'
import { Contact, Footer } from '@/components/sections/contact'

export default function Page() {
  return (
    <SmoothScroll>
      <Loader />
      <Particles />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Spotify />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
