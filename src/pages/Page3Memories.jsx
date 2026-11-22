import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Flame,
  Wand2,
  Send,
  Heart,
  RefreshCw
} from 'lucide-react';
import { aiTonePresets, relationshipPresets } from '../data/defaultData';
import { playMysticChime, playPartyFanfare } from '../utils/soundEffects';

export default function Page3Memories({
  celebrant,
  wishes,
  onAddWish,
  onNavigate
}) {
  // Sky Lantern state
  const [lanternWish, setLanternWish] = useState('');
  const [isLanternReleased, setIsLanternReleased] = useState(false);

  // Crystal Ball state
  const [orbGlow, setOrbGlow] = useState(false);
  const [prophecy, setProphecy] = useState(null);

  // AI Wish Studio state
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState(relationshipPresets[0]);
  const [selectedTone, setSelectedTone] = useState(aiTonePresets[0].id);
  const [memoryCue, setMemoryCue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWish, setGeneratedWish] = useState('');

  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!lanternWish.trim()) return;

    playMysticChime();
    setIsLanternReleased(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
    });
  };

  const handleRubCrystalBall = () => {
    playMysticChime();
    setOrbGlow(true);
    setProphecy(null);

    setTimeout(() => {
      setOrbGlow(false);
      setProphecy({
        ambition: "A bold, visionary project you've held in your heart will become your greatest triumph this year.",
        social: "Surrounded by unconditional loyalists who laugh with you until tears stream down.",
        adventure: "Two unexpected plane tickets and one life-changing golden-hour memory await."
      });
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#E2E8F0', '#CBD5E1']
      });
    }, 600);
  };

  const handleGenerateWish = () => {
    setIsGenerating(true);
    playMysticChime();
    setGeneratedWish('');

    setTimeout(() => {
      const cue = memoryCue.trim()
        ? `Thinking about ${memoryCue.trim()} never fails to make me smile! `
        : '';

      const templates = {
        heartfelt: `Happy ${celebrant.age === 22 ? '22nd' : `${celebrant.age}th`} Birthday, ${celebrant.name}! Having you as my ${relationship.toLowerCase()} is one of life's richest blessings. Your quiet resilience, grace, and fierce warmth illuminate every room. ${cue}Here is to your most radiant chapter yet! ✨🤍`,
        funny: `Happy Birthday ${celebrant.name}! Science confirms that birthday cake calories don't count today. ${cue}Thank you for always being the one person with worse impulse control than me. Here's to making legendary stories! 🎂🍻`,
        poetic: `Like starlight moving across quiet midnight waters, your presence brings timeless wonder to our lives, dear ${celebrant.name}. ${cue}May this milestone chapter be written in laughter and bathed in peace. 🌙🕊️`,
        hype: `WAKE UP WORLD, IT'S ${celebrant.name.toUpperCase()}'S SPECIAL DAY!! 🚀💥 Absolutely unrivaled swagger and pure fire! ${cue}Today the universe celebrates the legend that is you! Let's get loud! 🍾🎉`
      };

      setGeneratedWish(templates[selectedTone] || templates.heartfelt);
      setIsGenerating(false);
      confetti({ particleCount: 30, spread: 50, colors: ['#FFFFFF', '#CBD5E1'] });
    }, 500);
  };

  const handlePostWish = () => {
    if (!generatedWish) return;
    const newWish = {
      id: `w_ai_p3_${Date.now()}`,
      author: senderName.trim() || 'Secret Admirer',
      relationship,
      avatar: '🤍',
      message: generatedWish,
      timestamp: 'Just now',
      reactions: { love: 5, fire: 2, cheers: 3 },
      color: 'from-white/10 to-white/5',
      pinned: false
    };
    if (onAddWish) onAddWish(newWish);
    playPartyFanfare();
    alert('Wish successfully posted to the Wishes Board!');
  };

  return (
    <div className="space-y-16 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter 3 Header */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-3 shadow-glow-white">
          <Wand2 className="w-3.5 h-3.5 text-white" />
          <span>Chapter 3: Hall of Wishes & Destiny Oracle</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-festive font-black text-white">
          Wishes, Sky Lanterns & The Oracle 🏮🔮
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-lg mx-auto">
          Release your sacred 3D sky lantern into the starlit sky and consult the crystal ball for your year ahead.
        </p>
      </div>

      {/* 1. FLOATING 3D SKY LANTERN */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Surprise 1: Sacred Sky Lantern</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-festive font-black text-white mb-2">
          The Floating Sky Lantern of Wishes 🏮✨
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 font-mono">
          Type your secret dream for {celebrant.name}'s milestone year and send it floating to the stars!
        </p>

        {!isLanternReleased ? (
          <form onSubmit={handleReleaseLantern} className="max-w-md mx-auto space-y-4">
            <div className="flex justify-center mb-2">
              <div className="relative w-28 h-36 bg-gradient-to-t from-zinc-800 via-white to-zinc-400 rounded-3xl shadow-glow-white flex flex-col items-center justify-between p-3 border-2 border-white animate-float-medium">
                <div className="w-12 h-1 bg-white rounded-full" />
                <div className="text-center">
                  <Flame className="w-8 h-8 text-black mx-auto animate-pulse" />
                  <span className="text-[10px] font-mono font-black text-black uppercase">SACRED FLAME</span>
                </div>
                <div className="w-16 h-1 bg-black rounded-full" />
              </div>
            </div>

            <div>
              <input
                type="text"
                required
                placeholder={`"May ${celebrant.name} travel to 3 dream cities and achieve every goal..."`}
                value={lanternWish}
                onChange={(e) => setLanternWish(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-white text-black font-mono font-bold text-xs uppercase hover:bg-slate-200 transition-all shadow-md"
            >
              Release Lantern into the Heavens 🏮
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3 animate-in zoom-in duration-500">
            <div className="inline-block animate-float-slow transform -translate-y-4">
              <div className="w-20 h-28 bg-gradient-to-t from-zinc-700 via-white to-zinc-300 rounded-2xl shadow-glow-white p-2 flex flex-col items-center justify-between border border-white">
                <span className="text-xs">🏮</span>
                <Flame className="w-5 h-5 text-black animate-ping" />
                <span className="text-[9px] font-mono font-bold text-black">SOARING</span>
              </div>
            </div>
            <h4 className="text-xl font-serif-festive font-black text-white">
              ✨ Your Wish Has Been Carried to the Stars! ✨
            </h4>
            <p className="text-xs text-slate-300 italic max-w-md mx-auto">
              "{lanternWish}"
            </p>
          </div>
        )}
      </section>

      {/* 2. 3D CRYSTAL BALL OF DESTINY & AI STUDIO */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Surprise 2: The Crystal Ball Prophecy</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-festive font-black text-white mb-2">
          The 3D Crystal Ball of Future Prophecy 🔮
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 font-mono">
          Rub the crystal sphere to look into what destiny holds for {celebrant.name}!
        </p>

        <div className="flex flex-col items-center py-2">
          <div
            onClick={handleRubCrystalBall}
            className={`relative w-40 h-40 rounded-full cursor-pointer transition-all duration-700 p-2 flex items-center justify-center select-none ${
              orbGlow
                ? 'scale-110 shadow-[0_0_80px_rgba(255,255,255,0.9)]'
                : 'hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.4)]'
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 30%, #475569 70%, #000000 100%)',
            }}
          >
            <div className="w-full h-full rounded-full border border-white/40 flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center">
                <span className="text-3xl filter drop-shadow">✨</span>
                <span className="text-[9px] uppercase font-mono font-black text-white block mt-1">
                  {orbGlow ? 'Gazing...' : 'Tap to Rub'}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-5 w-24 h-6 bg-gradient-to-r from-zinc-700 via-white to-zinc-600 rounded-full border-t border-white" />
          </div>

          <button
            onClick={handleRubCrystalBall}
            className="mt-8 px-6 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs shadow-md hover:bg-slate-200"
          >
            {prophecy ? '🔮 Rub Crystal Ball Again' : '🔮 Gaze into Destiny'}
          </button>
        </div>

        {prophecy && (
          <div className="mt-6 bg-black/90 rounded-2xl border border-white/20 p-5 max-w-lg mx-auto text-left space-y-3 animate-in zoom-in duration-300">
            <span className="text-[11px] font-mono font-black text-white uppercase tracking-widest block text-center">
              Year Ahead Forecast for {celebrant.name}
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/10">
                <strong className="text-white block mb-0.5">🚀 Ambition:</strong>
                <p className="text-slate-300">{prophecy.ambition}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/10">
                <strong className="text-white block mb-0.5">💖 Soul Tribe:</strong>
                <p className="text-slate-300">{prophecy.social}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/10">
                <strong className="text-white block mb-0.5">🌍 Wanderlust:</strong>
                <p className="text-slate-300">{prophecy.adventure}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* OPTIONS TO GO TO NEXT PAGE */}
      <section className="pt-6 border-t border-white/10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Chapter 3 Completed • Final Step
          </span>
          <h4 className="text-xl sm:text-2xl font-serif-festive font-black text-white mt-1">
            Ready for the Grand Finale?
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => onNavigate(4)}
            className="p-5 rounded-2xl glass-card-bw border border-white/40 text-left hover:scale-102 transition-all flex flex-col justify-between group shadow-glow-white"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center text-xl mb-3">
                🍾
              </div>
              <span className="text-[10px] font-mono font-black uppercase text-white tracking-wider">
                Chapter 4 (The Grand Finale)
              </span>
              <h5 className="text-sm font-bold text-white mt-1 group-hover:text-slate-200">
                Grand Fireworks Finale
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                Pop golden champagne & claim your official certificate.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-mono text-white font-bold">
              <span>Go to Grand Finale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            onClick={() => onNavigate(2)}
            className="p-5 rounded-2xl glass-card-bw border border-white/20 text-left hover:scale-102 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl mb-3">
                🎁
              </div>
              <span className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider">
                Chapter 2
              </span>
              <h5 className="text-sm font-bold text-white mt-1 group-hover:text-slate-200">
                The Mystery Vault
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                Return to the 3D gift box and golden scratch perks.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-mono text-slate-300">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Chapter 2</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
