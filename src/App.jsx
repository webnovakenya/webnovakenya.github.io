import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import SectionRail from './components/SectionRail'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import WhyChoose from './components/WhyChoose'
import KineticBand from './components/KineticBand'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoaded = useCallback(() => setLoading(false), [])

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />

      <AnimatePresence>{loading && <Preloader onDone={handleLoaded} />}</AnimatePresence>

      <Navbar ready={!loading} />
      <SectionRail />

      <main>
        <Hero ready={!loading} />
        <About />
        <Marquee
          dark
          items={['Strategy', 'Design', 'Development', 'Motion']}
          duration={32}
          size="text-4xl sm:text-7xl"
        />
        <Services />
        <Projects />
        <Process />
        <WhyChoose />
        <KineticBand />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
