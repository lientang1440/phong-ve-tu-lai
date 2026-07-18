import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Anchor, Ship, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onBookNowClick: () => void;
}

export default function Navbar({ onBookNowClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#home' },
    { name: 'Tuyến tàu', href: '#routes' },
    { name: 'Lịch chạy', href: '#schedules' },
    { name: 'Đối tác', href: '#partners' },
    { name: 'Tin tức', href: '#guides' },
    { name: 'Hỏi đáp', href: '#faqs' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-3 border-b border-slate-100'
            : 'bg-white/90 backdrop-blur-md py-4'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-2 group focus:outline-none"
            id="brand-logo"
          >
            <div className="p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm flex-shrink-0 transition-transform group-hover:scale-105 flex items-center justify-center" id="brand-logo-icon">
              <img src="/logo TL.png" alt="Phòng vé Tư Lai logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-brand-blue tracking-tight leading-none">
                Phòng vé Tư Lai
              </span>
              <span className="text-[10px] text-brand-teal font-medium tracking-wider uppercase mt-1">
                Đại lý ủy quyền chính thức
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-medium text-slate-600 hover:text-brand-coral transition-colors text-sm py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4" id="header-actions-desktop">
            <a
              href="tel:0364674854"
              className="flex items-center space-x-2 text-slate-700 hover:text-brand-coral font-medium text-sm transition-colors"
            >
              <div className="p-1.5 bg-slate-100 rounded-lg text-brand-blue">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 leading-none">Hotline 24/7</span>
                <span className="font-mono text-xs font-semibold leading-normal">0364 674 854</span>
              </div>
            </a>
            <a
              href="https://zalo.me/phongvetulai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-coral hover:bg-red-700 text-white font-sans font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-coral/50 cursor-pointer flex items-center space-x-1.5"
              id="cta-book-header"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Liên hệ đặt vé</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <a
              href="tel:0364674854"
              className="p-2 bg-slate-100 text-brand-blue rounded-lg active:bg-slate-200"
              aria-label="Call Support"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-700 hover:text-brand-blue active:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Open menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Side drawer for mobile layout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl flex flex-col p-6 md:hidden"
              id="mobile-drawer"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-sm flex-shrink-0 flex items-center justify-center">
                    <img src="/logo TL.png" alt="Phòng vé Tư Lai logo" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-heading font-extrabold text-base text-brand-blue">
                    Phòng vé Tư Lai
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-sans font-semibold text-lg text-slate-800 hover:text-brand-coral transition-colors py-1.5 border-b border-slate-50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <a
                  href="tel:0364674854"
                  className="flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl"
                >
                  <Phone className="w-5 h-5 text-brand-coral" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-medium leading-none">
                      Hotline Hỗ Trợ 24/7
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-800">0364 674 854</span>
                  </div>
                </a>
                <a
                  href="https://zalo.me/phongvetulai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 bg-brand-coral active:bg-red-700 text-white font-sans font-bold text-center rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Liên hệ đặt vé</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
