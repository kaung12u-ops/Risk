import { useState, useRef, useEffect } from 'react'

const STORED_HASH = '258680c5da737a128a54e74e9f3fa6e18c10aa572d2d6518c94500a4809ad4aa'

async function sha256(text) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function PasscodeLock({ onUnlock }) {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputsRef = useRef([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const checkPin = async (pin) => {
    const hash = await sha256(pin)
    if (hash === STORED_HASH) {
      setError('')
      onUnlock()
    } else {
      setError('Incorrect Passcode / စကားဝှက် မှားယွင်းနေပါသည်')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setDigits(['', '', '', '', '', ''])
      inputsRef.current[0]?.focus()
    }
  }

  const handleChange = (i, value) => {
    if (!/^\d?$/.test(value)) return
    setError('')
    const next = [...digits]
    next[i] = value
    setDigits(next)
    if (value && i < 5) inputsRef.current[i + 1]?.focus()
    if (next.every((d) => d !== '')) checkPin(next.join(''))
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    const next = ['', '', '', '', '', ''].map((_, i) => text[i] || '')
    setDigits(next)
    setError('')
    if (next.every((d) => d !== '')) checkPin(next.join(''))
    else inputsRef.current[text.length]?.focus()
  }

  return (
    <div className={`relative bg-[#fdfbf7] max-w-md w-full rounded-2xl shadow-2xl p-6 sm:p-8 border-4 border-[#c8929e]/50 ${shaking ? 'shake' : ''}`}>
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#ba808c]/50 flex items-center justify-center text-2xl mb-4">🔒</div>
        <h3 className="font-serif text-2xl text-[#5a1e24] font-bold mb-1">Enter Passcode</h3>
        <p className="font-typewriter text-sm text-stone-600 mb-6">စကားဝှက် ရိုက်ထည့်ပါ</p>
        <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold font-typewriter text-[#5a1e24] bg-stone-50 border-2 border-[#c8929e]/60 rounded-lg focus:outline-none focus:border-[#ba808c]"
            />
          ))}
        </div>
        {error && <p className="mt-4 text-sm font-typewriter text-rose-600">{error}</p>}
        <button
          className="mt-6 px-6 py-2 bg-[#5a1e24] hover:bg-[#431419] text-white font-typewriter font-bold text-xs uppercase tracking-wider rounded-full shadow transition-transform active:scale-95"
          onClick={() => { setDigits(['', '', '', '', '', '']); setError(''); inputsRef.current[0]?.focus() }}
        >
          Reset / ပြန်စမယ်
        </button>
      </div>
    </div>
  )
}
