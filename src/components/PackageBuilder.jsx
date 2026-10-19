import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_ROOMS, RESORT_EXPERIENCES, RESORT_SPA, ADD_ONS } from '../data/resortData';
import confetti from 'canvas-confetti';
import { printResortBill } from '../utils/printBill';
import { 
  Sparkles, 
  PackageCheck, 
  Check, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Calendar, 
  Moon, 
  Compass, 
  Flower2, 
  Flame, 
  Gift, 
  Car, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  CreditCard, 
  QrCode, 
  Printer, 
  Heart, 
  Info, 
  Percent, 
  Zap,
  SlidersHorizontal,
  X,
  Users
} from 'lucide-react';

const PackageBuilder = () => {
  const { 
    lang, 
    formatPrice, 
    addBooking, 
    showToast, 
    setSelectedInvoiceBooking,
    searchQuery 
  } = useResort();

  // Active step / tab in the builder: 'villa' | 'excursions' | 'spa' | 'perks'
  const [activeTab, setActiveTab] = useState('villa');

  // Selected components
  const [selectedRoomId, setSelectedRoomId] = useState(RESORT_ROOMS[0].id);
  const [nights, setNights] = useState(3);
  const [selectedExcursions, setSelectedExcursions] = useState(['exp-toy-train', 'exp-candlelight-forest']);
  const [selectedSpa, setSelectedSpa] = useState(['spa-abhyanga']);
  const [selectedPerks, setSelectedPerks] = useState(['addon-firewood', 'addon-romantic']);

  // Modal for final checkout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Guest Form
  const [guestForm, setGuestForm] = useState({
    name: 'Vimal Karthik',
    phone: '+91 98765 43210',
    email: 'vimal.ooty@gmail.com',
    paymentMethod: 'upi',
    specialNote: 'Complimentary high tea upon arrival requested.'
  });

  const selectedRoom = RESORT_ROOMS.find(r => r.id === selectedRoomId) || RESORT_ROOMS[0];

  // Item counts & calculations
  const totalAddonItems = selectedExcursions.length + selectedSpa.length + selectedPerks.length;

  // Dynamic Combo Tier Savings:
  // 1-2 items = 5% off
  // 3-4 items = 10% off
  // 5+ items = 20% off
  let discountPercent = 0;
  let tierBadge = 'Standard Combo';
  let tierBadgeTa = 'வழக்கமான காம்போ';
  let nextTierMessage = 'Add 1 more item to unlock 5% bundle discount!';
  let nextTierMessageTa = '5% தள்ளுபடி பெற இன்னும் 1 அனுபவத்தைச் சேர்க்கவும்!';

  if (totalAddonItems >= 5) {
    discountPercent = 20;
    tierBadge = '💎 Diamond VIP All-Inclusive (20% OFF)';
    tierBadgeTa = '💎 வைர விஐபி சிறப்புச் சலுகை (20% தள்ளுபடி)';
    nextTierMessage = 'Maximum 20% bundle savings unlocked!';
    nextTierMessageTa = 'அதிகபட்ச 20% தள்ளுபடி பெறப்பட்டது!';
  } else if (totalAddonItems >= 3) {
    discountPercent = 10;
    tierBadge = '🥇 Gold Mountain Privilege (10% OFF)';
    tierBadgeTa = '🥇 தங்க மலை பிரத்யேக சலுகை (10% தள்ளுபடி)';
    const needed = 5 - totalAddonItems;
    nextTierMessage = `Add ${needed} more ${needed === 1 ? 'item' : 'items'} to unlock 20% VIP bundle savings!`;
    nextTierMessageTa = `20% விஐபி தள்ளுபடி பெற இன்னும் ${needed} தேர்வைச் சேர்க்கவும்!`;
  } else if (totalAddonItems >= 1) {
    discountPercent = 5;
    tierBadge = '🥈 Silver Nilgiri Bundle (5% OFF)';
    tierBadgeTa = '🥈 வெள்ளி நீலகிரி காம்போ (5% தள்ளுபடி)';
    const needed = 3 - totalAddonItems;
    nextTierMessage = `Add ${needed} more ${needed === 1 ? 'item' : 'items'} to unlock 10% Gold savings!`;
    nextTierMessageTa = `10% தள்ளுபடி பெற இன்னும் ${needed} தேர்வைச் சேர்க்கவும்!`;
  }

  // Financials
  const villaSubtotal = (selectedRoom ? selectedRoom.price : 0) * nights;
  
  const excursionsSubtotal = selectedExcursions.reduce((sum, id) => {
    const item = RESORT_EXPERIENCES.find(e => e.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const spaSubtotal = selectedSpa.reduce((sum, id) => {
    const item = RESORT_SPA.find(s => s.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const perksSubtotal = selectedPerks.reduce((sum, id) => {
    const item = ADD_ONS.find(p => p.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const grossTotal = villaSubtotal + excursionsSubtotal + spaSubtotal + perksSubtotal;
  const comboDiscountAmount = Math.round(grossTotal * (discountPercent / 100));
  const netBeforeTax = grossTotal - comboDiscountAmount;
  const gstAmount = Math.round(netBeforeTax * 0.12); // 12% Resort Luxury Tax
  const finalComboTotal = netBeforeTax + gstAmount;

  // Toggle helpers
  const toggleExcursion = (id) => {
    setSelectedExcursions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSpa = (id) => {
    setSelectedSpa(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const togglePerk = (id) => {
    setSelectedPerks(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 1-Click Curated Preset Applicator
  const applyPreset = (presetType) => {
    if (presetType === 'honeymoon') {
      setSelectedRoomId('glasshouse-chalet');
      setNights(3);
      setSelectedExcursions(['exp-candlelight-forest']);
      setSelectedSpa(['spa-abhyanga']);
      setSelectedPerks(['addon-romantic', 'addon-firewood', 'addon-chocolate']);
      showToast(lang === 'ta' ? 'ஹனிமூன் ரொமான்ஸ் பேக்கேஜ் தேர்ந்தெடுக்கப்பட்டது!' : 'Misty Honeymoon Romance combo loaded!');
    } else if (presetType === 'heritage') {
      setSelectedRoomId('governors-suite');
      setNights(3);
      setSelectedExcursions(['exp-toy-train', 'exp-tea-mastery']);
      setSelectedSpa(['spa-nilgiri-detox']);
      setSelectedPerks(['addon-chocolate', 'addon-transfer']);
      showToast(lang === 'ta' ? 'பாரம்பரிய நீலகிரி தேயிலை பேக்கேஜ் தேர்ந்தெடுக்கப்பட்டது!' : 'Nilgiri Heritage & Tea Trail combo loaded!');
    } else if (presetType === 'adventure') {
      setSelectedRoomId('treehouse-chalet');
      setNights(2);
      setSelectedExcursions(['exp-doddabetta-trek', 'exp-bonfire-bbq']);
      setSelectedSpa(['spa-mist-yoga']);
      setSelectedPerks(['addon-firewood', 'addon-chocolate']);
      showToast(lang === 'ta' ? 'தொட்டபெட்டா மலையேற்ற சாகச பேக்கேஜ் தேர்ந்தெடுக்கப்பட்டது!' : 'Doddabetta Adventure & Wellness combo loaded!');
    }
  };

  // Complete Booking
  const handleConfirmPackageBooking = (e) => {
    e.preventDefault();
    const newBookingId = `OOTY-COMBO-${Math.floor(1000 + Math.random() * 9000)}-NM`;

    const allSelectedItemsList = [
      ...selectedExcursions.map(id => `Excursion: ${RESORT_EXPERIENCES.find(e => e.id === id)?.title}`),
      ...selectedSpa.map(id => `Ayurveda Spa: ${RESORT_SPA.find(s => s.id === id)?.name}`),
      ...selectedPerks.map(id => `VIP Perk: ${ADD_ONS.find(p => p.id === id)?.name}`),
      `Combo Bundle Savings Applied: ${discountPercent}% (${tierBadge})`
    ];

    const bookingObject = {
      bookingId: newBookingId,
      roomName: `${selectedRoom.name} [Custom Nilgiri Stay Combo]`,
      roomNameTa: `${selectedRoom.nameTa} [பிரத்யேக காம்போ பேக்கேஜ்]`,
      checkIn: searchQuery.checkIn || new Date().toISOString().split('T')[0],
      checkOut: searchQuery.checkOut || new Date(Date.now() + 86400000 * nights).toISOString().split('T')[0],
      nights,
      guests: searchQuery.guests || 2,
      totalAmount: finalComboTotal,
      status: guestForm.paymentMethod === 'resort' ? 'Guaranteed (Pay at Resort)' : 'Paid & Confirmed',
      guestName: guestForm.name,
      guestPhone: guestForm.phone,
      guestEmail: guestForm.email,
      addOns: allSelectedItemsList,
      paymentMethod: guestForm.paymentMethod,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setConfirmedBookingData(bookingObject);
    addBooking(bookingObject);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Confetti fallback
    }

    showToast(
      lang === 'ta'
        ? `பிரத்யேக காம்போ பதிவு உறுதியானது! எண்: ${newBookingId}`
        : `Custom Combo Stay Confirmed! Booking ID: ${newBookingId}`
    );
  };

  return (
    <section id="package-builder" className="py-24 relative z-20 bg-gradient-to-b from-[#08120e] via-[#091712] to-[#07100c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-950/40">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{lang === 'ta' ? 'சுற்றுலா காம்போ பேக்கேஜ் பில்டர்' : 'Build Your Nilgiri Stay'}</span>
            <span className="bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
              Save up to 20%
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white tracking-tight">
            {lang === 'ta' ? (
              <>உங்கள் கனவு ஊட்டி விடுமுறையை <span className="text-emerald-400 italic">நீங்களே உருவாக்குங்கள்</span></>
            ) : (
              <>Craft Your Bespoke <span className="text-emerald-400 italic">Nilgiri Holiday Combo</span></>
            )}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {lang === 'ta'
              ? 'உங்கள் விருப்பத்திற்கேற்ப வில்லா, மலை ரயில் பயணம், ஆயுர்வேத ஸ்பா மற்றும் அறை வசதிகளைத் தேர்வு செய்து உடனுக்குடன் 20% வரை தள்ளுபடி பெறுங்கள்.'
              : 'Handpick your dream chalet, heritage mountain rail journey, forest spa therapies, and private butler perks. Live bundle savings unlock automatically as you add experiences.'}
          </p>

          {/* 1-Click Curated Combo Presets */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-stone-400 font-semibold mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {lang === 'ta' ? 'விரைவு காம்போக்கள்:' : '1-Click Curated Presets:'}
            </span>
            <button
              onClick={() => applyPreset('honeymoon')}
              className="text-xs px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-emerald-900/60 border border-pink-500/30 hover:border-pink-400 text-pink-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>{lang === 'ta' ? 'ரொமான்டிக் ஹனிமூன்' : 'Misty Honeymoon (3N)'}</span>
            </button>
            <button
              onClick={() => applyPreset('heritage')}
              className="text-xs px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-emerald-900/60 border border-amber-500/30 hover:border-amber-400 text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'பாரம்பரிய தேயிலை காம்போ' : 'Heritage Rail & Tea (3N)'}</span>
            </button>
            <button
              onClick={() => applyPreset('adventure')}
              className="text-xs px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
            >
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ta' ? 'சிகர மலையேற்றம் & வெல்னஸ்' : 'Cloud Peak & Wellness (2N)'}</span>
            </button>
          </div>
        </div>

        {/* Live Savings Milestone Banner */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-emerald-500/30 mb-10 max-w-4xl mx-auto shadow-2xl bg-emerald-950/30 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-black text-xl shadow-lg shrink-0">
                %{discountPercent}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-serif-luxury text-base sm:text-lg">
                    {lang === 'ta' ? tierBadgeTa : tierBadge}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                    {totalAddonItems} {totalAddonItems === 1 ? 'Item' : 'Items'} Added
                  </span>
                </div>
                <p className="text-xs text-amber-300/90 mt-0.5">
                  {lang === 'ta' ? nextTierMessageTa : nextTierMessage}
                </p>
              </div>
            </div>

            {/* Progress Bar towards 20% */}
            <div className="w-full sm:w-56 shrink-0 space-y-1.5">
              <div className="flex justify-between text-[11px] text-stone-400 font-mono font-semibold">
                <span>0 Items</span>
                <span>3 (10%)</span>
                <span className="text-amber-300 font-bold">5+ (20% VIP)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/10 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.min(100, (totalAddonItems / 5) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Builder Layout: Category Tabs & Content Grid vs Live Floating Receipt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Selection Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step Selection Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('villa')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'villa'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/50'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>1. {lang === 'ta' ? 'வில்லா' : 'Chalet'}</span>
                <span className="text-[10px] opacity-75 font-mono">({nights}N)</span>
              </button>

              <button
                onClick={() => setActiveTab('excursions')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'excursions'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/50'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>2. {lang === 'ta' ? 'சுற்றுலா' : 'Excursions'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
                  {selectedExcursions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('spa')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'spa'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/50'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Flower2 className="w-4 h-4" />
                <span>3. {lang === 'ta' ? 'ஸ்பா' : 'Ayurveda'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
                  {selectedSpa.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('perks')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'perks'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/50'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>4. {lang === 'ta' ? 'விஐபி வசதிகள்' : 'VIP Perks'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
                  {selectedPerks.length}
                </span>
              </button>
            </div>

            {/* TAB 1: CHALET & NIGHTS SELECTION */}
            {activeTab === 'villa' && (
              <div className="space-y-6">
                {/* Stay Duration Selector */}
                <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {lang === 'ta' ? 'தங்கும் கால அளவு' : 'Stay Duration'}
                    </span>
                    <h4 className="text-base font-bold text-white font-serif-luxury mt-0.5">
                      {lang === 'ta' ? `${nights} இரவுகள் மலை வாசஸ்தலம்` : `${nights} Nights Retreat in the Nilgiris`}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 7].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNights(num)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          nights === num
                            ? 'bg-emerald-500 text-stone-950 font-black shadow-md shadow-emerald-900/50 scale-105'
                            : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-white/5'
                        }`}
                      >
                        {num}N
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chalet Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RESORT_ROOMS.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-500/50'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30 hover:bg-stone-900/70'
                        }`}
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                          
                          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                            {room.tag}
                          </span>

                          {isSelected && (
                            <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shadow-lg font-bold">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </span>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                            <span className="text-xs text-stone-300 flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-emerald-400" />
                              {room.capacity.split('•')[0]}
                            </span>
                            <div className="text-right">
                              <span className="text-base font-bold font-serif-luxury text-emerald-300">
                                {formatPrice(room.price)}
                              </span>
                              <span className="text-[10px] text-stone-400 ml-1">/ night</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-sm font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                            {lang === 'ta' && room.nameTa ? room.nameTa : room.name}
                          </h4>
                          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                            {lang === 'ta' && room.descriptionTa ? room.descriptionTa : room.description}
                          </p>

                          <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] text-stone-400">
                            <span>{room.sqft}</span>
                            <span className="text-emerald-400 font-semibold">{nights} Nights: {formatPrice(room.price * nights)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveTab('excursions')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-950/50"
                  >
                    <span>{lang === 'ta' ? 'அடுத்தது: சுற்றுலா சேர்க்க' : 'Next: Add Nilgiri Excursions'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: EXCURSIONS SELECTION */}
            {activeTab === 'excursions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs text-stone-400">
                    {lang === 'ta' ? 'விரும்பிய சுற்றுலாக்களைத் தேர்வு செய்க:' : 'Select excursions to curate your mountain itinerary:'}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {selectedExcursions.length} {lang === 'ta' ? 'தேர்வு செய்யப்பட்டது' : 'selected'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RESORT_EXPERIENCES.map((exp) => {
                    const isSelected = selectedExcursions.includes(exp.id);
                    return (
                      <div
                        key={exp.id}
                        onClick={() => toggleExcursion(exp.id)}
                        className={`group relative rounded-2xl overflow-hidden border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-lg'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30 hover:bg-stone-900/70'
                        }`}
                      >
                        <div className="flex gap-3.5">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {exp.badge}
                              </span>
                              <span className="text-[10px] text-stone-400">{exp.duration}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                              {lang === 'ta' && exp.titleTa ? exp.titleTa : exp.title}
                            </h4>
                            <p className="text-[11px] text-stone-400 line-clamp-2">
                              {lang === 'ta' && exp.descriptionTa ? exp.descriptionTa : exp.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-bold font-serif-luxury text-emerald-300">
                            +{formatPrice(exp.price)}
                          </span>

                          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-stone-950 font-black'
                              : 'bg-stone-800 text-stone-300 group-hover:bg-emerald-900/60'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isSelected ? (lang === 'ta' ? 'சேர்க்கப்பட்டது' : 'Added') : (lang === 'ta' ? 'சேர்' : 'Add')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('villa')}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{lang === 'ta' ? 'முந்தையது' : 'Back to Villa'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('spa')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-950/50"
                  >
                    <span>{lang === 'ta' ? 'அடுத்தது: ஆயுர்வேத ஸ்பா' : 'Next: Add Ayurveda Spa'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: AYURVEDA SPA SELECTION */}
            {activeTab === 'spa' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs text-stone-400">
                    {lang === 'ta' ? 'நீலகிரி மூலிகை மற்றும் ஆயுர்வேத சிகிச்சைகளைச் சேர்க்கவும்:' : 'Infuse holistic botanical healing into your retreat:'}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {selectedSpa.length} {lang === 'ta' ? 'தேர்வு செய்யப்பட்டது' : 'selected'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RESORT_SPA.map((spa) => {
                    const isSelected = selectedSpa.includes(spa.id);
                    return (
                      <div
                        key={spa.id}
                        onClick={() => toggleSpa(spa.id)}
                        className={`group relative rounded-2xl overflow-hidden border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-lg'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30 hover:bg-stone-900/70'
                        }`}
                      >
                        <div className="flex gap-3.5">
                          <img
                            src={spa.image}
                            alt={spa.name}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] text-emerald-400 font-semibold">{spa.duration}</span>
                            <h4 className="text-xs sm:text-sm font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                              {lang === 'ta' && spa.nameTa ? spa.nameTa : spa.name}
                            </h4>
                            <p className="text-[11px] text-stone-400 line-clamp-2">
                              {lang === 'ta' && spa.descriptionTa ? spa.descriptionTa : spa.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-bold font-serif-luxury text-emerald-300">
                            +{formatPrice(spa.price)}
                          </span>

                          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-stone-950 font-black'
                              : 'bg-stone-800 text-stone-300 group-hover:bg-emerald-900/60'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isSelected ? (lang === 'ta' ? 'சேர்க்கப்பட்டது' : 'Added') : (lang === 'ta' ? 'சேர்' : 'Add')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('excursions')}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{lang === 'ta' ? 'முந்தையது' : 'Back to Excursions'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('perks')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-950/50"
                  >
                    <span>{lang === 'ta' ? 'அடுத்தது: விஐபி சலுகைகள்' : 'Next: Add VIP Perks'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: VIP BUTLER PERKS SELECTION */}
            {activeTab === 'perks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs text-stone-400">
                    {lang === 'ta' ? 'அறையில் சிறப்பு சேவைகள் மற்றும் வசதிகள்:' : 'In-room fireside comforts & executive chauffeured travel:'}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {selectedPerks.length} {lang === 'ta' ? 'தேர்வு செய்யப்பட்டது' : 'selected'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADD_ONS.map((perk) => {
                    const isSelected = selectedPerks.includes(perk.id);
                    return (
                      <div
                        key={perk.id}
                        onClick={() => togglePerk(perk.id)}
                        className={`group relative rounded-2xl border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-lg'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30 hover:bg-stone-900/70'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                              {lang === 'ta' && perk.nameTa ? perk.nameTa : perk.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-relaxed">
                            {perk.desc}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-bold font-serif-luxury text-emerald-300">
                            +{formatPrice(perk.price)}
                          </span>

                          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-stone-950 font-black'
                              : 'bg-stone-800 text-stone-300 group-hover:bg-emerald-900/60'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isSelected ? (lang === 'ta' ? 'சேர்க்கப்பட்டது' : 'Added') : (lang === 'ta' ? 'சேர்' : 'Add')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab('spa')}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{lang === 'ta' ? 'முந்தையது' : 'Back to Ayurveda'}</span>
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-950/60"
                  >
                    <span>{lang === 'ta' ? 'காம்போ பதிவு தொடர' : 'Review & Confirm Combo Stay'}</span>
                    <Sparkles className="w-4 h-4 fill-stone-950" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Dynamic Live Combo Savings Receipt (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-5 bg-gradient-to-b from-[#091b14] to-[#07130e]">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    {lang === 'ta' ? 'நேரலை கணக்கீடு' : 'LIVE COMBO ESTIMATOR'}
                  </span>
                  <h3 className="text-lg font-bold font-serif-luxury text-white">
                    {lang === 'ta' ? 'உங்கள் பேக்கேஜ் விவரம்' : 'Stay Summary'}
                  </h3>
                </div>

                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5" />
                </span>
              </div>

              {/* Selected Villa Item */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white">
                      {lang === 'ta' && selectedRoom.nameTa ? selectedRoom.nameTa : selectedRoom.name}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {formatPrice(selectedRoom.price)} × {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-stone-200">
                    {formatPrice(villaSubtotal)}
                  </div>
                </div>

                {/* Excursions Breakdown */}
                {selectedExcursions.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {lang === 'ta' ? 'சுற்றுலாக்கள்' : 'Excursions'} ({selectedExcursions.length})
                    </span>
                    {selectedExcursions.map(id => {
                      const item = RESORT_EXPERIENCES.find(e => e.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-stone-300 text-[11px]">
                          <span className="truncate max-w-[180px]">{lang === 'ta' && item.titleTa ? item.titleTa : item.title}</span>
                          <span className="font-mono text-stone-300">{formatPrice(item.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Spa Breakdown */}
                {selectedSpa.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {lang === 'ta' ? 'ஆயுர்வேத ஸ்பா' : 'Ayurveda Therapies'} ({selectedSpa.length})
                    </span>
                    {selectedSpa.map(id => {
                      const item = RESORT_SPA.find(s => s.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-stone-300 text-[11px]">
                          <span className="truncate max-w-[180px]">{lang === 'ta' && item.nameTa ? item.nameTa : item.name}</span>
                          <span className="font-mono text-stone-300">{formatPrice(item.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Perks Breakdown */}
                {selectedPerks.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {lang === 'ta' ? 'விஐபி வசதிகள்' : 'VIP Butler Perks'} ({selectedPerks.length})
                    </span>
                    {selectedPerks.map(id => {
                      const item = ADD_ONS.find(p => p.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-stone-300 text-[11px]">
                          <span className="truncate max-w-[180px]">{lang === 'ta' && item.nameTa ? item.nameTa : item.name}</span>
                          <span className="font-mono text-stone-300">{formatPrice(item.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>{lang === 'ta' ? 'மொத்த கட்டணம் (தள்ளுபடிக்கு முன்):' : 'Gross A-La-Carte Total:'}</span>
                  <span className="font-mono">{formatPrice(grossTotal)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-emerald-300 font-bold bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-amber-400" />
                      <span>{discountPercent}% Combo Bundle Savings:</span>
                    </div>
                    <span className="font-mono text-amber-300">- {formatPrice(comboDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>12% Resort GST & Hill Cess:</span>
                  <span className="font-mono">{formatPrice(gstAmount)}</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <span className="text-stone-300 text-xs font-semibold block">
                      {lang === 'ta' ? 'இறுதிக் கட்டணம்:' : 'All-Inclusive Net:'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      (Saved {formatPrice(comboDiscountAmount)})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-serif-luxury text-emerald-300">
                      {formatPrice(finalComboTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-stone-950 font-black text-sm transition-all duration-300 shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 fill-stone-950" />
                <span>{lang === 'ta' ? 'இந்த காம்போவை பதிவு செய்க' : 'Reserve Bespoke Combo'}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 text-center pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Free cancellation
                </span>
                <span>•</span>
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CONFIRMATION / CHECKOUT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-xl rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative bg-[#091b14] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSuccess(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleConfirmPackageBooking} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'ta' ? 'காம்போ முன்பதிவு படிவம்' : 'Bespoke Package Guarantee'}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif-luxury text-white mt-2">
                    {lang === 'ta' ? 'முன்பதிவு விவரங்களை உள்ளிடுக' : 'Finalize Your Mountain Stay'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    {selectedRoom.name} • {nights} Nights • {totalAddonItems} Curated Add-ons ({discountPercent}% Bundle Savings)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">{lang === 'ta' ? 'அறை வகை:' : 'Chalet:'}</span>
                    <span className="font-semibold text-white">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">{lang === 'ta' ? 'தங்கும் இரவுகள்:' : 'Duration:'}</span>
                    <span className="font-semibold text-white">{nights} Nights ({searchQuery.checkIn} to {searchQuery.checkOut})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">{lang === 'ta' ? 'சேர்க்கப்பட்ட அனுபவங்கள்:' : 'Included Experiences:'}</span>
                    <span className="font-semibold text-emerald-300 font-mono">{totalAddonItems} Activities & Perks</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-stone-300 font-bold">{lang === 'ta' ? 'செலுத்த வேண்டிய தொகை:' : 'Grand Combo Net:'}</span>
                    <span className="text-xl font-bold font-serif-luxury text-emerald-300">
                      {formatPrice(finalComboTotal)}
                    </span>
                  </div>
                </div>

                {/* Guest Input Fields */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">
                      {lang === 'ta' ? 'முதன்மை விருந்தினர் பெயர் *' : 'Primary Guest Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={guestForm.name}
                      onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400 text-xs"
                      placeholder="e.g. Vimal Karthik"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">
                        {lang === 'ta' ? 'தொலைபேசி எண் *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestForm.phone}
                        onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400 text-xs"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">
                        {lang === 'ta' ? 'மின்னஞ்சல் முகவரி *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={guestForm.email}
                        onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400 text-xs"
                        placeholder="guest@example.com"
                      />
                    </div>
                  </div>

                  {/* Payment selection */}
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">
                      {lang === 'ta' ? 'பணம் செலுத்தும் முறை' : 'Payment Preference'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setGuestForm({ ...guestForm, paymentMethod: 'upi' })}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          guestForm.paymentMethod === 'upi'
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                            : 'bg-stone-900/60 border-white/10 text-stone-400 hover:text-white'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="text-[11px] font-bold">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGuestForm({ ...guestForm, paymentMethod: 'card' })}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          guestForm.paymentMethod === 'card'
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                            : 'bg-stone-900/60 border-white/10 text-stone-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[11px] font-bold">Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGuestForm({ ...guestForm, paymentMethod: 'resort' })}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          guestForm.paymentMethod === 'resort'
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                            : 'bg-stone-900/60 border-white/10 text-stone-400 hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[11px] font-bold">Pay at Resort</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-stone-950 font-black text-sm transition-all shadow-xl shadow-emerald-950/80 cursor-pointer"
                >
                  {lang === 'ta' ? 'முன்பதிவை உறுதிசெய்க' : 'Authorize & Confirm Combo Reservation'}
                </button>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
                    {confirmedBookingData?.bookingId}
                  </span>
                  <h3 className="text-2xl font-bold font-serif-luxury text-white">
                    {lang === 'ta' ? 'காம்போ முன்பதிவு உறுதியானது!' : 'Bespoke Nilgiri Combo Confirmed!'}
                  </h3>
                  <p className="text-xs text-stone-300 max-w-md mx-auto">
                    {lang === 'ta'
                      ? 'உங்கள் பிரத்யேக தங்கும் பேக்கேஜ் முன்பதிவு வெற்றிகரமாக முடிந்தது. அனைத்து சேர்க்கப்பட்ட சுற்றுலாக்களும் பட்டலர் குழுவிற்கு அறிவிக்கப்பட்டுள்ளது.'
                      : 'Your curated all-inclusive Nilgiri itinerary has been secured. Your dedicated mountain butler has been assigned to coordinate your private excursions and therapies.'}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (confirmedBookingData) {
                        setSelectedInvoiceBooking(confirmedBookingData);
                        printResortBill(confirmedBookingData);
                      }
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'வரி ரசீது அச்சிடுக' : 'Print Hotel Tax Invoice'}</span>
                  </button>

                  <a
                    href="#my-bookings"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ta' ? 'என் முன்பதிவுகள்' : 'View in My Bookings'}</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

// Helper for perk name localization
const perkName = (item, lang) => {
  return lang === 'ta' && item.nameTa ? item.nameTa : item.name;
};

export default PackageBuilder;
