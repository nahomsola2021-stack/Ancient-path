import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { FAQS_DATA } from '../data/faqsData';

export const FaqSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQS_DATA[0].id);

  const categories = ['All', ...Array.from(new Set(FAQS_DATA.map(f => f.category)))];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faqs-section" className="py-20 lg:py-28 bg-[#E8D8BD]/20 border-b border-[#E8D8BD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B85C38] font-bold block mb-3">
            COMMON QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#173C35] tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#252525]/80 leading-relaxed">
            Everything you need to know about traveling with Ancient Path, booking terms, flexibility, and country details.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-[#252525]/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g., safety, visas, best season, tailoring)..."
              className="w-full bg-white border border-[#E8D8BD] text-[#252525] text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl focus:border-[#B85C38] focus:outline-none shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#173C35] text-[#F8F5EF]'
                    : 'bg-white text-[#252525]/75 hover:text-[#173C35] border border-[#E8D8BD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${
                  isExpanded ? 'border-[#B85C38]' : 'border-[#E8D8BD] hover:border-[#B8955A]'
                }`}
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#F8F5EF] text-[#B85C38] shrink-0 border border-[#E8D8BD]">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-[#173C35] font-medium">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="text-[#252525]/60 p-1 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#B85C38]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#252525]/80 leading-relaxed border-t border-[#E8D8BD]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 bg-white border border-[#E8D8BD] rounded-2xl p-6 text-center shadow-sm">
          <h4 className="font-serif text-lg text-[#173C35] mb-1">
            Have a question not listed here?
          </h4>
          <p className="text-xs text-[#252525]/75 mb-4">
            Our local travel planners in Addis Ababa are always on hand to assist with specific route questions or custom arrangements.
          </p>
          <a
            href="#contact-section"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85C38] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speak With Our Team</span>
          </a>
        </div>

      </div>
    </section>
  );
};


