import { useState } from 'react';
import { 
  SunMedium, 
  Mountain, 
  Luggage, 
  Wifi, 
  Camera, 
  Heart, 
  FileCheck, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Banknote
} from 'lucide-react';
import { TRAVEL_INFO_CARDS } from '../data/faqsData';

export const TravelInfoSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>('visa');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck': return FileCheck;
      case 'Banknote': return Banknote;
      case 'SunMedium': return SunMedium;
      case 'Mountain': return Mountain;
      case 'Luggage': return Luggage;
      case 'Wifi': return Wifi;
      case 'Camera': return Camera;
      case 'Heart': return Heart;
      default: return HelpCircle;
    }
  };

  return (
    <section id="travel-info-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            PRACTICAL TRAVEL GUIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Before You Travel
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed">
            Essential preparation, climate patterns, currency advice, altitude awareness, and cultural etiquette to help you travel seamlessly and with confidence.
          </p>
        </div>

        {/* Travel Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRAVEL_INFO_CARDS.map((card) => {
            const Icon = getIcon(card.iconName);
            const isExpanded = expandedId === card.id;

            return (
              <div
                key={card.id}
                id={`info-card-${card.id}`}
                className={`bg-white border rounded-xl p-6 transition-all ${
                  isExpanded ? 'border-[#B85C38] shadow-md' : 'border-[#E8D8BD] hover:border-[#B8955A]'
                }`}
              >
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : card.id)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F5EF] border border-[#E8D8BD] flex items-center justify-center text-[#B8955A] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-[#173C35] font-medium">
                        {card.title}
                      </h3>
                      <span className="text-[11px] text-[#B85C38] font-bold">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  <button className="text-[#252525]/60 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#B85C38]" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E8D8BD]/60">
                  <p className="text-xs sm:text-sm text-[#252525]/80 leading-relaxed mb-3">
                    {card.summary}
                  </p>

                  <div className="bg-[#F8F5EF] border border-[#E8D8BD] rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-[#252525]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{card.details}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
