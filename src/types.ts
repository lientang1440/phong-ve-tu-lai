export interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  image: string;
  badge?: string;
  description?: string;
}

export type FerryOperator = 'Phú Quốc Express' | 'Superdong';

export interface Departure {
  id: string;
  ferryLine: FerryOperator;
  routeFrom: string;
  routeTo: string;
  time: string;
  priceLabel: string;
  price?: number;
  status?: string;
}

export interface Partner {
  name: string;
  logoType: FerryOperator;
  highlights: string;
  details: string;
  advantages: string[];
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Khám phá' | 'Cẩm nang' | 'Ưu đãi';
  snippet: string;
  imageUrl: string;
  date: string;
  readTime: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'quy-tac' | 'hoi-dap' | 'chinh-sach' | 'ho-tro';
}

export interface BookingState {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
  passengers: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedDepartureId?: string;
  selectedReturnDepartureId?: string;
}
