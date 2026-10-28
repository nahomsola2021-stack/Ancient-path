import { Users, ShieldCheck, Star, Calendar, ArrowRight } from 'lucide-react';

interface ResponsibleTravelProps {
  onPlanJourney: () => void;
}

export const ResponsibleTravel = ({ onPlanJourney }: ResponsibleTravelProps) => {
  const promisePillars = [
    {
      icon: Users,
      title: 'LOCAL EXPERTS',
      desc: 'Local guides with deep knowledge and passion.'
    },
    {
      icon: ShieldCheck,
      title: 'RESPONSIBLE TRAVEL',
      desc: 'Committed to sustainable and ethical tourism.'
    },
    {
      icon: Star,
      title: 'PERSONAL SERVICE',
      desc: 'Small groups, personal attention, unforgettable experiences.'
    },
    {
      icon: Calendar,
      title: 'FLEXIBLE & TAILORED',
      desc: 'Journeys built around you, not the other way around.'
    }
  ];

  return (
    <section id="responsible-travel-section" className="py-20 lg:py-24 bg-[#E8D8BD]/30 border-b border-[#E8D8BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column container matching Image 2 mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Promise Narrative & 4 Columns */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block">
              OUR PROMISE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#173C35] tracking-tight leading-tight">
              Travel With Purpose
            </h2>

            <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed max-w-xl">
              We believe in responsible travel that respects local cultures, supports communities and protects the places we explore.
            </p>

            <div className="pt-2">
              <button
                onClick={onPlanJourney}
                className="inline-flex items-center gap-2 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded shadow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>OUR APPROACH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Feature Columns below */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#E8D8BD]">
              {promisePillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#B8955A] mb-2 border border-[#E8D8BD]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-sans text-[11px] font-bold tracking-wider text-[#173C35] uppercase">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-[#252525]/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Authentic Photography */}
          <div className="lg:col-span-4 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-[#E8D8BD]">
<img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=85"
              alt="Local Ethiopian guide walking in scenic highlands"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-[#E8D8BD] text-center">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#173C35] block">
                Local Stewards & Knowledge
              </span>
              <span className="text-[11px] text-[#252525]/80">
                Guiding travelers with respect and pride
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};



