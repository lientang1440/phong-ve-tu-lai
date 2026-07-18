import { Fragment, useState } from 'react';
import { Search, Ship, CalendarClock, HelpCircle, MessageCircle } from 'lucide-react';
import { Departure, FerryOperator } from '../types';

interface ScheduleSectionProps {
  onBookNowQuick: (from: string, to: string) => void;
  departures: Departure[];
}

export default function ScheduleSection({ onBookNowQuick, departures }: ScheduleSectionProps) {
  const [operatorFilter, setOperatorFilter] = useState<'Tất cả' | FerryOperator>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const filteredSchedule = departures.filter((dep: Departure) => {
    const matchesOperator = operatorFilter === 'Tất cả' || dep.ferryLine === operatorFilter;

    const searchString = `${dep.routeFrom} ${dep.routeTo}`.toLowerCase();
    const matchesQuery = searchString.includes(searchQuery.toLowerCase().trim());

    return matchesOperator && matchesQuery;
  }).sort((a, b) => {
    const routeCompare = `${a.routeFrom} ${a.routeTo}`.localeCompare(`${b.routeFrom} ${b.routeTo}`);
    if (routeCompare !== 0) return routeCompare;
    return timeToMinutes(a.time) - timeToMinutes(b.time);
  });

  const groupedRoutes = filteredSchedule.reduce<Record<string, { routeLabel: string; departures: Departure[] }>>((acc, dep) => {
    const routeLabel = `${dep.routeFrom} → ${dep.routeTo}`;
    if (!acc[routeLabel]) {
      acc[routeLabel] = { routeLabel, departures: [] };
    }

    acc[routeLabel].departures.push(dep);
    return acc;
  }, {});

  const groupedRouteList = Object.values(groupedRoutes);

  const buildRoutePriceDetails = (routeGroup: { routeLabel: string; departures: Departure[] }) => {
    const details = routeGroup.departures.reduce<string[]>((acc, dep) => {
      const operatorDetail = `${dep.ferryLine}: ${dep.priceLabel.replaceAll(';', ' • ')}`;
      if (!acc.includes(operatorDetail)) {
        acc.push(operatorDetail);
      }
      return acc;
    }, []);

    return details.join(' | ');
  };

  const formatTimes = (departures: Departure[]) => {
    return departures
      .slice()
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
      .map((dep) => dep.time)
      .join(' • ');
  };

  return (
    <section className="py-14 sm:py-18 bg-slate-50" id="schedules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-brand-coral/10 text-brand-coral px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <CalendarClock className="w-4 h-4" />
            <span>Lịch Chạy Đề Xuất</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3.5xl text-brand-blue tracking-tight leading-none">
            Xem Nhanh Giờ Chạy Trong Ngày
          </h2>
          <div className="h-1 bg-brand-coral w-12 mx-auto mt-4 mb-3 rounded-full"></div>
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Xem giờ hoạt động tham khảo hàng ngày. Giá và giờ tàu thực tế có thể thay đổi tùy thuộc vào thời tiết biển.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          
          {/* Operator filter tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="operator-tab-controls">
            <button
              onClick={() => setOperatorFilter('Tất cả')}
              className={`px-3.5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                operatorFilter === 'Tất cả'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Các Tuyến
            </button>
            <button
              onClick={() => setOperatorFilter('Phú Quốc Express')}
              className={`px-3.5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                operatorFilter === 'Phú Quốc Express'
                  ? 'bg-brand-coral text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white block animate-pulse"></span>
              <span>Phú Quốc Express</span>
            </button>
            <button
              onClick={() => setOperatorFilter('Superdong')}
              className={`px-3.5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                operatorFilter === 'Superdong'
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white block animate-pulse"></span>
              <span>Superdong</span>
            </button>
          </div>

          {/* Text Search Port */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Tìm cảng đi / cảng đến..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-full pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Schedule Table Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="schedule-table-wrap">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-[0.16em]">
                  <th className="py-4 px-6">Tuyến Hành Trình</th>
                  <th className="py-4 px-6">Hãng Tàu</th>
                  <th className="py-4 px-6">Giờ Chạy</th>
                  <th className="py-4 px-6 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-sans" id="schedule-tbody">
                {groupedRouteList.map((routeGroup) => (
                  <Fragment key={routeGroup.routeLabel}>
                    <tr className="bg-white">
                      <td colSpan={4} className="py-3 px-6 text-sm sm:text-base font-black uppercase tracking-[0.14em] text-brand-blue">
                        {routeGroup.routeLabel}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/90">
                      <td colSpan={4} className="py-2 px-6 text-[11px] font-semibold text-slate-600 leading-5">
                        {buildRoutePriceDetails(routeGroup)}
                      </td>
                    </tr>
                    {Object.values(
                      routeGroup.departures.reduce<Record<string, Departure[]>>((acc, dep) => {
                        if (!acc[dep.ferryLine]) {
                          acc[dep.ferryLine] = [];
                        }

                        acc[dep.ferryLine].push(dep);
                        return acc;
                      }, {})
                    ).map((operatorDepartures: Departure[]) => (
                      <tr key={operatorDepartures[0].ferryLine} className="hover:bg-slate-50 transition-colors align-top">
                        <td className="py-3 px-6 font-semibold text-slate-700">
                          {operatorDepartures[0].routeFrom} → {operatorDepartures[0].routeTo}
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center space-x-2">
                            <Ship className={`w-4 h-4 ${operatorDepartures[0].ferryLine === 'Phú Quốc Express' ? 'text-brand-coral' : 'text-brand-teal'}`} />
                            <span className="font-semibold text-slate-700">{operatorDepartures[0].ferryLine}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 font-mono font-bold text-slate-800 text-sm sm:text-base">
                          {formatTimes(operatorDepartures)}
                        </td>
                        <td className="py-3 px-6 text-right">
                          <a
                            href="https://zalo.me/phongvetulai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-brand-coral hover:bg-red-700 text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-sm inline-flex items-center space-x-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Liên hệ đặt vé</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {filteredSchedule.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium font-sans">
                      Không tìm thấy lịch chạy thích hợp. Vui lòng thử tìm từ khóa cảng khác hoặc liên hệ hotline.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile responsive Cards instead of Table */}
          <div className="block md:hidden divide-y divide-slate-100" id="schedule-cards-mobile">
            {groupedRouteList.map((routeGroup) => (
              <div key={routeGroup.routeLabel} className="p-4 space-y-2.5">
                <div className="text-sm font-black uppercase tracking-[0.14em] text-brand-blue">
                  {routeGroup.routeLabel}
                </div>
                <div className="text-[11px] font-semibold text-slate-600">
                  {buildRoutePriceDetails(routeGroup)}
                </div>
                <div className="space-y-2">
                  {Object.values(
                    routeGroup.departures.reduce<Record<string, Departure[]>>((acc, dep) => {
                      if (!acc[dep.ferryLine]) {
                        acc[dep.ferryLine] = [];
                      }

                      acc[dep.ferryLine].push(dep);
                      return acc;
                    }, {})
                  ).map((operatorDepartures: Departure[]) => (
                    <div key={operatorDepartures[0].ferryLine} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Ship className={`w-4 h-4 ${operatorDepartures[0].ferryLine === 'Phú Quốc Express' ? 'text-brand-coral' : 'text-brand-teal'}`} />
                          <span className="text-xs font-bold text-slate-700">{operatorDepartures[0].ferryLine}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-800 text-[11px]">{formatTimes(operatorDepartures)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-end">
                        <a
                          href="https://zalo.me/phongvetulai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-brand-coral hover:bg-red-700 text-white text-xs font-bold rounded-full cursor-pointer inline-flex items-center space-x-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Liên hệ đặt vé</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredSchedule.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                Không tìm thấy giờ chạy tương ứng. Vui lòng điều chỉnh bộ lọc.
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400 font-sans leading-relaxed max-w-xl mx-auto flex items-start justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>Lịch chạy đề xuất hàng ngày, có thể thay đổi tùy thuộc vào thời tiết biển. Vui lòng liên hệ để biết thêm chi tiết.</span>
        </p>

      </div>
    </section>
  );
}
