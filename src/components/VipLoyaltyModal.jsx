import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Crown, 
  Sparkles, 
  X, 
  Download, 
  Gift, 
  Coffee, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode,
  Flame,
  Award
} from 'lucide-react';

const VipLoyaltyModal = () => {
  const { 
    isVipModalOpen, 
    setIsVipModalOpen, 
    lang, 
    currentUser, 
    showToast,
    playConciergeBellSound 
  } = useResort();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (!isVipModalOpen) return null;

  const memberName = currentUser ? currentUser.name : "Vimal Karthik";
  const memberTier = currentUser?.badge || "Diamond VIP Resident";
  const memberId = "NM-VIP-7400-OOTY";
  const mistMiles = 4850;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleDownloadPass = () => {
    playConciergeBellSound();
    showToast(
      lang === 'ta'
        ? "விஐபி டிஜிட்டல் பாஸ் வெற்றிகரமாக சேமிக்கப்பட்டது!"
        : "VIP Digital Privilege Pass downloaded to your device!"
    );
  };

  const handleRedeemPerk = (perkTitle) => {
    playConciergeBellSound();
    showToast(
      lang === 'ta'
        ? `${perkTitle} பயன்பாட்டிற்கு ஒதுக்கப்பட்டது! பட்டலர் குழுவிற்கு அறிவிக்கப்பட்டுள்ளது.`
        : `${perkTitle} redeemed! Butler concierge notified.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative bg-gradient-to-b from-[#0b1b14] via-[#091712] to-[#050e0a] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVipModalOpen(false)}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{lang === 'ta' ? 'நீலகிரி மிஸ்ட் பிரத்யேக கிளப்' : 'Nilgiri Mist Privilege Club'}</span>
          </div>

          <h3 className="text-2xl font-bold font-serif-luxury text-white">
            {lang === 'ta' ? 'உங்கள் டிஜிட்டல் விஐபி கார்டு' : 'VIP Mountain Resident Pass'}
          </h3>
          <p className="text-xs text-stone-300">
            {lang === 'ta' 
              ? '7,400 அடி உயர சொகுசு வசதிகளுக்கான உங்கள் பிரத்யேக உறுப்பினர் அட்டை.' 
              : 'Exclusive hill privileges, complimentary colonial high tea, and room upgrade guarantees.'}
          </p>
        </div>

        {/* 3D TILT HOLOGRAPHIC VIP CARD */}
        <div 
          className="perspective-1000 my-4 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0 });
          }}
        >
          <div 
            className="w-full h-56 rounded-3xl p-6 relative overflow-hidden transition-transform duration-200 shadow-2xl border border-amber-400/50 flex flex-col justify-between"
            style={{
              transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              background: 'linear-gradient(135deg, #132b20 0%, #1c4533 45%, #2a6148 70%, #0d2118 100%)'
            }}
          >
            {/* Holographic Sheen Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-tr from-transparent via-amber-200/20 to-teal-200/25"
              style={{
                opacity: isHovered ? 0.9 : 0.4,
                transform: `translateX(${mousePos.x * 4}px)`
              }}
            />

            {/* Card Top */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span className="font-serif-luxury font-bold text-sm tracking-widest text-amber-200 uppercase">
                  NILGIRI MIST ELITE
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 border border-amber-400/40 text-amber-200">
                {memberTier}
              </span>
            </div>

            {/* Chip & Member ID */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 border border-amber-200/40 shadow-inner flex items-center justify-center">
                <div className="w-6 h-4 border border-stone-800/40 rounded-xs" />
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-300 block">
                  Mist Miles Balance
                </span>
                <span className="text-lg font-bold font-serif-luxury text-amber-300 flex items-center gap-1 justify-end">
                  <Sparkles className="w-3.5 h-3.5" />
                  {mistMiles.toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* Card Bottom */}
            <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-stone-400 block">
                  Resident VIP Name
                </span>
                <span className="font-bold text-sm text-white font-serif-luxury">
                  {memberName}
                </span>
              </div>

              <div className="text-right font-mono text-[11px] text-amber-200/90 tracking-wider">
                {memberId}
              </div>
            </div>
          </div>
        </div>

        {/* Member Exclusive Privileges */}
        <div className="space-y-2.5 my-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
            {lang === 'ta' ? 'உங்கள் பிரத்யேக சலுகைகள்:' : 'Active Resident Privileges:'}
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleRedeemPerk("Colonial High Tea Tower")}
              className="p-2.5 rounded-xl bg-black/40 hover:bg-emerald-950/80 border border-white/5 hover:border-emerald-500/40 text-left transition-all cursor-pointer flex items-center gap-2"
            >
              <Coffee className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">Free High Tea</div>
                <div className="text-[10px] text-stone-400">1x Tower Voucher</div>
              </div>
            </button>

            <button
              onClick={() => handleRedeemPerk("4:00 PM Late Checkout")}
              className="p-2.5 rounded-xl bg-black/40 hover:bg-emerald-950/80 border border-white/5 hover:border-emerald-500/40 text-left transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">Late Checkout</div>
                <div className="text-[10px] text-stone-400">Up to 4:00 PM</div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleDownloadPass}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'ta' ? 'டிஜிட்டல் பாஸ் சேமி' : 'Save Pass to Wallet'}</span>
          </button>

          <button
            onClick={() => setIsVipModalOpen(false)}
            className="py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-xs cursor-pointer border border-white/10"
          >
            {lang === 'ta' ? 'மூடு' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VipLoyaltyModal;