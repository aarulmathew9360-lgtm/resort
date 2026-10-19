import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Utensils, CheckCircle } from 'lucide-react';

const DiningCartDrawer = () => {
  const { 
    diningCart, 
    isDiningCartOpen, 
    setIsDiningCartOpen, 
    removeFromDiningCart, 
    updateDiningQty, 
    clearDiningCart,
    lang, 
    showToast,
    addConciergeRequest 
  } = useResort();

  const [deliveryRoom, setDeliveryRoom] = useState('The Cloud-Mist Glasshouse Chalet (Chalet 4)');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isDiningCartOpen) return null;

  const subtotal = diningCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.05); // 5% restaurant GST
  const serviceCharge = 150; // In-villa mountain butler delivery
  const total = subtotal + gst + serviceCharge;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (diningCart.length === 0) return;

    addConciergeRequest(
      `In-Villa Dining Order (${diningCart.length} items) delivered to ${deliveryRoom}`,
      "Dining"
    );

    showToast(
      lang === 'ta'
        ? `உங்கள் உணவு ஆர்டர் ஏற்றுக்கொள்ளப்பட்டது! 25 நிமிடங்களில் ${deliveryRoom} க்கு வந்து சேரும்.`
        : `Dining order placed! Butler delivering to ${deliveryRoom} in 25-30 mins.`
    );

    clearDiningCart();
    setIsDiningCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDiningCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b1612] border-l border-emerald-900/50 shadow-2xl flex flex-col justify-between p-6 text-stone-100 z-10">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-serif-luxury text-white">
                  {lang === 'ta' ? 'அறைக்கு உணவு ஆர்டர்' : 'In-Villa Dining Cart'}
                </h3>
              </div>
              <button
                onClick={() => setIsDiningCartOpen(false)}
                className="p-1 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="mt-6 space-y-4 max-h-[42vh] overflow-y-auto pr-1">
              {diningCart.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-400" />
                  <p className="text-sm">Your in-villa dining tray is empty.</p>
                  <p className="text-xs text-stone-500 mt-1">Select Ooty culinary delicacies from the menu below.</p>
                </div>
              ) : (
                diningCart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.veg ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {lang === 'ta' ? item.nameTa : item.name}
                        </h4>
                      </div>
                      <div className="text-xs text-emerald-300 font-bold mt-1">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-1">
                        <button
                          onClick={() => updateDiningQty(item.id, -1)}
                          className="p-1 hover:text-emerald-400 text-stone-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.qty}</span>
                        <button
                          onClick={() => updateDiningQty(item.id, 1)}
                          className="p-1 hover:text-emerald-400 text-stone-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromDiningCart(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Form & Bill Footer */}
          {diningCart.length > 0 && (
            <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-white/10 space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-emerald-400 block mb-1">
                  {lang === 'ta' ? 'டெலிவரி செய்ய வேண்டிய அறை / வில்லா' : 'Deliver to Villa / Chalet'}
                </label>
                <select
                  value={deliveryRoom}
                  onChange={(e) => setDeliveryRoom(e.target.value)}
                  className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="The Cloud-Mist Glasshouse Chalet (Chalet 4)">Chalet 4 • Glasshouse</option>
                  <option value="Colonial Governor's Suite (Suite 102)">Suite 102 • Colonial Wing</option>
                  <option value="Pine Whispers Canopy Treehouse (Treehouse 2)">Treehouse 2 • Canopy Ridge</option>
                  <option value="Tea Planter's Cottage (Cottage 7)">Cottage 7 • Tea Slopes</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="bg-black/30 p-3 rounded-2xl border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Food Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>GST (5%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Butler Room Service Fee</span>
                  <span>₹{serviceCharge}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                  <span>Total Amount</span>
                  <span className="text-emerald-300 font-serif-luxury">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>{lang === 'ta' ? 'ஆர்டர் செய்க (Send to Kitchen)' : 'Place In-Villa Order'}</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default DiningCartDrawer;
