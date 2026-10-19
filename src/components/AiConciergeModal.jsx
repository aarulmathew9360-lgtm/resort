import React, { useState, useEffect, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Sparkles, 
  Bot, 
  Send, 
  X, 
  MessageSquare, 
  Flame, 
  Compass, 
  Utensils, 
  Calendar, 
  Coffee, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Volume2
} from 'lucide-react';

const AI_SUGGESTIONS = [
  { label: "📅 Plan 3-Day Ooty Itinerary", labelTa: "📅 3 நாள் ஊட்டி சுற்றுலா பிளான்", query: "Can you plan a 3-day luxury itinerary in Ooty for me?" },
  { label: "🔥 Request Fireplace Logs", labelTa: "🔥 அறைக்கு விறகு தேவை", query: "Please dispatch evening fireplace logs and marshmallows to my chalet" },
  { label: "☕ Recommend Dinner Specials", labelTa: "☕ இன்று இரவு சிறந்த உணவு என்ன?", query: "What are your executive chef's signature dinner recommendations tonight?" },
  { label: "🚂 Toy Train Heritage Excursion", labelTa: "🚂 நீலகிரி டாய் டிரெயின் விவரம்", query: "Tell me about the UNESCO Nilgiri Mountain Toy Train ride" },
  { label: "⛅ Weather & What to Pack", labelTa: "⛅ தற்போதைய காலநிலை & உடைகள்", query: "How cold is it in Ooty right now and what warm clothes should I pack?" }
];

const AiConciergeModal = () => {
  const { 
    lang, 
    addConciergeRequest, 
    setIsDiningCartOpen, 
    showToast 
  } = useResort();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: lang === 'ta' 
        ? "வணக்கம்! நான் உங்கள் நீலகிரி மிஸ்ட் ஏஐ பட்லர் (Nilgiri AI Butler). 7,400 அடி உயர இந்த நீலமலையில் உங்கள் தங்குதல் மறக்க முடியாததாக அமைய நான் 24/7 தயார். ஊட்டி சுற்றுலா பிளான், இரவு உணவு, அல்லது உங்கள் அறைக்கு நெருப்பு மூட்டம் (Fireplace) போன்ற எதுவாக இருந்தாலும் கேளுங்கள்!"
        : "Namaskaram! Welcome to Nilgiri Mist. I am your 24/7 Personal Mountain Butler AI. Perched at 7,400 ft on Doddabetta slopes, how may I curate your stay today? Ask me for custom 3-day itineraries, fireside dinners, toy train reservations, or room comforts.",
      timestamp: 'Just now'
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent Response Generator
  const generateAiReply = (userText) => {
    const text = userText.toLowerCase();

    // 1. Fireplace / Room comforts request
    if (text.includes('fire') || text.includes('wood') || text.includes('log') || text.includes('blanket') || text.includes('heater') || text.includes('நெருப்பு') || text.includes('விறகு') || text.includes('கம்பளி')) {
      addConciergeRequest("Evening Fireplace Logs & Marshmallow Service requested via Nilgiri AI", "Room Comfort");
      return {
        text: lang === 'ta'
          ? "உடனடியாக Butler Prakash-க்கு தகவல் அனுப்பப்பட்டுவிட்டது! உங்கள் வில்லாவிற்கு அடுத்த 10 நிமிடங்களில் நறுமண பைன் மர விறகுகள் (Pine logs) மற்றும் சுடச்சுட மார்ஷ்மெல்லோ வந்து சேரும். அறை ஹீட்டர் 22°C-ல் கதகதப்பாக வைக்கப்படும்! 🔥"
          : "I have immediately dispatched Butler Prakash to your chalet! Seasoned aromatic pine firewood, fire starters, and roasting marshmallows will arrive in 8-10 minutes. Your room climate is also being calibrated to a cozy 22°C. 🔥",
        action: { label: "View Butler Request Status", href: "#my-bookings" }
      };
    }

    // 2. 3-Day Itinerary Planner
    if (text.includes('itinerary') || text.includes('plan') || text.includes('day') || text.includes('சுற்றுலா') || text.includes('பிளான்') || text.includes('trip')) {
      return {
        text: lang === 'ta'
          ? `இங்கே உங்கள் பிரத்யேக 3-நாள் ஊட்டி சொகுசு சுற்றுலா திட்டம்:

🌲 நாள் 1: மேகங்களின் மத்தியில் விடியல்
• காலை 7:00: கிளாஸ்ஹவுஸ் பால்கனியில் காலை பனிமூட்டம் & வெள்ளை தேநீர் சுவைத்தல்.
• காலை 10:00: யுனெஸ்கோ நீலகிரி பாரம்பரிய மலை ரயிலில் 16 குகைகள் வழியே பயணம்.
• மாலை 5:30: எஸ்டேட் டெக்கில் இங்கிலிஷ் ஹை-டீ & ஸ்ட்ராபெர்ரி ஸ்கோன்ஸ்.
• இரவு: பைன் காட்டில் வயலின் இசையுடன் கூடிய கேண்டில் லைட் டின்னர்.

🍃 நாள் 2: தேயிலை மணம் & ஆயுர்வேத புத்துணர்ச்சி
• காலை 8:00: தேயிலைத் தோட்டத்தில் கைமுறை தேயிலை பறித்தல் & ஃபேக்டரி டேஸ்டிங்.
• மதியம் 2:00: ரிசார்ட் ஸ்பாவில் நீலகிரி யூகலிப்டஸ் ஆவி & அபியங்க மூலிகை மசாஜ்.
• மாலை 5:00: தொட்டபெட்டா சிகரத்திற்கு (8,652 அடி) மேகங்களின் கடல் காணுதல்.
• இரவு: பைன் மர நெருப்பு மூட்ட அரங்கம் & படகர் பழங்குடி BBQ.

⛰️ நாள் 3: ஏரிகள் & விண்மீன் இரவு
• காலை: தூய 16 AQI காற்றில் சூரிய உதய யோகா.
• மதியம்: பைக்காரா நீர்வீழ்ச்சி மற்றும் அவலாஞ்சி ஏரி படகு சவாரி.
• மாலை: ரிசார்ட்டின் 32°C சுடுநீர் இன்பினிட்டி பூலில் ஓய்வு & ஊட்டி ஹாட் சாக்லேட்.`
          : `Here is your bespoke 3-Day Luxury Ooty & Nilgiris Sanctuary Itinerary:

🌲 Day 1: Romance of the Blue Mountains
• 07:00 AM: Wake up to cloud inversions drifting past your glasshouse chalet; sip single-estate white tea.
• 10:00 AM: VIP first-class salon car ride on the UNESCO Nilgiri Mountain Toy Train across 16 tunnels and 250 bridges.
• 05:30 PM: Colonial High Tea Tower at The Tea Nest Deck overhanging tea slopes.
• 08:00 PM: Candlelight Pine Forest dinner under fairy lights with live acoustic violin.

🍃 Day 2: Single-Estate Tea Culture & Healing
• 08:30 AM: Artisanal tea plucking masterclass with estate tea masters followed by rare cupping.
• 02:00 PM: Nilgiri Eucalyptus Steam & Royal Shirodhara at Ayurveda Shala.
• 05:00 PM: Sunset excursion to Doddabetta Peak (8,652 ft) above a sea of clouds.
• 08:00 PM: Badaga tribal spiced grill & campfire storytelling under the stars.

⛰️ Day 3: Hidden Lakes & Pure Relaxation
• 07:30 AM: Pranayama & sunrise yoga at the cloud deck (pure 16 AQI air).
• 11:30 AM: Chauffeur drive to Pykara waterfalls & private speedboat ride.
• 06:00 PM: Heated 32°C mountain infinity pool dip & signature spiced hot chocolate.`,
        action: { label: "Explore Nilgiri Experiences", href: "#experiences" }
      };
    }

    // 3. Food / Dinner recommendations
    if (text.includes('food') || text.includes('dinner') || text.includes('eat') || text.includes('menu') || text.includes('chocolate') || text.includes('உணவு') || text.includes('சாப்பாடு') || text.includes('டின்னர்')) {
      return {
        text: lang === 'ta'
          ? "இன்று இரவு எங்கள் தலைமை செஃப் பரிந்துரைக்கும் ஸ்பெஷல் உணவுகள்:\n\n1. 🔥 நீலகிரி மட்டன் சுக்கா & கேழ்வரகு களி (பச்சை மிளகு & உள்ளூர் மூலிகை மணம்)\n2. 🍕 காட்டு காளான் & பைன் டிரஃபிள் விறகு அடுப்பு பீட்சா\n3. 🍲 மலைக் காய்கறி மூங்கில் குருத்து இஷ்டூ & சூடான ஆப்பம்\n4. ☕ 70% ஊட்டி டார்க் சாக்லேட் & கைவினை மார்ஷ்மெல்லோ ஹாட் கோகோ\n\nநீங்கள் விரும்பினால் உங்கள் அறைக்கே சுடச்சுட கொண்டு வந்து பரிமாறப்படும்!"
          : "Tonight's signature culinary highlights curated by Executive Chef Muthu:\n\n1. 🔥 Nilgiri Mutton Chukka with Badaga Ragi Mudde (Slow-braised with green peppercorns & coriander shoots)\n2. 🍕 Wood-Fired Wild Mushroom & Pine Truffle Sourdough Pizza\n3. 🍲 Nilgiri Bamboo Shoot & Baby Vegetable Coconut Stew with Lace Appams\n4. ☕ 70% Single-Origin Ooty Cocoa with Cinnamon & Vanilla Marshmallows\n\nWould you like me to open your In-Villa dining tray to order now?",
        openCart: true
      };
    }

    // 4. Toy train
    if (text.includes('train') || text.includes('railway') || text.includes('toy') || text.includes('ரயில்')) {
      return {
        text: lang === 'ta'
          ? "நீலகிரி பாரம்பரிய மலை ரயில் (NMR) ஆசியாவிலேயே செங்குத்தான 100 ஆண்டு பழமையான மீட்டர் கேஜ் ரயில் ஆகும்! 16 குகைகள், 250 பாலங்கள் மற்றும் பனிமூட்டமான பள்ளத்தாக்குகளின் வழியே செல்லும். எங்கள் ரிசார்ட் விருந்தினர்களுக்கு சிறப்பு முதல் வகுப்பு சீட்டுகள் மற்றும் பிக்கப்-டிராப் கார் வசதியை நாங்கள் செய்கிறோம்!"
          : "The UNESCO World Heritage Nilgiri Mountain Railway (NMR) is Asia's steepest meter-gauge cog railway! Built in 1908, the vintage steam locomotive puffs through 16 mountain tunnels and 250 bridges. As our resident guest, our concierge provides direct first-class priority bookings with private chauffeur transfers to Ooty/Coonoor station.",
        action: { label: "Book Toy Train Excursion", href: "#experiences" }
      };
    }

    // 5. Weather & clothing
    if (text.includes('weather') || text.includes('cold') || text.includes('temp') || text.includes('clothes') || text.includes('pack') || text.includes('குளிர்') || text.includes('வானிலை')) {
      return {
        text: lang === 'ta'
          ? "தற்போது தொட்டபெட்டா சரிவில் வெப்பநிலை 14°C ஆக உள்ளது. இரவில் 8°C வரை குளிர் குறையும்! இதமான கம்பளி ஆடைகள், ஸ்வெட்டர் மற்றும் வாக்கிங் ஷூக்களை எடுத்து வரவும். அனைத்து வில்லாக்களிலும் விறகு ஃபயர்பிளேஸ் மற்றும் 22°C ஹீட்டர்கள் தயாராக உள்ளன! 🌲"
          : "Currently on the Doddabetta slopes, our telemetry reads 14°C with a refreshing pine mist. Night temperatures drop to 8°C! We recommend packing warm thermal innerwear, cashmere sweaters, and comfortable walking boots for tea garden trails. All our chalets feature genuine fireplaces and pre-warmed 22°C heating.",
        action: { label: "View Live Mountain Telemetry", href: "#guide" }
      };
    }

    // Default friendly luxury response
    return {
      text: lang === 'ta'
        ? `நிச்சயமாக! நீலகிரி மிஸ்ட் ரிசார்ட்டில் உங்கள் ஒவ்வொரு நிமிடத்தையும் சிறப்பாக்க நாங்கள் உள்ளோம். 

உங்களுக்கு உதவக்கூடிய சில விருப்பங்கள்:
• அறைக்கு உணவு ஆர்டர் செய்ய (In-Villa Dining)
• ஆயுர்வேத மசாஜ் நேரம் ஒதுக்க (Spa Booking)
• தொட்டபெட்டா விடியற்காலை நடைபயணம் (Sunrise Trek)
• உங்கள் அறைக்கு விறகு ஃபயர்பிளேஸ் மூட்ட (Fireplace Setup)

வேறு ஏதேனும் தகவல் வேண்டுமா?`
        : `At your service! Whether you'd like to reserve our Glasshouse Chalet with its private heated jacuzzi, arrange an evening campfire with Badaga tribal spiced BBQ, or book an Ayurvedic herbal therapy, I am here to assist. What would you like to arrange next?`,
      action: { label: "Explore Villas & Suites", href: "#villas" }
    };
  };

  const handleSendMessage = (textToSend = inputMessage) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const replyObj = generateAiReply(query);
      const aiMsg = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        text: replyObj.text,
        action: replyObj.action,
        openCart: replyObj.openCart,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        
        {/* Floating Greeting Pill (Only visible when chat is closed) */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer glass-panel px-3.5 py-2 rounded-2xl border border-amber-400/40 text-xs shadow-2xl flex items-center gap-2 animate-bounce transition-all hover:scale-105 duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span className="font-semibold text-white">
              {lang === 'ta' ? 'ஊட்டி ஏஐ பட்லர் • கேளுங்கள்!' : 'Ask Nilgiri AI Butler'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        )}

        {/* Main Floating Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 border relative group ${
            isOpen 
              ? 'bg-[#0a1711] border-emerald-400 rotate-90 scale-95' 
              : 'bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 border-amber-300/60 hover:scale-110 shadow-emerald-950/80 animate-glow'
          }`}
          title="Nilgiri AI Mountain Concierge"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-emerald-300" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-amber-200 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#08120e] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#091510] border border-emerald-500/40 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden z-50 animate-scaleUp text-stone-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#064e3b] via-teal-900 to-[#064e3b] p-4 border-b border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-black/40 border border-emerald-400/40 flex items-center justify-center text-amber-300 shadow-md">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#091510]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-white text-sm tracking-wide">
                    {lang === 'ta' ? 'நீலகிரி ஏஐ பட்லர்' : 'NILGIRI AI CONCIERGE'}
                  </h3>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    24/7 AI
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200">
                  Doddabetta Slopes • 7,400 ft • Instant Butler Dispatch
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-stone-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#07110d]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-md leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                      : 'bg-white/5 border border-white/10 text-stone-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}

                  {/* Interactive Action Shortcuts inside AI message */}
                  {msg.action && (
                    <a
                      href={msg.action.href}
                      onClick={() => setIsOpen(false)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-400/40 text-emerald-300 font-semibold text-[11px] hover:bg-emerald-900 transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}

                  {msg.openCart && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsDiningCartOpen(true);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold text-[11px] hover:bg-amber-500/30 transition-colors"
                    >
                      <Utensils className="w-3 h-3" />
                      <span>Open In-Villa Dining Menu</span>
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl p-3 w-20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="p-2.5 bg-[#050c09] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {AI_SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white/5 hover:bg-emerald-950 border border-white/10 hover:border-emerald-500/40 text-[10px] text-stone-300 hover:text-white transition-all shrink-0"
              >
                {lang === 'ta' ? sug.labelTa : sug.label}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#08120e] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={lang === 'ta' ? "ஊட்டி சுற்றுலா, உணவு, விறகு பற்றி கேளுங்கள்..." : "Ask about tours, firewood, dining, toy train..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 placeholder:text-stone-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white disabled:opacity-40 transition-all shadow-md shadow-emerald-950"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AiConciergeModal;
