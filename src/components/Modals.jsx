import { useState, useRef, useEffect, useCallback } from 'react'
import Confetti from './Confetti'
import { triggerConfetti } from './Confetti'
import HeartBackground from './HeartBackground'

function Modal({ show, onClose, children, className = '' }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    }
  }, [show])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    if (!show) return
    const handler = (e) => {
      if (e.target === e.currentTarget) handleClose()
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [show, handleClose])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative transition-all duration-300 ${visible ? 'scale-100' : 'scale-95'} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function LetterModal({ show, onClose }) {
  const confettiRef = useRef(null)
  const [emitConfetti, setEmitConfetti] = useState(false)

  useEffect(() => {
    if (show) {
      // Emit confetti after modal pop-in animation completes (350ms)
      const timer = setTimeout(() => setEmitConfetti(true), 350)
      return () => {
        clearTimeout(timer)
        setEmitConfetti(false)
      }
    }
  }, [show])

  const handleClose = useCallback(() => {
    setEmitConfetti(false)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  useEffect(() => {
    if (!show || !emitConfetti) return
    // Trigger confetti from the modal container
    const modalContainer = document.querySelector('div[role="dialog"]')
    if (modalContainer && confettiRef.current) {
      triggerConfetti(modalContainer, {
        colors: ['#e3cfb3', '#f43f5e', '#fda4af', '#c8929e'],
        particleCount: 40,
        duration: 4000
      })
    }
    // Reset emitConfetti after timeout so it doesn't re-trigger
    setEmitConfetti(false)
  }, [show])

  // Confetti rendering - only renders once when emitConfetti was true
  useEffect(() => {
    if (emitConfetti) {
      return () => setEmitConfetti(false)
    }
  }, [])

  if (!show) return null

  return (
    <Modal show={show} onClose={handleClose}>
      <div className="relative bg-[#fdfbf7] max-w-lg w-full rounded-2xl shadow-2xl p-6 sm:p-8 border-4 border-[#c8929e]/50 max-h-[90vh] overflow-y-auto" style={{ zIndex: 100 }}>
        <button className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-xl font-bold w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center transition-colors" onClick={onClose}>✕</button>
        <div className="flex items-center justify-between border-b pb-3 mb-4 border-stone-200">
          <span className="font-typewriter text-xs uppercase tracking-widest text-[#ba808c] font-bold">Hey!</span>
          <span className="text-xs font-typewriter text-stone-500">Stamp: Sealed with Love</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#5a1e24] font-bold mb-2">May Kyal Lay,</h3>
        <div className="font-hand text-2xl sm:text-3xl text-stone-800 leading-relaxed space-y-4">
          <p>များကြီးချစ်တယ်နော်...❣</p>
        </div>
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          <div>
            <p className="font-typewriter text-xs uppercase tracking-wider text-stone-500">Forever and always,</p>
            <p className="font-script text-3xl sm:text-4xl text-[#5a1e24] font-bold">Love you May Kyal Lay</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-rose-400/50 flex items-center justify-center text-rose-600 text-2xl font-serif">💌</div>
        </div>
        {/* Confetti canvas rendered inside modal */}
        {emitConfetti && <Confetti canvasRef={confettiRef} />}
      </div>
    </Modal>
  )
}

const playlist = [
  { id: 1, title: "Song 1", artist: "မင်းနဲ့မှချစ်တတ်ပြီပေါ့", youtubeId: "Pi-kEBGXqTs" },
  { id: 2, title: "Song 2", artist: "ရင်ခုံရလွန်းလို့ရူးမှာပဲကွယ်", youtubeId: "duEjXLc-k4g" },
  { id: 3, title: "Song 3", artist: "ချစ်တာတစ်ခုတည်းသိတယ်မေရယ်", youtubeId: "tkEDJskaDL0" },
  { id: 4, title: "Song 4", artist: "မချစ်ဘူးမပြောလိုက်ပါနဲ့", youtubeId: "BPZI23Wd4ys" },
  { id: 5, title: "Song 5", artist: "ကြည်ဖြူပါတော့မေရယ်", youtubeId: "E_EGdL7vBT8" },
  { id: 6, title: "Song 6", artist: "ငါဘယ်လောက်သိပ်ချစ်ရတာမင်းသိဖို့ကောင်းတယ်", youtubeId: "t_Z4E-XooSo" }
]

const galleryItems = [
  {
    type: "image",
    src: "/photo/photo1.jpg",
    title: "May Kyal Lay✨",
    caption: "Hey What are you looking for?👀",
    date: "Oct 4"
  },
  {
    type: "video",
    src: "/video/video1.mp4",
    title: "May Kyal Lay's Smile",
    caption: "May Kyal Lay a pyone ka arr lone htet chyo tl🤭",
    date: "OCT 4"
  },
  {
    type: "image",
    src: "/photo/photo2.png",
    title: "Hey this is you?",
    caption: "I wanna know where is this place?🤔",
    date: "Oct 4"
  },
  {
    type: "video",
    src: "/video/video2.mp4",
    title: "a thae kyaw pae hlaw lay😜",
    caption: "Her dancing moves that make me smile",
    date: "Oct 4"
  }
]

function MusicModal({ show, onClose }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const nextSong = () => {
    setCurrentTrackIndex((i) => (i + 1) % playlist.length)
  }
  const prevSong = () => {
    setCurrentTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)
  }

  const track = playlist[currentTrackIndex]

  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative bg-[#1a232b] text-stone-100 max-w-xl w-full rounded-3xl shadow-2xl p-6 sm:p-8 border border-sky-900/50">
        <button className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors z-20" onClick={onClose}>✕</button>
        <div className="text-center mb-5">
          <span className="font-typewriter text-[11px] tracking-widest uppercase text-sky-300/80">For Your Playlist</span>
          <h3 className="font-serif text-2xl font-bold text-sky-100 mt-1">To Listen for May Kyal Lay </h3>
        </div>
        <iframe
          key={track.youtubeId}
          className="w-full aspect-video rounded-xl shadow-lg border border-slate-700"
          src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1`}
          title={track.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="text-center mt-4 mb-4">
          <h4 className="font-serif text-lg font-bold text-white">{track.title}</h4>
          <p className="font-typewriter text-xs text-stone-400">{track.artist}</p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <button className="text-stone-400 hover:text-white transition-colors text-xl" onClick={prevSong}>⏮</button>
          <button className="text-stone-400 hover:text-white transition-colors text-xl" onClick={nextSong}>⏭</button>
        </div>
        <div className="mt-6 pt-4 border-t border-stone-800">
          <p className="font-typewriter text-[10px] text-stone-400 uppercase tracking-widest mb-2 text-center">Tracklist:</p>
          <div className="text-xs font-typewriter text-stone-300 space-y-1 text-center">
            {playlist.map((t, i) => (
              <p
                key={t.id}
                className={`cursor-pointer ${i === currentTrackIndex ? 'text-sky-300' : 'text-stone-300'}`}
                onClick={() => setCurrentTrackIndex(i)}
              >
                {i + 1}. {t.title} {i === 0 ? '✦' : ''}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

function GalleryModal({ show, onClose, onVideoExpand }) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative bg-[#f6f1e8] max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 border-4 border-[#c2aa96]/60 max-h-[90vh] overflow-y-auto">
        <HeartBackground className="absolute inset-0 pointer-events-none z-0" />
        <div className="relative z-10">
        <button className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-xl font-bold w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center transition-colors z-20" onClick={onClose}>✕</button>
        <div className="text-center mb-6">
          <span className="font-typewriter text-xs text-stone-500 uppercase tracking-widest">Hey! • This is for you</span>
          <h3 className="font-serif text-3xl font-bold text-stone-800">May Kyal Lay's Collection</h3>
          <p className="font-hand text-2xl text-stone-600">favorite things</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 pb-4">
          {galleryItems.map((item, i) => {
            if (item.type === "image") {
              return (
                <div key={i} className="bg-white p-3 pb-5 rounded-sm shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col items-center border border-stone-200">
                  <div className="w-full h-44 bg-[#e8dfd8] rounded-md overflow-hidden flex flex-col items-center justify-center relative group">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                  <span className="text-xs font-typewriter text-stone-600 mt-2 font-bold">{item.title}</span>
                  <p className="font-hand text-2xl text-stone-700 mt-3 text-center">{item.caption}</p>
                  <span className="font-typewriter text-[10px] text-stone-400">{item.date} • Story</span>
                </div>
              )
            }
            if (item.type === "video") {
              return (
                <div key={i} className="bg-white p-3 pb-5 rounded-sm shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col items-center border border-stone-200">
                  <div className="w-full h-100 sm:h-44 bg-[#e8dfd8] rounded-md overflow-hidden flex flex-col items-center justify-center relative group">
                    <video
                      controls
                      muted
                      loop
                      playsInline
                      preloadMetadata
                      className="w-full h-full object-cover"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  </div>
                  <span className="text-xs font-typewriter text-stone-600 mt-2 font-bold">{item.title}</span>
                  <p className="font-hand text-2xl text-stone-700 mt-3 text-center">{item.caption}</p>
                  <span className="font-typewriter text-[10px] text-stone-400">{item.date} • Story</span>
                </div>
              )
            }
            return null
          })}
        </div>
        </div>
      </div>
    </Modal>
  )
}

export function VideoLightboxModal({ show, onClose, item }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) setVisible(true)
  }, [show])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play()
      else videoRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!show) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true
      videoRef.current.muted = true
      videoRef.current.playsInline = true
    }
  }, [])

  const togglePlay = () => setIsPlaying(!isPlaying)

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 opacity-${visible ? 100 : 0} transition-opacity duration-300 pointer-events-${visible ? 'auto' : 'none'}`}
    >
      <div
        className={`relative min-h-screen flex items-center justify-center p-4 z-50 scale-${visible ? 100 : 95} transition-scale duration-300 pointer-events-auto`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold w-8 h-8 rounded-full bg-black/30 flex items-center justify-center transition-colors hover:bg-black/50"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="aspect-[9/16] max-h-[80vh] mx-auto rounded-lg relative">
          <video
            ref={videoRef}
            playsInline
            muted
            loop
            preloadMetadata
            className="w-full h-full object-cover"
          >
            <source src={item.src} type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 flex justify-between items-end">
            <button
              className="text-white hover:text-yellow-300 transition-colors text-sm font-medium"
              onClick={togglePlay}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <div className="flex items-center gap-2 text-sm text-stone-300">
              <button>🔊</button>
              <button>📺</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CelebrationModal({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative bg-rose-50 max-w-md w-full rounded-3xl shadow-2xl p-8 text-center border-4 border-rose-300">
        <div className="text-6xl mb-3 animate-bounce">💖</div>
        <span className="font-typewriter text-xs uppercase tracking-widest text-rose-600 font-bold">Proposal Accepted!</span>
        <h3 className="font-serif text-3xl sm:text-4xl font-black text-rose-950 mt-1 mb-2">Yay! Best Decision Ever!</h3>
        <p className="font-hand text-2xl text-rose-800 leading-relaxed my-4">
          You've just made me the happiest person in the whole universe. Get ready for unlimited love, warm hugs, and your favorite snacks forever!
        </p>
        <button className="mt-4 px-8 py-3 bg-[#5a1e24] hover:bg-[#431419] text-white font-typewriter font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95" onClick={onClose}>
          I Love You To The Moon & Back ❤️
        </button>
      </div>
    </Modal>
  )
}

export default function Modals({ activeModal, onClose, onCelebrate, onVideoExpand }) {
  const handleClose = useCallback(() => onClose(), [onClose])

  return (
    <>
      <LetterModal show={activeModal === 'letter'} onClose={handleClose} />
      <MusicModal show={activeModal === 'music'} onClose={handleClose} />
      <GalleryModal show={activeModal === 'gallery'} onClose={handleClose} onVideoExpand={onVideoExpand} />
      <CelebrationModal show={activeModal === 'celebration'} onClose={handleClose} />
    </>
  )
}
