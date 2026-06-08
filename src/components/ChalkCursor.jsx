import { useEffect, useRef } from 'react'

// Chalk-dust trail: as the cursor moves it lays down a rough white chalk
// stroke plus scattered dust grains that slowly fade — like writing on a board.
export default function ChalkCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let lastX = null
    let lastY = null
    const dust = []

    const addDust = (x, y, n) => {
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2
        const spd = Math.random() * 0.8
        dust.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd + 0.15, // settle down slightly
          life: 1,
          size: 0.4 + Math.random() * 1.3,
        })
        if (dust.length > 320) dust.shift()
      }
    }

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (lastX !== null) {
        const d = Math.hypot(x - lastX, y - lastY)
        if (d > 2) {
          // rough chalk stroke: a few jittered short segments
          for (let k = 0; k < 3; k++) {
            ctx.beginPath()
            ctx.moveTo(lastX + (Math.random() - 0.5) * 3, lastY + (Math.random() - 0.5) * 3)
            ctx.lineTo(x + (Math.random() - 0.5) * 3, y + (Math.random() - 0.5) * 3)
            ctx.strokeStyle = `rgba(243,241,231,${0.05 + Math.random() * 0.06})`
            ctx.lineWidth = 1 + Math.random() * 2
            ctx.lineCap = 'round'
            ctx.stroke()
          }
          addDust(x, y, 2 + Math.floor(Math.random() * 3))
        }
      }
      lastX = x
      lastY = y
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const loop = () => {
      // gently fade the whole canvas so chalk strokes dissolve like dust
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.045)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'

      for (let i = dust.length - 1; i >= 0; i--) {
        const p = dust[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life -= 0.02
        if (p.life <= 0) {
          dust.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(243,241,231,${(p.life * 0.5).toFixed(3)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9996]" aria-hidden="true" />
}
