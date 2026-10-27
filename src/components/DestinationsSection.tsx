import { useState } from 'react';
import { 
  Map as MapIcon, 
  Grid, 
  Mountain, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Destination, TourPackage } from '../types';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { DestinationDetailModal } from './DestinationDetailModal';
import { InteractiveMap } from './InteractiveMap';

interface DestinationsSectionProps {
  onSelectTour: (tour: TourPackage) => void;
  onPlanTripToDest: (destId: string) => void;
}

export const DestinationsSection = ({
  onSelectTour,
  onPlanTripToDest
}: DestinationsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedDestModal, setSelectedDestModal] = useState<Destination | null>(null);

  // Six iconic destinations as highlighted in Image 2 mockup
  const iconicDestIds = ['addis-ababa', 'lalibela', 'gondar', 'simien-mountains', 'bahir-dar', 'omo-valley'];
  
  const displayedDests = showAll 
    ? DESTINATIONS_DATA 
    : DESTINATIONS_DATA.filter(d => iconicDestIds.includes(d.id));

  return (
    <section id="destinations-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Image 2 mockup */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            ICONIC DESTINATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Places That Inspire
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed max-w-2xl mx-auto">
            From the high precipices of the Simien Mountains to the sacred rock sanctuaries of Lalibela, explore the extraordinary landscapes and living cultures of Ethiopia.
          </p>
        </div>

        {/* View Switcher (Cards vs Interactive Map) */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center bg-white border border-[#E8D8BD] rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#173C35] text-[#F8F5EF]'
                  : 'text-[#252525]/70 hover:text-[#173C35]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-[#173C35] text-[#F8F5EF]'
                  : 'text-[#252525]/70 hover:text-[#173C35]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display: Grid vs Map */}
        {viewMode === 'map' ? (
          <div className="bg-white p-6 rounded-2xl border border-[#E8D8BD] shadow-sm mb-12">
            <InteractiveMap onSelectDestination={(dest) => setSelectedDestModal(dest)} />
          </div>
        ) : (
          /* 6-card row/grid layout matching Image 2 mockup */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-12">
            {displayedDests.map((dest) => (
              <div
                key={dest.id}
                id={`destination-card-${dest.id}`}
                onClick={() => setSelectedDestModal(dest)}
                className="bg-white border border-[#E8D8BD]/90 rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 hover:border-[#B8955A]"
              >
                {/* Image Container with rounded top */}
                <div className="relative h-44 w-full overflow-hidden bg-[#E8D8BD]/40">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-[#173C35]/80 text-[#F8F5EF] text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {dest.region}
                  </div>
                </div>

                {/* Card Content matching Image 2 */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-sans text-xs font-bold text-[#173C35] tracking-wider uppercase mb-1">
                      {dest.name}
                    </h3>

                    <p className="text-[11px] text-[#252525]/75 line-clamp-2 leading-relaxed mb-3">
                      {dest.tagline || dest.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8D8BD]/60 flex items-center gap-1 text-[11px] text-[#B85C38] font-bold group-hover:text-[#a04e2e]">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Destinations Button matching Image 2 */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-[#173C35] hover:bg-[#122e29] text-[#F8F5EF] text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded shadow transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>{showAll ? 'SHOW ICONIC DESTINATIONS' : 'VIEW ALL DESTINATIONS'}</span>
            <ArrowRight className="w-4 h-4 text-[#B8955A]" />
          </button>
        </div>

      </div>

      {/* Destination Modal */}
      {selectedDestModal && (
        <DestinationDetailModal
          destination={selectedDestModal}
          onClose={() => setSelectedDestModal(null)}
          onSelectTour={onSelectTour}
          onPlanTripToDest={onPlanTripToDest}
        />
      )}
    </section>
  );
};
