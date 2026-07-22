import { CheckCircle2, ShieldCheck, Heart, Award } from 'lucide-react';
import { Partner } from '../types';

const imagePhuQuocExpress = new URL('../assets/images/regenerated_image_1781880380801.jpeg', import.meta.url).href;
const imageSuperdong = new URL('../assets/images/regenerated_image_1781880382146.jpeg', import.meta.url).href;

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 text-brand-blue px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Đối Tác Chiến Lược</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
            Hợp Tác Cùng Những Hãng Tàu Uy Tín Nhất
          </h2>
          <div className="h-1 bg-brand-coral w-16 mx-auto mt-4 mb-3 rounded-full"></div>
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Phòng vé Tư Lai kết nối quý khách trực tiếp với hai thương hiệu tàu cao tốc đường biển lớn nhất của Việt Nam.
          </p>
        </div>

        {/* Partners Showcase bento box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {partners.map((partner: Partner) => {
            const isPhuQuocEx = partner.logoType === 'Phú Quốc Express';
            const displayImage = isPhuQuocEx ? imagePhuQuocExpress : imageSuperdong;
            return (
              <div
                key={partner.name}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 flex flex-col justify-between"
                id={`partner-card-${partner.logoType.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div>
                  {/* Decorative Banner Image */}
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img
                      src={displayImage}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    
                    {/* Floating Brand Name Logo overlay */}
                    <div className="absolute bottom-5 left-5 text-white">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider leading-none shadow-sm block w-fit mb-2 ${
                        isPhuQuocEx ? 'bg-brand-coral' : 'bg-brand-teal'
                      }`}>
                        {isPhuQuocEx ? 'TÀU HAI THÂN HIỆN ĐẠI' : 'LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN LÂU DÀI'}
                      </span>
                      <h3 className="font-heading font-black text-xl sm:text-2xl drop-shadow">
                        {partner.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <p className={`font-heading font-bold text-sm ${isPhuQuocEx ? 'text-brand-coral' : 'text-brand-teal'}`}>
                      {partner.highlights}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                      {partner.details}
                    </p>
                    
                    {/* Advantages bullet checkmarks */}
                    <div className="pt-4 border-t border-slate-50 space-y-2.5">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ưu điểm nổi bật:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-sans font-medium">
                        {partner.advantages.map((adv: string) => (
                          <li key={adv} className="flex items-start space-x-2">
                            <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 ${isPhuQuocEx ? 'text-brand-coral' : 'text-brand-teal'}`} />
                            <span className="leading-snug">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Info Verification footer bar inside card */}
                <div className="bg-slate-50/50 p-5 mt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-sans font-semibold">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>Đại Lý Cấp 1 Ủy Quyền</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-brand-coral shrink-0" />
                    <span>Đối tác uy tín, tin cậy</span>
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
