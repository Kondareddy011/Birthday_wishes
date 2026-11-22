import React from 'react';
import { Sparkles, Check, Flame, Wind } from 'lucide-react';

/**
 * RealisticDarkForestCake
 * 
 * An ultra-realistic, authentic German Dark Forest Gateau (Schwarzwälder Kirschtorte)
 * centerpiece with rich interactive blowing & slicing ceremonies:
 * 
 * - Burnished silver pedestal platter with soft reflective drop shadow
 * - Moist Dutch cocoa multi-layered sponge body coated with velvety chocolate ganache
 * - Hand-shaved dark chocolate bark curls & flakes piled across the crown and sides
 * - 8 piped 3D Chantilly whipped cream rosettes with fluted peaks
 * - 8 glossy, plump, deep-ruby Kirsch sour cherries with curved stems and specular highlights
 * - 3 artisan birthday candles firmly planted into the top of the cake
 * - DYNAMIC BLOWING: Visual wind gusts sweep across the candles, causing flames to bend, flicker, and puff into curling smoke!
 * - DYNAMIC SLICING: Ceremonial knife descends and cuts through the cake, physically sliding out a delicious wedge slice with exposed 3-layer cocoa sponge, Chantilly cream, and cherry compote!
 * - DIRECT INTERACTION: Clicking directly on the cake triggers blowing and cutting!
 */
export default function RealisticDarkForestCake({
  candlesBlown = false,
  isBlowing = false,
  cakeCut = false,
  isCutting = false,
  onBlow,
  onCut,
  celebrantAge = 22
}) {
  const handleClickStage = () => {
    if (!candlesBlown && !isBlowing && onBlow) {
      onBlow();
    } else if (candlesBlown && !cakeCut && !isCutting && onCut) {
      onCut();
    }
  };

  const getStageCursor = () => {
    if (!candlesBlown && !isBlowing) return 'cursor-pointer';
    if (candlesBlown && !cakeCut && !isCutting) return 'cursor-pointer';
    return 'cursor-default';
  };

  return (
    <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto select-none py-1 flex flex-col items-center">
      {/* Slicing Knife Animation */}
      {isCutting && (
        <div className="absolute z-50 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-knife-slice">
          <div className="w-12 h-56 sm:h-64 flex flex-col items-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]">
            {/* Knife Handle (Obsidian & Brass Rivets) */}
            <div className="w-6 h-18 sm:h-20 bg-gradient-to-b from-zinc-800 via-zinc-950 to-black rounded-t-lg border border-zinc-700 shadow-inner flex flex-col items-center justify-around py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
            </div>
            {/* Knife Bolster */}
            <div className="w-8 h-2.5 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 shadow-sm" />
            {/* Japanese Steel Knife Blade with Mirror Polished Edge */}
            <div className="w-7 h-40 sm:h-44 bg-gradient-to-r from-slate-200 via-white to-zinc-300 rounded-b-2xl border-x border-b border-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-y-0 left-1 w-1 bg-white opacity-90 blur-[0.5px]" />
              <div className="absolute bottom-2 right-1 text-[7px] font-mono text-zinc-500 font-bold rotate-90">
                GERMAN STEEL
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Cake Showcase Stage (Clickable) */}
      <div
        onClick={handleClickStage}
        className={`relative w-full h-[250px] sm:h-[310px] md:h-[360px] lg:h-[400px] max-h-[46vh] rounded-3xl overflow-hidden glass-card-bw border-2 border-white/20 shadow-2xl flex items-center justify-center p-3 sm:p-5 bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 group ${getStageCursor()}`}
        title={
          !candlesBlown
            ? 'Click to blow out the candles!'
            : !cakeCut
            ? 'Click to slice the cake!'
            : 'Dark Forest Cake sliced!'
        }
      >
        {/* Warm Ambient Halo Behind the Cake */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        {/* Interactive Floating Hover Prompt Badge */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300">
          {!candlesBlown && !isBlowing && (
            <div className="px-5 py-2 rounded-full bg-black/90 backdrop-blur-md border border-white/35 text-white text-xs sm:text-sm font-mono shadow-2xl flex items-center gap-2 group-hover:scale-105 group-hover:border-white transition-all">
              <Wind className="w-4 h-4 text-white animate-pulse" />
              <span>Click cake to blow out candles! 💨</span>
            </div>
          )}
          {isBlowing && (
            <div className="px-5 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-mono font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <Wind className="w-4 h-4 text-black" />
              <span>Blowing out the candles... 🌬️</span>
            </div>
          )}
          {candlesBlown && !cakeCut && !isCutting && (
            <div className="px-5 py-2 rounded-full bg-black/90 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-mono shadow-2xl flex items-center gap-2 group-hover:scale-105 group-hover:border-white transition-all animate-pulse">
              <span>🔪 Click cake to slice with ceremonial knife!</span>
            </div>
          )}
          {isCutting && (
            <div className="px-5 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-mono font-bold shadow-2xl flex items-center gap-2">
              <span>🔪 Slicing the Dark Forest cake...</span>
            </div>
          )}
        </div>

        {/* Master Realistic SVG Dark Forest Cake */}
        <svg
          viewBox="0 0 500 380"
          className="w-full h-full max-h-full drop-shadow-2xl overflow-visible mx-auto"
        >
          <defs>
            {/* Platter Silver Gradients */}
            <radialGradient id="platterTopGrad" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="90%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </radialGradient>
            <linearGradient id="platterRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="25%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Dark Forest Chocolate Cake Side Gradient */}
            <linearGradient id="cakeSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#140b08" />
              <stop offset="20%" stopColor="#25140d" />
              <stop offset="50%" stopColor="#3d2116" />
              <stop offset="80%" stopColor="#25140d" />
              <stop offset="100%" stopColor="#110906" />
            </linearGradient>

            {/* Dark Chocolate Top Ganache Glaze */}
            <radialGradient id="cakeTopGanache" cx="48%" cy="46%" r="52%">
              <stop offset="0%" stopColor="#422216" />
              <stop offset="60%" stopColor="#2d170f" />
              <stop offset="85%" stopColor="#211009" />
              <stop offset="100%" stopColor="#150a06" />
            </radialGradient>

            {/* Whipped Chantilly Cream Rosette Gradient */}
            <radialGradient id="creamRosetteGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f8fafc" />
              <stop offset="80%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>

            {/* Ruby Kirsch Cherry Gradient */}
            <radialGradient id="rubyCherryGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="35%" stopColor="#c9184a" />
              <stop offset="70%" stopColor="#800f2f" />
              <stop offset="100%" stopColor="#400516" />
            </radialGradient>

            {/* Candle Wax Gradients */}
            <linearGradient id="candleWaxWhite" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="candleWaxGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="35%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Cake Cut Interior Layer Gradients */}
            <linearGradient id="spongeDarkLayer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#24130c" />
              <stop offset="50%" stopColor="#381d13" />
              <stop offset="100%" stopColor="#22110a" />
            </linearGradient>
            <linearGradient id="creamCompoteLayer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff5f5" />
              <stop offset="30%" stopColor="#800f2f" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Drop Shadows */}
            <filter id="softPlatterShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000000" floodOpacity="0.85" />
            </filter>
            <filter id="cherryGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#ff4d6d" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. TABLE SURFACE DROP SHADOW */}
          <ellipse cx="250" cy="330" rx="195" ry="32" fill="#000000" opacity="0.9" filter="url(#softPlatterShadow)" />

          {/* 2. BURNISHED SILVER PLATTER BASE & RIM */}
          <path d="M 55,305 C 55,340 445,340 445,305 L 435,318 C 435,350 65,350 65,318 Z" fill="url(#platterRimGrad)" />
          <ellipse cx="250" cy="305" rx="190" ry="34" fill="url(#platterTopGrad)" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="250" cy="305" rx="172" ry="29" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

          {/* 3. MAIN CAKE BODY */}
          <g id="cakeBody">
            {/* Cake side cylinder wall */}
            <path
              d="M 100,210 L 100,285 C 100,320 400,320 400,285 L 400,210 C 400,245 100,245 100,210 Z"
              fill="url(#cakeSideGrad)"
            />

            {/* Shaved Dark Chocolate Flakes texture on side */}
            <g opacity="0.85" stroke="#100705" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 120,240 Q 128,245 125,252" />
              <path d="M 140,255 Q 148,252 145,263" />
              <path d="M 170,245 Q 177,250 173,260" />
              <path d="M 195,262 Q 204,266 200,274" />
              <path d="M 230,250 Q 238,245 235,258" />
              <path d="M 260,265 Q 268,268 265,277" />
              <path d="M 290,248 Q 298,252 295,262" />
              <path d="M 320,260 Q 328,256 325,268" />
              <path d="M 350,245 Q 358,250 355,260" />
              <path d="M 375,255 Q 383,252 380,264" />
              <path d="M 135,235 Q 140,238 138,244" stroke="#522a1b" strokeWidth="1.5" />
              <path d="M 215,248 Q 220,252 218,258" stroke="#522a1b" strokeWidth="1.5" />
              <path d="M 305,240 Q 310,244 308,250" stroke="#522a1b" strokeWidth="1.5" />
              <path d="M 365,250 Q 370,254 368,260" stroke="#522a1b" strokeWidth="1.5" />
            </g>

            {/* Cake Top Ellipse (Glossy Ganache Glaze) */}
            <ellipse
              cx="250"
              cy="210"
              rx="150"
              ry="38"
              fill="url(#cakeTopGanache)"
              stroke="#1a0d08"
              strokeWidth="2"
            />

            {/* Specular Glaze Light Reflection Arc */}
            <path
              d="M 145,212 C 180,225 320,225 355,212"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.25"
            />
          </g>

          {/* 4. EXPOSED CUT GAP IN MAIN CAKE (When Sliced) */}
          {cakeCut && (
            <g id="mainCakeCutGap">
              {/* Dark internal hollow/cut gap */}
              <polygon points="250,210 248,295 210,290 220,214" fill="#130805" />
              {/* Left Exposed Cake Wall (3 Dutch Cocoa Layers & Cream Compote) */}
              <polygon points="220,214 210,290 230,293 238,216" fill="url(#spongeDarkLayer)" />
              <polygon points="224,232 216,270 226,272 232,234" fill="url(#creamCompoteLayer)" />
              <polygon points="226,248 220,262 225,263 229,249" fill="url(#spongeDarkLayer)" />
              {/* Gap edge shadow */}
              <line x1="250" y1="210" x2="248" y2="295" stroke="#000000" strokeWidth="2.5" />
              <line x1="220" y1="214" x2="210" y2="290" stroke="#ff4d6d" strokeWidth="1" opacity="0.8" />
            </g>
          )}

          {/* 5. MOUNTAIN OF SHAVED DARK CHOCOLATE BARK IN CENTER */}
          <g id="chocolateShavingsCenter">
            <path d="M 225,200 C 235,190 250,192 258,202" fill="none" stroke="#120603" strokeWidth="4" strokeLinecap="round" />
            <path d="M 240,205 C 248,196 260,198 268,207" fill="none" stroke="#25120a" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 215,208 C 224,201 236,203 242,212" fill="none" stroke="#170804" strokeWidth="4" strokeLinecap="round" />
            <path d="M 248,212 C 256,204 270,207 274,216" fill="none" stroke="#2a150c" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 230,215 C 238,208 252,210 256,220" fill="none" stroke="#110502" strokeWidth="4" strokeLinecap="round" />
            <path d="M 220,204 Q 226,198 232,204" fill="none" stroke="#482516" strokeWidth="2" strokeLinecap="round" />
            <path d="M 255,206 Q 262,200 268,206" fill="none" stroke="#482516" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* 6. PIPED CHANTILLY CREAM ROSETTES & RUBY KIRSCH CHERRIES (AROUND RIM) */}
          {/* Back Rosette 1 (Top Left): cx=190, cy=186 */}
          <g id="cherryRosette1">
            <ellipse cx="190" cy="188" rx="14" ry="9" fill="url(#creamRosetteGrad)" />
            <circle cx="190" cy="183" r="8" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="188" cy="181" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.8" />
            <path d="M 190,178 C 192,168 185,164 182,160" fill="none" stroke="#2b1509" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Back Rosette 2 (Top Center): cx=250, cy=178 */}
          <g id="cherryRosette2">
            <ellipse cx="250" cy="180" rx="15" ry="9" fill="url(#creamRosetteGrad)" />
            <circle cx="250" cy="175" r="8.5" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="248" cy="173" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.8" />
            <path d="M 250,170 C 252,160 258,155 264,152" fill="none" stroke="#2b1509" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Back Rosette 3 (Top Right): cx=310, cy=186 */}
          <g id="cherryRosette3">
            <ellipse cx="310" cy="188" rx="14" ry="9" fill="url(#creamRosetteGrad)" />
            <circle cx="310" cy="183" r="8" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="308" cy="181" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.8" />
            <path d="M 310,178 C 313,168 318,162 322,158" fill="none" stroke="#2b1509" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Mid Left Rosette 4: cx=135, cy=202 */}
          <g id="cherryRosette4">
            <ellipse cx="135" cy="204" rx="16" ry="10" fill="url(#creamRosetteGrad)" />
            <circle cx="135" cy="198" r="9" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="133" cy="195" rx="3" ry="2" fill="#ffffff" opacity="0.85" />
            <path d="M 135,193 C 137,180 128,175 124,170" fill="none" stroke="#2b1509" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Mid Right Rosette 5: cx=365, cy=202 */}
          <g id="cherryRosette5">
            <ellipse cx="365" cy="204" rx="16" ry="10" fill="url(#creamRosetteGrad)" />
            <circle cx="365" cy="198" r="9" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="363" cy="195" rx="3" ry="2" fill="#ffffff" opacity="0.85" />
            <path d="M 365,193 C 368,180 376,176 382,172" fill="none" stroke="#2b1509" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Front Left Rosette 6: cx=175, cy=226 */}
          <g id="cherryRosette6">
            <ellipse cx="175" cy="230" rx="18" ry="12" fill="url(#creamRosetteGrad)" />
            <circle cx="175" cy="222" r="10" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="172" cy="219" rx="3.5" ry="2" fill="#ffffff" opacity="0.9" />
            <path d="M 175,216 C 178,200 170,192 165,188" fill="none" stroke="#2b1509" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Front Center Rosette 7 (If not cut, or part of whole): cx=250, cy=236 */}
          {!cakeCut && (
            <g id="cherryRosette7">
              <ellipse cx="250" cy="240" rx="19" ry="13" fill="url(#creamRosetteGrad)" />
              <circle cx="250" cy="231" r="10.5" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
              <ellipse cx="247" cy="227" rx="3.5" ry="2" fill="#ffffff" opacity="0.9" />
              <path d="M 250,225 C 253,208 260,202 268,198" fill="none" stroke="#2b1509" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {/* Front Right Rosette 8: cx=325, cy=226 */}
          <g id="cherryRosette8">
            <ellipse cx="325" cy="230" rx="18" ry="12" fill="url(#creamRosetteGrad)" />
            <circle cx="325" cy="222" r="10" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
            <ellipse cx="322" cy="219" rx="3.5" ry="2" fill="#ffffff" opacity="0.9" />
            <path d="M 325,216 C 328,200 338,194 345,190" fill="none" stroke="#2b1509" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* 7. THE SEPARATED SLICE OF DARK FOREST CAKE (PULLS FORWARD WHEN CUT!) */}
          {cakeCut && (
            <g id="separatedCakeSlice" className="animate-slice-slide-out">
              {/* Slice drop shadow on platter */}
              <ellipse cx="274" cy="308" rx="42" ry="16" fill="#000000" opacity="0.75" />

              {/* Sliced Wedge Cake Body */}
              {/* Left Cut Wall of the Slice */}
              <polygon points="252,212 248,296 284,302 288,218" fill="url(#cakeSideGrad)" />

              {/* Right Cut Wall (Exposed Layers: 3 Cocoa Sponge, 2 Chantilly Cream & Kirsch Cherries) */}
              <polygon points="252,212 288,218 284,302 248,296" fill="#1b0e08" />
              {/* Layer 1: Dutch Cocoa Sponge */}
              <polygon points="252,214 288,220 287,238 251,232" fill="url(#spongeDarkLayer)" />
              {/* Layer 2: Whipped Cream & Spiced Kirsch Cherry Compote */}
              <polygon points="251,232 287,238 286,252 250,246" fill="url(#creamCompoteLayer)" />
              {/* Layer 3: Middle Cocoa Sponge */}
              <polygon points="250,246 286,252 285,268 249,262" fill="url(#spongeDarkLayer)" />
              {/* Layer 4: Whipped Cream & Cherry Compote */}
              <polygon points="249,262 285,268 284,282 248,276" fill="url(#creamCompoteLayer)" />
              {/* Layer 5: Base Cocoa Sponge */}
              <polygon points="248,276 284,282 284,302 248,296" fill="url(#spongeDarkLayer)" />

              {/* Slice Top Ganache Triangle */}
              <polygon points="252,212 288,218 274,236" fill="url(#cakeTopGanache)" stroke="#1a0d08" strokeWidth="1" />

              {/* Piped Cream Rosette & Glossy Cherry on Top of Sliced Wedge */}
              <g id="sliceRosetteCherry">
                <ellipse cx="274" cy="236" rx="17" ry="11" fill="url(#creamRosetteGrad)" />
                <circle cx="274" cy="228" r="9.5" fill="url(#rubyCherryGrad)" filter="url(#cherryGlow)" />
                <ellipse cx="271" cy="225" rx="3" ry="1.8" fill="#ffffff" opacity="0.9" />
                <path d="M 274,223 C 277,208 284,202 290,198" fill="none" stroke="#2b1509" strokeWidth="1.4" strokeLinecap="round" />
              </g>

              {/* Sliced Wedge Plate Tag */}
              <rect x="250" y="306" width="48" height="14" rx="7" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <text x="274" y="316" textAnchor="middle" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="900">
                1st SLICE 🍰
              </text>
            </g>
          )}

          {/* 8. THREE ARTISAN CANDLES ROOTED IN THE CAKE */}
          {/* Candle 1 (Left - cx=215, cy=180) */}
          <g id="artisanCandle1">
            <rect x="211" y="130" width="8" height="52" rx="2" fill="url(#candleWaxWhite)" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="211" y1="140" x2="219" y2="145" stroke="#000000" strokeWidth="1.5" />
            <line x1="211" y1="155" x2="219" y2="160" stroke="#000000" strokeWidth="1.5" />
            <line x1="211" y1="170" x2="219" y2="175" stroke="#000000" strokeWidth="1.5" />
            <line x1="215" y1="130" x2="215" y2="123" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

            {/* Candle 1 Flame / Smoke / Wind Reaction */}
            {!candlesBlown && !isBlowing && (
              <g id="flame1" className="animate-flame-wobble-1 origin-bottom">
                <ellipse cx="215" cy="115" rx="18" ry="24" fill="#f59e0b" opacity="0.35" />
                <path d="M 215,96 C 222,108 221,122 215,123 C 209,122 208,108 215,96 Z" fill="#f97316" />
                <path d="M 215,102 C 219,112 218,121 215,122 C 212,121 211,112 215,102 Z" fill="#fde047" />
                <ellipse cx="215" cy="117" rx="2" ry="4" fill="#ffffff" />
              </g>
            )}
            {isBlowing && (
              <g id="flame1Blowing" className="animate-flame-bend origin-bottom">
                <path d="M 215,96 C 225,108 221,122 215,123 C 209,122 208,108 215,96 Z" fill="#f97316" />
                <path d="M 215,102 C 221,112 218,121 215,122 C 212,121 211,112 215,102 Z" fill="#fde047" />
              </g>
            )}
            {candlesBlown && (
              <g id="smoke1" className="animate-smoke-wisp">
                <path d="M 215,122 C 213,114 218,108 215,100 C 212,92 217,86 214,78" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              </g>
            )}
          </g>

          {/* Candle 2 (Center - Milestone Crown - cx=250, cy=170) */}
          <g id="artisanCandle2">
            <rect x="245" y="112" width="10" height="64" rx="2.5" fill="url(#candleWaxGold)" stroke="#451a03" strokeWidth="1" />
            <line x1="245" y1="125" x2="255" y2="131" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="245" y1="142" x2="255" y2="148" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="245" y1="159" x2="255" y2="165" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="250" y1="112" x2="250" y2="104" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

            {!candlesBlown && !isBlowing && (
              <g id="flame2" className="animate-flame-wobble-2 origin-bottom">
                <ellipse cx="250" cy="94" rx="22" ry="28" fill="#f59e0b" opacity="0.45" />
                <path d="M 250,72 C 259,86 258,103 250,104 C 242,103 241,86 250,72 Z" fill="#f97316" />
                <path d="M 250,80 C 255,92 254,102 250,103 C 246,102 245,92 250,80 Z" fill="#fef08a" />
                <ellipse cx="250" cy="97" rx="2.5" ry="5" fill="#ffffff" />
              </g>
            )}
            {isBlowing && (
              <g id="flame2Blowing" className="animate-flame-bend origin-bottom">
                <path d="M 250,72 C 262,86 258,103 250,104 C 242,103 241,86 250,72 Z" fill="#f97316" />
                <path d="M 250,80 C 258,92 254,102 250,103 C 246,102 245,92 250,80 Z" fill="#fef08a" />
              </g>
            )}
            {candlesBlown && (
              <g id="smoke2" className="animate-smoke-wisp">
                <path d="M 250,104 C 253,94 247,87 251,78 C 255,70 248,62 252,52" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              </g>
            )}
          </g>

          {/* Candle 3 (Right - cx=285, cy=180) */}
          <g id="artisanCandle3">
            <rect x="281" y="130" width="8" height="52" rx="2" fill="url(#candleWaxWhite)" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="281" y1="140" x2="289" y2="145" stroke="#000000" strokeWidth="1.5" />
            <line x1="281" y1="155" x2="289" y2="160" stroke="#000000" strokeWidth="1.5" />
            <line x1="281" y1="170" x2="289" y2="175" stroke="#000000" strokeWidth="1.5" />
            <line x1="285" y1="130" x2="285" y2="123" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

            {!candlesBlown && !isBlowing && (
              <g id="flame3" className="animate-flame-wobble-3 origin-bottom">
                <ellipse cx="285" cy="115" rx="18" ry="24" fill="#f59e0b" opacity="0.35" />
                <path d="M 285,96 C 292,108 291,122 285,123 C 279,122 278,108 285,96 Z" fill="#f97316" />
                <path d="M 285,102 C 289,112 288,121 285,122 C 281,121 280,112 285,102 Z" fill="#fde047" />
                <ellipse cx="285" cy="117" rx="2" ry="4" fill="#ffffff" />
              </g>
            )}
            {isBlowing && (
              <g id="flame3Blowing" className="animate-flame-bend origin-bottom">
                <path d="M 285,96 C 295,108 291,122 285,123 C 279,122 278,108 285,96 Z" fill="#f97316" />
                <path d="M 285,102 C 289,112 288,121 285,122 C 281,121 280,112 285,102 Z" fill="#fde047" />
              </g>
            )}
            {candlesBlown && (
              <g id="smoke3" className="animate-smoke-wisp">
                <path d="M 285,122 C 287,114 282,108 285,100 C 288,92 283,86 286,78" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              </g>
            )}
          </g>

          {/* 9. VISUAL WIND GUST EFFECT (Active during Blowing Animation) */}
          {isBlowing && (
            <g id="windGustEffect" className="animate-wind-gust pointer-events-none">
              <path
                d="M 100,110 Q 180,95 240,110 T 360,105"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 120,125 Q 200,115 260,122 T 380,118"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 90,95 Q 160,85 220,95 T 320,92"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Floating sparkling breath particles */}
              <circle cx="210" cy="105" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="255" cy="98" r="3" fill="#ffffff" opacity="0.8" />
              <circle cx="280" cy="115" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="310" cy="100" r="2.5" fill="#ffffff" opacity="0.85" />
            </g>
          )}

          {/* 10. CELEBRATION MILESTONE PLAQUE */}
          <g id="milestonePlaque" transform="translate(250, 276)">
            <rect
              x="-60"
              y="-12"
              width="120"
              height="24"
              rx="12"
              fill="#000000"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.92"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="2"
            >
              ★ {celebrantAge} YEARS ★
            </text>
          </g>
        </svg>

        {/* Slice Cut Reveal Badge Notification */}
        {cakeCut && (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-4 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/40 text-white text-[10px] font-mono shadow-2xl flex items-center gap-1.5 animate-in zoom-in duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">✓ Slice Cut Revealed</span>
          </div>
        )}
      </div>
    </div>
  );
}
