-- Supabase import file for current web data
-- Compatible with PostgreSQL / Supabase SQL editor

create table if not exists public.routes (
  id text primary key,
  from_port text not null,
  to_port text not null,
  price integer not null,
  badge text,
  image text not null,
  description text
);

create table if not exists public.departures (
  id text primary key,
  ferry_line text not null,
  route_from text not null,
  route_to text not null,
  departure_time text not null,
  price_label text not null
);

create table if not exists public.partners (
  id text primary key,
  name text not null,
  logo_type text not null,
  highlights text not null,
  details text not null,
  advantages jsonb not null default '[]'::jsonb,
  image_url text not null
);

create table if not exists public.blog_posts (
  id text primary key,
  title text not null,
  category text not null,
  snippet text not null,
  image_url text not null,
  publish_date text not null,
  read_time text not null,
  content text not null
);

create table if not exists public.faqs (
  id text primary key,
  category text not null,
  question text not null,
  answer text not null
);

insert into public.routes (id, from_port, to_port, price, badge, image, description)
values
  ('rg-pq', 'Rạch Giá', 'Phú Quốc', 350000, 'Phổ biến', 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800', 'Hành trình tuyệt vời vượt vịnh Thái Lan đến Đảo Ngọc xanh mát.'),
  ('st-cd', 'Sóc Trăng', 'Côn Đảo', 310000, 'Mới', 'https://static-images.vnncdn.net/files/publish/2022/8/27/con-dao-396.jpg', 'Rút ngắn thời gian ra Côn Đảo thiêng liêng từ cảng Trần Đề.'),
  ('rg-nd', 'Rạch Giá', 'Nam Du', 230000, null, 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', 'Khám phá quần đảo hoang sơ tuyệt mỹ với những hòn đảo nhỏ kỳ vĩ.'),
  ('pq-tc', 'Phú Quốc', 'Thổ Chu', 420000, null, 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Chuyến phiêu lưu đến hòn đảo tiền tiêu cực Nam đầy hoang sơ.')
on conflict (id) do nothing;

insert into public.departures (id, ferry_line, route_from, route_to, departure_time, price_label)
values
  ('dep-1', 'Superdong', 'Phú Quốc', 'Rạch Giá', '07:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-2', 'Superdong', 'Phú Quốc', 'Rạch Giá', '10:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-3', 'Superdong', 'Phú Quốc', 'Rạch Giá', '12:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-4', 'Superdong', 'Phú Quốc', 'Rạch Giá', '13:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-5', 'Phú Quốc Express', 'Phú Quốc', 'Rạch Giá', '07:10', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-6', 'Phú Quốc Express', 'Phú Quốc', 'Rạch Giá', '08:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-7', 'Phú Quốc Express', 'Phú Quốc', 'Rạch Giá', '10:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-8', 'Phú Quốc Express', 'Phú Quốc', 'Rạch Giá', '13:20', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-9', 'Superdong', 'Rạch Giá', 'Phú Quốc', '07:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-10', 'Superdong', 'Rạch Giá', 'Phú Quốc', '07:55', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-11', 'Superdong', 'Rạch Giá', 'Phú Quốc', '10:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-12', 'Superdong', 'Rạch Giá', 'Phú Quốc', '13:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('dep-13', 'Phú Quốc Express', 'Rạch Giá', 'Phú Quốc', '07:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-14', 'Phú Quốc Express', 'Rạch Giá', 'Phú Quốc', '10:20', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-15', 'Phú Quốc Express', 'Rạch Giá', 'Phú Quốc', '12:10', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-16', 'Phú Quốc Express', 'Rạch Giá', 'Phú Quốc', '13:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('dep-17', 'Superdong', 'Phú Quốc', 'Hà Tiên', '06:30', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-18', 'Superdong', 'Phú Quốc', 'Hà Tiên', '08:10', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-19', 'Superdong', 'Phú Quốc', 'Hà Tiên', '10:20', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-20', 'Superdong', 'Phú Quốc', 'Hà Tiên', '13:30', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-21', 'Superdong', 'Phú Quốc', 'Hà Tiên', '14:30', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-22', 'Phú Quốc Express', 'Phú Quốc', 'Hà Tiên', '07:00', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-23', 'Phú Quốc Express', 'Phú Quốc', 'Hà Tiên', '09:00', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-24', 'Phú Quốc Express', 'Phú Quốc', 'Hà Tiên', '11:45', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-25', 'Phú Quốc Express', 'Phú Quốc', 'Hà Tiên', '14:00', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-26', 'Superdong', 'Hà Tiên', 'Phú Quốc', '06:10', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-27', 'Superdong', 'Hà Tiên', 'Phú Quốc', '08:20', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-28', 'Superdong', 'Hà Tiên', 'Phú Quốc', '10:00', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-29', 'Superdong', 'Hà Tiên', 'Phú Quốc', '12:15', 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND'),
  ('dep-30', 'Phú Quốc Express', 'Hà Tiên', 'Phú Quốc', '07:00', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-31', 'Phú Quốc Express', 'Hà Tiên', 'Phú Quốc', '09:00', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-32', 'Phú Quốc Express', 'Hà Tiên', 'Phú Quốc', '11:45', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND'),
  ('dep-33', 'Phú Quốc Express', 'Hà Tiên', 'Phú Quốc', '13:45', 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND')
on conflict (id) do nothing;

insert into public.partners (id, name, logo_type, highlights, details, advantages, image_url)
values
  ('partner-1', 'Phú Quốc Express', 'Phú Quốc Express', 'Tàu hai thân hiện đại, trải nghiệm cao cấp.', 'Đội tàu hai thân đổi mới với khoang VIP sang trọng, ghế ngồi bọc da cao cấp rộng rãi, dịch vụ chuyên nghiệp chuẩn 5 sao. Chuyên phục vụ các tuyến Phú Quốc – Hà Tiên – Rạch Giá – Nam Du.', '["Tàu hai thân chống say sóng tối đa", "Khoang VIP riêng biệt rộng rãi và yên tĩnh", "Đại lý ủy quyền chính thức phát vé trực tuyến", "Trang thiết bị an toàn đạt chuẩn quốc tế"]', 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('partner-2', 'Superdong', 'Superdong', 'Hãng tàu cao tốc hàng đầu vùng biển Tây Nam.', 'Hơn 25 năm kinh nghiệm phục vụ hành khách. Sở hữu đội tàu cao tốc một thân hiện đại, hoạt động cực kỳ bền bỉ và đúng giờ trên các tuyến Rạch Giá – Phú Quốc, Nam Du, Thổ Chu, Côn Đảo.', '["Lịch chạy dày đặc nhất trong ngày", "Giá vé thông dụng tiết kiệm hàng đầu", "Vận chuyển xe máy và hành lý khối lượng lớn", "Kinh nghiệm 25 năm vận hành an toàn vượt trội"]', 'https://images.pexels.com/photos/37729788/pexels-photo-37729788.jpeg?auto=compress&cs=tinysrgb&w=800')
on conflict (id) do nothing;

insert into public.blog_posts (id, title, category, snippet, image_url, publish_date, read_time, content)
values
  ('blog-1', 'Khám phá 3 bãi biển đẹp nhất Phú Quốc', 'Khám phá', 'Từ Bãi Sao trắng mịn đến Bãi Dài yên tĩnh hay Bãi Ông Lang, Phú Quốc có những bãi biển tuyệt vời đang chờ bạn khám phá.', 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800', '15/06/2026', '4 phút đọc', 'Phú Quốc luôn giữ vững sức hút của một "Đảo Ngọc" tinh khôi. Khi đặt chân tới đây bằng các hãng tàu cao tốc hiện đại của phòng vé Tư Lai, đừng bỏ qua 3 bãi biển tuyệt diệu này:\n\n1. **Bãi Sao**: Nổi tiếng nhờ những bờ cát trắng tinh mịn màng như kem cùng hàng dừa nghiêng bóng soi mình xuống làn nước trong xanh như pha lê. Đây là tọa độ "sống ảo" hot nhất đảo.\n\n2. **Bãi Dài**: Trải rộng ở phía Bắc đảo với không gian yên tĩnh và giữ nguyên vẻ hoang sơ kỳ vĩ. Làn gió nhẹ mát từ những rừng cây sát biển đem lại cảm giác dã ngoại tuyệt vời.\n\n3. **Bãi Ông Lang**: Điểm ngắm hoàng hôn ráng vàng thơ mộng nhất Phú Quốc. Những dải đá rêu bục cát cùng những ngọn sóng êm đềm tạo ra nét quyến rũ đặc biệt.\n\nĐặt vé tàu cao tốc cùng Phòng vé Tư Lai để đi ngay thôi!'),
  ('blog-2', 'Hướng dẫn đi tàu cao tốc lần đầu', 'Cẩm nang', 'Những lưu ý quan trọng khi đi tàu cao tốc lần đầu tiên, từ cách chuẩn bị giấy tờ, phòng tránh say sóng đến thời gian cần ra cảng.', 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800', '10/06/2026', '6 phút đọc', 'Khởi hành trên những hành trình đi tàu biển cao tốc luôn là trải nghiệm đầy thú vị nhưng có thể gây lo sợ nếu bạn chưa chuẩn bị sẵn sàng. Dưới đây là cuốn cẩm nang toàn diện của phòng vé Tư Lai để bạn yên tâm tuyệt đối:\n\n- **Mang đầy đủ giấy tờ**: Bạn nhất định phải đem theo CCCD, Hộ chiếu hoặc Giấy phép lái xe gốc hành khách để làm thủ tục lên tàu.\n- **Thời gian ra cảng**: Nên có mặt trước giờ chạy tối thiểu 45 phút. Điều này đảm bảo bạn lấy vé vật lý hoặc xuất trình vé điện tử thuận lợi và không bị trễ nốt tàu.\n- **Bảo vệ sức khỏe chống say sóng**: Nếu bạn dễ bị say sóng, hãy ưu tiên chọn đi tàu hai thân độ dốc phẳng của Phú Quốc Express và uống thuốc chống say trước lúc chạy 30 phút. Tránh đọc sách điện thoại khi tàu đang lướt sóng nhé.\n\nBộ phận CSKH Phòng vé Tư Lai luôn hỗ trợ trực 24/7 để trả lời mọi băn khoăn của quý khách trước giờ tàu khởi hành!'),
  ('blog-3', 'Điểm dừng chân lý tưởng tại Côn Đảo', 'Khám phá', 'Từ nhà tù lịch sử linh thiêng đến những rặng san hô tuyệt mỹ tại hòn Bảy Cạnh, Côn Đảo luôn mang vẻ đẹp bình lặng khó tả.', 'https://images.pexels.com/photos/7909254/pexels-photo-7909254.jpeg?auto=compress&cs=tinysrgb&w=800', '02/06/2026', '5 phút đọc', 'Côn Đảo không chỉ là điểm du lịch tâm linh nổi tiếng hàng đầu Tổ Quốc mà còn sở hữu hệ sinh thái rừng núi biển trù phú ít nơi có được.\n\n- **Viếng nghĩa trang Hàng Dương**: Tấm lòng tri ân sâu sắc hướng tới vị nữ anh hùng Võ Thị Sáu linh thiêng trước làn trầm ấm rực rỡ buổi đêm.\n- **Hòn Bảy Cạnh**: Trải nghiệm xem rùa đẻ trứng ban đêm vô cùng quý hiếm và bơi lặn xem rạn san hô tự nhiên đa sắc màu lấp lánh dưới đáy nước.\n- **Bãi Nhát**: Bãi biển tuyệt đẹp dốc thoai thoải phơi mình bồng bềnh biến mất vào dòng nước xanh khi thủy triều dâng.\n\nTuyến tàu cao tốc từ Sóc Trăng đi Côn Đảo khởi hành hàng ngày giúp hành trình về miền đất hào hùng cực dễ dàng!')
on conflict (id) do nothing;

insert into public.faqs (id, category, question, answer)
values
  ('faq-1', 'quy-tac', 'Quy tắc đặt vé tàu trực tuyến thế nào?', 'Hành khách chọn điểm đi, điểm đến và lịch trình phù hợp trên website. Sau khi điền thông tin người đặt vé, bạn gửi yêu cầu đặt chỗ. Đội ngũ nhân viên Tư Lai sẽ lập tức kiểm tra chỗ trống, giữ chỗ trên hệ thống của hãng tàu Phú Quốc Express hoặc Superdong và liên hệ lại với quý khách qua điện thoại hoặc Zalo để hướng dẫn nhận vé điện tử nhanh chóng.'),
  ('faq-2', 'quy-tac', 'Cần cung cấp thông tin gì khi mua vé tàu?', 'Theo quy định hải hải và quản lý cảng hàng hải Việt Nam, khi mua vé tàu cao tốc hành khách bắt buộc cung cấp: Họ tên đầy đủ, Số CCCD/Hộ chiếu/Ngày sinh của từng hành khách ngồi trên tàu để đăng ký bảo hiểm vận tải quốc gia.'),
  ('faq-3', 'hoi-dap', 'Trẻ em và người cao tuổi có được giảm giá vé không?', 'Có. Theo chính sách chung của các hãng tàu cao tốc Phú Quốc Express và Superdong, trẻ em dưới 6 tuổi (ngoài vé ngồi riêng ngồi cùng cha mẹ) được miễn phí vé. Trẻ em từ 6 đến 11 tuổi được áp dụng giá vé trẻ em (tiết kiệm đến 20-30%). Người cao tuổi (trên 60 tuổi, mang quốc tịch Việt Nam) được hưởng mức chiết khấu giá vé ưu đãi dành cho người lớn tuổi.'),
  ('faq-4', 'hoi-dap', 'Tôi có thể đem theo xe máy hay thú cưng lên tàu không?', 'Được. Superdong hỗ trợ chở các loại xe máy và xe số tay ga đi Phú Quốc, Nam Du. Bạn nên đăng ký trước ít nhất 1 ngày do diện tích sàn giữ xe đuôi tàu có hạn. Với thú cưng, bạn cần chuẩn bị lồng xách chuyên dụng hoặc dây xích rọ mõm để giữ an toàn trật tự trong khoang chung.'),
  ('faq-5', 'chinh-sach', 'Quy định hoàn hủy hoặc đổi vé tàu thế nào?', 'Bạn được hỗ trợ đổi ngày đi hoặc hoàn trả vé. Việc hủy đổi vé cần báo trước tối thiểu 24 giờ so với giờ tàu khởi hành. Tùy theo chính sách hãng tàu và thời gian thông báo, phí hủy đổi vé có thể dao động từ 10% đến 20% giá trị vé.'),
  ('faq-6', 'chinh-sach', 'Nếu thời tiết xấu tàu không chạy được thì xử lý sao?', 'Trong các trường hợp bất khả kháng do thời tiết xấu (bão biển dập dềnh cực lớn, gió giật trên cấp 6 khiến Cảng vụ hàng hải cấm cảng), các hãng tàu sẽ chủ động hủy chuyến. Phòng vé Tư Lai sẽ hỗ trợ khách chuyển đổi giờ chạy miễn phí sang ngày hôm sau hoặc hoàn tiền 100% giá vé cho khách hàng.'),
  ('faq-7', 'ho-tro', 'Tôi muốn lấy hóa đơn đỏ GTGT thì làm sao?', 'Phòng vé Tư Lai hỗ trợ xuất hóa đơn điện tử VAT (GTGT) trực tiếp cho các công ty doanh nghiệp làm tour du lịch, teambuilding. Quý khách vui lòng cung cấp thông tin MST và tên Đơn vị ngay khi chuyển khoản mua vé.'),
  ('faq-8', 'ho-tro', 'Thời gian hỗ trợ của phòng vé ra sao?', 'Cửa hàng Phòng vé Tư Lai hoạt động liên tục từ 06:00 sáng đến 21:00 tối hàng ngày. Hotline hỗ trợ khẩn cấp hoạt động 24/7 để phục vụ hành khách trước khi ra cảng biển làm thủ tục boarding.')
on conflict (id) do nothing;
