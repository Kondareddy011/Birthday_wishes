// Web Audio API Synthesis Engine for Birthday Celebration Effects and Background Music

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Balloon Pop Sound
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    console.warn("Audio pop error:", e);
  }
}

// 2. Unbox / Magical Shimmer Sound
export function playUnboxChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.25, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.85);
    });
  } catch (e) {
    console.warn("Audio chime error:", e);
  }
}

// 3. Blow Candle Whoosh Sound
export function playBlowCandleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);
  } catch (e) {
    console.warn("Audio blow error:", e);
  }
}

// 4. Cake Knife Slice Sound (Crisp slice + sweet chime)
export function playCakeSliceSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fast noise sweep for knife cutting through cake
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.22);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.25);

    // Resonant silver chime notes (G5 -> C6)
    [783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.08 + idx * 0.08);

      oscGain.gain.setValueAtTime(0.01, now + 0.08 + idx * 0.08);
      oscGain.gain.linearRampToValueAtTime(0.2, now + 0.1 + idx * 0.08);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now + 0.08 + idx * 0.08);
      osc.stop(now + 0.55 + idx * 0.08);
    });
  } catch (e) {
    console.warn("Cake slice audio error:", e);
  }
}

// 5. Hologram Projector Activation Sound (Sci-Fi Beam & Frequency Sweep)
export function playHologramActivateSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Frequency sweep upward
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.45);
    osc.frequency.setValueAtTime(880, now + 0.46);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.75);

    // Pulse harmonics
    [587.33, 880, 1174.66, 1760].forEach((freq, i) => {
      const pOsc = ctx.createOscillator();
      const pGain = ctx.createGain();
      pOsc.type = 'triangle';
      pOsc.frequency.setValueAtTime(freq, now + 0.35 + i * 0.06);

      pGain.gain.setValueAtTime(0.01, now + 0.35 + i * 0.06);
      pGain.gain.linearRampToValueAtTime(0.15, now + 0.37 + i * 0.06);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      pOsc.connect(pGain);
      pGain.connect(ctx.destination);

      pOsc.start(now + 0.35 + i * 0.06);
      pOsc.stop(now + 0.95);
    });
  } catch (e) {
    console.warn("Hologram activate sound error:", e);
  }
}

// 6. Celebratory Fanfare Horn / Cheers
export function playPartyFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const fanfareNotes = [
      { f: 261.63, start: 0, dur: 0.15 },
      { f: 329.63, start: 0.15, dur: 0.15 },
      { f: 392.00, start: 0.3, dur: 0.2 },
      { f: 523.25, start: 0.5, dur: 0.6 }
    ];

    fanfareNotes.forEach(({ f, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + start);

      gain.gain.setValueAtTime(0.01, now + start);
      gain.gain.linearRampToValueAtTime(0.35, now + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + dur + 0.05);
    });
  } catch (e) {
    console.warn("Fanfare error:", e);
  }
}

// 7. Magic Wand Sound
export function playMagicWandSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const freqs = [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.01, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.45);
    });
  } catch (e) {
    console.warn("Magic wand sound error:", e);
  }
}

// 8. Champagne Cork Pop + Fizz
export function playCorkPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    const bufferSize = ctx.sampleRate * 0.7;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now + 0.05);
    noise.stop(now + 0.75);
  } catch (e) {
    console.warn("Cork pop error:", e);
  }
}

// 9. Mystic Crystal Ball Chime
export function playMysticChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const chord = [440, 554.37, 659.25, 830.61];
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  } catch (e) {
    console.warn("Mystic chime error:", e);
  }
}

// Synthesized Happy Birthday Melody Player
let bgLoopId = null;
let isMelodyPlaying = false;

const happyBirthdayNotes = [
  { note: 261.63, dur: 0.35 },
  { note: 261.63, dur: 0.2 },
  { note: 293.66, dur: 0.5 },
  { note: 261.63, dur: 0.5 },
  { note: 349.23, dur: 0.5 },
  { note: 329.63, dur: 0.9 },

  { note: 261.63, dur: 0.35 },
  { note: 261.63, dur: 0.2 },
  { note: 293.66, dur: 0.5 },
  { note: 261.63, dur: 0.5 },
  { note: 392.00, dur: 0.5 },
  { note: 349.23, dur: 0.9 },

  { note: 261.63, dur: 0.35 },
  { note: 261.63, dur: 0.2 },
  { note: 523.25, dur: 0.5 },
  { note: 440.00, dur: 0.5 },
  { note: 349.23, dur: 0.45 },
  { note: 329.63, dur: 0.45 },
  { note: 293.66, dur: 0.8 },

  { note: 466.16, dur: 0.35 },
  { note: 466.16, dur: 0.2 },
  { note: 440.00, dur: 0.5 },
  { note: 349.23, dur: 0.5 },
  { note: 392.00, dur: 0.5 },
  { note: 349.23, dur: 1.2 }
];

export function toggleBackgroundMusic(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isMelodyPlaying) {
    stopBackgroundMusic();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startBackgroundMusic(onStateChange);
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startBackgroundMusic(onComplete) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const play = () => {
    stopBackgroundMusic();
    isMelodyPlaying = true;
    let currentNoteIdx = 0;

    function scheduleNextNote() {
      if (!isMelodyPlaying) return;
      const item = happyBirthdayNotes[currentNoteIdx];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(item.note * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 0.95);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + item.dur);
      oscHarmonic.stop(now + item.dur);

      currentNoteIdx = (currentNoteIdx + 1) % happyBirthdayNotes.length;

      const interval = (item.dur * 0.95 + 0.05) * 1000;
      bgLoopId = setTimeout(scheduleNextNote, interval);
    }

    scheduleNextNote();
    if (onComplete) onComplete(true);
  };

  if (ctx.state === 'suspended') {
    ctx.resume().then(play).catch(play);
  } else {
    play();
  }
}

export function stopBackgroundMusic() {
  isMelodyPlaying = false;
  if (bgLoopId) {
    clearTimeout(bgLoopId);
    bgLoopId = null;
  }
}

export function isAudioPlaying() {
  return isMelodyPlaying;
}
