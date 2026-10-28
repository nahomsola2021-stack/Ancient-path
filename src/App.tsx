import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <-- IMPORTED SEO PROVIDER HERE

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { TourModal } from './components/TourModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { BookingModal } from './components/BookingModal';

// Auth and Admin
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

// Pages
import { HomePage } from './pages/HomePage';
import { ToursPage } from './pages/ToursPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { FaqsPage } from './pages/FaqsPage';
import { ContactPage } from './pages/ContactPage';

import { TourPackage, Destination } from './types';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefillTour, setBookingPrefillTour] = useState('');
  const [bookingPrefillDest, setBookingPrefillDest] = useState('');
  
  // Route Checks
  const isAdminRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/login');
  const isHomePage = location.pathname === '/';
  
  // Quick Preview Modals
  const [activeTourModal, setActiveTourModal] = useState<TourPackage | null>(null);
  const [activeDestModal, setActiveDestModal] = useState<Destination | null>(null);

  // Saved Tours (Wishlist)
  const [savedTourIds, setSavedTourIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ap_saved_tours');
      return saved ? JSON.parse(saved) : ['ancient-kingdoms', 'lalibela-sacred'];
    } catch {
      return ['ancient-kingdoms', 'lalibela-sacred'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ap_saved_tours', JSON.stringify(savedTourIds));
    } catch {
      // ignore
    }
  }, [savedTourIds]);

  const toggleSaveTour = (tourId: string) => {
    setSavedTourIds(prev => 
      prev.includes(tourId) ? prev.filter(id => id !== tourId) : [...prev, tourId]
    );
  };

  const handleBookTour = (tour: TourPackage) => {
    setBookingPrefillTour(tour.title);
    setBookingPrefillDest('');
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setBookingPrefillTour('');
    setBookingPrefillDest('');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#B85C38] selection:text-white flex flex-col justify-between">
      <ScrollToTop />

      {/* ONLY render Navbar if NOT on an admin route */}
      {!isAdminRoute && (
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          savedCount={savedTourIds.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Main Content View with Routes - Removes top padding entirely on Home & Dashboard */}
      <main className={isAdminRoute ? "flex-grow h-screen" : isHomePage ? "flex-grow" : "flex-grow pt-16"}>
        <Routes>
          {/* 1. Home */}
          <Route 
            path="/" 
            element={
              <HomePage
                onPlanWithTour={handleBookTour}
                savedTourIds={savedTourIds}
                onToggleSaveTour={toggleSaveTour}
                onSelectTourModal={(tour) => setActiveTourModal(tour)}
                onOpenBooking={handleOpenBooking}
              />
            } 
          />

          {/* 2. Tours Catalog & Detail */}
          <Route 
            path="/tours" 
            element={
              <ToursPage
                onPlanWithTour={handleBookTour}
                savedTourIds={savedTourIds}
                onToggleSaveTour={toggleSaveTour}
                onOpenQuickPreview={(tour) => setActiveTourModal(tour)}
              />
            } 
          />
          <Route 
            path="/tours/:id" 
            element={
              <TourDetailPage
                onPlanWithTour={handleBookTour}
                savedTourIds={savedTourIds}
                onToggleSaveTour={toggleSaveTour}
              />
            } 
          />

          {/* 3. Destinations Directory & Detail */}
          <Route 
            path="/destinations" 
            element={<DestinationsPage />} 
          />
          <Route 
            path="/destinations/:id" 
            element={
              <DestinationDetailPage
                onSelectTour={(tour) => setActiveTourModal(tour)}
              />
            } 
          />

          {/* 4. About Us, Team & Responsible Travel */}
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />

          {/* 5. Travel Journal / Articles */}
          <Route 
            path="/journal" 
            element={<JournalPage />} 
          />
          <Route 
            path="/journal/:slug" 
            element={<JournalDetailPage />} 
          />

          {/* 6. FAQs Page */}
          <Route 
            path="/faqs" 
            element={<FaqsPage />} 
          />

          {/* 7. Contact & Inquiries */}
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />

          {/* 8. Admin Routes */}
          <Route 
            path="/login" 
            element={<Login />} 
          />
          
          {/* THE LOCK: Dashboard securely wrapped in ProtectedRoute */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ONLY render Footer and public Modals if NOT on an admin route */}
      {!isAdminRoute && (
        <>
          {/* Global Persistent Footer */}
          <Footer />

          {/* Lightweight Quick Preview Modals (for secondary fast previews) */}
          {activeTourModal && (
            <TourModal
              tour={activeTourModal}
              onClose={() => setActiveTourModal(null)}
              onPlanWithTour={(tour) => {
                setActiveTourModal(null);
                handleBookTour(tour);
              }}
              isSaved={savedTourIds.includes(activeTourModal.id)}
              onToggleSave={toggleSaveTour}
            />
          )}

          {activeDestModal && (
            <DestinationDetailModal
              destination={activeDestModal}
              onClose={() => setActiveDestModal(null)}
              onSelectTour={(tour) => {
                setActiveDestModal(null);
                setActiveTourModal(tour);
              }}
              onPlanTripToDest={(destId) => {
                setActiveDestModal(null);
                setBookingPrefillDest(destId);
                setBookingPrefillTour('');
                setIsBookingOpen(true);
              }}
            />
          )}

          {/* Global Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectTour={(tour) => {
              setIsSearchOpen(false);
              navigate(`/tours/${tour.id}`);
            }}
            onSelectDestination={(dest) => {
              setIsSearchOpen(false);
              navigate(`/destinations/${dest.id}`);
            }}
          />

          {/* Saved Wishlist Drawer */}
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            savedTourIds={savedTourIds}
            onRemoveSavedTour={toggleSaveTour}
            onSelectTour={(tour) => {
              setIsWishlistOpen(false);
              navigate(`/tours/${tour.id}`);
            }}
            onPlanWithSaved={() => {
              setIsWishlistOpen(false);
              handleOpenBooking();
            }}
          />

          {/* Booking Pop-out Modal */}
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)}
            prefillTour={bookingPrefillTour}
            prefillDestination={bookingPrefillDest}
          />

          {/* Floating Action Button for Plan Journey & Quick WhatsApp */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={handleOpenBooking}
                className="hidden sm:inline-flex items-center gap-2 bg-[#B85C38] hover:bg-[#a04e2e] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Journey</span>
              </button>

              <a
                href="https://wa.me/251912041252"
                target="_blank"
                rel="noopener noreferrer"
                title="Direct WhatsApp with expedition planner"
                aria-label="Contact us on WhatsApp"
                className="relative w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-transform hover:scale-110 cursor-pointer"
              >
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7 fill-current text-white relative z-10">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.2c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7.1c-18.4-29.6-28.1-63.7-28.1-98.9 0-101.4 82.5-183.9 184.1-183.9 54.1 0 105 21.1 143.3 59.4 38.3 38.3 59.4 89.2 59.4 143.3 0 101.4-82.5 183.9-183.9 183.9zM312.8 284c-4.9-2.5-28.9-14.3-33.4-15.9-4.5-1.6-7.8-2.5-11.1 2.5-3.3 5-12.6 15.9-15.4 19.2-2.8 3.3-5.7 3.7-10.6 1.2-4.9-2.5-20.6-7.6-39.2-24.1-14.4-12.8-24.1-28.6-26.9-33.6-2.8-5-1.2-7.8 1.2-10.3 2.1-2.1 4.9-5.7 7.4-8.6 2.5-2.9 3.3-5 5-8.2 1.6-3.3 .8-6.1-.4-8.6-1.2-2.5-11.1-26.8-15.2-36.7-4.1-9.7-8.2-8.4-11.1-8.5-2.8-.1-6.1-.1-9.4-.1s-8.6 1.2-13.1 6.1c-4.5 4.9-17.2 16.8-17.2 41s17.6 47.6 20.1 50.9c2.5 3.3 34.7 53 84.1 74.3 11.8 5.1 21 8.1 28.2 10.4 11.8 3.7 22.5 3.2 31 1.9 9.5-1.5 28.9-11.8 33-23.2 4.1-11.4 4.1-21.2 2.8-23.2-1.3-2-4.9-3.3-9.8-5.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export function App() {
  return (
    /* SEO PROVIDER WRAPS THE ENTIRE APP */
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;