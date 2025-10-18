const PRODUCTS = [
  {id:'rice-clean',name:'Sữa rửa mặt Rice Water Bright',price:229000,
   img:'image/sp/Rice Water Bright.jpg',
    ingredients: 'Nước Gạo (Rice Water), Dầu Cám Gạo (Rice Bran Oil), Chiết xuất Cây Xà Bông (Soapwort).', 
    desc: 'Làm sạch sâu & Dưỡng sáng từ nước gạo. Sản phẩm bán chạy số 1 với bọt kem dày mịn, giúp cuốn trôi bụi bẩn, bã nhờn và cặn trang điểm. Dưỡng chất gạo giúp cải thiện tông da, mang lại làn da sạch thoáng, ẩm mượt và rạng rỡ. Phù hợp cho da thường đến da khô. Dung tích: 150ml.',rating:5,reviews:256,sold:1240,category:'Skincare',
    gallery:['image/sp/Rice Water Bright.jpg', 'image/sp/Rice Water Bright 1.jpg', 'image/sp/Rice Water Bright 2.jpg'],
    reviews_data:[{user:'Nguyễn V.A.',rate:5,content:'Da sạch mà không bị khô.',date:'2025-05-10'}]},
    
	{id: 'herb-day-aloe',name: 'Sữa rửa mặt Herb Day Aloe',
    price: 199000,
    img: 'image/sp/Herb Day 365.webp',
    ingredients: 'Chiết xuất Lô Hội (Aloe Vera), Trà Xanh (Green Tea Extract).', 
    desc: 'Làm sạch dịu nhẹ & Cấp ẩm tức thì. Sữa rửa mặt sử dụng hệ hoạt chất làm sạch từ dừa (low-irritant coconut-derived surfactants), tạo bọt xốp nhẹ, giúp làm sạch hiệu quả nhưng không làm mất đi độ ẩm tự nhiên của da. Lý tưởng cho da khô và da nhạy cảm. Dung tích: 170ml.', 
    rating: 4, reviews: 150, sold: 700, category: 'Skincare',
    gallery: ['image/sp/Herb Day 365.webp', 'image/sp/Herb Day 365 1.jpg', 'image/sp/Herb Day 365 2.jpg']},
	
  {id:'toner-rice',name:'Toner Rice & Ceramide',price:299000,
   img:'image/sp/Rice&Ceamide.jpg',
   ingredients: 'Chiết xuất Gạo (Oryza Sativa), Ceramide NP, Sodium Hyaluronate.', 
    desc: 'Cân bằng & Củng cố hàng rào bảo vệ da. Toner dạng lỏng hơi sánh, giàu dưỡng chất từ Chiết xuất Gạo và Nano Ceramide Water. Giúp cân bằng pH da, cung cấp độ ẩm sâu và tăng cường lớp màng lipid để ngăn ngừa mất nước. Dung tích: 150ml.',reviews:180,sold:980,category:'Skincare', gallery:['image/sp/Rice&Ceamide.jpg', 'image/sp/Rice&Ceamide 1.jpg', 'image/sp/Rice&Ceamide 2.jpg']},
    
  {id:'white-serum',name:'White Seed Brightening Serum',price:699000,
   img:'image/sp/White Seed Brightening.webp',
   ingredients: 'Niacinamide, Chiết xuất Hạt White Lupin, Hexylresorcinol, Squalane.', 
    desc: 'Đặc trị thâm nám & Làm da căng bóng rạng rỡ. Tinh chất dưỡng sáng chuyên sâu. Thẩm thấu nhanh, tập trung cải thiện đốm nâu, làm mờ thâm nám và mang lại vẻ căng bóng, trong suốt cho làn da. Dung tích: 50ml.',rating:5,reviews:342,sold:1560,category:'Skincare', gallery:['image/sp/White Seed Brightening.webp', 'image/sp/White Seed Brightening 1.jpg', 'image/sp/White Seed Brightening 2.jpg']},
	
 {id: 'toner-yehwadam',name: 'Yehwadam Pure Brightening Toner', price: 1199000,
    img: 'image/sp/Yehwadam Pure Brightening.jpg',
    ingredients: 'Niacinamide (Vitamin B3), Hoa Mộc Lan (Magnolia), Chiết xuất Nhân Sâm (Panax Ginseng).', 
    desc: 'Dưỡng trắng cao cấp & Phục hồi sinh khí. Toner chứa phức hợp thảo dược truyền thống Hàn Quốc. Giúp làm sáng và đều màu da từ bên trong, cải thiện sắc tố và mang lại vẻ ngoài tươi tắn. Kết cấu thấm nhanh. Dung tích: 160ml.', 
    rating: 5, reviews: 120, sold: 550, category: 'Skincare',
    gallery: ['image/sp/Yehwadam Pure Brightening.jpg', 'image/sp/Yehwadam Pure Brightening 1.jpg', 'image/sp/Yehwadam Pure Brightening 2.jpg' ]},
    
  {id:'cica-amp',name:'Dr.Belmeur Cica Ampoule',price:899000,
   img:'image/sp/Dr.Belmeur Cica.webp',
  ingredients: 'Madecassoside (dẫn xuất Cica/Rau Má), Phức hợp Peptite (Alanyl Glutamine), Niacinamide.', 
    desc: 'Ampoule phục hồi chuyên sâu cho da nhạy cảm, tổn thương. Sự kết hợp mạnh mẽ giữa Cica (Rau Má) và Peptite giúp làm dịu da kích ứng, tăng tốc độ phục hồi các vùng da tổn thương (sau mụn, treatment) và củng cố độ đàn hồi. Dung tích: 45ml.',rating:5,reviews:220,sold:870,category:'Skincare', gallery:['image/sp/Dr.Belmeur Cica.webp', 'image/sp/Dr.Belmeur Cica 1.jpg', 'image/sp/Dr.Belmeur Cica 2.jpg']},
	
    
  {id:'ink-found',name:'Ink Lasting Foundation',price:399000,
   img:'image/sp/Ink Lasting Foundation.jpg',
    ingredients: 'Titanium Dioxide, Ethylhexyl Methoxycinnamate, Adenosine, Tocopheryl Acetate.', 
    desc: 'Kem nền Mực (Ink) mỏng nhẹ, độ bám vượt trội. Mang lại lớp nền mỏng nhẹ như lụa nhưng có khả năng che phủ cao và bền màu suốt 12 giờ. Sản phẩm có chỉ số chống nắng SPF30 PA++. Dung tích: 30ml.',rating:4,reviews:150,sold:650,category:'Makeup', gallery:['image/sp/Ink Lasting Foundation.jpg', 'image/sp/Ink Lasting Foundation 1.jpg', 'image/sp/Ink Lasting Foundation 2.jpg']},
	
     {id: 'cc-cushion',name: 'CC Cushion Intense Cover',price: 599000,
    img: 'image/sp/CC Cushion Intense Cove.webp',
    ingredients: 'Titanium Dioxide, Zinc Oxide, Niacinamide.', 
    desc: 'Phấn nước CC che phủ hoàn hảo, làm sáng da. Cushion tiện lợi với khả năng che phủ khuyết điểm mạnh mẽ. Cung cấp độ ẩm nhẹ và mang lại lớp nền căng bóng tự nhiên chuẩn Hàn, có chỉ số chống nắng cao. Dung tích: 15g.', 
    rating: 5, reviews: 250, sold: 1400, category: 'Makeup',
    gallery: ['image/sp/CC Cushion Intense Cove.webp', 'image/sp/CC Cushion Intense Cove 1.jpg', 'image/sp/CC Cushion Intense Cove 2.jpg']},
	
	{id: 'mono-pop-palette',name: 'Mono Pop Eyeshadow Palette',price: 449000,
    img: 'image/sp/Eye Moment Palette.webp',
    ingredients: 'Bột thấm hút bã nhờn, Talc, Mica, Titanium Dioxide, Công thức hạt phấn siêu mịn.', 
    desc: 'Bảng phấn mắt 9 màu fmgt chuyên nghiệp, siêu mịn và bám màu. Chứa các tông nude, nâu và cam san hô. Hạt phấn siêu mịn, bám dính tuyệt vời và chứa bột thấm hút bã nhờn giúp giữ màu bền lâu.', 
    rating: 5, reviews: 190, sold: 1100, category: 'Makeup',
    gallery: ['image/sp/Eye Moment Palette.webp', 'image/sp/Eye Moment Palette 1.jpg','image/sp/Eye Moment Palette 2.jpg' ]},
	
	{id: 'rouge-matte',name: 'Rouge Powder Matte',price: 279000,
    img: 'image/sp/Rouge Powder Matte.jpg',
    ingredients: 'Dimethicone, Tocopherol (Vitamin E), Dầu Jojoba (Simmondsia Chinensis Seed Oil).', 
    desc: 'Son lì dạng Bột, nhẹ như không. Kết cấu đặc biệt dạng Powder Matte, tạo ra lớp finish lì mịn, che phủ vân môi tốt, cho màu sắc chuẩn và sắc nét. Có 6 màu.', 
    rating: 5, reviews: 210, sold: 950, category: 'Makeup',
    gallery: ['image/sp/Rouge Powder Matte.jpg', 'image/sp/Rouge Powder Matte 1.jpg', 'image/sp/Rouge Powder Matte 2.jpg']},
  
	{id:'mascara-mega',name:'Mascara Mega Volume',price:159000,
   img:'image/sp/Mascara Mega Volume.jpg',
   desc:'Tạo hàng mi dày và cong tự nhiên, không lem, không trôi. Công thức dưỡng mi. Dung tích: 8g.',rating:4,reviews:95,sold:420,category:'Makeup', gallery:['image/sp/Mascara Mega Volume.jpg', 'image/sp/Mascara Mega Volume 1.webp', 'image/sp/Mascara Mega Volume 2.jpg']},
    
	{id:'body-wash',name:'Perfume Seed Body Wash & Lotion',price:189000,
   img:'image/sp/Perfume Seed Body Wash & Lotion.jpg',
   ingredients: 'Jojoba Seed Oil, Micro Perfume Capsules, Chiết xuất Hoa Hồng/Hoa Nhài, Glycerin.', 
   desc: 'Làm sạch / Dưỡng thể với hương nước hoa bền lâu. Chứa các hạt nước hoa siêu nhỏ (Perfume Capsules) giúp lưu hương quyến rũ suốt cả ngày. Sữa tắm tạo bọt kem mịn, sữa dưỡng thể cấp ẩm sâu, mang lại làn da mềm mại. Dung tích: 300ml.',rating:5,reviews:300,sold:1800,category:'Body', gallery:['image/sp/Perfume Seed Body Wash & Lotion.jpg', 'image/sp/Perfume Seed Body Wash & Lotion 1.jpg', 'image/sp/Perfume Seed Body Wash & Lotion 2.jpg']},
    
	{id:'hand-cream',name:'Kem dưỡng tay Daily Perfumed Hand Cream',price:79000,
   img:'image/sp/Hand Cream.jpg',
   ingredients: 'Shea Butter (Bơ hạt mỡ), Glycerin, Chiết xuất Hoa Anh Đào/Hoa Hồng.', 
   desc: 'Kem dưỡng tay hàng ngày, thấm nhanh, đa dạng mùi hương. Kết cấu mỏng nhẹ, không bết dính. Giúp cấp ẩm, làm dịu da khô và giảm nứt nẻ. Có nhiều lựa chọn mùi hương phù hợp tâm trạng.',rating:5,reviews:120,sold:750,category:'Body', gallery:['image/sp/Hand Cream.jpg', 'image/sp/Hand Cream 1.jpg', 'image/sp/Hand Cream 2.webp']},
    
  {id:'gift-set-cica',name:'Bộ quà tặng Dr.Belmeur Cica 5 món',price:1500000,
   img:'image/sp/Bộ quà tặng Dr.Belmeur Cica 5 món.jpg',
   desc:'Bộ sản phẩm hoàn hảo để chăm sóc và phục hồi da nhạy cảm. Phù hợp làm quà tặng.',rating:5,reviews:80,sold:350,category:'Giftset', gallery:['image/sp/Bộ quà tặng Dr.Belmeur Cica 5 món.jpg', 'image/sp/Bộ quà tặng Dr.Belmeur Cica 5 món 1.jpg']},
	
  {id:'eyeliner-pen',name:'Ink Graffi Liquid Liner',price:319000,
   img:'image/sp/Ink Graffi Liquid Liner.webp',
   ingredients: 'Styrene/Acrylates Copolymer, Silica, Hydroxyapatite.', 
    desc: 'Kẻ mắt nước sắc nét như Mực (Ink), chống trôi tuyệt đối. Thiết kế đầu cọ siêu mảnh, dễ dàng tạo ra đường kẻ chính xác. Công thức chống nước, chống lem hiệu quả, đảm bảo đường kẻ mắt sắc sảo.',rating:4,reviews:110,sold:500,category:'Makeup', gallery:['image/sp/Ink Graffi Liquid Liner.webp', 'image/sp/Ink Graffi Liquid Liner 1.jpg', 'image/sp/Ink Graffi Liquid Liner 2.jpg']},
    
	{id:'lip-tint',name:'Ink Gel Stick',price:299000,
   img:'image/sp/Ink Gel Stick.jpg',
   ingredients: 'Trimethylsiloxysilicate, Squalane, Rose Extract.', 
   desc: 'Son thỏi dạng Gel, màu sống động, mọng môi. Son có kết cấu gel ẩm mượt, giàu độ dưỡng, giúp màu sắc lên môi tươi tắn và tạo hiệu ứng môi căng mọng. Có 5 màu.',rating:4,reviews:140,sold:600,category:'Makeup', gallery:['image/sp/Ink Gel Stick.jpg', 'image/sp/Ink Gel Stick 1.jpg', 'image/sp/Ink Gel Stick 2.jpg']},
    
  {id:'pomegranate',name:'Kem Dưỡng Chiết Xuất Lựu Đỏ',price:989000,
   img:'image/sp/Chia Seed Hydro.webp',
   desc:'Kem dưỡng chống lão hóa từ chiết xuất lựu đỏ, giúp da săn chắc và căng mịn. Dung tích: 50ml.',rating:5,reviews:190,sold:720,category:'Skincare', gallery:['image/sp/Chia Seed Hydro.webp', 'image/sp/Chia Seed Hydro 1.jpg', 'image/sp/Chia Seed Hydro 2.jpg']},
	
 {id: 'cotton-pads',name: 'Bông tẩy trang',price: 59000,
   img: 'image/sp/Bông tẩy trang.webp',
    ingredients: '100% Cotton tự nhiên không dệt (Non-woven Cotton).', 
    desc: '100% Cotton tự nhiên, mềm mịn và không xơ. Thiết kế ép viền hoặc dạng lưới, giúp lấy đi lớp trang điểm và bụi bẩn một cách nhẹ nhàng. Giúp tiết kiệm nước tẩy trang/toner.', 
    rating: 5, reviews: 300, sold: 2500, category: 'Phụ kiện',
    gallery: ['image/sp/Bông tẩy trang.webp']},
	
	{id: 'makeup-brush',name: 'Cọ trang điểm',price: 299000,
    img: 'image/sp/Cọ.jpg',
    ingredients: 'Sợi tổng hợp chất lượng cao (Synthetic Fibers), Cán gỗ/nhựa cao cấp.', 
    desc: 'Dụng cụ chuyên nghiệp, tán đều và mượt mà. Dùng để tán kem nền, phấn phủ, hoặc tạo khối. Lông cọ mềm mại, không gây kích ứng da, giúp lớp nền/lớp phấn hoàn hảo.', 
    rating: 4, reviews: 100, sold: 550, category: 'Phụ kiện',
    gallery: ['image/sp/Cọ.jpg']},
	
	{id: 'beauty-sponge',name: 'Mút tán nền',price: 129000,
    img: 'image/sp/Bông mút tán.jpg',
    ingredients: 'Polyurethane (PU) hoặc Rubycell (cho Cushion Puff).', 
    desc: 'Tán nền và Cushion hoàn hảo, mỏng nhẹ. Chất liệu dẻo dai, không hút sản phẩm quá nhiều, giúp tán kem nền, CC/BB Cream hoặc phấn nước (Cushion) một cách đều và tự nhiên.', 
    rating: 4, reviews: 90, sold: 600, category: 'Phụ kiện',
    gallery: ['image/sp/Bông mút tán.jpg']}
];

const FLASH_SALE_PRODUCTS = [
  { id: 'white-serum', discount: 0.30, max_qty: 50, sold_qty: 25 },
  { id: 'toner-rice', discount: 0.40, max_qty: 100, sold_qty: 80 },
  { id: 'mascara-mega', discount: 0.25, max_qty: 80, sold_qty: 10 },
];

const FLASH_SALE_END_TIME = new Date('2025-10-31T23:59:59').getTime(); 