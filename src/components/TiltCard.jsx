import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 3D tilt card that rotates toward the cursor with a moving glare highlight.
export default function TiltCard({ children, className = '', max = 12 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const sx = useSpring(px, { stiffness: 200, damping: 18 })
  const sy = useSpring(py, { stiffness: 200, damping: 18 })

  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const glareX = useTransform(sx, (v) => `${v * 100}%`)
  const glareY = useTransform(sy, (v) => `${v * 100}%`)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {/* glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(220px circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  )
}
