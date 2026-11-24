import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Lock,
  Unlock,
  Clock,
  Calendar,
  Volume2,
  VolumeX,
  KeyRound,
  Sparkles,
  PartyPopper,
  Bell,
  Check,
  ShieldCheck
} from 'lucide-react';
import FloatingBalloons from './FloatingBalloons';
import {
  playPartyFanfare,
  playUnboxChime,
  playCorkPopSound,
  toggleBackgroundMusic
} from '../utils/soundEffects';

export default function LockedCountdownVault({
  celebrant,
  onUnlock,
  isPlayingAudio,
  setIsPlayingAudio
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false
  });

  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedCal, setCopiedCal] = useState(false);

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Check if today is November 25th in local time (months are 0-indexed: 10 = Nov)
      const isNov25 = now.getMonth() === 10 && now.getDate() === 25;

      let target = new Date(celebrant?.birthDate || `${currentYear}-11-25T00:00:00`);
      if (isNaN(target.getTime())) {
        target = new Date(`${currentYear}-11-25T00:00:00`);
      }

      const diff = target.getTime() - now.getTime();

      // Trigger automatic unlock if today is Nov 25th or target reached
      if (isNov25 || diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true
        });

        // Trigger unlock transition
        if (!isUnlocking) {
          triggerUnlockSequence();
        }
        return;
      }

      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [celebrant?.birthDate, isUnlocking]);

  const triggerUnlockSequence = () => {
    setIsUnlocking(true);
    playPartyFanfare();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#CBD5E1', '#F43F5E']
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 120,
        origin: { x: 0.25, y: 0.6 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
      });
      confetti({
        particleCount: 90,
        spread: 120,
        origin: { x: 0.75, y: 0.6 },
        colors: ['#FFFFFF', '#CBD5E1', '#64748B']
      });
    }, 300);

    setTimeout(() => {
      if (onUnlock) onUnlock();
    }, 1800);
  };

  const handleAudioToggle = () => {
    toggleBackgroundMusic((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    const correctPin = celebrant?.adminPin || '1234';
    if (pinInput.trim() === correctPin || pinInput.trim() === '2026') {
      playUnboxChime();
      setShowPinModal(false);
      triggerUnlockSequence();
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleDirectPreview = () => {
    playCorkPopSound();
    setShowPinModal(false);
    triggerUnlockSequence();
  };

  const handleAddToCalendar = () => {
    playUnboxChime();
    const name = celebrant?.name || 'Lakshmi';
    const age = celebrant?.age || 22;
    const title = encodeURIComponent(`🎂 Happy ${age}nd Birthday, ${name}!`);
    const details = encodeURIComponent(`Midnight milestone celebration for ${name}'s ${age}nd birthday! Unlocking cake, 3D memory vault, and surprises! ❤️`);
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
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* Floating Interactive Balloons */}
      <FloatingBalloons />

      {/* Top Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Celebrant Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white via-zinc-400 to-black p-0.5 shadow-lg border border-white/30 overflow-hidden flex-shrink-0">
              <img
                src={celebrant?.avatarUrl || '/photoes/IMG20260206161511.jpg'}
                alt={celebrant?.name || 'Lakshmi'}
                className="w-full h-full rounded-full object-cover"
                style={{ objectPosition: celebrant?.avatarPosition || '44% 24%' }}
              />
            </div>
            <div>
              <span className="font-serif-festive font-extrabold text-white text-lg tracking-tight">
                {celebrant?.name || 'Lakshmi'}
              </span>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                isPlayingAudio
                  ? 'bg-white text-black border-white shadow-glow-white'
                  : 'bg-black border-white/20 text-slate-300 hover:text-white hover:border-white/40'
              }`}
              title={isPlayingAudio ? 'Pause Birthday Melody' : 'Play Birthday Melody'}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-black" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-black rounded-full animate-bounce h-1.5" />
                    <span className="w-1 bg-black rounded-full animate-bounce h-3 [animation-delay:0.15s]" />
                    <span className="w-1 bg-black rounded-full animate-bounce h-2 [animation-delay:0.3s]" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Melody</span>
                </>
              )}
            </button>

            {/* Early Access / Preview Button */}
            <button
              onClick={() => setShowPinModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all"
              title="Unlock early with VIP PIN"
            >
              <KeyRound className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">VIP Early Access</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Locked Vault Center Screen */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 max-w-4xl mx-auto w-full text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Lock Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-white font-mono text-xs uppercase tracking-widest mb-6 shadow-glow-white animate-pulse">
          {isUnlocking ? (
            <>
              <Unlock className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-emerald-300 font-bold">UNSEALING BIRTHDAY VAULT...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-white" />
              <span>VAULT SEALED UNTIL NOVEMBER 25TH</span>
            </>
          )}
        </div>

        {/* Celebrant Monogram & Avatar */}
        <div className="relative mb-5 inline-block">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-white via-zinc-400 to-black shadow-2xl border-2 border-white/60 mx-auto overflow-hidden">
            <img
              src={celebrant?.avatarUrl || '/photoes/IMG20260206161511.jpg'}
              alt={celebrant?.name || 'Lakshmi'}
              className="w-full h-full rounded-full object-cover grayscale contrast-125 transition-all"
              style={{ objectPosition: celebrant?.avatarPosition || '44% 24%' }}
            />
          </div>
          {/* Centered AGE pill at the bottom edge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-white text-black font-black text-xs font-mono shadow-xl border border-black uppercase tracking-wider">
            AGE {celebrant?.age || 22}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-festive font-black tracking-tight text-white mb-2 leading-tight">
          Happy Birthday, <br />
          <span className="animate-text-shimmer-bw">{celebrant?.name || 'Lakshmi'}</span>
        </h1>

        <p className="text-sm sm:text-base font-serif text-slate-300 max-w-lg mx-auto italic mb-3">
          "{celebrant?.tagline || 'The world became 1000x brighter the day you arrived.'}"
        </p>

        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
          The 3D Dark Forest cake ceremony, mystery gift vault, and personalized celebration chapters unlock automatically at midnight!
        </p>

        {/* THE GIANT LIVE COUNTDOWN DISPLAY */}
        <div className="w-full max-w-2xl bg-zinc-950/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-white animate-spin-slow" />
            <span>Unlocking In Real-Time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="rounded-2xl p-4 sm:p-5 text-center border border-white/15 bg-black/80 shadow-2xl relative overflow-hidden group hover:border-white/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 block font-mono text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="relative z-10 text-[10px] sm:text-xs font-mono font-extrabold text-zinc-400 tracking-widest mt-1 block uppercase">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          {/* Target date indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Target: <strong className="text-white">Wednesday, November 25, 2026</strong></span>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-white/20 transition-all"
            >
              {copiedCal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bell className="w-3.5 h-3.5 text-white" />}
              <span>{copiedCal ? 'Opening Calendar...' : 'Remind Me On Google Calendar 📅'}</span>
            </button>
          </div>
        </div>

        {/* Lock Notice & Early Access Link */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Locked with live cryptographic countdown • </span>
          <button
            onClick={() => setShowPinModal(true)}
            className="text-zinc-400 hover:text-white underline decoration-dotted transition-colors"
          >
            Enter Early Access PIN
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] font-mono text-zinc-600 border-t border-white/5">
        Celebrating 22 Years of Grace, Radiance &amp; Excellence • Lakshmi
      </footer>

      {/* EARLY ACCESS VIP PIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-zinc-950 border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-serif-festive font-black text-white mb-1">
              VIP Early Access
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Enter VIP PIN to unlock the celebration ahead of midnight.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-center font-mono text-lg tracking-widest focus:border-white focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs font-mono text-rose-400 mt-1.5 animate-shake">
                    Incorrect PIN! Hint: Default PIN is 1234.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all"
                >
                  Unlock Celebration
                </button>

                <button
                  type="button"
                  onClick={handleDirectPreview}
                  className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
                >
                  Direct Preview (Bypass PIN)
                </button>

                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-full py-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
