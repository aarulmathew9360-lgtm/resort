import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_ROOMS } from '../data/resortData';
import { 
  Users, 
  Maximize2, 
  Sparkles, 
  Star, 
  Flame, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const RoomsSection = () => {
  const { 
    lang, 
    t, 
    setSelectedRoom, 
    setCheckoutRoom, 
    setIsCheckoutOpen,
    searchQuery,
    formatPrice
  } = useResort();

  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = [
    { id: 'all', label: lang === 'ta' ? 'அனைத்து அறைகள்' : 'All Villas & Suites' },
    { id: 'fireplace', label: lang === 'ta' ? 'ஃபயர்பிளேஸ் அறைகள்' : 'With Fireplace' },
    { id: 'jacuzzi', label: lang === 'ta' ? 'ஜாக்குசி & பூல்' : 'Jacuzzi & Pool' },
    { id: 'heritage', label: lang === 'ta' ? 'பாரம்பரிய மர வில்லாக்கள்' : 'Heritage & Treehouse' }
  ];

  const filteredRooms = RESORT_ROOMS.filter(room => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fireplace') return room.badges.some(b => b.toLowerCase().includes('fireplace'));
    if (activeFilter === 'jacuzzi') return room.badges.some(b => b.toLowerCase().includes('jacuzzi') || b.toLowerCase().includes('pool'));
    if (activeFilter === 'heritage') return room.badges.some(b => b.toLowerCase().includes('colonial') || b.toLowerCase().includes('canopy'));
    return true;
  });

  const handleBookDirect = (room) => {
    setCheckoutRoom(room);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="villas" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'சொகுசு தங்குமிடம்' : 'Bespoke Sanctuaries'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white tracking-tight">
            {t.roomsHeading}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.roomsSub}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-105 border border-emerald-400/40'
                    : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-950/60 hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1813] via-transparent to-black/40" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#08120e]/80 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
                      {room.tag}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{room.rating}</span>
                  </div>

                  {/* View Details Hover Overlay Button */}
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? '360° பார்வை' : '360° Tour & Info'}</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                      {lang === 'ta' ? room.nameTa : room.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'ta' ? room.descriptionTa : room.description}
                    </p>
                  </div>

                  {/* Key specs */}
                  <div className="flex items-center gap-4 text-xs text-stone-300 border-y border-white/5 py-2.5">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{room.capacity.split('•')[0]}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-stone-600" />
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{room.sqft}</span>
                    </div>
                  </div>

                  {/* Badges / Amenities Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-0.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Booking Actions */}
              <div className="p-6 pt-0 border-t border-white/5 mt-2">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-stone-400 text-xs block">{lang === 'ta' ? 'ஒரு இரவுக்கு' : 'Starting from'}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-serif-luxury text-emerald-300">
                        {formatPrice(room.price)}
                      </span>
                      <span className="text-stone-400 text-xs">{t.night}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookDirect(room)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-1.5"
                  >
                    <span>{lang === 'ta' ? 'முன்பதிவு' : 'Book'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RoomsSection;
