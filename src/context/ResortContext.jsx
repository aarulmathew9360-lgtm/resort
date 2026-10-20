import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, RESORT_ROOMS, ATMOSPHERE_PRESETS } from '../data/resortData';
import { startMountainAmbience, stopMountainAmbience, setAmbienceMode, playConciergeBell, playPaymentSuccessChime } from '../utils/audioEngine';
import { printResortBill } from '../utils/printBill';

const ResortContext = createContext();

export const ResortProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); // 'en' or 'ta'
  const [viewMode, setViewMode] = useState('resort'); // 'resort' or 'admin'
  const [selectedRoom, setSelectedRoom] = useState(null); // For room detail modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutRoom, setCheckoutRoom] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'register'
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null); // For viewing & printing bill

  // Current logged in user
  const [currentUser, setCurrentUser] = useState(null);

  // Currency Selection
  const [currency, setCurrency] = useState('INR'); // INR, USD, EUR, GBP
  const currencyRates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094 };
  const currencySymbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

  // Soundscape
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Nilgiri 24-Hour Atmosphere Engine: 'dawn' | 'day' | 'sunset' | 'night'
  const [atmosphere, setAtmosphere] = useState('day');

  // Next-Level Modals: VIP Privilege Pass & Stargazing Observatory
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isStargazingModalOpen, setIsStargazingModalOpen] = useState(false);

  // Search parameters for booking
  const [searchQuery, setSearchQuery] = useState({
    checkIn: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    guests: 2,
    roomCategory: 'all'
  });

  // Food / Dining Cart
  const [diningCart, setDiningCart] = useState([]);
  const [isDiningCartOpen, setIsDiningCartOpen] = useState(false);

  // Confirmed Reservations (Default mock data for instant dashboard richness)
  const [confirmedBookings, setConfirmedBookings] = useState([
    {
      bookingId: "OOTY-7942-NM",
      roomName: "The Cloud-Mist Glasshouse Chalet",
      roomNameTa: "கிளவுட்-மிஸ்ட் கிளாஸ்ஹவுஸ் வில்லா",
      checkIn: "2026-10-24",
      checkOut: "2026-10-27",
      nights: 3,
      guests: 2,
      totalAmount: 84050,
      status: "Confirmed & Guaranteed",
      paymentStatus: "Paid Online",
      guestName: "Vimal Karthik",
      guestPhone: "+91 98765 43210",
      guestEmail: "vimal@example.com",
      addOns: ["Night Fireplace Firewood Bundle & Marshmallows"],
      createdAt: "2026-10-18"
    },
    {
      bookingId: "OOTY-6811-NM",
      roomName: "Kurunji Royal 3-BHK Private Mountain Estate",
      roomNameTa: "குறிஞ்சி ராயல் 3-படுக்கையறை மாளிகை",
      checkIn: "2026-10-21",
      checkOut: "2026-10-25",
      nights: 4,
      guests: 6,
      totalAmount: 215040,
      status: "Checked In",
      paymentStatus: "Paid Online",
      guestName: "Ananya & Raghavan Sundaram",
      guestPhone: "+91 98401 55662",
      guestEmail: "raghavan.sundaram@techcorp.in",
      addOns: ["Luxury SUV Chauffeur Transfer", "Romantic Candlelight & Rose Petal Turndown"],
      createdAt: "2026-10-14"
    },
    {
      bookingId: "OOTY-5390-NM",
      roomName: "Colonial Governor's Teakwood Suite",
      roomNameTa: "கொலோனியல் தேக்குமர பாரம்பரிய அறை",
      checkIn: "2026-10-22",
      checkOut: "2026-10-24",
      nights: 2,
      guests: 2,
      totalAmount: 43680,
      status: "Confirmed & Guaranteed",
      paymentStatus: "Pay at Resort",
      guestName: "David Sterling",
      guestPhone: "+44 7911 123456",
      guestEmail: "david.sterling@london.ac.uk",
      addOns: ["Handmade Nilgiri Chocolate & Tea Hamper Box"],
      createdAt: "2026-10-16"
    }
  ]);

  // Concierge Service Requests Desk
  const [conciergeRequests, setConciergeRequests] = useState([
    {
      id: "req-1",
      title: "Evening Fireplace Firewood & Marshmallows",
      guest: "Vimal Karthik (Chalet 4)",
      time: "Today, 6:00 PM",
      status: "Completed & Verified",
      type: "Room Amenity",
      assignedButler: "Butler Prakash"
    },
    {
      id: "req-2",
      title: "Extra Warm Cashmere Blanket & 22°C Heater Pre-set",
      guest: "David Sterling (Suite 102)",
      time: "10 mins ago",
      status: "Butler Dispatched",
      type: "Comfort",
      assignedButler: "Butler Senthil"
    },
    {
      id: "req-3",
      title: "Coimbatore Airport SUV Pickup (Flight 6E-412)",
      guest: "Sundaram Family (Estate Kurunji)",
      time: "Tomorrow, 8:00 AM",
      status: "Scheduled",
      type: "Travel",
      assignedButler: "Chauffeur Ravi"
    }
  ]);

  // Villa Inventory Status (Admin controlled)
  const [villaInventory, setVillaInventory] = useState(
    RESORT_ROOMS.map((room, idx) => ({
      ...room,
      operationalStatus: idx === 0 ? 'Occupied' : idx === 4 ? 'Occupied' : idx === 1 ? 'Reserved' : 'Available',
      chaletNumber: `Chalet ${idx + 1}`
    }))
  );

  // In-Villa Kitchen Orders Desk
  const [kitchenOrders, setKitchenOrders] = useState([
    {
      id: "KITCHEN-101",
      room: "The Cloud-Mist Glasshouse (Chalet 4)",
      guest: "Vimal Karthik",
      items: [
        { name: "Nilgiri Mutton Chukka with Badaga Ragi Mudde", qty: 1 },
        { name: "Hill Station Spiced Hot Chocolate", qty: 2 }
      ],
      total: 1540,
      status: "Butler Delivery",
      orderedAt: "15 mins ago"
    },
    {
      id: "KITCHEN-102",
      room: "Kurunji Royal Estate",
      guest: "Raghavan Sundaram",
      items: [
        { name: "Wood-Fired Wild Mushroom & Pine Truffle Pizza", qty: 2 },
        { name: "Colonial High Tea Tower", qty: 1 }
      ],
      total: 2650,
      status: "Cooking in Kitchen",
      orderedAt: "6 mins ago"
    }
  ]);

  // Dynamic Pricing Multiplier (Peak Season, Weekend, Monsoon)
  const [pricingMultiplier, setPricingMultiplier] = useState(1.0);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Language toggle
  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Format Price with selected Currency
  const formatPrice = (priceInINR) => {
    const rate = currencyRates[currency] || 1;
    const symbol = currencySymbols[currency] || '₹';
    const converted = Math.round(priceInINR * rate * pricingMultiplier);
    return `${symbol}${converted.toLocaleString('en-IN')}`;
  };

  // Toggle Mountain Forest Soundscape
  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopMountainAmbience();
      setIsAudioPlaying(false);
      showToast("Mountain Forest Sound Muted");
    } else {
      const started = startMountainAmbience(atmosphere);
      if (started) {
        setIsAudioPlaying(true);
        showToast("Playing Nilgiri Pine Forest & Breeze Ambience 🌲");
      }
    }
  };

  // Change 24h Nilgiri Mountain Atmosphere
  const changeAtmosphere = (newMode) => {
    setAtmosphere(newMode);
    if (isAudioPlaying) {
      setAmbienceMode(newMode);
    }
    const preset = ATMOSPHERE_PRESETS[newMode];
    if (preset) {
      showToast(
        lang === 'ta'
          ? `${preset.nameTa} (${preset.time}) - ${preset.skyConditionTa}`
          : `${preset.name} (${preset.time}) - ${preset.skyCondition}`
      );
    }
  };

  const playConciergeBellSound = () => {
    playConciergeBell();
  };

  const playPaymentSuccessSound = () => {
    playPaymentSuccessChime();
  };

  // Authentication Helpers
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === 'admin@nilgirimist.com') {
      const adminObj = {
        id: 'usr-admin',
        name: 'Col. Rajesh Vardhan (Retd.)',
        email: 'admin@nilgirimist.com',
        role: 'admin',
        title: 'Estate General Manager & Director',
        badge: 'General Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      };
      setCurrentUser(adminObj);
      setViewMode('admin');
      setIsAuthModalOpen(false);
      showToast(`Welcome back, General Manager Col. Vardhan! Switched to Operations Hub.`);
      return true;
    } 
    
    if (cleanEmail === 'concierge@nilgirimist.com' || cleanEmail === 'butler@nilgirimist.com') {
      const staffObj = {
        id: 'usr-butler',
        name: 'Muthuvel Pandian',
        email: 'concierge@nilgirimist.com',
        role: 'staff',
        title: 'Chief Concierge & Head Butler',
        badge: 'Concierge Lead',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      };
      setCurrentUser(staffObj);
      setViewMode('admin');
      setIsAuthModalOpen(false);
      showToast(`Welcome back, Chief Concierge Muthuvel!`);
      return true;
    }

    // Default Guest Login
    const guestObj = {
      id: 'usr-guest-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: cleanEmail,
      role: 'guest',
      title: 'VIP Mountain Resident',
      badge: 'Gold Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setCurrentUser(guestObj);
    setIsAuthModalOpen(false);
    showToast(`Logged in successfully as ${guestObj.name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setViewMode('resort');
    showToast("Logged out successfully");
  };

  // Food cart helpers
  const addToDiningCart = (item) => {
    setDiningCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(lang === 'ta' ? `${item.nameTa} கூடையில் சேர்க்கப்பட்டது` : `Added ${item.name} to Dining Order`);
  };

  const removeFromDiningCart = (id) => {
    setDiningCart(prev => prev.filter(i => i.id !== id));
  };

  const updateDiningQty = (id, delta) => {
    setDiningCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearDiningCart = () => {
    setDiningCart([]);
  };

  // Add new booking
  const addBooking = (bookingData) => {
    setConfirmedBookings(prev => [bookingData, ...prev]);
  };

  // Admin Booking Operations
  const updateBookingStatus = (bookingId, newStatus) => {
    setConfirmedBookings(prev => prev.map(b => 
      b.bookingId === bookingId ? { ...b, status: newStatus } : b
    ));
    showToast(`Reservation ${bookingId} updated to: ${newStatus}`);
  };

  const deleteBooking = (bookingId) => {
    setConfirmedBookings(prev => prev.filter(b => b.bookingId !== bookingId));
    showToast(`Reservation ${bookingId} removed from records.`, 'error');
  };

  // Admin Villa Operations
  const updateVillaStatus = (roomId, newStatus) => {
    setVillaInventory(prev => prev.map(v => 
      v.id === roomId ? { ...v, operationalStatus: newStatus } : v
    ));
    showToast(`Villa status updated to ${newStatus}`);
  };

  // Concierge Operations
  const addConciergeRequest = (requestTitle, type = "General") => {
    const newReq = {
      id: "req-" + Date.now(),
      title: requestTitle,
      guest: currentUser ? `${currentUser.name} (Chalet 4)` : "Guest (Chalet 4)",
      time: "Just now",
      status: "Butler Dispatched",
      type,
      assignedButler: "Butler Prakash"
    };
    setConciergeRequests(prev => [newReq, ...prev]);
    showToast(lang === 'ta' ? "சேவை கோரிக்கை ஏற்றுக்கொள்ளப்பட்டது!" : "Concierge request received & team dispatched!");
  };

  const updateConciergeStatus = (requestId, newStatus) => {
    setConciergeRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: newStatus } : r
    ));
    showToast(`Task status updated: ${newStatus}`);
  };

  const updateKitchenOrderStatus = (orderId, newStatus) => {
    setKitchenOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    showToast(`Kitchen Order ${orderId}: ${newStatus}`);
  };

  return (
    <ResortContext.Provider value={{
      lang,
      setLang,
      toggleLanguage,
      t,
      viewMode,
      setViewMode,
      currentUser,
      setCurrentUser,
      login,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authTab,
      setAuthTab,
      currency,
      setCurrency,
      formatPrice,
      isAudioPlaying,
      toggleAudio,
      selectedRoom,
      setSelectedRoom,
      isCheckoutOpen,
      setIsCheckoutOpen,
      checkoutRoom,
      setCheckoutRoom,
      searchQuery,
      setSearchQuery,
      diningCart,
      addToDiningCart,
      removeFromDiningCart,
      updateDiningQty,
      clearDiningCart,
      isDiningCartOpen,
      setIsDiningCartOpen,
      confirmedBookings,
      addBooking,
      updateBookingStatus,
      deleteBooking,
      conciergeRequests,
      addConciergeRequest,
      updateConciergeStatus,
      villaInventory,
      updateVillaStatus,
      kitchenOrders,
      updateKitchenOrderStatus,
      pricingMultiplier,
      setPricingMultiplier,
      selectedInvoiceBooking,
      setSelectedInvoiceBooking,
      printResortBill,
      atmosphere,
      setAtmosphere,
      changeAtmosphere,
      isVipModalOpen,
      setIsVipModalOpen,
      isStargazingModalOpen,
      setIsStargazingModalOpen,
      playConciergeBellSound,
      playPaymentSuccessSound,
      toast,
      showToast
    }}>
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResort must be used within a ResortProvider');
  }
  return context;
};
