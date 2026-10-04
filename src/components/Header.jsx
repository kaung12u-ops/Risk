export default function Header() {
  return (
    <header className="w-full text-center pt-8 pb-12 sm:pb-16 z-20 select-none">
      <p className="font-typewriter uppercase tracking-[0.35em] text-[11px] sm:text-xs text-stone-600 font-bold mb-3 flex items-center justify-center gap-3">
        <span className="inline-block w-8 h-[1.5px] bg-stone-400"></span>
        A Special Gift For You
        <span className="inline-block w-8 h-[1.5px] bg-stone-400"></span>
      </p>
      <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.01em] text-[#541a20] uppercase leading-[0.92] drop-shadow-sm">
        THE "SECRET"<br/>
        <span className="tracking-normal font-serif font-black">FOR May Kyal Lay</span>
      </h1>
      <div className="relative -mt-2 sm:-mt-3">
        <span className="font-script text-6xl sm:text-8xl md:text-9xl text-[#7c262f] -rotate-3 inline-block transform font-normal drop-shadow-sm select-none">
          I Love You
        </span>
      </div>
      <p className="font-hand text-lg sm:text-2xl text-stone-600 mt-2 rotate-[-0.5deg]">
        open each folder to unfold all my feelings for you... ✨
      </p>
    </header>
  )
}
