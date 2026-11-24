import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  RotateCw,
  RotateCcw,
  ZoomIn,
  X,
  Play,
  Pause,
  Layers,
  ChevronLeft,
  ChevronRight,
  Grid,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHologramActivateSound, playUnboxChime } from '../utils/soundEffects';

const HOLOGRAM_THEME = {
  id: 'monochrome',
  name: 'Monochrome Silver Beam',
  glow: 'rgba(255, 255, 255, 0.75)',
  border: 'border-white/70',
  text: 'text-white',
  beam: 'from-white/25 via-white/10 to-transparent'
};

export default function HolographicPhotoGallery3D({ photos = [], isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(1400); // 1.4s fast smooth motion (default)
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const activeTheme = HOLOGRAM_THEME;
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' | 'grid'
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragDeltaXRef = useRef(0);

  const total = photos.length || 1;
  const isPopped = Boolean(selectedPhoto);

  // Sound & confetti on open
  useEffect(() => {
    if (isOpen) {
      playHologramActivateSound();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FFFFFF', '#06B6D4', '#E2E8F0', '#94A3B8']
      });
    }
  }, [isOpen]);

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (selectedPhoto) {
          setSelectedPhoto(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedPhoto, total, activeIndex]);

  // Auto-Orbit timer (pauses when a photo is popped up)
  useEffect(() => {
    if (!autoRotate || !isOpen || viewMode !== 'orbit' || isPopped) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, orbitSpeed);
    return () => clearInterval(interval);
  }, [autoRotate, isOpen, total, viewMode, isPopped, orbitSpeed]);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    setActiveIndex(nextIdx);
    if (selectedPhoto) {
      setSelectedPhoto(photos[nextIdx]);
    }
    playUnboxChime();
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    setActiveIndex(prevIdx);
    if (selectedPhoto) {
      setSelectedPhoto(photos[prevIdx]);
    }
    playUnboxChime();
  };

  // Mouse & Touch Drag Handlers
  const handleTouchStart = (e) => {
    if (isPopped) return;
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartXRef.current = clientX;
    dragDeltaXRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isPopped) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragDeltaXRef.current = clientX - dragStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging || isPopped) return;
    setIsDragging(false);
    if (dragDeltaXRef.current < -45) {
      handleNext();
    } else if (dragDeltaXRef.current > 45) {
      handlePrev();
    }
    dragDeltaXRef.current = 0;
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none animate-in fade-in duration-300"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Hologram Emitter & Grid Floor */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b ${activeTheme.beam} blur-3xl rounded-full opacity-70`}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-80 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(65deg)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* TOP HUD BAR */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-30 pt-1 sm:pt-3 pb-2 sm:pb-3 border-b border-white/10 flex-shrink-0 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-glow-white flex-shrink-0">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider sm:tracking-widest text-white truncate">
                <span className="sm:hidden">3D Memories</span>
                <span className="hidden sm:inline">3D Holographic Memory Projection</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 border border-white/30 text-[9px] sm:text-[10px] font-mono font-bold text-white flex-shrink-0">
                {activeIndex + 1}/{total}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:block truncate">
              {isPopped
                ? 'Photo popped up • Click outside or ✕ to close and return to orbit'
                : 'Click any photo to pop it up • Swipe or use arrows to navigate'}
            </span>
          </div>
        </div>

        {/* View Toggle & Close */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* View Mode Toggle: 3D Orbit vs 3D Wall */}
          <div className="flex items-center p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-black/60 border border-white/15">
            <button
              onClick={() => {
                setViewMode('orbit');
                if (selectedPhoto) setSelectedPhoto(null);
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 transition-all ${viewMode === 'orbit'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
                }`}
              title="3D Curved Orbit View"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Orbit</span>
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                if (selectedPhoto) setSelectedPhoto(null);
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 transition-all ${viewMode === 'grid'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
                }`}
              title="View all memories in 3D Wall"
            >
              <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Wall</span>
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 transition-all ${autoRotate
                ? 'bg-white/20 text-white'
                : 'text-zinc-400 hover:text-white'
                }`}
              title={autoRotate ? 'Pause Orbit' : 'Resume Auto-Orbit'}
            >
              {autoRotate ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span className="hidden md:inline">{autoRotate ? 'Orbiting' : 'Paused'}</span>
            </button>

            {/* Speed Toggle: Fast (1.4s) -> Turbo (0.9s) -> Normal (2.4s) */}
            <button
              onClick={() => {
                setOrbitSpeed((prev) => {
                  if (prev === 1400) return 900;
                  if (prev === 900) return 2400;
                  return 1400;
                });
              }}
              className="px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 transition-all border border-amber-400/20"
              title="Toggle Photo Movement Speed"
            >
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 animate-pulse" />
              <span>{orbitSpeed === 900 ? '0.9s' : orbitSpeed === 1400 ? '1.4s' : '2.4s'}</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 flex-shrink-0"
            title="Close Hologram View"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          VIEW 1: PROPORTIONAL 3D CURVED COVERFLOW ORBIT
         ======================================================== */}
      {viewMode === 'orbit' && (
        <div
          className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-auto"
          onClick={() => {
            if (isPopped) setSelectedPhoto(null);
          }}
        >
          {/* Previous Button (Left 3D Float) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-1 sm:left-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-white hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow-2xl active:scale-95"
            title="Previous Memory (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button (Right 3D Float) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-1 sm:right-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-white hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow-2xl active:scale-95"
            title="Next Memory (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3D SCENE STAGE */}
          <div
            className="relative w-full max-w-5xl h-[360px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {photos.map((photo, index) => {
              // Circular offset relative to activeIndex
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Render items within ±3 positions for clean 3D spacing
              const isVisible = Math.abs(offset) <= 3;
              if (!isVisible) return null;

              const isCenter = offset === 0;

              // When a photo is popped up, hide all remaining photos back!
              if (isPopped) {
                return (
                  <div
                    key={photo.id}
                    className="absolute pointer-events-none transition-all duration-300 ease-out"
                    style={{
                      transform: `translateX(${offset * 120}px) translateZ(-400px) rotateY(${offset * -45}deg) scale(0.5)`,
                      opacity: 0,
                      zIndex: 0,
                    }}
                  />
                );
              }

              // Standard 3D Orbit positioning
              let translateX = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;

              if (isCenter) {
                translateX = 0;
                translateZ = 40;
                rotateY = 0;
                scale = 1;
                opacity = 1;
              } else if (Math.abs(offset) === 1) {
                translateX = offset * (window.innerWidth < 480 ? 115 : window.innerWidth < 640 ? 150 : 260);
                translateZ = -90;
                rotateY = offset * -32;
                scale = 0.86;
                opacity = 0.85;
              } else if (Math.abs(offset) === 2) {
                translateX = offset * (window.innerWidth < 480 ? 190 : window.innerWidth < 640 ? 250 : 440);
                translateZ = -200;
                rotateY = offset * -46;
                scale = 0.72;
                opacity = 0.55;
              } else {
                translateX = offset * (window.innerWidth < 480 ? 250 : window.innerWidth < 640 ? 330 : 580);
                translateZ = -320;
                rotateY = offset * -58;
                scale = 0.6;
                opacity = 0.25;
              }

              const zIndex = 50 - Math.abs(offset) * 10;

              return (
                <div
                  key={photo.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(index);
                    setSelectedPhoto(photo);
                    playUnboxChime();
                  }}
                  className="absolute cursor-pointer transition-all duration-300 ease-out flex flex-col items-center"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  title="Click to pop up"
                >
                  {/* Holographic Frame Card: Explicit responsive bounds with no cutting */}
                  <div
                    className={`w-[220px] xs:w-[250px] sm:w-72 md:w-80 h-[320px] sm:h-[400px] md:h-[440px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-black/85 backdrop-blur-xl border ${isCenter ? activeTheme.border : 'border-white/20'
                      } transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${isCenter ? 'shadow-2xl shadow-glow-white ring-1 ring-white/40' : 'hover:border-white/50'
                      }`}
                    style={{
                      boxShadow: isCenter ? `0 0 50px ${activeTheme.glow}` : undefined,
                    }}
                  >
                    {/* Scanlines Overlay */}
                    <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-30" />

                    {/* Laser Corner Brackets on Center Card */}
                    {isCenter && (
                      <>
                        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-white" />
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-white" />
                        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-white" />
                        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-white" />
                      </>
                    )}

                    {/* Image Container with Ambient Backdrop + Uncut Centered Photo */}
                    <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden bg-black/90 border border-white/20 flex items-center justify-center p-1">
                      {/* Ambient matched glow behind */}
                      <img
                        src={photo.url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-125 pointer-events-none"
                      />

                      {/* Foreground full uncut photo */}
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-103 drop-shadow-md rounded-xl"
                        loading="lazy"
                      />

                      {/* Memory ID & Tag Badge */}
                      <div className="absolute top-2 inset-x-2 flex items-center justify-between text-[10px] font-mono font-bold text-white/90 z-20">
                        <span className="px-2 py-0.5 rounded-lg bg-black/80 border border-white/30 backdrop-blur-md">
                          MEM_{String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-lg bg-black/80 border ${activeTheme.border} ${activeTheme.text} backdrop-blur-md`}
                        >
                          {photo.tag || 'Memory'}
                        </span>
                      </div>

                      {/* Tap to inspect hover badge */}
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold flex items-center gap-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <ZoomIn className="w-3 h-3" />
                        <span>Click to Pop Up</span>
                      </div>
                    </div>

                    {/* Caption & Metadata Footer */}
                    <div className="pt-2 px-1 z-10 flex-shrink-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-200 transition-colors">
                        {photo.caption}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                        <span>{photo.date || 'Timeless'}</span>
                        <span>{photo.location || 'Special Memory'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ========================================================
                THE POPPED-UP CARD (STANDALONE SPOTLIGHT IN 3D SPACE)
               ======================================================== */}
            {isPopped && selectedPhoto && (
              <div
                className="relative z-50 w-full max-w-[94vw] sm:max-w-xl md:max-w-2xl h-[70vh] sm:h-[460px] md:h-[500px] max-h-[520px] flex flex-col justify-between p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/90 backdrop-blur-3xl border-2 border-white shadow-2xl shadow-glow-white animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: `0 0 70px ${activeTheme.glow}`,
                }}
              >
                {/* Scanlines Effect */}
                <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-30 rounded-2xl sm:rounded-3xl" />

                {/* Laser Corner Brackets */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-white z-20" />
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-white z-20" />
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-white z-20" />
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-white z-20" />

                {/* Top Bar inside Popped Up Card */}
                <div className="flex items-center justify-between z-20 pb-1.5 sm:pb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white text-black font-mono font-bold text-[10px] sm:text-xs shadow-md">
                      MEM_{String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/10 border border-white/30 text-white font-mono text-[10px] sm:text-xs">
                      #{selectedPhoto.tag || 'Memory'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-black border border-white/30 flex items-center justify-center transition-all shadow-lg active:scale-95"
                    title="Close Pop Up (Esc)"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Full Uncut Photo Container */}
                <div className="relative w-full flex-1 min-h-0 rounded-xl sm:rounded-2xl overflow-hidden bg-black/95 border border-white/20 flex items-center justify-center p-1 sm:p-2 my-1 sm:my-2">
                  {/* Ambient Glow */}
                  <img
                    src={selectedPhoto.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                  />

                  {/* High-Res Uncut Photo */}
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto drop-shadow-2xl rounded-lg sm:rounded-xl"
                  />
                </div>

                {/* Bottom Caption & Date */}
                <div className="pt-1.5 sm:pt-2 px-1 z-20 flex-shrink-0 flex items-center justify-between gap-2 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-base font-bold text-white leading-snug truncate">
                      {selectedPhoto.caption}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-0.5 truncate">
                      {selectedPhoto.date || 'Timeless'} • {selectedPhoto.location || 'Special Memory'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all flex-shrink-0"
                  >
                    Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 2: 3D HOLOGRAPHIC WALL (ALL 31 PHOTOS MATRIX)
         ======================================================== */}
      {viewMode === 'grid' && (
        <div className="w-full max-w-6xl mx-auto flex-1 overflow-y-auto pr-2 my-4 z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-2">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => {
                  setActiveIndex(index);
                  setSelectedPhoto(photo);
                  setViewMode('orbit');
                  playUnboxChime();
                }}
                className={`cursor-pointer rounded-2xl p-2 bg-black/80 border transition-all duration-300 hover:scale-105 relative group overflow-hidden ${index === activeIndex
                  ? 'border-white shadow-glow-white ring-2 ring-white/50'
                  : 'border-white/20 hover:border-white/60'
                  }`}
              >
                <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden bg-black/90 border border-white/10 flex items-center justify-center p-1">
                  <img
                    src={photo.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30 scale-125 pointer-events-none"
                  />
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500 rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 border border-white/20 text-[9px] font-mono text-white z-20">
                    #{index + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-mono font-bold z-20">
                    <span>Pop Up</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-white truncate mt-2 px-1">
                  {photo.caption}
                </p>
                <p className="text-[9px] font-mono text-slate-400 px-1">{photo.tag || 'Memory'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
