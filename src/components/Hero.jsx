import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin, GraduationCap } from 'lucide-react'
import { profile, stats } from '../data/portfolio'
import Magnetic from './Magnetic'
import TiltCard from './TiltCard'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-6 pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* left: text */}
          <div>
            <motion.p
              variants={item}
              className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-chalk/60"
            >
              Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-6xl font-bold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
            >
              Hi, I'm <br />
              <span className="marker-underline text-amber-200">{profile.name}</span>{' '}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4 }}
                style={{ transformOrigin: '70% 70%' }}
              >
                👋
              </motion.span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-chalk/70">
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  className="group flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-amber-300/30 transition-all hover:shadow-xl hover:shadow-amber-300/40 hover:brightness-105"
                >
                  View Projects
                  <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 rounded-full bg-chalk px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-chalk/20 transition hover:brightness-90"
                >
                  <Mail size={18} /> Contact Me
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-chalk/60"
            >
              <span className="flex items-center gap-1.5">
                <GraduationCap size={16} className="text-amber-200" /> {profile.eduLocation}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-amber-200" /> {profile.hometown}
              </span>
            </motion.div>
          </div>

          {/* right: chalk-framed photo */}
          <motion.div variants={item} className="hidden lg:block">
            <TiltCard className="rounded-3xl" max={8}>
              <img
                src="/profile.jpg"
                alt={profile.name}
                className="aspect-[4/5] w-full rounded-3xl object-cover grayscale-[0.15]"
              />
            </TiltCard>
          </motion.div>
        </motion.div>

        {/* stats strip */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-2 gap-y-8 border-t border-chalk/20 pt-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((s) => (
            <motion.div variants={item} key={s.label} className="px-1">
              <div
                className="text-5xl sm:text-6xl"
                style={{ fontFamily: '"Love Ya Like A Sister", cursive' }}
              >
                {s.head}
                <span className="text-amber-200">{s.accent}</span>
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-chalk/70">
                {s.label}
              </div>
              <div className="mt-0.5 text-sm text-chalk/55">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
