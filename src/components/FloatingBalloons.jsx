import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/soundEffects';

const BALLOON_COLORS = [
  { bg: 'from-pink-500 via-rose-500 to-pink-600', shadow: 'shadow-pink-500/50', border: 'border-pink-300', confetti: '#EC4899' },
  { bg: 'from-purple-500 via-indigo-500 to-violet-600', shadow: 'shadow-purple-500/50', border: 'border-purple-300', confetti: '#8B5CF6' },
  { bg: 'from-cyan-400 via-sky-400 to-blue-500', shadow: 'shadow-cyan-400/50', border: 'border-cyan-200', confetti: '#06B6D4' },
  { bg: 'from-amber-400 via-yellow-400 to-amber-500', shadow: 'shadow-amber-400/50', border: 'border-amber-200', confetti: '#FACC15' },
  { bg: 'from-emerald-400 via-teal-400 to-emerald-600', shadow: 'shadow-emerald-400/50', border: 'border-emerald-200', confetti: '#10B981' },
  { bg: 'from-orange-400 via-amber-500 to-red-500', shadow: 'shadow-orange-400/50', border: 'border-orange-200', confetti: '#F97316' },
  { bg: 'from-fuchsia-500 via-pink-500 to-purple-600', shadow: 'shadow-fuchsia-500/50', border: 'border-fuchsia-300', confetti: '#D946EF' },
  { bg: 'from-red-500 via-rose-600 to-red-700', shadow: 'shadow-red-500/50', border: 'border-red-300', confetti: '#EF4444' }
];

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);

  useEffect(() => {
    // Generate 8-9 vivid colorful floating balloons across the screen width
    const initialBalloons = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: 6 + (i * 12) + (Math.random() * 4 - 2), // percentage
      duration: 15 + Math.random() * 8, // seconds
      delay: Math.random() * 9,
      size: 46 + Math.random() * 22, // px
      colorIdx: i % BALLOON_COLORS.length,
      isPopped: false,
    }));
    setBalloons(initialBalloons);
  }, []);

  const handlePop = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    playPopSound();

    const balloonItem = balloons.find((b) => b.id === id);
    const mainColor = balloonItem ? BALLOON_COLORS[balloonItem.colorIdx].confetti : '#EC4899';

    confetti({
      particleCount: 30,
      spread: 65,
      origin: { x, y },
      colors: [mainColor, '#FACC15', '#06B6D4', '#EC4899', '#10B981', '#FFFFFF'],
      ticks: 120,
      gravity: 1.2,
      scalar: 0.85,
    });

    setPoppedCount((c) => c + 1);
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isPopped: true } : b))
    );

    // Respawn after 5 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
              ...b,
              isPopped: false,
              left: 5 + Math.random() * 90,
              colorIdx: Math.floor(Math.random() * BALLOON_COLORS.length),
            }
            : b
        )
      );
    }, 5000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden print:hidden">
      {poppedCount > 0 && (
        <div className="fixed top-24 right-4 pointer-events-auto bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold text-white shadow-lg flex items-center gap-2">
          <span>🎈 Balloons Popped:</span>
          <span className="bg-white text-black rounded-full px-2 py-0.5 text-xs font-mono font-bold">
            {poppedCount}
          </span>
        </div>
      )}

      {balloons.map((b) => {
        if (b.isPopped) return null;
        const color = BALLOON_COLORS[b.colorIdx];
        return (
          <div
            key={b.id}
            onClick={(e) => handlePop(b.id, e)}
            className="absolute cursor-pointer pointer-events-auto group transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{
              left: `${b.left}%`,
              bottom: '-130px',
              animation: `balloonFloat ${b.duration}s linear infinite`,
              animationDelay: `${b.delay}s`,
            }}
          >
            {/* Balloon Body with rich celebratory gradient and gloss */}
            <div
              className={`relative rounded-full bg-gradient-to-tr ${color.bg} shadow-lg ${color.shadow} border-t border-l ${color.border} flex items-center justify-center`}
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              }}
            >
              {/* Glossy specular highlight */}
              <div className="absolute top-2 left-2.5 w-3 h-5 bg-white/50 rounded-full blur-[0.5px] -rotate-12 pointer-events-none" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-black text-white drop-shadow select-none">
                POP!
              </span>

              {/* Balloon knot */}
              <div
                className={`absolute -bottom-1 w-2.5 h-2 bg-gradient-to-b ${color.bg} rounded-b-sm border-t border-black/30`}
              />

              {/* Hanging string */}
              <div className="absolute top-full left-1/2 w-0.5 h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent transform -translate-x-1/2 origin-top animate-float-medium" />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes balloonFloat {
          0% {
            transform: translateY(0) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          50% {
            transform: translateY(-55vh) translateX(25px) rotate(4deg);
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(-115vh) translateX(-20px) rotate(-4deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
