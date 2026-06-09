import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ImageOff } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { projects } from '../data/portfolio'

// project screenshot with graceful fallback
function Shot({ src, title }) {
  const [failed, setFailed] = useState(!src)
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-chalk/[0.06] p-3">
      {failed ? (
        <div className="flex flex-col items-center gap-2 text-chalk/35">
          <ImageOff size={26} />
          <span className="text-xs">{title}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={`${title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full rounded-lg object-contain shadow-lg transition-transform duration-500 hover:scale-[1.02]"
        />
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" kicker="Projects" title="What I've Built" className="pt-8 pb-24 md:pt-10 md:pb-32">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              data-hover
              className="glow-border flex h-full flex-col rounded-3xl glass-strong p-6"
            >
              {/* screenshot */}
              <Shot src={p.image} title={p.title} />

              {/* header */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="font-display text-xl text-chalk/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl font-bold leading-none text-chalk">
                  {p.title}
                </h3>
                {p.category && (
                  <span className="rounded-full bg-coral/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
                    {p.category}
                  </span>
                )}
              </div>

              {/* description */}
              <p className="mt-3 leading-relaxed text-chalk/70">{p.desc}</p>

              {/* tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <motion.span
                    key={t}
                    data-hover
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="cursor-default rounded-full border border-chalk/20 bg-chalk/5 px-3 py-1 text-xs text-chalk/75 transition-colors hover:border-amber-200/60 hover:text-amber-200"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* actions */}
              <div className="mt-5 flex flex-wrap gap-3 pt-1">
                <motion.a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full border border-chalk/15 bg-[#1a1a1a] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-[#262626]"
                >
                  <Github size={16} /> Code
                </motion.a>
                <motion.a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-white/20 transition hover:brightness-90"
                >
                  <ExternalLink size={16} /> Live Demo
                </motion.a>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
