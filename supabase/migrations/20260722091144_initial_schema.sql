-- Clean Supabase schema + seed data for Phòng vé Tư Lai
-- Run this file once in Supabase SQL Editor.
-- This script uses the UUID-based production schema only.
-- Do NOT run the old legacy import/sync files that use text IDs, image or ferry_line.
-- departures stores route_from and route_to directly; it does not reference routes.

begin;

create extension if not exists pgcrypto;

-- =========================================================
-- 1. TABLES
-- =========================================================

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  from_port text not null,
  to_port text not null,
  price integer not null check (price >= 0),
  badge text,
  image_url text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.departures (
  id uuid primary key default gen_random_uuid(),
  route_from text not null,
  route_to text not null,
  ferry_operator text not null
    check (ferry_operator in ('Phú Quốc Express', 'Superdong')),
  departure_time text not null,
  price_label text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo_type text not null,
  highlights text not null,
  details text not null,
  advantages jsonb not null default '[]'::jsonb,
  image_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null
    check (category in ('Khám phá', 'Cẩm nang', 'Ưu đãi')),
  snippet text not null,
  image_url text not null,
  publish_date text not null,
  read_time text not null,
  content text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null
    check (category in ('quy-tac', 'hoi-dap', 'chinh-sach', 'ho-tro')),
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 2. INDEXES
-- =========================================================

create index if not exists idx_routes_from_to
  on public.routes(from_port, to_port);

create index if not exists idx_departures_route_ports
  on public.departures(route_from, route_to);

create index if not exists idx_departures_time
  on public.departures(departure_time);

create index if not exists idx_blog_category
  on public.blog_posts(category);

create index if not exists idx_faq_category
  on public.faqs(category);

-- =========================================================
-- 3. ROUTES
-- =========================================================

insert into public.routes (
  id, slug, from_port, to_port, price, badge,
  image_url, description, is_active
)
values
  (
    '6e453953-8d5f-489b-b596-8a0c8f1a1e1f',
    'rach-gia-phu-quoc',
    'Rạch Giá',
    'Phú Quốc',
    315000,
    'Phổ biến',
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Hành trình tuyệt vời vượt vịnh Thái Lan đến Đảo Ngọc xanh mát.',
    true
  ),
  (
    '1b6e80f5-6a95-4fd4-8b69-fbbfca4e8ad3',
    'soc-trang-con-dao',
    'Sóc Trăng',
    'Côn Đảo',
    363273,
    'Mới',
    'https://static-images.vnncdn.net/files/publish/2022/8/27/con-dao-396.jpg',
    'Rút ngắn thời gian ra Côn Đảo thiêng liêng từ cảng Trần Đề.',
    true
  ),
  (
    'f7db9a4f-17de-4ddb-bbf7-1d8f88faa4eb',
    'rach-gia-nam-du',
    'Rạch Giá',
    'Nam Du',
    245455,
    null,
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Khám phá quần đảo hoang sơ tuyệt mỹ với những hòn đảo nhỏ kỳ vĩ.',
    true
  ),
  (
    'c7bf8d34-2b39-4f27-9d18-8881aaa92b43',
    'phu-quoc-tho-chu',
    'Phú Quốc',
    'Thổ Chu',
    324000,
    null,
    'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Chuyến phiêu lưu đến hòn đảo tiền tiêu cực Nam đầy hoang sơ.',
    true
  )
on conflict (id) do update
set
  slug = excluded.slug,
  from_port = excluded.from_port,
  to_port = excluded.to_port,
  price = excluded.price,
  badge = excluded.badge,
  image_url = excluded.image_url,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- 4. DEPARTURES
-- =========================================================

insert into public.departures (
  id, route_from, route_to, ferry_operator, departure_time, price_label, is_active
)
values
  ('9d400f3d-f7a3-4f29-92d8-0d4c6dc6f4a6', 'Rạch Giá', 'Phú Quốc', 'Superdong', '07:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('ebade7c5-0a51-4836-90aa-6d1f446d8fa3', 'Rạch Giá', 'Phú Quốc', 'Superdong', '10:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('84f48d9a-2b4b-43c5-a5f3-e0f4d2414913', 'Rạch Giá', 'Phú Quốc', 'Superdong', '12:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('ba9ad02d-bdb2-4c3c-8935-6cc5b19198f8', 'Rạch Giá', 'Phú Quốc', 'Superdong', '13:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('f08fe4d8-c71d-4f37-b7ab-7e7486f3c68b', 'Rạch Giá', 'Phú Quốc', 'Phú Quốc Express', '07:10', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND', true),
  ('866c22cb-9c47-48cd-9b41-1f672b4a96ac', 'Rạch Giá', 'Phú Quốc', 'Phú Quốc Express', '08:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND', true),
  ('76f4c416-1db4-4a6d-8a5f-f3d8149d6d3c', 'Rạch Giá', 'Phú Quốc', 'Phú Quốc Express', '10:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND', true),
  ('6d1b22d5-6cf4-4bf0-9d91-2d7a67d154f5', 'Rạch Giá', 'Phú Quốc', 'Phú Quốc Express', '13:20', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND', true),
  ('a5c99740-fbb2-4864-b195-1f2c230b9530', 'Rạch Giá', 'Phú Quốc', 'Superdong', '07:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('d5146a7f-b2dd-46f2-ac91-93ef1d171eb0', 'Rạch Giá', 'Phú Quốc', 'Superdong', '07:55', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('e9bf6d03-5ef6-4cf1-8341-716d0d9654ee', 'Rạch Giá', 'Phú Quốc', 'Superdong', '10:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true),
  ('46f474f8-f5d9-44b8-b1e7-62c817b6c9f5', 'Rạch Giá', 'Phú Quốc', 'Superdong', '13:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND', true)
on conflict (id) do update
set
  route_from = excluded.route_from,
  route_to = excluded.route_to,
  ferry_operator = excluded.ferry_operator,
  departure_time = excluded.departure_time,
  price_label = excluded.price_label,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- 5. PARTNERS
-- =========================================================

insert into public.partners (
  id, name, logo_type, highlights, details, advantages, image_url, is_active
)
values
  (
    '2f9f4e7f-f4a5-4c26-a6e8-7b969688b22d',
    'Phú Quốc Express',
    'Phú Quốc Express',
    'Tàu hai thân hiện đại, trải nghiệm cao cấp.',
    'Đội tàu hai thân đổi mới với khoang VIP sang trọng, ghế ngồi bọc da cao cấp rộng rãi, dịch vụ chuyên nghiệp chuẩn 5 sao. Chuyên phục vụ các tuyến Phú Quốc – Hà Tiên – Rạch Giá – Côn Đảo – Phú Quý – Lý Sơn',
    '["Tàu hai thân hiện đại", "Khoang VIP riêng biệt rộng rãi và yên tĩnh", "Đại lý ủy quyền chính thức, đặt vé trực tuyến", "Trang thiết bị an toàn"]'::jsonb,
    'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  ),
  (
    '34a4d7f5-57ac-442e-943f-7f6d4f5566bf',
    'Superdong',
    'Superdong',
    'Hãng tàu cao tốc có lịch sử chạy lâu năm tại vùng biển Tây Nam',
    'Hơn 20 năm kinh nghiệm phục vụ hành khách. Sở hữu đội tàu cao tốc một thân hiện đại, hoạt động bền bỉ và đúng giờ trên các tuyến Rạch Giá – Phú Quốc, Nam Du, Thổ Chu, Côn Đảo.',
    '["Lịch trình đa dạng, linh hoạt", "Chất lượng phục vụ chuyên nghiệp", "Vận chuyển xe máy và hành lý khối lượng lớn", "Kinh nghiệm 20 năm vận hành an toàn vượt trội"]'::jsonb,
    'https://images.pexels.com/photos/37729788/pexels-photo-37729788.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  )
on conflict (id) do update
set
  name = excluded.name,
  logo_type = excluded.logo_type,
  highlights = excluded.highlights,
  details = excluded.details,
  advantages = excluded.advantages,
  image_url = excluded.image_url,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- 6. BLOG POSTS
-- =========================================================

insert into public.blog_posts (
  id, slug, title, category, snippet, image_url,
  publish_date, read_time, content, is_active
)
values
  (
    '5f358a3d-fd66-4da0-b4d6-3ac42b2ea643',
    'kham-pha-3-bai-bien-phu-quoc',
    'Khám phá 3 bãi biển đẹp nhất Phú Quốc',
    'Khám phá',
    'Từ Bãi Sao trắng mịn đến Bãi Dài yên tĩnh hay Bãi Ông Lang, Phú Quốc có những bãi biển tuyệt vời đang chờ bạn khám phá.',
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    '15/06/2026',
    '4 phút đọc',
    E'Phú Quốc luôn giữ vững sức hút của một "Đảo Ngọc" tinh khôi. Khi đặt chân tới đây bằng các hãng tàu cao tốc hiện đại của phòng vé Tư Lai, đừng bỏ qua 3 bãi biển tuyệt diệu này:\n\n1. **Bãi Sao**: Nổi tiếng nhờ những bờ cát trắng tinh mịn màng như kem cùng hàng dừa nghiêng bóng soi mình xuống làn nước trong xanh như pha lê. Đây là tọa độ "sống ảo" hot nhất đảo.\n\n2. **Bãi Dài**: Trải rộng ở phía Bắc đảo với không gian yên tĩnh và giữ nguyên vẻ hoang sơ kỳ vĩ. Làn gió nhẹ mát từ những rừng cây sát biển đem lại cảm giác dã ngoại tuyệt vời.\n\n3. **Bãi Ông Lang**: Điểm ngắm hoàng hôn ráng vàng thơ mộng nhất Phú Quốc. Những dải đá rêu bục cát cùng những ngọn sóng êm đềm tạo ra nét quyến rũ đặc biệt.\n\nĐặt vé tàu cao tốc cùng Phòng vé Tư Lai để đi ngay thôi!',
    true
  ),
  (
    'df843e58-d630-4501-b41e-77c171c1e52e',
    'huong-dan-di-tau-cao-toc-lan-dau',
    'Hướng dẫn đi tàu cao tốc lần đầu',
    'Cẩm nang',
    'Những lưu ý quan trọng khi đi tàu cao tốc lần đầu tiên, từ cách chuẩn bị giấy tờ, phòng tránh say sóng đến thời gian cần ra cảng.',
    'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800',
    '10/06/2026',
    '6 phút đọc',
    E'Khởi hành trên những hành trình đi tàu biển cao tốc luôn là trải nghiệm đầy thú vị nhưng có thể gây lo sợ nếu bạn chưa chuẩn bị sẵn sàng. Dưới đây là cuốn cẩm nang toàn diện của phòng vé Tư Lai để bạn yên tâm tuyệt đối:\n\n- **Mang đầy đủ giấy tờ**: Bạn nhất định phải đem theo CCCD, Hộ chiếu hoặc Giấy phép lái xe gốc hành khách để làm thủ tục lên tàu.\n- **Thời gian ra cảng**: Nên có mặt trước giờ chạy tối thiểu 45 phút. Điều này đảm bảo bạn lấy vé vật lý hoặc xuất trình vé điện tử thuận lợi và không bị trễ chuyến tàu.\n- **Bảo vệ sức khỏe chống say sóng**: Nếu bạn dễ bị say sóng, hãy ưu tiên chọn đi tàu hai thân của Phú Quốc Express và uống thuốc chống say trước lúc chạy 30 phút. Tránh đọc sách hoặc dùng điện thoại khi tàu đang di chuyển.\n\nBộ phận CSKH Phòng vé Tư Lai luôn hỗ trợ trực 24/7 để trả lời mọi băn khoăn của quý khách trước giờ tàu khởi hành!',
    true
  ),
  (
    'fb75084e-a23d-4600-bbd8-2d4633c70c16',
    'diem-dung-chan-ly-tuong-tai-con-dao',
    'Điểm dừng chân lý tưởng tại Côn Đảo',
    'Khám phá',
    'Từ nhà tù lịch sử linh thiêng đến những rặng san hô tuyệt mỹ tại hòn Bảy Cạnh, Côn Đảo luôn mang vẻ đẹp bình lặng khó tả.',
    'https://images.pexels.com/photos/7909254/pexels-photo-7909254.jpeg?auto=compress&cs=tinysrgb&w=800',
    '02/06/2026',
    '5 phút đọc',
    E'Côn Đảo không chỉ là điểm du lịch tâm linh nổi tiếng hàng đầu Tổ quốc mà còn sở hữu hệ sinh thái rừng, núi và biển trù phú.\n\n- **Viếng nghĩa trang Hàng Dương**: Bày tỏ lòng tri ân với các anh hùng liệt sĩ.\n- **Hòn Bảy Cạnh**: Trải nghiệm xem rùa đẻ trứng và lặn ngắm san hô tự nhiên.\n- **Bãi Nhát**: Bãi biển đẹp với làn nước trong xanh và không gian yên bình.\n\nTuyến tàu cao tốc từ Sóc Trăng đi Côn Đảo giúp hành trình đến miền đất lịch sử này thuận tiện hơn.',
    true
  )
on conflict (id) do update
set
  slug = excluded.slug,
  title = excluded.title,
  category = excluded.category,
  snippet = excluded.snippet,
  image_url = excluded.image_url,
  publish_date = excluded.publish_date,
  read_time = excluded.read_time,
  content = excluded.content,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- 7. FAQS
-- =========================================================

insert into public.faqs (
  id, category, question, answer, is_active
)
values
  ('0c4e6f6a-f226-4fb6-bb72-3c0b9ea07c53', 'quy-tac', 'Quy tắc đặt vé tàu trực tuyến thế nào?', 'Hành khách chọn điểm đi, điểm đến và lịch trình phù hợp trên website. Sau khi điền thông tin người đặt vé, bạn gửi yêu cầu đặt chỗ. Đội ngũ nhân viên Tư Lai sẽ kiểm tra chỗ trống, giữ chỗ trên hệ thống của hãng tàu và liên hệ lại qua điện thoại hoặc Zalo để hướng dẫn nhận vé điện tử.', true),
  ('d72e43dc-9319-44b6-b6c4-2b2f5e5df31d', 'quy-tac', 'Cần cung cấp thông tin gì khi mua vé tàu?', 'Khi mua vé tàu cao tốc, hành khách cần cung cấp họ tên đầy đủ, số CCCD hoặc hộ chiếu và ngày sinh của từng hành khách để làm thủ tục và đăng ký bảo hiểm vận tải.', true),
  ('5c0bb38d-8c42-4f12-a5c7-fd59617f4b41', 'hoi-dap', 'Trẻ em và người cao tuổi có được giảm giá vé không?', 'Có. Mức giá ưu đãi phụ thuộc vào chính sách của từng hãng tàu và từng tuyến. Khách hàng nên cung cấp đúng độ tuổi và giấy tờ hợp lệ khi đặt vé.', true),
  ('a37c8a08-71a5-4e86-a95c-fe731d1a5d4b', 'hoi-dap', 'Tôi có thể đem theo xe máy hay thú cưng lên tàu không?', 'Một số chuyến của Superdong có hỗ trợ vận chuyển xe máy. Khách nên đăng ký trước vì diện tích có hạn. Với thú cưng, cần chuẩn bị lồng vận chuyển hoặc dụng cụ bảo đảm an toàn theo hướng dẫn của hãng tàu.', true),
  ('3f1e98e5-1fe8-489f-a7f7-5f2ffa69b5dc', 'chinh-sach', 'Quy định hoàn hủy hoặc đổi vé tàu thế nào?', 'Việc đổi hoặc hoàn vé phụ thuộc vào chính sách của hãng tàu và thời điểm thông báo. Khách hàng nên liên hệ phòng vé sớm để được kiểm tra mức phí và điều kiện áp dụng.', true),
  ('94c4e68d-1ca2-47f7-bf23-f25ca98c5ec5', 'chinh-sach', 'Nếu thời tiết xấu tàu không chạy được thì xử lý sao?', 'Khi chuyến tàu bị hủy do thời tiết hoặc quyết định của Cảng vụ, phòng vé sẽ hỗ trợ đổi sang chuyến phù hợp hoặc xử lý hoàn tiền theo chính sách của hãng tàu.', true),
  ('b8f7f1eb-83b0-4d47-b0b2-a80c15fd7d86', 'ho-tro', 'Tôi muốn lấy hóa đơn đỏ GTGT thì làm sao?', 'Quý khách vui lòng cung cấp mã số thuế, tên đơn vị, địa chỉ và email nhận hóa đơn ngay khi đặt vé hoặc chuyển khoản.', true),
  ('9b0e6f3f-64f2-41b7-b086-34d17ec4fbd7', 'ho-tro', 'Thời gian hỗ trợ của phòng vé ra sao?', 'Phòng vé hỗ trợ khách hàng hằng ngày. Trong trường hợp cần hỗ trợ khẩn cấp trước giờ khởi hành, quý khách vui lòng liên hệ hotline được hiển thị trên website.', true)
on conflict (id) do update
set
  category = excluded.category,
  question = excluded.question,
  answer = excluded.answer,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- 8. RLS + PUBLIC READ POLICIES
-- =========================================================

alter table public.routes enable row level security;
alter table public.departures enable row level security;
alter table public.partners enable row level security;
alter table public.blog_posts enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "Public can read routes" on public.routes;
drop policy if exists "Public can read departures" on public.departures;
drop policy if exists "Public can read partners" on public.partners;
drop policy if exists "Public can read blog_posts" on public.blog_posts;
drop policy if exists "Public can read faqs" on public.faqs;

create policy "Public can read routes"
on public.routes
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read departures"
on public.departures
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read partners"
on public.partners
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read blog_posts"
on public.blog_posts
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read faqs"
on public.faqs
for select
to anon, authenticated
using (is_active = true);

commit;