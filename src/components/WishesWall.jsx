import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageSquare, Flame, Sparkles, Send, Pin, Plus, Wand2 } from 'lucide-react';
import { playPartyFanfare } from '../utils/soundEffects';

const EMOJI_AVATARS = ['🌸', '🦁', '🎸', '🌟', '☕', '🦋', '🚀', '👑', '🥳', '🦄', '🎉', '🍀'];

const CARD_COLORS = [
  { id: 'pink', label: 'Pink Glow', class: 'from-pink-500/20 to-purple-500/10 border-pink-500/30' },
  { id: 'purple', label: 'Cyber Violet', class: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30' },
  { id: 'amber', label: 'Royal Amber', class: 'from-amber-500/20 to-rose-500/10 border-amber-500/30' },
  { id: 'cyan', label: 'Electric Cyan', class: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30' },
  { id: 'emerald', label: 'Emerald Mint', class: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30' },
];

export default function WishesWall({
  wishes,
  celebrant,
  onAddWish,
  onOpenAIGenerator,
}) {
  const [filter, setFilter] = useState('All');
  const [localWishes, setLocalWishes] = useState(wishes);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRelation, setNewRelation] = useState('Friend');
  const [newAvatar, setNewAvatar] = useState('🌸');
  const [newColor, setNewColor] = useState(CARD_COLORS[0]);
  const [newMessage, setNewMessage] = useState('');

  // Keep local wishes in sync when parent prop changes
  React.useEffect(() => {
    setLocalWishes(wishes);
  }, [wishes]);

  const categories = ['All', 'Best Friend', 'Soul Sister', 'Partner in Crime', 'Family', 'Colleague & Coffee Buddy'];

  const filteredWishes = filter === 'All'
    ? localWishes
    : localWishes.filter((w) => w.relationship.toLowerCase().includes(filter.toLowerCase()));

  const handleReaction = (wishId, type) => {
    setLocalWishes((prev) =>
      prev.map((w) => {
        if (w.id === wishId) {
          const currentCount = w.reactions?.[type] || 0;
          return {
            ...w,
            reactions: {
              ...w.reactions,
              [type]: currentCount + 1,
            },
          };
        }
        return w;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    playPartyFanfare();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#EC4899', '#8B5CF6', '#FACC15', '#06B6D4'],
    });

    const createdWish = {
      id: `w_${Date.now()}`,
      author: newAuthor.trim(),
      relationship: newRelation,
      avatar: newAvatar,
      message: newMessage.trim(),
      timestamp: 'Just now',
      reactions: { love: 1, fire: 0, cheers: 1 },
      color: newColor.class,
      pinned: false,
    };

    if (onAddWish) {
      onAddWish(createdWish);
    } else {
      setLocalWishes([createdWish, ...localWishes]);
    }

    setNewAuthor('');
    setNewMessage('');
    setShowAddForm(false);
  };

  return (
    <section id="wishes" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-semibold tracking-wide uppercase mb-3">
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span>Interactive Wishes Wall</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Messages of <span className="animate-text-shimmer">Love & Celebration</span> 💌
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-base">
            Warm wishes, hilarious roasts, and lifelong memories left by the people who cherish {celebrant.name}.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenAIGenerator}
            className="px-5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-200 font-bold text-sm shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <Wand2 className="w-4 h-4 text-purple-300 animate-pulse" />
            <span>AI Wish Studio</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Wish Form' : 'Write a Birthday Wish'}</span>
          </button>
        </div>
      </div>

      {/* WRITE A WISH FORM ACCORDION */}
      {showAddForm && (
        <div className="mb-12 glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-2xl shadow-pink-500/15 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <div>
                <h4 className="text-lg font-bold text-white">Leave Your Heartfelt Wish</h4>
                <p className="text-xs text-slate-400">Your message will appear immediately on the celebration board!</p>
              </div>
            </div>
            <button
              onClick={onOpenAIGenerator}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need help? Generate with AI</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam, Jessica, Big Bro Sam"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Relationship *
                </label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500"
                >
                  <option value="Best Friend">Best Friend</option>
                  <option value="Soul Sister">Soul Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Mom / Dad">Mom / Dad</option>
                  <option value="Partner in Crime">Partner in Crime</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Cousin">Cousin</option>
                  <option value="Cheerleader">Cheerleader</option>
                </select>
              </div>
            </div>

            {/* Avatar & Color Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Choose Your Emoji Avatar
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {EMOJI_AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewAvatar(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                        newAvatar === emoji
                          ? 'bg-pink-500 scale-110 shadow-lg shadow-pink-500/40'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Card Aura Style
                </label>
                <div className="flex items-center gap-2">
                  {CARD_COLORS.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setNewColor(col)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        newColor.id === col.id
                          ? 'border-white text-white bg-slate-800 shadow-md scale-105'
                          : 'border-slate-700 text-slate-400 bg-slate-950'
                      }`}
                    >
                      {col.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Birthday Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder={`Dear ${celebrant.name}, wishing you a year overflowing with adventure, laughs, and pure happiness...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Post Birthday Wish</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'All' ? '💌 All Wishes' : cat}
          </button>
        ))}
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWishes.map((wish) => (
          <div
            key={wish.id}
            className="group perspective-1000 relative"
          >
            <div
              className={`rounded-3xl p-6 glass-panel border bg-gradient-to-br ${
                wish.color || 'from-pink-500/20 to-purple-500/10'
              } ${
                wish.pinned ? 'border-amber-400/50 shadow-glow-gold' : 'border-white/10'
              } transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between`}
            >
              {/* Top Row: Author & Relationship */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-white/20 flex items-center justify-center text-xl shadow-md">
                      {wish.avatar || '✨'}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight group-hover:text-pink-300 transition-colors">
                        {wish.author}
                      </h4>
                      <span className="text-xs font-semibold text-pink-400/90">
                        {wish.relationship}
                      </span>
                    </div>
                  </div>

                  {wish.pinned && (
                    <div className="px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold flex items-center gap-1">
                      <Pin className="w-3 h-3 text-amber-400" />
                      <span>PINNED</span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <p className="text-slate-200 text-sm leading-relaxed mb-6 font-normal">
                  "{wish.message}"
                </p>
              </div>

              {/* Bottom Row: Timestamp & Reactions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {wish.timestamp}
                </span>

                {/* Reaction Counters */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleReaction(wish.id, 'love')}
                    className="px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/40 text-xs font-bold text-slate-300 hover:text-pink-300 flex items-center gap-1 transition-all active:scale-90"
                  >
                    <span>❤️</span>
                    <span>{wish.reactions?.love || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction(wish.id, 'fire')}
                    className="px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-xs font-bold text-slate-300 hover:text-amber-300 flex items-center gap-1 transition-all active:scale-90"
                  >
                    <span>🔥</span>
                    <span>{wish.reactions?.fire || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction(wish.id, 'cheers')}
                    className="px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-xs font-bold text-slate-300 hover:text-purple-300 flex items-center gap-1 transition-all active:scale-90"
                  >
                    <span>🥂</span>
                    <span>{wish.reactions?.cheers || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

