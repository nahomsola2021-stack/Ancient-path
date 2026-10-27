import { 
  Hourglass, 
  MapPin, 
  Headphones, 
  Sliders, 
  HeartHandshake, 
  Sparkles
} from 'lucide-react';
import { WHY_ANCIENT_PATH, OUR_APPROACH_POINTS } from '../data/experiencesData';

interface WhyUsSectionProps {
  onPlanJourney: () => void;
}

export const WhyUsSection = ({ onPlanJourney }: WhyUsSectionProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Hourglass': return Hourglass;
      case 'MapPin': return MapPin;
      case 'Headphones': return Headphones;
      case 'Sliders': return Sliders;
      case 'HeartHandshake': return HeartHandshake;
      default: return Sparkles;
    }
  };

  return (
    <section id="about-why-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block">
              ABOUT ANCIENT PATH
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#173C35] tracking-tight leading-tight">
              Our Story & Philosophy
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#252525]/85 leading-relaxed font-light">
              <p className="font-serif text-xl text-[#B85C38] italic font-normal">
                “Ancient Path was born from a simple idea: Ethiopia deserves to be experienced beyond the usual itinerary.”
              </p>
              <p>
                Ethiopia has an extraordinary story to tell. It is one of Africa’s most historically rich and culturally diverse countries, yet no single checklist can capture everything that makes it special.
              </p>
              <p>
                Rather than simply moving travelers from one landmark to another, we create journeys that connect the destination’s history with its present, its landscapes with its people and its famous sights with the everyday experiences that often go unnoticed.
              </p>
              <p>
                Our role is simple: to help you experience more of the country while making the journey itself part of the experience.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onPlanJourney}
                className="inline-flex items-center gap-2 bg-[#173C35] hover:bg-[#122e29] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded shadow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-[#B8955A]" />
                <span>Begin Your Journey</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8D8BD] shadow-md">
              <img
                src="https://res.cloudinary.com/dw1ohipim/image/upload/v1784044759/obsdtkl6xk8xosibyqj0.jpg"
                alt="Ethiopian landscape and hospitality"
                className="w-full h-[420px] object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-[#E8D8BD] p-4 rounded-xl shadow-lg">
                <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-1">
                  100% Locally Rooted in Addis Ababa
                </span>
                <p className="text-xs text-[#252525]/85 leading-relaxed">
                  Shaped by people who know the country, understand its diversity and genuinely enjoy sharing it with visitors.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Why Ancient Path Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-widest text-[#B85C38] font-bold block mb-2">
              WHY ANCIENT PATH
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#173C35]">
              Travel With a Local Perspective
            </h3>
            <p className="text-xs sm:text-sm text-[#252525]/75 mt-2">
              We believe a good journey should do more than take you somewhere. It should help you understand where you are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ANCIENT_PATH.map((item, idx) => {
              const Icon = getIcon(item.iconName);
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E8D8BD] hover:border-[#B8955A] rounded-xl p-6 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F8F5EF] border border-[#E8D8BD] flex items-center justify-center text-[#B8955A] mb-4 group-hover:bg-[#173C35] group-hover:text-[#F8F5EF] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl text-[#173C35] font-medium mb-2 group-hover:text-[#B85C38] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Approach (The Way We Travel) */}
        <div className="bg-[#E8D8BD]/30 border border-[#E8D8BD] rounded-2xl p-8 sm:p-12 relative">
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] uppercase tracking-widest text-[#B85C38] font-bold block mb-2">
              OUR APPROACH
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#173C35]">
              The Way We Travel
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OUR_APPROACH_POINTS.map((approach, idx) => (
              <div key={idx} className="border-l-2 border-[#B85C38] pl-5 space-y-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B8955A]">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-xl text-[#173C35] font-medium">
                  {approach.title}
                </h4>
                <p className="font-serif italic text-xs text-[#B85C38]">
                  {approach.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
