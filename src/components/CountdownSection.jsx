import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Calendar, Sparkles, PartyPopper, Bell, Check } from 'lucide-react';
import { playPartyFanfare } from '../utils/soundEffects';

export default function CountdownSection({ celebrant, onUpdateCelebrant }) {
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
      const target = new Date(celebrant.birthDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (isNaN(target)) {
        return;
      }

      // Check if it's the birthday today (within 24 hours of target date, or day matches)
      const targetDateObj = new Date(celebrant.birthDate);
      const nowDateObj = new Date();
      const isSameMonthAndDay =
        targetDateObj.getMonth() === nowDateObj.getMonth() &&
        targetDateObj.getDate() === nowDateObj.getDate();

      if (diff <= 0 || isSameMonthAndDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          hasPassed: diff <= -86400000 // passed more than 24h
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        hasPassed: false
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [celebrant.birthDate]);

  const handleCelebrateNow = () => {
    playPartyFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#8B5CF6', '#FACC15', '#10B981', '#06B6D4']
    });
  };

  const setBirthdayToToday = () => {
    const today = new Date().toISOString().slice(0, 16);
    if (onUpdateCelebrant) {
      onUpdateCelebrant({ ...celebrant, birthDate: today });
    }
  };

  const setBirthdayToFuture = () => {
    const future = new Date(Date.now() + 3 * 86400000 + 5 * 3600000).toISOString().slice(0, 16);
    if (onUpdateCelebrant) {
      onUpdateCelebrant({ ...celebrant, birthDate: future });
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`🎂 ${celebrant.name}'s Birthday Celebration!`);
    const details = encodeURIComponent(`Don't forget to send wishes and celebrate with ${celebrant.name}!`);
    const dateStr = new Date(celebrant.birthDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`;
    window.open(gcalUrl, '_blank');
    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days, color: 'from-pink-500 to-rose-600' },
    { label: 'HOURS', value: timeLeft.hours, color: 'from-purple-500 to-indigo-600' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'from-cyan-400 to-blue-600' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'from-amber-400 to-yellow-600' }
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 rounded-3xl blur-2xl -z-10" />

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 animate-spin-slow" />
              <span>Official Birthday Countdown</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {timeLeft.isToday ? (
                <span className="text-glow-pink">🎂 The Big Day is HERE! Party Time! 🎉</span>
              ) : (
                <span>Counting Down to the Celebration ⏳</span>
              )}
            </h3>
          </div>

          {/* Quick Simulation Toggles */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              onClick={setBirthdayToToday}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeLeft.isToday
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎉 Today Mode
            </button>
            <button
              onClick={setBirthdayToFuture}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                !timeLeft.isToday
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⏳ Countdown Mode
            </button>
          </div>
        </div>

        {/* Countdown Digits or Party Banner */}
        {!timeLeft.isToday ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="relative group perspective-1000"
              >
                <div className="glass-card rounded-2xl p-5 text-center border border-white/10 group-hover:border-pink-500/50 transition-all duration-300 transform group-hover:-translate-y-1 shadow-3d-card">
                  {/* Glowing background behind number */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-10 rounded-2xl blur-lg group-hover:opacity-20 transition-opacity`} />

                  {/* Digit */}
                  <span className="relative z-10 block font-mono text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
                    {String(block.value).padStart(2, '0')}
                  </span>

                  {/* Label */}
                  <span className="relative z-10 text-[11px] sm:text-xs font-extrabold text-slate-400 tracking-widest mt-2 block group-hover:text-pink-300 transition-colors">
                    {block.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Birthday is Today Banner */
          <div className="p-8 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-500/40 text-center mb-8 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl animate-bounce">🎈</div>
            <div className="absolute bottom-2 left-2 text-3xl animate-bounce">🥳</div>
            <h4 className="text-3xl sm:text-4xl font-black text-white mb-2">
              HAPPY BIRTHDAY, {celebrant.name.toUpperCase()}! 🌟
            </h4>
            <p className="text-slate-300 max-w-lg mx-auto mb-6 text-sm sm:text-base">
              The wait is over! Today is all about honoring you, sharing endless laughs, and creating core memories that will last a lifetime.
            </p>
            <button
              onClick={handleCelebrateNow}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Fire Celebration Confetti! 🎊</span>
            </button>
          </div>
        )}

        {/* Footer info & Calendar sync */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>
              Target Date: <strong className="text-slate-200">{new Date(celebrant.birthDate).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</strong>
            </span>
          </div>

          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            {copiedCal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bell className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedCal ? 'Opening Google Calendar...' : 'Remind Me / Add to Calendar'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

