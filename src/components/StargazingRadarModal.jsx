import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { STARGAZING_DATA } from '../data/resortData';
import { 
  Moon, 
  Sparkles, 
  Compass, 
  X, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award,
  CloudFog,
  Telescope
} from 'lucide-react';

const StargazingRadarModal = () => {
  const { 
    isStargazingModalOpen, 
    setIsStargazingModalOpen, 
    lang, 
    showToast,
    playConciergeBellSound 
  } = useResort();

  const [isBooked, setIsBooked] = useState(false);

  if (!isStargazingModalOpen) return null;

  const handleBookTelescope = () => {
    playConciergeBellSound();
    setIsBooked(true);
    showToast(
      lang === 'ta'
        ? "தொலைநோக்கி பார்வை நேரம் உறுதிசெய்யப்பட்டது! இரவு 8:00 மணிக்கு வழிகாட்டி காத்திருப்பார்."
        : "Celestron 8SE Telescope slot confirmed for tonight at 8:00 PM!"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-indigo-500/40 p-6 sm:p-8 shadow-2xl relative bg-gradient-to-b from-[#080d1a] via-[#091122] to-[#050914] overflow-hidden">
        
        {/* Background Twinkling Stars Simulation */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="w-1 h-1 bg-white rounded-full absolute top-12 left-16 animate-ping" />
          <div className="w-1.5 h-1.5 bg-amber-200 rounded-full absolute top-28 right-20 animate-pulse" />
          <div className="w-1 h-1 bg-cyan-200 rounded-full absolute bottom-24 left-1/3 animate-ping" />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsStargazingModalOpen(false)}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300" />
            <span>{lang === 'ta' ? 'நீலகிரி வானியல் வான்நோக்கி ரேடார்' : 'Nilgiri Night Sky & Astronomy Radar'}</span>
          </div>

          <h3 className="text-2xl font-bold font-serif-luxury text-white">
            {lang === 'ta' ? '7,400 அடி உயர விண்மீன் பார்வை' : 'Celestron Observatory Telemetry'}
          </h3>
          <p className="text-xs text-stone-300">
            {lang === 'ta'
              ? 'மாசற்ற நீலகிரி மலையுச்சியில் நிலவு, விண்மீன் கூட்டங்கள் மற்றும் பால்வீதி மண்டல பார்வை.'
              : 'Zero light-pollution dark mountain skies above the clouds, rated Bortle Class 2.'}
          </p>
        </div>

        {/* Telemetry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 relative z-10 text-xs">
          
          {/* Moon Phase & Illumination */}
          <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/70 border border-indigo-400/40 flex items-center justify-center text-amber-200 shrink-0 shadow-lg">
              <Moon className="w-6 h-6 fill-amber-200/80" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                {lang === 'ta' ? 'நிலவு நிலை' : 'Moon Phase Tonight'}
              </span>
              <div className="font-bold text-white text-sm">
                {lang === 'ta' ? STARGAZING_DATA.moonPhaseTa : STARGAZING_DATA.moonPhase}
              </div>
              <div className="text-[11px] text-amber-300 font-mono">
                {STARGAZING_DATA.illumination} Illumination
              </div>
            </div>
          </div>

          {/* Cloud Inversion Probability */}
          <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/70 border border-indigo-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-lg">
              <CloudFog className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                {lang === 'ta' ? 'மேகக் கடல் சாத்தியம்' : 'Cloud Inversion Radar'}
              </span>
              <div className="font-bold text-white text-sm">
                88% High Probability
              </div>
              <div className="text-[11px] text-cyan-300 font-mono">
                Expected at 6:15 AM
              </div>
            </div>
          </div>

        </div>

        {/* Visible Constellations Tonight */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 my-4 space-y-2 relative z-10 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white font-serif-luxury flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {lang === 'ta' ? 'இன்றிரவு தென்படும் விண்மீன் கூட்டங்கள்:' : 'Constellations Visible Tonight:'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Bortle Class 2
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {STARGAZING_DATA.visibleConstellations.map((c, i) => (
              <span 
                key={i}
                className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-stone-200 text-[11px] font-medium"
              >
                ✨ {c}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-stone-400 pt-1">
            🔭 {STARGAZING_DATA.telescopeEquipment}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 relative z-10">
          {!isBooked ? (
            <button
              onClick={handleBookTelescope}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-indigo-950/80 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'ta' ? 'இன்றிரவு தொலைநோக்கி பார்வை முன்பதிவு செய்க' : 'Reserve Ridge Telescope Viewing (Tonight 8:00 PM)'}</span>
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ta' ? 'முன்பதிவு உறுதியானது! உங்கள் பட்டலர் தகவல் அளிப்பார்.' : 'Slot Reserved! Naturalist Anand will escort you to the ridge.'}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StargazingRadarModal;