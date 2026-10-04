import { useEffect, useRef } from 'react'

const COLORS = ['#5a1e24', '#c8929e', '#e11d48', '#f43f5e', '#fb7185', '#fda4af']

function drawHeart(ctx, x, y, size, color, rotation, opacity) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.beginPath()
  const topCurveHeight = size * 0.3
  ctx.moveTo(0, topCurveHeight)
  ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size)
  ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function HeartBackground({ className = 'fixed inset-0 pointer-events-none z-0' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const isAbsolute = className.includes('absolute')

    function resize() {
      if (isAbsolute && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(h) {
      h.x = Math.random() * canvas.width
      h.y = -20 - Math.random() * canvas.height * 0.5
      h.size = Math.random() * 14 + 8
      h.speedY = Math.random() * 1.4 + 0.8
      h.sway = Math.random() * 1.5 + 0.5
      h.phase = Math.random() * Math.PI * 2
      h.rotation = (Math.random() - 0.5) * 40
      h.rotationSpeed = (Math.random() - 0.5) * 1.5
      h.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      h.opacity = (Math.random() * 0.3 + 0.2) * 0.8
    }

    const hearts = []
    for (let i = 0; i < 30; i++) {
      const h = {}
      spawn(h)
      h.y = Math.random() * canvas.height
      hearts.push(h)
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      hearts.forEach(h => {
        h.y += h.speedY
        h.phase += 0.03
        h.rotation += h.rotationSpeed
        const x = h.x + Math.sin(h.phase) * h.sway * 10
        drawHeart(ctx, x, h.y, h.size, h.color, h.rotation, h.opacity)
        if (h.y - h.size > canvas.height) spawn(h)
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [className])

  return <canvas ref={canvasRef} className={className} />
}
