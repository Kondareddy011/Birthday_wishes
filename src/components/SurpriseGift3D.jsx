import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, RotateCcw, Award, FileText, CheckCircle2, Crown } from 'lucide-react';
import { playUnboxChime, playPartyFanfare } from '../utils/soundEffects';

export default function SurpriseGift3D({ celebrant, theme }) {
  // Stages: 0 = wrapped, 1 = untied, 2 = opened/revealed
  const [stage, setStage] = useState(0);
  const [activeTab, setActiveTab] = useState('letter'); // 'letter' | 'voucher' | 'trophy'
  const [isHovered, setIsHovered] = useState(false);

  const handleUntieRibbon = () => {
    playUnboxChime();
    setStage(1);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8'],
    });
  };

  const handleOpenLid = () => {
    playPartyFanfare();
    setStage(2);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#CBD5E1', '#94A3B8'],
    });
  };

  const handleReset = () => {
    setStage(0);
    setActiveTab('letter');
  };

  return (
    <section id="surprise-gift" className="relative py-12 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Background ambient monochromatic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-3 shadow-glow-white">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
          <span>Interactive 3D Mystery Box</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-serif-festive font-black text-white mb-2">
          Unwrap Your Birthday Mystery 🎁
        </h3>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-lg mx-auto">
          {stage === 0 && "Handcrafted for your milestone year. Click the platinum bow to untie!"}
          {stage === 1 && "The silver ribbon has loosened! Now click the lid to pop open your gift."}
          {stage === 2 && "✨ UNBOXED! Explore your private letter of honor, VIP privileges, and milestone trophy."}
        </p>
      </div>

      {/* Main 3D Stage Container */}
      <div className="relative min-h-[460px] flex flex-col items-center justify-center">
        {/* Stage 0 & 1: 3D Obsidian Gift Box */}
        {stage < 2 ? (
          <div
            className="perspective-1000 flex flex-col items-center cursor-pointer select-none group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={stage === 0 ? handleUntieRibbon : handleOpenLid}
          >
            {/* Instruction tooltip badge */}
            <div className="mb-8 px-5 py-2 rounded-full bg-black/90 border border-white/30 text-white text-xs font-mono font-bold shadow-glow-white flex items-center gap-2 animate-bounce-subtle">
              <Gift className="w-3.5 h-3.5 text-white" />
              <span>
                {stage === 0 ? '✨ Step 1: Click the Silver Bow to Untie' : '🚀 Step 2: Click Box to Pop Open the Lid!'}
              </span>
            </div>

            {/* 3D Box Construction */}
            <div
              className={`relative w-56 h-56 sm:w-64 sm:h-64 transition-transform duration-500 transform-style-3d ${
                isHovered ? 'scale-105 rotate-x-6' : 'rotate-x-12'
              }`}
              style={{
                transform: `rotateX(-12deg) rotateY(${isHovered ? '16deg' : '-16deg'})`,
              }}
            >
              {/* Box Lid */}
              <div
                className={`absolute -top-4 -left-2 w-[106%] h-14 bg-gradient-to-r from-zinc-800 via-zinc-900 to-black rounded-t-xl shadow-2xl border-b-2 border-white/40 border-t border-x border-white/20 transition-all duration-700 z-30 flex items-center justify-center ${
                  stage === 1 ? '-translate-y-6 rotate-[-12deg]' : ''
                }`}
              >
                {/* Horizontal Ribbon on Lid */}
                <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 top-1/2 -translate-y-1/2 shadow-md border-y border-white" />
                {/* Vertical Ribbon on Lid */}
                <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-zinc-300 via-white to-zinc-400 left-1/2 -translate-x-1/2 shadow-md border-x border-white" />

                {/* 3D Platinum Bow on Top */}
                <div
                  className={`absolute -top-7 left-1/2 -translate-x-1/2 transition-transform duration-500 ${
                    stage === 0 ? 'scale-100 group-hover:scale-110 animate-bounce-subtle' : 'scale-0 opacity-0'
                  }`}
                >
                  <div className="relative w-14 h-12 flex items-center justify-center">
                    {/* Left Loop */}
                    <div className="absolute left-0 w-7 h-8 bg-gradient-to-tr from-white via-zinc-200 to-zinc-400 rounded-full border border-white shadow-lg transform -rotate-45" />
                    {/* Right Loop */}
                    <div className="absolute right-0 w-7 h-8 bg-gradient-to-tl from-white via-zinc-200 to-zinc-400 rounded-full border border-white shadow-lg transform rotate-45" />
                    {/* Center Knot */}
                    <div className="relative w-5 h-5 bg-white rounded-full shadow-md border border-black z-10" />
                  </div>
                </div>
              </div>

              {/* Box Main Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 rounded-b-2xl shadow-2xl border border-white/20 overflow-hidden flex items-center justify-center">
                {/* Corner highlight */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                {/* Vertical Platinum Ribbon */}
                <div
                  className={`absolute inset-y-0 w-6 bg-gradient-to-b from-zinc-300 via-white to-zinc-400 left-1/2 -translate-x-1/2 shadow-lg border-x border-white/40 transition-all duration-500 ${
                    stage === 1 ? 'scale-y-0 opacity-0' : ''
                  }`}
                />

                {/* Horizontal Platinum Ribbon */}
                <div
                  className={`absolute inset-x-0 h-6 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 top-1/2 -translate-y-1/2 shadow-lg border-y border-white/40 transition-all duration-500 ${
                    stage === 1 ? 'scale-x-0 opacity-0' : ''
                  }`}
                />

                {/* Celebrant Monogram Medallion */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-white via-zinc-400 to-zinc-800 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="font-serif-festive font-black text-2xl text-white tracking-wider">
                      {celebrant.name ? celebrant.name.charAt(0) : 'S'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pedestal Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/80 rounded-full blur-xl -z-10 transform scale-y-50" />
            </div>

            <p className="mt-10 text-xs font-mono text-slate-400 group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>Click to unbox</span>
              <span className="animate-pulse">👉</span>
            </p>
          </div>
        ) : (
          /* Stage 2: Revealed Interactive Content */
          <div className="w-full max-w-2xl glass-panel-bw rounded-3xl border border-white/30 p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-500 text-white">
            {/* Surprise Tabs */}
            <div className="flex items-center justify-center gap-2 mb-6 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('letter')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'letter'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Letter of Honor</span>
              </button>
              <button
                onClick={() => setActiveTab('voucher')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'voucher'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>VIP Birthday Pass</span>
              </button>
              <button
                onClick={() => setActiveTab('trophy')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'trophy'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Milestone Trophy</span>
              </button>
            </div>

            {/* TAB 1: SECRET LETTER OF HONOR */}
            {activeTab === 'letter' && (
              <div className="bg-black/80 text-white rounded-2xl p-6 sm:p-8 shadow-inner border border-white/20 font-serif relative">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px] shadow-glow-white font-mono border border-black">
                  SEAL
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                  Personal Keepsake Note
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 font-serif-festive">
                  Dearest {celebrant.name},
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-slate-200 mb-6 font-serif italic">
                  "{celebrant.giftConfig?.secretMessage ||
                    "May this milestone birthday bring you closer to every bold dream you hold in your heart. Thank you for filling our lives with brilliance, steady loyalty, endless laughter, and memories that time can never erase."}"
                </p>
                <div className="text-right pt-3 border-t border-white/20 text-xs font-mono text-slate-300">
                  Signed with infinite affection, <br />
                  <strong className="text-white text-sm font-serif">{celebrant.giftConfig?.author || "All Who Love & Adore You"} 🤍</strong>
                </div>
              </div>
            )}

            {/* TAB 2: VIP VOUCHER */}
            {activeTab === 'voucher' && (
              <div className="p-6 rounded-2xl bg-black/90 border border-white/30 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold border border-white/20">
                      <Award className="w-3.5 h-3.5 text-white" />
                      <span>OFFICIAL BIRTHDAY VIP PASS</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-extrabold text-white font-serif-festive">
                      {celebrant.giftConfig?.voucherTitle || "Infinite Hugs, Midnight Treats & Unconditional Favors"}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Redeemable at any time • Never expires • Good for lifetime joy.
                    </p>
                  </div>
                  <div className="bg-black px-4 py-3 rounded-xl border border-dashed border-white/40 text-center shrink-0">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block">Voucher Code</span>
                    <span className="font-mono text-xs font-black text-white tracking-widest">
                      {celebrant.giftConfig?.voucherCode || `BDAY-${celebrant.name.toUpperCase()}-2026`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MILESTONE TROPHY */}
            {activeTab === 'trophy' && (
              <div className="p-6 rounded-2xl bg-black/90 border border-white/30 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-2xl mx-auto shadow-glow-white">
                  👑
                </div>
                <h4 className="text-lg font-serif-festive font-black text-white">
                  The {celebrant.age === 22 ? '22nd' : `${celebrant.age}th`} Year Milestone Medallion
                </h4>
                <p className="text-xs font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
                  Bestowed upon {celebrant.name} for being an extraordinary force of kindness, brilliance, and timeless inspiration to everyone fortunate enough to know them.
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  Lifetime Hall of Fame Induction
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rewrap Mystery Box</span>
              </button>

              <button
                onClick={() => {
                  playPartyFanfare();
                  confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
                  });
                }}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5"
              >
                <span>✨ Sparkle Burst</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
