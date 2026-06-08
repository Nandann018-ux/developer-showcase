import { motion, useScroll, useSpring } from 'framer-motion'
import { FileText, Home } from 'lucide-react'
import Magnetic from './Magnetic'
import { profile } from '../data/portfolio'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#journey' },
  { label: 'Coding', href: '#coding' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-chalk/80"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(95%,80rem)] items-center justify-between rounded-full glass px-6 py-3.5 md:px-8"
      >
        {/* home */}
        <motion.a
          href="#top"
          aria-label="Home"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-base font-semibold text-chalk transition-colors hover:bg-chalk/10 hover:text-amber-200"
        >
          <Home size={22} /> Home
        </motion.a>

        {/* center links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="group relative text-sm text-chalk/70 transition-colors hover:text-amber-200"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-200 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* resume pill */}
        <Magnetic>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:shadow-xl hover:shadow-red-600/50 hover:brightness-110"
          >
            <FileText size={16} /> Resume
          </a>
        </Magnetic>
      </motion.header>
    </>
  )
}
