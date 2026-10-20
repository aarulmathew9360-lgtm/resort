import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { SOCIAL_PROOF_FEED } from '../data/resortData';
import { Sparkles, Eye, X, Flame, ShieldCheck } from 'lucide-react';

const SocialProofTicker = () => {
  const { lang } = useResort();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [liveViewers, setLiveViewers] = useState(18);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF_FEED.length);
        setIsVisible(true);
      }, 500);
    }, 8500);

    // Random fluctuation in live viewers (14 to 24)
    const viewerInterval = setInterval(() => {
      setLiveViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, Math.min(28, prev + delta));
      });
    }, 12000);

    return () => {
      clearInterval(interval);
      clearInterval(viewerInterval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentItem = SOCIAL_PROOF_FEED[currentIndex];

  return (
    <aside 
      aria-label="Live guest reservation activity"
      className="fixed bottom-6 left-6 z-40 hidden sm:block max-w-sm pointer-events-auto"
    >
      <div 
        className={`glass-panel p-3.5 rounded-2xl border border-emerald-500/30 shadow-2xl bg-gradient-to-r from-[#071610]/95 via-[#091f16]/95 to-[#06140e]/95 backdrop-blur-xl transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img 
              src={currentItem.avatar} 
              alt={currentItem.guest} 
              className="w-10 h-10 rounded-full object-cover border border-emerald-400/50 shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate font-serif-luxury">
                {currentItem.guest}
              </span>
              <span className="text-[10px] text-stone-400">
                ({currentItem.location})
              </span>
            </div>

            <p className="text-[11px] text-stone-300 leading-tight line-clamp-2 mt-0.5">
              {lang === 'ta' && currentItem.actionTa ? currentItem.actionTa : currentItem.action}
            </p>

            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-stone-400">
              <span className="text-emerald-400 font-mono font-medium">
                {currentItem.time}
              </span>
              <span className="flex items-center gap-1 text-amber-300/90 font-medium">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                {liveViewers} {lang === 'ta' ? 'பயணிகள் பார்க்கின்றனர்' : 'viewing now'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsDismissed(true)}
            className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SocialProofTicker;