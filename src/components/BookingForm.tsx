import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, ArrowRightLeft, Ship, CreditCard, ChevronRight, CheckCircle2, User, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingState, Departure } from '../types';
import { PORTS_LIST, ROUTE_CONNECTIONS } from '../data';

interface BookingFormProps {
  initialFrom?: string;
  initialTo?: string;
  departures: Departure[];
  onSuccessSubmit: () => void;
}

export default function BookingForm({ initialFrom, initialTo, departures, onSuccessSubmit }: BookingFormProps) {
  // Stepper state: 'search' | 'select-depart' | 'select-return' | 'customer-info' | 'summary' | 'confirmed'
  const [step, setStep] = useState<'search' | 'select-depart' | 'select-return' | 'customer-info' | 'summary' | 'confirmed'>('search');

  // Form State
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [fromPort, setFromPort] = useState(initialFrom || 'Rạch Giá');
  const [toPort, setToPort] = useState(initialTo || 'Phú Quốc');
  const [departDate, setDepartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // default to 3 days later
    return date.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Selections
  const [availableDeparts, setAvailableDeparts] = useState<Departure[]>([]);
  const [availableReturns, setAvailableReturns] = useState<Departure[]>([]);
  const [selectedDepartShip, setSelectedDepartShip] = useState<Departure | null>(null);
  const [selectedReturnShip, setSelectedReturnShip] = useState<Departure | null>(null);

  // Form validations errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Trigger from outside prop changes (popular routes clicking)
  useEffect(() => {
    if (initialFrom) {
      setFromPort(initialFrom);
    }
    if (initialTo) {
      setToPort(initialTo);
    }
  }, [initialFrom, initialTo]);

  // Adjust Departure -> Arrival options automatically
  useEffect(() => {
    const allowedArrivals = ROUTE_CONNECTIONS[fromPort] || [];
    if (!allowedArrivals.includes(toPort)) {
      setToPort(allowedArrivals[0] || '');
    }
  }, [fromPort]);

  // Handle Search Submitting
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find available departures
    const departs = departures.filter(dep => dep.routeFrom === fromPort && dep.routeTo === toPort);
    setAvailableDeparts(departs);
    
    if (isRoundTrip) {
      const returns = departures.filter(dep => dep.routeFrom === toPort && dep.routeTo === fromPort);
      setAvailableReturns(returns);
    } else {
      setAvailableReturns([]);
      setSelectedReturnShip(null);
    }

    if (departs.length === 0) {
      setErrors({ search: `Xin lỗi, hiện tại chúng tôi chưa có lịch đề xuất cho chuyến từ ${fromPort} đến ${toPort}. Vui lòng gọi trực tiếp hotline để được giữ cấu vé riêng.` });
    } else {
      setErrors({});
      setSelectedDepartShip(null);
      setStep('select-depart');
    }
  };

  const handleSelectDepartShip = (ship: Departure) => {
    setSelectedDepartShip(ship);
    if (isRoundTrip) {
      if (availableReturns.length === 0) {
        setErrors({ search: `Chưa tìm thấy chuyến tàu về tương ứng từ ${toPort} đến ${fromPort} của hãng tàu. Xin giữ liên lạc để phòng vé Tư Lai bổ sung.` });
        setStep('customer-info');
      } else {
        setStep('select-return');
      }
    } else {
      setStep('customer-info');
    }
  };

  const handleSelectReturnShip = (ship: Departure) => {
    setSelectedReturnShip(ship);
    setStep('customer-info');
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!customerName.trim()) tempErrors.name = 'Vui lòng cung cấp Họ tên chính xác';
    if (!customerPhone.trim()) {
      tempErrors.phone = 'Vui lòng cung cấp Số điện thoại liên lạc';
    } else if (!/^[0-9+]{9,12}$/.test(customerPhone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Số điện thoại không hợp lệ (9 đến 12 chữ số)';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      setStep('summary');
    }
  };

  const handleConfirmBooking = () => {
    // Perfect simulation of booking complete
    setStep('confirmed');
    onSuccessSubmit();
  };

  const handleSwapPorts = () => {
    const oldFrom = fromPort;
    const oldTo = toPort;
    
    // Switch is valid only if reverse connection exists
    const allowedForOldTo = ROUTE_CONNECTIONS[oldTo] || [];
    if (allowedForOldTo.includes(oldFrom)) {
      setFromPort(oldTo);
      setToPort(oldFrom);
    } else {
      // Just swap, the useEffect will correct destination if not valid
      setFromPort(oldTo);
      setToPort(oldFrom);
    }
  };

  // Calculations
  const departPriceTotal = selectedDepartShip ? (selectedDepartShip.price ?? 0) * passengers : 0;
  const returnPriceTotal = selectedReturnShip ? (selectedReturnShip.price ?? 0) * passengers : 0;
  const totalPrice = departPriceTotal + returnPriceTotal;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden" id="booking-container">
      {/* Header Tracker */}
      <div className="bg-brand-blue py-5 px-6 sm:px-8 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-lg text-brand-cyan">
            <Ship className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg">Đặt Vé Trực Tuyến</h3>
            <p className="text-xs text-slate-300">Nhanh chóng - Cam kết bảo mật</p>
          </div>
        </div>

        {/* Stepper Status badges */}
        <div className="flex items-center space-x-1.5 text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-full ${step === 'search' ? 'bg-brand-coral text-white' : 'bg-white/15 text-slate-300'}`}>Tìm</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={`px-2.5 py-1 rounded-full ${(step === 'select-depart' || step === 'select-return') ? 'bg-brand-coral text-white' : 'bg-white/15 text-slate-300'}`}>Tàu</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={`px-2.5 py-1 rounded-full ${step === 'customer-info' ? 'bg-brand-coral text-white' : 'bg-white/15 text-slate-300'}`}>Tin</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={`px-2.5 py-1 rounded-full ${step === 'summary' ? 'bg-brand-coral text-white' : 'bg-white/15 text-slate-300'}`}>Duyệt</span>
        </div>
      </div>

      <div className="p-6 sm:p-8" id="booking-content-viewport">
        <AnimatePresence mode="wait">
          {/* STEP 1: SEARCH PORTS */}
          {step === 'search' && (
            <motion.form
              key="step-search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSearch}
              className="space-y-6"
            >
              {/* Trip type chooser */}
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(false)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${!isRoundTrip ? 'bg-brand-blue text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  Một Chiều
                </button>
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(true)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${isRoundTrip ? 'bg-brand-blue text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  Khứ Hồi (Đi & Về)
                </button>
              </div>

              {/* Seaports swapper input */}
              <div className="relative grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
                <div className="md:col-span-4 flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal" /> Nơi Đi
                  </label>
                  <select
                    value={fromPort}
                    onChange={(e) => setFromPort(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm focus:bg-white"
                  >
                    {PORTS_LIST.map((port) => (
                      <option key={port} value={port}>{port}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center md:col-span-1 md:mt-5">
                  <button
                    type="button"
                    onClick={handleSwapPorts}
                    className="p-3 bg-slate-50 hover:bg-slate-100 focus:bg-slate-100 border border-slate-200 text-slate-500 rounded-full transition-transform hover:scale-105 hover:text-brand-coral cursor-pointer"
                    title="Đổi chiều đi về"
                  >
                    <ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" />
                  </button>
                </div>

                <div className="md:col-span-4 flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-coral" /> Nơi Đến
                  </label>
                  <select
                    value={toPort}
                    onChange={(e) => setToPort(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm focus:bg-white"
                  >
                    {(ROUTE_CONNECTIONS[fromPort] || []).map((port) => (
                      <option key={port} value={port}>{port}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className={`${isRoundTrip ? 'sm:col-span-4' : 'sm:col-span-6'} flex flex-col space-y-1.5`}>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Ngày Đi
                  </label>
                  <input
                    type="date"
                    value={departDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 font-sans font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  />
                </div>

                {isRoundTrip && (
                  <div className="sm:col-span-4 flex flex-col space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> Ngày Về
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={departDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 font-sans font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                    />
                  </div>
                )}

                <div className={`${isRoundTrip ? 'sm:col-span-4' : 'sm:col-span-6'} flex flex-col space-y-1.5`}>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" /> Số Hành Khách
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden py-1">
                    <button
                      type="button"
                      disabled={passengers <= 1}
                      onClick={() => setPassengers(p => p - 1)}
                      className="px-4 py-1.5 hover:bg-slate-100 disabled:opacity-40 text-lg font-extrabold text-slate-600 focus:outline-none select-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-slate-800 text-sm">
                      {passengers} hành khách
                    </span>
                    <button
                      type="button"
                      disabled={passengers >= 10}
                      onClick={() => setPassengers(p => p + 1)}
                      className="px-4 py-1.5 hover:bg-slate-100 disabled:opacity-40 text-lg font-extrabold text-slate-600 focus:outline-none select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {errors.search && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm text-amber-700 font-medium leading-relaxed">
                  {errors.search}
                </div>
              )}

              {/* Submit searching button */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-coral hover:bg-red-700 text-white font-heading font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Tìm Chuyến & Đặt Vé</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
          )}

          {/* STEP 2: CHOOSE DEPART SHIP */}
          {step === 'select-depart' && (
            <motion.div
              key="step-depart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] text-brand-teal uppercase tracking-wider font-extrabold">Chiều đi</span>
                  <h4 className="font-heading font-extrabold text-base text-brand-blue flex items-center">
                    {fromPort} → {toPort}
                  </h4>
                </div>
                <button
                  onClick={() => setStep('search')}
                  className="text-xs text-slate-500 hover:text-brand-coral font-semibold"
                >
                  Quay lại sửa
                </button>
              </div>

              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                🚀 Cho ngày khàng vào <strong className="text-slate-800">{departDate}</strong>. Vui lòng chọn hãng tàu muốn khởi hành:
              </p>

              <div className="space-y-3">
                {availableDeparts.map((ship) => (
                  <div
                    key={ship.id}
                    onClick={() => handleSelectDepartShip(ship)}
                    className="p-4 border border-slate-200 hover:border-brand-teal bg-white rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md group active:bg-slate-50"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Logo and Brand decoration */}
                      <div className={`p-2.5 rounded-xl font-bold text-center flex flex-col justify-center items-center min-w-[70px] ${
                        ship.ferryLine === 'Phú Quốc Express' ? 'bg-red-50 text-brand-coral' : 'bg-teal-50 text-brand-teal'
                      }`}>
                        <Ship className="w-5 h-5 mb-0.5" />
                        <span className="text-[9px] uppercase font-black leading-none truncate max-w-[65px]">{ship.ferryLine.split(' ')[0]}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-lg text-slate-800">{ship.time}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">{ship.ferryLine}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
  Giá vé:{' '}
  <strong className="text-brand-blue">
    {ship.price != null
      ? `${ship.price.toLocaleString('vi-VN')} VNĐ`
      : ship.priceLabel}
  </strong>
</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-coral group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Chọn vé <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-1">● {ship.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: CHOOSE RETURN SHIP */}
          {step === 'select-return' && (
            <motion.div
              key="step-return"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] text-brand-coral uppercase tracking-wider font-extrabold font-heading">Chiều về</span>
                  <h4 className="font-heading font-extrabold text-base text-brand-blue">
                    {toPort} → {fromPort}
                  </h4>
                </div>
                <button
                  onClick={() => setStep('select-depart')}
                  className="text-xs text-slate-500 hover:text-brand-coral font-semibold"
                >
                  Quay lại chọn lượt đi
                </button>
              </div>

              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                🚀 Cho ngày khởi hành về <strong className="text-slate-800">{returnDate}</strong>. Chọn chuyến tàu chiều về:
              </p>

              <div className="space-y-3">
                {availableReturns.map((ship) => (
                  <div
                    key={ship.id}
                    onClick={() => handleSelectReturnShip(ship)}
                    className="p-4 border border-slate-200 hover:border-brand-teal bg-white rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md group active:bg-slate-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-xl font-bold text-center flex flex-col justify-center items-center min-w-[70px] ${
                        ship.ferryLine === 'Phú Quốc Express' ? 'bg-red-50 text-brand-coral' : 'bg-teal-50 text-brand-teal'
                      }`}>
                        <Ship className="w-5 h-5 mb-0.5" />
                        <span className="text-[9px] uppercase font-black leading-none truncate max-w-[65px]">{ship.ferryLine.split(' ')[0]}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-mono font-bold text-lg text-slate-800">{ship.time}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">{ship.ferryLine}</span>
                        </div>
                       <p className="text-xs text-slate-500 mt-1">
  Giá vé:{' '}
  <strong className="text-brand-blue">
    {ship.price != null
      ? `${ship.price.toLocaleString('vi-VN')} VNĐ`
      : ship.priceLabel}
  </strong>
</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-coral group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Chọn vé <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-1">● {ship.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 'customer-info' && (
            <motion.form
              key="step-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleCustomerSubmit}
              className="space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Bước tiếp theo</span>
                  <h4 className="font-heading font-extrabold text-base text-brand-blue">Thông Tin Liên Hệ</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(isRoundTrip ? 'select-return' : 'select-depart')}
                  className="text-xs text-slate-500 hover:text-brand-coral font-semibold"
                >
                  Chọn lại tàu
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-blue" /> Họ Tên Người Đặt Vé <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:bg-white"
                  />
                  {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name}</span>}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-blue" /> Số Điện Thoại (Có Zalo) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 font-mono font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:bg-white"
                  />
                  {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone}</span>}
                  <p className="text-[10px] text-slate-400">Phòng vé sẽ liên hệ gửi mã vé điện tử qua Zalo số này.</p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" /> Địa Chỉ Email (Nhận file vé - Không bắt buộc)
                  </label>
                  <input
                    type="email"
                    placeholder="customer@domain.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-coral hover:bg-red-700 text-white font-heading font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
              >
                <span>Xem Tóm Tắt & Thanh Toán</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {/* STEP 5: BOOKING SUMMARY */}
          {step === 'summary' && (
            <motion.div
              key="step-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-heading font-extrabold text-base text-brand-blue flex items-center">
                  Xác Nhận Đơn Đặt Vé
                </h4>
                <button
                  onClick={() => setStep('customer-info')}
                  className="text-xs text-slate-500 hover:text-brand-coral font-semibold"
                >
                  Sửa thông tin
                </button>
              </div>

              {/* Tickets layout detail */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-slate-700 text-xs sm:text-sm space-y-3">
                {/* Lượt đi */}
                <div className="pb-3 border-b border-dashed border-slate-200">
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-brand-teal">LƯỢT ĐI</span>
                    <span className="text-slate-800">{departDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tuyến: <strong>{fromPort} → {toPort}</strong></span>
                    <span>Tàu: <strong className="text-slate-800">{selectedDepartShip?.ferryLine}</strong></span>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-slate-500 text-[11px]">
                    <span>Giờ chạy: <strong className="text-slate-800 text-sm font-mono">{selectedDepartShip?.time}</strong></span>
                    <span>Cước phí: {(selectedDepartShip?.price ?? 0).toLocaleString('vi-VN')}đ × {passengers}</span>
                  </div>
                </div>

                {/* Lượt về */}
                {isRoundTrip && selectedReturnShip && (
                  <div className="pb-3 border-b border-dashed border-slate-200">
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-brand-coral">LƯỢT VỀ</span>
                      <span className="text-slate-800">{returnDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tuyến: <strong>{toPort} → {fromPort}</strong></span>
                      <span>Tàu: <strong className="text-slate-800">{selectedReturnShip.ferryLine}</strong></span>
                    </div>
                    <div className="flex justify-between items-center mt-1 text-slate-500 text-[11px]">
                      <span>Giờ chạy: <strong className="text-slate-800 text-sm font-mono">{selectedReturnShip.time}</strong></span>
                      <span>Cước phí: {(selectedReturnShip.price ?? 0).toLocaleString('vi-VN')}đ × {passengers}</span>
                    </div>
                  </div>
                )}

                {/* Khách hàng */}
                <div className="space-y-1 py-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Hành khách:</span>
                    <strong className="text-slate-800">{passengers} người</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Người liên hệ:</span>
                    <strong className="text-slate-800">{customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Số điện thoại:</span>
                    <strong className="text-slate-800 font-mono">{customerPhone}</strong>
                  </div>
                  {customerEmail && (
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <strong className="text-slate-800">{customerEmail}</strong>
                    </div>
                  )}
                </div>

                {/* Total price */}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center bg-slate-100 rounded-xl px-3 py-2">
                  <span className="font-bold text-slate-800 text-sm">TỔNG CỘNG CHƯA GIẢM:</span>
                  <span className="font-mono text-base font-black text-brand-coral">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {/* Secure badge */}
              <div className="flex items-start space-x-2 text-slate-500 text-[11px] leading-snug">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Bằng việc nhấn đặt vé, thông tin đăng ký giữ chỗ của bạn sẽ được chuyển tiếp trực tiếp đến hệ thống hãng để Phòng vé giữ cabin ghế của bạn. <strong>Không tính phí giữ chỗ rủi ro thất thoải.</strong></p>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-black rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CreditCard className="w-5 h-5" />
                <span>Gửi Đăng Ký Giữ Chỗ Ngay</span>
              </button>
            </motion.div>
          )}

          {/* CONFIRMED SCREEN */}
          {step === 'confirmed' && (
            <motion.div
              key="step-confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 space-y-5"
            >
              <div className="inline-flex items-center justify-center p-4 bg-emerald-100 text-emerald-600 rounded-full animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-heading font-black text-xl text-slate-800 uppercase tracking-tight">🎉 Đặt vé thành công!</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Chúng tôi đã ghi nhận thành công đơn đăng ký của quý khách <strong className="text-slate-800">{customerName}</strong>. 
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                <p className="font-bold text-slate-800 text-center uppercase tracking-wide border-b border-slate-200 pb-1.5 text-brand-blue">Phiếu Đăng Ký Tạm Tính</p>
                <div className="flex justify-between">
                  <span>Mã đăng ký:</span>
                  <strong className="text-brand-coral font-mono">TL-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Hành trình:</span>
                  <strong className="text-slate-800">{fromPort} ⇌ {toPort}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Số người:</span>
                  <strong className="text-slate-800">{passengers} người</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tổng tiền ước tính:</span>
                  <strong className="text-brand-teal font-mono">{totalPrice.toLocaleString('vi-VN')} đ</strong>
                </div>
              </div>

              <p className="text-[11px] text-amber-700 bg-amber-50 rounded-xl p-3 border border-amber-200 leading-relaxed max-w-sm mx-auto">
                ⚠️ <strong>Lưu ý:</strong> Chuyên viên Phòng vé Tư Lai sẽ gửi tin nhắn Zalo kèm hướng dẫn thanh toán giữ chỗ 100% trong tối đa 5 phút. Vui lòng chú ý điện thoại.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStep('search');
                  setCustomerName('');
                  setCustomerPhone('');
                }}
                className="px-6 py-2.5 bg-brand-blue hover:bg-slate-800 text-white font-sans font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Đặt Thêm Chuyến Khác
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
