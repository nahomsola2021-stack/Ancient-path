import { X, Sparkles, Compass, CheckCircle2, ArrowRight, SunMedium, Mountain } from 'lucide-react';
import { Destination, TourPackage } from '../types';
import { TOURS_DATA } from '../data/toursData';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectTour: (tour: TourPackage) => void;
  onPlanTripToDest: (destId: string) => void;
}

export const DestinationDetailModal = ({
  destination,
  onClose,
  onSelectTour,
  onPlanTripToDest
}: DestinationDetailModalProps) => {
  if (!destination) return null;

  const connectedTours = TOURS_DATA.filter(t => destination.connectedTourIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        id="destination-detail-modal"
        className="bg-[#F8F5EF] border border-[#E8D8BD] w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Top Hero Image Header */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden">
<img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover brightness-[0.75]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173C35] via-black/30 to-black/60" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-[#F8F5EF] backdrop-blur-md transition-all"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Tagline */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#B85C38] text-[#F8F5EF] text-[10px] uppercase tracking-widest font-extrabold px-3 py-0.5 rounded">
                {destination.region} Ethiopia
              </span>
              <span className="bg-black/50 text-[#E8D8BD] text-[11px] font-semibold px-3 py-0.5 rounded flex items-center gap-1.5 backdrop-blur-md">
                <Mountain className="w-3 h-3 text-[#B8955A]" />
                {destination.altitude}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F8F5EF] font-medium leading-tight">
              {destination.name}
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#E8D8BD] mt-1">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-[#F8F5EF]">
          
          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-[#E8D8BD] p-3.5 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-1 flex items-center gap-1">
                <SunMedium className="w-3.5 h-3.5 text-[#B8955A]" /> Best Time to Visit
              </span>
              <p className="text-xs sm:text-sm text-[#173C35] font-bold">
                {destination.bestTimeToVisit}
              </p>
            </div>

            <div className="bg-white border border-[#E8D8BD] p-3.5 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-1 flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-[#B8955A]" /> Elevation
              </span>
              <p className="text-xs sm:text-sm text-[#173C35] font-bold">
                {destination.altitude}
              </p>
            </div>

            <div className="bg-white border border-[#E8D8BD] p-3.5 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold block mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#B8955A]" /> Climate
              </span>
              <p className="text-xs sm:text-sm text-[#173C35] font-bold">
                {destination.climate}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#E8D8BD] rounded-xl p-5 shadow-sm">
            <h3 className="text-xs uppercase tracking-widest text-[#B85C38] font-bold mb-2">
              ABOUT {destination.name.toUpperCase()}
            </h3>
            <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed font-light">
              {destination.fullDescription}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-serif text-xl text-[#173C35] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B8955A]" />
              <span>Destination Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white border border-[#E8D8BD] p-3 rounded-lg shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#252525]/80">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Preview */}
          {destination.gallery && destination.gallery.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-[#173C35] mb-4">
                Visual Perspectives
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {destination.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="h-32 sm:h-40 rounded-xl overflow-hidden border border-[#E8D8BD] shadow-sm">
<img 
                      src={imgUrl} 
                      alt={`${destination.name} perspective ${gIdx + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Tour Packages */}
          {connectedTours.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-[#173C35] mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#B8955A]" />
                <span>Journeys Featuring {destination.name}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connectedTours.map((t) => (
                  <div 
                    key={t.id}
                    className="bg-white border border-[#E8D8BD] hover:border-[#B8955A] rounded-xl p-4 flex flex-col justify-between transition-all shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#B85C38] mb-1">
                        <span className="uppercase font-bold tracking-wider">{t.category === 'signature' ? 'Signature 14D' : 'Flexible Escape'}</span>
                        <span className="font-bold text-[#173C35]">{t.duration}</span>
                      </div>
                      <h4 className="font-serif text-base text-[#173C35] font-medium mb-1">
                        {t.title}
                      </h4>
                      <p className="text-xs text-[#252525]/75 line-clamp-2 mb-3">
                        {t.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectTour(t);
                      }}
                      className="w-full py-2 bg-[#F8F5EF] hover:bg-[#173C35] hover:text-[#F8F5EF] text-xs font-bold text-[#173C35] rounded transition-colors flex items-center justify-center gap-1.5 border border-[#E8D8BD]"
                    >
                      <span>View Tour Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E8D8BD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#252525]/60 block">
              Tailored Destination
            </span>
            <span className="font-serif text-lg text-[#173C35] font-medium">
              Explore {destination.name} with Local Experts
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 rounded border border-[#E8D8BD] text-xs font-bold uppercase tracking-wider text-[#252525] hover:bg-[#F8F5EF] transition-colors"
            >
              Close Guide
            </button>
            <button
              onClick={() => {
                onClose();
                onPlanTripToDest(destination.id);
              }}
              className="w-1/2 sm:w-auto px-6 py-3 rounded bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Trip Here</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};



