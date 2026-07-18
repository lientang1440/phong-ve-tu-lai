create extension if not exists pgcrypto;

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('quy-tac', 'hoi-dap', 'chinh-sach', 'ho-tro')),
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.faqs (id, category, question, answer)
values
  ('0c4e6f6a-f226-4fb6-bb72-3c0b9ea07c53', 'quy-tac', 'Quy tắc đặt vé tàu trực tuyến thế nào?', 'Hành khách chọn điểm đi, điểm đến và lịch trình phù hợp trên website. Sau khi điền thông tin người đặt vé, bạn gửi yêu cầu đặt chỗ. Đội ngũ nhân viên Tư Lai sẽ lập tức kiểm tra chỗ trống, giữ chỗ trên hệ thống của hãng tàu Phú Quốc Express hoặc Superdong và liên hệ lại với quý khách qua điện thoại hoặc Zalo để hướng dẫn nhận vé điện tử nhanh chóng.'),
  ('d72e43dc-9319-44b6-b6c4-2b2f5e5df31d', 'quy-tac', 'Cần cung cấp thông tin gì khi mua vé tàu?', 'Theo quy định hải hải và quản lý cảng hàng hải Việt Nam, khi mua vé tàu cao tốc hành khách bắt buộc cung cấp: Họ tên đầy đủ, Số CCCD/Hộ chiếu/Ngày sinh của từng hành khách ngồi trên tàu để đăng ký bảo hiểm vận tải quốc gia.'),
  ('5c0bb38d-8c42-4f12-a5c7-fd59617f4b41', 'hoi-dap', 'Trẻ em và người cao tuổi có được giảm giá vé không?', 'Có. Theo chính sách chung của các hãng tàu cao tốc Phú Quốc Express và Superdong, trẻ em dưới 6 tuổi (ngoài vé ngồi riêng ngồi cùng cha mẹ) được miễn phí vé. Trẻ em từ 6 đến 11 tuổi được áp dụng giá vé trẻ em (tiết kiệm đến 20-30%). Người cao tuổi (trên 60 tuổi, mang quốc tịch Việt Nam) được hưởng mức chiết khấu giá vé ưu đãi dành cho người lớn tuổi.'),
  ('a37c8a08-71a5-4e86-a95c-fe731d1a5d4b', 'hoi-dap', 'Tôi có thể đem theo xe máy hay thú cưng lên tàu không?', 'Được. Superdong hỗ trợ chở các loại xe máy và xe số tay ga đi Phú Quốc, Nam Du. Bạn nên đăng ký trước ít nhất 1 ngày do diện tích sàn giữ xe đuôi tàu có hạn. Với thú cưng, bạn cần chuẩn bị lồng xách chuyên dụng hoặc dây xích rọ mõm để giữ an toàn trật tự trong khoang chung.'),
  ('3f1e98e5-1fe8-489f-a7f7-5f2ffa69b5dc', 'chinh-sach', 'Quy định hoàn hủy hoặc đổi vé tàu thế nào?', 'Bạn được hỗ trợ đổi ngày đi hoặc hoàn trả vé. Việc hủy đổi vé cần báo trước tối thiểu 24 giờ so với giờ tàu khởi hành. Tùy theo chính sách hãng tàu và thời gian thông báo, phí hủy đổi vé có thể dao động từ 10% đến 20% giá trị vé.'),
  ('94c4e68d-1ca2-47f7-bf23-f25ca98c5ec5', 'chinh-sach', 'Nếu thời tiết xấu tàu không chạy được thì xử lý sao?', 'Trong các trường hợp bất khả kháng do thời tiết xấu (bão biển dập dềnh cực lớn, gió giật trên cấp 6 khiến Cảng vụ hàng hải cấm cảng), các hãng tàu sẽ chủ động hủy chuyến. Phòng vé Tư Lai sẽ hỗ trợ khách chuyển đổi giờ chạy miễn phí sang ngày hôm sau hoặc hoàn tiền 100% giá vé cho khách hàng.'),
  ('b8f7f1eb-83b0-4d47-b0b2-a80c15fd7d86', 'ho-tro', 'Tôi muốn lấy hóa đơn đỏ GTGT thì làm sao?', 'Phòng vé Tư Lai hỗ trợ xuất hóa đơn điện tử VAT (GTGT) trực tiếp cho các công ty doanh nghiệp làm tour du lịch, teambuilding. Quý khách vui lòng cung cấp thông tin MST và tên Đơn vị ngay khi chuyển khoản mua vé.'),
  ('9b0e6f3f-64f2-41b7-b086-34d17ec4fbd7', 'ho-tro', 'Thời gian hỗ trợ của phòng vé ra sao?', 'Cửa hàng Phòng vé Tư Lai hoạt động liên tục từ 06:00 sáng đến 21:00 tối hàng ngày. Hotline hỗ trợ khẩn cấp hoạt động 24/7 để phục vụ hành khách trước khi ra cảng biển làm thủ tục boarding.')
on conflict (id) do nothing;
