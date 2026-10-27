import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, Send, Sparkles, Loader2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO'; // <-- SEO IMPORTED HERE

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '', travelDates: '', duration: '8–14 Days (Classic Circuit)', message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const revealElements = pageRef.current.querySelectorAll('.scroll-reveal');
    if (!prefersReducedMotion) revealElements.forEach((el) => observer.observe(el));
    else revealElements.forEach((el) => el.classList.add('opacity-100', 'translate-y-0'));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message so we can assist you properly.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 800);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Ancient Path team, I would like to inquire about planning a trip to Ethiopia.");
    window.open(`https://wa.me/251911234567?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden">
      <SEO 
        title="Contact Us | Plan Your African Safari"
        description="Reach out to our Ethiopian travel agency in Addis Ababa to begin planning your African safari tours and historical expeditions."
        keywords="ethiopian travel agency, contact ethiopia tours, book african safari"
      />
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789940781/h55fa5c81btyxgl7zevs.jpg" alt="Ethiopian Landscape" className="w-full h-full object-cover animate-slow-zoom brightness-[0.55]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-8 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8D8BD] block mb-4 drop-shadow-md">
            BASED IN ADDIS ABABA
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg">
            Begin Your Journey
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md">
            Reach out to our <strong>Ethiopian travel agency</strong> in Addis Ababa to begin planning your <strong>African safari</strong> or historical expedition. Whether you are curious about timing, routes, or festival dates, we respond within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 space-y-32">
        {/* 2. MAIN CONTACT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          
          <div className="lg:col-span-7">
            <div className="mb-12">
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#B85C38] block mb-4">DIRECT CONSULTATION</span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] leading-tight mb-6">Send Us a Message</h2>
              <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Provide your details and travel ideas below. An Addis Ababa travel designer will respond with thoughtful guidance within 24 hours.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-800 text-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                {errorMessage}
              </div>
            )}

            {isSubmitted ? (
              <div className="bg-[#1A1A1A] text-white p-12 text-center space-y-6 animate-fade-in rounded-xl">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#B85C38]" />
                </div>
                <h3 className="font-serif text-4xl text-white">Thank You, {formData.name || 'Friend'}</h3>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-lg font-light">
                  We have received your message. Our team in Addis Ababa will review your questions and reply to <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', country: '', travelDates: '', duration: '8–14 Days', message: '' }); }} className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <input type="text" required placeholder="Your Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light" />
                  <input type="email" required placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <input type="tel" placeholder="WhatsApp / Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light" />
                  <input type="text" placeholder="Country of Residence" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <input type="text" placeholder="Estimated Travel Dates (e.g. Nov 2026)" value={formData.travelDates} onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 font-light" />
                  <select value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors appearance-none font-light cursor-pointer">
                    <option value="1–4 Days">1–4 Days (Short Escape)</option>
                    <option value="5–7 Days">5–7 Days (Regional Focus)</option>
                    <option value="8–14 Days (Classic Circuit)">8–14 Days (Classic Circuit)</option>
                    <option value="15+ Days">15+ Days (Comprehensive Expedition)</option>
                  </select>
                </div>
                <div className="relative pt-6">
                  <textarea rows={1} required placeholder="Tell us what you hope to experience, or specify regions or questions... *" value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} className="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-black focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-gray-400 resize-none min-h-[40px] overflow-hidden font-light" />
                </div>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">🔒 Privacy Assured. No Obligation.</p>
                  <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-10 py-5 bg-[#B85C38] text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3 disabled:opacity-75">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="mr-2">Send Inquiry</span><Send className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <div className="mb-12">
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#B85C38] block mb-4">CONCIERGE DESK</span>
              <h3 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] leading-tight">Addis Ababa Office</h3>
            </div>
            
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <MapPin className="w-7 h-7 text-[#B85C38] shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black uppercase tracking-widest text-sm block mb-2">Location</span>
                  <p className="text-gray-500 text-lg leading-relaxed font-light">Bole Sub-City, Namibia Street<br/>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Phone className="w-7 h-7 text-[#B85C38] shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black uppercase tracking-widest text-sm block mb-2">Direct Contact</span>
                  <a href="tel:+251911234567" className="text-lg text-gray-500 hover:text-[#B85C38] transition-colors block mb-1 font-light">+251 911 234 567 (Mobile/WA)</a>
                  <a href="tel:+251116789012" className="text-lg text-gray-500 hover:text-[#B85C38] transition-colors block font-light">+251 116 789 012 (Landline)</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Mail className="w-7 h-7 text-[#B85C38] shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black uppercase tracking-widest text-sm block mb-2">Email</span>
                  <a href="mailto:journeys@ancientpathethiopia.com" className="text-lg text-gray-500 hover:text-[#B85C38] transition-colors font-light">journeys@ancientpathethiopia.com</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Clock className="w-7 h-7 text-[#B85C38] shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black uppercase tracking-widest text-sm block mb-2">Operating Hours</span>
                  <p className="text-lg text-gray-500 mb-2 font-light">Mon – Sat: 08:30 – 18:00 (UTC+3)</p>
                  <p className="text-[11px] uppercase tracking-widest text-[#B85C38] font-bold">24/7 Support for active travelers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DUAL PATHWAYS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 pt-10 border-t border-gray-200">
          <div className="p-10 md:p-14 bg-white border border-gray-200 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">OPTION A • INTERACTIVE</span>
              <h3 className="font-serif text-3xl md:text-4xl text-black mb-4">Book Your Experience</h3>
              <p className="text-gray-500 leading-relaxed mb-10 font-light text-lg">Ready to take the next step? Enter your curiosities, pacing, and preferred travel dates directly into our bespoke booking system.</p>
            </div>
            <Link to="/book" className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-widest transition-all w-fit">
              <Sparkles className="w-4 h-4 text-[#B85C38]" /><span>Book Your Journey</span>
            </Link>
          </div>
          <div className="p-10 md:p-14 bg-[#1A1A1A] text-white flex flex-col justify-between group shadow-lg">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C38] block mb-4">OPTION B • DIRECT CONVERSATION</span>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Direct WhatsApp Chat</h3>
              <p className="text-gray-400 leading-relaxed mb-10 font-light text-lg">Have an open question or existing itinerary in mind? Message our Addis Ababa concierge desk directly for immediate assistance.</p>
            </div>
            <button onClick={handleWhatsAppClick} className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-xs uppercase tracking-widest transition-all w-fit">
              <MessageSquare className="w-4 h-4 fill-current" /><span>Message on WhatsApp</span>
            </button>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{__html: `@keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } } .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; } select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background: transparent; }`}} />
    </div>
  );
};