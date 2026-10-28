import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  Mountain, Sparkles, ArrowRight, Search, X, Loader2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InteractiveMap } from '../components/InteractiveMap';
import { SEO } from '../components/SEO'; // <-- SEO IMPORTED HERE

export const DestinationsPage: React.FC = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const [destinations, setDestinations] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState<string>('lalibela');

  useEffect(() => {
    const unsubDest = onSnapshot(collection(db, 'destinations'), (snap) => {
      setDestinations(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubTours = onSnapshot(collection(db, 'tours'), (snap) => {
      setTours(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return () => { unsubDest(); unsubTours(); };
  }, []);

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
  }, [selectedRegion, searchQuery, isLoading]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (selectedRegion !== 'All' && dest.region?.toLowerCase() !== selectedRegion.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name?.toLowerCase().includes(q);
        const matchesTagline = dest.tagline?.toLowerCase().includes(q);
        const matchesSummary = dest.summary?.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesSummary) return false;
      }
      return true;
    });
  }, [selectedRegion, searchQuery, destinations]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden">
      <SEO 
        title="Destinations & Places of Wonder"
        description="From the high-altitude monoliths of the north to the otherworldly Danakil Depression, Ethiopia, and the deep tribal valleys of the south."
        keywords="danakil depression ethiopia, ethiopia destinations, african safari, ethiopia tours"
      />
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789940061/wd6vg6ywq9gv7p6nh25c.jpg" 
            alt="Ethiopian Highlands" 
            className="w-full h-full object-cover animate-slow-zoom brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Destinations' }]} className="mb-8 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8D8BD] block mb-4 drop-shadow-md">
            DISCOVER ETHIOPIA
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg">
            Places of Wonder
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl drop-shadow-md">
            From the high-altitude monoliths of the north to the otherworldly <strong>Danakil Depression, Ethiopia</strong>, and the deep tribal valleys of the south perfect for an authentic <strong>African safari</strong>.
          </p>
        </div>
      </section>

      {/* COMPACT & MOBILE-OPTIMIZED FILTER BAR */}
      <section className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gray-200 transition-all shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1">
              {(['All', 'North', 'South', 'East', 'Central'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`shrink-0 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                    selectedRegion === reg ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {reg === 'All' ? 'All Regions' : `${reg}`}
                </button>
              ))}
            </div>

            <div className="flex items-center w-full md:w-auto justify-end">
              {isSearchOpen ? (
                <div className="flex items-center border-b border-black w-full md:w-64 pb-1 animate-fade-in">
                  <Search className="w-4 h-4 text-black mr-2 shrink-0" />
                  <input type="text" autoFocus placeholder="Search places..." className="bg-transparent border-none outline-none text-sm w-full font-serif italic placeholder:text-gray-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="shrink-0"><X className="w-4 h-4 text-gray-400 hover:text-black" /></button>
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 md:w-4 md:h-4" /> Search
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85C38] block mb-2">GEOGRAPHIC EXPLORER</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">Interactive Route Map</h2>
            </div>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm md:text-right">Select any regional pin on the map to explore destination details and connected journeys.</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 delay-100 bg-[#FDFBF7] p-4 md:p-8">
            <InteractiveMap onSelectDestination={(dest) => { setActiveMapPin(dest.id); navigate(`/destinations/${dest.id}`); }} selectedDestinationId={activeMapPin} />
          </div>
        </div>
      </section>

      {/* DESTINATION CARDS */}
      <section className="py-16 md:py-20 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-10 text-sm text-gray-500 font-medium">
          Showing <strong className="text-black">{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
        </div>

        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
             <Loader2 className="w-10 h-10 animate-spin text-[#B85C38] mb-4" />
             <p className="text-sm font-bold uppercase tracking-widest">Loading Destinations...</p>
           </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-24 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 bg-white border border-dashed border-gray-200 rounded-3xl">
            <h3 className="font-serif text-3xl text-black mb-4">No Destinations Found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find a location matching your search.</p>
            <button onClick={() => { setSelectedRegion('All'); setSearchQuery(''); }} className="px-8 py-3 border border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors rounded-full">
              View All Places
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredDestinations.map((dest, idx) => {
              const connectedIds = dest.connectedTourIds || [];
              const linkedToursCount = tours.filter((t) => connectedIds.includes(t.id)).length;

              return (
                <div key={dest.id} className="group cursor-pointer scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 flex flex-col" style={{ transitionDelay: `${(idx % 3) * 150}ms` }} onClick={() => navigate(`/destinations/${dest.id}`)}>
                  <div className="relative h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden mb-6 bg-gray-100 rounded-2xl md:rounded-none">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black z-10 rounded-sm">
                      {dest.region} Ethiopia
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-10">
                      <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {dest.name}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm italic font-serif line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between pr-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">{dest.summary}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                        {linkedToursCount} Connected {linkedToursCount === 1 ? 'Tour' : 'Tours'}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-black transition-colors flex items-center gap-2">
                        Explore Guide <ArrowRight className="w-3.5 h-3.5 text-[#B85C38] group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* BESPOKE BANNER */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden mt-10">
        <div className="absolute inset-0">
<img 
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789838174/qetz4xx1wcbtfhemlwup.webp" 
            alt="Bespoke Travel" 
            className="w-full h-full object-cover brightness-[0.35]"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 text-center px-4 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 max-w-3xl">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#B85C38] block mb-4 md:mb-6">COMBINE YOUR DREAM REGIONS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-tight">Cross the Northern Highlands and Southern Valleys</h2>
          <p className="text-white/80 mb-8 md:mb-10 text-sm md:text-lg font-light max-w-xl mx-auto">We design cross-regional journeys combining scenic flights and rugged overland expeditions for an unparalleled discovery.</p>
          <button onClick={() => navigate('/planner')} className="px-8 md:px-10 py-3.5 md:py-5 bg-white text-black text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto gap-3 rounded-full">
            <Sparkles className="w-4 h-4 text-[#B85C38]" /> Customize Route
          </button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; width: 0; } to { opacity: 1; width: 100%; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

