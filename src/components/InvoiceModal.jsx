import React from 'react';
import { useResort } from '../context/ResortContext';
import { printResortBill } from '../utils/printBill';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Users, 
  QrCode, 
  Share2, 
  Sparkles 
} from 'lucide-react';

const InvoiceModal = () => {
  const { 
    selectedInvoiceBooking, 
    setSelectedInvoiceBooking, 
    showToast,
    lang 
  } = useResort();

  if (!selectedInvoiceBooking) return null;

  const booking = selectedInvoiceBooking;
  const nights = booking.nights || 2;
  const totalAmount = booking.totalAmount || 49000;
  const baseRate = Math.round(totalAmount / 1.12);
  const totalTax = totalAmount - baseRate;
  const cgst = Math.round(totalTax / 2);
  const sgst = totalTax - cgst;
  const invoiceNo = `INV-2026-${booking.bookingId || 'NM-001'}`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrintClick = () => {
    printResortBill(booking);
    showToast("Opening Print / PDF Dialog...");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedInvoiceBooking(null)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-stone-900">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 animate-scaleUp border border-stone-200">
          
          {/* Top Bar with Print and Close Action */}
          <div className="bg-[#064e3b] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif-luxury tracking-wide">
                  Official Hotel Tax Invoice & Stay Voucher
                </h3>
                <span className="text-[11px] text-emerald-200">
                  Nilgiri Mist Luxury Resort & Wellness Retreat, Ooty
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintClick}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Printer className="w-4 h-4 text-stone-900" />
                <span>Print Bill / PDF</span>
              </button>

              <button
                onClick={() => setSelectedInvoiceBooking(null)}
                className="p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Sheet Preview */}
          <div className="p-6 sm:p-8 space-y-6 text-xs text-stone-700 bg-white max-h-[75vh] overflow-y-auto">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#064e3b] pb-5 gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-widest text-[#064e3b] uppercase">
                  Nilgiri Mist
                </h2>
                <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase mt-0.5">
                  Luxury Mountain Resort & Wellness Retreat • Ooty
                </div>
                <p className="text-[11px] text-stone-600 mt-2 max-w-sm leading-relaxed">
                  Doddabetta Ridge, Kotagiri Road, Ooty, The Nilgiris, Tamil Nadu - 643001<br />
                  Phone: +91 423 244 8900 | Email: reservations@nilgirimist-ooty.com<br />
                  GSTIN: <strong className="text-stone-900">33AABCN7482P1Z6</strong> | SAC Code: 996311
                </p>
              </div>

              <div className="sm:text-right bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="text-sm font-bold text-stone-900">TAX INVOICE & RECEIPT</div>
                <div className="text-[11px] text-stone-600 mt-1">Invoice No: <strong className="text-stone-900 font-mono">{invoiceNo}</strong></div>
                <div className="text-[11px] text-stone-600">Date: {issueDate}</div>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>{booking.status || 'Paid & Guaranteed'}</span>
                </div>
              </div>
            </div>

            {/* Guest & Stay Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#064e3b]">Billed To (Guest Details)</div>
                <div className="font-bold text-sm text-stone-900">{booking.guestName || 'VIP Guest'}</div>
                <div className="text-stone-600">Phone: {booking.guestPhone || '+91 98765 43210'}</div>
                <div className="text-stone-600">Email: {booking.guestEmail || 'guest@nilgirimist.com'}</div>
                <div className="text-stone-600">ID Verification: Aadhaar / Passport (Verified)</div>
              </div>

              <div className="space-y-1 sm:text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#064e3b]">Stay & Chalet Details</div>
                <div className="font-bold text-sm text-stone-900">{booking.roomName}</div>
                <div className="text-stone-600">Booking Ref: <strong className="font-mono text-[#064e3b]">{booking.bookingId}</strong></div>
                <div className="text-stone-600">Check-In: {booking.checkIn} (From 2:00 PM)</div>
                <div className="text-stone-600">Check-Out: {booking.checkOut} (Until 11:00 AM)</div>
                <div className="text-stone-600">{nights} Nights • {booking.guests || 2} Guests</div>
              </div>
            </div>

            {/* Charges Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                <thead className="bg-[#064e3b] text-white text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Item / Service Description</th>
                    <th className="p-3">SAC</th>
                    <th className="p-3 text-center">Duration</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Taxable Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-stone-900">
                      {booking.roomName}<br />
                      <span className="text-[10px] font-normal text-stone-500">
                        Includes gourmet daily buffet breakfast, plantation high tea, heated jacuzzi & fireplace setup
                      </span>
                    </td>
                    <td className="p-3 text-stone-600">996311</td>
                    <td className="p-3 text-center">{nights} Nights</td>
                    <td className="p-3 text-right">₹{Math.round(baseRate / nights).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold">₹{baseRate.toLocaleString('en-IN')}</td>
                  </tr>

                  {booking.addOns && booking.addOns.map((addon, idx) => (
                    <tr key={idx} className="bg-stone-50">
                      <td className="p-3 text-stone-800">• {addon}</td>
                      <td className="p-3 text-stone-500">996331</td>
                      <td className="p-3 text-center">1 Package</td>
                      <td className="p-3 text-right">Included</td>
                      <td className="p-3 text-right font-medium">Included</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subtotal and Tax Breakdown */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs max-w-sm">
                <QrCode className="w-12 h-12 text-[#064e3b] shrink-0" />
                <div>
                  <div className="font-bold text-[#064e3b]">Express Chalet Fast-Pass</div>
                  <div className="text-[11px] text-stone-600">
                    Scan this QR code at Doddabetta entry gate for priority golf buggy escort to your villa.
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-72 bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Taxable Base Value:</span>
                  <span>₹{baseRate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Central GST (CGST @ 6%):</span>
                  <span>₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>State GST (SGST @ 6%):</span>
                  <span>₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t-2 border-[#064e3b] flex justify-between text-sm font-black text-[#064e3b]">
                  <span>Total Amount Paid:</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 flex items-end justify-between border-t border-stone-200 text-stone-600 text-[11px]">
              <div>
                <div className="w-36 border-b border-stone-400 mb-1" />
                <div>Guest Signature</div>
              </div>

              <div className="text-right">
                <div className="font-serif-luxury italic text-sm text-[#064e3b] font-bold mb-1">
                  Rajesh Vardhan
                </div>
                <div className="w-44 border-b border-stone-400 mb-1 ml-auto" />
                <div>Authorized Signatory • Nilgiri Mist Resort</div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-stone-500 text-[11px]">
              Computer-generated hospitality tax invoice under Section 31 of CGST Act, 2017.
            </span>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrintClick}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#053d2e] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
