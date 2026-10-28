import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Send, 
  Loader2, 
  Sparkles, 
  CheckCircle2,
  Compass
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Pre-fill if navigated from a specific tour or destination
  const preselectedTour = location.state?.tour?.title || '';
  const preselectedDestination = location.state?.destinationId ? 
    location.state.destinationId.charAt(0).toUpperCase() + location.state.destinationId.slice(1) : '';

  const defaultInterest = preselectedTour || (preselectedDestination ? `Custom Trip including ${preselectedDestination}` : '');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    tourPreference: defaultInterest,
    travelDates: '',
    travelers: '2 Travelers',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll Reveal Observer
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = pageRef.current.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.tourPreference.trim()) {
      setErrorMessage('Please fill in your name, email, and journey preference.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans relative overflow-hidden flex items-center justify-center py-20 px-4 md:px-8">
      
      {/* Soft Background Elements for Airy Feel */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8F2F0] rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDEFEA] rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 scroll-reveal opacity-0 translate-y-12 scale-95 transition-all duration-1000">
        
        {/* Breadcrumb Context */}
        <div className="text-center mb-8">
          <Breadcrumbs items={[{ label: 'Booking Request' }]} className="justify-center text-gray-400" />
        </div>

        {/* The Simple Booking Box */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 p-8 sm:p-12 md:p-16 relative overflow-hidden">
          
          {isSubmitted ? (
            <div className="text-center space-y-6 animate-fade-in py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-serif text-4xl text-black">Request Received</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md mx-auto">
                Thank you, {formData.name}. Your booking request for <strong>{formData.tourPreference}</strong> has been safely submitted. 
                Our Addis Ababa desk will review availability and email you at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <div className="pt-8">
                <Link
                  to="/"
                  className="px-8 py-4 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors inline-block rounded-full"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Box Header */}
              <div className="text-center mb-10">
                <Compass className="w-10 h-10 text-[#B85C38] mx-auto mb-6" />
                <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
                  Request a Booking
                </h1>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                  Provide your travel details below. Our expedition designers will secure your dates and finalize your personalized itinerary. No payment is required today.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-800 text-sm flex items-center gap-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Lead Traveler Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="WhatsApp / Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Country of Residence"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                    />
                  </div>
                </div>

                {/* Row 3: Tour Preference */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Selected Tour Name or Custom Route *"
                    value={formData.tourPreference}
                    onChange={(e) => setFormData({ ...formData, tourPreference: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                  />
                </div>

                {/* Row 4: Dates & Travelers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Estimated Travel Dates (e.g., Nov 2026)"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors appearance-none font-light cursor-pointer"
                    >
                      <option value="1 Traveler (Solo)">1 Traveler (Solo)</option>
                      <option value="2 Travelers">2 Travelers</option>
                      <option value="3 Travelers">3 Travelers</option>
                      <option value="4 Travelers">4 Travelers</option>
                      <option value="5-8 Travelers (Small Group)">5-8 Travelers (Small Group)</option>
                      <option value="9+ Travelers (Large Group)">9+ Travelers (Large Group)</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Message */}
                <div className="relative pt-2">
                  <textarea
                    rows={1}
                    placeholder="Any specific requests, dietary needs, or questions?"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 resize-none min-h-[40px] overflow-hidden font-light"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors flex items-center justify-center gap-3 disabled:opacity-75 rounded-full shadow-lg"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Submit Booking Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-6">
                    🔒 Privacy Assured. No Obligation.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
        }
      `}} />
    </div>
  );
};

