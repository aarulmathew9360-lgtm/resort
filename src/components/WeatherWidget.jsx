import React, { useState } from 'react';
import { CloudFog, Wind, Mountain, Sun, Sparkles, ThermometerSnowflake, Droplets, Moon } from 'lucide-react';
import { useResort } from '../context/ResortContext';
import { ATMOSPHERE_PRESETS } from '../data/resortData';

const WeatherWidget = () => {
  const { lang, atmosphere, setIsStargazingModalOpen, playConciergeBellSound } = useResort();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentPreset = ATMOSPHERE_PRESETS[atmosphere] || ATMOSPHERE_PRESETS.day;

  const handleOpenStargazing = (e) => {
    e.stopPropagation();
    playConciergeBellSound();
    setIsStargazingModalOpen(true);
  };

  return (
    <div className="relative z-20">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer glass-panel border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 rounded-2xl p-4 shadow-xl text-stone-200"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <CloudFog className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-serif-luxury">
                  {currentPreset.temp}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-medium">
                  {lang === 'ta' ? currentPreset.skyConditionTa : currentPreset.skyCondition}
                </span>
              </div>
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'ta' ? 'தொட்டபெட்டா மலைத்தொடர் • 7,400 அடி' : 'Doddabetta Slopes • 7,400 ft'}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-stone-300 border-l border-white/10 pl-4">
            <div className="flex flex-col">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">{lang === 'ta' ? 'காற்று தரம்' : 'Air Quality'}</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {currentPreset.aqi}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">{lang === 'ta' ? 'ஈரப்பதம்' : 'Humidity'}</span>
              <span className="font-semibold text-sky-300 flex items-center gap-1">
                <Droplets className="w-3 h-3" /> {currentPreset.humidity}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Mountain Forecast & Sky Radar */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-white/10 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-black/20 p-2 rounded-xl">
                <div className="text-stone-400 text-[10px]">Dawn 6 AM</div>
                <div className="font-bold text-pink-300 text-sm mt-0.5">10°C</div>
                <div className="text-[10px] text-stone-400">Crisp Dew</div>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <div className="text-stone-400 text-[10px]">Noon 12 PM</div>
                <div className="font-bold text-amber-300 text-sm mt-0.5">19°C</div>
                <div className="text-[10px] text-stone-400">Mountain Sun</div>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <div className="text-stone-400 text-[10px]">Sunset 5:30 PM</div>
                <div className="font-bold text-orange-300 text-sm mt-0.5">14°C</div>
                <div className="text-[10px] text-stone-400">Golden Fog</div>
              </div>
              <div className="bg-black/20 p-2 rounded-xl border border-indigo-500/20 bg-indigo-950/20">
                <div className="text-indigo-300 text-[10px]">Night 9 PM</div>
                <div className="font-bold text-white text-sm mt-0.5">8°C</div>
                <div className="text-[10px] text-indigo-300">🔥 Fireplace</div>
              </div>
            </div>

            {/* Next-Level Stargazing Trigger */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-stone-400">
                {lang === 'ta' ? 'வான்நோக்கி & விண்மீன் பார்வை ரேடார்:' : 'Astronomy & Celestron Telescope Observatory:'}
              </span>
              <button
                type="button"
                onClick={handleOpenStargazing}
                className="px-3 py-1.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-400/40 text-indigo-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 transition-all"
              >
                <Moon className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                <span>{lang === 'ta' ? 'விண்மீன் ரேடார் திற' : 'Open Stargazing Radar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
