import React from 'react';
import { useResort } from '../context/ResortContext';
import { Calendar, Users, Home, Search, ShieldCheck, Sparkles } from 'lucide-react';

const BookingBar = () => {
  const { searchQuery, setSearchQuery, lang, showToast } = useResort();

  const handleSearch = (e) => {
    e.preventDefault();
    showToast(
      lang === 'ta' 
        ? `${searchQuery.guests} விருந்தினர்களுக்கான அறைகள் கிடைக்கின்றன!` 
        : `Found available luxury villas for ${searchQuery.guests} guests!`
    );
    // Smooth scroll down to villas section
    const elem = document.getElementById('villas');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 sm:-mt-20 relative z-30 px-4">
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-emerald-500/30 backdrop-blur-2xl">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* Check-In */}
          <div className="bg-black/30 hover:bg-black/40 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-3.5 transition-all">
            <label className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              {lang === 'ta' ? 'வரும்தேதி (Check-in)' : 'Check-In Date'}
            </label>
            <input
              type="date"
              value={searchQuery.checkIn}
              onChange={(e) => setSearchQuery({ ...searchQuery, checkIn: e.target.value })}
              className="bg-transparent text-white font-medium text-sm focus:outline-none w-full cursor-pointer"
            />
          </div>

          {/* Check-Out */}
          <div className="bg-black/30 hover:bg-black/40 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-3.5 transition-all">
            <label className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              {lang === 'ta' ? 'வெளியேறும் தேதி (Check-out)' : 'Check-Out Date'}
            </label>
            <input
              type="date"
              value={searchQuery.checkOut}
              onChange={(e) => setSearchQuery({ ...searchQuery, checkOut: e.target.value })}
              className="bg-transparent text-white font-medium text-sm focus:outline-none w-full cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="bg-black/30 hover:bg-black/40 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-3.5 transition-all">
            <label className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              {lang === 'ta' ? 'விருந்தினர்கள்' : 'Guests & Rooms'}
            </label>
            <select
              value={searchQuery.guests}
              onChange={(e) => setSearchQuery({ ...searchQuery, guests: Number(e.target.value) })}
              className="bg-transparent text-white font-medium text-sm focus:outline-none w-full cursor-pointer [&>option]:bg-[#0c1813] [&>option]:text-white"
            >
              <option value={1}>1 Guest • Solo Retreat</option>
              <option value={2}>2 Guests • Couple Stay</option>
              <option value={3}>3 Guests • Small Family</option>
              <option value={4}>4 Guests • Family Suite</option>
              <option value={6}>6 Guests • Estate Villa</option>
              <option value={8}>8 Guests • Kurunji Royal</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full h-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm tracking-wider uppercase transition-all shadow-xl shadow-emerald-950/70 hover:shadow-emerald-900/50 flex items-center justify-center gap-2 border border-emerald-400/40 group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{lang === 'ta' ? 'அறைகளைத் தேடுக' : 'Find Available Villas'}</span>
            </button>
          </div>
        </form>

        {/* Value Propositions Under Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-300">
          <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ta' ? 'சிறந்த விலை உத்தரவாதம் • கூடுதல் கட்டணமில்லை' : 'Best Direct Booking Rate Guaranteed'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ta' ? 'இலவச தேயிலைத் தோட்ட ஹை-டீ மற்றும் காலை உணவு' : 'Complimentary Plantation High Tea Included'}</span>
          </div>
          <div className="text-stone-400 hidden md:block">
            {lang === 'ta' ? '48 மணிநேரம் வரை இலவச ரத்து' : 'Free Cancellation up to 48 hrs before arrival'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;
