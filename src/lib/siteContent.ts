import { supabase, isSupabaseConfigured } from './supabase';
import { POPULAR_ROUTES, OPERATOR_PARTNERS, DEPARTURES, BLOG_POSTS, FAQS } from '../data';
import type { Route, Departure, Partner, BlogPost, FAQ } from '../types';

export interface SiteContent {
  routes: Route[];
  departures: Departure[];
  partners: Partner[];
  blogPosts: BlogPost[];
  faqs: FAQ[];
}

export const defaultSiteContent: SiteContent = {
  routes: POPULAR_ROUTES,
  departures: DEPARTURES,
  partners: OPERATOR_PARTNERS,
  blogPosts: BLOG_POSTS,
  faqs: FAQS,
};

const fallbackContent = defaultSiteContent;

function parsePriceFromLabel(label: string): number {
  const match = label.match(/(\d{1,3}(\.\d{3})*)/);
  return match ? Number(match[1].replace(/\./g, '')) : 0;
}

function normalizePartners(raw: any[]): Partner[] {
  return raw.map((partner) => ({
    name: partner.name,
    logoType: partner.logo_type ?? partner.logoType ?? '',
    highlights: partner.highlights,
    details: partner.details,
    advantages: Array.isArray(partner.advantages) ? partner.advantages : [],
    imageUrl: partner.image_url ?? partner.imageUrl ?? '',
  }));
}

function normalizeBlogPosts(raw: any[]): BlogPost[] {
  return raw.map((post) => ({
    id: post.id,
    title: post.title,
    category: post.category,
    snippet: post.snippet,
    imageUrl: post.image_url ?? post.imageUrl ?? '',
    date: post.publish_date ?? post.date,
    readTime: post.read_time ?? post.readTime,
    content: post.content,
  }));
}

function normalizeFAQs(raw: any[]): FAQ[] {
  return raw.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
  }));
}

function normalizeRoutes(raw: any[]): Route[] {
  return raw.map((route: any) => ({
    id: route.id,
    from: route.from_port ?? route.from ?? '',
    to: route.to_port ?? route.to ?? '',
    price: Number(route.price ?? 0),
    image: route.image_url ?? route.image ?? '',
    badge: route.badge ?? undefined,
    description: route.description ?? undefined,
  }));
}

function normalizeDepartures(raw: any[]): Departure[] {
  return raw.map((departure: any) => {
    const priceLabel = departure.price_label ?? departure.priceLabel ?? '';

    return {
      id: departure.id,
      ferryLine:
        departure.ferry_operator ??
        departure.ferryLine ??
        departure.ferry_line ??
        '',
      routeFrom:
        departure.route_from ??
        departure.routeFrom ??
        '',
      routeTo:
        departure.route_to ??
        departure.routeTo ??
        '',
      time:
        departure.departure_time ??
        departure.time ??
        '',
      priceLabel,
      price: parsePriceFromLabel(priceLabel),
      status: 'Còn chỗ',
    };
  });
}

export async function fetchSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) {
    console.warn('Supabase chưa được cấu hình, đang dùng dữ liệu mặc định.');
    return fallbackContent;
  }

  try {
    const [routesRes, departuresRes, partnersRes, blogPostsRes, faqsRes] =
      await Promise.all([
        supabase.from('routes').select('*').eq('is_active', true),

        supabase
          .from('departures')
          .select(`
            id,
            ferry_operator,
            route_from,
            route_to,
            departure_time,
            price_label,
            is_active
          `)
          .eq('is_active', true),

        supabase.from('partners').select('*').eq('is_active', true),
        supabase.from('blog_posts').select('*').eq('is_active', true),
        supabase.from('faqs').select('*').eq('is_active', true),
      ]);

    if (routesRes.error) console.error('Lỗi bảng routes:', routesRes.error);
    if (departuresRes.error) console.error('Lỗi bảng departures:', departuresRes.error);
    if (partnersRes.error) console.error('Lỗi bảng partners:', partnersRes.error);
    if (blogPostsRes.error) console.error('Lỗi bảng blog_posts:', blogPostsRes.error);
    if (faqsRes.error) console.error('Lỗi bảng faqs:', faqsRes.error);

    const routes =
      routesRes.error || !Array.isArray(routesRes.data) || routesRes.data.length === 0
        ? fallbackContent.routes
        : normalizeRoutes(routesRes.data);

    const departures =
      departuresRes.error ||
      !Array.isArray(departuresRes.data) ||
      departuresRes.data.length === 0
        ? fallbackContent.departures
        : normalizeDepartures(departuresRes.data);

    const partners =
      partnersRes.error || !Array.isArray(partnersRes.data) || partnersRes.data.length === 0
        ? fallbackContent.partners
        : normalizePartners(partnersRes.data);

    const blogPosts =
      blogPostsRes.error ||
      !Array.isArray(blogPostsRes.data) ||
      blogPostsRes.data.length === 0
        ? fallbackContent.blogPosts
        : normalizeBlogPosts(blogPostsRes.data);

    const faqs =
      faqsRes.error || !Array.isArray(faqsRes.data) || faqsRes.data.length === 0
        ? fallbackContent.faqs
        : normalizeFAQs(faqsRes.data);

    return { routes, departures, partners, blogPosts, faqs };
  } catch (error) {
    console.error('Không thể tải dữ liệu Supabase:', error);
    return fallbackContent;
  }
}