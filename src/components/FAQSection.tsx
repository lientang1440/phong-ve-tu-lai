import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldAlert, BadgeInfo } from 'lucide-react';
import { FAQ } from '../types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'quy-tac' | 'hoi-dap' | 'chinh-sach' | 'ho-tro'>('all');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const categoriesSet = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'quy-tac', label: 'Quy tắc đặt vé' },
    { key: 'hoi-dap', label: 'Hỏi đáp' },
    { key: 'chinh-sach', label: 'Chính sách' },
    { key: 'ho-tro', label: 'Hỗ Trợ' },
  ];

  const handleToggleFAQ = (idx: string) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  // Filter list
  const filteredFAQs = faqs.filter((faq: FAQ) => {
    return activeCategory === 'all' || faq.category === activeCategory;
  });

  return (
    <section className="py-16 sm:py-20 bg-slate-50" id="faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 text-brand-blue px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 animate-pulse" />
            <span>Chuyên Mục Giải Đáp</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
            Câu Hỏi Thường Gặp & Quy Định
          </h2>
          <div className="h-1 bg-brand-coral w-16 mx-auto mt-4 mb-3 rounded-full"></div>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Xem nhanh quy trình đặt vé, thủ tục chuẩn bị ra bến tàu cao tốc, chỉnh sửa vé và cước phí gửi xe máy tại phòng bán vé Tư Lai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Category List of Sidebar buttons */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none" id="faq-categories-grid">
            {categoriesSet.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key as any);
                    setOpenIndex(null);
                  }}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-left whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-md lg:translate-x-1.5'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                  } focus:outline-none cursor-pointer`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right Accordions of FAQ Questions */}
          <div className="lg:col-span-8 space-y-4" id="faq-accordions-group">
            {filteredFAQs.map((faq: FAQ, idx: number) => {
              const uniqueId = `faq-${faq.category}-${idx}`;
              const isOpen = openIndex === uniqueId;
              
              return (
                <div
                  key={uniqueId}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => handleToggleFAQ(uniqueId)}
                    className="w-full px-5 py-4.5 sm:px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-slate-50/50"
                  >
                    <div className="flex items-start space-x-3 pr-4">
                      {faq.category === 'chinh-sach' && <ShieldAlert className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />}
                      {faq.category === 'quy-tac' && <BadgeInfo className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />}
                      {faq.category !== 'chinh-sach' && faq.category !== 'quy-tac' && <MessageSquare className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />}
                      
                      <span className="font-heading font-extrabold text-sm sm:text-base text-slate-800 leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 border-t border-slate-50 bg-slate-50/30' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 sm:p-6 text-xs sm:text-sm text-slate-500 leading-relaxed font-sans font-medium whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
