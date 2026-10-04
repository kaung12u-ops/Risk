function FolderTab({ position, color, borderColor, emoji, label }) {
  const isLeft = position === 'left'
  return (
    <div className={`w-full flex ${isLeft ? 'justify-start pl-2 sm:pl-6' : 'justify-end pr-2 sm:pr-6'}`}>
      <div
        className={`${color} font-typewriter text-xs sm:text-sm font-bold uppercase tracking-wider px-8 sm:px-12 pt-3 pb-2.5 rounded-t-2xl shadow-sm border-t-2 ${isLeft ? 'border-l-2 border-r' : 'border-r-2 border-l'} ${borderColor} inline-flex items-center gap-2 ${isLeft ? 'tab-left-slant pr-12' : 'tab-right-slant pl-12'}`}
        style={!isLeft ? { color: undefined } : undefined}
      >
        <span>{emoji}</span>
        <span>{label}</span>
      </div>
    </div>
  )
}

function FolderBody({ bgColor, borderColor, accentColor, title, subtitle, actionLabel, actionHoverBg, children, onClick }) {
  return (
    <div
      className={`relative w-full ${bgColor} rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl shadow-folder-layer border-t ${borderColor} overflow-hidden min-h-[160px] sm:min-h-[175px] flex flex-col justify-between transition-all duration-300 group-hover:brightness-[1.02] cursor-pointer`}
      onClick={onClick}
    >
      <div className="w-full bg-white h-6 sm:h-7 rounded-t-xl sm:rounded-t-2xl shadow-paper-lip flex items-center justify-between px-8 border-b border-stone-200">
        <span className={`h-1.5 w-16 ${accentColor} rounded-full`}></span>
        <span className="text-[10px] font-typewriter text-stone-400 uppercase tracking-widest">ရည်းစားစာလေး ဖတ်ဖို့နှိပ်လိုက်တော့နော်...</span>
        <span className={`h-1.5 w-16 ${accentColor} rounded-full`}></span>
      </div>
      <div className="px-6 sm:px-10 py-7 sm:py-9 flex items-center justify-between flex-1">
        <div className="flex items-center gap-4 sm:gap-6">
          {children}
          <div>
            <h2 className="font-serif font-black text-lg sm:text-xl tracking-tight">{title}</h2>
            <p className="font-typewriter text-xs sm:text-sm mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-typewriter text-xs sm:text-sm font-bold tracking-widest uppercase bg-white/80 backdrop-blur-sm border ${borderColor} px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm group-hover:bg-[#4a151b] group-hover:text-white transition-all`}>
            {actionLabel} →
          </span>
        </div>
      </div>
    </div>
  )
}

function RetroVibesBooklet() {
  return (
    <div className="absolute -top-4 -right-3 sm:-top-6 sm:-right-5 z-20 pointer-events-none select-none w-20 h-20 sm:w-30 sm:h-35 object-contain bg-[#1f3730] text-[#e3cfb3] rounded-lg shadow-2xl rotate-6 border-2 border-[#2d4941] p-1 sm:p-2 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:-translate-y-4 group-hover:rotate-3">
      <div className="hidden sm:flex justify-between items-center border-b border-[#e3cfb3]/25 pb-1">
        <span className="text-[8px] sm:text-[9px] font-typewriter tracking-widest uppercase text-emerald-200">May Kyal Lay ဖတ်ဖို့</span>
        <span className="text-[9px] sm:text-[11px]">★</span>
      </div>
      <div className="text-center my-auto">
        <span className=" sm:block font-serif italic text-xs sm:text-sm text-stone-300">For you</span>
        <span className="font-script text-sm sm:text-3xl text-[#f5dfb8] block leading-none -rotate-6">May Kyal</span>
      </div>
      <div className="hidden sm:block text-[8px] sm:text-[9px] font-typewriter text-stone-400 text-right tracking-tight">ARCHIVE • NO. 01</div>
    </div>
  )
}



function VinylRecord() {
  return (
    <div className="absolute -top-12 left-8 sm:left-12 z-20 pointer-events-none select-none transition-all duration-500 group-hover:-translate-y-4 flex items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#802224] rounded-md border-2 border-stone-800 shadow-2xl transform -rotate-12 p-1.5 flex flex-col justify-between overflow-hidden">
        <div className="text-[7px] sm:text-[8px] font-typewriter text-stone-300 font-bold uppercase">Album for you</div>
        <div className="w-12 h-12 bg-stone-900/40 rounded border border-white/20 mx-auto flex items-center justify-center text-white text-sm font-serif">✦</div>
        <div className="text-[6px] font-typewriter text-stone-300 text-right">SIDE A • 33 RPM</div>
      </div>
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full vinyl-grooves -ml-8 sm:-ml-10 transform rotate-12 flex items-center justify-center relative shadow-vinyl transition-transform duration-700 group-hover:rotate-45">
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-stone-600/40 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#f4ebe1] border border-stone-300 flex flex-col items-center justify-center text-center p-0.5">
            <span className="text-[6px] sm:text-[7px] font-typewriter uppercase font-bold text-stone-800">RETRO MIX</span>
            <span className="text-[7px] leading-none">🎶</span>
            <span className="text-[5px] font-typewriter text-stone-500">STEREO</span>
          </div>
        </div>
        <div className="absolute w-2 h-2 rounded-full bg-[#f6f1e8] border border-stone-400"></div>
      </div>
    </div>
  )
}

function PolaroidPhoto() {
  return (
    <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 z-20 pointer-events-none select-none drop-shadow-md w-20 h-25 sm:w-25 sm:h-35 rotate-6 bg-white p-1.5 sm:p-2 rounded-sm flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-4">
      <div className="w-full h-full rounded object-cover bg-stone-100 flex items-center justify-center p-1">
        <img src="/photo/photo1.jpg" alt="favorite sunset" className="w-full h-full object-cover rounded" />
      </div>
      <div className="text-center font-hand text-[8px] sm:text-[10px] text-stone-800 mt-1.5 font-bold leading-none">
        May Kyal Lay ✨
      </div>
    </div>
  )
}

export default function FolderCard({ folder, onClick }) {
  const configs = {
    letter: {
      tab: { position: 'left', color: 'bg-[#c8929e]', borderColor: 'border-[#deafb9]', emoji: '💌', label: 'A LETTER FOR May Kyal Lay' },
      body: { bgColor: 'bg-[#c8929e]', borderColor: 'border-[#e2b7c0]', accentColor: 'bg-rose-200', title: 'ချစ်ခွင့်လေးပန်ချင်လို့...👉👈🥺', titleColor: 'text-[#341119]', subtitle: 'letter sealed with love', subtitleColor: 'text-[#542431]', actionLabel: 'Read Letter', iconBg: 'bg-[#b87d8a]', iconBorder: 'border-rose-300/40', icon: '💌' },
      object: <RetroVibesBooklet />
    },
    music: {
      tab: { position: 'right', color: 'bg-[#8da8be]', borderColor: 'border-[#abc2d4]', emoji: '🎧', label: 'PLAYLIST' },
      body: { bgColor: 'bg-[#8da8be]', borderColor: 'border-[#b2c8da]', accentColor: 'bg-sky-200', title: 'For May Kyal Lay🙆🏻 songs', titleColor: 'text-[#0d2232]', subtitle: 'you can listen to my feelings', subtitleColor: 'text-[#1e3c54]', actionLabel: 'Listen Now', iconBg: 'bg-[#7593ab]', iconBorder: 'border-sky-200/40', icon: '🎶' },
      object: <VinylRecord />
    },
    gallery: {
      tab: { position: 'left', color: 'bg-[#c2aa96]', borderColor: 'border-[#d4bfad]', emoji: '📷', label: 'May Kyal\'s' },
      body: { bgColor: 'bg-[#c2aa96]', borderColor: 'border-[#d8c5b3]', accentColor: 'bg-amber-200', title: 'May Kyal Lay\'s Collection✨', titleColor: 'text-[#2a1d11]', subtitle: 'These are my favourite', subtitleColor: 'text-[#4c3927]', actionLabel: 'View Photos', iconBg: 'bg-[#b09681]', iconBorder: 'border-amber-200/40', icon: '✨' },
      object: <PolaroidPhoto />
    }
  }

  const config = configs[folder]
  if (!config) return null

  return (
    <div className="relative w-full group cursor-pointer overflow-visible">
      {config.object}

      <FolderTab {...config.tab} />

      <div
        className={`relative w-full ${config.body.bgColor} rounded-b-2xl sm:rounded-b-3xl ${config.tab.position === 'left' ? 'rounded-tr-2xl sm:rounded-tr-3xl' : 'rounded-tl-2xl sm:rounded-tl-3xl'} shadow-folder-layer border-t ${config.body.borderColor} overflow-hidden min-h-[160px] sm:min-h-[175px] flex flex-col justify-between transition-all duration-300 group-hover:brightness-[1.02] cursor-pointer`}
        onClick={onClick}
      >
        <div className="w-full bg-white h-6 sm:h-7 rounded-t-xl sm:rounded-t-2xl shadow-paper-lip flex items-center justify-between px-8 border-b border-stone-200">
          <span className={`h-1.5 w-16 ${config.body.accentColor} rounded-full`}></span>
          <span className="text-[10px] font-typewriter text-stone-400 uppercase tracking-widest">
            {folder === 'letter' ? 'Handwritten Memory • Click to read' : folder === 'music' ? 'Lo-Fi Mixtape Tape 01 • Click to play' : 'Polaroid Scrapbook • Click to open album'}
          </span>
          <span className={`h-1.5 w-16 ${config.body.accentColor} rounded-full`}></span>
        </div>

        <div className="px-4 sm:px-10 py-5 sm:py-9 flex items-center justify-between gap-2 sm:gap-4 flex-1">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
            <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full ${config.body.iconBg} flex items-center justify-center text-white text-xl sm:text-3xl shadow-inner border ${config.body.iconBorder} flex-shrink-0`}>
              {config.body.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`font-serif font-bold text-base sm:text-lg ${config.body.titleColor} tracking-tight truncate`}>{config.body.title}</h2>
              <p className={`font-typewriter text-[11px] sm:text-xs ${config.body.subtitleColor} mt-1 truncate`}>{config.body.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0">
            <span className={`font-typewriter text-xs sm:text-sm font-bold tracking-widest uppercase ${config.body.titleColor} bg-white/80 backdrop-blur-sm border ${config.body.borderColor} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm group-hover:bg-[#4a151b] group-hover:text-white transition-all whitespace-nowrap flex-shrink-0`}>
              {config.body.actionLabel} →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
