import { 
  Landmark, 
  Users, 
  Coffee, 
  Trees, 
  Compass, 
  Mountain, 
  Camera, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EXPERIENCES_DATA, TRAVEL_STYLES_DATA } from '../data/experiencesData';

interface ExperiencesSectionProps {
  onPlanWithStyle: (styleId: string) => void;
  onExploreTours: () => void;
}

export const ExperiencesSection = ({ onPlanWithStyle }: ExperiencesSectionProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Landmark': return Landmark;
      case 'Users': return Users;
      case 'Coffee': return Coffee;
      case 'Trees': return Trees;
      case 'Compass': return Compass;
      case 'Mountain': return Mountain;
      case 'Camera': return Camera;
      case 'BookOpen': return BookOpen;
      case 'ShieldCheck': return ShieldCheck;
      case 'Clock': return Clock;
      default: return Sparkles;
    }
  };

  return (
    <section id="experiences-section" className="py-20 lg:py-28 bg-[#E8D8BD]/25 border-b border-[#E8D8BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            EXPERIENCE ETHIOPIA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            More Than Places to See
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed">
            Ethiopia is not experienced only through monuments and viewpoints. It is experienced through its people, food, traditions, landscapes and everyday life.
          </p>
        </div>

        {/* 6 Core Experience Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {EXPERIENCES_DATA.map((exp) => {
            const Icon = getIcon(exp.iconName);
            return (
              <div
                key={exp.id}
                id={`experience-card-${exp.id}`}
                className="bg-white border border-[#E8D8BD] hover:border-[#B8955A] rounded-xl overflow-hidden flex flex-col transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#E8D8BD]/30">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4 w-9 h-9 rounded-lg bg-white/95 border border-[#E8D8BD] flex items-center justify-center text-[#B8955A] shadow">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-serif italic text-xs text-[#B85C38] mb-1">
                    {exp.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl text-[#173C35] font-medium leading-snug mb-3 group-hover:text-[#B85C38] transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Key Aspects List */}
                  <div className="space-y-1.5 pt-3 border-t border-[#E8D8BD]/60 flex-1">
                    {exp.keyAspects.map((aspect, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-[#252525]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] shrink-0 mt-1.5" />
                        <span className="leading-snug">{aspect}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Travel Styles: Choose What Inspires You */}
        <div className="bg-white border border-[#E8D8BD] rounded-2xl p-8 sm:p-12 shadow-sm">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-widest text-[#B85C38] font-bold block mb-2">
              TRAVEL STYLES
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#173C35]">
              Choose What Inspires You
            </h3>
            <p className="text-xs sm:text-sm text-[#252525]/75 mt-2">
              Not every traveler explores Ethiopia for the same reason. Tell us your inspiration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRAVEL_STYLES_DATA.map((style) => {
              const StyleIcon = getIcon(style.iconName);
              return (
                <div
                  key={style.id}
                  onClick={() => onPlanWithStyle(style.id)}
                  className="bg-[#F8F5EF] border border-[#E8D8BD]/80 hover:border-[#B8955A] rounded-xl p-5 cursor-pointer transition-all duration-300 group hover:bg-white hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#E8D8BD] flex items-center justify-center text-[#B8955A] mb-3 group-hover:bg-[#173C35] group-hover:text-white transition-colors">
                      <StyleIcon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-lg text-[#173C35] font-medium mb-1.5 group-hover:text-[#B85C38] transition-colors">
                      {style.title}
                    </h4>
                    <p className="text-xs text-[#252525]/75 leading-relaxed">
                      {style.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#E8D8BD]/60 flex items-center justify-between text-[11px] font-bold text-[#B85C38]">
                    <span>Plan with this focus</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
