import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  MapPin, 
  Sparkles, 
  Heart, 
  Search, 
  ArrowRight,
  SlidersHorizontal,
  X,
  Clock,
  Loader2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TourPackage } from '../types';

interface ToursPageProps {
  onPlanWithTour: (tour: TourPackage) => void;
  savedTourIds: string[];
  onToggleSaveTour: (tourId: string) => void;
  onOpenQuickPreview: (tour: TourPackage) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  savedTourIds,
  onToggleSaveTour,
  onOpenQuickPreview
}) => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'long'>('all');

  // Firebase State
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Live Tours
  useEffect(() => {
    const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setTours(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const categories = [
    { id: 'all', label: 'All Journeys' },
    { id: 'historical', label: 'Historical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'wildlife', label: 'Wildlife' }
  ];

  // Robust Filtering Logic
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const tourCat = tour.category?.toLowerCase() || '';
        if (tourCat !== selectedCategory.toLowerCase()) return false;
      }
      
      // 2. Duration Filter
      const days = Number(tour.daysCount) || 1;
      if (durationFilter === 'short' && days > 5) return false;
      if (durationFilter === 'long' && days <= 5) return false;
      
      // 3. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tour.title?.toLowerCase().includes(q);
        const matchesRoute = tour.route?.toLowerCase().includes(q);
        const matchesSummary = tour.summary?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesRoute && !matchesSummary) return false;
      }
      
      return true;
    });
  }, [selectedCategory, durationFilter, searchQuery, tours]);

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const revealElements = pageRef.current.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredTours, isLoading]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789939661/skeaidwprmagzcledvkn.jpg" 
            alt="Ethiopian Landscape" 
            className="w-full h-full object-cover brightness-[0.55] animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          <Breadcrumbs items={[{ label: 'Journeys' }]} className="mb-6 text-white/70" />
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-4">
            Curated Journeys
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md">
            Discover Ethiopia through carefully crafted routes combining history, wildlife, and living cultures.
          </p>
        </div>
      </section>

      {/* COMPACT & MOBILE-OPTIMIZED FILTER BAR */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 md:py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
            
            {/* Scrollable Category Pills (Mobile Friendly) */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)} 
                  className={`shrink-0 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors border ${
                    selectedCategory === cat.id 
                      ? 'bg-[#173C35] text-white border-[#173C35] shadow-md' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#173C35] hover:text-[#173C35]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Side-by-Side Search & Duration (Mobile Friendly) */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-9 py-2 text-sm focus:outline-none focus:border-[#173C35] transition-colors" 
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative w-32 shrink-0">
                <select 
                  value={durationFilter} 
                  onChange={(e) => setDurationFilter(e.target.value as any)} 
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-full pl-4 pr-8 py-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#173C35] transition-colors cursor-pointer"
                >
                  <option value="all">Any Days</option>
                  <option value="short">1–5 Days</option>
                  <option value="long">6+ Days</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS GRID */}
      <section className="py-16 md:py-20 max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex items-center justify-between mb-8 md:mb-12 text-sm text-gray-500 font-medium">
          <span>Showing <strong className="text-black">{filteredTours.length}</strong> {filteredTours.length === 1 ? 'journey' : 'journeys'}</span>
          {(selectedCategory !== 'all' || durationFilter !== 'all' || searchQuery) && (
            <button onClick={() => { setSelectedCategory('all'); setDurationFilter('all'); setSearchQuery(''); }} className="text-[#B85C38] hover:text-[#173C35] transition-colors underline underline-offset-4 font-bold uppercase tracking-wider text-xs">
              Clear Filters
            </button>
          )}
        </div>

        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-24 text-gray-400">
             <Loader2 className="w-10 h-10 animate-spin text-[#B85C38] mb-4" />
             <p className="text-sm font-bold uppercase tracking-widest">Loading Journeys...</p>
           </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-24 bg-white border border-gray-200 rounded-[2rem] shadow-sm">
            <h3 className="font-serif text-3xl text-black mb-4">No Journeys Found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find an itinerary matching your current filters.</p>
            <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setDurationFilter('all'); }} className="px-8 py-3 bg-[#173C35] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-black transition-colors shadow-lg">
              View All Journeys
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTours.map((tour, idx) => {
              const isSaved = savedTourIds.includes(tour.id);

              return (
                <div key={tour.id} onClick={() => navigate(`/tours/${tour.id}`)} className="group relative rounded-3xl md:rounded-[2rem] overflow-hidden border border-[#2a5a50] bg-gradient-to-b from-[#173C35] to-[#0e2722] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(23,60,53,0.4)] hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col scroll-reveal opacity-0 translate-y-8" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                  
                  <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-[#0a1a17]">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-90 group-hover:opacity-100" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e2722] via-transparent to-black/20 opacity-90 transition-opacity duration-500" />
                    
                    <button onClick={(e) => { e.stopPropagation(); onToggleSaveTour(tour.id); }} className={`absolute top-4 right-4 md:top-5 md:right-5 p-2.5 md:p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 z-10 ${isSaved ? 'bg-[#B85C38] border-[#B85C38] shadow-lg' : 'bg-black/20 border-white/20 hover:bg-[#B85C38] hover:border-[#B85C38]'}`}>
                      <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-white text-white' : 'text-white/70 hover:text-white'}`} />
                    </button>

                    <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 bg-[#B85C38] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg transform group-hover:translate-x-2 transition-transform duration-500">
                      <Clock className="w-3.5 h-3.5" /> {tour.daysCount || 1} Days
                    </div>
                  </div>

                  <div className="p-5 md:p-8 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-[#E8D8BD] font-bold uppercase tracking-widest mb-3 md:mb-4">
                        <div className="w-6 h-[2px] bg-[#B85C38]" />
                        <span className="truncate">{tour.route || 'Ethiopia'}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-[#F8F5EF] leading-snug mb-3 md:mb-4 group-hover:text-[#B85C38] transition-colors">{tour.title}</h3>
                      <p className="text-xs md:text-sm text-[#E8D8BD]/70 line-clamp-2 leading-relaxed font-light">{tour.summary}</p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[#2a5a50] flex items-center justify-between">
                      <button onClick={(e) => { e.stopPropagation(); onOpenQuickPreview(tour); }} className="text-[10px] md:text-[11px] text-[#E8D8BD]/50 hover:text-[#F8F5EF] font-bold uppercase tracking-widest transition-colors">
                        Quick View
                      </button>
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#E8D8BD] bg-[#1f4a42] px-4 md:px-5 py-2 md:py-2.5 rounded-full group-hover:bg-[#B85C38] group-hover:text-white transition-all duration-300 shadow-md">
                        Explore <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* BESPOKE BANNER */}
      <section className="bg-black text-white py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center scroll-reveal opacity-0 translate-y-12 duration-1000">
          <Sparkles className="w-8 h-8 mx-auto mb-6 text-[#B85C38]" />
          <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6">Create Your Own Journey</h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 font-light">
            Combine historical sites, wildlife encounters, and cultural experiences into a private itinerary tailored exactly to your rhythm.
          </p>
          <button onClick={() => navigate('/planner')} className="px-8 py-3.5 md:py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors rounded-full">
            Start Journey Planner
          </button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-slow-zoom {
          animation: slowZoom 25s ease-in-out infinite alternate;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};