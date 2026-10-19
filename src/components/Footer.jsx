import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Mountain, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Sparkles, 
  Send, 
  Leaf, 
  Droplet, 
  Sun 
} from 'lucide-react';

const Footer = () => {
  const { lang, t, showToast } = useResort();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(lang === 'ta' ? 'செய்திமடலில் இணைந்தமைக்கு நன்றி!' : 'Subscribed to Nilgiri Mist seasonal updates!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#050b08] border-t border-emerald-950/80 text-stone-300 pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eco & Sustainability Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 border-b border-white/5 text-xs">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Leaf className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">100% Organic Estate</div>
              <div className="text-stone-400 text-[11px]">45 acres of pesticide-free Nilgiri tea & botanical gardens</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Droplet className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Rainwater Harvesting</div>
              <div className="text-stone-400 text-[11px]">Mountain spring water purification & zero plastic bottles</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Sun className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Geothermal & Solar Heating</div>
              <div className="text-stone-400 text-[11px]">Eco-friendly hot water for chalets, jacuzzis and pools</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg">
                <Mountain className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-[0.2em] text-white block">
                  {lang === 'ta' ? 'நீலகிரி மிஸ்ட்' : 'NILGIRI MIST'}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-emerald-400 uppercase block font-medium">
                  {lang === 'ta' ? 'ஆடம்பர ரிசார்ட் • ஊட்டி' : 'LUXURY RETREAT • OOTY'}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Perched at 7,400 feet amidst rolling tea gardens and ancient blue gum eucalyptus forests on the Doddabetta slopes, Ooty, The Nilgiris.
            </p>

            <div className="text-xs space-y-1.5 text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.footerText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Concierge Desk: +91 423 244 8900 / +91 94892 11022</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>reservations@nilgirimist-ooty.com</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Accommodations</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#villas" className="hover:text-emerald-300">Glasshouse Chalets</a></li>
              <li><a href="#villas" className="hover:text-emerald-300">Colonial Suites</a></li>
              <li><a href="#villas" className="hover:text-emerald-300">Canopy Treehouses</a></li>
              <li><a href="#villas" className="hover:text-emerald-300">Tea Planter's Cottages</a></li>
              <li><a href="#villas" className="hover:text-emerald-300">Kurunji Royal Estate</a></li>
            </ul>
          </div>

          {/* Experiences & Wellness */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Experiences</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#experiences" className="hover:text-emerald-300">Nilgiri Toy Train Private Car</a></li>
              <li><a href="#experiences" className="hover:text-emerald-300">Tea Plucking Masterclass</a></li>
              <li><a href="#spa" className="hover:text-emerald-300">Eucalyptus Steam & Spa</a></li>
              <li><a href="#dining" className="hover:text-emerald-300">Badaga Fireplace BBQ</a></li>
              <li><a href="#estate-map" className="hover:text-emerald-300">45-Acre Estate Trails</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Mountain Gazette</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive secret seasonal rates, Kurunji bloom alerts, and winter fireplace privileges.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Nilgiri Mist Luxury Mountain Resort & Spa, Ooty. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-300 cursor-pointer">Heritage Conservation</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Stay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
