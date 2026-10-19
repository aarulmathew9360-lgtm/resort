import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Download, 
  Smartphone, 
  X, 
  Sparkles, 
  Share, 
  PlusSquare, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

const PwaInstallPrompt = () => {
  const { lang, showToast } = useResort();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isAppleDevice);

    // Listen for beforeinstallprompt event (Android / Chromium)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait 3 seconds after page load to show non-intrusively
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    const handleCustomTrigger = () => {
      setShowPrompt(true);
    };
    window.addEventListener('triggerPwaInstall', handleCustomTrigger);

    // If iOS and not installed, show after 5 seconds
    if (isAppleDevice && !window.navigator.standalone) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('triggerPwaInstall', handleCustomTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIos) {
        showToast(
          lang === 'ta'
            ? "Safari கீழே உள்ள 'Share (📤)' பட்டனை அழுத்தி 'Add to Home Screen' தேர்ந்தெடுக்கவும்!"
            : "Tap the Safari Share button (📤) and select 'Add to Home Screen'!"
        );
      } else {
        showToast("To install, tap your browser menu (⋮) and select 'Install app' or 'Add to Home screen'");
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast(lang === 'ta' ? "நீலகிரி மிஸ்ட் ஆப் நிறுவப்படுகிறது!" : "Installing Nilgiri Mist app to your home screen!");
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-scaleUp">
      <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-emerald-400/40 shadow-2xl backdrop-blur-2xl text-stone-100 relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/20 blur-xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-emerald-400/40 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Smartphone className="w-6 h-6 text-amber-200" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-white text-sm tracking-wide">
                  {lang === 'ta' ? 'மொபைல் ஆப்-ஆக இன்ஸ்டால் செய்க' : 'Install Nilgiri Mist Mobile App'}
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FREE
                </span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                {lang === 'ta' 
                  ? 'அதிவேக அறை சேவை, ஆஃப்லைன் பாஸ் மற்றும் வானிலை தகவலை உங்கள் போன் முகப்புத் திரையில் பெறலாம்.'
                  : 'Fast 1-tap fireside butler requests, offline gate fast-pass & live mountain weather on your home screen.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPrompt(false)}
            className="p-1 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* iOS Instruction Tip or Action Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          {isIos ? (
            <div className="text-[11px] text-amber-200 flex items-center gap-2">
              <Share className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tap <strong>Share</strong> then <strong>'Add to Home Screen'</strong></span>
            </div>
          ) : (
            <span className="text-[10px] text-stone-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero storage footprint • Instant PWA</span>
            </span>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowPrompt(false)}
              className="px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-semibold text-stone-400 hover:text-white hover:bg-white/5"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-200" />
              <span>{lang === 'ta' ? 'இன்ஸ்டால்' : 'Install'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PwaInstallPrompt;
