import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Code2, BarChart3, ExternalLink } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { githubUser, leetcodeUser, codeforcesUser } from '../data/portfolio'

// approximate LeetCode problem totals per difficulty (for progress bars)
const LC_TOTALS = { easy: 893, medium: 1879, hard: 851 }

// ── data hook ────────────────────────────────────────────────────────────
function useCodingData() {
  const [data, setData] = useState({ gh: null, lc: null, cf: null, loading: true })

  useEffect(() => {
    let alive = true
    const j = (r) => (r.ok ? r.json() : Promise.reject(r.status))

    const gh = fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then(j)
      .catch(() => null)

    // pied API — no rate limits, returns ac/total submission counts + ranking
    const lc = fetch(`https://leetcode-api-pied.vercel.app/user/${leetcodeUser}`)
      .then(j)
      .catch(() => null)

    const cf = Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${codeforcesUser}`).then(j).catch(() => null),
      fetch(`https://codeforces.com/api/user.rating?handle=${codeforcesUser}`).then(j).catch(() => null),
    ]).catch(() => [null, null])

    Promise.all([gh, lc, cf]).then(([ghR, lcR, cfR]) => {
      if (!alive) return
      setData({ gh: ghR, lc: lcR, cf: cfR, loading: false })
    })
    return () => {
      alive = false
    }
  }, [])

  return data
}

// ── contribution heatmap ─────────────────────────────────────────────────
const levelColor = [
  'rgba(243,241,231,0.08)',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
]

// current + longest day streak from the contribution list
function computeStreaks(days) {
  let longest = 0
  let run = 0
  for (const d of days) {
    if (d.count > 0) {
      run += 1
      if (run > longest) longest = run
    } else {
      run = 0
    }
  }
  // current streak: walk from the end; ignore today if it's still empty
  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current += 1
    else if (i === days.length - 1) continue // today not logged yet
    else break
  }
  return { current, longest }
}

function Heatmap({ gh }) {
  const days = gh?.contributions || []
  const total = gh?.total?.lastYear ?? 0
  const { current, longest } = computeStreaks(days)

  return (
    <Reveal>
      <div className="rounded-3xl glass-strong p-6">
        <div className="flex items-center gap-3 border-b border-chalk/20 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chalk/10">
            <Github size={18} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-chalk/70">GitHub Activity</p>
            <a
              href={`https://github.com/${githubUser}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-amber-200 hover:underline"
            >
              github.com/{githubUser}
            </a>
          </div>
        </div>

        {days.length ? (
          <div className="mt-5 overflow-x-auto pb-2">
            <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
              {/* pad leading days so weekdays line up */}
              {Array.from({ length: new Date(days[0].date).getDay() }).map((_, i) => (
                <span key={`pad-${i}`} className="h-[11px] w-[11px]" />
              ))}
              {days.map((d) => (
                <span
                  key={d.date}
                  title={`${d.count} on ${d.date}`}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ background: levelColor[d.level] || levelColor[0] }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5 h-24 animate-pulse rounded-xl bg-chalk/5" />
        )}

        <div className="mt-4 flex items-center justify-between text-xs text-chalk/70">
          <span>{total.toLocaleString()} contributions in the last year</span>
          <span className="flex items-center gap-1">
            Less
            {levelColor.map((c, i) => (
              <span key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: c }} />
            ))}
            More
          </span>
        </div>

        {/* streaks */}
        <div className="mt-5 grid grid-cols-3 gap-4 border-t border-chalk/15 pt-5 text-center">
          <div>
            <p className="text-4xl text-chalk" style={{ fontFamily: '"Love Ya Like A Sister", cursive' }}>{total.toLocaleString()}</p>
            <p className="mt-1 text-xs text-chalk/55">Total Contributions</p>
          </div>
          <div>
            <p className="text-4xl text-amber-200" style={{ fontFamily: '"Love Ya Like A Sister", cursive' }}>🔥 {current}</p>
            <p className="mt-1 text-xs text-chalk/55">Current Streak</p>
          </div>
          <div>
            <p className="text-4xl text-chalk" style={{ fontFamily: '"Love Ya Like A Sister", cursive' }}>{longest}</p>
            <p className="mt-1 text-xs text-chalk/55">Longest Streak</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ── analytics ────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, children, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="glow-border h-full rounded-3xl glass-strong p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-chalk/70">{label}</p>
        <p className="mt-2 text-5xl gradient-text" style={{ fontFamily: '"Love Ya Like A Sister", cursive' }}>{value}</p>
        {sub && <p className="mt-1 text-sm text-chalk/70">{sub}</p>}
        {children}
      </div>
    </Reveal>
  )
}

function Bar({ tag, color, solved, total }) {
  const pct = total ? Math.min(100, (solved / total) * 100) : 0
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-3 font-bold ${color}`}>{tag}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-chalk/10">
        <div className="h-full rounded-full bg-chalk/80" style={{ width: `${pct}%` }} />
      </div>
      <span className="tabular-nums text-chalk/70">
        {solved} / {total}
      </span>
    </div>
  )
}

export default function CodingDashboard() {
  const { gh, lc, cf, loading } = useCodingData()
  const cfInfo = cf?.[0]?.result?.[0]
  const cfRatings = cf?.[1]?.result || []

  // leetcode derived (pied API)
  const ss = lc?.submitStats
  const acOf = (d) => ss?.acSubmissionNum?.find((s) => s.difficulty === d)
  const totOf = (d) => ss?.totalSubmissionNum?.find((s) => s.difficulty === d)
  const totalSolved = acOf('All')?.count ?? '—'
  const ranking = lc?.profile?.ranking
  const totalSubs = totOf('All')?.submissions ?? null
  const acSubs = acOf('All')?.submissions ?? null
  const acceptance = totalSubs && acSubs ? Math.round((acSubs / totalSubs) * 1000) / 10 : null

  // codeforces derived
  const cfRank = cfInfo?.rating ?? '—'
  const cfMax = cfInfo?.maxRating
  const last = cfRatings.length ? cfRatings[cfRatings.length - 1] : null

  const profiles = [
    { name: 'GitHub', handle: `@${githubUser}`, icon: Github, url: `https://github.com/${githubUser}` },
    { name: 'LeetCode', handle: `@${leetcodeUser}`, icon: Code2, url: `https://leetcode.com/u/${leetcodeUser}` },
    { name: 'Codeforces', handle: `@${codeforcesUser}`, icon: BarChart3, url: `https://codeforces.com/profile/${codeforcesUser}` },
  ]

  return (
    <Section id="coding" kicker="By the numbers" title="Coding Activity" className="pt-8 pb-24 md:pt-10 md:pb-32">
      {/* profile pills */}
      <div className="mb-10 flex flex-wrap gap-3">
        {profiles.map((p) => {
          const Icon = p.icon
          return (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-hover
              whileHover={{ y: -3, scale: 1.03 }}
              className="flex items-center gap-3 rounded-full glass px-5 py-2.5"
            >
              <Icon size={18} className="text-amber-200" />
              <span className="text-sm font-semibold text-chalk">{p.name}</span>
              <span className="text-xs text-chalk/70">{p.handle}</span>
              <ExternalLink size={13} className="text-chalk/70" />
            </motion.a>
          )
        })}
      </div>

      {/* github heatmap */}
      <Heatmap gh={gh} />

      {/* analytics */}
      <p className="mb-5 mt-12 text-xs font-medium uppercase tracking-[0.3em] text-chalk/70">
        Coding Analytics
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="LeetCode Solved"
          value={loading ? '…' : totalSolved}
          sub={ranking ? `Rank #${ranking.toLocaleString()}` : 'Global rank'}
          delay={0}
        >
          {ss && (
            <div className="mt-4 space-y-2">
              <Bar tag="E" color="text-emerald-400" solved={acOf('Easy')?.count ?? 0} total={LC_TOTALS.easy} />
              <Bar tag="M" color="text-amber-400" solved={acOf('Medium')?.count ?? 0} total={LC_TOTALS.medium} />
              <Bar tag="H" color="text-rose-400" solved={acOf('Hard')?.count ?? 0} total={LC_TOTALS.hard} />
            </div>
          )}
        </StatCard>

        <StatCard
          label="Codeforces"
          value={loading ? '…' : cfRank}
          sub={cfInfo ? `${cfInfo.rank} · max ${cfMax}` : 'Rating'}
          delay={0.08}
        >
          {cfInfo && (
            <p className="mt-3 text-sm text-amber-200/80">peak: {cfInfo.maxRank}</p>
          )}
        </StatCard>

        <StatCard
          label="LC Submissions"
          value={loading ? '…' : (totalSubs ?? '—')}
          sub={acceptance != null ? `${acceptance}% acceptance` : 'Total submissions'}
          delay={0.16}
        />

        <StatCard
          label="CF Contests"
          value={loading ? '…' : cfRatings.length || '—'}
          sub={last ? `Last: ${last.contestName}` : 'Rated contests'}
          delay={0.24}
        >
          {last && (
            <p className="mt-3 text-sm text-chalk/60">
              rank {last.rank.toLocaleString()} ·{' '}
              <span className={last.newRating >= last.oldRating ? 'text-emerald-400' : 'text-rose-400'}>
                {last.oldRating} → {last.newRating}
              </span>
            </p>
          )}
        </StatCard>
      </div>

      <p className="mt-6 text-xs text-chalk/70">
        Live from GitHub, LeetCode &amp; Codeforces public APIs.
      </p>
    </Section>
  )
}
