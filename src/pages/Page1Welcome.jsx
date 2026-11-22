import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Wind,
  Gift,
  Layers,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import HolographicPhotoGallery3D from '../components/HolographicPhotoGallery3D';
import RealisticDarkForestCake from '../components/RealisticDarkForestCake';
import {
  playBlowCandleSound,
  playCakeSliceSound,
  playPartyFanfare,
  playUnboxChime
} from '../utils/soundEffects';

export default function Page1Welcome({
  celebrant,
  photos,
  onNavigate
}) {
  // Pop-In / Pop-Out Intro Stages: 'pop-in' (starting 0-2.4s) -> 'pop-out' (2.4s-3.0s) -> 'cake' (3.0s+)
  const [introStage, setIntroStage] = useState('pop-in');
  const [countdown, setCountdown] = useState(3);
  const cakeSectionRef = useRef(null);
  const intervalRef = useRef(null);
  const popOutTimerRef = useRef(null);
  const timerRef = useRef(null);

  // Cake Ceremony States
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [isCuttingAnimation, setIsCuttingAnimation] = useState(false);
  const [showHologramModal, setShowHologramModal] = useState(false);

  // Start 3-Second Pop-In & Pop-Out Lifecycle
  const startIntroSequence = () => {
    setIntroStage('pop-in');
    setCountdown(3);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (popOutTimerRef.current) clearTimeout(popOutTimerRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // At 2.4s: Start pop-out animation
    popOutTimerRef.current = setTimeout(() => {
      setIntroStage('pop-out');
    }, 2400);

    // At 3.0s: Pop out completes, Dark Forest Cake pops in!
    timerRef.current = setTimeout(() => {
      setIntroStage('cake');
      playUnboxChime();
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8', '#CBD5E1', '#F43F5E']
      });
    }, 3000);
  };

  useEffect(() => {
    startIntroSequence();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (popOutTimerRef.current) clearTimeout(popOutTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSkipToCake = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (popOutTimerRef.current) clearTimeout(popOutTimerRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    setIntroStage('pop-out');
    setTimeout(() => {
      setIntroStage('cake');
      playUnboxChime();
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
      });
    }, 350);
  };

  // 1. Blow Candles Action with realistic wind gust sequence
  const handleBlowCandles = () => {
    if (candlesBlown || isBlowing) return;
    setIsBlowing(true);
    playBlowCandleSound();

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.58 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
    });

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);

      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#CBD5E1']
      });
    }, 950);
  };

  // 2. Cut Cake Action with realistic knife slice sequence
  const handleCutCake = () => {
    if (cakeCut || isCuttingAnimation) return;
    setIsCuttingAnimation(true);
    playCakeSliceSound();

    setTimeout(() => {
      setCakeCut(true);
      setIsCuttingAnimation(false);
      playPartyFanfare();

      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#FFFFFF', '#06B6D4', '#E2E8F0', '#CBD5E1', '#F8FAFC', '#F43F5E']
      });
    }, 1150);
  };

  // Re-light candles & slice again
  const handleResetCakeCeremony = () => {
    setCandlesBlown(false);
    setIsBlowing(false);
    setCakeCut(false);
    setIsCuttingAnimation(false);
  };

  // 3. Open Hologram Surprise Gift Action
  const handleOpenSurpriseGift = () => {
    setShowHologramModal(true);
  };

  return (
    <div className="h-full w-full max-w-6xl mx-auto px-3 sm:px-6 flex flex-col justify-center items-center overflow-hidden py-1 sm:py-2">
      {/* ========================================================
          1. LUXURY HERO GREETING:
          POPS IN at starting, stays for ~4.5 seconds, then POPS OUT!
         ======================================================== */}
      {introStage !== 'cake' && (
        <section
          className={`w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative select-none py-2 my-auto ${
            introStage === 'pop-in' ? 'animate-pop-in' : 'animate-pop-out'
          }`}
        >
          {/* Celebrant Monogram & Portrait Frame with Centered AGE Capsule */}
          <div className="relative mb-4 inline-block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full p-1.5 bg-gradient-to-tr from-white via-zinc-400 to-black shadow-2xl border-2 border-white/50 mx-auto overflow-hidden">
              <img
                src={celebrant.avatarUrl}
                alt={celebrant.name}
                className="w-full h-full rounded-full object-cover grayscale contrast-125 transition-all"
                style={{ objectPosition: celebrant.avatarPosition || '44% 24%' }}
              />
            </div>
            {/* Centered AGE pill at the bottom edge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-white text-black font-black text-xs font-mono shadow-xl border border-black uppercase tracking-wider">
              AGE {celebrant.age}
            </div>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-festive font-black tracking-tight text-white mb-2 leading-tight">
            Happy Birthday, <br />
            <span className="animate-text-shimmer-bw">{celebrant.name}</span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl font-serif text-slate-300 max-w-xl mx-auto italic mb-3">
            "{celebrant.tagline || 'The world became 1000x brighter the day you arrived.'}"
          </p>

          {/* Bio */}
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-lg mx-auto leading-relaxed hidden sm:block">
            {celebrant.bio ||
              'Dreamer, coffee lover, stargazer, and the best friend anyone could ever ask for. Here\'s to making this year your most unforgettable chapter yet.'}
          </p>

          {/* 3-Second Animated Indicator during pop-in */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all ease-linear duration-1000"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              />
            </div>
            <button
              onClick={handleSkipToCake}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>🎂 Cake arriving in {countdown}s...</span>
              <span className="text-[10px] text-slate-500 underline">(skip)</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          2. THE LUXURY 3D CAKE CEREMONY:
          POPS IN after the intro greeting pops out!
         ======================================================== */}
      {introStage === 'cake' && (
        <section
          ref={cakeSectionRef}
          className="glass-panel-bw rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden text-center flex flex-col justify-between max-w-5xl lg:max-w-6xl w-full mx-auto my-auto animate-pop-in max-h-[calc(100dvh-5.2rem)]"
        >
          {/* Top subtle controls row inside cake section */}
          <div className="flex items-center justify-end gap-2 mb-1 text-xs font-mono text-slate-400 flex-shrink-0">
            <button
              onClick={startIntroSequence}
              className="hover:text-white flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs"
              title="Watch the pop-in & pop-out greeting again"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro</span>
            </button>
          </div>

          {/* Ambient Header inside Cake Section */}
          <div className="mb-2 sm:mb-3 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-festive font-black text-white leading-tight">
              Happy Birthday, <span className="animate-text-shimmer-bw">{celebrant.name}</span>! 🎂
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto font-mono mt-1">
              {!candlesBlown && `Make a silent wish, then blow out your ${celebrant.age} milestone candles.`}
              {candlesBlown && !cakeCut && "The candles are blown! Now slice the rich Dark Forest cake with the silver ceremonial knife."}
              {cakeCut && "🎉 The Dark Forest cake is cut! Your 3D Holographic Surprise Gift is now ready to open!"}
            </p>
          </div>

          {/* Glow ambient background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* REALISTIC 3D DARK FOREST BIRTHDAY CAKE WITH DIRECT INTERACTIVE BLOW & CUT */}
          <div className="my-auto py-2 flex items-center justify-center flex-1 min-h-0 w-full">
            <RealisticDarkForestCake
              candlesBlown={candlesBlown}
              isBlowing={isBlowing}
              cakeCut={cakeCut}
              isCutting={isCuttingAnimation}
              onBlow={handleBlowCandles}
              onCut={handleCutCake}
              celebrantAge={celebrant.age || 22}
            />
          </div>

          {/* CEREMONY ACTION CONTROLS */}
          <div className="mt-2 sm:mt-4 flex flex-col items-center gap-2 flex-shrink-0">
            {/* STEP 1: BLOW CANDLES BUTTON */}
            {!candlesBlown && (
              <button
                onClick={handleBlowCandles}
                disabled={isBlowing}
                className={`px-8 py-3 sm:px-12 sm:py-4 rounded-full font-black text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-xl transition-all flex items-center gap-2.5 shadow-glow-white ${
                  isBlowing
                    ? 'bg-slate-200 text-black scale-95 opacity-90'
                    : 'bg-white text-black hover:scale-105 active:scale-95'
                }`}
              >
                <Wind className={`w-4 h-4 sm:w-5 sm:h-5 text-black ${isBlowing ? 'animate-spin' : ''}`} />
                <span>{isBlowing ? 'Blowing Out Candles... 🌬️' : 'Blow Out Candles & Make a Wish 🕯️'}</span>
              </button>
            )}

            {/* STEP 2: CUT CAKE BUTTON */}
            {candlesBlown && !cakeCut && (
              <button
                onClick={handleCutCake}
                disabled={isCuttingAnimation}
                className={`px-8 py-3 sm:px-12 sm:py-4 rounded-full bg-gradient-to-r from-white via-slate-100 to-zinc-300 text-black font-black text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-xl transition-all flex items-center gap-2.5 shadow-glow-white ${
                  isCuttingAnimation
                    ? 'scale-95 opacity-90'
                    : 'hover:scale-105 active:scale-95 animate-pulse'
                }`}
              >
                <span>{isCuttingAnimation ? '🔪 Ceremonial Knife Slicing...' : '🔪 Slice the Birthday Cake!'}</span>
              </button>
            )}

            {/* STEP 3: THE REVEALED SURPRISE GIFT BUTTON */}
            {cakeCut && (
              <div className="animate-in zoom-in duration-500 flex flex-col items-center gap-2">
                {/* THE REVEALED SURPRISE GIFT BUTTON */}
                <button
                  onClick={handleOpenSurpriseGift}
                  className="px-8 py-3.5 sm:px-12 sm:py-4.5 rounded-full bg-white text-black font-black text-sm sm:text-base md:text-lg tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-glow-white border-2 border-white group"
                >
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:rotate-12 transition-transform" />
                  <span>🎁 Open 3D Holographic Surprise Gift</span>
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-black animate-spin-slow" />
                </button>

                {/* Interactive Reset / Replay Ceremony */}
                <button
                  onClick={handleResetCakeCeremony}
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors underline decoration-dotted"
                  title="Relight candles and cut again"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight candles &amp; slice again</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          3. 3D HOLOGRAPHIC PHOTO GALLERY MODAL
         ======================================================== */}
      <HolographicPhotoGallery3D
        photos={photos}
        isOpen={showHologramModal}
        onClose={() => setShowHologramModal(false)}
      />
    </div>
  );
}
