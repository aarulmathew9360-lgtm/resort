import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_SPA } from '../data/resortData';
import { Sparkles, Clock, Calendar, CheckCircle2, HeartHandshake } from 'lucide-react';

const SpaSection = () => {
  const { lang, t, showToast } = useResort();
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [treatmentDate, setTreatmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [therapistGender, setTherapistGender] = useState('female');

  const handleBookSpa = (e) => {
    e.preventDefault();
    showToast(
      lang === 'ta'
        ? `${selectedTreatment.nameTa} அப்பாயிண்ட்மென்ட் வெற்றிகரமாக பதிவு செய்யப்பட்டது!`
        : `Spa therapy appointment confirmed for ${selectedTreatment.name}!`
    );
    setSelectedTreatment(null);
  };

  return (
    <section id="spa" className="py-24 relative z-20 bg-[#08120e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'ஆயுர்வேத சிகிச்சை' : 'Ancient Nilgiri Botanical Rejuvenation'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
            {t.spaHeading}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.spaSub}
          </p>
        </div>

        {/* Spa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESORT_SPA.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1813] via-transparent to-black/30" />
                  
                  <div className="absolute top-3 right-3 bg-black/60 px-2.5 py-1 rounded-full text-xs text-stone-200 backdrop-blur-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold font-serif-luxury text-white group-hover:text-emerald-300 transition-colors">
                    {lang === 'ta' ? item.nameTa : item.name}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {lang === 'ta' ? item.descriptionTa : item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 mt-2">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">{lang === 'ta' ? 'கட்டணம்' : 'Fee'}</span>
                    <span className="text-lg font-bold font-serif-luxury text-emerald-300">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTreatment(item)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-all border border-white/10 hover:border-emerald-500"
                  >
                    {lang === 'ta' ? 'புக் செய்க' : 'Book'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Spa Appointment Modal */}
        {selectedTreatment && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedTreatment(null)} 
            />
            <div className="relative w-full max-w-lg bg-[#0c1813] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl animate-scaleUp text-stone-100">
              <h3 className="text-2xl font-bold font-serif-luxury text-white mb-1">
                {lang === 'ta' ? selectedTreatment.nameTa : selectedTreatment.name}
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Duration: {selectedTreatment.duration} • Investment: ₹{selectedTreatment.price.toLocaleString('en-IN')}
              </p>

              <form onSubmit={handleBookSpa} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">
                    {lang === 'ta' ? 'தேதி' : 'Appointment Date'}
                  </label>
                  <input
                    type="date"
                    value={treatmentDate}
                    onChange={(e) => setTreatmentDate(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-400 block mb-1.5">
                    {lang === 'ta' ? 'சிகிச்சையாளர் முன்னுரிமை' : 'Therapist Preference'}
                  </label>
                  <select
                    value={therapistGender}
                    onChange={(e) => setTherapistGender(e.target.value)}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-400"
                  >
                    <option value="female">Female Ayurvedic Practitioner</option>
                    <option value="male">Male Ayurvedic Practitioner</option>
                    <option value="no-preference">No Preference • Certified Specialist</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300">
                  Includes herbal green tea welcome drink & post-therapy eucalyptus sauna access.
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTreatment(null)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                  >
                    {lang === 'ta' ? 'உறுதி செய்' : 'Confirm Appointment'}
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

export default SpaSection;
