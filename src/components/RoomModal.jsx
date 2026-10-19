import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  X, 
  Star, 
  Users, 
  Maximize2, 
  Mountain, 
  Flame, 
  Sparkles, 
  Check, 
  Shield, 
  Coffee, 
  Calendar,
  RotateCw,
  Heart
} from 'lucide-react';

const RoomModal = () => {
  const { 
    selectedRoom, 
    setSelectedRoom, 
    lang, 
    searchQuery, 
    setIsCheckoutOpen, 
    setCheckoutRoom,
    showToast,
    formatPrice
  } = useResort();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!selectedRoom) return null;

  // Calculate nights
  const checkInDate = new Date(searchQuery.checkIn);
  const checkOutDate = new Date(searchQuery.checkOut);
  const nights = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const totalBasePrice = selectedRoom.price * nights;
  const taxes = Math.round(totalBasePrice * 0.12);
  const grandTotal = totalBasePrice + taxes;

  const handleStartBooking = () => {
    setCheckoutRoom(selectedRoom);
    setSelectedRoom(null);
    setIsCheckoutOpen(true);
  };

  const images = selectedRoom.gallery && selectedRoom.gallery.length > 0 
    ? selectedRoom.gallery 
    : [selectedRoom.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedRoom(null)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-stone-100">
        <div className="relative w-full max-w-4xl bg-[#0c1813] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 animate-scaleUp">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedRoom(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media Header (Gallery & 360 Tour) */}
          <div className="relative h-72 sm:h-96 w-full bg-black overflow-hidden">
            {is360Mode ? (
              <div className="w-full h-full relative flex items-center justify-center bg-stone-900 select-none">
                <img
                  src={images[activeImageIndex]}
                  alt="360 view preview"
                  className="w-full h-full object-cover transition-transform duration-100"
                  style={{ transform: `scale(1.15) rotate(${rotationAngle / 15}deg)` }}
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-between p-6">
                  <div className="px-3 py-1 rounded-full bg-black/70 border border-emerald-400 text-xs text-emerald-300 font-mono flex items-center gap-2">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>360° Virtual Panoramic View Simulation</span>
                  </div>
                  <div className="w-full max-w-md bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                    <div className="flex justify-between text-[11px] text-stone-300 mb-1">
                      <span>Rotate Perspective</span>
                      <span>{rotationAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={images[activeImageIndex]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                {selectedRoom.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 border border-white/10 text-white backdrop-blur-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {selectedRoom.rating} ({selectedRoom.reviewsCount} reviews)
              </span>
            </div>

            {/* 360 Toggle Button */}
            <button
              onClick={() => setIs360Mode(!is360Mode)}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{is360Mode ? 'Standard Photos' : '360° Virtual Spin'}</span>
            </button>

            {/* Gallery Thumbnails */}
            {!is360Mode && images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-400 scale-105' : 'border-white/40 opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                  {lang === 'ta' ? selectedRoom.nameTa : selectedRoom.name}
                </h3>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                  {lang === 'ta' ? selectedRoom.descriptionTa : selectedRoom.description}
                </p>
              </div>

              {/* Price Tag */}
              <div className="shrink-0 sm:text-right bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl">
                <div className="text-stone-400 text-xs">Rate per night</div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-serif-luxury">
                  {formatPrice(selectedRoom.price)}
                </div>
                <div className="text-[11px] text-stone-400">Includes breakfast & high tea</div>
              </div>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-3 gap-3 text-center bg-black/40 p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <div className="text-stone-400">Capacity</div>
                <div className="font-semibold text-white mt-1">{selectedRoom.capacity}</div>
              </div>
              <div>
                <div className="text-stone-400">Chalet Size</div>
                <div className="font-semibold text-white mt-1">{selectedRoom.sqft}</div>
              </div>
              <div>
                <div className="text-stone-400">View</div>
                <div className="font-semibold text-white mt-1">{selectedRoom.view}</div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {lang === 'ta' ? 'அறையின் ஆடம்பர வசதிகள்' : 'Chalet Amenities & Inclusions'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedRoom.amenities.map((amenity, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-2.5 rounded-xl border border-white/5"
                  >
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mountain House Notes */}
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-200/90 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <Flame className="w-4 h-4" />
                {lang === 'ta' ? 'ஊட்டி குளிர்கால குறிப்பு' : 'Nilgiri Hill-Station Stay Perks'}
              </div>
              <p>
                {lang === 'ta' 
                  ? 'தினமும் மாலை 5:30 மணிக்கு உங்கள் அறையின் ஃபயர்பிளேஸ் விறகுகளை பணியாளர்கள் பற்ற வைப்பார்கள். பிரத்யேக ஹீட்டர் 22°C இல் இயக்கப்படும்.' 
                  : 'Chalet fireplace lit by our butler team daily at 5:30 PM with pine logs. Thermostat pre-heated to cozy 22°C before your arrival.'}
              </p>
            </div>

            {/* Footer Calculation & Booking CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-stone-400">
                  {nights} Nights ({searchQuery.checkIn} to {searchQuery.checkOut})
                </div>
                <div className="text-lg font-bold text-white">
                  Total: {formatPrice(grandTotal)} <span className="text-xs font-normal text-stone-400">(incl. 12% GST)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    showToast(isLiked ? "Removed from Wishlist" : "Saved to Mountain Wishlist");
                  }}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    isLiked ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-white/5 border-white/10 text-stone-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-400' : ''}`} />
                </button>

                <button
                  onClick={handleStartBooking}
                  className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{lang === 'ta' ? 'இந்த அறையை புக் செய்க' : 'Proceed to Reserve'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
