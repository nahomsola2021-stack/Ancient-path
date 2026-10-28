import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="main-footer" className="bg-[#173C35] text-[#F8F5EF] pt-16 pb-12 border-t border-[#26534b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#26534b]">
          
          {/* Brand Statement Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block focus:outline-none mb-2">
<img 
                src="/logo.svg" 
                alt="Ancient Path Ethiopia" 
                className="h-12 sm:h-30 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="text-xs text-[#E8D8BD]/80 leading-relaxed max-w-sm">
              Curated journeys across Ethiopia. <br />
              Beyond the familiar. <br />
              Closer to the real.
            </p>
          </div>

          {/* EXPLORE Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#B8955A] font-bold">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8D8BD]/85">
              <li><Link to="/tours" className="hover:text-white transition-colors">Tours & Circuits</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations Guide</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">Travel Journal</Link></li>
              <li><Link to="/book" className="hover:text-white transition-colors">Book Journey</Link></li>
            </ul>
          </div>

          {/* ABOUT & ADVICE Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#B8955A] font-bold">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8D8BD]/85">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Team</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#B8955A] font-bold">
              CONTACT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8D8BD]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8955A] shrink-0" />
                <span className="leading-snug">Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#B8955A] shrink-0" />
                <a href="mailto:abenezer800@gmail.com" className="hover:text-white transition-colors break-words">
                  abenezer800@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#B8955A] shrink-0" />
                <a href="tel:+251912041252" className="hover:text-white transition-colors">
                  +251 91 204 1252
                </a>
              </li>
            </ul>
          </div>

          {/* FOLLOW US Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#B8955A] font-bold">
              CONNECT
            </h4>
            <div className="flex items-center gap-3 text-[#E8D8BD]">
<a href="#" aria-label="Instagram" className="p-2.5 rounded-full bg-[#122e29] hover:bg-[#B85C38] hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2.5 rounded-full bg-[#122e29] hover:bg-[#B85C38] hover:text-white transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/251912041252" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2.5 rounded-full bg-[#122e29] hover:bg-[#B85C38] hover:text-white transition-colors" title="WhatsApp">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E8D8BD]/70 uppercase tracking-widest font-semibold">
          <div>
            © {new Date().getFullYear()} Ancient Path Ethiopia. All rights reserved.
          </div>
          <div>
            Thoughtfully crafted journeys across Ethiopia
          </div>
        </div>

      </div>
    </footer>
  );
};


