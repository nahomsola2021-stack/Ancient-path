import { 
  Landmark, 
  Users, 
  Coffee, 
  Mountain, 
  Camera, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

interface IntroductionProps {
  onExploreExperiences: () => void;
  onExploreApproach: () => void;
}

export const Introduction = ({ onExploreApproach }: IntroductionProps) => {
  const corePillars = [
    {
      icon: Landmark,
      title: 'RICH HISTORY & HERITAGE',
      desc: "Explore one of the world's oldest and most fascinating civilizations."
    },
    {
      icon: Users,
      title: 'CULTURE & COMMUNITY',
      desc: 'Meet local communities and experience authentic Ethiopian culture.'
    },
    {
      icon: Coffee,
      title: 'FOOD & COFFEE',
      desc: 'Enjoy traditional cuisine and the world-famous Ethiopian coffee ceremony.'
    },
    {
      icon: Mountain,
      title: 'NATURE & WILDLIFE',
      desc: 'From mountains to lakes and unique wildlife, nature is extraordinary.'
    },
    {
      icon: Camera,
      title: 'AUTHENTIC EXPERIENCES',
      desc: 'Go beyond sightseeing and connect with real Ethiopia.'
    },
    {
      icon: Compass,
      title: 'TAILORED JOURNEYS',
      desc: 'Flexible itineraries designed around your time, interests and style.'
    }
  ];

  return (
    <section id="introduction-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Welcome & Narrative (Image 2 mockup layout) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
              WELCOME TO ANCIENT PATH
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-[1.15] mb-6">
              Ethiopia Is More <br className="hidden sm:inline" />
              Than a Destination
            </h2>

            <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed mb-8">
              It's a story thousands of years in the making. From ancient churches and royal castles to dramatic landscapes and vibrant cultures, Ethiopia offers experiences that stay with you long after you leave.
            </p>

            <div>
              <button
                onClick={onExploreApproach}
                className="inline-flex items-center gap-2 bg-[#173C35] hover:bg-[#122e29] text-[#F8F5EF] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded shadow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 text-[#E8D8BD]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3x2 Feature Grid (Image 2 mockup layout) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white border border-[#E8D8BD]/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#B8955A] transition-all duration-300 flex flex-col items-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F8F5EF] flex items-center justify-center text-[#B8955A] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-sans text-[11px] font-bold tracking-wider text-[#173C35] uppercase mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-[#252525]/75 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


