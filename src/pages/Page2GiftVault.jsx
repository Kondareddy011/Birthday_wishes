import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Gift,
  Award,
  Lock,
  Unlock,
  Trophy,
  CheckCircle
} from 'lucide-react';
import SurpriseGift3D from '../components/SurpriseGift3D';
import { playPartyFanfare, playUnboxChime } from '../utils/soundEffects';

export default function Page2GiftVault({ celebrant, theme, onNavigate }) {
  // Scratch Card state
  const [scratched, setScratched] = useState({ 1: false, 2: false, 3: false });
  const allScratched = scratched[1] && scratched[2] && scratched[3];

  // Time Capsule state
  const [capsuleUnlocked, setCapsuleUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleScratch = (spot) => {
    if (scratched[spot]) return;
    playUnboxChime();
    setScratched((prev) => {
      const next = { ...prev, [spot]: true };
      if (next[1] && next[2] && next[3]) {
        setTimeout(() => {
          playPartyFanfare();
          confetti({
            particleCount: 70,
            spread: 90,
            origin: { y: 0.65 },
            colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
          });
        }, 300);
      }
      return next;
    });
  };

  const handleUnlockCapsule = (e) => {
    e.preventDefault();
    const correctAge = String(celebrant.age || 22);
    if (passcode.trim() === correctAge || passcode.trim() === '2026') {
      playUnboxChime();
      setCapsuleUnlocked(true);
      setErrorMsg('');
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#FFFFFF', '#E2E8F0', '#CBD5E1']
      });
    } else {
      setErrorMsg(`Incorrect code! Hint: It's ${celebrant.name}'s turning age (${celebrant.age}).`);
    }
  };

  const handleAutoCrack = () => {
    setPasscode(String(celebrant.age || 22));
    playUnboxChime();
    setCapsuleUnlocked(true);
    setErrorMsg('');
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#FFFFFF', '#E2E8F0']
    });
  };

  return (
    <div className="space-y-16 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter 2 Header */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-3 shadow-glow-white">
          <Gift className="w-3.5 h-3.5 text-white" />
          <span>Chapter 2: The Mystery Vault & Perks</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-festive font-black text-white">
          The Vault of Secrets & Honors 🎁
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-lg mx-auto">
          Unwrap your handcrafted 3D gift box, scratch off VIP perks, and unlock the sealed milestone time capsule.
        </p>
      </div>

      {/* 1. 3D Surprise Gift Unboxing Component */}
      <SurpriseGift3D
        celebrant={celebrant}
        theme={theme}
      />

      {/* 2. GOLDEN SCRATCH-OFF CARD */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Surprise Perk 1: Scratch-Off Card</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-festive font-black text-white mb-2">
          The Golden Birthday Scratch-Off Card 🎰
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 font-mono">
          Tap each of the three foil spots to reveal {celebrant.name}'s exclusive milestone rewards!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Spot 1 */}
          <div
            onClick={() => handleScratch(1)}
            className="cursor-pointer group perspective-1000 select-none"
          >
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] ${
                scratched[1]
                  ? 'bg-white/10 border-white shadow-glow-white'
                  : 'bg-zinc-900 border-zinc-700 hover:border-white hover:scale-105 active:scale-95 shadow-xl'
              }`}
            >
              {!scratched[1] ? (
                <>
                  <span className="text-4xl mb-2 animate-bounce">🪙</span>
                  <span className="text-xs font-mono font-black text-white uppercase tracking-widest">
                    SCRATCH SPOT 1
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Tap to Reveal</span>
                </>
              ) : (
                <div className="animate-in zoom-in duration-300 text-center">
                  <span className="text-3xl block mb-2">☕🍕</span>
                  <span className="text-xs font-mono font-bold text-white uppercase block mb-1">
                    Perk Unlocked:
                  </span>
                  <p className="text-xs font-medium text-slate-200">
                    Unlimited Midnight Snacks & Coffee Runs for 1 Year!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Spot 2 */}
          <div
            onClick={() => handleScratch(2)}
            className="cursor-pointer group perspective-1000 select-none"
          >
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] ${
                scratched[2]
                  ? 'bg-white/10 border-white shadow-glow-white'
                  : 'bg-zinc-900 border-zinc-700 hover:border-white hover:scale-105 active:scale-95 shadow-xl'
              }`}
            >
              {!scratched[2] ? (
                <>
                  <span className="text-4xl mb-2 animate-bounce">🪙</span>
                  <span className="text-xs font-mono font-black text-white uppercase tracking-widest">
                    SCRATCH SPOT 2
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Tap to Reveal</span>
                </>
              ) : (
                <div className="animate-in zoom-in duration-300 text-center">
                  <span className="text-3xl block mb-2">🚗🏕️</span>
                  <span className="text-xs font-mono font-bold text-white uppercase block mb-1">
                    Perk Unlocked:
                  </span>
                  <p className="text-xs font-medium text-slate-200">
                    Guaranteed Spontaneous Roadtrip Pass with Your Squad!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Spot 3 */}
          <div
            onClick={() => handleScratch(3)}
            className="cursor-pointer group perspective-1000 select-none"
          >
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] ${
                scratched[3]
                  ? 'bg-white/10 border-white shadow-glow-white'
                  : 'bg-zinc-900 border-zinc-700 hover:border-white hover:scale-105 active:scale-95 shadow-xl'
              }`}
            >
              {!scratched[3] ? (
                <>
                  <span className="text-4xl mb-2 animate-bounce">🪙</span>
                  <span className="text-xs font-mono font-black text-white uppercase tracking-widest">
                    SCRATCH SPOT 3
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Tap to Reveal</span>
                </>
              ) : (
                <div className="animate-in zoom-in duration-300 text-center">
                  <span className="text-3xl block mb-2">👑🛋️</span>
                  <span className="text-xs font-mono font-bold text-white uppercase block mb-1">
                    Perk Unlocked:
                  </span>
                  <p className="text-xs font-medium text-slate-200">
                    Official "Get Out of Doing Dishes" Pass for 30 Days!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {allScratched && (
          <div className="mt-8 p-3.5 rounded-2xl bg-white/10 border border-white/30 max-w-md mx-auto text-center animate-in zoom-in duration-300">
            <span className="text-sm font-mono font-bold text-white block">
              🎉 ALL 3 PERKS OFFICIALLY CLAIMED!
            </span>
          </div>
        )}
      </section>

      {/* 3. FRIENDSHIP TIME CAPSULE & TROPHY VAULT */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Surprise Perk 2: Sealed Time Capsule</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-festive font-black text-white mb-2">
          The Milestone Time Capsule & Trophy ⏳🔒
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 font-mono">
          Enter {celebrant.name}'s turning age to crack open the safe and claim the official trophy!
        </p>

        {!capsuleUnlocked ? (
          <div className="max-w-sm mx-auto bg-black p-6 rounded-2xl border border-white/20 shadow-xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white text-xl animate-pulse">
              <Lock className="w-6 h-6" />
            </div>

            <form onSubmit={handleUnlockCapsule} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Passcode (Hint: Turning Age = {celebrant.age})
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder={`e.g. ${celebrant.age}`}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full text-center text-2xl font-mono tracking-widest px-4 py-2 rounded-xl bg-zinc-950 border border-white/20 text-white focus:outline-none focus:border-white"
                />
              </div>

              {errorMsg && <p className="text-xs text-rose-400 font-mono">{errorMsg}</p>}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-200 transition-all"
                >
                  Unlock Safe
                </button>
                <button
                  type="button"
                  onClick={handleAutoCrack}
                  className="px-3 py-2.5 rounded-xl bg-zinc-800 text-slate-200 hover:text-white text-xs font-mono"
                >
                  Quick Unlock
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-black/85 rounded-3xl border border-white/30 p-6 sm:p-8 max-w-xl mx-auto text-center space-y-5 animate-in zoom-in duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
              <Unlock className="w-3.5 h-3.5 text-white" />
              <span>Time Capsule Successfully Opened!</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-white text-black p-1 shadow-glow-white flex items-center justify-center">
                <Trophy className="w-12 h-12 text-black" />
              </div>
              <h4 className="text-xl font-serif-festive font-black text-white mt-3">
                "Greatest Human of the Century" Trophy 🏆
              </h4>
              <p className="text-[11px] font-mono text-slate-300 uppercase mt-0.5">
                Conferred upon {celebrant.name} on milestone #{celebrant.age}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
