import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  Mountain, ThermometerSun, CheckCircle2, Sparkles, ArrowRight, 
  MessageSquare, ShieldCheck, Camera, Calendar, Loader2, AlertCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TourPackage } from '../types';
import { SEO } from '../components/SEO'; // <-- SEO IMPORTED HERE

interface DestinationDetailPageProps {
  onSelectTour: (tour: TourPackage) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ onSelectTour }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const [destination, setDestination] = useState<any>(null);
  const [linkedTours, setLinkedTours] = useState<any[]>([]);
  const [otherDestinations, setOtherDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  useEffect(() => {
    const fetchDestinationData = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const destSnap = await getDoc(doc(db, 'destinations', id));
        if (destSnap.exists()) {
          const destData: any = { ...destSnap.data(), id: destSnap.id };
          setDestination(destData);

          const toursSnap = await getDocs(collection(db, 'tours'));
          const allTours = toursSnap.docs.map(d => ({ ...d.data(), id: d.id } as any));
          const relatedTours = allTours.filter((tour: any) => 
            (destData.connectedTourIds && destData.connectedTourIds.includes(tour.id)) ||
            (tour.route && destData.name && tour.route.toLowerCase().includes(destData.name.toLowerCase()))
          );
          setLinkedTours(relatedTours);

          const otherDestSnap = await getDocs(collection(db, 'destinations'));
          const allDest = otherDestSnap.docs.map(d => ({ ...d.data(), id: d.id } as any));
          setOtherDestinations(allDest.filter((d: any) => d.id !== id).slice(0, 3));
        } else {
          setDestination(null);
        }
      } catch (error) { console.error("Error fetching destination details:", error); } 
      finally { setIsLoading(false); }
    };
    fetchDestinationData();
  }, [id]);

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    pageRef.current.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id, destination, isLoading]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setInquirySubmitted(true); }, 1000);
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="w-12 h-12 text-[#B85C38] animate-spin mb-4" />
      <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Loading Destination...</p>
    </div>
  );

  if (!destination) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-[#B85C38] mx-auto mb-4" />
        <h2 className="font-serif text-4xl text-black mb-4">Destination Not Found</h2>
        <Link to="/destinations" className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#B85C38] hover:border-[#B85C38] transition-colors">Return to All Destinations</Link>
      </div>
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden">
      {/* DYNAMIC SEO IMPLEMENTATION */}
      <SEO 
        title={destination.name}
        description={destination.summary || destination.tagline}
        image={destination.image}
      />
      
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover animate-slow-zoom brightness-[0.60]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Destinations', to: '/destinations' }, { label: destination.name }]} className="mb-8 text-white/70" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white text-black text-[10px] uppercase font-bold tracking-widest px-4 py-2 shadow-lg">{destination.region} Ethiopia</span>
            <span className="bg-black/50 text-white border border-white/20 text-[10px] uppercase font-bold tracking-widest px-4 py-2 backdrop-blur-md flex items-center gap-2 shadow-lg"><Mountain className="w-3.5 h-3.5 text-[#B85C38]" />{destination.altitude || 'Varies'}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg max-w-5xl">{destination.name}</h1>
          <p className="text-xl text-white/90 font-light font-serif italic drop-shadow-md max-w-2xl">{destination.tagline}</p>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0"><Mountain className="w-5 h-5 text-[#B85C38]" /></div>
              <div><span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold mb-1">ELEVATION</span><span className="font-serif text-lg text-black">{destination.altitude || 'Varies'}</span></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0"><Calendar className="w-5 h-5 text-[#B85C38]" /></div>
              <div><span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold mb-1">BEST TIME TO VISIT</span><span className="font-serif text-lg text-black">{destination.bestTimeToVisit || 'Sep - May'}</span></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0"><ThermometerSun className="w-5 h-5 text-[#B85C38]" /></div>
              <div><span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold mb-1">CLIMATE</span><span className="font-serif text-lg text-black">{destination.climate || 'Moderate'}</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-8 space-y-24">
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">DESTINATION FIELD GUIDE</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-8">About {destination.name}</h2>
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>{destination.summary}</p>
                <p>{destination.fullDescription}</p>
              </div>
            </section>
            {destination.highlights && destination.highlights.length > 0 && (
              <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">WHAT TO EXPERIENCE</span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-8">Key Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-100 hover:border-black transition-colors group">
                      <CheckCircle2 className="w-5 h-5 text-[#B85C38] shrink-0 mt-0.5" />
                      <span className="text-base text-gray-800 font-light leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 sticky top-28 space-y-12">
            <div className="bg-white p-8 md:p-10 border border-gray-200 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-2">ADDIS ABABA CONCIERGE</span>
              <h3 className="font-serif text-3xl text-black mb-4">Visit {destination.name}</h3>
              <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">Include {destination.name} as part of a private bespoke expedition or flexible regional extension.</p>
              {inquirySubmitted ? (
                <div className="text-center py-6 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-500 font-light mb-4">Thank you! We will reply within 24 hours.</p>
                  <button onClick={() => setInquirySubmitted(false)} className="text-xs font-bold uppercase tracking-widest text-[#B85C38]">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <input type="text" required placeholder="Your Name *" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light" />
                  <input type="email" required placeholder="Email Address *" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light" />
                  <textarea rows={2} placeholder={`I would love to explore ${destination.name}...`} value={inquiryMessage} onChange={(e) => { setInquiryMessage(e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light resize-none min-h-[40px] overflow-hidden" />
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors flex items-center justify-center gap-3 disabled:opacity-75">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Inquire About Region'}
                  </button>
                </form>
              )}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <button onClick={() => navigate('/book', { state: { destinationId: destination.id } })} className="w-full py-4 border border-gray-200 text-black text-xs font-bold uppercase tracking-widest hover:border-black transition-colors flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-3.5 h-3.5" /><span>Book Custom Journey</span>
                </button>
                <a href={`https://wa.me/251912041252?text=Hello%2C%20I%20am%20interested%20in%20visiting%20${encodeURIComponent(destination.name)}.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] fill-current" /><span>WhatsApp direct chat (+251)</span>
                </a>
              </div>
            </div>

            {otherDestinations.length > 0 && (
              <div className="bg-[#F4EFE6] p-8">
                <h4 className="font-serif text-2xl text-black mb-6">Explore More Regions</h4>
                <div className="space-y-6">
                  {otherDestinations.map((od) => (
                    <Link key={od.id} to={`/destinations/${od.id}`} className="flex items-center gap-4 group">
                      <div className="w-16 h-16 overflow-hidden bg-black shrink-0"><img src={od.image} alt={od.name} className="w-full h-full object-cover brightness-[0.8] group-hover:scale-110 transition-transform duration-700" /></div>
                      <div>
                        <h5 className="font-serif text-lg text-black group-hover:text-[#B85C38] transition-colors mb-1">{od.name}</h5>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">{od.region} Ethiopia</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 bg-black text-white py-20 px-4 md:px-8 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">RESPONSIBLE EXPLORATION</span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-12">Local Etiquette & Travel Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-base text-gray-300 font-light">
            <div className="flex items-start gap-4"><Camera className="w-6 h-6 text-[#B85C38] shrink-0 mt-1" /><p><strong className="text-white font-medium block mb-2">Photography</strong> Always ask permission before photographing individuals. Your guide will facilitate respectful interactions.</p></div>
            <div className="flex items-start gap-4"><ShieldCheck className="w-6 h-6 text-[#B85C38] shrink-0 mt-1" /><p><strong className="text-white font-medium block mb-2">Sacred Sites</strong> Remove shoes before entering churches and monasteries. Modest attire is required.</p></div>
            <div className="flex items-start gap-4"><Sparkles className="w-6 h-6 text-[#B85C38] shrink-0 mt-1" /><p><strong className="text-white font-medium block mb-2">Pacing</strong> Allow unhurried time. Ethiopia’s dramatic altitudes reward slow travel.</p></div>
          </div>
        </div>
      </section>

      {linkedTours.length > 0 && (
        <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 py-24 bg-[#F4EFE6] px-4 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-3">CURATED CIRCUITS</span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight">Tours Featuring {destination.name}</h2>
              </div>
              <Link to="/tours" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-[#B85C38] transition-colors pb-1 border-b border-transparent hover:border-[#B85C38]">
                View All Tours <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {linkedTours.map((tour) => (
                <div key={tour.id} className="bg-white hover:shadow-xl transition-shadow duration-500 flex flex-col md:flex-row items-stretch justify-between group cursor-pointer overflow-hidden border border-[#E8D8BD]/50" onClick={() => navigate(`/tours/${tour.id}`)}>
                  <div className="w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto min-h-[250px] overflow-hidden bg-black shrink-0 relative">
                    <img src={tour.image} alt={tour.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.9] group-hover:brightness-100" />
                  </div>
                  <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">{tour.daysCount || 1} Days</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{tour.category}</span>
                    </div>
                    <h4 className="font-serif text-3xl md:text-4xl text-black group-hover:text-[#B85C38] transition-colors mb-4 leading-snug pr-4">{tour.title}</h4>
                    <p className="text-base md:text-lg text-gray-500 font-light line-clamp-2 leading-relaxed mb-8">{tour.route}</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black mt-auto">
                      <span className="border-b-2 border-transparent group-hover:border-black transition-colors pb-0.5">View Tour Details</span>
                      <ArrowRight className="w-4 h-4 text-[#B85C38] transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{__html: `@keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } } .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }`}} />
    </div>
  );
};

