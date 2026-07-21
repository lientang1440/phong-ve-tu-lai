import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Landmark, Heart, HelpCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
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
    <footer className="bg-brand-blue text-slate-300" id="contact">
      {/* Upper Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Info Grid block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-brand-coral rounded-xl text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-xl text-white tracking-tight">
                Phòng Vé Tư Lai
              </h3>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cung cấp dịch vụ vận tải hành khách tàu cao tốc đi Phú Quốc, Côn Đảo, Nam Du và các đảo ngọc tuyệt đẹp vùng biển Tây Nam Việt Nam. Cam kết giao vé nhanh, an tâm tuyệt đối.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[11px] text-slate-400 font-sans">
              <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>Đối tác Ủy quyền chính thức Phú Quốc Express & Superdong</span>
            </div>
          </div>

          {/* Quick Links Grid Block */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Liên kết nhanh
            </h4>
            <div className="h-0.5 bg-brand-coral w-8 rounded-full mb-2"></div>
            
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-white transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#routes" onClick={(e) => handleLinkClick(e, '#routes')} className="hover:text-white transition-colors">
                  Tuyến tàu phổ biến
                </a>
              </li>
              <li>
                <a href="#schedules" onClick={(e) => handleLinkClick(e, '#schedules')} className="hover:text-white transition-colors">
                  Lịch chạy hàng ngày
                </a>
              </li>
              <li>
                <a href="#partners" onClick={(e) => handleLinkClick(e, '#partners')} className="hover:text-white transition-colors">
                  Đối tác hãng tàu
                </a>
              </li>
              <li>
                <a href="#guides" onClick={(e) => handleLinkClick(e, '#guides')} className="hover:text-white transition-colors">
                  Tin tức & Cẩm nang
                </a>
              </li>
            </ul>
          </div>

          {/* Support desk Grid Block */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Hỗ trợ & Quy định
            </h4>
            <div className="h-0.5 bg-brand-coral w-8 rounded-full mb-2"></div>
            
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white transition-colors">
                  Quy tắc đặt vé
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white transition-colors">
                  Hỏi đáp chung
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white transition-colors">
                  Chính sách hoàn hủy
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white transition-colors">
                  Hỗ trợ khẩn cấp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct Box Block */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
              Thông tin liên hệ
            </h4>
            <div className="h-0.5 bg-brand-coral w-8 rounded-full mb-2"></div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-sans">
              
              {/* Phone contact desk */}
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4.5 h-4.5 text-brand-cyan shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-white text-xs font-semibold leading-none">Hotline Hỗ Trợ 24/7:</p>
                  <a href="tel:0364674854" className="font-mono text-base font-bold text-white hover:text-brand-coral block">
                    0364 674 854
                  </a>
                  <a href="tel:02670795274" className="font-mono text-sm font-semibold text-slate-300 hover:text-brand-coral block">
                    0944 485 510
                  </a>
                </div>
              </li>

              {/* Email support */}
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4.5 h-4.5 text-brand-cyan shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Email Phòng Vé:</p>
                  <a href="mailto:hello@oceanline.vn" className="hover:text-white transition-colors block mt-0.5">
                    nguyenthuong04041994@gmail.com
                  </a>
                </div>
              </li>

              {/* Seaports head offices */}
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Văn Phòng</p>
                  <span className="block mt-0.5">Tổ 3, khu phố Bãi Vòng Hàm Ninh, đặc khu Phú Quốc, tỉnh An Giang, Việt Nam</span>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Under copyright segment */}
      <div className="bg-slate-950/40 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-sans font-medium gap-3">
          <span>
            © {currentYear} OceanLine & Phòng vé Tư Lai. Tất cả quyền được bảo lưu.
          </span>
          <div className="flex items-center space-x-1.5 text-slate-500">
            <span>Thiết kế tối ưu hóa tốc độ cao</span>
            <Heart className="w-3.5 h-3.5 text-brand-coral fill-brand-coral animate-ping-slow" />
            <span>tại Việt Nam</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
// Custom CSS animations configured in app
