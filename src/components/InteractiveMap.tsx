import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Destination } from '../types';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import {
  ETHIOPIA_REGIONS,
  ETHIOPIA_RENDER_ORDER,
  ETHIOPIA_VIEWBOX,
  projectLonLatToPercent,
  type LegacyZone,
} from '../data/ethiopiaGeography';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
  selectedDestinationId?: string;
}

/**
 * A destination's position on the map. Prefer real `lon`/`lat` — it gets
 * projected onto the actual geography below, so pins line up with the real
 * coastline and borders. `x`/`y` (0-100 percentages) are supported as a
 * fallback for any destinations not yet migrated to lon/lat.
 */
function resolvePinPosition(dest: Destination): { xPct: number; yPct: number } {
  const coords = dest.coordinates as { lon?: number; lat?: number; x?: number; y?: number };
  if (typeof coords.lon === 'number' && typeof coords.lat === 'number') {
    return projectLonLatToPercent(coords.lon, coords.lat);
  }
  if (typeof coords.x === 'number' && typeof coords.y === 'number') {
    // Legacy percentage coordinates were calibrated to the old stylized
    // outline, not this real one — they'll be in roughly the right area
    // but won't sit exactly on the coastline until migrated to lon/lat.
    return { xPct: coords.x, yPct: coords.y };
  }
  return { xPct: 50, yPct: 50 };
}

export const InteractiveMap = ({ onSelectDestination, selectedDestinationId }: InteractiveMapProps) => {
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const [hoveredRegionCode, setHoveredRegionCode] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<'All' | LegacyZone>('All');

  const regionByCode = useMemo(() => new Map(ETHIOPIA_REGIONS.map((r) => [r.code, r])), []);
  const hoveredRegion = hoveredRegionCode ? regionByCode.get(hoveredRegionCode as never) : undefined;

  return (
    <div className="bg-white border border-[#E8D8BD] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">

      {/* Map Header & Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#B85C38] font-bold block mb-1">
            GEOGRAPHIC EXPLORER
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#173C35] font-bold">
            Interactive Map of Ethiopia
          </h3>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {(['All', 'North', 'South', 'East', 'Central'] as const).map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-3 py-1.5 rounded-full font-bold transition-colors shrink-0 ${
                activeZone === zone
                  ? 'bg-[#173C35] text-[#F8F5EF]'
                  : 'bg-[#F8F5EF] text-[#252525]/70 hover:text-[#173C35] border border-[#E8D8BD]'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG / Stage Canvas */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F8F5EF] border border-[#E8D8BD] rounded-xl overflow-hidden flex items-center justify-center p-4">

        {/* Real Ethiopia geography: 14 admin1 regions, actual boundaries */}
        <svg
          viewBox={`0 0 ${ETHIOPIA_VIEWBOX.width} ${ETHIOPIA_VIEWBOX.height}`}
          className="w-full h-full max-w-2xl max-h-[500px]"
        >
          {ETHIOPIA_RENDER_ORDER.map((code) => {
            const region = regionByCode.get(code);
            if (!region) return null;
            const isActiveZone = activeZone === 'All' || region.legacyZone === activeZone;
            const isHovered = hoveredRegionCode === code;
            return (
              <path
                key={code}
                d={region.d}
                onMouseEnter={() => setHoveredRegionCode(code)}
                onMouseLeave={() => setHoveredRegionCode((cur) => (cur === code ? null : cur))}
                className="transition-colors duration-200"
                fill={isHovered ? '#B85C38' : isActiveZone ? '#E8D8BD' : '#EFE7D4'}
                fillOpacity={isHovered ? 0.35 : isActiveZone ? 0.7 : 0.35}
                stroke="#B8955A"
                strokeWidth={isHovered ? 1.4 : 0.8}
              />
            );
          })}
        </svg>

        {/* Hovered region name chip (only when not already showing a destination card) */}
        {hoveredRegion && !hoveredDest && (
          <div className="absolute top-3 left-3 bg-white/95 border border-[#E8D8BD] rounded-lg px-3 py-1.5 shadow-sm z-20 pointer-events-none">
            <span className="text-[9px] uppercase tracking-wider text-[#B85C38] font-bold block leading-none mb-0.5">
              {hoveredRegion.type === 'city' ? 'Chartered City' : 'Region'}
            </span>
            <span className="font-serif text-sm text-[#173C35] font-bold">
              {hoveredRegion.name}
            </span>
          </div>
        )}

        {/* Destination Pins on Map */}
        {DESTINATIONS_DATA.map((dest) => {
          const isVisible = activeZone === 'All' || dest.region === activeZone;
          const isHovered = hoveredDest?.id === dest.id;
          const { xPct, yPct } = resolvePinPosition(dest);

          if (!isVisible) return null;

          return (
            <div
              key={dest.id}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onMouseEnter={() => setHoveredDest(dest)}
              onClick={() => onSelectDestination(dest)}
            >
              {/* Outer Pulse Ring */}
              <div className={`w-7 h-7 -top-1.5 -left-1.5 absolute rounded-full bg-[#B85C38]/30 transition-transform ${
                isHovered ? 'scale-150 animate-ping' : 'scale-100 opacity-0 group-hover:opacity-100'
              }`} />

              {/* Pin Center */}
              <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                isHovered
                  ? 'bg-[#B85C38] scale-125 shadow-lg shadow-[#B85C38]/50'
                  : 'bg-[#173C35] hover:scale-110'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Label Chip */}
              <div className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-bold tracking-wide transition-all pointer-events-none ${
                isHovered
                  ? 'bg-[#B85C38] text-white shadow-md z-30'
                  : 'bg-white/95 text-[#173C35] border border-[#E8D8BD] shadow-sm opacity-90 group-hover:opacity-100'
              }`}>
                {dest.name}
              </div>
            </div>
          );
        })}

        {/* Hovered Destination Interactive Card Overlay */}
        {hoveredDest && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md border border-[#E8D8BD] rounded-xl p-4 shadow-xl z-30 animate-fadeIn">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B85C38] font-bold">
                  {hoveredDest.region} Region • {hoveredDest.altitude}
                </span>
                <h4 className="font-serif text-lg text-[#173C35] font-bold">
                  {hoveredDest.name}
                </h4>
              </div>
              <img
                src={hoveredDest.image}
                alt={hoveredDest.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#E8D8BD]"
              />
            </div>

            <p className="text-xs text-[#252525]/75 line-clamp-2 mb-3">
              {hoveredDest.summary}
            </p>

            <button
              onClick={() => onSelectDestination(hoveredDest)}
              className="w-full py-1.5 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors shadow"
            >
              <span>Explore Destination</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

      </div>

      {/* Legend & Navigation Tips */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#252525]/70 pt-2 border-t border-[#E8D8BD]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173C35]" /> Key Destination Pins
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#E8D8BD] border border-[#B8955A]" /> Regional Boundaries
          </span>
        </div>
        <span className="text-[11px] text-[#252525]/70">
          Click any pin to view detailed guides, highlights & tours
        </span>
      </div>

    </div>
  );
};