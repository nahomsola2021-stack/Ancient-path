import { X, Heart, Sparkles, Trash2, Clock } from 'lucide-react';
import { TourPackage } from '../types';
import { TOURS_DATA } from '../data/toursData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTourIds: string[];
  onRemoveSavedTour: (tourId: string) => void;
  onSelectTour: (tour: TourPackage) => void;
  onPlanWithSaved: () => void;
}

export const WishlistDrawer = ({
  isOpen,
  onClose,
  savedTourIds,
  onRemoveSavedTour,
  onSelectTour,
  onPlanWithSaved
}: WishlistDrawerProps) => {
  if (!isOpen) return null;

  const savedTours = TOURS_DATA.filter(t => savedTourIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        id="saved-wishlist-drawer"
        className="bg-[#F8F5EF] border-l border-[#E8D8BD] w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 relative"
      >
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E8D8BD] mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B85C38] fill-[#B85C38]" />
              <h3 className="font-serif text-xl text-[#173C35] font-bold">
                Saved Journeys ({savedTours.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#252525]/60 hover:text-[#173C35] hover:bg-[#E8D8BD]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Saved Tours */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-240px)]">
            {savedTours.length > 0 ? (
              savedTours.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-[#E8D8BD] rounded-xl p-3.5 flex items-center justify-between gap-3 group shadow-sm"
                >
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectTour(t);
                    }}
                  />
                  
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onClose(); onSelectTour(t); }}>
                    <h4 className="font-serif text-sm text-[#173C35] font-bold truncate group-hover:text-[#B85C38]">
                      {t.title}
                    </h4>
                    <span className="text-[11px] text-[#252525]/70 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#B85C38]" /> {t.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveSavedTour(t.id)}
                    className="p-2 text-[#252525]/40 hover:text-red-600 transition-colors shrink-0"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3">
                <Heart className="w-10 h-10 text-[#E8D8BD] mx-auto" />
                <p className="text-xs text-[#252525]/70">
                  No saved journeys yet. Explore our tour collection and click the heart icon to save your favorites.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        {savedTours.length > 0 && (
          <div className="pt-4 border-t border-[#E8D8BD] space-y-2">
            <button
              onClick={() => {
                onClose();
                onPlanWithSaved();
              }}
              className="w-full py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Trip With Saved ({savedTours.length})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
