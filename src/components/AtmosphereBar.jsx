import React from 'react';
import { useResort } from '../context/ResortContext';
import { ATMOSPHERE_PRESETS } from '../data/resortData';
import { Sunrise, Sun, Sunset, Moon, Sparkles, Wind, Eye } from 'lucide-react';

const AtmosphereBar = () => {
  const { lang, atmosphere, changeAtmosphere, playConciergeBellSound } = useResort();

  const modes = [
    { id: 'dawn', label: lang === 'ta' ? 'விடியல் 6:00 AM' : 'Dawn 6:00 AM', icon: Sunrise, color: 'text-pink-300' },
    { id: 'day', label: lang === 'ta' ? 'பகல் 12:00 PM' : 'Mountain Sun 12 PM', icon: Sun, color: 'text-amber-300' },
    { id: 'sunset', label: lang === 'ta' ? 'மாலை 5:30 PM' : 'Sunset 5:30 PM', icon: Sunset, color: 'text-orange-300' },
    { id: 'night', label: lang === 'ta' ? 'இரவு 9:00 PM' : 'Starlit Night 9 PM', icon: Moon, color: 'text-indigo-300' }
  ];

  const currentPreset = ATMOSPHERE_PRESETS[atmosphere] || ATMOSPHERE_PRESETS.day;

  const handleModeChange = (id) => {
    playConciergeBellSound();
    changeAtmosphere(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2 relative z-30">
      <div className="glass-panel p-2 sm:p-2.5 rounded-2xl border border-white/10 shadow-2xl bg-black/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Atmosphere Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto justify-between sm:justify-start">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider hidden lg:inline-flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {lang === 'ta' ? 'மலைச் சூழல்:' : 'Mountain Mood:'}
          </span>

          <div className="flex items-center gap-1 w-full sm:w-auto justify-between">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = atmosphere === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/50 scale-105'
                      : 'text-stone-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                  <span className="whitespace-nowrap">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Condition Pill */}
        <div className="flex items-center gap-2 text-xs text-stone-300 w-full md:w-auto justify-end border-t md:border-t-0 border-white/10 pt-1.5 md:pt-0">
          <span className="font-mono font-bold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30">
            {currentPreset.temp}
          </span>
          <span className="text-[11px] text-stone-300 truncate font-light">
            {lang === 'ta' ? currentPreset.skyConditionTa : currentPreset.skyCondition}
          </span>
          <span className="text-[10px] hidden sm:inline px-2 py-0.5 rounded-full bg-black/60 text-stone-400 font-mono">
            {currentPreset.aqi}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AtmosphereBar;