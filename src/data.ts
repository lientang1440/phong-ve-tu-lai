import { Route, Partner, Departure, BlogPost, FAQ } from './types';

export const PORTS_LIST = [
  'Rạch Giá',
  'Hà Tiên',
  'Phú Quốc',
  'Nam Du',
  'Thổ Chu',
  'Sóc Trăng',
  'Côn Đảo'
];

// Mapping departure ports to allowed destination ports
export const ROUTE_CONNECTIONS: Record<string, string[]> = {
  'Rạch Giá': ['Phú Quốc', 'Nam Du'],
  'Hà Tiên': ['Phú Quốc'],
  'Phú Quốc': ['Rạch Giá', 'Hà Tiên', 'Thổ Chu'],
  'Nam Du': ['Rạch Giá'],
  'Thổ Chu': ['Phú Quốc'],
  'Sóc Trăng': ['Côn Đảo'],
  'Côn Đảo': ['Sóc Trăng']
};

export const POPULAR_ROUTES: Route[] = [
  {
    id: 'rg-pq',
    from: 'Rạch Giá',
    to: 'Phú Quốc',
    price: 350000,
    badge: 'Phổ biến',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Hành trình tuyệt vời vượt vịnh Thái Lan đến Đảo Ngọc xanh mát.'
  },
  {
    id: 'st-cd',
    from: 'Sóc Trăng',
    to: 'Côn Đảo',
    price: 310000,
    badge: 'Mới',
    image: 'https://static-images.vnncdn.net/files/publish/2022/8/27/con-dao-396.jpg',
    description: 'Rút ngắn thời gian ra Côn Đảo thiêng liêng từ cảng Trần Đề.'
  },
  {
    id: 'rg-nd',
    from: 'Rạch Giá',
    to: 'Nam Du',
    price: 230000,
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Khám phá quần đảo hoang sơ tuyệt mỹ với những hòn đảo nhỏ kỳ vĩ.'
  },
  {
    id: 'pq-tc',
    from: 'Phú Quốc',
    to: 'Thổ Chu',
    price: 420000,
    image: 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Chuyến phiêu lưu đến hòn đảo tiền tiêu cực Nam đầy hoang sơ.'
  }
];

export const OPERATOR_PARTNERS: Partner[] = [
  {
    name: 'Phú Quốc Express',
    logoType: 'Phú Quốc Express',
    highlights: 'Tàu hai thân hiện đại, trải nghiệm cao cấp.',
    details: 'Đội tàu hai thân đổi mới với khoang VIP sang trọng, ghế ngồi bọc da cao cấp rộng rãi, dịch vụ chuyên nghiệp chuẩn 5 sao. Chuyên phục vụ các tuyến Phú Quốc – Hà Tiên – Rạch Giá – Nam Du.',
    advantages: [
      'Tàu hai thân chống say sóng tối đa',
      'Khoang VIP riêng biệt rộng rãi và yên tĩnh',
      'Đại lý ủy quyền chính thức phát vé trực tuyến',
      'Trang thiết bị an toàn đạt chuẩn quốc tế'
    ],
    imageUrl: 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Superdong',
    logoType: 'Superdong',
    highlights: 'Hãng tàu cao tốc hàng đầu vùng biển Tây Nam.',
    details: 'Hơn 25 năm kinh nghiệm phục vụ hành khách. Sở hữu đội tàu cao tốc một thân hiện đại, hoạt động cực kỳ bền bỉ và đúng giờ trên các tuyến Rạch Giá – Phú Quốc, Nam Du, Thổ Chu, Côn Đảo.',
    advantages: [
      'Lịch chạy dày đặc nhất trong ngày',
      'Giá vé thông dụng tiết kiệm hàng đầu',
      'Vận chuyển xe máy và hành lý khối lượng lớn',
      'Kinh nghiệm 25 năm vận hành an toàn vượt trội'
    ],
    imageUrl: 'https://images.pexels.com/photos/37729788/pexels-photo-37729788.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const DEPARTURES: Departure[] = [
  { id: 'dep-1', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '07:20', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-2', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '10:10', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-3', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '12:20', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-4', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '13:30', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-5', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '07:10', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-6', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '08:00', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-7', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '10:00', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-8', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Rạch Giá', time: '13:20', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-9', ferryLine: 'Superdong', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '07:10', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-10', ferryLine: 'Superdong', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '07:55', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-11', ferryLine: 'Superdong', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '10:30', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-12', ferryLine: 'Superdong', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '13:10', priceLabel: 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND' },
  { id: 'dep-13', ferryLine: 'Phú Quốc Express', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '07:00', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-14', ferryLine: 'Phú Quốc Express', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '10:20', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-15', ferryLine: 'Phú Quốc Express', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '12:10', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-16', ferryLine: 'Phú Quốc Express', routeFrom: 'Rạch Giá', routeTo: 'Phú Quốc', time: '13:00', priceLabel: 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND' },
  { id: 'dep-17', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '06:30', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-18', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '08:10', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-19', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '10:20', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-20', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '13:30', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-21', ferryLine: 'Superdong', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '14:30', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-22', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '07:00', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-23', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '09:00', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-24', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '11:45', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-25', ferryLine: 'Phú Quốc Express', routeFrom: 'Phú Quốc', routeTo: 'Hà Tiên', time: '14:00', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-26', ferryLine: 'Superdong', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '06:10', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-27', ferryLine: 'Superdong', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '08:20', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-28', ferryLine: 'Superdong', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '10:00', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-29', ferryLine: 'Superdong', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '12:15', priceLabel: 'Người lớn: 226.000 VND; NCT: 192.000 VND; Trẻ em: 157.000 VND' },
  { id: 'dep-30', ferryLine: 'Phú Quốc Express', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '07:00', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-31', ferryLine: 'Phú Quốc Express', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '09:00', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-32', ferryLine: 'Phú Quốc Express', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '11:45', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' },
  { id: 'dep-33', ferryLine: 'Phú Quốc Express', routeFrom: 'Hà Tiên', routeTo: 'Phú Quốc', time: '13:45', priceLabel: 'VIP: 330.000 VND; Người lớn: 216.000 VND; NCT: 182.000 VND; Trẻ em: 148.000 VND' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Khám phá 3 bãi biển đẹp nhất Phú Quốc',
    category: 'Khám phá',
    snippet: 'Từ Bãi Sao trắng mịn đến Bãi Dài yên tĩnh hay Bãi Ông Lang, Phú Quốc có những bãi biển tuyệt vời đang chờ bạn khám phá.',
    imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '15/06/2026',
    readTime: '4 phút đọc',
    content: `Phú Quốc luôn giữ vững sức hút của một "Đảo Ngọc" tinh khôi. Khi đặt chân tới đây bằng các hãng tàu cao tốc hiện đại của phòng vé Tư Lai, đừng bỏ qua 3 bãi biển tuyệt diệu này:\n\n1. **Bãi Sao**: Nổi tiếng nhờ những bờ cát trắng tinh mịn màng như kem cùng hàng dừa nghiêng bóng soi mình xuống làn nước trong xanh như pha lê. Đây là tọa độ "sống ảo" hot nhất đảo.\n\n2. **Bãi Dài**: Trải rộng ở phía Bắc đảo với không gian yên tĩnh và giữ nguyên vẻ hoang sơ kỳ vĩ. Làn gió nhẹ mát từ những rừng cây sát biển đem lại cảm giác dã ngoại tuyệt vời.\n\n3. **Bãi Ông Lang**: Điểm ngắm hoàng hôn ráng vàng thơ mộng nhất Phú Quốc. Những dải đá rêu bục cát cùng những ngọn sóng êm đềm tạo ra nét quyến rũ đặc biệt.\n\nĐặt vé tàu cao tốc cùng Phòng vé Tư Lai để đi ngay thôi!`
  },
  {
    id: 'blog-2',
    title: 'Hướng dẫn đi tàu cao tốc lần đầu',
    category: 'Cẩm nang',
    snippet: 'Những lưu ý quan trọng khi đi tàu cao tốc lần đầu tiên, từ cách chuẩn bị giấy tờ, phòng tránh say sóng đến thời gian cần ra cảng.',
    imageUrl: 'https://images.pexels.com/photos/30738862/pexels-photo-30738862.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '10/06/2026',
    readTime: '6 phút đọc',
    content: `Khởi hành trên những hành trình đi tàu biển cao tốc luôn là trải nghiệm đầy thú vị nhưng có thể gây lo sợ nếu bạn chưa chuẩn bị sẵn sàng. Dưới đây là cuốn cẩm nang toàn diện của phòng vé Tư Lai để bạn yên tâm tuyệt đối:\n\n- **Mang đầy đủ giấy tờ**: Bạn nhất định phải đem theo CCCD, Hộ chiếu hoặc Giấy phép lái xe gốc hành khách để làm thủ tục lên tàu.\n- **Thời gian ra cảng**: Nên có mặt trước giờ chạy tối thiểu 45 phút. Điều này đảm bảo bạn lấy vé vật lý hoặc xuất trình vé điện tử thuận lợi và không bị trễ nốt tàu.\n- **Bảo vệ sức khỏe chống say sóng**: Nếu bạn dễ bị say sóng, hãy ưu tiên chọn đi tàu hai thân độ dốc phẳng của Phú Quốc Express và uống thuốc chống say trước lúc chạy 30 phút. Tránh đọc sách điện thoại khi tàu đang lướt sóng nhé.\n\nBộ phận CSKH Phòng vé Tư Lai luôn hỗ trợ trực 24/7 để trả lời mọi băn khoăn của quý khách trước giờ tàu khởi hành!`
  },
  {
    id: 'blog-3',
    title: 'Điểm dừng chân lý tưởng tại Côn Đảo',
    category: 'Khám phá',
    snippet: 'Từ nhà tù lịch sử linh thiêng đến những rặng san hô tuyệt mỹ tại hòn Bảy Cạnh, Côn Đảo luôn mang vẻ đẹp bình lặng khó tả.',
    imageUrl: 'https://images.pexels.com/photos/7909254/pexels-photo-7909254.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '02/06/2026',
    readTime: '5 phút đọc',
    content: `Côn Đảo không chỉ là điểm du lịch tâm linh nổi tiếng hàng đầu Tổ Quốc mà còn sở hữu hệ sinh thái rừng núi biển trù phú ít nơi có được.\n\n- **Viếng nghĩa trang Hàng Dương**: Tấm lòng tri ân sâu sắc hướng tới vị nữ anh hùng Võ Thị Sáu linh thiêng trước làn trầm ấm rực rỡ buổi đêm.\n- **Hòn Bảy Cạnh**: Trải nghiệm xem rùa đẻ trứng ban đêm vô cùng quý hiếm và bơi lặn xem rạn san hô tự nhiên đa sắc màu lấp lánh dưới đáy nước.\n- **Bãi Nhát**: Bãi biển tuyệt đẹp dốc thoai thoải phơi mình bồng bềnh biến mất vào dòng nước xanh khi thủy triều dâng.\n\nTuyến tàu cao tốc từ Sóc Trăng đi Côn Đảo khởi hành hàng ngày giúp hành trình về miền đất hào hùng cực dễ dàng!`
  }
];

export const FAQS: FAQ[] = [
  {
    category: 'quy-tac',
    question: 'Quy tắc đặt vé tàu trực tuyến thế nào?',
    answer: 'Hành khách chọn điểm đi, điểm đến và lịch trình phù hợp trên website. Sau khi điền thông tin người đặt vé, bạn gửi yêu cầu đặt chỗ. Đội ngũ nhân viên Tư Lai sẽ lập tức kiểm tra chỗ trống, giữ chỗ trên hệ thống của hãng tàu Phú Quốc Express hoặc Superdong và liên hệ lại với quý khách qua điện thoại hoặc Zalo để hướng dẫn nhận vé điện tử nhanh chóng.'
  },
  {
    category: 'quy-tac',
    question: 'Cần cung cấp thông tin gì khi mua vé tàu?',
    answer: 'Theo quy định hải hải và quản lý cảng hàng hải Việt Nam, khi mua vé tàu cao tốc hành khách bắt buộc cung cấp: Họ tên đầy đủ, Số CCCD/Hộ chiếu/Ngày sinh của từng hành khách ngồi trên tàu để đăng ký bảo hiểm vận tải quốc gia.'
  },
  {
    category: 'hoi-dap',
    question: 'Trẻ em và người cao tuổi có được giảm giá vé không?',
    answer: 'Có. Theo chính sách chung của các hãng tàu cao tốc Phú Quốc Express và Superdong, trẻ em dưới 6 tuổi (ngoài vé ngồi riêng ngồi cùng cha mẹ) được miễn phí vé. Trẻ em từ 6 đến 11 tuổi được áp dụng giá vé trẻ em (tiết kiệm đến 20-30%). Người cao tuổi (trên 60 tuổi, mang quốc tịch Việt Nam) được hưởng mức chiết khấu giá vé ưu đãi dành cho người lớn tuổi.'
  },
  {
    category: 'hoi-dap',
    question: 'Tôi có thể đem theo xe máy hay thú cưng lên tàu không?',
    answer: 'Được. Superdong hỗ trợ chở các loại xe máy và xe số tay ga đi Phú Quốc, Nam Du. Bạn nên đăng ký trước ít nhất 1 ngày do diện tích sàn giữ xe đuôi tàu có hạn. Với thú cưng, bạn cần chuẩn bị lồng xách chuyên dụng hoặc dây xích rọ mõm để giữ an toàn trật tự trong khoang chung.'
  },
  {
    category: 'chinh-sach',
    question: 'Quy định hoàn hủy hoặc đổi vé tàu thế nào?',
    answer: 'Bạn được hỗ trợ đổi ngày đi hoặc hoàn trả vé. Việc hủy đổi vé cần báo trước tối thiểu 24 giờ so với giờ tàu khởi hành. Tùy theo chính sách hãng tàu và thời gian thông báo, phí hủy đổi vé có thể dao động từ 10% đến 20% giá trị vé.'
  },
  {
    category: 'chinh-sach',
    question: 'Nếu thời tiết xấu tàu không chạy được thì xử lý sao?',
    answer: 'Trong các trường hợp bất khả kháng do thời tiết xấu (bão biển dập dềnh cực lớn, gió giật trên cấp 6 khiến Cảng vụ hàng hải cấm cảng), các hãng tàu sẽ chủ động hủy chuyến. Phòng vé Tư Lai sẽ hỗ trợ khách chuyển đổi giờ chạy miễn phí sang ngày hôm sau hoặc hoàn tiền 100% giá vé cho khách hàng.'
  },
  {
    category: 'ho-tro',
    question: 'Tôi muốn lấy hóa đơn đỏ GTGT thì làm sao?',
    answer: 'Phòng vé Tư Lai hỗ trợ xuất hóa đơn điện tử VAT (GTGT) trực tiếp cho các công ty doanh nghiệp làm tour du lịch, teambuilding. Quý khách vui lòng cung cấp thông tin MST và tên Đơn vị ngay khi chuyển khoản mua vé.'
  },
  {
    category: 'ho-tro',
    question: 'Thời gian hỗ trợ của phòng vé ra sao?',
    answer: 'Cửa hàng Phòng vé Tư Lai hoạt động liên tục từ 06:00 sáng đến 21:00 tối hàng ngày. Hotline hỗ trợ khẩn cấp hoạt động 24/7 để phục vụ hành khách trước khi ra cảng biển làm thủ tục boarding.'
  }
];
