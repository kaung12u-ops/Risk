function triggerConfetti(parent, options = {}) {
  const canvas = createCanvas(parent)
  const ctx = canvas.getContext('2d')
  const colors = options.colors || ['#e3cfb3', '#f43f5e', '#fda4af', '#c8929e']
  const particleCount = options.particleCount || 50
  const duration = options.duration || 3000

  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight

  const particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      opacity: 1,
      decay: Math.random() * 0.002 + 0.001
    })
  }

  let _animationFrame
  const startTime = performance.now()

  function animate(currentTime) {
    const elapsed = currentTime - startTime
    if (elapsed > duration) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.parentNode.removeChild(canvas)
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.speedX
      p.y += p.speedY
      p.rotation += p.rotationSpeed
      p.opacity -= p.decay

      if (p.opacity > 0 && p.y < canvas.height + 100) {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
    })

    _animationFrame = requestAnimationFrame(animate)
  }

  _animationFrame = requestAnimationFrame(animate)
}

export default function Confetti({ canvasRef }) {
  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
  )
}

export { triggerConfetti }
