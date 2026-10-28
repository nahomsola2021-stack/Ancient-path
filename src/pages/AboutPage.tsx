import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Clock, ArrowRight, Heart, Globe, MapPin, Users, Compass
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO'; // <-- SEO IMPORTED HERE

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const ancientPathWay = [
    { number: '01', title: 'Meaningful', tagline: 'Beyond sightseeing', description: 'Understand the stories, people, living faith, and cultural context behind every landmark and quiet valley.', icon: Heart },
    { number: '02', title: 'Local', tagline: 'Rooted relationships', description: 'Experience Ethiopia through resident knowledge, village hosts, and authentic community perspectives.', icon: MapPin },
    { number: '03', title: 'Personal', tagline: 'Your distinct rhythm', description: 'We listen first, tailoring the pacing, focus, and accommodation to match your distinct curiosity.', icon: Sparkles },
    { number: '04', title: 'Responsible', tagline: 'Respecting heritage', description: 'Travel with deep respect for local cultures, fair economic compensation, and strict environmental care.', icon: Globe },
    { number: '05', title: 'Unhurried', tagline: 'Room for discovery', description: 'We avoid rushed checklists to leave ample space for spontaneous coffee ceremonies and genuine connection.', icon: Clock }
  ];

  const coreTeam = [
    { name: 'Raly', role: 'Operations & Products', description: 'Keeps operations and products moving, bringing the vision to life on the ground.' },
    { name: 'Zion', role: 'Logistics & Finance', description: 'Brings strict structure to logistics and finance to ensure seamless execution.' },
    { name: 'Afomiya', role: 'Product Development', description: 'Drives new product development while continually refining what we already offer.' }
  ];

  useEffect(() => {
    if (!pageRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    pageRef.current.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden">
      <SEO 
        title="About Ancient Path | Ethiopian Travel Agency"
        description="Ancient Path is a leading Ethiopian travel agency built around a simple belief: the best journeys are created by people who care deeply about the details."
        keywords="ethiopian travel agency, ethiopia tours, ethiopia travel experts"
      />
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789394787/cymogm0xdqu0vm8lfqmo.jpg" alt="Ethiopian Landscape" className="w-full h-full object-cover animate-slow-zoom brightness-[0.55]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          <Breadcrumbs items={[{ label: 'About Us' }]} className="mb-8 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8D8BD] block mb-4 drop-shadow-md">
            THE PEOPLE BEHIND ANCIENT PATH
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg max-w-4xl">
            A Way of Traveling Built for Deep Connection.
          </h1>
        </div>
      </section>

      {/* 2. ABENEZER & THE STORY */}
      <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] block mb-6">
              THE STORY BEHIND THE JOURNEY
            </span>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-10 text-[#1A1A1A]">
              Abenezer — Founder & Journey Designer
            </h2>
            <div className="space-y-8 text-xl text-gray-500 font-light leading-relaxed">
              <p>
                As a leading <strong>Ethiopian travel agency</strong>, Ancient Path is built around a simple belief: the best journeys are created by people who care deeply about the place, the details and the people travelling through it. Abenezer is the person behind Ancient Path.
              </p>
              <p>
                His work begins with curiosity: a desire to look beyond the famous places and understand what makes a journey meaningful. With years of experience working directly with international travellers in Ethiopia, he brings together the practical side of travel with a strong interest in people, history, culture and everyday life.
              </p>
              <p>
                For Abenezer, a good itinerary is more than a list of sights. It should have a rhythm, leave room for discovery and create opportunities for travellers to meet Ethiopia as it really is. His role is not to stand above the team, but to work alongside it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 relative w-full h-[700px] md:h-[900px] rounded-[40px] flex items-center justify-center p-6 md:p-12 shadow-sm overflow-hidden bg-gray-50/50">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full shadow-xl animate-float blur-[2px] opacity-70" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full shadow-2xl animate-float blur-[3px] opacity-50" style={{ animationDelay: '2s' }} />
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] animate-float border-[12px] border-white">
              <img src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789940161/iwkw0hrvixicb5zh8g1y.jpg" alt="Abenezer in Ethiopia" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 5 PILLARS */}
      <section className="bg-white py-32 relative overflow-hidden border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="mb-20 text-center lg:text-left scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] block mb-4">OUR APPROACH</span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-6">The Ancient Path Way</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 relative flex justify-center lg:justify-start scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 delay-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-[#E8F2F0] z-0" />
              <div className="relative z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                <img src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789940514/xhtkcpbirwuno06vsjsc.webp" alt="Travellers exploring" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 relative z-10">
              {ancientPathWay.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={point.number} className="group bg-white rounded-2xl p-6 flex items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 transition-all cursor-default scroll-reveal opacity-0 translate-y-12 duration-1000" style={{ transitionDelay: `${(idx % 5) * 100}ms` }}>
                    <div className="w-16 h-16 rounded-xl bg-[#F0F5F4] flex items-center justify-center shrink-0 group-hover:bg-[#173C35] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#173C35] group-hover:text-[#E8D8BD] transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1.5">{point.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">{point.description}</p>
                    </div>
                  </div>
                );
              })}
              <div className="pt-4 pl-2 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 delay-500">
                <Link to="/tours" className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#B85C38] transition-colors">
                  Explore Our Journeys <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM */}
      <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <div className="mb-16 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] block mb-4">ONE TEAM, ONE RESULT</span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-6">The Core Team</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl">
                Ancient Path is powered by a small, proactive team that works closely together, without rigid hierarchy or unnecessary layers. Different strengths, one shared responsibility: making every journey better.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200">
              {coreTeam.map((member, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-serif text-3xl text-black mb-1">{member.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85C38] block mb-4 border-b border-gray-100 pb-4">{member.role}</span>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 delay-300">
            <div className="w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789940162/ws8doeqfv9zvxnqw3h8e.jpg" alt="The Ancient Path team at work" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED GUIDE NETWORK BANNER */}
      <section className="bg-black text-white py-32 mt-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
          <Compass className="w-12 h-12 text-[#B85C38] mx-auto mb-8" />
          <h2 className="font-serif text-4xl md:text-5xl mb-8">Our Trusted Guide Network</h2>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Our core team is supported by a trusted network of five experienced local guides who work with us as freelance partners. They bring specialist knowledge, regional experience and their own personal connection to the places they guide.
          </p>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789939919/hbidmtduthcdtpwzx8ry.avif" alt="Bespoke Travel" className="w-full h-full object-cover brightness-[0.35]" />
        </div>
        <div className="relative z-10 text-center px-4 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-10 leading-tight">
            Travel with people who know Ethiopia—and care about how you experience it.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/book')} className="px-10 py-5 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-xl">
              Plan Your Journey
            </button>
            <button onClick={() => navigate('/contact')} className="px-10 py-5 border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `@keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } } .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; } @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } } .animate-float { animation: float 6s ease-in-out infinite; }`}} />
    </div>
  );
};

