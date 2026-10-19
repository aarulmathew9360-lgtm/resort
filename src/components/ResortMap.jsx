import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_HOTSPOTS } from '../data/resortData';
import { Compass, MapPin, Sparkles, Navigation, Layers, Volume2 } from 'lucide-react';

const ResortMap = () => {
  const { lang, t } = useResort();
  const [activeSpot, setActiveSpot] = useState(RESORT_HOTSPOTS[0]);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  return (
    <section id="estate-map" className="py-24 relative z-20 bg-[#09140f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? '45 ஏக்கர் எஸ்டேட் வரைபடம்' : '45-Acre Sanctuary Navigator'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
              {lang === 'ta' ? 'ஊட்டி மலை எஸ்டேட் பார்வை' : 'Interactive Estate Explorer'}
            </h2>
            <p className="text-stone-300 text-sm mt-2 max-w-xl">
              {lang === 'ta'
                ? 'எங்கள் 45 ஏக்கர் தேயிலைத் தோட்டத்தில் அமைந்துள்ள முக்கிய இடங்களை கிளிக் செய்து ஆராயுங்கள்.'
                : 'Click on the estate beacons below to preview private viewpoints, heated pools, and hidden tea trails.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSoundPlaying(!isSoundPlaying)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border flex items-center gap-2 transition-all ${
                isSoundPlaying
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSoundPlaying ? 'animate-pulse' : ''}`} />
              <span>{isSoundPlaying ? 'Pine Wind & Birds: Active' : 'Sound: Forest Ambience'}</span>
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Map Visual */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-[#081510] aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
              alt="Aerial View of Resort Estate"
              className="w-full h-full object-cover opacity-60 filter contrast-125"
            />
            {/* Mountain Grid Map Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09140f] via-transparent to-black/40 pointer-events-none" />
            
            {/* SVG Topographical Contour Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30%" cy="40%" r="180" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="65%" cy="30%" r="220" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="4 6" />
              <path d="M 50 150 Q 200 80 500 220 T 900 350" fill="none" stroke="#10b981" strokeWidth="1.5" />
              <path d="M 80 300 Q 250 200 600 380 T 1100 450" fill="none" stroke="#10b981" strokeWidth="1" />
            </svg>

            {/* Hotspot Markers */}
            {RESORT_HOTSPOTS.map((spot) => {
              const isSelected = activeSpot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpot(spot)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Radar Pulse */}
                    <span className={`absolute w-9 h-9 rounded-full ${isSelected ? 'bg-amber-400/40 animate-ping' : 'bg-emerald-400/30'}`} />
                    {/* Outer Circle */}
                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-lg transition-colors ${
                      isSelected 
                        ? 'bg-amber-400 border-white text-stone-900 shadow-amber-400/50' 
                        : 'bg-emerald-700/90 border-emerald-300 text-white shadow-emerald-950/80 hover:bg-emerald-600'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Pin Tooltip */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shadow-xl transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-stone-900 opacity-100 scale-100'
                      : 'bg-black/80 text-white opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 pointer-events-none'
                  }`}>
                    {lang === 'ta' ? spot.nameTa : spot.name}
                  </div>
                </button>
              );
            })}

            {/* Map Legend on bottom right */}
            <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 rounded-xl text-[11px] text-stone-300 border border-white/10 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Navigation className="w-3.5 h-3.5" /> Compass: N-NE
              </span>
              <span className="text-stone-400">|</span>
              <span>Elevation: 7,400 ft</span>
            </div>
          </div>

          {/* Active Hotspot Detail Card */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                {activeSpot.type}
              </span>
              <span className="text-amber-300 text-xs font-mono font-semibold">
                {activeSpot.temp}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif-luxury text-white">
                {lang === 'ta' ? activeSpot.nameTa : activeSpot.name}
              </h3>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                {activeSpot.description}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Access:</span>
                <span className="text-white font-medium">Golf Buggy or Walking Trail</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Timings:</span>
                <span className="text-emerald-300 font-medium">Sunrise to Starlight</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Special Service:</span>
                <span className="text-amber-300 font-medium">Butler Service on Call</span>
              </div>
            </div>

            {/* Hotspots Picker Pills */}
            <div>
              <div className="text-[11px] uppercase font-bold text-stone-400 mb-2 tracking-wider">
                {lang === 'ta' ? 'அனைத்து இடங்கள்' : 'Estate Beacons'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {RESORT_HOTSPOTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSpot(s)}
                    className={`text-left text-xs p-2.5 rounded-xl border transition-all truncate ${
                      activeSpot.id === s.id
                        ? 'bg-emerald-600/20 border-emerald-400 text-white font-medium'
                        : 'bg-white/5 border-white/5 text-stone-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang === 'ta' ? s.nameTa : s.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ResortMap;
