import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  Clock, MapPin, Check, Heart, Share2, ArrowRight, BedDouble, 
  ChevronDown, CheckCircle2, Loader2, Utensils, Shield, AlertCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TourPackage } from '../types';
import { SEO } from '../components/SEO'; // <-- SEO IMPORTED HERE

interface TourDetailPageProps {
  onPlanWithTour: (tour: TourPackage) => void;
  savedTourIds: string[];
  onToggleSaveTour: (tourId: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({
  onPlanWithTour, savedTourIds, onToggleSaveTour
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const [tour, setTour] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState<number | string | null>('all');
  const [copiedShare, setCopiedShare] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  useEffect(() => {
    const fetchTour = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const docSnap = await getDoc(doc(db, 'tours', id));
        if (docSnap.exists()) setTour({ ...docSnap.data(), id: docSnap.id });
        else setTour(null);
      } catch (error) { console.error("Error fetching tour:", error); } 
      finally { setIsLoading(false); }
    };
    fetchTour();
  }, [id]);

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    pageRef.current.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading, tour]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setInquirySubmitted(true); }, 1000);
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="w-12 h-12 text-[#B85C38] animate-spin mb-4" />
      <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Loading Journey...</p>
    </div>
  );

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="text-center animate-fade-in">
        <AlertCircle className="w-12 h-12 text-[#B85C38] mx-auto mb-4" />
        <h2 className="font-serif text-4xl text-black mb-6">Journey Not Found</h2>
        <Link to="/tours" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#B85C38]">Return to All Tours</Link>
      </div>
    </div>
  );

  const isSaved = tour && savedTourIds.includes(tour.id);
  const allDays = tour.itinerary || tour.suggestedJourney || [];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden animate-fade-in">
      {/* DYNAMIC SEO IMPLEMENTATION */}
      <SEO 
        title={tour.title}
        description={tour.summary || tour.route}
        image={tour.image}
      />
      
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover animate-slow-zoom brightness-[0.60]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="absolute top-28 right-4 sm:right-12 z-20 flex flex-col gap-4">
          <button onClick={() => onToggleSaveTour(tour.id)} className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 shadow-2xl border border-white/20 ${isSaved ? 'bg-[#B85C38] text-white' : 'bg-black/50 text-white'}`}>
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button onClick={handleShare} className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-transform hover:scale-110 shadow-2xl border border-white/20 relative">
            <Share2 className="w-5 h-5" />
            {copiedShare && <span className="absolute right-16 bg-white text-black text-[11px] font-bold uppercase tracking-widest px-4 py-2 shadow-xl whitespace-nowrap animate-fade-in">Link Copied!</span>}
          </button>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Journeys', to: '/tours' }, { label: tour.title }]} className="mb-8 text-white/70 text-xs md:text-sm" />
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-white text-black text-xs uppercase font-bold tracking-widest px-4 py-2 shadow-lg">{tour.category || 'Tour'}</span>
            <span className="bg-black/50 text-white border border-white/20 text-xs uppercase font-bold tracking-widest px-4 py-2 backdrop-blur-md flex items-center gap-2 shadow-lg"><Clock className="w-4 h-4 text-[#B85C38]" />{tour.daysCount || 1} Days</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-2xl max-w-4xl">{tour.title}</h1>
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md flex items-center gap-3 uppercase tracking-widest"><MapPin className="w-5 h-5 text-[#B85C38]" /> {tour.route || 'Ethiopia'}</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-8 space-y-28">
            <section className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">THE EXPERIENCE</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-8">Why This Journey</h2>
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                {(tour.overview || tour.summary || '').split('\n').map((para: string, i: number) => <p key={i}>{para}</p>)}
              </div>
            </section>

            <section className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">ITINERARY</span>
                  <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight">Day-by-Day Route</h2>
                </div>
                {allDays.length > 0 && (
                  <button onClick={() => setExpandedDay(expandedDay === 'all' ? null : 'all')} className="hidden md:block text-[11px] font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#B85C38] hover:border-[#B85C38] transition-colors">
                    {expandedDay === 'all' ? 'Collapse All' : 'Expand All'}
                  </button>
                )}
              </div>
              <div className="relative pl-0 md:pl-4">
                <div className="absolute left-[56px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#B85C38] via-[#E8D8BD] to-transparent hidden md:block z-0"></div>
                {allDays.length === 0 ? (
                  <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center"><p className="text-gray-500 font-light italic">Itinerary details are currently being updated.</p></div>
                ) : (
                  allDays.map((dayItem: any) => {
                    const isExpanded = expandedDay === 'all' || expandedDay === dayItem.day;
                    return (
                      <div key={dayItem.day} className="relative mb-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start group">
                        <div className={`flex-shrink-0 w-20 h-20 rounded-full flex flex-col items-center justify-center z-10 shadow-md transition-all duration-500 hidden md:flex ${isExpanded ? 'bg-[#173C35] border-transparent' : 'bg-white border-2 border-[#E8D8BD] group-hover:border-[#B85C38]'}`}>
                          <span className={`text-[9px] uppercase font-bold tracking-widest mb-0.5 transition-colors ${isExpanded ? 'text-[#B8955A]' : 'text-[#B85C38]'}`}>Day</span>
                          <span className={`font-serif text-3xl transition-colors ${isExpanded ? 'text-white' : 'text-[#1A1A1A]'}`}>{dayItem.day}</span>
                        </div>
                        <div className={`flex-1 p-6 md:p-10 transition-all duration-500 w-full relative rounded-2xl ${isExpanded ? 'bg-[#F8F5EF] border border-[#E8D8BD] shadow-[0_15px_40px_rgba(0,0,0,0.06)]' : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'}`}>
                          <div className={`md:hidden text-[10px] uppercase font-bold tracking-widest px-4 py-2 inline-block mb-4 rounded-lg transition-colors ${isExpanded ? 'bg-[#173C35] text-white' : 'bg-gray-100 text-gray-500'}`}>Day {dayItem.day}</div>
                          <div className="flex justify-between items-start cursor-pointer" onClick={() => setExpandedDay(isExpanded && expandedDay !== 'all' ? null : dayItem.day)}>
                            <div className="pr-4">
                              {dayItem.location && <span className="text-[11px] font-bold uppercase tracking-widest text-[#B85C38] mb-3 block flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {dayItem.location}</span>}
                              <h3 className="font-serif text-2xl md:text-3xl text-black leading-snug group-hover:text-[#B85C38] transition-colors">{dayItem.title}</h3>
                            </div>
                            <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-500 mt-1 shrink-0 ${isExpanded ? 'rotate-180 text-black' : ''}`} />
                          </div>
                          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                            <div className="overflow-hidden">
                              <div className="pt-6 border-t border-[#E8D8BD]/50">
                                <div className="bg-white p-6 md:p-8 rounded-xl border border-[#E8D8BD]/50 shadow-sm">
                                  <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">{dayItem.description}</p>
                                  <div className="flex flex-wrap gap-4">
                                    {dayItem.meals && (
                                      <div className="flex items-center gap-2 bg-[#FDFBF7] px-4 py-2.5 border border-[#E8D8BD]/60 text-sm font-medium text-[#173C35] rounded-lg">
                                        <Utensils className="w-4 h-4 text-[#B85C38]" />
                                        <span className="uppercase tracking-widest text-[9px] font-bold text-[#B85C38] mr-1">Meals:</span> {dayItem.meals}
                                      </div>
                                    )}
                                    {dayItem.accommodation && (
                                      <div className="flex items-center gap-2 bg-[#FDFBF7] px-4 py-2.5 border border-[#E8D8BD]/60 text-sm font-medium text-[#173C35] rounded-lg">
                                        <BedDouble className="w-4 h-4 text-[#B85C38]" />
                                        <span className="uppercase tracking-widest text-[9px] font-bold text-[#B85C38] mr-1">Lodging:</span> {dayItem.accommodation}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {tour.highlights && tour.highlights.length > 0 && (
              <section className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">KEY MOMENTS</span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-8">Journey Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tour.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-6 bg-white border border-gray-200 hover:border-[#173C35] transition-colors group shadow-sm rounded-xl">
                      <Check className="w-5 h-5 text-[#B85C38] shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-800 font-light leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white p-8 md:p-10 border border-[#E8D8BD]/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-3xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-3">READY TO TRAVEL?</span>
              <h3 className="font-serif text-3xl text-black mb-4">Secure This Journey</h3>
              <p className="text-gray-500 font-light text-base mb-8 leading-relaxed">Connect with our Addis Ababa team to check dates, receive a tailored quote, or customize this specific itinerary.</p>
              <div className="mb-6 pt-6 border-t border-gray-100 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">Base Price</span>
                  <span className="font-serif text-3xl text-[#173C35]">{tour.price || 'TBD'}</span>
              </div>
              <button onClick={() => onPlanWithTour(tour)} className="w-full py-4 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors flex items-center justify-center gap-2.5 mb-3 rounded-xl shadow-lg">
                <span>Request Booking</span><ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => document.getElementById('quick-inquiry')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 border border-gray-200 text-black font-bold text-xs uppercase tracking-widest hover:border-black transition-colors flex items-center justify-center gap-2.5 rounded-xl">
                <span>Ask a Question</span>
              </button>
            </div>

            <div id="quick-inquiry" className="bg-white p-8 md:p-10 border border-[#E8D8BD]/50 rounded-3xl shadow-sm">
              <h3 className="font-serif text-2xl text-black mb-6">Quick Inquiry</h3>
              {inquirySubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#173C35] mx-auto mb-4" />
                  <p className="text-gray-500 font-light text-base mb-4">Thank you! We will reply within 24 hours.</p>
                  <button onClick={() => setInquirySubmitted(false)} className="text-xs font-bold uppercase tracking-widest text-[#B85C38] border-b border-[#B85C38] pb-0.5">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <input type="text" required placeholder="Name *" className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#B85C38] transition-colors font-light placeholder:text-gray-400" />
                  <input type="email" required placeholder="Email *" className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#B85C38] transition-colors font-light placeholder:text-gray-400" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Dates" className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#B85C38] transition-colors font-light placeholder:text-gray-400" />
                    <select className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#B85C38] transition-colors font-light appearance-none text-gray-500 cursor-pointer">
                      <option>1-2 Guests</option><option>3-4 Guests</option><option>5+ Guests</option>
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#F8F5EF] hover:bg-[#E8D8BD] text-[#173C35] font-bold text-[11px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-[#E8D8BD] rounded-xl mt-2">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-[#173C35] text-[#F8F5EF] p-8 rounded-3xl">
              <h4 className="font-serif text-xl mb-5 flex items-center gap-2.5"><Shield className="w-5 h-5 text-[#B8955A]" /> The Promise</h4>
              <ul className="space-y-3 text-sm text-[#E8D8BD] font-light">
                <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#B8955A] shrink-0 mt-1.5" />Private, unhurried pacing with room to connect.</li>
                <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#B8955A] shrink-0 mt-1.5" />Licensed local guides native to each region.</li>
                <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#B8955A] shrink-0 mt-1.5" />24/7 dedicated Addis Ababa operations team.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `@keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } } .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; } select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background: transparent; }`}} />
    </div>
  );
};