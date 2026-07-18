import { useState, useEffect } from 'react';
import { Ship, ShieldCheck, CheckCircle, Navigation, Sparkles, MessageSquareHeart, X, ChevronRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import PopularRoutes from './components/PopularRoutes';
import ScheduleSection from './components/ScheduleSection';
import PartnersSection from './components/PartnersSection';
import GuideSection from './components/GuideSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { defaultSiteContent, fetchSiteContent } from './lib/siteContent';

const imagePhuQuocExpress = new URL('./assets/images/regenerated_image_1781880380801.jpeg', import.meta.url).href;
const imageSuperdong = new URL('./assets/images/regenerated_image_1781880382146.jpeg', import.meta.url).href;

const BACKGROUND_IMAGES = [
  'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1005232/pexels-photo-1005232.jpeg?auto=compress&cs=tinysrgb&w=1600'
];

export default function App() {
  const [selectedFrom, setSelectedFrom] = useState<string | undefined>(undefined);
  const [selectedTo, setSelectedTo] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchSiteContent().then(setSiteContent).catch(() => setSiteContent(defaultSiteContent));
  }, []);

  const handleOpenBooking = () => {
    window.open('https://zalo.me/phongvetulai', '_blank', 'noopener,noreferrer');
  };

  const handleRouteSelection = (from: string, to: string) => {
    window.open('https://zalo.me/phongvetulai', '_blank', 'noopener,noreferrer');
  };

  const handleBookingSuccess = () => {
    setShowToast(true);
    // Auto collapse/hide toast after 6 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-slate-800 antialiased" id="home">
      {/* Dynamic Header */}
      <Navbar onBookNowClick={handleOpenBooking} />

      {/* Hero Section */}
      <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden" id="hero-main">
        
        {/* Slideshow background layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" id="hero-slideshow-container">
          {BACKGROUND_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                idx === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          ))}
          {/* Ambient translucent overlay for superb content readability and contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50/85 via-white/90 to-slate-50/95" />
        </div>
        
        {/* Floating background shapes */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-brand-coral/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left" id="hero-marketing-col">
              <div className="inline-flex items-center space-x-2 bg-brand-coral/10 text-brand-coral px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Phòng Vé Tư Lai — Uy Tín Hàng Đầu</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="font-heading font-black text-4xl sm:text-5.5xl text-brand-blue tracking-tight leading-tight">
                  Gửi trọn niềm tin<br />
                  <span className="text-brand-coral">trên mỗi chuyến đi</span>
                </h1>
                
                <p className="font-sans text-sm sm:text-base text-slate-500 max-w-lg leading-relaxed font-medium">
                  Khám phá Phú Quốc, Côn Đảo, Nam Du, Thổ Chu cùng đội tàu cao tốc hai thân hiện đại bậc nhất Việt Nam — an toàn, đúng giờ và tràn ngập niềm tin khởi hành.
                </p>
              </div>

              {/* Guarantees Badges block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">Tàu Hai Thân Hiện Đại</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Giảm say sóng tối đa, khoang VIP cao cấp rộng thoáng.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-brand-cyan/10 text-brand-teal rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">Đại lý Cấp 1 Ủy Quyền</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Chịu trách nhiệm trực tiếp, hỗ trợ mã vé điện tử tức thì.</p>
                  </div>
                </div>
              </div>

              {/* Action buttons list */}
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="https://zalo.me/phongvetulai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-brand-coral hover:bg-red-700 text-white font-sans font-bold rounded-2xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-white" />
                  <span>Liên hệ đặt vé qua Zalo</span>
                </a>
                <a
                  href="#routes"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans font-bold rounded-2xl transition-colors text-xs sm:text-sm flex items-center space-x-1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Navigation className="w-4 h-4 rotate-90 text-brand-teal" />
                  <span>Xem các tuyến tàu</span>
                </a>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center gap-6" id="hero-illustration-col">
              {/* Decorative graphic backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
              
              {/* Card 1: Phu Quoc Express */}
              <div className="relative group overflow-hidden rounded-2xl bg-white p-3.5 shadow-lg border border-slate-100/80 transition-transform duration-300 hover:scale-[1.01] max-w-sm w-full">
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={imagePhuQuocExpress}
                    alt="Tàu cao tốc hai thân Phú Quốc Express"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient coating */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />
                  
                  {/* Float highlight details */}
                  <div className="absolute top-3 left-3 inline-flex items-center space-x-1 bg-brand-coral text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow">
                    <Ship className="w-3 h-3" />
                    <span>PHÚ QUỐC EXPRESS</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h5 className="font-heading font-extrabold text-xs sm:text-sm tracking-tight leading-tight">Đội tàu hai thân cao cấp 5 sao</h5>
                    <p className="text-[10px] text-slate-200 mt-0.5 font-medium leading-relaxed">Êm sóng, trang thiết bị khoang VIP hiện đại và tiện lợi tối đa.</p>
                  </div>
                </div>

                {/* Bottom details */}
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-[10px] font-bold text-brand-coral">Liên hệ ngay để nhận ưu đãi</span>
                  </div>
                  <a
                    href="https://zalo.me/phongvetulai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-extrabold text-brand-coral hover:text-red-700 flex items-center space-x-0.5 group/btn cursor-pointer animate-pulse"
                  >
                    <span>Đặt vé nhanh qua Zalo</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Superdong */}
              <div className="relative group overflow-hidden rounded-2xl bg-white p-3.5 shadow-lg border border-slate-100/80 transition-transform duration-300 hover:scale-[1.01] max-w-sm w-full">
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={imageSuperdong}
                    alt="Tàu cao tốc một thân Superdong chất lượng cao"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  {/* Gradient coating */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />
                  
                  {/* Float highlight details */}
                  <div className="absolute top-3 left-3 inline-flex items-center space-x-1 bg-brand-blue text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow">
                    <Ship className="w-3 h-3" />
                    <span>TÀU CAO TỐC SUPERDONG</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h5 className="font-heading font-extrabold text-xs sm:text-sm tracking-tight leading-tight">Lựa chọn tối ưu, lịch trình dày đặc</h5>
                    <p className="text-[10px] text-slate-200 mt-0.5 font-medium leading-relaxed">Danh tiếng chuẩn mực, vận hành tuyệt đối an toàn & tiết kiệm chi phí.</p>
                  </div>
                </div>

                {/* Bottom details */}
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-brand-blue">Liên hệ ngay nhận ưu đãi</span>
                  </div>
                  <a
                    href="https://zalo.me/phongvetulai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-extrabold text-brand-blue hover:text-blue-900 flex items-center space-x-0.5 group/btn2 cursor-pointer"
                  >
                    <span>Lên lịch & Đặt qua Zalo</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn2:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Popular Routes Section */}
      <PopularRoutes onSelectRoute={handleRouteSelection} routes={siteContent.routes} />

      {/* Schedule Timetable Section */}
      <ScheduleSection onBookNowQuick={handleRouteSelection} departures={siteContent.departures} />

      {/* Partners and Fleet Section */}
      <PartnersSection partners={siteContent.partners} />

      {/* Guides Section */}
      <GuideSection blogPosts={siteContent.blogPosts} />

      {/* FAQs Section */}
      <FAQSection faqs={siteContent.faqs} />

      {/* Footer Details */}
      <Footer />

      {/* Booking Form Premium Dialog overlay */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="booking-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body placement */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
              >
                {/* Clean absolute close button */}
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus:outline-none"
                  aria-label="Đóng bảng đặt vé"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* The Booking Form */}
                <BookingForm
                  initialFrom={selectedFrom}
                  initialTo={selectedTo}
                  departures={siteContent.departures}
                  onSuccessSubmit={() => {
                    handleBookingSuccess();
                    setIsBookingOpen(false);
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Slide-Up Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 border border-slate-800 flex items-start space-x-3.5 dark-glass"
            id="confirmation-toast"
          >
            <div className="p-2 bg-emerald-500 rounded-xl text-white shrink-0 mt-0.5">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h5 className="font-heading font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">Đã tiếp nhận yêu cầu!</h5>
              <p className="font-sans text-[11px] text-slate-300 leading-relaxed font-semibold">
                Nhân viên Phòng vé sảnh Rạch Giá sẽ nhanh chóng nhắn tin Zalo giữ chỗ vé của bạn ngay tức thì.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
