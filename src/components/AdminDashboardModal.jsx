import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  User,
  Palette,
  Gift,
  Camera,
  MessageSquare,
  Download,
  Upload,
  RotateCcw,
  Check,
  X,
  Trash2,
  Pin,
  Sparkles
} from 'lucide-react';
import { themes } from '../data/defaultData';
import confetti from 'canvas-confetti';

export default function AdminDashboardModal({
  isOpen,
  onClose,
  celebrant,
  onUpdateCelebrant,
  photos,
  onUpdatePhotos,
  wishes,
  onUpdateWishes,
  onResetDefaults,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable local state copy
  const [formCelebrant, setFormCelebrant] = useState({ ...celebrant });

  React.useEffect(() => {
    setFormCelebrant({ ...celebrant });
  }, [celebrant]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === (celebrant.adminPin || '1234')) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. (Default PIN: 1234)');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateCelebrant(formCelebrant);
    setSaveSuccess(true);
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
    });
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeletePhoto = (id) => {
    const updated = photos.filter((p) => p.id !== id);
    onUpdatePhotos(updated);
  };

  const handleDeleteWish = (id) => {
    const updated = wishes.filter((w) => w.id !== id);
    onUpdateWishes(updated);
  };

  const handleTogglePinWish = (id) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, pinned: !w.pinned } : w
    );
    onUpdateWishes(updated);
  };

  const handleExportData = () => {
    const payload = {
      celebrant,
      photos,
      wishes,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${celebrant.name}_birthday_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.celebrant) onUpdateCelebrant(parsed.celebrant);
        if (parsed.photos) onUpdatePhotos(parsed.photos);
        if (parsed.wishes) onUpdateWishes(parsed.wishes);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="glass-panel-bw rounded-3xl border border-white/20 p-6 sm:p-8 max-w-3xl w-full shadow-2xl my-8 relative max-h-[90vh] flex flex-col bg-black/95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white font-bold" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-serif-festive text-white">Party Host Admin Dashboard</h3>
              <p className="text-xs font-mono text-slate-400">Configure celebrant details, themes, gifts, and memories.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PIN AUTH SCREEN */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-black border border-white/30 flex items-center justify-center text-white mb-4 shadow-xl">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold font-serif-festive text-white mb-2">Host Passcode Required</h4>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Enter your Admin PIN to manage celebrant data. (Default PIN: <strong className="text-white">1234</strong>)
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                maxLength={8}
                placeholder="Enter PIN (1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-xl tracking-widest px-4 py-3 rounded-2xl bg-black border border-white/20 text-white font-mono focus:border-white focus:outline-none"
                autoFocus
              />

              {pinError && <p className="text-xs text-rose-400 font-mono font-semibold">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-white text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow-white"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED TABS SCREEN */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-white/10 shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Celebrant Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('gift')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'gift'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Surprise Gift</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'photos'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos ({photos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('wishes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'wishes'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Wishes ({wishes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'bg-white text-black shadow-glow-white'
                    : 'bg-black border border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup & Reset</span>
              </button>
            </div>

            {/* Scrollable Tab Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                        Celebrant Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formCelebrant.name}
                        onChange={(e) => setFormCelebrant({ ...formCelebrant, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                        Nickname / Title
                      </label>
                      <input
                        type="text"
                        value={formCelebrant.nickname}
                        onChange={(e) => setFormCelebrant({ ...formCelebrant, nickname: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                        Turning Age
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={130}
                        value={formCelebrant.age}
                        onChange={(e) => setFormCelebrant({ ...formCelebrant, age: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                        Birth Date (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        value={formCelebrant.birthDate}
                        onChange={(e) => setFormCelebrant({ ...formCelebrant, birthDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                      Tagline / Motto
                    </label>
                    <input
                      type="text"
                      value={formCelebrant.tagline}
                      onChange={(e) => setFormCelebrant({ ...formCelebrant, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                      Profile Bio
                    </label>
                    <textarea
                      rows={3}
                      value={formCelebrant.bio}
                      onChange={(e) => setFormCelebrant({ ...formCelebrant, bio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:bg-slate-200 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{saveSuccess ? 'Changes Saved!' : 'Save Celebrant Profile'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: SURPRISE GIFT */}
              {activeTab === 'gift' && (
                <div className="space-y-4">
                  <p className="text-xs font-mono text-slate-400">
                    Customize the unboxing experience in Chapter 2.
                  </p>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                      Gift Box Title
                    </label>
                    <input
                      type="text"
                      value={formCelebrant.giftConfig?.boxTitle || ''}
                      onChange={(e) =>
                        setFormCelebrant({
                          ...formCelebrant,
                          giftConfig: { ...formCelebrant.giftConfig, boxTitle: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                      Revealed Surprise Message
                    </label>
                    <textarea
                      rows={3}
                      value={formCelebrant.giftConfig?.surpriseText || ''}
                      onChange={(e) =>
                        setFormCelebrant({
                          ...formCelebrant,
                          giftConfig: { ...formCelebrant.giftConfig, surpriseText: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-mono font-black text-xs uppercase tracking-wider"
                  >
                    Save Gift Config
                  </button>
                </div>
              )}

              {/* TAB 3: PHOTOS */}
              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Manage holographic and memory photos ({photos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photos.map((p) => (
                      <div key={p.id} className="relative rounded-xl overflow-hidden border border-white/20 group">
                        <img src={p.url} alt={p.caption} className="w-full h-28 object-cover grayscale" />
                        <div className="p-2 bg-black/90">
                          <p className="text-[10px] font-mono font-bold truncate text-white">{p.caption}</p>
                          <span className="text-[9px] font-mono text-slate-400">{p.year}</span>
                        </div>
                        <button
                          onClick={() => handleDeletePhoto(p.id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 text-rose-400 border border-rose-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WISHES */}
              {activeTab === 'wishes' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Moderate wall wishes ({wishes.length})
                  </div>
                  {wishes.map((w) => (
                    <div key={w.id} className="p-3 rounded-xl bg-black border border-white/20 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{w.avatar || '🤍'}</span>
                          <span className="text-xs font-mono font-bold text-white">{w.author}</span>
                          <span className="text-[10px] font-mono text-slate-400">({w.relationship})</span>
                          {w.pinned && <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-black">PINNED</span>}
                        </div>
                        <p className="text-xs text-slate-300">"{w.message}"</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleTogglePinWish(w.id)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                          title="Pin/Unpin"
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteWish(w.id)}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400"
                          title="Delete Wish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: BACKUP & RESET */}
              {activeTab === 'backup' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black border border-white/20 space-y-3">
                    <h5 className="text-xs font-mono font-bold text-white uppercase">Export / Import Birthday Data</h5>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleExportData}
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Backup JSON</span>
                      </button>

                      <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import Backup JSON</span>
                        <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black border border-rose-500/40 space-y-3">
                    <h5 className="text-xs font-mono font-bold text-rose-400 uppercase">Factory Reset</h5>
                    <p className="text-xs font-mono text-slate-400">
                      Wipe all custom celebrant edits, newly added photos, and guest wishes, restoring default values.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all party data to default?')) {
                          onResetDefaults();
                          onClose();
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Original Defaults</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
