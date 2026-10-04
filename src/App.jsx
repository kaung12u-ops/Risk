import { useState, useRef, useCallback, useEffect } from 'react'
import StampAccents from './components/StampAccents'
import HeartBackground from './components/HeartBackground'
import Header from './components/Header'
import FolderCard from './components/FolderCard'
import ProposalBanner from './components/ProposalBanner'
import Modals from './components/Modals'
import Confetti from './components/Confetti'
import { VideoLightboxModal } from './components/Modals'

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

function triggerConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#5a1e24', '#c8929e', '#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3']
  const particles = Array.from({ length: 90 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2 + 80,
    size: Math.random() * 16 + 10,
    speedX: (Math.random() - 0.5) * 16,
    speedY: (Math.random() - 0.8) * 18 - 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 6,
    opacity: 1,
    gravity: 0.35
  }))

  let animationFrame
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let active = 0
    particles.forEach(p => {
      p.x += p.speedX
      p.y += p.speedY
      p.speedY += p.gravity
      p.rotation += p.rotationSpeed
      p.opacity -= 0.009
      if (p.opacity > 0) {
        active++
        drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity)
      }
    })
    if (active > 0) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      cancelAnimationFrame(animationFrame)
    }
  }
  animate()
}

export default function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false)
  const [selectedVideoItem, setSelectedVideoItem] = useState(null)
  const canvasRef = useRef(null)

  const openModal = useCallback((id) => setActiveModal(id), [])
  const closeModal = useCallback(() => setActiveModal(null), [])
  const openVideoLightbox = useCallback((item) => {
    setSelectedVideoItem(item)
    setVideoLightboxOpen(true)
  }, [])
  const closeVideoLightbox = useCallback(() => setVideoLightboxOpen(false), [])

  const handleYes = useCallback(() => {
    setActiveModal('celebration')
    if (canvasRef.current) triggerConfetti(canvasRef.current)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <HeartBackground />
      <StampAccents />
      <div className="w-full max-w-5xl min-h-screen flex flex-col justify-start relative pb-12 sm:pb-16 px-4 sm:px-8">
        <Header />
        <main className="w-full relative flex flex-col z-20 gap-5 sm:gap-8 md:gap-10">
          <FolderCard folder="letter" onClick={() => openModal('letter')} />
          <FolderCard folder="music" onClick={() => openModal('music')} />
          <FolderCard folder="gallery" onClick={() => openModal('gallery')} />
        </main>
        <ProposalBanner onYes={handleYes} />
      </div>
      <Modals activeModal={activeModal} onClose={closeModal} onVideoExpand={openVideoLightbox} />
      {videoLightboxOpen && selectedVideoItem && (
        <VideoLightboxModal show={videoLightboxOpen} onClose={closeVideoLightbox} item={selectedVideoItem} />
      )}
      <Confetti canvasRef={canvasRef} />
    </>
  )
}
