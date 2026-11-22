import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  PartyPopper,
  Share2,
  Shield,
  RotateCcw,
  Award,
  Download,
  Heart
} from 'lucide-react';
import { playCorkPopSound, playPartyFanfare } from '../utils/soundEffects';

export default function Page6GrandFinale({
  celebrant,
  theme,
  onNavigate,
  onOpenShare,
  onOpenAdmin
}) {
  const [corkPopped, setCorkPopped] = useState(false);
  const [fireworksCount, setFireworksCount] = useState(0);

  const handlePopChampagne = () => {
    playCorkPopSound();
    setCorkPopped(true);
    setFireworksCount((c) => c + 1);

    // Giant fireworks / confetti blast
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FACC15', '#EC4899', '#8B5CF6', '#10B981', '#06B6D4', '#FFFFFF']
    });

    setTimeout(() => {
      playPartyFanfare();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.2, y: 0.6 }
      });
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.8, y: 0.6 }
      });
    }, 400);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Chapter Title */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          <PartyPopper className="w-4 h-4 text-amber-400" />
          <span>Chapter 6: Grand Finale & Party Hall</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
          Long Live The Birthday Legend, <br />
          <span className="animate-text-shimmer">{celebrant.name}!</span> 🥂👑
        </h2>
        <p className="text-slate-300 mt-3 max-w-xl mx-auto text-base sm:text-lg">
          You've traveled through every magical room of your birthday quest. Now it's time for the ultimate celebratory toast!
        </p>
      </div>

      {/* ========================================================
          PAGE 6 SPECIAL SURPRISE: CHAMPAGNE POP & OFFICIAL CERTIFICATE
         ======================================================== */}
      <section className="glass-panel rounded-3xl p-6 sm:p-12 border border-amber-400/50 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-6 animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Page 6 Grand Special Surprise</span>
        </div>

        {/* 3D Champagne Bottle Graphic */}
        <div className="flex flex-col items-center py-4 mb-6">
          <div
            onClick={handlePopChampagne}
            className="cursor-pointer group relative transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {/* Flying Cork when popped */}
            {corkPopped && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-8 bg-amber-800 rounded-t-lg border-2 border-amber-400 shadow-glow-gold animate-bounce">
                <span className="text-xs">🍾</span>
              </div>
            )}

            {/* Bottle Body */}
            <div className="w-24 h-64 bg-gradient-to-b from-amber-200 via-emerald-950 to-emerald-900 rounded-b-3xl rounded-t-full shadow-2xl border-4 border-amber-400/60 relative flex flex-col items-center justify-between p-2">
              {/* Gold foil neck */}
              <div className="w-10 h-16 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-t-xl border-b-2 border-amber-600 shadow-inner flex items-center justify-center">
                <span className="text-[9px] font-black text-amber-950">2026</span>
              </div>

              {/* Label */}
              <div className="w-20 bg-amber-100 rounded-lg p-2 text-slate-900 text-center shadow-md border border-amber-300">
                <span className="text-[8px] font-black tracking-widest uppercase block text-amber-800">
                  Cuvée Royale
                </span>
                <span className="text-xs font-serif-festive font-black block">
                  {celebrant.name}
                </span>
                <span className="text-[9px] font-bold text-amber-700 block">
                  Vintage {celebrant.age}
                </span>
              </div>

              <div className="w-14 h-1 bg-amber-400/40 rounded-full" />
            </div>
          </div>

          <button
            onClick={handlePopChampagne}
            className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <PartyPopper className="w-5 h-5" />
            <span>{corkPopped ? 'Pop Another Bottle of Champagne! 🍾' : 'Pop The Golden Champagne! 🍾'}</span>
          </button>
        </div>

        {/* Certificate Display */}
        {corkPopped && (
          <div className="mt-8 bg-gradient-to-b from-amber-50/95 via-amber-100/90 to-amber-50/95 text-slate-950 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl border-4 border-amber-500/60 relative animate-in zoom-in duration-500 text-center font-serif">
            {/* Seal */}
            <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 text-slate-950 flex flex-col items-center justify-center font-black text-[9px] shadow-lg border-2 border-amber-700">
              <Award className="w-5 h-5 text-slate-950" />
              <span>OFFICIAL</span>
            </div>

            <span className="text-xs uppercase tracking-widest font-bold text-amber-900 block mb-2">
              The Royal Birthday Registry
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-950 font-serif-festive mb-3">
              Certificate of Honor & Celebration
            </h3>

            <p className="text-xs text-slate-700 uppercase tracking-widest mb-4">
              Presented with infinite affection to
            </p>

            <div className="text-3xl sm:text-5xl font-black text-rose-700 font-serif-festive tracking-wide mb-4">
              {celebrant.name}
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-800 max-w-lg mx-auto mb-6 italic">
              "For bringing exceptional light, laughter, wisdom, and boundless radiance into our lives. May your 22nd milestone year be crowned with health, joy, and your greatest adventures yet."
            </p>

            <div className="pt-4 border-t border-amber-400/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 font-sans font-bold">
              <span>Date: {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              <span>Signed by: All Who Love You ❤️</span>
            </div>

            <button
              onClick={handlePrintCertificate}
              className="mt-6 px-5 py-2.5 rounded-full bg-slate-900 text-amber-300 text-xs font-bold font-sans flex items-center gap-2 mx-auto hover:bg-slate-800 transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save Keepsake Certificate</span>
            </button>
          </div>
        )}
      </section>

      {/* Final Action Hub */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl text-center space-y-6">
        <h4 className="text-xl font-bold text-white">
          Where to Go From Here?
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenShare}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link with Friends & Family</span>
          </button>

          <button
            onClick={() => onNavigate(1)}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Quest from Chapter 1</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold text-sm shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Host Admin Dashboard</span>
          </button>
        </div>
      </section>
    </div>
  );
}

