import React from 'react';
import { Sparkles, CheckCircle2, Lock, Unlock, Eye, EyeOff } from 'lucide-react';

export const PAGES_META = [
  { id: 1, title: 'The Grand Welcome & Cake', short: 'Cake & Hologram', emoji: '🎂', surprise: 'Cake Cut & 3D Hologram' },
  { id: 2, title: 'The Mystery Vault & Perks', short: 'Gift & Capsule', emoji: '🎁', surprise: 'Scratch Card & Trophy' },
  { id: 3, title: 'Hall of Wishes & Oracle', short: 'Wishes & Oracle', emoji: '🔮', surprise: 'Sky Lantern & Crystal Ball' },
  { id: 4, title: 'The Grand Finale Party', short: 'Grand Finale', emoji: '🍾', surprise: 'Champagne Pop & Award' },
];

export default function PageProgressBar({
  currentPage,
  onSelectPage,
  unlockedPages = [1],
  onUnlockAll,
  onResetProgress
}) {
  const currentMeta = PAGES_META.find((p) => p.id === currentPage) || PAGES_META[0];
  const progressPercent = (currentPage / PAGES_META.length) * 100;
  const isAllUnlocked = unlockedPages.length >= PAGES_META.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-4 print:hidden">
      {/* Top Banner Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentMeta.emoji}</span>
          <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-slate-300">
            Chapter {currentPage} of {PAGES_META.length}:
          </span>
          <span className="text-sm sm:text-base font-serif font-bold text-white">
            {currentMeta.title}
          </span>
        </div>

        {/* Surprise Hint Badge & Discovery Toggle */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold shadow-glow-white">
            <Sparkles className="w-3 h-3 text-white animate-spin-slow" />
            <span>Surprise: <strong>{currentMeta.surprise}</strong></span>
          </div>

          <button
            onClick={isAllUnlocked ? onResetProgress : onUnlockAll}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-[10px] font-mono text-slate-300 hover:text-white transition-all"
            title={isAllUnlocked ? 'Hide chapters one after one' : 'Reveal all 4 chapters'}
          >
            {isAllUnlocked ? (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hide One-by-One</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>Reveal All</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monochrome Progress Track */}
      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-white/10 mb-4 p-0">
        <div
          className="h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-300 rounded-full transition-all duration-500 shadow-glow-white"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 4 Chapter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PAGES_META.map((p) => {
          const isUnlocked = unlockedPages.includes(p.id);
          const isActive = p.id === currentPage;
          const isPassed = p.id < currentPage;

          if (!isUnlocked) {
            // Hidden / Locked
            return (
              <div
                key={p.id}
                className="p-2.5 rounded-xl border border-dashed border-zinc-800 bg-black/40 text-center flex flex-col items-center justify-center gap-1 opacity-40 select-none cursor-not-allowed"
                title={`Chapter ${p.id} is hidden. Complete Chapter ${p.id - 1} to unlock!`}
              >
                <div className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    Chapter {p.id}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-full">
                  Locked 🔒
                </span>
              </div>
            );
          }

          // Unlocked Chapter
          return (
            <button
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-white text-black border-white shadow-glow-white scale-102 font-bold'
                  : isPassed
                  ? 'bg-zinc-900/90 border-white/30 text-white hover:border-white'
                  : 'bg-black/80 border-zinc-700 text-slate-300 hover:text-white hover:border-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{p.emoji}</span>
                <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                  Chapter {p.id}
                </span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-slate-300" />}
              </div>
              <span className="text-xs truncate max-w-full font-medium">
                {p.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
