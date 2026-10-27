import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Clock, Calendar, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const JournalDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Firebase State
  const [article, setArticle] = useState<any>(null);
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [allTours, setAllTours] = useState<any[]>([]);
  const [allDestinations, setAllDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        if (!slug) return;
        
        // Fetch everything required for relationships and prev/next logic
        const [artsSnap, toursSnap, destsSnap] = await Promise.all([
          getDocs(collection(db, 'articles')),
          getDocs(collection(db, 'tours')),
          getDocs(collection(db, 'destinations'))
        ]);

        const arts = artsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAllArticles(arts);
        setAllTours(toursSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setAllDestinations(destsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Try to match the article by its literal slug, OR by converting its Title to a slug
        const found = arts.find((a: any) => 
          a.slug === slug || 
          (a.title && a.title.toLowerCase().replace(/\s+/g, '-') === slug) || 
          a.id === slug
        );
        
        setArticle(found || null);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5EF]">
        <Loader2 className="w-12 h-12 text-[#B85C38] animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Loading Dispatch...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E8D8BD] shadow-lg">
          <AlertCircle className="w-12 h-12 text-[#B85C38] mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#173C35] mb-2">Article Not Found</h2>
          <p className="text-xs text-[#252525]/75 mb-6">The journal dispatch you were looking for could not be found.</p>
          <Link to="/journal" className="inline-flex items-center gap-2 px-6 py-3 bg-[#B85C38] text-white font-bold text-xs uppercase tracking-wider rounded-lg">
            <span>Back to Travel Journal</span>
          </Link>
        </div>
      </div>
    );
  }

  // Navigation Logic
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Connected Relationships (safely check arrays)
  const relatedTours = allTours.filter((t: any) => (article.relatedTourIds || []).includes(t.id));
  const relatedDestinations = allDestinations.filter((d: any) => (article.relatedDestIds || []).includes(d.id));

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] pt-24 pb-20">
      
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <Breadcrumbs items={[{ label: 'Journal', to: '/journal' }, { label: article.title }]} className="mb-8" />

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#252525]/70 mb-4">
          <span className="bg-[#B85C38] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded">{article.category || 'Journal'}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#B8955A]" />{article.publishedDate || 'Recent'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#173C35] font-normal tracking-tight leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-base sm:text-xl text-[#252525]/80 font-serif italic leading-relaxed mb-8">
          {article.subtitle || article.excerpt}
        </p>

        <div className="flex items-center gap-3.5 py-4 border-y border-[#E8D8BD]">
          <img src={article.author?.avatar || 'https://via.placeholder.com/32'} alt="Author" className="w-12 h-12 rounded-full object-cover border-2 border-[#B8955A]" />
          <div>
            <span className="font-serif font-semibold text-sm text-[#173C35] block">{article.author?.name || 'Admin'}</span>
            <span className="text-xs text-[#252525]/60">{article.author?.role || 'Ancient Path Ethiopia'}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8D8BD] relative h-72 sm:h-[450px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Editorial Body Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-base text-[#252525]/90 leading-relaxed font-sans">
        
        {/* Support both Legacy Hardcoded Objects and New Dashboard String Inputs */}
        {article.content && typeof article.content === 'object' && article.content.introduction ? (
           <>
              <p className="text-lg sm:text-xl leading-relaxed text-[#173C35] font-serif">{article.content.introduction}</p>
              {article.content.sections?.map((sec: any, idx: number) => (
                <section key={idx} className="space-y-4 pt-6">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#173C35] font-normal tracking-tight">{sec.heading}</h2>
                  {sec.paragraphs?.map((p: string, pIdx: number) => (
                    <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-[#252525]/85">{p}</p>
                  ))}
                </section>
              ))}
              <div className="pt-6 border-t border-[#E8D8BD]">
                <h3 className="font-serif text-xl text-[#173C35] mb-3">Reflections</h3>
                <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed font-serif italic">{article.content.conclusion}</p>
              </div>
           </>
        ) : (
          <p className="text-lg sm:text-xl leading-relaxed text-[#173C35] font-serif whitespace-pre-wrap">
             {article.content || article.excerpt || "Article content is being updated..."}
          </p>
        )}

      </div>

      {/* Author Bio Full Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8D8BD] flex items-center gap-4">
          <img src={article.author?.avatar || 'https://via.placeholder.com/32'} alt={article.author?.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#B8955A]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85C38] block">WRITTEN BY</span>
            <h4 className="font-serif text-lg text-[#173C35] font-semibold">{article.author?.name || 'Admin'}</h4>
            <p className="text-xs text-[#252525]/75 mt-0.5 leading-relaxed">
              {article.author?.role || 'Lead Editor'} based in Addis Ababa, leading expeditions across northern highlands and southern valleys.
            </p>
          </div>
        </div>
      </div>

      {/* Connected Tours & Destinations */}
      {(relatedTours.length > 0 || relatedDestinations.length > 0) && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 pt-12 border-t border-[#E8D8BD]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Related Tours */}
            {relatedTours.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8D8BD]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85C38] block mb-1">EXPERIENCE THIS IN PERSON</span>
                <h4 className="font-serif text-lg text-[#173C35] mb-4">Related Journeys</h4>
                <div className="space-y-3">
                  {relatedTours.map((t) => (
                    <Link key={t.id} to={`/tours/${t.id}`} className="p-3 rounded-xl bg-[#F8F5EF] hover:border-[#B85C38] border border-transparent transition-all flex items-center justify-between group">
                      <div>
                        <h5 className="font-serif font-semibold text-xs text-[#173C35] group-hover:text-[#B85C38]">{t.title}</h5>
                        <span className="text-[10px] text-[#252525]/60">{t.duration || 'Flexible'} • {t.category === 'signature' ? 'Signature' : 'Flexible'}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B85C38] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Destinations */}
            {relatedDestinations.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[#E8D8BD]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85C38] block mb-1">FEATURED REGIONS</span>
                <h4 className="font-serif text-lg text-[#173C35] mb-4">Destinations in This Article</h4>
                <div className="space-y-3">
                  {relatedDestinations.map((d) => (
                    <Link key={d.id} to={`/destinations/${d.id}`} className="p-3 rounded-xl bg-[#F8F5EF] hover:border-[#B85C38] border border-transparent transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <img src={d.image} alt={d.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <h5 className="font-serif font-semibold text-xs text-[#173C35] group-hover:text-[#B85C38]">{d.name}</h5>
                          <span className="text-[10px] text-[#252525]/60">{d.region} Ethiopia</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B85C38] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prev / Next Article Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-[#E8D8BD] flex items-center justify-between gap-4">
        {prevArticle ? (
          <Link to={`/journal/${prevArticle.slug || prevArticle.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 text-xs font-semibold text-[#173C35] hover:text-[#B85C38] transition-colors max-w-[45%]">
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-[#252525]/50 block uppercase">Previous Story</span>
              <span className="truncate block font-serif">{prevArticle.title}</span>
            </div>
          </Link>
        ) : <div />}

        {nextArticle && (
          <Link to={`/journal/${nextArticle.slug || nextArticle.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 text-xs font-semibold text-[#173C35] hover:text-[#B85C38] transition-colors text-right max-w-[45%]">
            <div className="truncate">
              <span className="text-[10px] text-[#252525]/50 block uppercase">Next Story</span>
              <span className="truncate block font-serif">{nextArticle.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        )}
      </div>

    </div>
  );
};