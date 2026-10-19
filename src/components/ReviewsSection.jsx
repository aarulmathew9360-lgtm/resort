import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { REVIEWS } from '../data/resortData';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, Sparkles, X } from 'lucide-react';

const ReviewsSection = () => {
  const { lang, t, showToast } = useResort();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    room: 'The Cloud-Mist Glasshouse Chalet',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const added = {
      id: 'rev-' + Date.now(),
      author: newReview.name,
      location: newReview.location || 'India',
      rating: newReview.rating,
      date: 'Just now',
      room: newReview.room,
      content: newReview.comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    setReviewsList([added, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({ name: '', location: '', room: 'The Cloud-Mist Glasshouse Chalet', rating: 5, comment: '' });
    showToast(lang === 'ta' ? 'உங்கள் கருத்து வெற்றிகரமாக பகிரப்பட்டது!' : 'Thank you! Your verified mountain review is live.');
  };

  return (
    <section className="py-24 relative z-20 bg-[#08120e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{lang === 'ta' ? 'உண்மை அனுபவங்கள்' : 'Verified Guest Voices'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white">
              {t.reviewsHeading}
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/15 transition-all shadow-md"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-300" />
            <span>{lang === 'ta' ? 'கருத்துப் பதிவு செய்க' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Aggregate Ratings Overview */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
            <div className="text-5xl font-bold font-serif-luxury text-white">4.96</div>
            <div className="flex justify-center md:justify-start gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-400">Based on 642 verified guest stays on Doddabetta slopes</p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-stone-400">Location & Views</span>
              <div className="font-bold text-white text-base mt-0.5">4.99 / 5</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[99%]" />
              </div>
            </div>
            <div>
              <span className="text-stone-400">Fireplaces & Coziness</span>
              <div className="font-bold text-white text-base mt-0.5">5.0 / 5</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-amber-400 h-full w-[100%]" />
              </div>
            </div>
            <div>
              <span className="text-stone-400">Tea & Food</span>
              <div className="font-bold text-white text-base mt-0.5">4.94 / 5</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[94%]" />
              </div>
            </div>
            <div>
              <span className="text-stone-400">Butler & Service</span>
              <div className="font-bold text-white text-base mt-0.5">4.98 / 5</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-teal-400 h-full w-[98%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{rev.author}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </h4>
                    <span className="text-[10px] text-stone-400">{rev.location}</span>
                  </div>
                </div>

                <span className="text-[10px] text-emerald-400/80 font-mono bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Verified Stay
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <div className="relative w-full max-w-lg bg-[#0c1813] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl animate-scaleUp text-stone-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold font-serif-luxury text-white">Share Your Stay Experience</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs text-stone-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-stone-300 block mb-1">City / Hometown</label>
                    <input
                      type="text"
                      placeholder="e.g. Chennai, Bangalore, London"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-300 block mb-1">Star Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1">Chalet Stayed In</label>
                  <select
                    value={newReview.room}
                    onChange={(e) => setNewReview({ ...newReview, room: e.target.value })}
                    className="w-full bg-[#0c1813] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none"
                  >
                    <option value="The Cloud-Mist Glasshouse Chalet">The Cloud-Mist Glasshouse Chalet</option>
                    <option value="Colonial Governor's Suite">Colonial Governor's Suite</option>
                    <option value="Pine Whispers Canopy Treehouse">Pine Whispers Canopy Treehouse</option>
                    <option value="Emerald Estate Tea Planter's Cottage">Emerald Estate Tea Planter's Cottage</option>
                    <option value="Kurunji Royal 3-BHK Estate">Kurunji Royal 3-BHK Estate</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-300 block mb-1">Your Review</label>
                  <textarea
                    rows="3"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us about the fireplace, mist views, toy train or tea tasting..."
                    className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ReviewsSection;
