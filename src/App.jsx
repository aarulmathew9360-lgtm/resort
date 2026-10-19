import React from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingBar from './components/BookingBar';
import RoomsSection from './components/RoomsSection';
import RoomModal from './components/RoomModal';
import ResortMap from './components/ResortMap';
import ExperiencesSection from './components/ExperiencesSection';
import SpaSection from './components/SpaSection';
import DiningSection from './components/DiningSection';
import DiningCartDrawer from './components/DiningCartDrawer';
import BookingCheckoutModal from './components/BookingCheckoutModal';
import GuestConcierge from './components/GuestConcierge';
import OotyGuide from './components/OotyGuide';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import InvoiceModal from './components/InvoiceModal';
import AiConciergeModal from './components/AiConciergeModal';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import './App.css';

function MainResortApp() {
  const { viewMode } = useResort();

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-[#070f0b] text-stone-100 selection:bg-emerald-600 selection:text-white relative">
        <AdminDashboard />
        <InvoiceModal />
        <AuthModal />
        <NotificationToast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08120e] text-stone-100 selection:bg-emerald-600 selection:text-white relative overflow-hidden">
      
      {/* Background Animated Mountain Mist Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="mist-particle w-96 h-96 -top-20 -left-20 animate-mist" 
          style={{ animationDuration: '18s' }} 
        />
        <div 
          className="mist-particle w-[500px] h-[500px] top-1/3 -right-32 animate-mist" 
          style={{ animationDuration: '24s', animationDelay: '-6s' }} 
        />
        <div 
          className="mist-particle w-[600px] h-[600px] bottom-10 left-1/4 animate-mist" 
          style={{ animationDuration: '20s', animationDelay: '-10s' }} 
        />
      </div>

      {/* Navigation Header */}
      <Navbar />

      <main className="relative z-10">
        {/* Cinematic Hero */}
        <Hero />

        {/* Floating Booking Search Bar */}
        <BookingBar />

        {/* Luxury Villas & Suites Showcase */}
        <RoomsSection />

        {/* Interactive 45-Acre Estate Map & Navigator */}
        <ResortMap />

        {/* Curated Nilgiri Mountain Experiences */}
        <ExperiencesSection />

        {/* Ayurveda Spa & Wellness Sanctuary */}
        <SpaSection />

        {/* Fine Dining, In-Villa Service & Table Booking */}
        <DiningSection />

        {/* Guest Bookings & Live Concierge Butler */}
        <GuestConcierge />

        {/* Nilgiris Hill-Station Guide & FAQs */}
        <OotyGuide />

        {/* Verified Guest Reviews */}
        <ReviewsSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Modals and Drawers */}
      <RoomModal />
      <BookingCheckoutModal />
      <DiningCartDrawer />
      <InvoiceModal />
      <AiConciergeModal />
      <PwaInstallPrompt />
      <AuthModal />
      <NotificationToast />
    </div>
  );
}

function App() {
  return (
    <ResortProvider>
      <MainResortApp />
    </ResortProvider>
  );
}

export default App;
