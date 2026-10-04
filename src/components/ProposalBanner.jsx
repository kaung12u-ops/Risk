import { useState } from 'react'

export default function ProposalBanner({ onYes }) {
  const [dodgeCount, setDodgeCount] = useState(0)
  const [btnText, setBtnText] = useState('No')
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const dodge = () => {
    const next = dodgeCount + 1
    setDodgeCount(next)
    const rx = (Math.random() - 0.5) * 220
    const ry = (Math.random() - 0.5) * 110
    setPos({ x: rx, y: ry })
    if (next === 3) setBtnText('Are you sure? 🥺')
    else if (next === 6) setBtnText('Nice try! 😜')
  }

  return (
    <section className="mt-0 pt-4 pb-8 w-full max-w-xl mx-auto z-30">
      <div className="bg-white/95 backdrop-blur-md border-2 border-[#5a1e24]/30 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 washi-tape"></div>
        <div className="text-center sm:text-left mt-1 sm:mt-0">
          <p className="font-typewriter text-[10px] sm:text-xs text-rose-800 font-bold uppercase tracking-widest">Hey!</p>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
            Will you be my Girlfriend? 💖
          </h3>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center relative min-h-[44px]">
          <a
            href="https://t.me/kaung2u?text=Yes%20I%20love%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#5a1e24] hover:bg-[#431419] active:scale-95 text-white font-typewriter font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 z-20 whitespace-nowrap"
            onClick={onYes}
          >
            <span>YES, OF COURSE!</span>
            <span>❤️</span>
          </a>
          <button
            className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-typewriter text-xs font-semibold rounded-xl transition-all duration-150 select-none z-10"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onMouseOver={dodge}
            onClick={dodge}
          >
            {btnText}
          </button>
        </div>
      </div>
    </section>
  )
}
