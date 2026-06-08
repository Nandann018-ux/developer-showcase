import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => onDone?.(), 450),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(140% 120% at 50% 0%, #141414 0%, #050505 45%, #000000 100%)' }}
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* faint chalk grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(243,241,231,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,231,0.04) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-200/70"
        >
          Portfolio
        </motion.p>

        {/* progress bar */}
        <div className="mt-9 h-px w-60 overflow-hidden bg-chalk/15 sm:w-72">
          <motion.div className="h-full bg-chalk" style={{ width: `${count}%` }} />
        </div>

        {/* counter + status */}
        <div className="mt-4 flex w-60 items-center justify-between text-sm text-chalk/55 sm:w-72">
          <span>just a moment…</span>
          <span className="font-mono tabular-nums text-chalk/80">{String(count).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  )
}
