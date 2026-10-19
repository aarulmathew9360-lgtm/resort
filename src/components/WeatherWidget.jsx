import React, { useState } from 'react';
import { CloudFog, Wind, Mountain, Sun, Sparkles, ThermometerSnowflake, Droplets } from 'lucide-react';
import { useResort } from '../context/ResortContext';

const WeatherWidget = () => {
  const { lang } = useResort();
  const [isExpanded, setIsExpanded] = useState(false);

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
                <span className="text-2xl font-bold tracking-tight text-white font-serif-luxury">14°C</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-medium">
                  {lang === 'ta' ? 'பனிமூட்டம்' : 'Mist & Pine Air'}
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
                <Sparkles className="w-3 h-3" /> 16 AQI (Pristine)
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">{lang === 'ta' ? 'ஈரப்பதம்' : 'Humidity'}</span>
              <span className="font-semibold text-sky-300 flex items-center gap-1">
                <Droplets className="w-3 h-3" /> 84%
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Mountain Forecast */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-center text-xs animate-fadeIn">
            <div className="bg-black/20 p-2 rounded-xl">
              <div className="text-stone-400 text-[10px]">Morning</div>
              <div className="font-bold text-emerald-300 text-sm mt-0.5">11°C</div>
              <div className="text-[10px] text-stone-400">Crisp Dew</div>
            </div>
            <div className="bg-black/20 p-2 rounded-xl">
              <div className="text-stone-400 text-[10px]">Afternoon</div>
              <div className="font-bold text-amber-300 text-sm mt-0.5">19°C</div>
              <div className="text-[10px] text-stone-400">Gentle Sun</div>
            </div>
            <div className="bg-black/20 p-2 rounded-xl">
              <div className="text-stone-400 text-[10px]">Evening</div>
              <div className="font-bold text-cyan-300 text-sm mt-0.5">13°C</div>
              <div className="text-[10px] text-stone-400">Misty Fog</div>
            </div>
            <div className="bg-black/20 p-2 rounded-xl border border-amber-500/20 bg-amber-950/20">
              <div className="text-amber-300 text-[10px]">Night</div>
              <div className="font-bold text-white text-sm mt-0.5">8°C</div>
              <div className="text-[10px] text-amber-300">🔥 Fireplace</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
