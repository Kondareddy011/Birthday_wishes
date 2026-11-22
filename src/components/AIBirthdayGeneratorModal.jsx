import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wand2, Sparkles, Copy, Check, Send, X, RefreshCw } from 'lucide-react';
import { aiTonePresets, relationshipPresets } from '../data/defaultData';
import { playPartyFanfare, playUnboxChime } from '../utils/soundEffects';

export default function AIBirthdayGeneratorModal({
  isOpen,
  onClose,
  celebrant,
  onPostToWall,
}) {
  const [recipient, setRecipient] = useState(celebrant.name || 'Lakshmi');
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState(relationshipPresets[0]);
  const [selectedTone, setSelectedTone] = useState(aiTonePresets[0].id);
  const [memoryCue, setMemoryCue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWish, setGeneratedWish] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Smart combinatorial dynamic message generator
  const generateMessage = () => {
    setIsGenerating(true);
    playUnboxChime();
    setGeneratedWish('');

    setTimeout(() => {
      const cue = memoryCue.trim()
        ? `Remembering ${memoryCue.trim()} makes me smile every single time! `
        : '';

      const toneTemplates = {
        heartfelt: [
          `Happy Birthday, ${recipient}! Having you as my ${relationship.toLowerCase()} is one of the greatest blessings in my life. Your empathy, laughter, and radiant spirit make the world so much softer and brighter. ${cue}Here is to another year of dreams unfolding, quiet breakthroughs, and endless love! 🤍✨`,
          `To the incomparable ${recipient}: On your special day, I hope you pause and realize just how profoundly you impact everyone around you. ${cue}Thank you for your warmth, your unwavering loyalty, and the steady anchor you are. May this year shower you with all the joy you so effortlessly give to others! 🕊️🥂`,
        ],
        funny: [
          `Happy Birthday, ${recipient}! Don't worry about getting another year older—you're still way younger than you will be next year! 😂 ${cue}As your favorite ${relationship.toLowerCase()}, I promise not to reveal our most embarrassing moments, at least until the cake is cut! Stay ridiculous and legendary! 🎂🔥`,
          `Happy ${celebrant.age === 22 ? '22nd' : `${celebrant.age}th`} Birthday, ${recipient}! Science confirms that birthday cake calories don't count today. ${cue}Thank you for always being the one person with worse impulse control than me. Here's to another year of terrible decisions and unmatched stories! 🍻🍕`,
        ],
        poetic: [
          `May the stars align in gentle harmony for your birthday, ${recipient}. Like starlight traveling across quiet oceans, your kindness illuminates even the deepest night. ${cue}May the winds carry courage to your sails, and may every morning awaken you to wonder, beauty, and boundless grace. 🌙✨`,
          `Another orbit around the sun, another golden thread woven into the tapestry of your life, dear ${recipient}. ${cue}May this chapter be written in laughter, bathed in sunlight, and sealed with timeless peace. Happy Birthday to a truly celestial soul. 🕊️🌿`,
        ],
        hype: [
          `HOLD THE PRESSES!! IT'S ${recipient.toUpperCase()}'S BIRTHDAY!! 🚀💥 Absolutely NO ONE does life with as much swagger, energy, and pure fire as you do! ${cue}Today the universe bows down to celebrate the absolute GOAT! Turn the music all the way up and let's make tonight unforgettable! 🍾🎉`,
          `LEVEL UP UNLOCKED! 🎮 Happy Birthday, ${recipient}! Another year of dominating, inspiring, and being an unstoppable force of nature! ${cue}Can't wait to see the mountains you conquer next! Let's get this party started! 👑🥂`,
        ],
        rhyme: [
          `Roses are red, the ocean is blue,\nThe world is more magical because of you!\n${cue}Another year older, brighter, and wise,\nWishing you cake, champagne, and starry skies!\nHappy Birthday, ${recipient}! 🎈🍰`,
          `A cheer in the morning, a toast in the night,\nMay all of your wishes take instant flight!\n${cue}To my favorite ${relationship.toLowerCase()} so witty and true,\nHappy Birthday ${recipient}, cheers to YOU! 🥳🎉`,
        ],
        short: [
          `Happy Birthday to my favorite human, ${recipient} ✨ Another year bolder, brighter, and effortlessly iconic. Love you always! 🤍🥂`,
          `To the realest one in the room: Happy Birthday, ${recipient}! Keep glowing and making magic wherever you walk. 💫🎂`,
        ],
      };

      const pool = toneTemplates[selectedTone] || toneTemplates.heartfelt;
      const randomPick = pool[Math.floor(Math.random() * pool.length)];
      setGeneratedWish(randomPick);
      setIsGenerating(false);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8'],
      });
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostDirectly = () => {
    if (!generatedWish) return;
    const wishObject = {
      id: `w_ai_${Date.now()}`,
      author: senderName.trim() || 'AI Well-Wisher',
      relationship: relationship || 'Friend',
      avatar: '🤍',
      message: generatedWish,
      timestamp: 'Just now',
      reactions: { love: 1, fire: 0, cheers: 1 },
      color: 'from-white/10 to-white/5',
      pinned: false,
    };

    onPostToWall(wishObject);
    playPartyFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FFFFFF', '#E2E8F0', '#CBD5E1'],
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="glass-panel-bw rounded-3xl border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-8 relative bg-black/95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-serif-festive text-white">AI Birthday Wish Studio</h3>
              <p className="text-xs font-mono text-slate-400">Craft deeply personal, heartfelt, or poetic messages in seconds.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                Birthday Person's Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                Your Name (Sender)
              </label>
              <input
                type="text"
                placeholder="e.g. Alex"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                Your Relationship
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
              >
                {relationshipPresets.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                Inside Joke or Favorite Memory (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. roadtrip flat tire, midnight diner"
                value={memoryCue}
                onChange={(e) => setMemoryCue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Tone
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {aiTonePresets.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTone(t.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedTone === t.id
                      ? 'border-white bg-white/20 text-white shadow-glow-white'
                      : 'border-white/10 bg-black/60 text-slate-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <div className="text-base mb-1">{t.emoji}</div>
                  <div className="text-xs font-bold text-white leading-tight font-mono">{t.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={generateMessage}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-white text-black font-mono font-black text-xs uppercase tracking-wider shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-glow-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting AI Magic...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{generatedWish ? 'Generate Another Variation' : 'Generate Birthday Wish'}</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Result Output */}
        {generatedWish && (
          <div className="p-5 rounded-2xl bg-black/90 border border-white/30 shadow-inner space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono uppercase tracking-wider">
              <span>AI Output Result:</span>
              <span>Tone: {aiTonePresets.find((t) => t.id === selectedTone)?.label}</span>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed italic whitespace-pre-line font-serif-festive">
              "{generatedWish}"
            </p>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-white/10">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePostDirectly}
                className="px-5 py-2 rounded-xl bg-white text-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-glow-white hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-black" />
                <span>Post Directly to Wishes Wall</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
