import React, { useState, useEffect } from 'react';
import {
  defaultCelebrant,
  defaultPhotos,
  defaultWishes,
  themes
} from './data/defaultData';
import Navbar from './components/Navbar';
import FloatingBalloons from './components/FloatingBalloons';
import MusicPlayerBar from './components/MusicPlayerBar';
import LockedCountdownVault from './components/LockedCountdownVault';

// 4 Dedicated Themed Chapters
import Page1Welcome from './pages/Page1Welcome';
import Page2GiftVault from './pages/Page2GiftVault';
import Page3Memories from './pages/Page3Memories';
import Page4GrandFinale from './pages/Page4GrandFinale';

// Universal Modals
import AIBirthdayGeneratorModal from './components/AIBirthdayGeneratorModal';
import ShareModal from './components/ShareModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import confetti from 'canvas-confetti';
import { playPartyFanfare, startBackgroundMusic, isAudioPlaying } from './utils/soundEffects';

export default function App() {
  // Unlocked Pages Progression (Starts with only Chapter 1; hides the rest one after one!)
  const [unlockedPages, setUnlockedPages] = useState(() => {
    const saved = localStorage.getItem('bday_unlocked_pages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((p) => p >= 1 && p <= 4);
          if (filtered.length > 0) return filtered;
        }
      } catch (e) {}
    }
    return [1]; // Start with only Chapter 1 unlocked!
  });

  // Current Page State (1 to 4)
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page'), 10);
    return p >= 1 && p <= 4 ? p : 1;
  });

  // Celebrant State
  const [celebrant, setCelebrant] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    const urlAge = params.get('age');
    const urlDate = params.get('date');
    const urlTheme = params.get('theme');

    // Force purge stale Sophia / demo cache on first load
    if (!localStorage.getItem('bday_migrated_lakshmi_v3')) {
      localStorage.removeItem('bday_celebrant');
      localStorage.removeItem('bday_photos');
      localStorage.removeItem('bday_wishes');
      localStorage.setItem('bday_migrated_lakshmi_v3', 'true');
      return defaultCelebrant;
    }

    const saved = localStorage.getItem('bday_celebrant');
    let base = saved ? JSON.parse(saved) : defaultCelebrant;
    if (base.avatarUrl && base.avatarUrl.includes('unsplash.com')) {
      base.avatarUrl = defaultCelebrant.avatarUrl;
    }
    if (!base.avatarPosition) {
      base.avatarPosition = defaultCelebrant.avatarPosition;
    }
    if (!base.name || base.name.includes('Sophia')) {
      base.name = defaultCelebrant.name;
      base.nickname = defaultCelebrant.nickname;
    }
    if (!base.age || base.age === 25 || !localStorage.getItem('bday_migrated_lakshmi_v4')) {
      base.age = 22;
      base.headline = defaultCelebrant.headline;
      localStorage.setItem('bday_migrated_lakshmi_v4', 'true');
      localStorage.setItem('bday_celebrant', JSON.stringify({ ...base, age: 22 }));
    }
    if (!localStorage.getItem('bday_migrated_nov25') || !base.birthDate || !base.birthDate.includes('11-25')) {
      base.birthDate = defaultCelebrant.birthDate;
      localStorage.setItem('bday_migrated_nov25', 'true');
      localStorage.setItem('bday_celebrant', JSON.stringify({ ...base, birthDate: defaultCelebrant.birthDate }));
    }

    if (urlName) base = { ...base, name: urlName };
    if (urlAge) base = { ...base, age: Number(urlAge) };
    if (urlDate) base = { ...base, birthDate: urlDate };
    if (urlTheme && themes[urlTheme]) base = { ...base, theme: urlTheme };

    return base;
  });

  // Photos & Wishes (Automatic migration from legacy unsplash demo images to photoes folder)
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('bday_photos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasLegacyDemo = Array.isArray(parsed) && parsed.some((p) => p.url && p.url.includes('unsplash.com'));
        if (!hasLegacyDemo && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return defaultPhotos;
  });

  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('bday_wishes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((w) => ({
            ...w,
            message: w.message
              ? w.message.replace(/Sophia/g, 'Lakshmi').replace(/25th/g, '22nd')
              : w.message
          }));
        }
      } catch (e) {}
    }
    return defaultWishes;
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Locked Vault State (Locked until Nov 25th 00:00:00 unless VIP Early Access is unlocked)
  const [isEarlyAccessUnlocked, setIsEarlyAccessUnlocked] = useState(() => {
    return localStorage.getItem('bday_early_access_unlocked') === 'true';
  });

  const isLocked = React.useMemo(() => {
    if (isEarlyAccessUnlocked) return false;
    const now = new Date();
    // If today is November 25th in local time (10 = November in JS 0-indexed month)
    if (now.getMonth() === 10 && now.getDate() === 25) return false;

    // Check target date
    const target = new Date(celebrant?.birthDate || '2026-11-25T00:00:00');
    if (!isNaN(target.getTime()) && now.getTime() >= target.getTime()) {
      return false;
    }
    return true;
  }, [isEarlyAccessUnlocked, celebrant?.birthDate]);

  const handleUnlockEarly = () => {
    setIsEarlyAccessUnlocked(true);
    localStorage.setItem('bday_early_access_unlocked', 'true');
  };

  const handleRelock = () => {
    setIsEarlyAccessUnlocked(false);
    localStorage.removeItem('bday_early_access_unlocked');
  };

  // Autoplay Celebration Music as soon as the site is opened
  useEffect(() => {
    let unmounted = false;

    const playMusic = () => {
      try {
        startBackgroundMusic(() => {
          if (!unmounted) setIsPlayingAudio(true);
        });
        if (!unmounted) setIsPlayingAudio(true);
      } catch (e) {
        console.warn('Autoplay waiting for user gesture:', e);
      }
    };

    // 1. Attempt immediate autoplay when site opens
    playMusic();

    // 2. Browser Autoplay Policy Fallback:
    // If the browser initially blocks unmuted audio before user interaction,
    // start playing immediately on the very first touch, click, or scroll!
    const unlockAudio = () => {
      playMusic();
      removeListeners();
    };

    const events = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio, { capture: true });
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { capture: true, once: true });
    });

    return () => {
      unmounted = true;
      removeListeners();
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bday_celebrant', JSON.stringify(celebrant));
  }, [celebrant]);

  useEffect(() => {
    localStorage.setItem('bday_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('bday_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const activeTheme = themes[celebrant.theme] || themes['monochrome-luxury'];

  // Navigate & Unlock the Next Chapter One After One
  const handleNavigate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > 4) return;

    const isNewUnlock = !unlockedPages.includes(pageNumber);
    setUnlockedPages((prev) => {
      const next = Array.from(new Set([...prev, pageNumber])).sort();
      localStorage.setItem('bday_unlocked_pages', JSON.stringify(next));
      return next;
    });

    if (isNewUnlock) {
      playPartyFanfare();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
      });
    }

    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockAll = () => {
    setUnlockedPages([1, 2, 3, 4]);
    localStorage.setItem('bday_unlocked_pages', JSON.stringify([1, 2, 3, 4]));
  };

  const handleResetProgress = () => {
    setUnlockedPages([1]);
    setCurrentPage(1);
    localStorage.setItem('bday_unlocked_pages', JSON.stringify([1]));
  };

  const handleAddWish = (newWish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleAddPhoto = (newPhoto) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('bday_celebrant');
    localStorage.removeItem('bday_photos');
    localStorage.removeItem('bday_wishes');
    localStorage.removeItem('bday_unlocked_pages');
    localStorage.removeItem('bday_early_access_unlocked');
    setIsEarlyAccessUnlocked(false);
    setCelebrant(defaultCelebrant);
    setPhotos(defaultPhotos);
    setWishes(defaultWishes);
    setUnlockedPages([1]);
    setCurrentPage(1);
  };

  // If the birthday vault is locked before November 25th midnight
  if (isLocked) {
    return (
      <LockedCountdownVault
        celebrant={celebrant}
        onUnlock={handleUnlockEarly}
        isPlayingAudio={isPlayingAudio}
        setIsPlayingAudio={setIsPlayingAudio}
      />
    );
  }

  return (
    <div className="bg-black text-white relative selection:bg-white selection:text-black font-sans antialiased min-h-screen">
      {/* Floating Interactive Balloons with rich, vivid celebration colors */}
      <FloatingBalloons />

      {/* Top Glass Navigation with Locked/Unlocked Status */}
      <Navbar
        celebrant={celebrant}
        currentPage={currentPage}
        onSelectPage={handleNavigate}
        unlockedPages={unlockedPages}
        isPlayingAudio={isPlayingAudio}
        setIsPlayingAudio={setIsPlayingAudio}
      />

      {/* DYNAMIC MULTI-PAGE VIEW (4 CHAPTERS) */}
      <main className={`relative z-10 ${
        currentPage === 1
          ? 'min-h-screen pt-20 pb-20 flex flex-col justify-start'
          : 'min-h-[70vh] pt-20'
      }`}>
        {currentPage === 1 && (
          <Page1Welcome
            celebrant={celebrant}
            theme={activeTheme}
            photos={photos}
            wishes={wishes}
            onAddWish={handleAddWish}
            onNavigate={handleNavigate}
            onUpdateCelebrant={setCelebrant}
            onOpenAIGenerator={() => setIsAIOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}

        {currentPage === 2 && (
          <Page2GiftVault
            celebrant={celebrant}
            theme={activeTheme}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 3 && (
          <Page3Memories
            celebrant={celebrant}
            wishes={wishes}
            onAddWish={handleAddWish}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 4 && (
          <Page4GrandFinale
            celebrant={celebrant}
            theme={activeTheme}
            onNavigate={handleNavigate}
            onOpenShare={() => setIsShareOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        )}
      </main>

      {/* Floating Audio Soundboard & Melody Synthesizer */}
      <MusicPlayerBar
        isPlayingAudio={isPlayingAudio}
        setIsPlayingAudio={setIsPlayingAudio}
      />

      {/* Global Modals */}
      <AIBirthdayGeneratorModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        celebrant={celebrant}
        onPostToWall={handleAddWish}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        celebrant={celebrant}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        celebrant={celebrant}
        onUpdateCelebrant={setCelebrant}
        photos={photos}
        onUpdatePhotos={setPhotos}
        wishes={wishes}
        onUpdateWishes={setWishes}
        onResetDefaults={handleResetDefaults}
      />

      {/* Floating Early Access / Relock Controller */}
      {isEarlyAccessUnlocked && (
        <aside
          aria-label="Preview Controller"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-white/20 text-xs font-mono text-zinc-300 shadow-2xl backdrop-blur-md"
        >
          <span>🔓 VIP Preview Mode</span>
          <span className="text-zinc-600">•</span>
          <button
            onClick={handleRelock}
            className="text-white hover:text-rose-400 font-bold underline transition-colors"
            title="Lock the site with the countdown again"
          >
            Lock with Countdown 🔒
          </button>
        </aside>
      )}
    </div>
  );
}
