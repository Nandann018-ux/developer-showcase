import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import ChalkCursor from './components/ChalkCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Journey from './components/Journey'
import PullRequests from './components/PullRequests'
import Projects from './components/Projects'
import CodingDashboard from './components/CodingDashboard'
import ContactCerts from './components/ContactCerts'
import Footer from './components/Footer'
import MusicWidget from './components/MusicWidget'
import DinoGame from './components/DinoGame'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)

  // always start at the top on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // smooth scroll starts once the loader is gone
  useSmoothScroll(!loading)

  // lock page scroll while the loader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Background />
      <ChalkCursor />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Journey />
        <PullRequests />
        <CodingDashboard />
        <ContactCerts />
      </main>
      <Footer />
      <MusicWidget />
      <DinoGame />
    </>
  )
}
