import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Clock, 
  MapPin, 
  Sparkles, 
  Check, 
  Heart, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { TourPackage } from '../types';

interface TourModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onPlanWithTour: (tour: TourPackage) => void;
  isSaved: boolean;
  onToggleSave: (tourId: string) => void;
}

export const TourModal = ({
  tour,
  onClose,
  onPlanWithTour,
  isSaved,
  onToggleSave
}: TourModalProps) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard escape listener and body scroll lock
  useEffect(() => {
    if (!tour) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose]);

  if (!tour) return null;

  const handleViewFullTour = () => {
    onClose();
    navigate(`/tours/${tour.id}`);
  };

  const handlePlanTrip = () => {
    onClose();
    onPlanWithTour(tour);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
    >
      <div 
        ref={modalRef}
        id="tour-preview-modal"
        className="bg-[#F8F5EF] border border-[#E8D8BD] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col relative transform transition-all animate-scaleUp"
      >
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden group">
          <img 
            src={tour.image} 
            alt={tour.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173C35] via-black/30 to-black/60" />
          
          {/* Quick Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => onToggleSave(tour.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                isSaved 
                  ? 'bg-[#B85C38] text-white' 
                  : 'bg-black/50 text-[#F8F5EF] hover:bg-black/80'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-[#F8F5EF] backdrop-blur-md transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#B85C38]"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges & Title in Header */}
          <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#B85C38] text-[#F8F5EF] text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded shadow">
                {tour.category === 'signature' ? 'Signature 14-Day Circuit' : 'Flexible Escape'}
              </span>
              <span className="bg-black/60 text-[#E8D8BD] text-[11px] font-semibold px-2.5 py-0.5 rounded flex items-center gap-1 backdrop-blur-md">
                <Clock className="w-3 h-3 text-[#B8955A]" />
                {tour.duration}
              </span>
              {tour.difficulty && (
                <span className="bg-[#173C35]/90 text-[#F8F5EF] text-[11px] font-medium px-2.5 py-0.5 rounded backdrop-blur-md">
                  {tour.difficulty} Activity
                </span>
              )}
            </div>

            <h2 id="tour-modal-title" className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#F8F5EF] tracking-tight leading-tight drop-shadow">
              {tour.title}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-[#E8D8BD] mt-1 font-medium drop-shadow truncate">
              <MapPin className="w-3.5 h-3.5 text-[#B85C38] shrink-0" />
              <span className="truncate">{tour.route}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto max-h-[55vh]">
          
          {/* Summary / Overview */}
          <div>
            <p className="text-sm text-[#252525]/85 leading-relaxed">
              {tour.summary}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-white p-4 rounded-xl border border-[#E8D8BD]/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#173C35] block mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
              Key Journey Highlights
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#252525]/80">
                  <Check className="w-3.5 h-3.5 text-[#B85C38] shrink-0 mt-0.5" />
                  <span className="leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#F8F5EF] p-2.5 rounded-lg border border-[#E8D8BD]">
              <span className="text-[10px] text-[#252525]/60 block uppercase tracking-wider font-semibold">STYLE</span>
              <span className="font-semibold text-[#173C35]">Private / Custom</span>
            </div>
            <div className="bg-[#F8F5EF] p-2.5 rounded-lg border border-[#E8D8BD]">
              <span className="text-[10px] text-[#252525]/60 block uppercase tracking-wider font-semibold">PACE</span>
              <span className="font-semibold text-[#173C35]">Thoughtful / Human</span>
            </div>
            <div className="bg-[#F8F5EF] p-2.5 rounded-lg border border-[#E8D8BD] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#252525]/60 block uppercase tracking-wider font-semibold">CUSTOMIZATION</span>
              <span className="font-semibold text-[#B85C38]">100% Tailored</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8D8BD] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleViewFullTour}
            className="w-full sm:w-auto px-5 py-3 rounded-lg border-2 border-[#173C35] text-[#173C35] hover:bg-[#173C35] hover:text-[#F8F5EF] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
          >
            <span>VIEW FULL TOUR ITINERARY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handlePlanTrip}
            className="w-full sm:w-auto px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>PLAN THIS TRIP</span>
          </button>
        </div>

      </div>
    </div>
  );
};
