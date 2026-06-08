import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const TECH = [
  'React', 'Next.js', 'React Native', 'Node.js', 'Express', 'TypeScript', 'JavaScript',
  'MongoDB', 'MySQL', 'Prisma', 'FastAPI', 'Python', 'PyTorch', 'Pandas', 'Scikit-learn',
  'Tailwind CSS', 'Vite', 'Expo', 'Docker', 'AWS', 'GitHub Actions', 'Git', 'Postman',
]

export default function TechMarquee() {
  const ref = useRef(null)
  // drive the strip from scroll position over the whole page
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], ['2%', '-55%'])

  return (
    <section
      ref={ref}
      aria-label="Tech stack"
      className="relative overflow-hidden border-y border-chalk/15 py-5"
    >
      <motion.div style={{ x }} className="flex w-max gap-3">
        {[...TECH, ...TECH].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-chalk/20 bg-chalk/5 px-5 py-2 text-base text-chalk/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            {t}
          </span>
        ))}
      </motion.div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-board to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-board to-transparent" />
    </section>
  )
}
