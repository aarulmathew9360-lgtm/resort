// Dedicated High-Resolution Resort Tax Invoice & Voucher Print Engine

export const printResortBill = (booking) => {
  if (!booking) return;

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

  const printContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Tax Invoice - ${booking.bookingId} - Nilgiri Mist Luxury Resort, Ooty</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1a1a1a;
        }
        body {
          background: #ffffff;
          padding: 20px;
          line-height: 1.5;
        }
        .invoice-box {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 30px;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #064e3b;
          padding-bottom: 18px;
          margin-bottom: 24px;
        }
        .brand-title {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #064e3b;
          text-transform: uppercase;
        }
        .brand-sub {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #047857;
          font-weight: 600;
          margin-top: 2px;
        }
        .brand-address {
          font-size: 11px;
          color: #4b5563;
          margin-top: 6px;
          max-width: 320px;
        }
        .invoice-title-block {
          text-align: right;
        }
        .invoice-main-title {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          letter-spacing: 1px;
        }
        .invoice-meta {
          font-size: 12px;
          color: #4b5563;
          margin-top: 4px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 12px;
        }
        .meta-block h4 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #064e3b;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .meta-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .meta-label {
          color: #6b7280;
        }
        .meta-val {
          font-weight: 600;
          color: #111827;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          font-size: 12px;
        }
        th {
          background: #064e3b;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
          padding: 10px 12px;
          text-align: left;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .text-right {
          text-align: right;
        }
        .bill-summary {
          margin-left: auto;
          width: 320px;
          font-size: 12px;
          margin-bottom: 30px;
        }
        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .bill-row.total {
          border-top: 2px solid #064e3b;
          border-bottom: 2px solid #064e3b;
          padding: 10px 0;
          font-size: 15px;
          font-weight: 800;
          color: #064e3b;
        }
        .tax-disclaimer {
          font-size: 10px;
          color: #6b7280;
          border-top: 1px dashed #d1d5db;
          padding-top: 14px;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .footer-signatures {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 20px;
        }
        .signature-box {
          text-align: center;
          font-size: 11px;
          color: #4b5563;
        }
        .sig-line {
          width: 180px;
          border-bottom: 1px solid #9ca3af;
          margin-bottom: 6px;
        }
        .badge-verified {
          display: inline-block;
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5px;
        }
        .qr-placeholder {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 10px;
          border-radius: 8px;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        
        <!-- Header -->
        <div class="header">
          <div>
            <div class="brand-title">Nilgiri Mist</div>
            <div class="brand-sub">LUXURY RESORT & WELLNESS RETREAT • OOTY</div>
            <div class="brand-address">
              Doddabetta Ridge, Kotagiri Road, Ooty, The Nilgiris, Tamil Nadu - 643001<br>
              Phone: +91 423 244 8900 | Email: reservations@nilgirimist-ooty.com<br>
              GSTIN: <strong>33AABCN7482P1Z6</strong> | SAC Code: 996311
            </div>
          </div>
          <div class="invoice-title-block">
            <div class="invoice-main-title">TAX INVOICE & VOUCHER</div>
            <div class="invoice-meta">Invoice No: <strong>${invoiceNo}</strong></div>
            <div class="invoice-meta">Date of Issue: ${issueDate}</div>
            <div class="invoice-meta" style="margin-top: 8px;">
              <span class="badge-verified">PAID & GUARANTEED</span>
            </div>
          </div>
        </div>

        <!-- Meta Grid -->
        <div class="meta-grid">
          <div class="meta-block">
            <h4>Billed To (Guest Details)</h4>
            <div class="meta-row"><span class="meta-label">Guest Name:</span> <span class="meta-val">${booking.guestName || 'VIP Guest'}</span></div>
            <div class="meta-row"><span class="meta-label">Phone / WhatsApp:</span> <span class="meta-val">${booking.guestPhone || '+91 98765 43210'}</span></div>
            <div class="meta-row"><span class="meta-label">Email:</span> <span class="meta-val">${booking.guestEmail || 'guest@nilgirimist.com'}</span></div>
            <div class="meta-row"><span class="meta-label">ID Verification:</span> <span class="meta-val">Aadhaar / Passport (Verified)</span></div>
          </div>

          <div class="meta-block">
            <h4>Stay & Reservation Itinerary</h4>
            <div class="meta-row"><span class="meta-label">Booking Reference:</span> <span class="meta-val" style="color:#064e3b; font-family:monospace;">${booking.bookingId}</span></div>
            <div class="meta-row"><span class="meta-label">Villa Chalet:</span> <span class="meta-val">${booking.roomName || 'Luxury Chalet'}</span></div>
            <div class="meta-row"><span class="meta-label">Check-In:</span> <span class="meta-val">${booking.checkIn} (From 2:00 PM)</span></div>
            <div class="meta-row"><span class="meta-label">Check-Out:</span> <span class="meta-val">${booking.checkOut} (Until 11:00 AM)</span></div>
            <div class="meta-row"><span class="meta-label">Duration & Guests:</span> <span class="meta-val">${nights} Nights • ${booking.guests || 2} Guests</span></div>
          </div>
        </div>

        <!-- Charges Table -->
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>HSN/SAC</th>
              <th>Qty / Duration</th>
              <th class="text-right">Unit Rate (INR)</th>
              <th class="text-right">Taxable Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${booking.roomName}</strong><br>
                <span style="font-size:10px; color:#6b7280;">Includes complimentary daily breakfast buffet, estate high tea & private fireplace lighting</span>
              </td>
              <td>996311</td>
              <td>${nights} Nights</td>
              <td class="text-right">₹${Math.round(baseRate / nights).toLocaleString('en-IN')}</td>
              <td class="text-right">₹${baseRate.toLocaleString('en-IN')}</td>
            </tr>
            ${(booking.addOns && booking.addOns.length > 0) ? booking.addOns.map(addon => `
              <tr>
                <td><strong>Curated Add-On:</strong> ${addon}</td>
                <td>996331</td>
                <td>1 Package</td>
                <td class="text-right">Included</td>
                <td class="text-right">Included</td>
              </tr>
            `).join('') : ''}
          </tbody>
        </table>

        <!-- Bill Summary -->
        <div class="bill-summary">
          <div class="bill-row">
            <span>Subtotal (Taxable Value):</span>
            <span>₹${baseRate.toLocaleString('en-IN')}</span>
          </div>
          <div class="bill-row">
            <span>Central GST (CGST @ 6%):</span>
            <span>₹${cgst.toLocaleString('en-IN')}</span>
          </div>
          <div class="bill-row">
            <span>State GST (SGST @ 6%):</span>
            <span>₹${sgst.toLocaleString('en-IN')}</span>
          </div>
          <div class="bill-row total">
            <span>Net Amount Paid:</span>
            <span>₹${totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- QR Fast-Pass -->
        <div class="qr-placeholder" style="margin-bottom: 24px;">
          <div style="font-size: 28px;">🌲</div>
          <div>
            <strong>Express Gate Fast-Pass:</strong> Present this voucher or booking code <strong style="color:#064e3b;">${booking.bookingId}</strong> at Doddabetta entry gate for VIP golf buggy escort directly to your private chalet.
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="tax-disclaimer">
          <strong>Terms & Conditions of Stay:</strong><br>
          • Check-in time is 2:00 PM; Check-out time is 11:00 AM.<br>
          • Government-issued photo identification is required for all adult guests upon arrival.<br>
          • Fireplace pine firewood is replenished daily between 5:00 PM and 6:30 PM by our butler team.<br>
          • This is a computer-generated tax invoice for luxury hill-station hospitality services under the GST Act.
        </div>

        <!-- Signatures -->
        <div class="footer-signatures">
          <div class="signature-box">
            <div class="sig-line"></div>
            <div>Guest Signature</div>
          </div>
          <div class="signature-box">
            <div style="font-family: 'Playfair Display', Georgia, serif; font-style:italic; font-size:16px; color:#064e3b; margin-bottom:2px;">Rajesh Vardhan</div>
            <div class="sig-line"></div>
            <div>Authorized Signatory<br><strong>Nilgiri Mist Resort & Spa</strong></div>
          </div>
        </div>

      </div>

      <script>
        window.onload = function() {
          window.focus();
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  // Open clean popup print window
  const printWindow = window.open('', '_blank', 'width=880,height=900,menubar=no,toolbar=no,status=no');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  } else {
    // If popups are blocked by browser, fallback to hidden iframe printing
    let printIframe = document.getElementById('resort-print-iframe');
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'resort-print-iframe';
      printIframe.style.position = 'fixed';
      printIframe.style.top = '-9999px';
      printIframe.style.left = '-9999px';
      printIframe.style.width = '0px';
      printIframe.style.height = '0px';
      document.body.appendChild(printIframe);
    }
    const doc = printIframe.contentWindow.document;
    doc.open();
    doc.write(printContent);
    doc.close();
    printIframe.contentWindow.focus();
    printIframe.contentWindow.print();
  }
};
