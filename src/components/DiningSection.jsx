import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { DINING_ITEMS } from '../data/resortData';
import { Utensils, Sparkles, Plus, Clock, Calendar, Check, Coffee, Flame } from 'lucide-react';

const DiningSection = () => {
  const { lang, t, addToDiningCart, showToast } = useResort();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  
  // Table reservation form state
  const [reservation, setReservation] = useState({
    date: new Date().toISOString().split('T')[0],
    time: 'Sunset High Tea (05:00 PM)',
    guests: 2,
    restaurant: 'The Tea Nest Deck',
    specialNote: ''
  });

  const categories = [
    'All',
    'Ooty Specialties',
    'Beverages & Chocolates',
    'High Tea',
    'International'
  ];

  const filteredItems = selectedCategory === 'All'
    ? DINING_ITEMS
    : DINING_ITEMS.filter(item => item.category === selectedCategory);

  const handleTableReservation = (e) => {
    e.preventDefault();
    showToast(
      lang === 'ta'
        ? `${reservation.restaurant} இல் ${reservation.guests} பேருக்கான டேபிள் முன்பதிவு செய்யப்பட்டது!`
        : `Table reserved at ${reservation.restaurant} for ${reservation.guests} guests on ${reservation.date}!`
    );
    setIsTableModalOpen(false);
  };

  return (
    <section id="dining" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'மலை உணவுகள் & சுவைகள்' : 'Nilgiri Gastronomy'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
            {t.diningHeading}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.diningSub}
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/60 transition-all border border-amber-400/30"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.reserveTable}</span>
            </button>
          </div>
        </div>

        {/* 3 Restaurant Concepts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-serif-luxury text-white">The Tea Nest Deck</h3>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Open-air wooden deck overhanging tea bushes. Renowned for English afternoon High Tea, warm scones, and single-estate brews.
            </p>
            <span className="text-[11px] text-emerald-400 font-mono mt-4 block">Open 7:00 AM – 10:30 PM</span>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/60 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-serif-luxury text-white">Fire & Pine Mountain Grill</h3>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Granite fire-pit dining featuring smoky wood-fired pizzas, sizzlers, and Nilgiri spiced Badaga culinary heritage dishes.
            </p>
            <span className="text-[11px] text-amber-400 font-mono mt-4 block">Open 6:30 PM – 11:30 PM</span>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-teal-900/60 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-serif-luxury text-white">Ooty Cocoa Bakehouse</h3>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Freshly tempered handmade Ooty chocolates, hot spiced spiced chocolate, roasted nut pralines, and mountain berry tortes.
            </p>
            <span className="text-[11px] text-teal-400 font-mono mt-4 block">Open 9:00 AM – 9:00 PM</span>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-[#09140f] rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif-luxury text-white">
                {t.inVillaDining}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Delivered steaming hot to your private chalet or fireside veranda.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-stone-200">
                      {item.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className={`w-2.5 h-2.5 rounded-full ${item.veg ? 'bg-emerald-400 ring-2 ring-emerald-500/30' : 'bg-red-400 ring-2 ring-red-500/30'}`}
                      title={item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    />
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {lang === 'ta' ? item.nameTa : item.name}
                    </h4>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/5">
                  <span className="text-base font-bold font-serif-luxury text-emerald-300">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => addToDiningCart(item)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'அறைக்கு ஆர்டர்' : 'Add to Tray'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Table Reservation Modal */}
        {isTableModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsTableModalOpen(false)} 
            />
            <div className="relative w-full max-w-lg bg-[#0c1813] border border-amber-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl animate-scaleUp text-stone-100">
              <h3 className="text-2xl font-bold font-serif-luxury text-white mb-1">
                {lang === 'ta' ? 'டேபிள் முன்பதிவு' : 'Reserve an Estate Table'}
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Experience panoramic mountain vistas while dining on fresh Nilgiri farm produce.
              </p>

              <form onSubmit={handleTableReservation} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">Restaurant Venue</label>
                  <select
                    value={reservation.restaurant}
                    onChange={(e) => setReservation({ ...reservation, restaurant: e.target.value })}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="The Tea Nest Deck">The Tea Nest Deck (High Tea & Panoramic Dining)</option>
                    <option value="Fire & Pine Mountain Grill">Fire & Pine Mountain Grill (Campfire BBQ)</option>
                    <option value="Ooty Cocoa Bakehouse">Ooty Cocoa Bakehouse (Artisan Chocolate Lounge)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-emerald-400 block mb-1.5">Date</label>
                    <input
                      type="date"
                      value={reservation.date}
                      onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-emerald-400 block mb-1.5">Guests</label>
                    <select
                      value={reservation.guests}
                      onChange={(e) => setReservation({ ...reservation, guests: Number(e.target.value) })}
                      className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none"
                    >
                      <option value={2}>2 Guests (Candlelight)</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests (Family Table)</option>
                      <option value={8}>8+ Guests (Celebration)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">Meal Timing</label>
                  <select
                    value={reservation.time}
                    onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none"
                  >
                    <option value="Breakfast in the Clouds (08:00 AM)">Breakfast in the Clouds (08:00 AM)</option>
                    <option value="Colonial Lunch (01:00 PM)">Colonial Lunch (01:00 PM)</option>
                    <option value="Sunset High Tea (05:00 PM)">Sunset High Tea (05:00 PM)</option>
                    <option value="Fireplace Starlit Dinner (08:00 PM)">Fireplace Starlit Dinner (08:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">Special Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Anniversary floral setup, Window view table"
                    value={reservation.specialNote}
                    onChange={(e) => setReservation({ ...reservation, specialNote: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTableModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                  >
                    {lang === 'ta' ? 'டேபிள் புக் செய்க' : 'Confirm Table'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default DiningSection;
