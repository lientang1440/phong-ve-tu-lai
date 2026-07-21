create extension if not exists pgcrypto;

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

insert into public.partners (id, name, logo_type, highlights, details, advantages, image_url)
values
  ('2f9f4e7f-f4a5-4c26-a6e8-7b969688b22d', 'Phú Quốc Express', 'Phú Quốc Express', 'Tàu hai thân hiện đại, trải nghiệm cao cấp.', 'Đội tàu hai thân đổi mới với khoang VIP sang trọng, ghế ngồi bọc da cao cấp rộng rãi, dịch vụ chuyên nghiệp chuẩn 5 sao. Chuyên phục vụ các tuyến Phú Quốc – Hà Tiên – Rạch Giá – Côn Đảo – Phú Quý – Lý Sơn', '["Tàu hai thân chống hiện đại", "Khoang VIP riêng biệt rộng rãi và yên tĩnh", "Đại lý ủy quyền chính thức, đặt vé trực tuyến", "Trang thiết bị an toàn "]', 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('34a4d7f5-57ac-442e-943f-7f6d4f5566bf', 'Superdong', 'Superdong', 'Hãng tàu cao tốc có lịch sử chạy lâu năm tại vùng biển Tây Nam', 'Hơn 20 năm kinh nghiệm phục vụ hành khách. Sở hữu đội tàu cao tốc một thân hiện đại, hoạt động  bền bỉ và đúng giờ trên các tuyến Rạch Giá – Phú Quốc, Nam Du, Thổ Chu, Côn Đảo.', '["Lịch trình đa dạng, linh hoạt", "Chất lượng phục vụ chuyên nghiệp", "Vận chuyển xe máy và hành lý khối lượng lớn", "Kinh nghiệm 20 năm vận hành an toàn vượt trội"]', 'https://images.pexels.com/photos/37729788/pexels-photo-37729788.jpeg?auto=compress&cs=tinysrgb&w=800')
on conflict (id) do nothing;
