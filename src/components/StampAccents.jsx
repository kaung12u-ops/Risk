export default function StampAccents() {
  return (
    <>
      <div className="fixed top-5 right-5 sm:top-8 sm:right-12 transform rotate-6 hidden sm:flex flex-col items-center justify-center p-2.5 bg-[#fdfbf7] border-2 border-dashed border-stone-400 rounded shadow-md pointer-events-none select-none z-10 opacity-80">
        <div className="text-[9px] tracking-widest uppercase font-typewriter text-stone-500 font-bold">သို့...</div>
        <div className="text-rose-800 text-xl my-0.5">💌</div>
        <div className="text-[8px] font-typewriter tracking-tight text-stone-600">May Kyal Lay✨</div>
      </div>
      <div className="fixed top-8 left-5 sm:left-12 transform -rotate-12 hidden md:flex items-center justify-center w-24 h-24 rounded-full border-2 border-stone-400/50 pointer-events-none select-none text-stone-400 text-[9px] font-typewriter text-center uppercase leading-tight z-10">
        <span>★ A Special ★<br/>For<br/>You</span>
      </div>
    </>
  )
}
