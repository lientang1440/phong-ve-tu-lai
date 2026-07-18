import { MapPin, Navigation, Compass, MessageCircle } from 'lucide-react';
import { Route } from '../types';

interface PopularRoutesProps {
  onSelectRoute: (from: string, to: string) => void;
  routes: Route[];
}

export default function PopularRoutes({ onSelectRoute, routes }: PopularRoutesProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50" id="routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-teal/10 text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Tự Hào Đồng Hành</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
            Hành Trình Tới Những Hòn Đảo Đẹp Nhất
          </h2>
          <div className="h-1 bg-brand-coral w-16 mx-auto mt-4 mb-3 rounded-full"></div>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Phòng vé Tư Lai làm cầu nối trực tiếp đưa bạn chinh phục các thiên đường biển đảo Tây Nam với giá vé tối ưu nhất.
          </p>
        </div>

        {/* Routes Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {routes.map((route: Route) => {
            return (
              <div
                key={route.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full border border-slate-100"
                id={`route-card-${route.id}`}
              >
                {/* Image backdrop */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={route.image}
                    alt={`${route.from} đi ${route.to}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  {route.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-coral text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
                      {route.badge}
                    </span>
                  )}

                  {/* Corner Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-brand-blue/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold flex flex-col items-end shadow">
                    <span className="text-[9px] text-slate-300 font-medium leading-none">Giá từ</span>
                    <span className="font-mono text-sm font-black mt-0.5 text-brand-cyan">
                      {route.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center text-brand-blue font-heading font-extrabold text-lg">
                      <span>{route.from}</span>
                      <Navigation className="w-3.5 h-3.5 mx-2 text-brand-coral rotate-90" />
                      <span>{route.to}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                      {route.description}
                    </p>
                  </div>

                  {/* Booking shortcut button */}
                  <div className="pt-5 mt-4 border-t border-slate-50">
                    <a
                      href="https://zalo.me/phongvetulai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-brand-blue hover:bg-slate-800 text-white font-sans text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Đặt Vé Qua Zalo</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
