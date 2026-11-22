import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart, ArrowDown, PartyPopper, Wand2 } from 'lucide-react';
import { playPartyFanfare } from '../utils/soundEffects';

export default function Hero3D({ celebrant, theme, onOpenAIGenerator, onOpenShare }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up Three.js 3D Celebratory Particle Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometries (floating stars & confetti dust)
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const palette = [
      new THREE.Color(theme.primaryColor || '#EC4899'),
      new THREE.Color(theme.secondaryColor || '#8B5CF6'),
      new THREE.Color(theme.tertiaryColor || '#FACC15'),
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#06B6D4'),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle sprite material
    const material = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.04 + mouseX * 0.1;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1 + mouseY * 0.1;

      // Gentle wave animation for positions
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        pos[yIndex] += Math.sin(elapsedTime * 1.5 + i) * 0.015;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [theme]);

  const handleConfettiRain = () => {
    playPartyFanfare();
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#EC4899', '#8B5CF6', '#FACC15', '#06B6D4', '#10B981'],
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Three.js Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-cyan-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Milestone Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-8 shadow-glow-pink animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>The Official Milestone Celebration</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
        </div>

        {/* Celebrant 3D Portrait Frame */}
        <div className="relative mb-8 perspective-1000 group">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-500 via-amber-400 to-purple-600 blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />

          {/* Portrait Container with 3D Border */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-300 via-pink-500 to-purple-600 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <img
              src={celebrant.avatarUrl}
              alt={celebrant.name}
              className="w-full h-full rounded-full object-cover border-2 border-slate-900"
            />

            {/* Age Badge */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl border-2 border-slate-900 flex items-center gap-1 animate-bounce-subtle">
              <span>👑</span>
              <span>{celebrant.age}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-tight">
          Happy Birthday, <br />
          <span className="animate-text-shimmer drop-shadow-lg">
            {celebrant.name}!
          </span>{' '}
          🎂
        </h1>

        {/* Headline & Bio */}
        <p className="text-xl sm:text-2xl font-script text-amber-300 mb-3 text-glow-gold">
          "{celebrant.tagline || 'The world became 1000x brighter the day you arrived.'}"
        </p>

        <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed mb-10 font-normal">
          {celebrant.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('surprise-gift')}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Gift className="w-5 h-5" />
            <span>Open Surprise Gift</span>
          </button>

          <button
            onClick={() => scrollToSection('wishes')}
            className="px-6 py-3.5 rounded-full glass-panel border border-white/20 hover:border-pink-500 text-white font-bold text-sm sm:text-base shadow-lg hover:bg-slate-900/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-pink-400" />
            <span>Write a Wish</span>
          </button>

          <button
            onClick={onOpenAIGenerator}
            className="px-6 py-3.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-purple-300" />
            <span>AI Wish Studio</span>
          </button>

          <button
            onClick={handleConfettiRain}
            className="px-4 py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-bold text-sm transition-all flex items-center gap-2"
            title="Make it Rain Confetti"
          >
            <PartyPopper className="w-5 h-5 text-amber-300" />
          </button>
        </div>

        {/* Down Indicator */}
        <button
          onClick={() => scrollToSection('surprise-gift')}
          className="mt-14 text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 animate-bounce"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase">Explore Celebration</span>
          <ArrowDown className="w-4 h-4 text-pink-400" />
        </button>
      </div>
    </section>
  );
}

