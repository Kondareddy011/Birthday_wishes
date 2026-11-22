import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ArrowLeft, Send, Flame, Heart, Compass } from 'lucide-react';
import WishesWall from '../components/WishesWall';
import { playMysticChime, playPartyFanfare } from '../utils/soundEffects';

export default function Page4Wishes({
  wishes,
  celebrant,
  onAddWish,
  onOpenAIGenerator,
  onNavigate
}) {
  const [lanternWish, setLanternWish] = useState('');
  const [isLanternReleased, setIsLanternReleased] = useState(false);

  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!lanternWish.trim()) return;

    playMysticChime();
    setIsLanternReleased(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FACC15', '#FB7185', '#F43F5E', '#FFFFFF']
    });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Wishes Wall Component */}
      <WishesWall
        wishes={wishes}
        celebrant={celebrant}
        onAddWish={onAddWish}
        onOpenAIGenerator={onOpenAIGenerator}
      />

      {/* ========================================================
          PAGE 4 SPECIAL SURPRISE: FLOATING SKY LANTERN
         ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-2xl relative overflow-hidden text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-4 animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Page 4 Special Surprise</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
            The Floating Sky Lantern of Wishes 🏮✨
          </h3>
          <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base mb-8">
            In ancient celebration tradition, write your deepest dream for {celebrant.name}'s year ahead and release it to the celestial sky.
          </p>

          {!isLanternReleased ? (
            <form onSubmit={handleReleaseLantern} className="max-w-md mx-auto space-y-4">
              {/* 3D Lantern Graphic */}
              <div className="flex justify-center mb-2">
                <div className="relative w-28 h-36 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-3xl shadow-glow-gold flex flex-col items-center justify-between p-3 border-2 border-amber-200 animate-float-medium">
                  <div className="w-12 h-1 bg-amber-200 rounded-full" />
                  <div className="text-center">
                    <Flame className="w-8 h-8 text-amber-300 mx-auto animate-pulse" />
                    <span className="text-[10px] font-black text-slate-950 uppercase">SACRED FLAME</span>
                  </div>
                  <div className="w-16 h-1.5 bg-amber-900 rounded-full" />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder={`"May ${celebrant.name} travel to 3 new countries and be endlessly happy..."`}
                  value={lanternWish}
                  onChange={(e) => setLanternWish(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Release Lantern into the Heavens 🏮</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4 animate-in zoom-in duration-500">
              {/* Ascending Lantern Animation */}
              <div className="inline-block animate-float-slow transform -translate-y-6">
                <div className="w-20 h-28 bg-gradient-to-t from-amber-400 via-rose-500 to-amber-200 rounded-2xl shadow-glow-gold p-2 flex flex-col items-center justify-between border border-white">
                  <span className="text-xs">🏮</span>
                  <Flame className="w-5 h-5 text-amber-200 animate-ping" />
                  <span className="text-[9px] font-bold text-slate-900">SOARING</span>
                </div>
              </div>

              <h4 className="text-2xl font-black text-amber-300 font-serif-festive">
                ✨ Your Wish Has Been Carried to the Stars! ✨
              </h4>
              <p className="text-sm text-slate-200 italic max-w-md mx-auto">
                "{lanternWish}"
              </p>
              <button
                onClick={() => setIsLanternReleased(false)}
                className="mt-4 px-4 py-1.5 rounded-full bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Release Another Lantern
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          OPTIONS TO GO TO NEXT PAGE
         ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Chapter 4 Explored
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
            Where to journey next?
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Option A (Recommended) */}
          <button
            onClick={() => onNavigate(5)}
            className="p-5 rounded-2xl glass-card border border-indigo-500/40 text-left hover:border-indigo-400 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🔮
              </div>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                Chapter 5 (Next Step)
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                AI Destiny Oracle
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Consult the mystical 3D Crystal Ball for your Year Ahead Prophecy.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Consult Oracle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option B */}
          <button
            onClick={() => onNavigate(6)}
            className="p-5 rounded-2xl glass-card border border-amber-500/30 text-left hover:border-amber-400 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🎆
              </div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                Chapter 6
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                Grand Finale Party
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pop the champagne and download your personalized award certificate.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Go to Finale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option C: Back */}
          <button
            onClick={() => onNavigate(3)}
            className="p-5 rounded-2xl glass-card border border-slate-700 text-left hover:border-slate-500 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                📸
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Chapter 3
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-slate-300 transition-colors">
                Memory Lane
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Revisit the photo gallery and friendship time capsule.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Memories</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

