import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ADD_ONS } from '../data/resortData';
import confetti from 'canvas-confetti';
import { printResortBill } from '../utils/printBill';
import { 
  X, 
  Check, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Printer, 
  Sparkles, 
  Flame, 
  Car, 
  Gift, 
  Tag, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const BookingCheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    checkoutRoom, 
    searchQuery, 
    lang, 
    addBooking, 
    showToast,
    setSelectedInvoiceBooking
  } = useResort();

  const [step, setStep] = useState(1); // 1: Addons, 2: Guest Details, 3: Payment, 4: Confirmed Voucher
  const [selectedAddOns, setSelectedAddOns] = useState(['addon-firewood']); // Default firewood
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState('');

  // Guest details form state
  const [guestDetails, setGuestDetails] = useState({
    name: 'Vimal Karthik',
    email: 'vimal.ooty@gmail.com',
    phone: '+91 98765 43210',
    idProof: 'Aadhaar Card',
    specialRequests: 'Upper valley facing room requested with evening fireplace lit.'
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, pay_at_resort
  const [confirmedData, setConfirmedData] = useState(null);

  if (!isCheckoutOpen || !checkoutRoom) return null;

  // Nights calculation
  const checkInDate = new Date(searchQuery.checkIn);
  const checkOutDate = new Date(searchQuery.checkOut);
  const nights = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));

  const basePrice = checkoutRoom.price * nights;
  
  // Add-ons calculation
  const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
    const item = ADD_ONS.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  // Discount calculation
  const discountAmount = Math.round((basePrice + addOnsTotal) * (discountPercent / 100));
  const subtotalAfterDiscount = basePrice + addOnsTotal - discountAmount;
  const taxesGst = Math.round(subtotalAfterDiscount * 0.12); // 12% Luxury Resort GST
  const grandTotal = subtotalAfterDiscount + taxesGst;

  const toggleAddOn = (id) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(i => i !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'OOTYMIST' || code === 'NILGIRIS' || code === 'WINTER2026') {
      setDiscountPercent(15);
      setCouponStatus('Applied! 15% Mountain Special Discount');
      showToast("Coupon Applied! 15% discount granted.");
    } else if (code === 'WELCOME') {
      setDiscountPercent(10);
      setCouponStatus('Applied! 10% Welcome Discount');
      showToast("Coupon Applied! 10% discount granted.");
    } else {
      setCouponStatus('Invalid coupon code. Try OOTYMIST');
    }
  };

  const handleCompletePayment = () => {
    const newBookingId = `OOTY-${Math.floor(1000 + Math.random() * 9000)}-NM`;
    const selectedAddonNames = selectedAddOns.map(id => ADD_ONS.find(a => a.id === id)?.name).filter(Boolean);

    const bookingObject = {
      bookingId: newBookingId,
      roomName: checkoutRoom.name,
      roomNameTa: checkoutRoom.nameTa,
      checkIn: searchQuery.checkIn,
      checkOut: searchQuery.checkOut,
      nights,
      guests: searchQuery.guests,
      totalAmount: grandTotal,
      status: paymentMethod === 'pay_at_resort' ? 'Guaranteed (Pay at Resort)' : 'Paid & Confirmed',
      guestName: guestDetails.name,
      guestPhone: guestDetails.phone,
      guestEmail: guestDetails.email,
      addOns: selectedAddonNames,
      paymentMethod,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setConfirmedData(bookingObject);
    addBooking(bookingObject);
    setStep(4);

    // Burst festive confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback if script blocked
    }

    showToast(
      lang === 'ta'
        ? `முன்பதிவு உறுதியானது! முன்பதிவு எண்: ${newBookingId}`
        : `Reservation Confirmed! Booking ID: ${newBookingId}`
    );
  };

  const handlePrint = () => {
    if (confirmedData) {
      printResortBill(confirmedData);
      showToast("Opening Official Tax Bill Print Dialog...");
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (step !== 4) setIsCheckoutOpen(false);
        }}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-stone-100">
        <div className="relative w-full max-w-3xl bg-[#0c1813] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 animate-scaleUp">
          
          {/* Header */}
          <div className="bg-[#08120e] p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                  {step === 4 ? 'Reservation Voucher' : 'Reserve Nilgiri Mountain Villa'}
                </h3>
                <span className="text-xs text-stone-400">
                  {checkoutRoom.name} • {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar (Only during steps 1-3) */}
          {step < 4 && (
            <div className="px-6 py-3 bg-black/30 border-b border-white/5 flex items-center justify-between text-xs">
              <div className={`flex items-center gap-2 font-semibold ${step >= 1 ? 'text-emerald-400' : 'text-stone-500'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">1</span>
                <span>Chalet Add-Ons</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600" />
              <div className={`flex items-center gap-2 font-semibold ${step >= 2 ? 'text-emerald-400' : 'text-stone-500'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">2</span>
                <span>Guest Details</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600" />
              <div className={`flex items-center gap-2 font-semibold ${step >= 3 ? 'text-emerald-400' : 'text-stone-500'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">3</span>
                <span>Payment</span>
              </div>
            </div>
          )}

          {/* Step 1: Add-Ons & Stay Summary */}
          {step === 1 && (
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Dates & Room Info Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5 text-xs">
                <div>
                  <span className="text-stone-400">Check-in</span>
                  <div className="font-bold text-white mt-0.5">{searchQuery.checkIn}</div>
                  <div className="text-[10px] text-stone-400">From 2:00 PM</div>
                </div>
                <div>
                  <span className="text-stone-400">Check-out</span>
                  <div className="font-bold text-white mt-0.5">{searchQuery.checkOut}</div>
                  <div className="text-[10px] text-stone-400">Until 11:00 AM</div>
                </div>
                <div>
                  <span className="text-stone-400">Guests</span>
                  <div className="font-bold text-white mt-0.5">{searchQuery.guests} Guests</div>
                  <div className="text-[10px] text-stone-400">1 Villa Chalet</div>
                </div>
                <div>
                  <span className="text-stone-400">Base Stay</span>
                  <div className="font-bold text-emerald-300 mt-0.5">₹{basePrice.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-stone-400">({nights} Nights)</div>
                </div>
              </div>

              {/* Curated Mountain Add-Ons */}
              <div>
                <h4 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  {lang === 'ta' ? 'அறைக்கு தேவையான கூடுதல் சேவைகள்' : 'Curate Your Hill-Station Stay (Optional Add-Ons)'}
                </h4>

                <div className="space-y-3">
                  {ADD_ONS.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-400/60 shadow-lg'
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 ${
                            isSelected ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-stone-500'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">
                              {lang === 'ta' ? addon.nameTa : addon.name}
                            </div>
                            <div className="text-xs text-stone-400 mt-0.5">{addon.desc}</div>
                          </div>
                        </div>

                        <div className="text-sm font-bold text-emerald-300 whitespace-nowrap pl-3">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="pt-2">
                <form onSubmit={applyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Enter promo coupon (e.g. OOTYMIST)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {couponStatus && (
                  <p className={`text-xs mt-1.5 ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {couponStatus}
                  </p>
                )}
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400">Current Total:</span>
                  <div className="text-xl font-bold font-serif-luxury text-emerald-300">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Guest Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Step 2: Guest Details Form */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-5">
              <h4 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                {lang === 'ta' ? 'விருந்தினர் தகவல்' : 'Primary Guest Details & ID'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stone-300 block mb-1.5 font-medium">Full Legal Name</label>
                  <input
                    type="text"
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1.5 font-medium">Contact Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1.5 font-medium">Government ID Type</label>
                  <select
                    value={guestDetails.idProof}
                    onChange={(e) => setGuestDetails({ ...guestDetails, idProof: e.target.value })}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport (International & NRI)</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1.5 font-medium">Special Requests & Dietary Notes</label>
                <textarea
                  rows="2"
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  placeholder="e.g. Extra pillows, anniversary floral setup, late arrival at 7 PM"
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-stone-300 hover:text-white flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Add-Ons</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <span>Proceed to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Step 3: Payment Simulation */}
          {step === 3 && (
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                {lang === 'ta' ? 'கட்டண முறை தேர்வு' : 'Select Payment Method'}
              </h4>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-white text-sm">Instant UPI</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">GPay, PhonePe, Paytm, QR</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-white text-sm">Credit / Debit Card</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Visa, Mastercard, Amex</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('pay_at_resort')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'pay_at_resort'
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-white text-sm">Pay at Resort</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Zero Prepayment Today</div>
                </button>
              </div>

              {/* UPI simulation box */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-stone-300 font-medium">Virtual Payment Address</span>
                    <div className="font-mono text-emerald-400 text-sm font-semibold">nilgirimist.resort@icici</div>
                    <p className="text-[10px] text-stone-500">Scan QR or auto-approve in your UPI app upon submission.</p>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
                </div>
              )}

              {/* Final Bill Breakdown */}
              <div className="bg-[#08120e] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Chalet Base Rate ({nights} Nights):</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-stone-300">
                    <span>Curated Add-Ons ({selectedAddOns.length}):</span>
                    <span>+₹{addOnsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Mountain Special Discount ({discountPercent}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-300">
                  <span>Luxury Hospitality GST (12%):</span>
                  <span>+₹{taxesGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-white font-bold text-base">
                  <span>Grand Total:</span>
                  <span className="text-emerald-300 font-serif-luxury">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>256-Bit SSL Encrypted Mountain Payment Gateway • Free cancellation up to 48 hours</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-stone-300 hover:text-white flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Guest Details</span>
                </button>

                <button
                  onClick={handleCompletePayment}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-950/80"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>
                    {paymentMethod === 'pay_at_resort' ? 'Confirm Reservation (Pay Later)' : `Authorize & Pay ₹${grandTotal.toLocaleString('en-IN')}`}
                  </span>
                </button>
              </div>

            </div>
          )}

          {/* Step 4: Digital Boarding Pass & Confirmation Voucher */}
          {step === 4 && confirmedData && (
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                  {lang === 'ta' ? 'முன்பதிவு வெற்றிகரமாக முடிந்தது!' : 'Stay Confirmed & Guaranteed!'}
                </h3>
                <p className="text-xs text-stone-300">
                  A copy of your mountain itinerary and receipt has been sent to <span className="text-emerald-400 font-mono">{confirmedData.guestEmail}</span>.
                </p>
              </div>

              {/* Printable Boarding Voucher */}
              <div id="printable-voucher" className="bg-[#08120e] rounded-3xl border border-emerald-500/40 p-6 relative overflow-hidden shadow-2xl">
                
                {/* Voucher Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="font-heading text-lg font-bold text-white tracking-widest">NILGIRI MIST</span>
                    <div className="text-[10px] text-emerald-400 tracking-wider uppercase">Doddabetta Ridge, Ooty • 7,400 ft</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Booking ID</span>
                    <span className="text-base font-bold font-mono text-amber-300">{confirmedData.bookingId}</span>
                  </div>
                </div>

                {/* Voucher Body Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-white/10 text-xs">
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">Guest</span>
                    <div className="font-bold text-white mt-0.5">{confirmedData.guestName}</div>
                    <div className="text-[10px] text-stone-400">{confirmedData.guestPhone}</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">Villa Chalet</span>
                    <div className="font-bold text-white mt-0.5">{confirmedData.roomName}</div>
                    <div className="text-[10px] text-emerald-400">{confirmedData.guests} Guests • 1 Villa</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">Dates</span>
                    <div className="font-bold text-white mt-0.5">{confirmedData.checkIn}</div>
                    <div className="text-[10px] text-stone-400">To {confirmedData.checkOut} ({confirmedData.nights} N)</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">Amount</span>
                    <div className="font-bold text-emerald-300 font-serif-luxury text-base mt-0.5">
                      ₹{confirmedData.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-400">{confirmedData.status}</div>
                  </div>
                </div>

                {/* Add-ons and QR */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-300 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Inclusions & Add-Ons:</span>
                    <p className="text-[11px] text-emerald-300">
                      • Complimentary Daily Breakfast Buffet & Plantation High Tea
                    </p>
                    {confirmedData.addOns.map((addon, i) => (
                      <p key={i} className="text-[11px] text-stone-300">• {addon}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10">
                    <QrCode className="w-12 h-12 text-white" />
                    <div className="text-[10px] text-stone-400">
                      <div>Scan at Resort Gate</div>
                      <div className="text-white font-mono font-bold mt-0.5">CHALET-FAST-PASS</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Download / Print Voucher</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Done & View My Bookings</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingCheckoutModal;
