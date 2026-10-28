import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    tripType: 'Custom Itinerary',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  return (
    <section id="contact-section" className="py-20 lg:py-28 bg-[#F8F5EF] border-b border-[#E8D8BD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Let’s Plan Your Ethiopia Journey
          </h2>
          <p className="text-sm sm:text-base text-[#252525]/80 leading-relaxed">
            Have a question about one of our journeys? Looking for something custom? Or just beginning to explore what is possible in Ethiopia? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Info Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[#E8D8BD] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-serif text-2xl text-[#173C35]">
                Addis Ababa Office
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#252525]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B85C38] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#173C35] block mb-0.5">Location</strong>
                    <span className="text-[#252525]/80">Addis Ababa, Ethiopia</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B85C38] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#173C35] block mb-0.5">Email Inquiries</strong>
                    <a href="mailto:abenezer800@gmail.com" className="text-[#B85C38] hover:underline font-medium">
                      abenezer800@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B85C38] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#173C35] block mb-0.5">Telephone</strong>
                    <span className="text-[#252525]/80">+251 91 204 1252 (Mobile/WA)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B85C38] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#173C35] block mb-0.5">Operating Hours</strong>
                    <span className="text-[#252525]/80">Monday – Saturday: 8:30 AM – 6:30 PM (EAT, UTC+3)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-[#E8D8BD]/60">
                <a
                  href="https://wa.me/251912041252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Direct on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Reassurance Banner */}
            <div className="bg-[#E8D8BD]/40 border border-[#E8D8BD] rounded-2xl p-5 flex items-start gap-3 text-xs text-[#252525]/80">
              <ShieldCheck className="w-5 h-5 text-[#173C35] shrink-0 mt-0.5" />
              <span>
                We are a licensed Ethiopian tour operator dedicated to transparent, human-first travel planning with no hidden booking fees.
              </span>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8D8BD] rounded-3xl p-6 sm:p-10 shadow-sm">
              
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Marcus Aurelius"
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
                        placeholder="marcus@example.com"
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom / United States"
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                        Topic of Inquiry
                      </label>
                      <select
                        value={formData.tripType}
                        onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                        className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                      >
                        <option value="Custom Itinerary">Build a Custom Journey</option>
                        <option value="Signature Tour 14D">Signature 14-Day Tour Questions</option>
                        <option value="Flexible Escape">Flexible 1–4 Day Escape</option>
                        <option value="Photography Expedition">Photography Expedition</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B85C38] font-bold block mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what places, experiences or dates you are considering..."
                      className="w-full bg-[#F8F5EF] border border-[#E8D8BD] text-[#252525] text-xs p-3 rounded-xl focus:border-[#B85C38] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#B85C38] hover:bg-[#a04e2e] text-[#F8F5EF] font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#173C35]/10 border-2 border-[#173C35] text-[#173C35] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#173C35]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252525]/80 max-w-md mx-auto">
                    Thank you for reaching out. A dedicated expedition planner in Addis Ababa will review your notes and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({ fullName: '', email: '', phone: '', country: '', tripType: 'Custom Itinerary', message: '' });
                    }}
                    className="mt-4 px-5 py-2 border border-[#E8D8BD] text-xs font-semibold text-[#173C35] rounded-lg hover:bg-[#F8F5EF]"
                  >
                    Send Another Note
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
