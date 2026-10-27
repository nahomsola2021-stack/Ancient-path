import { useState, FormEvent } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Send,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TRAVEL_STYLES_DATA } from '../data/experiencesData';
import { CustomJourneyState, TourPackage } from '../types';

interface JourneyPlannerProps {
  initialTour?: TourPackage | null;
  initialDestId?: string | null;
}

export const JourneyPlanner = ({ initialTour, initialDestId }: JourneyPlannerProps) => {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  // Example presets from copy
  const examplePresets = [
    {
      id: 'preset-1',
      title: 'Example Journey 01 — Northern Circuit (11 Days)',
      desc: 'Addis Ababa (2D) • Lalibela (3D) • Gondar & Simien (4D) • Bahir Dar (2D)',
      destIds: ['addis-ababa', 'lalibela', 'gondar', 'simien-mountains', 'bahir-dar'],
      days: 11
    },
    {
      id: 'preset-2',
      title: 'Example Journey 02 — Southern Living Cultures (9 Days)',
      desc: 'Addis Ababa (2D) • Arba Minch (3D) • Omo Valley (4D)',
      destIds: ['addis-ababa', 'arba-minch', 'omo-valley'],
      days: 9
    },
    {
      id: 'preset-3',
      title: 'Example Journey 03 — Eastern Horizons (8 Days)',
      desc: 'Addis Ababa (2D) • Rift Valley & Awash • Afar • Harar Walled City',
      destIds: ['addis-ababa', 'harar', 'afar'],
      days: 8
    }
  ];

  const [formData, setFormData] = useState<CustomJourneyState>({
    selectedDestinations: initialDestId 
      ? [initialDestId] 
      : initialTour 
        ? ['addis-ababa', 'lalibela'] 
        : ['addis-ababa', 'lalibela', 'gondar', 'simien-mountains'],
    durationDays: initialTour?.daysCount || 10,
    travelDates: 'Upcoming Dry Season (Oct – May)',
    travelersCount: 2,
    travelStyles: ['Culture & History', 'Nature & Wildlife', 'Food & Coffee'],
    travelStyleType: 'Couple',
    name: '',
    email: '',
    phone: '',
    specialRequests: initialTour ? `Interested in customizing: ${initialTour.title}` : '',
    approxBudget: 'Luxury Comfort ($350 - $650/day/person)'
  });

  const toggleDestination = (id: string) => {
    setFormData(prev => {
      const exists = prev.selectedDestinations.includes(id);
      return {
        ...prev,
        selectedDestinations: exists
          ? prev.selectedDestinations.filter(d => d !== id)
          : [...prev.selectedDestinations, id]
      };
    });
  };

  const toggleStyle = (styleTitle: string) => {
    setFormData(prev => {
      const exists = prev.travelStyles.includes(styleTitle);
      return {
        ...prev,
        travelStyles: exists
          ? prev.travelStyles.filter(s => s !== styleTitle)
          : [...prev.travelStyles, styleTitle]
      };
    });
  };

  const applyPreset = (preset: typeof examplePresets[0]) => {
    setFormData(prev => ({
      ...prev,
      selectedDestinations: preset.destIds,
      durationDays: preset.days
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
  };

  return (
    <section id="journey-planner-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            CUSTOM JOURNEYS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Build Your Own Ethiopia Journey
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed">
            Your Time. Your Interests. Your Ethiopia. Tell us what you have in mind, and we will shape the right journey for you.
          </p>
        </div>

        {/* How It Works 5-Step Progress Bar */}
        <div className="grid grid-cols-5 gap-2 mb-10 text-center">
          {[
            { num: 1, title: 'Destinations' },
            { num: 2, title: 'Pace & Dates' },
            { num: 3, title: 'Travel Styles' },
            { num: 4, title: 'Party Details' },
            { num: 5, title: 'Your Inquiry' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => !submitted && setStep(s.num)}
              className={`p-2 sm:p-3 rounded-xl border transition-all text-left sm:text-center ${
                step === s.num
                  ? 'bg-[#173C35] border-[#173C35] text-[#F8F5EF]'
                  : step > s.num
                    ? 'bg-white border-[#B8955A] text-[#173C35]'
                    : 'bg-[#F8F5EF] border-[#E8D8BD] text-[#252525]/50'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider block">
                Step 0{s.num}
              </div>
              <div className="font-medium text-xs hidden sm:block mt-0.5">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#E8D8BD] rounded-3xl p-6 sm:p-10 shadow-sm relative">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: DESTINATIONS */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#173C35] mb-1">
                      1. Select Places You Would Like to Visit
                    </h3>
                    <p className="text-xs text-[#252525]/70">
                      Choose from popular curated combinations or select individual destinations below.
                    </p>
                  </div>

                  {/* Preset Combinations */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#B85C38] font-bold">
                      Or Start With an Example Combination:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {examplePresets.map(preset => (
                        <div
                          key={preset.id}
                          onClick={() => applyPreset(preset)}
                          className="bg-[#F8F5EF] border border-[#E8D8BD] hover:border-[#B85C38] p-3 rounded-xl cursor-pointer text-xs transition-colors"
                        >
                          <div className="font-bold text-[#173C35] mb-1">{preset.title}</div>
                          <div className="text-[11px] text-[#252525]/75">{preset.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                    {DESTINATIONS_DATA.map((dest) => {
                      const isSelected = formData.selectedDestinations.includes(dest.id);
                      return (
                        <div
                          key={dest.id}
                          onClick={() => toggleDestination(dest.id)}
                          className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                            isSelected
                              ? 'bg-[#173C35] border-[#173C35] text-[#F8F5EF] shadow-sm'
                              : 'bg-[#F8F5EF] border-[#E8D8BD] hover:border-[#B8955A] text-[#252525]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[9px] uppercase font-bold ${isSelected ? 'text-[#E8D8BD]' : 'text-[#B85C38]'}`}>
                              {dest.region}
                            </span>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                              isSelected ? 'bg-[#B85C38] border-[#B85C38] text-white' : 'border-[#E8D8BD]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className={`font-serif text-sm font-medium ${isSelected ? 'text-[#F8F5EF]' : 'text-[#173C35]'}`}>
                              {dest.name}
                            </h4>
                            <span className={`text-[10px] line-clamp-1 ${isSelected ? 'text-[#E8D8BD]/80' : 'text-[#252525]/60'}`}>
                              {dest.tagline}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>Continue to Dates & Pace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PACE & DATES */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#173C35] mb-1">
                      2. Travel Dates & Duration
                    </h3>
                    <p className="text-xs text-[#252525]/70">
                      Tell us how many days you have available and your preferred timing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                        Estimated Number of Days ({formData.durationDays} Days)
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="24"
                        value={formData.durationDays}
                        onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
                        className="w-full accent-[#B85C38] bg-[#E8D8BD] h-2 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-[#252525]/70 mt-2">
                        <span>2-3 Days (Short Escape)</span>
                        <span>10-14 Days (Signature Circuit)</span>
                        <span>20+ Days (Full Grand Tour)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                        Preferred Travel Season / Dates
                      </label>
                      <select
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      >
                        <option value="Upcoming Dry Season (Oct – May)">Peak Dry Season (October – May)</option>
                        <option value="Timkat Festival Season (January)">Timkat Festival Season (January)</option>
                        <option value="Meskel Festival Season (September)">Meskel Festival Season (Late September)</option>
                        <option value="Summer Lush Season (June – August)">Summer Season (June – August)</option>
                        <option value="Exact Dates Fixed (Specify in notes)">Exact Dates Fixed (Specify in notes)</option>
                        <option value="Flexible / Exploring Ideas">Flexible / Exploring Ideas</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 border border-[#E8D8BD] text-xs font-semibold text-[#252525] rounded-lg hover:bg-[#F8F5EF]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>Next: Travel Styles</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TRAVEL STYLES & INTERESTS */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#173C35] mb-1">
                      3. Your Main Interests & Inspiration
                    </h3>
                    <p className="text-xs text-[#252525]/70">
                      Select all that matter most to your travel experience.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {TRAVEL_STYLES_DATA.map((style) => {
                      const isSelected = formData.travelStyles.includes(style.title);
                      return (
                        <div
                          key={style.id}
                          onClick={() => toggleStyle(style.title)}
                          className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#173C35] border-[#173C35] text-[#F8F5EF]'
                              : 'bg-[#F8F5EF] border-[#E8D8BD] text-[#252525] hover:border-[#B8955A]'
                          }`}
                        >
                          <div>
                            <h4 className={`text-xs font-bold ${isSelected ? 'text-[#F8F5EF]' : 'text-[#173C35]'}`}>{style.title}</h4>
                            <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-[#E8D8BD]' : 'text-[#252525]/70'}`}>{style.description}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ml-2 ${
                            isSelected ? 'bg-[#B85C38] border-[#B85C38] text-white' : 'border-[#E8D8BD]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 border border-[#E8D8BD] text-xs font-semibold text-[#252525] rounded-lg hover:bg-[#F8F5EF]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>Next: Party & Style</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PARTY DETAILS & PREFERRED STYLE */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#173C35] mb-1">
                      4. Travel Party & Style
                    </h3>
                    <p className="text-xs text-[#252525]/70">
                      Tell us who is traveling and your preferred travel arrangement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                        Number of Travelers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.travelersCount}
                        onChange={(e) => setFormData({ ...formData, travelersCount: parseInt(e.target.value) || 1 })}
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                        Travel Style
                      </label>
                      <select
                        value={formData.travelStyleType}
                        onChange={(e) => setFormData({ ...formData, travelStyleType: e.target.value as any })}
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      >
                        <option value="Private">Private Custom Expedition</option>
                        <option value="Couple">Couple / Romantic Retreat</option>
                        <option value="Family">Family Journey</option>
                        <option value="Small Group">Small Group of Friends</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-2">
                        Comfort & Accommodation
                      </label>
                      <select
                        value={formData.approxBudget}
                        onChange={(e) => setFormData({ ...formData, approxBudget: e.target.value })}
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      >
                        <option value="Luxury Boutique & Top Lodges">Luxury Boutique & Best Available Lodges</option>
                        <option value="Premium Comfort & Character">Premium Comfort & Heritage Character</option>
                        <option value="Authentic Moderate & Clean">Authentic Moderate & Clean Eco-Lodges</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 border border-[#E8D8BD] text-xs font-semibold text-[#252525] rounded-lg hover:bg-[#F8F5EF]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>Next: Summary & Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: SUMMARY & CONTACT DETAILS */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#173C35] mb-1">
                      5. Your Custom Journey Summary & Contact
                    </h3>
                    <p className="text-xs text-[#252525]/70">
                      Review your preferences and send your inquiry. We respond within 24 hours with a handcrafted proposal.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F8F5EF] border border-[#E8D8BD] rounded-2xl p-5 text-xs text-[#252525] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8D8BD] pb-2">
                      <span className="font-bold text-[#173C35]">Configured Route:</span>
                      <span className="font-semibold text-[#B85C38]">
                        {formData.selectedDestinations.length > 0
                          ? formData.selectedDestinations
                              .map(id => DESTINATIONS_DATA.find(d => d.id === id)?.name || id)
                              .join(' → ')
                          : 'Custom Ethiopia Highlights'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div>
                        <span className="text-[#252525]/60 block">Duration:</span>
                        <span className="font-bold text-[#173C35]">{formData.durationDays} Days</span>
                      </div>
                      <div>
                        <span className="text-[#252525]/60 block">Travelers:</span>
                        <span className="font-bold text-[#173C35]">{formData.travelersCount} Guests ({formData.travelStyleType})</span>
                      </div>
                      <div>
                        <span className="text-[#252525]/60 block">Timing:</span>
                        <span className="font-bold text-[#173C35]">{formData.travelDates}</span>
                      </div>
                      <div>
                        <span className="text-[#252525]/60 block">Tier:</span>
                        <span className="font-bold text-[#173C35]">{formData.approxBudget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                      Anything Else We Should Know (Special requirements, pacing, dietary notes)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="e.g., We have a particular passion for historical churches, bird watching, and specialty coffee cupping..."
                      className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-5 py-2.5 border border-[#E8D8BD] text-xs font-semibold text-[#252525] rounded-lg hover:bg-[#F8F5EF]"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Your Inquiry</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            /* Submission Success State */
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#173C35]/10 border-2 border-[#173C35] text-[#173C35] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#B85C38] font-bold">
                  INQUIRY RECEIVED
                </span>
                <h3 className="font-serif text-3xl text-[#173C35]">
                  Thank You, {formData.name || 'Traveler'}
                </h3>
                <p className="text-xs sm:text-sm text-[#252525]/80 leading-relaxed">
                  Your custom inquiry has been delivered directly to our senior expedition planners in Addis Ababa. We will prepare your tailored itinerary and connect with you within 24 hours.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F8F5EF] border border-[#E8D8BD] rounded-2xl p-5 max-w-lg mx-auto text-left text-xs space-y-2 text-[#252525]">
                <div className="font-bold text-[#173C35] border-b border-[#E8D8BD] pb-2">
                  Trip Reference Summary
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252525]/70">Destinations:</span>
                  <span className="font-medium text-right max-w-[65%] text-[#B85C38]">
                    {formData.selectedDestinations.map(id => DESTINATIONS_DATA.find(d => d.id === id)?.name || id).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252525]/70">Duration & Party:</span>
                  <span>{formData.durationDays} Days • {formData.travelersCount} Travelers ({formData.travelStyleType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252525]/70">Timing:</span>
                  <span>{formData.travelDates}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => window.open(`https://wa.me/251911234567?text=Hello%20Ancient%20Path%20Ethiopia,%20I%20just%20submitted%20a%20custom%20trip%20inquiry%20for%20${formData.durationDays}%20days.`, '_blank')}
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-[#E8D8BD] hover:bg-[#F8F5EF] text-xs font-semibold text-[#173C35] rounded-lg flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Plan Another Journey</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
