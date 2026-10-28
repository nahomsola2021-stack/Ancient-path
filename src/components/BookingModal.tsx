import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Loader2, 
  CheckCircle2,
  Compass,
  X
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTour?: string;
  prefillDestination?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  prefillTour = '', 
  prefillDestination = '' 
}) => {
  const defaultInterest = prefillTour || (prefillDestination ? `Custom Trip including ${prefillDestination}` : '');

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

  useEffect(() => {
    setFormData(prev => ({ ...prev, tourPreference: defaultInterest }));
  }, [defaultInterest]);

  // Reset everything when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.tourPreference.trim()) {
      setErrorMessage('Please fill in your name, email, and journey preference.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'bookings'), {
        clientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        packageName: formData.tourPreference,
        date: formData.travelDates,
        travelers: formData.travelers,
        message: formData.message,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Booking error:", error);
      // Detailed error for network issues
      if (error.message?.includes('offline') || error.message?.includes('network')) {
        setErrorMessage('Network error. Please disable any ad-blockers or VPNs and try again.');
      } else {
        setErrorMessage(error.message || 'Firebase connection failed. Please check your database rules.');
      }
    } finally {
      setIsSubmitting(false); // Guarantees the spinner stops spinning
    }
  };

  const inputStyles = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B85C38]/20 focus:border-[#B85C38] transition-all placeholder:text-gray-400 placeholder:font-medium";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-2xl max-h-[95vh] rounded-[2rem] shadow-2xl relative z-10 overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 sm:p-8 relative">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-serif text-3xl text-black font-bold">Request Received</h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                Thank you, <strong className="text-gray-900">{formData.name}</strong>. Your booking request for <strong className="text-gray-900">{formData.tourPreference}</strong> has been safely submitted. 
                Our Addis Ababa desk will review availability and email you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors inline-block rounded-xl shadow-lg"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-5">
                <Compass className="w-7 h-7 text-[#B85C38] mx-auto mb-2" />
                <h1 className="font-serif text-2xl text-black font-bold leading-tight mb-2">
                  Request a Booking
                </h1>
                <p className="text-gray-500 font-medium text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Provide your travel details below. Our expedition designers will secure your dates. No payment is required today.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-800 text-sm font-semibold flex items-start gap-3 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  <p className="flex-1 leading-relaxed">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Lead Traveler Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputStyles}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputStyles}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputStyles}
                  />
                  <input
                    type="text"
                    placeholder="Country of Residence"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={inputStyles}
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Selected Tour Name or Custom Route *"
                  value={formData.tourPreference}
                  onChange={(e) => setFormData({ ...formData, tourPreference: e.target.value })}
                  className={inputStyles}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Clean, pure HTML5 Date Picker */}
                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 absolute -top-2 left-3 bg-white px-1 z-10 rounded-sm">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className={`${inputStyles} cursor-pointer`}
                    />
                  </div>
                  
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className={`${inputStyles} cursor-pointer appearance-none`}
                  >
                    <option value="1 Traveler (Solo)">1 Traveler (Solo)</option>
                    <option value="2 Travelers">2 Travelers</option>
                    <option value="3 Travelers">3 Travelers</option>
                    <option value="4 Travelers">4 Travelers</option>
                    <option value="5-8 Travelers">5-8 Travelers (Small Group)</option>
                    <option value="9+ Travelers">9+ Travelers (Large Group)</option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  placeholder="Any specific requests, dietary needs, or questions?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputStyles} resize-none`}
                />

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B85C38] transition-colors flex items-center justify-center gap-3 disabled:opacity-75 rounded-xl shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Submit Booking Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-3">
                    🔒 Privacy Assured. No Payment Required.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

