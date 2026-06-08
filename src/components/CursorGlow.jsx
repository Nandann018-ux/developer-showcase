import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Custom cursor: a small solid dot that tracks 1:1, plus a larger
// spring-lagged ring that grows + brightens when hovering interactive elements.
export default function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // ring lags behind with spring physics
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 })

  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // skip on touch / coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true)
      return
    }

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target
      const interactive =
        el.closest('a, button, [data-hover], input, textarea, [role="button"]')
      setHovering(Boolean(interactive))
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [x, y])

  if (hidden) return null

  return (
    <>
      {/* glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-40 w-40 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(243,241,231,0.10), transparent 65%)',
        }}
        animate={{ scale: hovering ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />

      {/* rotating dashed ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-dashed border-chalk/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hovering ? 1 : 0.55,
          rotate: 360,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
          default: { type: 'spring', stiffness: 200, damping: 20 },
        }}
      />

      {/* bright core dot (inverts over anything) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: clicking ? 2.2 : hovering ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  )
}
