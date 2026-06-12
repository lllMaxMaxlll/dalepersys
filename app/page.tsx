import { SmoothScroll } from '@/components/smooth-scroll'
import { Loader } from '@/components/loader'
import { Particles } from '@/components/particles'
import { CursorGlow } from '@/components/cursor-glow'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/sections/hero'
import { Energy } from '@/components/sections/energy'
import { About } from '@/components/sections/about'
import { Stats } from '@/components/sections/stats'
import { VideoShowcase } from '@/components/sections/video-showcase'
import { Gallery } from '@/components/sections/gallery'
import { Timeline } from '@/components/sections/timeline'
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
        <Energy />
        <About />
        <Stats />
        <VideoShowcase />
        <Gallery />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
