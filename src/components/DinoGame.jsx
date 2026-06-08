import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, X } from 'lucide-react'

const W = 600
const H = 180

export default function DinoGame() {
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const groundY = H - 26
    const dino = { x: 46, y: groundY, w: 20, h: 38, vy: 0, onGround: true }
    let obstacles = []
    let speed = 5
    let frame = 0
    let nextGap = 60
    let over = false
    let started = false
    let localScore = 0
    let raf

    // ── sound effects (Web Audio synth) ──
    let actx = null
    const sfx = (notes, type = 'square', vol = 0.06) => {
      try {
        if (!actx) {
          const AC = window.AudioContext || window.webkitAudioContext
          actx = new AC()
        }
        let t = actx.currentTime
        notes.forEach(([freq, dur]) => {
          const o = actx.createOscillator()
          const g = actx.createGain()
          o.type = type
          o.frequency.setValueAtTime(freq, t)
          g.gain.setValueAtTime(vol, t)
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
          o.connect(g)
          g.connect(actx.destination)
          o.start(t)
          o.stop(t + dur)
          t += dur
        })
      } catch {
        /* audio not available */
      }
    }
    const jumpSfx = () => sfx([[660, 0.09], [880, 0.07]])
    const pointSfx = () => sfx([[1046, 0.05]], 'square', 0.04)
    const overSfx = () => sfx([[400, 0.12], [300, 0.14], [180, 0.22]], 'sawtooth', 0.07)

    const jump = () => {
      if (over) {
        // restart
        obstacles = []
        speed = 5
        frame = 0
        localScore = 0
        over = false
        started = true
        dino.y = groundY
        dino.vy = 0
        dino.onGround = true
        jumpSfx()
        return
      }
      started = true
      if (dino.onGround) {
        dino.vy = -11
        dino.onGround = false
        jumpSfx()
      }
    }

    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('pointerdown', jump)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      // ground
      ctx.strokeStyle = 'rgba(243,241,231,0.6)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, groundY + 2)
      ctx.lineTo(W, groundY + 2)
      ctx.stroke()

      // dino
      ctx.fillStyle = '#f3f1e7'
      ctx.fillRect(dino.x, dino.y - dino.h, dino.w, dino.h)
      // eye
      ctx.fillStyle = '#000'
      ctx.fillRect(dino.x + dino.w - 7, dino.y - dino.h + 5, 3, 3)

      // obstacles
      ctx.fillStyle = '#f3f1e7'
      obstacles.forEach((o) => ctx.fillRect(o.x, groundY - o.h, o.w, o.h))

      // score
      ctx.fillStyle = 'rgba(243,241,231,0.85)'
      ctx.font = '16px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(String(localScore).padStart(5, '0'), W - 12, 24)
      ctx.textAlign = 'left'

      if (!started) {
        ctx.fillStyle = 'rgba(243,241,231,0.7)'
        ctx.font = '15px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('press space / tap to start', W / 2, H / 2)
        ctx.textAlign = 'left'
      }
      if (over) {
        ctx.fillStyle = '#e8897a'
        ctx.font = 'bold 22px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', W / 2, H / 2 - 6)
        ctx.fillStyle = 'rgba(243,241,231,0.7)'
        ctx.font = '13px monospace'
        ctx.fillText('space / tap to retry', W / 2, H / 2 + 16)
        ctx.textAlign = 'left'
      }
    }

    const loop = () => {
      if (started && !over) {
        frame++
        speed += 0.002
        // physics
        dino.vy += 0.6
        dino.y += dino.vy
        if (dino.y >= groundY) {
          dino.y = groundY
          dino.vy = 0
          dino.onGround = true
        }
        // spawn
        if (frame >= nextGap) {
          frame = 0
          nextGap = 55 + Math.floor(Math.random() * 60)
          const h = 26 + Math.floor(Math.random() * 22)
          obstacles.push({ x: W + 10, w: 12 + Math.floor(Math.random() * 10), h })
        }
        // move + collide
        obstacles.forEach((o) => (o.x -= speed))
        obstacles = obstacles.filter((o) => o.x + o.w > -10)
        for (const o of obstacles) {
          if (
            dino.x < o.x + o.w &&
            dino.x + dino.w > o.x &&
            dino.y > groundY - o.h
          ) {
            over = true
            overSfx()
            setScore(localScore)
            setBest((b) => Math.max(b, localScore))
          }
        }
        if (frame % 6 === 0) {
          localScore++
          if (localScore > 0 && localScore % 100 === 0) pointSfx()
        }
      }
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', jump)
      if (actx) actx.close()
    }
  }, [open])

  return (
    <>
      {/* floating trigger */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Play Dino game"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group fixed bottom-24 right-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg shadow-blue-800/50 ring-2 ring-blue-500/40"
      >
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-chalk/20 bg-black/80 px-3 py-1.5 text-sm text-chalk opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
          Bored? Play Chalk Run
        </span>
        <Gamepad2 size={22} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-2xl rounded-3xl glass-strong p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold gradient-text">Chalk Run</h3>
                  <p className="text-sm text-chalk/55">Best: {String(best).padStart(5, '0')}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-1 text-chalk/60 hover:text-chalk"
                >
                  <X size={20} />
                </button>
              </div>
              <canvas
                ref={canvasRef}
                className="w-full cursor-pointer rounded-xl border border-chalk/15 bg-black"
                style={{ aspectRatio: `${W} / ${H}` }}
              />
              <p className="mt-3 text-center text-xs text-chalk/45">Space / ↑ / tap to jump</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
