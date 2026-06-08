import { motion } from 'framer-motion'
import Section from './Section'
import Reveal from './Reveal'
import { GraduationCap } from 'lucide-react'
import { profile, educationTimeline } from '../data/portfolio'

export default function About() {
  return (
    <Section id="about" kicker="Who I am" title="Developer Profile">
      <div className="grid items-center gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="space-y-4 text-lg leading-relaxed text-chalk/70">
            {profile.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-nowrap gap-2.5">
            {['Full Stack Developer', 'Open Source Contributor', 'MERN Stack', 'React Native', 'DSA Enthusiast'].map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.06, y: -2 }}
                data-hover
                className="shrink-0 whitespace-nowrap rounded-full glass px-3 py-1.5 text-xs text-chalk/70"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <div className="rounded-3xl glass-strong p-8">
            <div className="mb-6 flex items-center gap-2 text-amber-200">
              <GraduationCap size={20} />
              <h3 className="font-display text-2xl font-bold">Education</h3>
            </div>

            <div className="relative ml-2 pl-6">
              {/* animated timeline line */}
              <motion.span
                className="absolute left-0 top-1 w-px origin-top bg-chalk/30"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ bottom: '0.25rem' }}
              />
              {educationTimeline.map((e, i) => (
                <motion.div
                  key={i}
                  data-hover
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 6 }}
                  className="group relative mb-7 cursor-default last:mb-0"
                >
                  <motion.span
                    className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-chalk ring-4 ring-board"
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-amber-200/60 opacity-0 blur-[3px] transition-opacity group-hover:opacity-100" />
                  </motion.span>
                  <p className="text-base font-semibold leading-snug text-chalk transition-colors group-hover:text-amber-200">
                    {e.degree}
                  </p>
                  <p className="mt-0.5 text-sm text-amber-200/90">{e.school}</p>
                  <p className="text-xs text-chalk/55">{e.period}</p>
                  {e.detail && <p className="mt-1 text-sm text-chalk/70">{e.detail}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
