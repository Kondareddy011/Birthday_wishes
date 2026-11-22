import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ArrowLeft, Wand2, RefreshCw, Compass } from 'lucide-react';
import { aiTonePresets, relationshipPresets } from '../data/defaultData';
import { playMysticChime, playPartyFanfare } from '../utils/soundEffects';

export default function Page5AIOracle({
  celebrant,
  onAddWish,
  onNavigate
}) {
  // Crystal ball state
  const [orbGlow, setOrbGlow] = useState(false);
  const [prophecy, setProphecy] = useState(null);

  // AI Message Studio state
  const [recipient, setRecipient] = useState(celebrant.name);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState(relationshipPresets[0]);
  const [selectedTone, setSelectedTone] = useState(aiTonePresets[0].id);
  const [memoryCue, setMemoryCue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWish, setGeneratedWish] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRubCrystalBall = () => {
    playMysticChime();
    setOrbGlow(true);
    setProphecy(null);

    setTimeout(() => {
      setOrbGlow(false);
      setProphecy({
        ambition: "A wild creative idea you've hesitated on will yield your biggest triumph this year.",
        social: "Surrounded by unconditional loyalists who laugh with you until tears stream down.",
        adventure: "Two unexpected plane tickets and one life-changing golden-hour memory await."
      });
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#06B6D4', '#FACC15']
      });
    }, 600);
  };

  const handleGenerateWish = () => {
    setIsGenerating(true);
    playMysticChime();
    setGeneratedWish('');

    setTimeout(() => {
      const cue = memoryCue.trim()
        ? `Thinking about ${memoryCue.trim()} never fails to make me laugh! `
        : '';

      const templates = {
        heartfelt: `Happy ${celebrant.age}th Birthday, ${recipient}! Having you as my ${relationship.toLowerCase()} is one of life's richest gifts. Your kindness, quiet resilience, and fierce warmth change every room you walk into. ${cue}Here is to another year of dreams taking flight and deep, unshakable peace. Love you to the moon! ✨❤️`,
        funny: `Happy Birthday ${recipient}! Technically, you are now entering the phase where staying in on a Friday night is a personal victory! 😂 ${cue}Thank you for being the partner-in-crime who never judges my bad decisions. Let's eat way too much cake! 🎂🍻`,
        poetic: `Like starlight traveling through quiet galaxies, your presence brings wonder to this world, dear ${recipient}. ${cue}May the dawn greet you with courage, and may every twilight bring fulfillment. Blessed birthday! 🌙🕊️`,
        hype: `WAKE UP EVERYBODY, IT'S ${recipient.toUpperCase()}'S SPECIAL DAY!! 🚀💥 Absolutely unrivaled swagger, unmatched energy! ${cue}Today the whole world celebrates the legend that is you! Let's get loud! 🍾🎉`
      };

      setGeneratedWish(templates[selectedTone] || templates.heartfelt);
      setIsGenerating(false);
      confetti({ particleCount: 30, spread: 50 });
    }, 500);
  };

  const handlePostDirectly = () => {
    if (!generatedWish) return;
    const newWish = {
      id: `w_ai_p5_${Date.now()}`,
      author: senderName.trim() || 'AI Oracle Fan',
      relationship,
      avatar: '🔮',
      message: generatedWish,
      timestamp: 'Just now',
      reactions: { love: 5, fire: 3, cheers: 4 },
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30',
      pinned: false
    };
    onAddWish(newWish);
    playPartyFanfare();
    alert('Wish successfully posted to the Wishes Hall!');
  };

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-black uppercase tracking-wider mb-3">
          <Wand2 className="w-4 h-4 text-indigo-400" />
          <span>Chapter 5: AI Destiny Oracle</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          The Mystic <span className="animate-text-shimmer">Destiny Oracle</span> 🔮
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Peer into the glowing crystal ball for milestone predictions and craft deeply personal AI birthday verses.
        </p>
      </div>

      {/* ========================================================
          PAGE 5 SPECIAL SURPRISE: 3D CRYSTAL BALL OF DESTINY
         ======================================================== */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-indigo-500/40 shadow-2xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-black uppercase tracking-wider mb-4 animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Page 5 Special Surprise</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          The 3D Crystal Ball of Future Prophecy 🔮✨
        </h3>
        <p className="text-slate-300 max-w-md mx-auto text-xs sm:text-sm mb-6">
          Rub the crystal sphere to look into what the cosmos has written for {celebrant.name}'s {celebrant.age}th year!
        </p>

        {/* 3D Crystal Ball Graphic */}
        <div className="flex flex-col items-center py-4">
          <div
            onClick={handleRubCrystalBall}
            className={`relative w-44 h-44 rounded-full cursor-pointer transition-all duration-700 p-2 flex items-center justify-center select-none group ${
              orbGlow
                ? 'scale-110 shadow-[0_0_80px_rgba(139,92,246,0.9)]'
                : 'hover:scale-105 shadow-[0_0_50px_rgba(139,92,246,0.5)]'
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #c084fc 25%, #6366f1 60%, #1e1b4b 100%)',
            }}
          >
            {/* Swirling mist effect */}
            <div className="w-full h-full rounded-full border border-white/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-cyan-400/30 animate-spin-slow opacity-60" />
              <div className="relative z-10 text-center">
                <span className="text-4xl filter drop-shadow">✨</span>
                <span className="text-[10px] uppercase font-black text-white/90 block mt-1">
                  {orbGlow ? 'Gazing...' : 'Tap to Rub'}
                </span>
              </div>
            </div>

            {/* Stand */}
            <div className="absolute -bottom-6 w-28 h-7 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-full border-t border-amber-200 shadow-xl" />
          </div>

          <button
            onClick={handleRubCrystalBall}
            className="mt-10 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {prophecy ? '🔮 Rub Crystal Ball Again' : '🔮 Gaze into Destiny'}
          </button>
        </div>

        {/* Prophecy Revelation */}
        {prophecy && (
          <div className="mt-8 bg-slate-950/80 rounded-2xl border border-indigo-400/40 p-6 max-w-xl mx-auto text-left space-y-4 animate-in zoom-in duration-300">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block text-center">
              Celestial Year Ahead Forecast for {celebrant.name}
            </span>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-pink-300 block mb-0.5">🚀 Ambition & Breakthroughs:</strong>
                <p className="text-slate-200">{prophecy.ambition}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">💖 Soul Tribe & Joy:</strong>
                <p className="text-slate-200">{prophecy.social}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-cyan-300 block mb-0.5">🌍 Wanderlust & Adventure:</strong>
                <p className="text-slate-200">{prophecy.adventure}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* AI Birthday Studio Form */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
        <h4 className="text-xl font-bold text-white flex items-center gap-2">
          <span>✍️</span>
          <span>AI Birthday Wish Generator</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Liam / Sarah"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Relationship</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
            >
              {relationshipPresets.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {aiTonePresets.slice(0, 4).map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTone(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedTone === t.id
                  ? 'border-indigo-400 bg-indigo-500/20 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerateWish}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-sm shadow-md"
        >
          {isGenerating ? 'Consulting AI...' : 'Generate Birthday Message'}
        </button>

        {generatedWish && (
          <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 text-xs sm:text-sm leading-relaxed italic space-y-3">
            <p>"{generatedWish}"</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedWish);
                  alert('Copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
              >
                Copy
              </button>
              <button
                onClick={handlePostDirectly}
                className="px-4 py-1.5 rounded-lg bg-pink-500 text-white text-xs font-bold"
              >
                Post Directly to Wishes Wall
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          OPTIONS TO GO TO NEXT PAGE
         ======================================================== */}
      <section className="pt-4">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Chapter 5 Completed
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
            Where to journey next?
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Option A (Recommended) */}
          <button
            onClick={() => onNavigate(6)}
            className="p-5 rounded-2xl glass-card border border-amber-500/40 text-left hover:border-amber-400 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🎆
              </div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                Chapter 6 (Grand Finale)
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                The Grand Fireworks Finale
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pop the champagne, launch 3D fireworks, and receive your official certificate!
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Go to Grand Finale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option B */}
          <button
            onClick={() => onNavigate(4)}
            className="p-5 rounded-2xl glass-card border border-pink-500/30 text-left hover:border-pink-400 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                💌
              </div>
              <span className="text-[10px] font-black uppercase text-pink-400 tracking-wider">
                Chapter 4
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-pink-300 transition-colors">
                Wishes Wall
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Revisit the messages and floating sky lantern.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-pink-400 group-hover:translate-x-1 transition-transform">
              <span>Back to Wishes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option C: Back */}
          <button
            onClick={() => onNavigate(1)}
            className="p-5 rounded-2xl glass-card border border-slate-700 text-left hover:border-slate-500 hover:scale-102 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Chapter 1
              </span>
              <h5 className="text-base font-bold text-white mt-1 group-hover:text-slate-300 transition-colors">
                Grand Welcome
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Return to the beginning countdown room.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Start</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

