import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Building2, 
  CalendarCheck, 
  Users, 
  DollarSign, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  TrendingUp, 
  Utensils, 
  Home, 
  ShieldAlert, 
  Check, 
  Percent,
  Download,
  Flame,
  Volume2,
  Crown,
  Printer,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    currentUser, 
    logout, 
    setViewMode, 
    confirmedBookings, 
    updateBookingStatus, 
    deleteBooking,
    addBooking,
    conciergeRequests, 
    updateConciergeStatus,
    villaInventory,
    updateVillaStatus,
    kitchenOrders,
    updateKitchenOrderStatus,
    pricingMultiplier,
    setPricingMultiplier,
    formatPrice,
    isAudioPlaying,
    toggleAudio,
    showToast,
    setSelectedInvoiceBooking,
    lang
  } = useResort();

  const [activeTab, setActiveTab] = useState('bookings'); // bookings, concierge, villas, kitchen, analytics
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  // New Walk-in form state
  const [walkIn, setWalkIn] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    roomName: 'The Cloud-Mist Glasshouse Chalet',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    guests: 2,
    amount: 49000,
    paymentStatus: 'Paid at Counter'
  });

  // Calculate high-level metrics
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const pendingRequestsCount = conciergeRequests.filter(r => r.status !== 'Completed & Verified').length;
  const occupiedVillasCount = villaInventory.filter(v => v.operationalStatus === 'Occupied').length;
  const totalVillas = villaInventory.length;
  const occupancyRate = Math.round((occupiedVillasCount / totalVillas) * 100);

  // Filter bookings
  const filteredBookings = confirmedBookings.filter(b => {
    const matchesSearch = 
      b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (bookingFilter === 'all') return matchesSearch;
    if (bookingFilter === 'checked-in') return matchesSearch && b.status.toLowerCase().includes('checked in');
    if (bookingFilter === 'confirmed') return matchesSearch && b.status.toLowerCase().includes('confirmed');
    return matchesSearch;
  });

  const handleCreateWalkIn = (e) => {
    e.preventDefault();
    if (!walkIn.guestName) return;

    const newBookingObj = {
      bookingId: `OOTY-${Math.floor(1000 + Math.random() * 9000)}-WALK`,
      roomName: walkIn.roomName,
      checkIn: walkIn.checkIn,
      checkOut: walkIn.checkOut,
      nights: 2,
      guests: walkIn.guests,
      totalAmount: Number(walkIn.amount),
      status: "Checked In",
      paymentStatus: walkIn.paymentStatus,
      guestName: walkIn.guestName,
      guestPhone: walkIn.guestPhone || "+91 90000 00000",
      guestEmail: walkIn.guestEmail || "walkin@guest.com",
      addOns: ["Immediate Chalet Express Check-In"],
      createdAt: new Date().toISOString().split('T')[0]
    };

    addBooking(newBookingObj);
    setIsWalkInModalOpen(false);
    showToast(`VIP Walk-In Reservation ${newBookingObj.bookingId} generated & checked in!`);
  };

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "BookingID,GuestName,Chalet,CheckIn,CheckOut,Amount,Status\n"
      + confirmedBookings.map(b => `"${b.bookingId}","${b.guestName}","${b.roomName}","${b.checkIn}","${b.checkOut}","${b.totalAmount}","${b.status}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nilgiri_Mist_Reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported reservations report to CSV!");
  };

  return (
    <div className="min-h-screen bg-[#070f0b] text-stone-100 font-sans pb-20">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#060c09]/95 backdrop-blur-2xl border-b border-emerald-500/20 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Operational Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-900 font-bold shadow-lg shadow-amber-950/60">
              <Crown className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white tracking-widest text-base">
                  NILGIRI MIST • OPERATIONS HUB
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <span className="text-[11px] text-stone-400">
                Doddabetta Ridge, Ooty • 7,400 ft • General Manager Control Desk
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Ambient sound toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                isAudioPlaying 
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
              }`}
              title="Toggle Mountain Forest Audio"
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{isAudioPlaying ? 'Sound Active' : 'Sound Muted'}</span>
            </button>

            {/* User Profile Chip */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                alt="Admin Avatar"
                className="w-6 h-6 rounded-full object-cover border border-amber-400/50"
              />
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-white leading-none">{currentUser?.name || 'General Manager'}</div>
                <span className="text-[10px] text-amber-300">{currentUser?.badge || 'Administrator'}</span>
              </div>
            </div>

            {/* Exit to Public Guest Resort View */}
            <button
              onClick={() => setViewMode('resort')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Guest View</span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/60 text-stone-400 hover:text-rose-300 border border-white/10"
              title="Sign Out"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Top 4 Real-time KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* KPI 1: Occupancy Rate */}
          <div className="glass-panel rounded-3xl p-5 border border-emerald-500/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Current Occupancy</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-serif-luxury text-white">
                {occupancyRate}%
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{occupiedVillasCount} of {totalVillas} Chalets Booked Today</span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>

          {/* KPI 2: Total Revenue */}
          <div className="glass-panel rounded-3xl p-5 border border-amber-500/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Active Bookings Value</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-serif-luxury text-amber-300">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Across {confirmedBookings.length} confirmed stays
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span>+18.4% growth vs previous month in Nilgiris</span>
            </div>
          </div>

          {/* KPI 3: Butler Tasks Desk */}
          <div className="glass-panel rounded-3xl p-5 border border-sky-500/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Concierge Desk Tasks</span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300">
                <Bell className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-serif-luxury text-white">
                {pendingRequestsCount} <span className="text-sm font-normal text-stone-400">Pending</span>
              </div>
              <div className="text-xs text-sky-300 mt-1">
                Avg. Butler Dispatch Time: 6 mins
              </div>
            </div>
            <div className="text-[10px] text-stone-400">
              100% resolution rate for fireplace and room comforts
            </div>
          </div>

          {/* KPI 4: Dynamic Season Pricing */}
          <div className="glass-panel rounded-3xl p-5 border border-teal-500/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Dynamic Pricing Mode</span>
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                <Percent className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-300 font-mono">
                {pricingMultiplier === 1.0 ? '1.0x (Standard)' : `${pricingMultiplier}x (Active)`}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Live multiplier applied to all chalets
              </div>
            </div>
            <div className="flex gap-1.5 pt-1">
              <button
                onClick={() => { setPricingMultiplier(1.0); showToast("Set Standard Rates (1.0x)"); }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${pricingMultiplier === 1.0 ? 'bg-teal-500 text-black' : 'bg-white/5 text-stone-400'}`}
              >
                1.0x
              </button>
              <button
                onClick={() => { setPricingMultiplier(1.20); showToast("Weekend Surge Enabled (+20%)"); }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${pricingMultiplier === 1.20 ? 'bg-amber-500 text-black' : 'bg-white/5 text-stone-400'}`}
              >
                1.2x Peak
              </button>
              <button
                onClick={() => { setPricingMultiplier(0.85); showToast("Monsoon Mist Discount Active (-15%)"); }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${pricingMultiplier === 0.85 ? 'bg-emerald-500 text-black' : 'bg-white/5 text-stone-400'}`}
              >
                0.85x Promo
              </button>
            </div>
          </div>

        </div>

        {/* Navigation Tabs for Operations Hub */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'bookings'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reservations Desk ({confirmedBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'concierge'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Butler Dispatch Desk ({pendingRequestsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('villas')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'villas'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Chalet Inventory ({totalVillas})</span>
            </button>

            <button
              onClick={() => setActiveTab('kitchen')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'kitchen'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Kitchen & In-Villa Dining ({kitchenOrders.length})</span>
            </button>
          </div>

          {/* Quick Actions (Export / Walk-in) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-950/60 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Walk-In Stay</span>
            </button>
          </div>
        </div>

        {/* TAB 1: RESERVATIONS MASTER DESK */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search guest, chalet, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex gap-1.5 self-start sm:self-auto text-xs">
                {['all', 'confirmed', 'checked-in'].map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setBookingFilter(flt)}
                    className={`px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                      bookingFilter === flt
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/5 text-stone-400 hover:text-white'
                    }`}
                  >
                    {flt.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-3xl border border-emerald-500/20 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-[#050c09] text-[10px] text-emerald-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Guest Details</th>
                      <th className="p-4">Reserved Chalet</th>
                      <th className="p-4">Dates & Duration</th>
                      <th className="p-4">Revenue</th>
                      <th className="p-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-300">
                          {b.bookingId}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{b.guestName}</div>
                          <div className="text-[11px] text-stone-400">{b.guestPhone}</div>
                          <div className="text-[10px] text-stone-500">{b.guestEmail}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-white">{b.roomName}</div>
                          <div className="text-[10px] text-emerald-400">{b.guests} Guests</div>
                          {b.addOns && b.addOns.length > 0 && (
                            <div className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">
                              + {b.addOns[0]}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">{b.checkIn} → {b.checkOut}</div>
                          <div className="text-[10px] text-stone-400">{b.nights} Nights</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-emerald-300 font-serif-luxury text-sm">
                            ₹{b.totalAmount.toLocaleString('en-IN')}
                          </div>
                          <span className="text-[10px] text-stone-400">{b.paymentStatus || 'Online'}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.bookingId, e.target.value)}
                              className="bg-[#0c1813] border border-white/15 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-400"
                            >
                              <option value="Confirmed & Guaranteed">Confirmed</option>
                              <option value="Checked In">Checked In</option>
                              <option value="Checked Out">Checked Out</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => setSelectedInvoiceBooking(b)}
                              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-950/60 border border-emerald-500/20"
                              title="View & Print Official Tax Bill"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => deleteBooking(b.bookingId)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/40"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BUTLER DISPATCH QUEUE */}
        {activeTab === 'concierge' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-white">Live Guest Butler Dispatch Queue</h3>
                <p className="text-xs text-stone-400">Immediate fulfillment for fireplace logs, heaters, hot cocoa and cab service.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conciergeRequests.map((req) => (
                <div
                  key={req.id}
                  className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                      {req.type}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {req.time}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white leading-snug">{req.title}</h4>
                    <p className="text-xs text-amber-300 mt-1 font-medium">{req.guest}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Assigned Butler:</span>
                      <span className="font-semibold text-white">{req.assignedButler || 'Staff on duty'}</span>
                    </div>

                    <select
                      value={req.status}
                      onChange={(e) => updateConciergeStatus(req.id, e.target.value)}
                      className="bg-[#0c1813] border border-white/15 rounded-xl px-2 py-1 text-xs text-white"
                    >
                      <option value="Butler Dispatched">Dispatched</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed & Verified">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHALETS & INVENTORY CONTROL */}
        {activeTab === 'villas' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold font-serif-luxury text-white">Chalet Inventory & Operational Status</h3>
              <p className="text-xs text-stone-400">Toggle chalets between Available, Occupied, and Housekeeping maintenance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {villaInventory.map((villa) => (
                <div
                  key={villa.id}
                  className="glass-card rounded-3xl p-5 border border-white/10 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">{villa.chaletNumber}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        villa.operationalStatus === 'Occupied' 
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                          : villa.operationalStatus === 'Reserved'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {villa.operationalStatus}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serif-luxury text-white">{villa.name}</h4>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">{villa.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-300">
                      <span>Rate per Night:</span>
                      <span className="font-bold text-emerald-300 font-serif-luxury">
                        ₹{(villa.price * pricingMultiplier).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-stone-400">Set Status:</span>
                      <div className="flex gap-1">
                        {['Available', 'Occupied', 'Cleaning'].map((st) => (
                          <button
                            key={st}
                            onClick={() => updateVillaStatus(villa.id, st)}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              villa.operationalStatus === st
                                ? 'bg-emerald-600 text-white font-bold'
                                : 'bg-white/5 text-stone-400 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KITCHEN & IN-VILLA ORDERS DESK */}
        {activeTab === 'kitchen' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold font-serif-luxury text-white">Live Kitchen In-Villa Dining Pipeline</h3>
              <p className="text-xs text-stone-400">Track orders from chef prep to butler doorstep arrival.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {kitchenOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-panel rounded-3xl p-6 border border-amber-500/20 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-400">{ord.id}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{ord.room}</h4>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {ord.status}
                    </span>
                  </div>

                  <div className="bg-black/30 rounded-2xl p-3 border border-white/5 space-y-1 text-xs">
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold mb-1">Items:</span>
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-stone-200">
                        <span>• {it.name}</span>
                        <span className="font-bold text-emerald-300">x{it.qty}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white">
                      <span>Order Total:</span>
                      <span className="text-emerald-300">₹{ord.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-stone-400">{ord.orderedAt}</span>
                    <div className="flex gap-1.5">
                      {['Cooking in Kitchen', 'Butler Delivery', 'Delivered'].map((st) => (
                        <button
                          key={st}
                          onClick={() => updateKitchenOrderStatus(ord.id, st)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold ${
                            ord.status === st
                              ? 'bg-amber-500 text-stone-900 font-bold'
                              : 'bg-white/5 text-stone-400 hover:text-white'
                          }`}
                        >
                          {st.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Walk-in Booking Modal */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsWalkInModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0c1813] border border-amber-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl animate-scaleUp text-stone-100">
            <h3 className="text-2xl font-bold font-serif-luxury text-white mb-1">Record Immediate VIP Walk-In Stay</h3>
            <p className="text-xs text-stone-400 mb-6">Create instant reservation & check-in directly at front office.</p>

            <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="text-stone-300 font-semibold block mb-1">Guest Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Senthil Nathan"
                  value={walkIn.guestName}
                  onChange={(e) => setWalkIn({ ...walkIn, guestName: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 font-semibold block mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={walkIn.guestPhone}
                    onChange={(e) => setWalkIn({ ...walkIn, guestPhone: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-stone-300 font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="guest@ooty.com"
                    value={walkIn.guestEmail}
                    onChange={(e) => setWalkIn({ ...walkIn, guestEmail: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-300 font-semibold block mb-1">Select Chalet</label>
                <select
                  value={walkIn.roomName}
                  onChange={(e) => setWalkIn({ ...walkIn, roomName: e.target.value })}
                  className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white focus:outline-none [&>option]:bg-[#0c1813]"
                >
                  {villaInventory.map((v) => (
                    <option key={v.id} value={v.name}>{v.name} ({v.chaletNumber})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 font-semibold block mb-1">Total Bill (INR)</label>
                  <input
                    type="number"
                    value={walkIn.amount}
                    onChange={(e) => setWalkIn({ ...walkIn, amount: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white focus:outline-none font-bold text-amber-300"
                    required
                  />
                </div>
                <div>
                  <label className="text-stone-300 font-semibold block mb-1">Payment Method</label>
                  <select
                    value={walkIn.paymentStatus}
                    onChange={(e) => setWalkIn({ ...walkIn, paymentStatus: e.target.value })}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white focus:outline-none"
                  >
                    <option value="Paid at Counter">Paid at Counter (Card/Cash)</option>
                    <option value="Direct UPI QR">Direct UPI QR</option>
                    <option value="Company Direct Billing">Company Billing</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                >
                  Confirm & Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
