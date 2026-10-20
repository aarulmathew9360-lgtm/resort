import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  QrCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';

const UpiPaymentTerminal = ({ amount, onPaymentSuccess }) => {
  const { lang, showToast, playConciergeBellSound, playPaymentSuccessSound } = useResort();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(299); // 4 mins 59 secs
  const [isProcessing, setIsProcessing] = useState(false);

  const vpa = "nilgirimist@hdfcbank";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyVpa = () => {
    playConciergeBellSound();
    navigator.clipboard?.writeText(vpa);
    setCopied(true);
    showToast(lang === 'ta' ? "UPI முகவரி நகலெடுக்கப்பட்டது: " + vpa : "UPI ID copied: " + vpa);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    playConciergeBellSound();
    setTimeout(() => {
      setIsProcessing(false);
      playPaymentSuccessSound();
      showToast(lang === 'ta' ? "NPCI வங்கி அங்கீகாரம் பெற்றது!" : "UPI Authorization Approved by Bank!");
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 1400);
  };

  return (
    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/40 shadow-2xl space-y-4 text-xs">
      
      {/* Header with Security Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs font-serif-luxury">
              {lang === 'ta' ? 'டைனமிக் யுபிஐ க்யூஆர் பேமென்ட்' : 'Dynamic Real-Time UPI Terminal'}
            </h4>
            <span className="text-[10px] text-stone-400">NPCI Certified 256-bit Encrypted</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold">
          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* QR Code Graphic & Details */}
      <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#050f0b] p-4 rounded-xl border border-white/5">
        
        {/* Dynamic Stylized QR Matrix */}
        <div className="relative p-2.5 bg-white rounded-2xl shadow-xl shrink-0 flex flex-col items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 120 120" fill="none">
            {/* Corner position locators */}
            <rect x="5" y="5" width="30" height="30" rx="4" fill="#000" />
            <rect x="10" y="10" width="20" height="20" rx="2" fill="#fff" />
            <rect x="14" y="14" width="12" height="12" rx="1" fill="#000" />

            <rect x="85" y="5" width="30" height="30" rx="4" fill="#000" />
            <rect x="90" y="10" width="20" height="20" rx="2" fill="#fff" />
            <rect x="94" y="14" width="12" height="12" rx="1" fill="#000" />

            <rect x="5" y="85" width="30" height="30" rx="4" fill="#000" />
            <rect x="10" y="90" width="20" height="20" rx="2" fill="#fff" />
            <rect x="14" y="94" width="12" height="12" rx="1" fill="#000" />

            {/* Pattern Dots */}
            <circle cx="45" cy="15" r="3" fill="#000" />
            <circle cx="55" cy="15" r="3" fill="#000" />
            <circle cx="65" cy="15" r="3" fill="#000" />
            <circle cx="75" cy="15" r="3" fill="#000" />
            
            <circle cx="45" cy="25" r="3" fill="#000" />
            <circle cx="60" cy="25" r="3" fill="#000" />
            <circle cx="75" cy="25" r="3" fill="#000" />

            <circle cx="15" cy="45" r="3" fill="#000" />
            <circle cx="25" cy="45" r="3" fill="#000" />
            <circle cx="45" cy="45" r="3" fill="#000" />
            <circle cx="55" cy="45" r="3" fill="#000" />
            <circle cx="70" cy="45" r="3" fill="#000" />
            <circle cx="85" cy="45" r="3" fill="#000" />
            <circle cx="105" cy="45" r="3" fill="#000" />

            {/* Center Rupee Badge */}
            <rect x="42" y="42" width="36" height="36" rx="8" fill="#047857" />
            <text x="60" y="66" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="bold" fontFamily="sans-serif">₹</text>

            <circle cx="15" cy="70" r="3" fill="#000" />
            <circle cx="25" cy="60" r="3" fill="#000" />
            <circle cx="85" cy="65" r="3" fill="#000" />
            <circle cx="95" cy="60" r="3" fill="#000" />
            <circle cx="105" cy="70" r="3" fill="#000" />

            <circle cx="45" cy="75" r="3" fill="#000" />
            <circle cx="60" cy="75" r="3" fill="#000" />
            <circle cx="75" cy="75" r="3" fill="#000" />

            <circle cx="45" cy="95" r="3" fill="#000" />
            <circle cx="55" cy="105" r="3" fill="#000" />
            <circle cx="70" cy="95" r="3" fill="#000" />
            <circle cx="85" cy="100" r="3" fill="#000" />
            <circle cx="100" cy="95" r="3" fill="#000" />
          </svg>

          <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-800 mt-1 font-mono">
            Scan to Pay ₹{amount?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Payment Details & VPA */}
        <div className="space-y-3 flex-1 w-full">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider block">
              Payee Merchant VPA
            </span>
            <div className="flex items-center justify-between gap-2 bg-black/50 p-2 rounded-lg border border-white/10 mt-1">
              <span className="font-mono text-emerald-300 font-bold text-xs select-all">
                {vpa}
              </span>
              <button
                type="button"
                onClick={handleCopyVpa}
                className="p-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Copy VPA"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Supported UPI Apps */}
          <div>
            <span className="text-[10px] text-stone-400 block mb-1">
              {lang === 'ta' ? 'அனைத்து யுபிஐ செயலிகளிலும் ஸ்கேன் செய்யலாம்:' : 'Scan using any UPI App:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['GPay', 'PhonePe', 'Paytm', 'CRED', 'BHIM', 'Amazon Pay'].map((app) => (
                <span 
                  key={app}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-stone-300"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* One-Click Fast Simulator Button */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleSimulatePayment}
        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
      >
        {isProcessing ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span>Connecting with NPCI Switch...</span>
          </>
        ) : (
          <>
            <Smartphone className="w-3.5 h-3.5 text-amber-200" />
            <span>{lang === 'ta' ? 'உடனடி யுபிஐ அங்கீகாரம் செய்க (டெமோ)' : 'Approve & Pay via UPI App (1-Click)'}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
        <Lock className="w-3 h-3 text-emerald-400" />
        <span>Direct Bank Authorization via HDFC & ICICI Payment Gateway</span>
      </div>

    </div>
  );
};

export default UpiPaymentTerminal;