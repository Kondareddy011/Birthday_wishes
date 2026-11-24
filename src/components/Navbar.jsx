import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Clock
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
  const [countdownStr, setCountdownStr] = useState('');
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const currentYear = now.getFullYear();
      const isNov25 = now.getMonth() === 10 && now.getDate() === 25;

      if (isNov25) {
        setIsToday(true);
        setCountdownStr("IT'S TODAY! 🎂");
        return;
      }

      setIsToday(false);
      let target = new Date(celebrant?.birthDate || `${currentYear}-11-25T00:00:00`);
      if (isNaN(target.getTime())) target = new Date(`${currentYear}-11-25T00:00:00`);

      let diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        const nextTarget = new Date(`${currentYear + 1}-11-25T00:00:00`);
        diff = nextTarget.getTime() - now.getTime();
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      parts.push(`${String(hours).padStart(2, '0')}h`);
      parts.push(`${String(minutes).padStart(2, '0')}m`);
      parts.push(`${String(seconds).padStart(2, '0')}s`);
      setCountdownStr(parts.join(' : '));
    }

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [celebrant?.birthDate]);

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

        {/* Center Live 25th November Countdown Badge */}
        <div
          onClick={() => {
            if (onSelectPage) onSelectPage(1);
            setTimeout(() => {
              const el = document.getElementById('countdown-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all shadow-glow-white text-xs font-mono group"
          title="Click to view official 25th November countdown"
        >
          <Clock className="w-3.5 h-3.5 text-white animate-spin-slow flex-shrink-0" />
          {isToday ? (
            <span className="font-extrabold text-white animate-pulse tracking-wider flex items-center gap-1.5">
              <span>🎂</span>
              <span className="hidden sm:inline">IT'S LAKSHMI'S BIRTHDAY TODAY!</span>
              <span className="sm:hidden">BIRTHDAY TODAY!</span>
              <span>🎉</span>
            </span>
          ) : (
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-200">
              <span className="text-zinc-400 hidden sm:inline uppercase text-[10px] tracking-widest font-mono">
                Nov 25:
              </span>
              <span className="text-white font-mono tracking-wider">{countdownStr}</span>
            </div>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Audio Equalizer & Music Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
              isPlayingAudio
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
