import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Compass, 
  Menu, 
  X, 
  ShoppingBag, 
  Globe, 
  Sparkles, 
  CalendarCheck, 
  Mountain,
  Utensils,
  User,
  Crown,
  Volume2,
  VolumeX,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { 
    lang, 
    toggleLanguage, 
    t, 
    viewMode,
    setViewMode,
    currentUser,
    logout,
    setIsAuthModalOpen,
    diningCart, 
    setIsDiningCartOpen, 
    confirmedBookings,
    currency,
    setCurrency,
    isAudioPlaying,
    toggleAudio,
    setIsVipModalOpen,
    setIsStargazingModalOpen,
    playConciergeBellSound
  } = useResort();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalFoodItems = diningCart.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { label: t.navRooms, href: '#villas' },
    { label: t.navPackage || 'Combo Package', href: '#package-builder' },
    { label: t.navEstate, href: '#estate-map' },
    { label: t.navExperiences, href: '#experiences' },
    { label: t.navSpa, href: '#spa' },
    { label: t.navDining, href: '#dining' },
    { label: t.navGuide, href: '#guide' },
    { label: t.navBookings, href: '#my-bookings', badge: confirmedBookings.length }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#060e0a]/92 backdrop-blur-xl border-b border-emerald-900/40 py-2.5 shadow-2xl' 
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform border border-emerald-400/30">
              <Mountain className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl font-bold tracking-[0.2em] text-white block leading-none">
                {lang === 'ta' ? 'நீலகிரி மிஸ்ட்' : 'NILGIRI MIST'}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-emerald-400 uppercase block font-medium mt-1">
                {lang === 'ta' ? 'ஆடம்பர ரிசார்ட் • ஊட்டி' : 'LUXURY RETREAT • OOTY'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-300 hover:text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 group flex items-center gap-1.5"
              >
                {link.label}
                {link.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full border text-xs transition-all ${
                isAudioPlaying 
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950/50' 
                  : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
              }`}
              title={isAudioPlaying ? "Mute Forest Breeze Sound" : "Listen to Nilgiri Forest Breeze"}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="hidden md:block bg-[#09140f] border border-white/15 rounded-full px-2.5 py-1 text-xs font-semibold text-stone-200 cursor-pointer focus:outline-none focus:border-emerald-400 [&>option]:bg-[#09140f]"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-stone-200 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase text-[11px]">{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            {/* In-Villa Dining Cart Pill */}
            {totalFoodItems > 0 && (
              <button
                onClick={() => setIsDiningCartOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all animate-pulse"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{totalFoodItems}</span>
              </button>
            )}

            {/* VIP Privilege Pass Trigger */}
            <button
              onClick={() => {
                playConciergeBellSound();
                setIsVipModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 text-amber-300 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer shadow-sm hover:scale-105"
              title="Nilgiri Mist VIP Privilege Pass"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="hidden md:inline">{t.navVip || 'VIP Pass'}</span>
            </button>

            {/* User Profile or Login Trigger */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-emerald-400"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-white max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0a1711] border border-emerald-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn text-xs">
                    <div className="p-3 border-b border-white/10">
                      <div className="font-bold text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">{currentUser.title}</div>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {currentUser.badge}
                      </span>
                    </div>

                    {(currentUser.role === 'admin' || currentUser.role === 'staff') && (
                      <button
                        onClick={() => {
                          setViewMode('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-950/60 text-amber-300 font-semibold flex items-center gap-2 transition-colors mt-1"
                      >
                        <Crown className="w-3.5 h-3.5 text-amber-300" />
                        <span>Admin Operations Hub</span>
                      </button>
                    )}

                    <a
                      href="#my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-white/5 text-stone-200 transition-colors"
                    >
                      My Stay Itinerary
                    </a>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-rose-950/40 text-rose-400 font-semibold flex items-center gap-2 transition-colors border-t border-white/5 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Sign In / Staff</span>
              </button>
            )}

            {/* Direct Admin Portal Quick Link */}
            <button
              onClick={() => {
                if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff')) {
                  setViewMode(viewMode === 'admin' ? 'resort' : 'admin');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-md"
              title="Switch to Admin Dashboard"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{viewMode === 'admin' ? 'Guest View' : 'Admin Hub'}</span>
            </button>

            {/* Reserve Button */}
            <a
              href="#villas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs tracking-wider uppercase shadow-lg shadow-emerald-950/60 transition-all border border-emerald-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.bookNow}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#07130e] border-l border-emerald-900/50 p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Mountain className="w-6 h-6 text-emerald-400" />
                  <span className="font-heading font-bold text-white tracking-widest text-base">
                    NILGIRI MIST
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg bg-white/5 text-stone-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-stone-200 hover:text-emerald-300 py-2 text-sm font-medium border-b border-white/5"
                  >
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playConciergeBellSound();
                    setIsVipModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-amber-300 py-2.5 font-bold text-xs uppercase tracking-wider"
                >
                  <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>{t.navVip || 'VIP Privilege Pass'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playConciergeBellSound();
                    setIsStargazingModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-indigo-300 py-2.5 font-bold text-xs uppercase tracking-wider"
                >
                  <span className="text-base">🔭</span>
                  <span>{t.navStargazing || 'Sky Observatory'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff')) {
                      setViewMode('admin');
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="flex items-center gap-2 text-amber-300 py-2.5 font-bold text-xs uppercase tracking-wider"
                >
                  <Crown className="w-4 h-4" />
                  <span>Admin Operations Hub</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Trigger install event or alert
                    const event = new CustomEvent('triggerPwaInstall');
                    window.dispatchEvent(event);
                  }}
                  className="flex items-center gap-2 text-emerald-300 py-2.5 font-bold text-xs uppercase tracking-wider"
                >
                  <span className="text-base">📲</span>
                  <span>{lang === 'ta' ? 'மொபைல் ஆப் இன்ஸ்டால்' : 'Install Mobile App'}</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/20 bg-white/5 text-xs font-semibold text-white"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}</span>
              </button>

              <a
                href="#villas"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-emerald-950/60"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{t.bookNow}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
