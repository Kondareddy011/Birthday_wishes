import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  PartyPopper,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Wind
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  toggleBackgroundMusic,
  playPartyFanfare,
  playPopSound,
  playBlowCandleSound,
  playUnboxChime
} from '../utils/soundEffects';

export default function MusicPlayerBar({ isPlayingAudio, setIsPlayingAudio }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAudioToggle = () => {
    toggleBackgroundMusic((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handleConfettiSound = () => {
    playPartyFanfare();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
    });
  };

  return (
    <aside aria-label="Celebration Audio Player" className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden">
      {/* Expanded Soundboard Tray */}
      {isExpanded && (
        <div className="mb-3 glass-panel-bw rounded-2xl p-4 border border-white/20 shadow-2xl w-72 animate-in slide-in-from-bottom-2 duration-200 bg-black/95 text-white">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Party SFX Soundboard</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handleConfettiSound}
              className="p-2.5 rounded-xl bg-black hover:bg-white/10 border border-white/20 text-left transition-all active:scale-95 group"
            >
              <span className="text-base block mb-0.5">🎺</span>
              <span className="text-[11px] font-mono font-bold text-white block">Party Fanfare</span>
            </button>

            <button
              onClick={() => {
                playPopSound();
                confetti({
                  particleCount: 25,
                  spread: 45,
                  origin: { x: 0.9, y: 0.85 },
                  colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
                });
              }}
              className="p-2.5 rounded-xl bg-black hover:bg-white/10 border border-white/20 text-left transition-all active:scale-95 group"
            >
              <span className="text-base block mb-0.5">🎈</span>
              <span className="text-[11px] font-mono font-bold text-white block">Balloon Pop</span>
            </button>

            <button
              onClick={() => {
                playUnboxChime();
                confetti({
                  particleCount: 25,
                  spread: 50,
                  origin: { x: 0.9, y: 0.85 },
                  colors: ['#FFFFFF', '#E2E8F0']
                });
              }}
              className="p-2.5 rounded-xl bg-black hover:bg-white/10 border border-white/20 text-left transition-all active:scale-95 group"
            >
              <span className="text-base block mb-0.5">✨</span>
              <span className="text-[11px] font-mono font-bold text-white block">Magic Chime</span>
            </button>

            <button
              onClick={playBlowCandleSound}
              className="p-2.5 rounded-xl bg-black hover:bg-white/10 border border-white/20 text-left transition-all active:scale-95 group"
            >
              <span className="text-base block mb-0.5">🕯️</span>
              <span className="text-[11px] font-mono font-bold text-white block">Candle Blow</span>
            </button>
          </div>

          <p className="text-[10px] font-mono text-slate-400 text-center">
            Live Web Audio Synthesizer (Offline & Zero Ads)
          </p>
        </div>
      )}

      {/* Main Floating Capsule Button */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-glow-white">
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            isPlayingAudio
              ? 'bg-white text-black shadow-glow-white scale-102'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title={isPlayingAudio ? 'Mute Celebration Melody' : 'Play Celebration Melody'}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-4 h-4 text-black animate-pulse" />
              <span className="hidden sm:inline">Playing 🎵</span>
              <span className="sm:hidden">🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Music Muted</span>
              <span className="sm:hidden">Mute</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="SFX Soundboard"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
