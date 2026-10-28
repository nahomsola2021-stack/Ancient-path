import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreTours: () => void;
  onPlanJourney: () => void;
  onSelectDestination: (destId: string) => void;
}

export const Hero = ({ onExploreTours, onPlanJourney }: HeroProps) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const heroBackgrounds = [
    {
      url: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1787132831/bkck551eiil1tnfsdvkn.webp',
      title: 'Lalibela',
      desc: 'Rock-hewn monolithic churches carved into eternity'
    },
    {
      url: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784044758/hu0fmtskwk5bkljeuvck.jpg',
      title: 'Simien Mountains',
      desc: 'Dramatic escarpments on the Roof of Africa'
    },
    {
      url: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1785762596/at38awk2jml8g4legvyy.webp',
      title: 'Omo Valley',
      desc: 'Cultural Figures and Tribes of Omo Valley'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <section id="hero-section" className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-start overflow-hidden pt-24 pb-16 bg-[#173C35]">
      
      {/* Background Image Carousel with Cinematic Dark Tint */}
      {heroBackgrounds.map((bg, idx) => (
        <div
          key={bg.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentBgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
<img
            src={bg.url}
            alt={bg.title}
            className="w-full h-full object-cover object-center brightness-[0.62] contrast-[1.05]"
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173C35]/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Main Content Container matching Image 2 mockup */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#E8D8BD] uppercase block mb-4">
            TRAVEL BEYOND THE FAMILIAR
          </span>

          {/* Primary Hero Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8F5EF] tracking-tight leading-[1.12] mb-6">
            Discover Ethiopia. <br />
            Ancient Lands. <br />
            Timeless Journeys.
          </h1>

          {/* Supporting Narrative */}
          <p className="text-sm sm:text-base md:text-lg text-[#F8F5EF]/90 font-light leading-relaxed mb-4 max-w-xl">
            Step into a land of history, culture, mountains, wildlife and warm-hearted people.
          </p>

          <p className="text-xs sm:text-sm text-[#E8D8BD]/85 leading-relaxed mb-8 max-w-lg">
            Let us guide you on a journey you will never forget.
          </p>

          {/* Action Buttons matching Image 2 */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-tours-btn"
              onClick={onExploreTours}
              className="inline-flex items-center justify-center gap-2 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>EXPLORE OUR TOURS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-plan-journey-btn"
              onClick={onPlanJourney}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#173C35]/60 text-[#F8F5EF] border border-[#F8F5EF]/70 hover:border-[#F8F5EF] text-xs uppercase tracking-widest font-semibold px-6 sm:px-7 py-3.5 rounded transition-all duration-300 backdrop-blur-sm"
            >
              <span>PLAN YOUR JOURNEY</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {heroBackgrounds.map((bg, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentBgIndex(dotIdx)}
            aria-label={`Slide ${bg.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIdx === currentBgIndex ? 'w-6 bg-[#B85C38]' : 'w-2 bg-[#E8D8BD]/50'
            }`}
          />
        ))}
      </div>

    </section>
  );
};



