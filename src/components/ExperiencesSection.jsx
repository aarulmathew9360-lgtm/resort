import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_EXPERIENCES } from '../data/resortData';
import { Compass, Clock, Check, Sparkles, Calendar, Tag } from 'lucide-react';

const ExperiencesSection = () => {
  const { lang, t, showToast } = useResort();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookingSlot, setBookingSlot] = useState('Morning (08:30 AM)');

  const handleBookExperience = (exp) => {
    setSelectedExperience(exp);
  };

  const confirmExperienceReservation = (e) => {
    e.preventDefault();
    showToast(
      lang === 'ta'
        ? `${selectedExperience.titleTa} முன்பதிவு செய்யப்பட்டது (${bookingDate} - ${bookingSlot})!`
        : `Reserved: ${selectedExperience.title} for ${bookingDate} (${bookingSlot})!`
    );
    setSelectedExperience(null);
  };

  return (
    <section id="experiences" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'நீலகிரி சாகசங்கள்' : 'Unforgettable Nilgiri Journeys'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
            {t.experienceHeading}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.experienceSub}
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESORT_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1813] via-transparent to-black/40" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#08120e]/80 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
                    {exp.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-stone-200 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                    {lang === 'ta' ? exp.titleTa : exp.title}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {lang === 'ta' ? exp.descriptionTa : exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {exp.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-stone-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0 border-t border-white/5">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">{lang === 'ta' ? 'கட்டணம்' : 'Price'}</span>
                    <span className="text-xl font-bold font-serif-luxury text-emerald-300">
                      ₹{exp.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-400"> / guest</span>
                  </div>

                  <button
                    onClick={() => handleBookExperience(exp)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-all border border-white/15 hover:border-emerald-500"
                  >
                    {lang === 'ta' ? 'புக் செய்க' : 'Book Tour'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Experience Booking */}
        {selectedExperience && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedExperience(null)} 
            />
            <div className="relative w-full max-w-lg bg-[#0c1813] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl animate-scaleUp text-stone-100">
              <h3 className="text-2xl font-bold font-serif-luxury text-white mb-1">
                {lang === 'ta' ? selectedExperience.titleTa : selectedExperience.title}
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                {selectedExperience.duration} • ₹{selectedExperience.price.toLocaleString('en-IN')} per guest
              </p>

              <form onSubmit={confirmExperienceReservation} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">
                    {lang === 'ta' ? 'விருப்பமான தேதி' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">
                    {lang === 'ta' ? 'நேர இடைவெளி' : 'Preferred Slot'}
                  </label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-400 [&>option]:bg-[#0c1813]"
                  >
                    <option value="Morning (08:30 AM)">Morning (08:30 AM) • Best for Clouds</option>
                    <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM) • Mild Weather</option>
                    <option value="Sunset / Evening (05:00 PM)">Sunset / Evening (05:00 PM) • Golden Hour</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedExperience(null)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                  >
                    {lang === 'ta' ? 'முன்பதிவை உறுதிசெய்' : 'Confirm Tour'}
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

export default ExperiencesSection;
