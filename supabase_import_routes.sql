create extension if not exists pgcrypto;

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

insert into public.routes (id, slug, from_port, to_port, price, badge, image_url, description, is_active)
values
  ('6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'rach-gia-phu-quoc', 'Rạch Giá', 'Phú Quốc', 350000, 'Phổ biến', 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800', 'Hành trình tuyệt vời vượt vịnh Thái Lan đến Đảo Ngọc xanh mát.', true),
  ('1b6e80f5-6a95-4fd4-8b69-fbbfca4e8ad3', 'soc-trang-con-dao', 'Sóc Trăng', 'Côn Đảo', 310000, 'Mới', 'https://static-images.vnncdn.net/files/publish/2022/8/27/con-dao-396.jpg', 'Rút ngắn thời gian ra Côn Đảo thiêng liêng từ cảng Trần Đề.', true),
  ('f7db9a4f-17de-4ddb-bbf7-1d8f88faa4eb', 'rach-gia-nam-du', 'Rạch Giá', 'Nam Du', 230000, null, 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', 'Khám phá quần đảo hoang sơ tuyệt mỹ với những hòn đảo nhỏ kỳ vĩ.', true),
  ('c7bf8d34-2b39-4f27-9d18-8881aaa92b43', 'phu-quoc-tho-chu', 'Phú Quốc', 'Thổ Chu', 420000, null, 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Chuyến phiêu lưu đến hòn đảo tiền tiêu cực Nam đầy hoang sơ.', true)
on conflict (id) do nothing;
