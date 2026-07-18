import { useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, X } from 'lucide-react';
import { BlogPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GuideSectionProps {
  blogPosts: BlogPost[];
}

export default function GuideSection({ blogPosts }: GuideSectionProps) {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-white" id="guides">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-teal/10 text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 animate-bounce" />
            <span>Tin Tức & Cẩm Nang</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
            Cập Nhật Mới Nhất Từ Tư Lai
          </h2>
          <div className="h-1 bg-brand-coral w-16 mx-auto mt-4 mb-3 rounded-full"></div>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Khám phá những điểm đến hấp dẫn, mẹo chuẩn bị hành lý và tất thảy tips hữu ích cho hành trình vượt biển của bạn.
          </p>
        </div>

        {/* Blogs grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post: BlogPost) => {
            return (
              <article
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                id={`blog-post-${post.id}`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Text Contents */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-medium mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-800 group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2.5 line-clamp-3">
                      {post.snippet}
                    </p>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleOpenArticle(post)}
                    className="w-full py-2 bg-slate-50 hover:bg-brand-coral hover:text-white border border-slate-100 text-slate-700 font-sans text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Pop-up Overlay for reading full text */}
      <AnimatePresence>
        {activeArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseArticle}
              className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-4 bottom-4 top-16 md:inset-y-16 md:max-w-2xl md:mx-auto bg-white rounded-3xl z-50 shadow-2xl flex flex-col overflow-hidden border border-slate-100"
              id="article-read-modal"
            >
              {/* Header Image Header overlay bar */}
              <div className="relative h-60 shrink-0 bg-slate-200">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                <button
                  onClick={handleCloseArticle}
                  className="absolute top-4 right-4 bg-white hover:bg-slate-100 p-2 rounded-full text-slate-700 shadow-md border border-slate-200 focus:outline-none transition-transform hover:scale-105"
                  aria-label="Close article"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-2.5 py-1 bg-brand-coral text-white text-[9px] font-black uppercase tracking-wider rounded-full shadow-sm block w-fit mb-2">
                    {activeArticle.category}
                  </span>
                  <h4 className="font-heading font-black text-lg sm:text-xl leading-tight text-white drop-shadow">
                    {activeArticle.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable multi-paragraph body text */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 font-sans text-slate-600 text-sm leading-relaxed scrollbar">
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 mb-2 border-b border-slate-50 pb-3">
                  <span>Ngày viết: {activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  <span>•</span>
                  <span className="text-brand-teal font-extrabold">Từ Phòng vé Tư Lai</span>
                </div>

                {/* Renders paragraphs split by double backslashes */}
                {activeArticle.content.split('\n\n').map((para: string, idx: number) => {
                  return (
                    <p key={idx} className="whitespace-pre-line text-slate-600 leading-relaxed font-sans text-xs sm:text-sm">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Sticky bottom close bar */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={handleCloseArticle}
                  className="px-5 py-2.5 bg-brand-blue hover:bg-slate-800 text-white font-sans text-xs font-bold rounded-xl cursor-pointer"
                >
                  Đóng Lại
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
