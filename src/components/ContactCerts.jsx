import { motion } from 'framer-motion'
import { BadgeCheck, ArrowUpRight, Github, Linkedin, Code2, BarChart3, Calendar, Twitter } from 'lucide-react'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { certifications, profile, githubUser, leetcodeUser, codeforcesUser } from '../data/portfolio'

const contactCards = [
  { icon: Github, label: 'GitHub', value: `@${githubUser}`, url: `https://github.com/${githubUser}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'nandan-acharya', url: 'https://linkedin.com/in/nandan-acharya-9b952631a' },
  { icon: Code2, label: 'LeetCode', value: `@${leetcodeUser}`, url: `https://leetcode.com/u/${leetcodeUser}` },
  { icon: BarChart3, label: 'Codeforces', value: `@${codeforcesUser}`, url: `https://codeforces.com/profile/${codeforcesUser}` },
  { icon: Twitter, label: 'X (Twitter)', value: '@Nanndann_', url: 'https://x.com/Nanndann_' },
]

function Kicker({ children }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-200/80">
      <span className="h-px w-8 bg-gradient-to-r from-chalk/70 to-transparent" />
      {children}
    </p>
  )
}

export default function ContactCerts() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-8 pb-20 md:pt-10 md:pb-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* left — certifications */}
        <div id="certifications">
          <Reveal>
            <Kicker>Credentials</Kicker>
            <h2 className="mb-8 font-display text-4xl font-bold md:text-5xl">
              <span className="gradient-text">Certifications</span>
            </h2>
          </Reveal>

          <div className="space-y-5">
            {certifications.map((c, i) => {
              const hasLink = c.link && c.link !== '#'
              return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <motion.a
                    href={hasLink ? c.link : undefined}
                    target={hasLink ? '_blank' : undefined}
                    rel="noreferrer"
                    data-hover
                    whileHover={{ y: -4 }}
                    className="glow-border group relative flex gap-4 overflow-hidden rounded-3xl glass-strong p-6"
                  >
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral text-white">
                      <BadgeCheck size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                        {hasLink && (
                          <ArrowUpRight size={16} className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-amber-200/80">
                        {c.issuer} · {c.date}
                      </p>
                      <p className="mt-2 text-sm text-chalk/70">{c.desc}</p>
                    </div>

                    {/* certificate image — fades in over the card on hover */}
                    {c.image && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-ink/90 opacity-0 backdrop-blur-sm transition-opacity duration-500 ease-out group-hover:opacity-100">
                        <img
                          src={c.image}
                          alt={`${c.title} certificate`}
                          loading="lazy"
                          className="max-h-[90%] max-w-[92%] scale-95 rounded-xl object-contain shadow-2xl transition-transform duration-500 ease-out group-hover:scale-100"
                        />
                      </div>
                    )}
                  </motion.a>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* right — contact */}
        <div id="contact">
          <Reveal delay={0.1}>
            <Kicker>Contact</Kicker>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              <span className="gradient-text">Let's build something thoughtful.</span>
            </h2>
            <p className="mt-5 max-w-md text-chalk/70">
              Have an idea, startup, or opportunity in mind? Let's connect and create scalable,
              user-focused software that makes an impact.
            </p>

            {/* contact cards */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {contactCards.map((c) => {
                const Icon = c.icon
                return (
                  <motion.a
                    key={c.label}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-3 rounded-2xl glass p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chalk/10 text-amber-200">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-chalk/45">
                        {c.label}
                      </p>
                      <p className="truncate text-sm text-chalk/85">{c.value}</p>
                    </div>
                    <ArrowUpRight size={15} className="shrink-0 text-chalk/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk" />
                  </motion.a>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:brightness-110"
                >
                  Say Hello
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://calendly.com/nandanachar18/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 font-semibold text-black shadow-lg shadow-amber-300/30 transition hover:brightness-105"
                >
                  <Calendar size={17} /> Book a 30-min chat
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
