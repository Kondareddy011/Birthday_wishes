import React from 'react';
import {
  Volume2,
  VolumeX
} from 'lucide-react';
import { toggleBackgroundMusic } from '../utils/soundEffects';

export default function Navbar({
  celebrant,
  currentPage,
  onSelectPage,
  unlockedPages = [1],
  isPlayingAudio,
  setIsPlayingAudio
}) {
  const handleAudioToggle = () => {
    toggleBackgroundMusic((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handleNav = (pageId) => {
    if (!unlockedPages.includes(pageId)) return;
    onSelectPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Celebrant Avatar & Monogram */}
        <div
          onClick={() => handleNav(1)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white via-zinc-400 to-black p-0.5 shadow-lg group-hover:scale-105 transition-transform border border-white/30 overflow-hidden flex-shrink-0 relative">
            <img
              src={celebrant?.avatarUrl || '/photoes/IMG20260206161511.jpg'}
              alt={celebrant?.name || 'Lakshmi'}
              className="w-full h-full rounded-full object-cover"
              style={{ objectPosition: celebrant?.avatarPosition || '44% 24%' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-emoji');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="fallback-emoji w-full h-full rounded-full bg-black hidden items-center justify-center text-lg">
              🎂
            </div>
          </div>
          <div>
            <span className="font-serif-festive font-extrabold text-white text-lg tracking-tight group-hover:text-slate-300 transition-colors">
              {celebrant.name}
            </span>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Audio Equalizer & Music Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${isPlayingAudio
              ? 'bg-white text-black border-white shadow-glow-white'
              : 'bg-black border-white/20 text-slate-300 hover:text-white hover:border-white/40'
              }`}
            title={isPlayingAudio ? 'Pause Birthday Melody' : 'Play Birthday Melody'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-black" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-black rounded-full animate-bounce h-1.5" />
                  <span className="w-1 bg-black rounded-full animate-bounce h-3 [animation-delay:0.15s]" />
                  <span className="w-1 bg-black rounded-full animate-bounce h-2 [animation-delay:0.3s]" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Melody</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
