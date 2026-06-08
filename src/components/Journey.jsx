import { motion } from 'framer-motion'
import {
  GraduationCap, GitBranch, Code2, Layers, Smartphone, Server, Brain, Cloud,
} from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { highlights, skillGroups, currently } from '../data/portfolio'

const icons = {
  cap: GraduationCap, git: GitBranch, code: Code2, layers: Layers,
  phone: Smartphone, server: Server, brain: Brain, cloud: Cloud,
}

export default function Journey() {
  const toolCount = skillGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <Section id="journey" kicker="Journey" title="Building With Purpose" className="pt-8 pb-24 md:pt-10 md:pb-32">
      {/* highlight cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {highlights.map((h, i) => {
          const Icon = icons[h.icon] || Code2
          return (
            <Reveal key={h.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                data-hover
                className="h-full rounded-2xl glass p-6"
              >
                <Icon size={18} className="text-amber-200" />
                <h3 className="mt-3 font-display text-2xl font-bold text-chalk">{h.title}</h3>
                <p className="mt-1 text-chalk/65">{h.detail}</p>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      {/* stack panel */}
      <Reveal>
        <div className="mt-6 rounded-3xl glass-strong p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-chalk/50">Stack</p>
            <span className="text-xs text-chalk/40">{toolCount} tools</span>
          </div>
          <div className="mt-5 space-y-4">
            {skillGroups.map((g) => (
              <div key={g.title} className="flex flex-col gap-3 border-t border-chalk/10 pt-4 sm:flex-row sm:items-center">
                <p className="w-40 shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-chalk/45">
                  {g.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-chalk/20 bg-chalk/5 px-3 py-1 font-mono text-xs text-chalk/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* currently panel */}
      <Reveal delay={0.1}>
        <div className="mt-6 rounded-3xl glass p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-chalk/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Currently
            </p>
            <span className="text-xs text-chalk/40">{currently.date}</span>
          </div>
          <div className="mt-5 space-y-3">
            {currently.rows.map((r) => (
              <div key={r.k} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <p className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-amber-200/80">
                  {r.k}
                </p>
                <p className="text-chalk/75">{r.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
