import { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { TourPackage, Destination } from '../types';
import { TOURS_DATA } from '../data/toursData';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TRAVEL_INFO_CARDS } from '../data/faqsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTour: (tour: TourPackage) => void;
  onSelectDestination: (dest: Destination) => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectTour,
  onSelectDestination
}: SearchModalProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTours = query.trim() === '' 
    ? TOURS_DATA.slice(0, 3) 
    : TOURS_DATA.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.summary.toLowerCase().includes(query.toLowerCase()) ||
        t.route.toLowerCase().includes(query.toLowerCase())
      );

  const filteredDests = query.trim() === '' 
    ? DESTINATIONS_DATA.slice(0, 4) 
    : DESTINATIONS_DATA.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.summary.toLowerCase().includes(query.toLowerCase()) ||
        d.region.toLowerCase().includes(query.toLowerCase())
      );

  const filteredInfo = query.trim() === ''
    ? []
    : TRAVEL_INFO_CARDS.filter(i => 
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.summary.toLowerCase().includes(query.toLowerCase()) ||
        i.details.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn">
      <div 
        id="global-search-modal"
        className="bg-[#F8F5EF] border border-[#E8D8BD] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
      >
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-[#E8D8BD] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B85C38] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours, destinations, practical info, festivals..."
            className="w-full bg-transparent text-[#252525] text-sm sm:text-base focus:outline-none placeholder-[#252525]/40"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#252525]/60 hover:text-[#173C35] hover:bg-[#F8F5EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#F8F5EF]">
          
          {/* Tours Matches */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
              Journeys & Itineraries
            </span>
            <div className="space-y-2">
              {filteredTours.length > 0 ? (
                filteredTours.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onSelectTour(t);
                    }}
                    className="p-3 bg-white border border-[#E8D8BD] hover:border-[#B85C38] rounded-xl cursor-pointer flex items-center justify-between transition-colors group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-serif text-sm text-[#173C35] font-bold group-hover:text-[#B85C38]">
                          {t.title}
                        </h4>
                        <span className="text-[11px] text-[#252525]/70 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B85C38]" /> {t.duration} • {t.route}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#252525]/50 group-hover:text-[#B85C38] group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#252525]/60 py-2">No journey matches found.</div>
              )}
            </div>
          </div>

          {/* Destinations Matches */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
              Destinations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredDests.length > 0 ? (
                filteredDests.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onSelectDestination(d);
                    }}
                    className="p-3 bg-white border border-[#E8D8BD] hover:border-[#B85C38] rounded-xl cursor-pointer flex items-center gap-3 transition-colors group shadow-sm"
                  >
                    <img src={d.image} alt={d.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-serif text-sm text-[#173C35] font-bold group-hover:text-[#B85C38]">
                        {d.name}
                      </h4>
                      <span className="text-[10px] text-[#252525]/70">{d.region} Region</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#252525]/60 py-2">No destination matches found.</div>
              )}
            </div>
          </div>

          {/* Practical Info Matches */}
          {filteredInfo.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                Practical Travel Guides
              </span>
              <div className="space-y-2">
                {filteredInfo.map((info) => (
                  <div key={info.id} className="p-3 bg-white border border-[#E8D8BD] rounded-xl text-xs shadow-sm">
                    <h5 className="font-bold text-[#173C35] mb-1">{info.title} ({info.tag})</h5>
                    <p className="text-[#252525]/75 line-clamp-2">{info.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-[#E8D8BD] text-[11px] text-[#252525]/60 flex items-center justify-between">
          <span>Press ESC or click anywhere to exit</span>
          <span className="text-[#173C35] font-bold">Ancient Path Ethiopia</span>
        </div>

      </div>
    </div>
  );
};


