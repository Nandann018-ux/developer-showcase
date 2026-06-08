import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// fixed scatter of twinkling dots (deterministic positions)
const PARTICLES = [
  { x: 8, y: 18, s: 2, d: 0 },
  { x: 22, y: 70, s: 3, d: 1.2 },
  { x: 35, y: 30, s: 2, d: 2.4 },
  { x: 48, y: 82, s: 2, d: 0.6 },
  { x: 60, y: 15, s: 3, d: 1.8 },
  { x: 72, y: 60, s: 2, d: 3 },
  { x: 85, y: 35, s: 2, d: 0.9 },
  { x: 92, y: 78, s: 3, d: 2.1 },
  { x: 15, y: 48, s: 2, d: 1.5 },
  { x: 55, y: 50, s: 2, d: 2.7 },
  { x: 78, y: 22, s: 2, d: 0.3 },
  { x: 40, y: 64, s: 3, d: 3.3 },
]

// Animated gradient-mesh backdrop with floating blobs and a spotlight that
// drifts toward the cursor for the glassmorphism depth effect.
export default function Background() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const spotX = useTransform(sx, (v) => `${v * 100}%`)
  const spotY = useTransform(sy, (v) => `${v * 100}%`)

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  // parallax offsets for the blobs
  const blob1X = useTransform(sx, (v) => (v - 0.5) * -60)
  const blob1Y = useTransform(sy, (v) => (v - 0.5) * -60)
  const blob2X = useTransform(sx, (v) => (v - 0.5) * 80)
  const blob2Y = useTransform(sy, (v) => (v - 0.5) * 80)

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'radial-gradient(140% 120% at 50% 0%, #141414 0%, #050505 45%, #000000 100%)',
      }}
    >
      {/* drifting chalk smudges */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[#f3f1e7]/[0.04] blur-[120px]"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute -right-48 bottom-[-12rem] h-[42rem] w-[42rem] rounded-full bg-[#f3f1e7]/[0.03] blur-[130px]"
      />

      {/* faint ruled chalk grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(243,241,231,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,231,0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      {/* chalk-tray frame border */}
      <div className="absolute inset-3 rounded-2xl border border-[#f3f1e7]/10 md:inset-5" />

      {/* cursor sheen */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([px, py]) =>
              `radial-gradient(600px circle at ${px} ${py}, rgba(243,241,231,0.05), transparent 65%)`
          ),
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4))]" />
    </div>
  )
}
