import { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  Check, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { TourPackage, TourCategory } from '../types';
import { TOURS_DATA } from '../data/toursData';
import { TourModal } from './TourModal';

interface ToursSectionProps {
  onPlanWithTour: (tour: TourPackage) => void;
  savedTourIds: string[];
  onToggleSaveTour: (tourId: string) => void;
}

export const ToursSection = ({
  onPlanWithTour,
  savedTourIds,
  onToggleSaveTour
}: ToursSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | TourCategory>('all');
  const [selectedTourForModal, setSelectedTourForModal] = useState<TourPackage | null>(null);

  const filteredTours = selectedCategory === 'all' 
    ? TOURS_DATA 
    : TOURS_DATA.filter((t) => t.category === selectedCategory);

  return (
    <section id="tours-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            OUR TOUR COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Find Your Path
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed">
            Whether you have a few days or several weeks, we have a journey to match your time, curiosity, and travel style.
          </p>
        </div>

        {/* Collection Type Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#173C35] text-[#F8F5EF] shadow'
                : 'bg-white text-[#252525]/75 hover:text-[#173C35] border border-[#E8D8BD]'
            }`}
          >
            All Journeys ({TOURS_DATA.length})
          </button>

          <button
            onClick={() => setSelectedCategory('signature')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === 'signature'
                ? 'bg-[#173C35] text-[#F8F5EF] shadow'
                : 'bg-white text-[#252525]/75 hover:text-[#173C35] border border-[#E8D8BD]'
            }`}
          >
            Signature Journeys (14 Days)
          </button>

          <button
            onClick={() => setSelectedCategory('flexible')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === 'flexible'
                ? 'bg-[#173C35] text-[#F8F5EF] shadow'
                : 'bg-white text-[#252525]/75 hover:text-[#173C35] border border-[#E8D8BD]'
            }`}
          >
            Flexible Escapes (1–4 Days)
          </button>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            const isSaved = savedTourIds.includes(tour.id);
            return (
              <div
                key={tour.id}
                id={`tour-card-${tour.id}`}
                className="bg-white border border-[#E8D8BD] hover:border-[#B8955A] rounded-xl overflow-hidden flex flex-col transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-[#E8D8BD]/30">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="bg-[#173C35] text-[#F8F5EF] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                      {tour.category === 'signature' ? 'Signature 14D' : 'Flexible Escape'}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveTour(tour.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved 
                          ? 'bg-[#B85C38] text-white' 
                          : 'bg-black/40 text-[#F8F5EF] hover:bg-black/60'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Duration Banner */}
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-xs text-[#252525] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-[#E8D8BD]">
                    <Clock className="w-3.5 h-3.5 text-[#B8955A]" />
                    <span className="font-bold text-[#173C35]">{tour.duration}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Route */}
                  <div className="flex items-start gap-1.5 text-xs text-[#252525]/70 mb-2 min-h-[32px]">
                    <MapPin className="w-3.5 h-3.5 text-[#B8955A] shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed">{tour.route}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#173C35] font-medium leading-snug mb-3 group-hover:text-[#B85C38] transition-colors">
                    {tour.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed mb-5 line-clamp-3">
                    {tour.summary}
                  </p>

                  {/* Key Highlights Snippet */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-[#E8D8BD]/60 flex-1">
                    {tour.highlights.slice(0, 3).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#252525]/80">
                        <Check className="w-3.5 h-3.5 text-[#B85C38] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#E8D8BD]/60 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTourForModal(tour)}
                      className="flex-1 py-2.5 px-3 rounded border border-[#173C35]/30 hover:border-[#173C35] hover:bg-[#173C35]/5 text-xs font-bold text-[#173C35] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Itinerary</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B85C38]" />
                    </button>

                    <button
                      onClick={() => onPlanWithTour(tour)}
                      className="py-2.5 px-4 rounded bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] text-xs font-bold transition-transform active:scale-95 flex items-center justify-center gap-1 shadow"
                      title="Customize this trip"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Plan</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Tour Detail Modal */}
      {selectedTourForModal && (
        <TourModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
          onPlanWithTour={onPlanWithTour}
          isSaved={savedTourIds.includes(selectedTourForModal.id)}
          onToggleSave={onToggleSaveTour}
        />
      )}
    </section>
  );
};
