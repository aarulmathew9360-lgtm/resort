import React from 'react';
import { useResort } from '../context/ResortContext';
import WeatherWidget from './WeatherWidget';
import AtmosphereBar from './AtmosphereBar';
import { ATMOSPHERE_PRESETS } from '../data/resortData';
import { Compass, Sparkles, ChevronDown, Award, Play } from 'lucide-react';

const Hero = () => {
  const { lang, t, atmosphere } = useResort();

  const currentPreset = ATMOSPHERE_PRESETS[atmosphere] || ATMOSPHERE_PRESETS.day;

  return (
    <div className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-16 overflow-hidden">
      
      {/* Background Image with Cinematic Overlay & Atmosphere Switcher */}
      <div className="absolute inset-0 z-0">
        <img
          key={atmosphere}
          src={currentPreset.bgImage}
          alt="Nilgiri Mountain Tea Estate Ooty"
          className="w-full h-full object-cover scale-105 animate-fade-in transition-all duration-1000"
        />
        {/* Dynamic Gradients based on atmosphere mode */}
        <div className={`absolute inset-0 bg-gradient-to-t ${currentPreset.accent} to-black/80 transition-all duration-1000`} />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0b1612]/80" />
        {/* Animated Mist Simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-emerald-950/20 to-transparent animate-mist pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Accolade Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-lg">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? 'ஊட்டியின் #1 பிரீமியம் மலை ரிசார்ட்' : '#1 Ranked Luxury Mountain Resort in Ooty'}</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-stone-300">Doddabetta Slopes</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-xl">
              {lang === 'ta' ? (
                <>
                  மேகக்கூட்டங்கள் <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                    தேயிலைத் தோட்டங்களை
                  </span> தழுவும் அமைதி
                </>
              ) : (
                <>
                  Where the Clouds <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent italic font-normal">
                    Drift Across Your
                  </span> Mountain Jacuzzi
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-light">
              {t.tagline}. {lang === 'ta' 
                ? 'தனிப்பட்ட மர வில்லாக்கள், விறகு ஃபயர்பிளேஸ், மற்றும் இயற்கையான தேயிலை நறுமணம் கொண்ட பிரத்யேக சொகுசு தங்குமிடம்.' 
                : 'Experience private cedarwood chalets with roaring fireplaces, heated infinity plunge pools, and uninterrupted sunrises over rolling Nilgiri peaks.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#villas"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-950/80 hover:scale-105 border border-emerald-400/40 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{t.bookNow}</span>
              </a>

              <a
                href="#estate-map"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-widest backdrop-blur-md border border-white/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ta' ? 'எஸ்டேட் வரைபடம்' : 'Explore 45-Acre Estate'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Ooty Mountain Telemetry */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <WeatherWidget />

            {/* Mountain Estate Highlight Card */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 text-xs text-stone-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
                  {lang === 'ta' ? 'ரிசார்ட் சிறப்பம்சங்கள்' : 'At A Glance'}
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">DODDABETTA / OOTY</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="border-l-2 border-emerald-500/60 pl-2">
                  <div className="text-white font-bold text-sm">45 Acres</div>
                  <div className="text-stone-400 text-[10px]">Organic Tea Estate</div>
                </div>
                <div className="border-l-2 border-amber-500/60 pl-2">
                  <div className="text-white font-bold text-sm">7,400 ft</div>
                  <div className="text-stone-400 text-[10px]">Cloud Altitude</div>
                </div>
                <div className="border-l-2 border-sky-500/60 pl-2">
                  <div className="text-white font-bold text-sm">16 AQI</div>
                  <div className="text-stone-400 text-[10px]">Pure Mountain Air</div>
                </div>
                <div className="border-l-2 border-teal-500/60 pl-2">
                  <div className="text-white font-bold text-sm">100%</div>
                  <div className="text-stone-400 text-[10px]">Private Fireplaces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nilgiri 24-Hour Atmosphere & Mood Switcher Bar */}
      <AtmosphereBar />

      {/* Down Scroll Arrow */}
      <div className="relative z-10 flex justify-center text-stone-400 text-xs mt-3">
        <a 
          href="#villas"
          className="flex flex-col items-center gap-1 hover:text-emerald-300 transition-colors"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll Down</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
