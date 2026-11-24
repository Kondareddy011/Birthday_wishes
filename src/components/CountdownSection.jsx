import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Calendar, Sparkles, PartyPopper, Bell, Check, Heart } from 'lucide-react';
import { playPartyFanfare, playUnboxChime } from '../utils/soundEffects';

export default function CountdownSection({ celebrant }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    hasPassed: false
  });
  const [copiedCal, setCopiedCal] = useState(false);

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Check if today is the birthday (Nov 25th in local time)
      // Note: JavaScript months are 0-indexed (10 = November)
      const isNov25 = now.getMonth() === 10 && now.getDate() === 25;

      let target = new Date(celebrant?.birthDate || `${currentYear}-11-25T00:00:00`);
      if (isNaN(target.getTime())) {
        target = new Date(`${currentYear}-11-25T00:00:00`);
      }

      const diff = target.getTime() - now.getTime();

      // If it is Nov 25th today, activate the full celebration!
      if (isNov25) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          hasPassed: false
        });
        return;
      }

      // If past Nov 25 this year, target next year's Nov 25
      let activeDiff = diff;
      let targetHasPassed = false;
      if (diff <= 0) {
        targetHasPassed = true;
        const nextTarget = new Date(`${currentYear + 1}-11-25T00:00:00`);
        activeDiff = nextTarget.getTime() - now.getTime();
      }

      const days = Math.max(0, Math.floor(activeDiff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((activeDiff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((activeDiff / 1000 / 60) % 60));
      const seconds = Math.max(0, Math.floor((activeDiff / 1000) % 60));

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        hasPassed: targetHasPassed
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [celebrant?.birthDate]);

  const handleCelebrate = () => {
    playPartyFanfare();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFFFFF', '#E2E8F0', '#CBD5E1', '#94A3B8', '#F43F5E']
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0']
      });
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#FFFFFF', '#CBD5E1', '#94A3B8']
      });
    }, 250);
  };

  const handleAddToCalendar = () => {
    playUnboxChime();
    const name = celebrant?.name || 'Lakshmi';
    const age = celebrant?.age || 22;
    const title = encodeURIComponent(`🎂 Happy ${age}nd Birthday, ${name}!`);
    const details = encodeURIComponent(`Celebrating ${name}'s ${age}nd milestone birthday! Blow candles, slice cake, and cherish memories together! ❤️`);
    const dateStr = "20261125T000000";
    const dateEnd = "20261125T235959";
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateEnd}&details=${details}`;
    window.open(gcalUrl, '_blank');
    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <section className="relative py-12 px-3 sm:px-6 max-w-5xl mx-auto w-full print:hidden">
      {/* Subtle ambient backglow */}
      <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      <div className="bg-zinc-950/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow orb */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider mb-2 shadow-glow-white">
              <Clock className="w-3.5 h-3.5 text-white animate-spin-slow" />
              <span>Official 25th November Milestone Countdown</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-festive font-black text-white leading-tight">
              {timeLeft.isToday ? (
                <span className="animate-text-shimmer-bw">🎂 THE BIG DAY IS HERE! HAPPY 22ND BIRTHDAY! 🎉</span>
              ) : (
                <span>Counting Down to November 25th ⏳</span>
              )}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1 max-w-xl">
              {timeLeft.isToday
                ? `Today is November 25th! The wait is over — celebrating ${celebrant?.name || 'Lakshmi'}'s unforgettable 22nd milestone!`
                : `Every second brings us closer to midnight, November 25th — celebrating 22 magnificent years of ${celebrant?.name || 'Lakshmi'}.`}
            </p>
          </div>

          {/* Celebration / Confetti Quick Trigger */}
          <button
            onClick={handleCelebrate}
            className="px-5 py-2.5 rounded-full bg-white text-black font-black text-xs font-mono uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-glow-white flex-shrink-0"
          >
            <PartyPopper className="w-4 h-4 text-black" />
            <span>Launch Confetti 🎊</span>
          </button>
        </div>

        {/* 1. Countdown Digits (Active before Nov 25) */}
        {!timeLeft.isToday ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="group relative perspective-1000"
              >
                <div className="rounded-2xl p-4 sm:p-6 text-center border border-white/15 bg-black/70 group-hover:border-white/50 transition-all duration-300 transform group-hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                  {/* Subtle inner card gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Digit */}
                  <span className="relative z-10 block font-mono text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg">
                    {String(block.value).padStart(2, '0')}
                  </span>

                  {/* Label */}
                  <span className="relative z-10 text-[10px] sm:text-xs font-mono font-extrabold text-zinc-400 tracking-widest mt-2 block group-hover:text-white transition-colors uppercase">
                    {block.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 2. Birthday Today Banner (Active on Nov 25) */
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/30 text-center mb-8 relative overflow-hidden">
            <div className="absolute top-3 left-4 text-3xl animate-bounce">🎈</div>
            <div className="absolute top-3 right-4 text-3xl animate-bounce [animation-delay:0.2s]">✨</div>
            <div className="absolute bottom-3 left-4 text-3xl animate-bounce [animation-delay:0.4s]">🥳</div>
            <div className="absolute bottom-3 right-4 text-3xl animate-bounce [animation-delay:0.6s]">🥂</div>

            <span className="inline-block px-4 py-1 rounded-full bg-white text-black font-black text-xs font-mono uppercase tracking-widest mb-3 shadow-glow-white">
              🌟 Today • November 25, 2026 🌟
            </span>
            <h4 className="text-3xl sm:text-5xl md:text-6xl font-serif-festive font-black text-white mb-3">
              HAPPY BIRTHDAY, {celebrant?.name?.toUpperCase() || 'LAKSHMI'}!
            </h4>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm sm:text-base font-serif italic">
              "May this 22nd milestone year shower you with boundless joy, glowing success, unconditional love, and laughter that echoes forever."
            </p>
            <button
              onClick={handleCelebrate}
              className="px-8 py-4 rounded-full bg-white text-black font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 shadow-glow-white"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Celebrate With Confetti &amp; Fanfare! 🎊</span>
            </button>
          </div>
        )}

        {/* Footer info & Google Calendar Sync */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white" />
            <span>
              Target Birthday: <strong className="text-white">Wednesday, November 25, 2026</strong> (Age {celebrant?.age || 22})
            </span>
          </div>

          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-2 border border-white/20 transition-all shadow-sm hover:scale-102"
          >
            {copiedCal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bell className="w-3.5 h-3.5 text-white" />}
            <span>{copiedCal ? 'Opening Google Calendar...' : 'Add to Google Calendar 📅'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
