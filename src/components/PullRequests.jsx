import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { GitPullRequest, ArrowUpRight, GitMerge, ChevronRight } from 'lucide-react'
import TiltCard from './TiltCard'
import { pullRequests } from '../data/portfolio'

// GitHub renders a live social-preview card for any PR at this endpoint.
const ogImage = (repo, number) =>
  `https://opengraph.githubassets.com/${number}/${repo}/pull/${number}`

function PrCard({ pr, i }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <TiltCard className="h-full w-[20rem] shrink-0 rounded-3xl sm:w-[23rem]" max={7}>
      <a
        href={pr.url}
        target="_blank"
        rel="noreferrer"
        data-hover
        className="glow-border group flex h-full flex-col overflow-hidden rounded-3xl glass-strong"
      >
        {/* live PR preview image */}
        <div className="relative aspect-[2/1] overflow-hidden bg-gradient-to-br from-sky-500/25 via-blue-500/15 to-cyan-400/20">
          {!loaded && !failed && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-chalk/5 to-chalk/10" />
          )}
          {failed ? (
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <GitMerge size={26} className="text-amber-200/80" />
              <span className="font-mono text-sm text-chalk/70">
                {pr.repo.split('/')[1]} #{pr.number}
              </span>
            </div>
          ) : (
            <motion.img
              src={ogImage(pr.repo, pr.number)}
              alt={`${pr.repo} #${pr.number} preview`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-purple-600/85 px-3 py-1 text-xs font-medium text-chalk backdrop-blur">
            <GitMerge size={13} /> Merged
          </div>
          <span className="absolute right-3 top-3 font-mono text-xs text-chalk/70">
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-sm text-amber-200/80">
            <GitPullRequest size={15} />
            <span className="font-mono">
              {pr.repo} #{pr.number}
            </span>
          </div>
          <h3 className="mt-2 flex-1 font-display text-lg font-semibold leading-snug">
            {pr.title}
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {pr.tags.map((t) => (
                <span key={t} className="rounded-full bg-chalk/10 px-3 py-1 text-xs text-chalk/70">
                  {t}
                </span>
              ))}
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-chalk/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
            />
          </div>
        </div>
      </a>
    </TiltCard>
  )
}

export default function PullRequests() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [shift, setShift] = useState(0)
  const [enabled, setEnabled] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // horizontal distance the track must travel so the last card reaches the edge
  useLayoutEffect(() => {
    const measure = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setEnabled(false)
        return
      }
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return
      // overflow of the track past the container's inner content width
      // (clientWidth includes the px-6 padding on both sides → subtract 48)
      const dist = track.scrollWidth - (container.clientWidth - 48)
      setShift(Math.max(0, dist))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -shift])
  const x = useSpring(xRaw, { stiffness: 120, damping: 30, mass: 0.4 })
  // accent rail follows progress
  const rail = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // hide the "scroll to end" button once we're basically at the end
  useMotionValueEvent(scrollYProgress, 'change', (v) => setAtEnd(v > 0.96))

  const scrollToEnd = () => {
    const sec = sectionRef.current
    if (!sec) return
    window.scrollTo({ top: sec.offsetTop + shift, behavior: 'smooth' })
  }

  const header = (
    <div className="mx-auto mb-10 w-full max-w-6xl px-6">
      <p className="mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-200/80">
        <span className="h-px w-8 bg-gradient-to-r from-chalk/70 to-transparent" />
        Merged upstream
      </p>
      <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
        <span className="gradient-text">Open-source contributions</span>
        <br />
        in motion.
      </h2>
      <p className="mt-4 max-w-xl text-chalk/70">
        Eight merged pull requests across{' '}
        <span className="font-semibold text-amber-200">Apache Airflow</span>,{' '}
        <span className="font-semibold text-amber-200">Marked</span>,{' '}
        <span className="font-semibold text-amber-200">React-Router</span>,{' '}
        <span className="font-semibold text-amber-200">Axios</span> and{' '}
        <span className="font-semibold text-amber-200">Shiki</span> — slide sideways as you
        scroll, and reverse when you move back up.
      </p>
    </div>
  )

  // reduced-motion / fallback: plain horizontal scroll row
  if (!enabled) {
    return (
      <section id="pull-requests" className="py-24 md:py-32">
        {header}
        <div className="flex snap-x gap-6 overflow-x-auto px-6 pb-4">
          {pullRequests.map((pr, i) => (
            <div key={`${pr.repo}-${pr.number}`} className="snap-start">
              <PrCard pr={pr} i={i} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="pull-requests"
      ref={sectionRef}
      style={{ height: shift ? `calc(100vh + ${shift}px)` : undefined }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        {header}

        {/* accent rail */}
        <div className="mx-auto mb-6 h-px w-full max-w-6xl overflow-hidden bg-chalk/10 px-6">
          <motion.div style={{ width: rail }} className="h-full bg-chalk/80" />
        </div>

        <div ref={containerRef} className="relative mx-auto w-full max-w-6xl overflow-hidden px-6">
          {/* outer: scroll-driven drift · inner: manual swipe/drag */}
          <motion.div style={{ x }}>
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -shift, right: 0 }}
              dragElastic={0.08}
              dragMomentum={false}
              className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
            >
              {pullRequests.map((pr, i) => (
                <PrCard key={`${pr.repo}-${pr.number}`} pr={pr} i={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* jump-to-end button — reveals the last cards that scroll can't reach */}
        <motion.button
          type="button"
          onClick={scrollToEnd}
          aria-label="Scroll to last pull request"
          data-hover
          initial={false}
          animate={{ opacity: atEnd ? 0 : 1, x: atEnd ? 12 : 0 }}
          style={{ pointerEvents: atEnd ? 'none' : 'auto' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-chalk/25 bg-ink/70 text-chalk shadow-lg backdrop-blur transition-colors hover:border-chalk/50 md:right-8"
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>
    </section>
  )
}
