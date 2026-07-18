create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('Khám phá', 'Cẩm nang', 'Ưu đãi')),
  snippet text not null,
  image_url text not null,
  publish_date text not null,
  read_time text not null,
  content text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.blog_posts (id, slug, title, category, snippet, image_url, publish_date, read_time, content)
values
  ('5f358a3d-fd66-4da0-b4d6-3ac42b2ea643', 'kham-pha-3-bai-bien-phu-quoc', 'Khám phá 3 bãi biển đẹp nhất Phú Quốc', 'Khám phá', 'Từ Bãi Sao trắng mịn đến Bãi Dài yên tĩnh hay Bãi Ông Lang, Phú Quốc có những bãi biển tuyệt vời đang chờ bạn khám phá.', 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800', '15/06/2026', '4 phút đọc', 'Phú Quốc luôn giữ vững sức hút của một "Đảo Ngọc" tinh khôi. Khi đặt chân tới đây bằng các hãng tàu cao tốc hiện đại của phòng vé Tư Lai, đừng bỏ qua 3 bãi biển tuyệt diệu này:\n\n1. **Bãi Sao**: ...'),
  ('df843e58-d630-4501-b41e-77c171c1e52e', 'huong-dan-di-tau-cao-toc-lan-dau', 'Hướng dẫn đi tàu cao tốc lần đầu', 'Cẩm nang', 'Những lưu ý quan trọng khi đi tàu cao tốc lần đầu tiên, từ cách chuẩn bị giấy tờ, phòng tránh say sóng đến thời gian cần ra cảng.', 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800', '10/06/2026', '6 phút đọc', 'Khởi hành trên những hành trình đi tàu biển cao tốc luôn là trải nghiệm đầy thú vị nhưng có thể gây lo sợ nếu bạn chưa chuẩn bị sẵn sàng. Dưới đây là cuốn cẩm nang toàn diện của phòng vé Tư Lai để bạn yên tâm tuyệt đối:'),
  ('fb75084e-a23d-4600-bbd8-2d4633c70c16', 'diem-dung-chan-ly-tuong-tai-con-dao', 'Điểm dừng chân lý tưởng tại Côn Đảo', 'Khám phá', 'Từ nhà tù lịch sử linh thiêng đến những rặng san hô tuyệt mỹ tại hòn Bảy Cạnh, Côn Đảo luôn mang vẻ đẹp bình lặng khó tả.', 'https://images.pexels.com/photos/7909254/pexels-photo-7909254.jpeg?auto=compress&cs=tinysrgb&w=800', '02/06/2026', '5 phút đọc', 'Côn Đảo không chỉ là điểm du lịch tâm linh nổi tiếng hàng đầu Tổ Quốc mà còn sở hữu hệ sinh thái rừng núi biển trù phú ít nơi có được.')
on conflict (id) do nothing;
