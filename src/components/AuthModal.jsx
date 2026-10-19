import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  KeyRound, 
  User, 
  Sparkles, 
  Crown, 
  Bell, 
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    authTab, 
    setAuthTab, 
    lang, 
    showToast 
  } = useResort();

  const [email, setEmail] = useState('admin@nilgirimist.com');
  const [password, setPassword] = useState('ooty2026');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    if (authTab === 'login') {
      login(email, password);
    } else {
      // Register demo
      login(email, password);
      showToast("Mountain Profile created successfully!");
    }
  };

  const fillQuickDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('ooty2026');
    showToast(`Loaded ${demoRole} credentials`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-stone-100">
        <div className="relative w-full max-w-md bg-[#0a1711] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 animate-scaleUp">
          
          {/* Header background with mountain ambiance */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-b from-emerald-950/80 to-[#0a1711] border-b border-white/10 text-center">
            
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-950/60">
              <Lock className="w-6 h-6 text-amber-200" />
            </div>

            <h3 className="text-2xl font-bold font-serif-luxury text-white">
              {authTab === 'login' ? 'Nilgiri Estate Portal' : 'Create Resident Account'}
            </h3>
            
            <p className="text-xs text-stone-300 mt-1">
              {authTab === 'login' 
                ? 'Sign in to access VIP bookings & Estate Operations' 
                : 'Enjoy member privileges, private tea tastings & secret rates'}
            </p>

            {/* Quick Demo Credentials Banner */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                ⚡ 1-Click Demo Accounts
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => fillQuickDemo('admin@nilgirimist.com', 'Admin / GM')}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1 font-semibold"
                >
                  <Crown className="w-3 h-3" />
                  <span>Admin / GM</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillQuickDemo('concierge@nilgirimist.com', 'Head Butler')}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30 flex items-center gap-1 font-semibold"
                >
                  <Bell className="w-3 h-3" />
                  <span>Head Butler</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillQuickDemo('guest@gmail.com', 'VIP Guest')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1 font-semibold"
                >
                  <User className="w-3 h-3" />
                  <span>VIP Guest</span>
                </button>
              </div>
            </div>

          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-5">
            
            {/* Tabs */}
            <div className="grid grid-cols-2 bg-black/40 p-1 rounded-2xl border border-white/5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`py-2 rounded-xl transition-all ${
                  authTab === 'login' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className={`py-2 rounded-xl transition-all ${
                  authTab === 'register' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authTab === 'register' && (
                <div>
                  <label className="text-[11px] font-semibold text-stone-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Vimal Karthik"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-stone-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@nilgirimist.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-300 block mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-emerald-500" />
                  <span>Stay logged in</span>
                </label>
                <a href="#" className="hover:text-emerald-400">Forgot passcode?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 transition-all mt-4"
              >
                <span>{authTab === 'login' ? 'Authorize & Enter' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Estate Security • 256-Bit Encrypted Portal</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
