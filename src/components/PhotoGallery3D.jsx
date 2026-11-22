import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Heart, ZoomIn, X, ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';

export default function PhotoGallery3D({ photos, onAddPhoto }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: '',
    date: 'Recent',
    location: '',
    tag: 'Smiles'
  });

  const tags = ['All', ...new Set(photos.map((p) => p.tag).filter(Boolean))];

  const filteredPhotos = selectedTag === 'All'
    ? photos
    : photos.filter((p) => p.tag === selectedTag);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleSaveNewPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.url || !newPhoto.caption) return;
    const photoToAdd = {
      id: `p_${Date.now()}`,
      url: newPhoto.url,
      caption: newPhoto.caption,
      date: newPhoto.date || 'Today',
      location: newPhoto.location || 'Special Memory',
      tag: newPhoto.tag || 'Smiles'
    };
    if (onAddPhoto) onAddPhoto(photoToAdd);
    setNewPhoto({ url: '', caption: '', date: 'Recent', location: '', tag: 'Smiles' });
    setShowAddModal(false);
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Glow orb */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wide uppercase mb-3">
            <Camera className="w-4 h-4 text-purple-400" />
            <span>3D Memory Lane</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Golden <span className="animate-text-shimmer">Memories & Moments</span> 📸
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-base">
            Every snapshot tells a story of spontaneous adventures, uncontrollable laughs, and beautiful milestones.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory Photo</span>
          </button>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 border border-pink-400'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tag === 'All' ? '🌟 All Memories' : `#${tag}`}
          </button>
        ))}
      </div>

      {/* 3D Polaroid & Tilt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => {
          const photoLikes = (likes[photo.id] || 0) + 12;
          return (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group perspective-1000 cursor-pointer"
            >
              <div
                className="glass-card rounded-3xl overflow-hidden p-4 border border-white/10 hover:border-pink-500/50 shadow-3d-card transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-4">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Tag & Zoom icon */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-pink-300 border border-pink-500/30">
                      {photo.tag}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Heart like pill */}
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 border border-white/10 hover:border-pink-500 hover:text-pink-400 transition-all active:scale-90"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                    <span>{photoLikes}</span>
                  </button>
                </div>

                {/* Caption & Metadata */}
                <div className="px-1 space-y-2">
                  <p className="text-base font-semibold text-slate-100 group-hover:text-pink-200 transition-colors line-clamp-2">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-pink-400" />
                      <span>{photo.date}</span>
                    </div>
                    {photo.location && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-white/20 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevLightbox();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-white/20 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextLightbox();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-white/20 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].url}
              alt={filteredPhotos[lightboxIndex].caption}
              className="max-h-[65vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
            />
            <div className="mt-4 text-center space-y-1 px-4">
              <p className="text-lg font-bold text-white">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              <p className="text-sm text-pink-300 font-semibold">
                {filteredPhotos[lightboxIndex].date} • {filteredPhotos[lightboxIndex].location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ADD PHOTO MODAL */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-slate-900 border border-pink-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-pink-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span>Add New Memory</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Photo URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newPhoto.url}
                  onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Caption / Memory *
                </label>
                <input
                  type="text"
                  required
                  placeholder="The spontaneous roadtrip adventure..."
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer 2026"
                    value={newPhoto.date}
                    onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newPhoto.tag}
                    onChange={(e) => setNewPhoto({ ...newPhoto, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  >
                    <option value="Smiles">Smiles</option>
                    <option value="Adventures">Adventures</option>
                    <option value="Golden Hour">Golden Hour</option>
                    <option value="Milestones">Milestones</option>
                    <option value="Festival">Festival</option>
                    <option value="Roadtrip">Roadtrip</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paris / Rooftop Lounge"
                  value={newPhoto.location}
                  onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30"
                >
                  Add Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

