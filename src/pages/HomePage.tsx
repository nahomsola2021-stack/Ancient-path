import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  ArrowRight, 
  MapPin, 
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { TourPackage } from '../types';

interface HomePageProps {
  onPlanWithTour: (tour: TourPackage) => void;
  savedTourIds: string[];
  onToggleSaveTour: (tourId: string) => void;
  onSelectTourModal: (tour: TourPackage) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking
}) => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  
  // LIVE FIREBASE STATE
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);
  const [featuredDestinations, setFeaturedDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const qTours = query(collection(db, 'tours'), orderBy('createdAt', 'desc'), limit(4));
    const unsubTours = onSnapshot(qTours, (snap) => {
      setFeaturedTours(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qDest = query(collection(db, 'destinations'), orderBy('createdAt', 'desc'), limit(5));
    const unsubDest = onSnapshot(qDest, (snap) => {
      setFeaturedDestinations(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    return () => { unsubTours(); unsubDest(); };
  }, []);

  const heroSlides = [
    { image: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789937596/ebenwalotmbgiqszetie.jpg", kicker: "THE NORTHERN CIRCUIT", title: "The Ancient Kingdoms", subtitle: "Discover the historic heart of Ethiopia through rock-hewn churches, royal castles, and dramatic mountain landscapes." },
    { image: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789937854/qqoecq1zq0gh0ixocyrw.jpg", kicker: "THE OMO VALLEY", title: "Living Traditions", subtitle: "Immerse yourself in the vibrant, untouched cultures and extraordinary tribes of the south." },
    { image: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789938018/mhnlbosuyl5sfwq5r8jb.jpg", kicker: "SIMIEN MOUNTAINS", title: "The Roof of Africa", subtitle: "Trek through breathtaking escarpments and encounter endemic high-altitude species found nowhere else on earth." }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const discoveryCategories = [
    { name: 'Mountains', icon: '⛰️', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789936924/luss2axnhw8imchwkjnx.jpg' },
    { name: 'History', icon: '🏛️', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789847792/nf8qzfajx1mucoyykiip.jpg' },
    { name: 'Wildlife', icon: '🦁', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789937912/irewwcnxjwy2utnuxqqi.avif' },
    { name: 'Culture', icon: '🏺', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789937754/ctzbwpnlytehkv6zznb5.jpg' }
  ];

  const visualStory = [
    { title: 'ANCIENT HISTORY', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789938241/n79pjzdjboazxhpumypb.jpg' },
    { title: 'WILD LANDSCAPES', image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789938293/eafsz4kczfgeihwegsmr.jpg' }
  ];

  const benefits = [
    { title: 'LOCAL EXPERTS', subtitle: 'Born and raised in Ethiopia' },
    { title: 'AUTHENTIC ROUTES', subtitle: 'Beyond the tourist trails' },
    { title: 'PRIVATE JOURNEYS', subtitle: 'Your pace, your interests' },
    { title: '24/7 SUPPORT', subtitle: 'Always here for you' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const revealElements = pageRef.current.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] overflow-hidden font-sans">
      
      {/* 1. SLIDESHOW HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden bg-black -mt-16 lg:-mt-24">
        {heroSlides.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt={slide.title} className={`w-full h-full object-cover brightness-[0.65] ${idx === currentSlide ? 'animate-hero-zoom' : 'scale-100'}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-32 md:mt-40">
          <div key={currentSlide} className="max-w-3xl">
            <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#B85C38] mb-6 animate-slide-up" style={{ animationDelay: '0ms' }}>{heroSlides[currentSlide].kicker}</span>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white mb-8 tracking-tight leading-[1.05] drop-shadow-lg animate-slide-up" style={{ animationDelay: '150ms' }}>{heroSlides[currentSlide].title}</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>{heroSlides[currentSlide].subtitle}</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 animate-slide-up" style={{ animationDelay: '450ms' }}>
              <button onClick={() => navigate('/tours')} className="w-full sm:w-auto px-10 py-5 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-2xl flex items-center justify-center gap-3 group">
                <span>Explore Journeys</span><ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onOpenBooking} className="w-full sm:w-auto px-10 py-5 border border-white/50 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                Book Your Expedition
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full z-20">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto">
              <span className="text-white font-serif text-lg">
                0{currentSlide + 1} <span className="text-white/40 text-sm mx-1">/</span> <span className="text-white/40 text-sm">0{heroSlides.length}</span>
              </span>
              <div className="h-[2px] w-48 bg-white/20 relative overflow-hidden flex-1 md:flex-none">
                <div key={currentSlide} className="absolute top-0 left-0 h-full bg-[#B85C38] animate-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK DISCOVERY */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <h2 className="text-center text-xs font-bold tracking-[0.25em] text-[#B85C38] mb-16 uppercase scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">Choose Your Experience</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {discoveryCategories.map((cat, idx) => (
            <div key={idx} className="group relative h-56 md:h-80 overflow-hidden cursor-pointer scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 rounded-xl" style={{ transitionDelay: `${idx * 100}ms` }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">{cat.icon}</span>
                <span className="text-sm font-bold tracking-widest uppercase">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto border-t border-gray-200">
        <div className="mb-16 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          <span className="text-xs font-bold tracking-[0.2em] text-[#B85C38] block mb-4 uppercase">Iconic Regions</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A]">Places That Stay With You</h2>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#B85C38] mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Loading Regions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[900px]">
            {featuredDestinations.map((dest, idx) => {
              const isLarge = idx === 0; 
              return (
                <div key={dest.id} onClick={() => navigate(`/destinations/${dest.id}`)} className={`group relative overflow-hidden cursor-pointer scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 rounded-2xl ${isLarge ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-full' : 'md:col-span-1 md:row-span-1 h-[300px] md:h-full'}`}>
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className={`font-serif text-white ${isLarge ? 'text-5xl md:text-6xl' : 'text-3xl'} mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>{dest.name}</h3>
                    <div className="flex items-center text-[#B85C38] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-xs font-bold tracking-widest uppercase">
                      Explore Region <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. FEATURED TOURS */}
      <section className="py-32 bg-white px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-16 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#B85C38] block mb-4 uppercase">Handpicked Itineraries</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A]">Curated Journeys</h2>
            </div>
            <Link to="/tours" className="hidden md:flex items-center text-xs font-bold uppercase tracking-widest hover:text-[#B85C38] transition-colors border-b border-black pb-1 hover:border-[#B85C38]">
              View All Tours <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-[#B85C38] mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Loading Journeys...</p>
            </div>
          ) : featuredTours.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">No journeys available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {featuredTours.map((tour) => (
                <div key={tour.id} className="group cursor-pointer scroll-reveal opacity-0 translate-y-12 transition-all duration-1000" onClick={() => navigate(`/tours/${tour.id}`)}>
                  <div className="relative h-[450px] overflow-hidden mb-8 rounded-2xl">
                    <img src={tour.image || 'https://via.placeholder.com/600'} alt={tour.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg rounded-sm">
                      {tour.daysCount || 1} Days
                    </div>
                  </div>
                  <div className="flex justify-between items-start pr-4">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl mb-3 group-hover:text-[#B85C38] transition-colors line-clamp-1">{tour.title}</h3>
                      <div className="flex items-center text-gray-500 text-xs font-bold tracking-widest uppercase">
                        <MapPin className="w-4 h-4 mr-2 text-[#B85C38]" /> {tour.route || 'Ethiopia'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Link to="/tours" className="md:hidden mt-12 flex items-center justify-center text-xs font-bold uppercase tracking-widest border border-black py-4 hover:bg-black hover:text-white transition-colors rounded-lg">
            View All Tours
          </Link>
        </div>
      </section>

      {/* 5. VISUAL ETHIOPIA STORY */}
      <section className="w-full bg-black">
        {visualStory.map((story, idx) => (
          <div key={idx} className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={story.image} alt={story.title} className="w-full h-full object-cover opacity-50" style={{ transform: 'translateZ(0)' }} />
            </div>
            <h2 className="relative z-10 text-5xl md:text-8xl font-serif text-white uppercase text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 drop-shadow-2xl px-4">{story.title}</h2>
          </div>
        ))}
      </section>

      {/* 6. WHY TRAVEL WITH US */}
      <section className="py-24 bg-[#FDFBF7] px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000" style={{ transitionDelay: `${idx * 150}ms` }}>
              <Compass className="w-10 h-10 mx-auto mb-6 text-[#B85C38]" />
              <h4 className="text-sm font-bold tracking-widest uppercase mb-2">{benefit.title}</h4>
              <p className="text-gray-500 text-sm font-light">{benefit.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRAVEL INSPIRATION */}
      <section className="py-32 bg-white px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] text-[#B85C38] block mb-4 uppercase text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">Journal & Field Notes</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] mb-16 text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">Travel Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "7 DAYS IN NORTHERN ETHIOPIA", img: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789939440/osppvgvrh0q4v7tqsint.jpg" },
              { title: "THE LAND OF THE SIMIEN", img: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789936924/luss2axnhw8imchwkjnx.jpg" },
              { title: "DISCOVERING THE OMO VALLEY", img: "https://res.cloudinary.com/dw1ohipim/image/upload/v1789842989/eqggz7yvayg8ufaacdju.avif" }
            ].map((story, idx) => (
              <div key={idx} className="group cursor-pointer scroll-reveal opacity-0 translate-y-12 transition-all duration-1000" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="relative h-72 overflow-hidden mb-6 rounded-2xl">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                </div>
                <h3 className="font-bold tracking-widest uppercase text-sm md:text-base text-gray-800 group-hover:text-[#B85C38] transition-colors leading-relaxed">{story.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-32 bg-[#FDFBF7] px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          <Star className="w-10 h-10 mx-auto mb-10 text-[#B85C38]" />
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-12 leading-relaxed">
            "We were looking for an authentic experience, not a pre-packaged tour. The attention to detail and local knowledge provided was beyond our expectations."
          </h2>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Sarah & James, UK</div>
        </div>
      </section>

      {/* 9. FINAL BOOKING SECTION */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789842587/tdxfdqwvdwbuzh3uuus6.jpg" alt="Plan Your Trip" className="w-full h-full object-cover brightness-[0.40]" />
        </div>
        <div className="relative z-10 text-center px-4 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          <span className="text-xs font-bold tracking-[0.3em] text-[#B85C38] block mb-6 uppercase">Begin Your Adventure</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">READY TO DISCOVER ETHIOPIA?</h2>
          <p className="text-white/80 mb-12 max-w-xl mx-auto text-lg font-light">Tell us what you want to experience. We'll help create the journey.</p>
          <button onClick={onOpenBooking} className="px-12 py-5 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-2xl rounded-sm">
            Book Journey
          </button>
        </div>
      </section>

      {/* Global Styles for Animations */}
      <style dangerouslySetInnerHTML={{__html: `@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.1); } } .animate-hero-zoom { animation: heroZoom 10s ease-out forwards; } @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-slide-up { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; } @keyframes progressFill { from { width: 0%; } to { width: 100%; } } .animate-progress-fill { animation: progressFill 6s linear forwards; }`}} />
    </div>
  );
};