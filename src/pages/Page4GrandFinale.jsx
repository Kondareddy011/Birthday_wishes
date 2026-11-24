import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  PartyPopper,
  Share2,
  Shield,
  RotateCcw,
  Award,
  Download,
  ArrowLeft,
  Crown,
  Heart,
  Printer,
  FileCheck
} from 'lucide-react';
import { playCorkPopSound, playPartyFanfare } from '../utils/soundEffects';

export default function Page4GrandFinale({
  celebrant,
  theme,
  onNavigate,
  onOpenShare,
  onOpenAdmin
}) {
  const [corkPopped, setCorkPopped] = useState(true);
  const [popCount, setPopCount] = useState(1);

  // Formatted date matching "November 15, 2026"
  const formattedDate = React.useMemo(() => {
    try {
      if (celebrant?.birthDate) {
        const d = new Date(celebrant.birthDate);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      }
    } catch (e) {}
    return 'November 25, 2026';
  }, [celebrant?.birthDate]);

  const handlePopChampagne = () => {
    playCorkPopSound();
    setCorkPopped(true);
    setPopCount((c) => c + 1);

    // Elegant monochrome & silver confetti burst with sparkling highlights
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFFFFF', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8']
    });

    setTimeout(() => {
      playPartyFanfare();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.25, y: 0.6 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
      });
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.75, y: 0.6 },
        colors: ['#FFFFFF', '#CBD5E1', '#64748B']
      });
    }, 350);
  };

  const handlePrintCertificate = () => {
    setCorkPopped(true);
    // Give state a brief tick to ensure DOM is updated before print dialog
    setTimeout(() => {
      window.print();
    }, 120);
  };

  return (
    <div className="space-y-16 pb-20 max-w-5xl mx-auto px-4 sm:px-6 print:m-0 print:p-0 print:space-y-0 print:max-w-none print:w-full print:overflow-hidden">
      {/* Chapter 4 Header (Hidden during certificate print) */}
      <div className="text-center pt-8 print:hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-4 shadow-glow-white">
          <PartyPopper className="w-3.5 h-3.5 text-white" />
          <span>Chapter 4: The Grand Finale & Party Hall</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif-festive font-black text-white leading-tight">
          Long Live The Birthday Legend, <br />
          <span className="animate-text-shimmer-bw">{celebrant.name}!</span> 🥂👑
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 mt-3 max-w-xl mx-auto">
          You've journeyed through every room of your 4-chapter birthday quest. Toast to this milestone year and claim your official keepsake certificate!
        </p>
      </div>

      {/* ========================================================
          SPECIAL SURPRISE: CEREMONIAL CHAMPAGNE & AWARD CERTIFICATE
         ======================================================== */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden text-center print:border-none print:p-0 print:m-0 print:bg-transparent print:shadow-none print:overflow-hidden">
        
        {/* Champagne Ceremony Area (Hidden when printing the certificate) */}
        <div className="print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
            <span>Chapter 4 Grand Special Surprise</span>
          </div>

          {/* 3D Monochrome Luxury Champagne Bottle */}
          <div className="flex flex-col items-center py-4 mb-6">
            <div
              onClick={handlePopChampagne}
              className="cursor-pointer group relative transition-transform duration-300 hover:scale-105 active:scale-95"
              title="Click to pop the cork!"
            >
              {/* Flying Cork when popped */}
              {corkPopped && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-8 bg-zinc-200 rounded-t-lg border border-white shadow-glow-white animate-bounce flex items-center justify-center">
                  <span className="text-xs">🍾</span>
                </div>
              )}

              {/* Obsidian Glass Bottle Body */}
              <div className="w-24 h-64 bg-gradient-to-b from-zinc-300 via-zinc-900 to-black rounded-b-3xl rounded-t-full shadow-2xl border-2 border-white/40 relative flex flex-col items-center justify-between p-2">
                {/* Platinum / Silver Foil Neck */}
                <div className="w-10 h-16 bg-gradient-to-r from-zinc-200 via-white to-zinc-400 rounded-t-xl border-b border-black shadow-inner flex items-center justify-center">
                  <Crown className="w-3.5 h-3.5 text-black" />
                </div>

                {/* Minimalist Monochrome Label */}
                <div className="w-20 bg-black/90 rounded-lg p-2 text-white text-center shadow-md border border-white/40">
                  <span className="text-[7px] font-mono font-black tracking-widest uppercase block text-slate-400">
                    Cuvée Royale
                  </span>
                  <span className="text-xs font-serif-festive font-black block text-white">
                    {celebrant.name}
                  </span>
                  <span className="text-[8px] font-mono text-slate-300 block">
                    Vintage {celebrant.age}
                  </span>
                </div>

                <div className="w-14 h-1 bg-white/40 rounded-full" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePopChampagne}
                className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 shadow-glow-white border border-white"
              >
                <PartyPopper className="w-4 h-4 text-black" />
                <span>{corkPopped ? `Pop Another Bottle! (${popCount} Popped) 🍾` : 'Pop The Ceremonial Champagne! 🍾'}</span>
              </button>

              {!corkPopped && (
                <button
                  onClick={() => setCorkPopped(true)}
                  className="px-6 py-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/30 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Reveal Keepsake Certificate 📜</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            THE KEEPSAKE CERTIFICATE (EXACT MATCH TO USER SCREENSHOT)
            Pure white card, solid black border, black typography,
            exact same size on screen and single-page print
           ======================================================== */}
        {corkPopped && (
          <div className="mt-8 flex flex-col items-center">
            <div
              id="printable-certificate"
              className="w-full max-w-2xl mx-auto bg-white text-black rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-black relative text-center font-serif select-none print:m-auto print:p-8 print:border-2 print:border-black print:rounded-3xl print:max-w-2xl print:w-full print:bg-white print:text-black print:shadow-none"
            >
              {/* Official Watermark Seal matching user screenshot in top right */}
              <div className="cert-seal absolute top-5 right-5 sm:top-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-black bg-white flex flex-col items-center justify-center p-1 text-black shadow-sm">
                <svg
                  className="w-6 h-6 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="m8.5 12.5-2.5 8 6-3 6 3-2.5-8" />
                </svg>
                <span className="text-[7px] sm:text-[8px] font-mono font-black tracking-widest uppercase -mt-0.5">
                  OFFICIAL
                </span>
              </div>

              {/* Top Registry Header */}
              <span className="cert-label text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] font-bold text-black/90 block mb-3">
                THE OFFICIAL BIRTHDAY REGISTRY OF HONOR
              </span>

              {/* Certificate Title (Two Lines with &) */}
              <h3 className="cert-title text-2xl sm:text-4xl md:text-[2.6rem] font-black text-black font-serif-festive leading-[1.15] mb-3">
                Certificate of Distinction &amp;<br />
                Celebration
              </h3>

              {/* Subtitle */}
              <p className="cert-subtitle text-[9px] sm:text-[11px] font-mono font-bold text-black/80 uppercase tracking-[0.22em] mb-4">
                PRESENTED WITH UNCONDITIONAL LOVE &amp; ESTEEM TO
              </p>

              {/* Celebrant Name */}
              <div className="cert-name text-3xl sm:text-5xl md:text-6xl font-black text-black font-serif-festive tracking-tight mb-4">
                {celebrant.name}
              </div>

              {/* Description Quote */}
              <p className="cert-quote text-xs sm:text-sm md:text-base leading-relaxed text-black max-w-lg mx-auto mb-8 italic font-serif">
                &ldquo;For illuminating our worlds with boundless grace, laughter, wisdom, and strength. May your {celebrant.age === 22 ? '22nd' : `${celebrant.age}th`} milestone year unfold with triumphant health, magnificent joy, and your greatest memories yet.&rdquo;
              </p>

              {/* Footer: Date and Signed (No border line, matching user screenshot) */}
              <div className="cert-footer flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-black gap-2 font-mono pt-2">
                <span>Date: {formattedDate}</span>
                <span>Signed: All Who Cherish You 🤍</span>
              </div>
            </div>

            {/* Print Certificate Action Button (Positioned cleanly below card, hidden in print) */}
            <div className="mt-6 text-center print:hidden">
              <button
                onClick={handlePrintCertificate}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black border-2 border-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2.5 mx-auto transition-all shadow-xl hover:scale-105 active:scale-95 shadow-glow-white"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>Print / Save Keepsake Certificate (Single Page)</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Final Action Hub & Navigation (Hidden during print) */}
      <section className="glass-panel-bw rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl text-center space-y-6 print:hidden">
        <h4 className="text-lg sm:text-xl font-serif-festive font-black text-white">
          Where to Go From Here?
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePrintCertificate}
            className="px-6 py-3 rounded-full bg-white text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-glow-white"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Print Certificate</span>
          </button>

          <button
            onClick={onOpenShare}
            className="px-6 py-3 rounded-full bg-black hover:bg-zinc-900 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4 text-white" />
            <span>Share Birthday Link</span>
          </button>

          <button
            onClick={() => onNavigate(1)}
            className="px-6 py-3 rounded-full bg-black hover:bg-zinc-900 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay From Chapter 1</span>
          </button>

          <button
            onClick={() => onNavigate(3)}
            className="px-6 py-3 rounded-full bg-black hover:bg-zinc-900 border border-white/30 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chapter 3 (Oracle & Lantern)</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-6 py-3 rounded-full bg-black hover:bg-zinc-900 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Shield className="w-4 h-4 text-white" />
            <span>Host Admin</span>
          </button>
        </div>
      </section>
    </div>
  );
}
