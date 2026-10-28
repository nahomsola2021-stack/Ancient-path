import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MessageSquare, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQS_DATA } from '../data/faqsData';

export const FaqsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const categories = ['All', 'Booking & Customization', 'Logistics', 'General', 'Preparation'];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ = faq.question.toLowerCase().includes(q);
        const matchesA = faq.answer.toLowerCase().includes(q);
        if (!matchesQ && !matchesA) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] pt-24 pb-20">
      
      {/* Page Hero */}
      <div className="bg-[#173C35] text-[#F8F5EF] py-16 sm:py-20 border-b border-[#26534b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8955A_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Frequently Asked Questions' }]}
            className="mb-6 text-[#E8D8BD]/80"
          />

          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B8955A] font-bold block mb-2">
              KNOWLEDGE BASE & GUIDELINES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F8F5EF] tracking-tight leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#E8D8BD]/90 leading-relaxed">
              Clear answers to the most common questions regarding private tailoring, domestic flights, group dynamics, safety, and travel preparations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8D8BD] shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#173C35] text-[#F8F5EF] shadow'
                    : 'bg-[#F8F5EF] text-[#252525]/75 hover:text-[#173C35] border border-[#E8D8BD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#252525]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#E8D8BD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#252525] focus:outline-none focus:border-[#B85C38]"
            />
          </div>

        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E8D8BD] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-[#F8F5EF] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38] bg-[#F4EFE6] px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-[#173C35] font-normal leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-full text-[#173C35] shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#B85C38]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#252525]/85 border-t border-[#E8D8BD]/60 bg-[#F8F5EF] leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#173C35] text-[#F8F5EF] p-8 sm:p-10 rounded-3xl border border-[#26534b] text-center space-y-4">
          <MessageSquare className="w-10 h-10 text-[#B8955A] mx-auto" />
          <h3 className="font-serif text-2xl text-[#F8F5EF]">
            Didn't Find What You Were Looking For?
          </h3>
          <p className="text-xs sm:text-sm text-[#E8D8BD]/85 max-w-lg mx-auto leading-relaxed">
            Our Addis Ababa concierge team is on standby to assist with any unique itinerary questions, private aircraft charters, or medical requirements.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#B85C38] hover:bg-[#a04e2e] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Contact Our Team</span>
            </Link>

            <Link
              to="/planner"
              className="px-6 py-3 border border-[#E8D8BD] text-[#F8F5EF] hover:bg-[#E8D8BD] hover:text-[#173C35] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your Journey</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};


