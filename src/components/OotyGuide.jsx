import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { OOTY_TRAVEL_TIPS } from '../data/resortData';
import { 
  Sun, 
  Wind, 
  Mountain, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  Train, 
  Navigation,
  Compass
} from 'lucide-react';

const OotyGuide = () => {
  const { lang, t } = useResort();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How cold does it get at the resort in Ooty?",
      qTa: "ரிசார்ட்டில் குளிர் எவ்வாறு இருக்கும்?",
      a: "Perched at 7,400 ft on Doddabetta slopes, night temperatures usually range between 7°C to 12°C year-round. Every villa is equipped with an authentic wood-burning fireplace and climate-controlled bed heaters.",
      aTa: "தொட்டபெட்டாவின் 7,400 அடி உயரத்தில் அமைந்துள்ளதால், இரவில் 7°C முதல் 12°C வரை குளிர் இருக்கும். அனைத்து வில்லாக்களிலும் விறகு ஃபயர்பிளேஸ் மற்றும் ஹீட்டர் வசதி உள்ளது."
    },
    {
      q: "Can the resort arrange pickup from Coimbatore Airport or Mettupalayam?",
      qTa: "கோயம்புத்தூர் விமான நிலையம் அல்லது மேட்டுப்பாளையத்தில் இருந்து பிக்கப் வசதி உண்டா?",
      a: "Yes! Our private chauffeur fleet includes luxury 4x4 SUVs with mountain-certified drivers. We meet you at Coimbatore Airport (CJB) or Mettupalayam Railway Station and drive you safely up the 36 scenic Nilgiri hair-pin bends.",
      aTa: "ஆம்! கோயம்புத்தூர் விமான நிலையம் அல்லது மேட்டுப்பாளையம் ரயில் நிலையத்தில் இருந்து சொகுசு கார் மூலம் பிக்கப் வசதி உள்ளது."
    },
    {
      q: "Are the private jacuzzi pools naturally heated?",
      qTa: "பிரத்யேக ஜாக்குசி தொட்டிகள் சுடுநீரைக் கொண்டுள்ளதா?",
      a: "All outdoor villa jacuzzis and the Cloud Valley infinity pool are powered by eco-friendly geothermal water heaters, maintaining a comfortable 32°C to 38°C even when outside mountain air drops below 10°C.",
      aTa: "ஆம், அனைத்து ஜாக்குசிகளும் 32°C முதல் 38°C வரை கதகதப்பான சுடுநீரைக் கொண்டிருக்கும் வகையில் சூடாக்கப்படுகின்றன."
    },
    {
      q: "Do you have pure vegetarian and Jain food options?",
      qTa: "தூய சைவ மற்றும் ஜெயின் உணவு வசதி உள்ளதா?",
      a: "Absolutely. Our executive culinary team operates separate vegetarian preparation stations and serves traditional South Indian, Badaga organic farm vegetables, and customized Jain dining.",
      aTa: "நிச்சயமாக! சுத்தமான சைவ உணவு மற்றும் ஜெயின் உணவு தயாரிப்புக்கு தனி சமையலறை வசதி உள்ளது."
    }
  ];

  const getIcon = (name) => {
    switch (name) {
      case 'sun': return <Sun className="w-5 h-5 text-amber-300" />;
      case 'wind': return <Wind className="w-5 h-5 text-sky-300" />;
      case 'mountain': return <Mountain className="w-5 h-5 text-emerald-300" />;
      case 'map-pin': return <MapPin className="w-5 h-5 text-rose-300" />;
      default: return <Compass className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="guide" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'நீலகிரி பயண வழிகாட்டி' : 'Nilgiris Traveler Companion'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
            {lang === 'ta' ? 'ஊட்டி மலைவாசஸ்தல வழிகாட்டி' : 'The Ooty Hill-Station Guide'}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Essential altitude tips, mountain driving advice, and heritage insights for your stay.
          </p>
        </div>

        {/* Travel Tips 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {OOTY_TRAVEL_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                {getIcon(tip.icon)}
              </div>
              <h3 className="text-base font-bold text-white font-serif-luxury">
                {lang === 'ta' ? tip.titleTa : tip.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs & Location Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold font-serif-luxury text-white">
                {lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/5 rounded-2xl overflow-hidden bg-white/5 transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      <span>{lang === 'ta' ? faq.qTa : faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-stone-300 leading-relaxed border-t border-white/5">
                        {lang === 'ta' ? faq.aTa : faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location & Getting Here */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold font-serif-luxury text-white">
                {lang === 'ta' ? 'எங்களை வந்தடைவது எப்படி?' : 'Location & Hill Road'}
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Situated 7.8 km from Ooty Botanical Gardens along the scenic Kotagiri Ridge, shielded from town traffic inside 45 secluded acres of tea gardens.
            </p>

            <div className="space-y-2 text-xs bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Coimbatore Airport:</span>
                <span className="text-white font-medium">88 km (2.5 hrs)</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Mettupalayam Toy Train:</span>
                <span className="text-white font-medium">51 km (1.5 hrs)</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Bangalore to Ooty:</span>
                <span className="text-white font-medium">275 km via Bandipur / Masinagudi</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Ooty Main Town:</span>
                <span className="text-emerald-400 font-medium">15 mins drive</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Doddabetta+Ooty"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all shadow-md"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Open in Google Maps</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OotyGuide;
