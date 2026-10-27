import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  Clock, 
  ArrowRight, 
  Search, 
  X,
  Loader2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const JournalPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Firebase State
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Live Articles
  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setArticles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const categories = ['All', 'Culture & Faith', 'Food & Coffee', 'Nature & Wildlife', 'Travel Guide', 'Heritage'];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (selectedCategory !== 'All' && article.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title?.toLowerCase().includes(q);
        const matchesSubtitle = article.subtitle?.toLowerCase().includes(q);
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(q);
        const matchesAuthor = article.author?.name?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesExcerpt && !matchesAuthor) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, articles]);

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const revealElements = pageRef.current.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredArticles, isLoading]);

  const featuredArticle = articles[0];
  const gridArticles = selectedCategory === 'All' && !searchQuery ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans overflow-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dw1ohipim/image/upload/v1789940701/ddutdctrjuptda8tpfwk.jpg" 
            alt="Ethiopian Coffee Ceremony" 
            className="w-full h-full object-cover animate-slow-zoom brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Travel Journal' }]} className="mb-8 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8D8BD] block mb-4 drop-shadow-md">
            DISPATCHES & ESSAYS FROM ETHIOPIA
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg">
            The Ancient Path Journal
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md">
            Stories, cultural histories, culinary deep-dives, and field notes penned by our Ethiopian expedition leads, naturalists, and local historians.
          </p>
        </div>
      </section>

      {/* 2. MINIMALIST FILTERS */}
      <section className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-gray-200 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  selectedCategory === cat ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center w-full md:w-auto justify-end">
            {isSearchOpen ? (
              <div className="flex items-center border-b border-black w-full md:w-64 pb-1 animate-fade-in">
                <Search className="w-4 h-4 text-black mr-2" />
                <input 
                  type="text" autoFocus placeholder="Search stories..." 
                  className="bg-transparent border-none outline-none text-sm w-full font-serif italic placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-black" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. JOURNAL CONTENT */}
      <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex items-center justify-between mb-10 text-sm text-gray-500 font-medium">
          <span>Showing <strong className="text-black">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'story' : 'stories'}</span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="text-[#B85C38] hover:text-black transition-colors underline underline-offset-4 uppercase tracking-widest text-xs font-bold">
              Clear Filters
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#B85C38] mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Loading Stories...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-32 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
            <h3 className="font-serif text-4xl text-black mb-4">No Stories Found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any articles matching your search criteria.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="px-8 py-4 border border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Read All Dispatches
            </button>
          </div>
        ) : (
          <>
            {/* Featured Lead Story */}
            {selectedCategory === 'All' && !searchQuery && featuredArticle && (
              <div className="mb-20 scroll-reveal opacity-0 translate-y-12 transition-all duration-1000">
                <Link to={`/journal/${featuredArticle.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
                    <img src={featuredArticle.coverImage} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                    <div className="absolute top-6 left-6 bg-white text-black text-[10px] uppercase font-bold tracking-widest px-4 py-2">
                      Featured Dispatch
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-6 font-bold uppercase tracking-widest">
                      <span className="text-[#B85C38]">{featuredArticle.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredArticle.readTime || '5 min'}</span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] group-hover:text-[#B85C38] transition-colors leading-tight mb-6">{featuredArticle.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light max-w-xl">{featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <img src={featuredArticle.author?.avatar || 'https://via.placeholder.com/32'} alt={featuredArticle.author?.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-sm text-black block">{featuredArticle.author?.name || 'Admin'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {gridArticles.map((article, idx) => (
                <Link key={article.id} to={`/journal/${article.slug}`} className="group flex flex-col scroll-reveal opacity-0 translate-y-12 transition-all duration-1000" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                  <div className="relative h-[350px] w-full overflow-hidden mb-6 bg-gray-100">
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                    <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      {article.category}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
                        <span>{article.publishedDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime || '5 min'}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#B85C38] transition-colors leading-snug mb-3">{article.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 font-serif italic">{article.excerpt}</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={article.author?.avatar || 'https://via.placeholder.com/32'} alt={article.author?.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">{article.author?.name || 'Admin'}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#B85C38] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <style dangerouslySetInnerHTML={{__html: `@keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } } .animate-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; } @keyframes fadeIn { from { opacity: 0; width: 0; } to { opacity: 1; width: 100%; } } .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
};