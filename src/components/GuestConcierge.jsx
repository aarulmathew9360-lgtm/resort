import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Bell, 
  CalendarCheck, 
  Flame, 
  Coffee, 
  ThermometerSnowflake, 
  Car, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Send,
  Sparkles,
  QrCode,
  Printer,
  FileText
} from 'lucide-react';

const GuestConcierge = () => {
  const { 
    lang, 
    t, 
    confirmedBookings, 
    conciergeRequests, 
    addConciergeRequest, 
    showToast,
    setSelectedInvoiceBooking,
    printResortBill
  } = useResort();

  const [customRequest, setCustomRequest] = useState('');

  const quickServices = [
    { title: '🔥 Evening Fireplace Wood & Pine Cones', titleTa: 'விறகு ஃபயர்பிளேஸ் மூட்டம்', type: 'Fireplace' },
    { title: '☕ Spiced Hot Cocoa with Marshmallows', titleTa: 'சூடான மசாலா ஹாட் சாக்லேட்', type: 'Dining' },
    { title: '🛏 Extra Cashmere Blanket & 24°C Heater', titleTa: 'கூடுதல் கம்பளி & ரூம் ஹீட்டர்', type: 'Comfort' },
    { title: '🚖 Nilgiri Cab / Airport Drop Arrangement', titleTa: 'ஊட்டி டாக்ஸி / பிக்கப் கார்', type: 'Travel' },
    { title: '🌿 Morning Tea Plucking Guide Call', titleTa: 'காலை தேயிலைத் தோட்ட வாக்கிங்', type: 'Activity' }
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customRequest.trim()) return;
    addConciergeRequest(customRequest, 'Bespoke Request');
    setCustomRequest('');
  };

  return (
    <section id="my-bookings" className="py-24 relative z-20 bg-[#07100c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'விருந்தினர் சேவை மையம்' : 'Private Guest Concierge'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
            {t.navBookings} & {lang === 'ta' ? 'அறை சேவை' : 'Butler Desk'}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.conciergeSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Confirmed Bookings Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif-luxury text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'ta' ? 'உங்கள் உறுதி செய்யப்பட்ட முன்பதிவுகள்' : 'Active Mountain Reservations'}</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                {confirmedBookings.length} {confirmedBookings.length === 1 ? 'Stay' : 'Stays'}
              </span>
            </div>

            {confirmedBookings.length === 0 ? (
              <div className="glass-card rounded-3xl p-10 text-center text-stone-400 border border-white/5">
                <p className="text-sm">No reservations found yet.</p>
                <a href="#villas" className="text-xs text-emerald-400 hover:underline mt-2 inline-block">
                  Browse luxury chalets above & make your first booking
                </a>
              </div>
            ) : (
              confirmedBookings.map((booking) => (
                <div 
                  key={booking.bookingId}
                  className="glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-xl space-y-4 hover:border-emerald-400/50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono tracking-wider">
                        {booking.bookingId}
                      </span>
                      <h4 className="text-xl font-bold font-serif-luxury text-white">
                        {lang === 'ta' && booking.roomNameTa ? booking.roomNameTa : booking.roomName}
                      </h4>
                    </div>

                    <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{booking.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-stone-400 text-[10px]">Dates:</span>
                      <div className="font-bold text-white mt-0.5">{booking.checkIn} → {booking.checkOut}</div>
                      <div className="text-[10px] text-stone-400">({booking.nights} Nights)</div>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px]">Primary Guest:</span>
                      <div className="font-bold text-white mt-0.5">{booking.guestName}</div>
                      <div className="text-[10px] text-stone-400">{booking.guests} Guests</div>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px]">Total Paid/Guaranteed:</span>
                      <div className="font-bold text-emerald-300 font-serif-luxury text-sm mt-0.5">
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-400">All Taxes Included</div>
                    </div>
                  </div>

                  {booking.addOns && booking.addOns.length > 0 && (
                    <div className="text-xs text-stone-300 pt-1">
                      <span className="text-stone-400 text-[11px] font-semibold">Confirmed Add-Ons: </span>
                      {booking.addOns.join(' • ')}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <QrCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Digital Fast-Pass Active at Doddabetta Gate</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedInvoiceBooking(booking)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-medium text-[11px]"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View Tax Bill</span>
                      </button>
                      <button 
                        onClick={() => {
                          printResortBill(booking);
                          showToast("Opening Print / PDF Invoice dialog...");
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 text-[11px] shadow-sm"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print Bill</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Interactive Concierge Butler Service */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-white">
                  {lang === 'ta' ? '24/7 கான்சியர்ஜ் அறை உதவி' : '24/7 Hill Butler Service'}
                </h3>
                <p className="text-xs text-stone-400">Direct link to our Doddabetta team</p>
              </div>
            </div>

            {/* Quick Request Buttons */}
            <div className="space-y-2.5">
              <div className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider">
                {lang === 'ta' ? 'விரைவு சேவைகள்' : 'One-Tap Mountain Requests'}
              </div>

              {quickServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => addConciergeRequest(service.title, service.type)}
                  className="w-full p-3 rounded-2xl bg-white/5 hover:bg-emerald-950/60 border border-white/5 hover:border-emerald-500/30 text-left text-xs text-stone-200 transition-all flex items-center justify-between group"
                >
                  <span className="group-hover:text-emerald-300 transition-colors">
                    {lang === 'ta' ? service.titleTa : service.title}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
                    Request
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Request Input */}
            <form onSubmit={handleCustomSubmit} className="pt-2">
              <div className="text-[11px] uppercase font-bold text-stone-400 mb-1.5 tracking-wider">
                {lang === 'ta' ? 'வேறு ஏதேனும் தேவையா?' : 'Special Custom Request'}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Need badminton racquets, Wakeup call at 6 AM"
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white text-xs font-semibold flex items-center justify-center transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Recent Request Feed */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                {lang === 'ta' ? 'அண்மை கோரிக்கைகள்' : 'Recent Butler Activity'}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {conciergeRequests.map((req) => (
                  <div key={req.id} className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-200 line-clamp-1">{req.title}</div>
                      <div className="text-[10px] text-stone-400">{req.time}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default GuestConcierge;
