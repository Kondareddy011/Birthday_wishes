import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, Twitter, Mail, QrCode, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ShareModal({ isOpen, onClose, celebrant }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  // Construct URL with URLSearchParams
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  if (celebrant.name) params.set('name', celebrant.name);
  if (celebrant.age) params.set('age', celebrant.age.toString());
  if (celebrant.birthDate) params.set('date', celebrant.birthDate);
  if (celebrant.theme) params.set('theme', celebrant.theme);

  const shareableUrl = `${baseUrl}?${params.toString()}`;
  const shareMessage = `🎂 Join me in celebrating ${celebrant.name}'s ${celebrant.age}th Birthday! Check out the 3D greeting, photo memories, and leave a wish: ${shareableUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(`🎂 Happy Birthday ${celebrant.name}!`)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`🎂 Happy Birthday Celebration for ${celebrant.name}!`);
    const body = encodeURIComponent(shareMessage);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel-bw rounded-3xl border border-white/20 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative bg-black/95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-serif-festive text-white">Share Birthday Celebration</h3>
              <p className="text-xs font-mono text-slate-400">Invite friends & family to view memories and send wishes!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Custom Birthday Web Link
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black border border-white/20">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="w-full bg-transparent px-3 text-xs font-mono text-slate-300 select-all focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-2 mb-6">
          <span className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
            One-Click Instant Share
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/15 hover:border-white text-slate-300 hover:text-white transition-all group"
            >
              <MessageCircle className="w-5 h-5 mb-1 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">WhatsApp</span>
            </button>

            <button
              onClick={handleTelegram}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/15 hover:border-white text-slate-300 hover:text-white transition-all group"
            >
              <Send className="w-5 h-5 mb-1 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">Telegram</span>
            </button>

            <button
              onClick={handleTwitter}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/15 hover:border-white text-slate-300 hover:text-white transition-all group"
            >
              <Twitter className="w-5 h-5 mb-1 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">Twitter</span>
            </button>

            <button
              onClick={handleEmail}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/15 hover:border-white text-slate-300 hover:text-white transition-all group"
            >
              <Mail className="w-5 h-5 mb-1 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold">Email</span>
            </button>
          </div>
        </div>

        {/* QR Code Toggle for Birthday Card Print */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-white" />
              <span>Printable Party QR Code</span>
            </span>
            <button
              onClick={() => setShowQR(!showQR)}
              className="text-xs font-mono font-bold text-white hover:text-slate-300 underline"
            >
              {showQR ? 'Hide QR' : 'Show QR Code'}
            </button>
          </div>

          {showQR && (
            <div className="p-4 rounded-2xl bg-white text-black flex flex-col items-center text-center animate-in zoom-in duration-200">
              <div className="w-36 h-36 bg-slate-100 p-2 rounded-xl border border-black/20 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareableUrl)}`}
                  alt="Birthday QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-2 text-xs font-mono font-bold text-black">
                Scan with phone camera to open {celebrant.name}'s page!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
