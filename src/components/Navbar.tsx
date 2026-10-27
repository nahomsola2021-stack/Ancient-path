import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Compass, 
  Search, 
  Heart, 
  Phone, 
  Mail, 
  ChevronRight,
  Globe,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  savedCount: number;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
}

export const Navbar = ({
  onOpenSearch,
  savedCount,
  onOpenWishlist,
  onOpenBooking
}: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'ETB'>('USD');

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/destinations', label: 'DESTINATIONS' },
    { to: '/tours', label: 'TOURS' },
    { to: '/about', label: 'ABOUT US' },
    { to: '/journal', label: 'JOURNAL' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent 
            ? 'bg-transparent py-6' 
            : 'bg-[#0B1B15]/95 backdrop-blur-md shadow-xl py-2 border-b border-white/5' 
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative flex items-center justify-center h-12 lg:h-14">
          
          {/* BRAND LOGO */}
          <Link 
            id="brand-logo-btn"
            to="/"
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 transition-all duration-500 z-50 focus:outline-none"
          >
            <img 
              src="/logo.svg" 
              alt="Ancient Path Ethiopia" 
              className={`object-contain transition-all duration-500 transform origin-left ${
                isTransparent 
                  ? 'h-20 lg:h-[110px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] translate-y-6 lg:translate-y-8'
                  : 'h-10 lg:h-12 drop-shadow-none translate-y-0'
              }`}
            />
          </Link>

          {/* CENTERED DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `py-1.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all relative group ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B85C38] rounded-full transition-all duration-300 ${
                        isActive ? 'opacity-100 w-full' : 'opacity-0 w-0 group-hover:w-full group-hover:opacity-100'
                      }`} />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT ALIGNED ACTIONS */}
          <div className="absolute right-4 lg:right-8 flex items-center gap-2 sm:gap-4">
            
            <button
              id="search-toggle-btn"
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="wishlist-toggle-btn"
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors relative focus:outline-none cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#B85C38] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Primary CTA linked to Modal */}
            <button
              id="nav-cta-plan-journey"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 bg-[#B85C38] hover:bg-[#a04e2e] text-white text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>Plan Journey</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#B8955A]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#173C35]/95 backdrop-blur-lg lg:hidden pt-24 px-6 pb-8 overflow-y-auto flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4 pt-4">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#B8955A] font-semibold border-b border-[#26534b] pb-2">
              Navigation
            </div>
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between w-full py-3 text-sm tracking-wider font-semibold border-b border-[#214d45] ${
                        isActive ? 'text-[#B85C38] font-bold' : 'text-[#E8D8BD] hover:text-white'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#B8955A]" />
                  </NavLink>
                );
              })}
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} 
                className="w-full py-3.5 bg-[#B85C38] hover:bg-[#a04e2e] text-white font-bold uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" /> BOOK YOUR JOURNEY
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#26534b] text-xs text-[#E8D8BD]/80 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B8955A]" /> <span>journeys@ancientpathethiopia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B8955A]" /> <span>Addis Ababa, Ethiopia • +251 911 234 567</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};