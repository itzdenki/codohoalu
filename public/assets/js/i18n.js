export const I18N = {
  vi: {
    toc: {
      title: 'MỤC LỤC THAM QUAN',
      close: 'Đóng',
      items: {
        'so-do-den-dinh': 'Sơ đồ tham quan\nđền vua Đinh',
        'so-do-den-le': 'Sơ đồ tham quan\nđền vua Lê',
        'tim-hieu-co-do': 'Tìm hiểu di tích\nCố đô Hoa Lư',
        'vua-dinh-tien-hoang': 'Thân thế, sự nghiệp\nvua Đinh Tiên Hoàng',
        'vua-le-dai-hanh': 'Thân thế, sự nghiệp\nvua Lê Đại Hành',
        'vua-le-long-dinh': 'Thân thế, sự nghiệp\nvua Lê Long Đĩnh',
        'duong-van-nga': 'Thái hậu\nDương Vân Nga',
        'kien-truc': 'Kiến trúc',
      },
      qrTitle: '📱 Mã QR Thuyết Minh Cố Đô Hoa Lư',
      qrDesc:
        'Quét mã QR bằng điện thoại để mở nhanh Ứng dụng trải nghiệm thuyết minh Cố đô Hoa Lư.',
    },
    pano: {
      backToMap: (count) => `← Sơ đồ (${count} điểm)`,
      pointPill: (num, total) => `360° • Điểm ${num}/${total}`,
      loading: 'Đang nạp ảnh thực địa Panorama 360°...',
      gestureHint: '↔️ Vuốt màn hình để nhìn 360° quanh di tích',
      nextSpotHint: (num, name) => `👉 Đi tiếp tới Điểm #${num}: ${name}`,
      prevBtn: '⏮ Điểm trước',
      nextBtn: 'Điểm tiếp ⏭',
      showSub: 'Xem thuyết minh ▲',
      hideSub: 'Thu gọn ▼',
    },
    dthMap: {
      titleLine1: 'SƠ ĐỒ THAM QUAN ĐỀN THỜ',
      titleLine2: 'VUA ĐINH TIÊN HOÀNG',
      instruction: 'Chạm vào các mục dưới để xem thuyết minh chi tiết',
    },
    ldhMap: {
      subScript: 'Thuyết minh',
      mainHeading: 'ĐỀN THỜ VUA LÊ ĐẠI HÀNH',
      dropcap: 'Đ',
      introRest:
        'ền vua Lê Đại Hành thuộc xã Trường Yên hạ (thời Nguyễn), do người dân xã này trông coi, cúng lễ, nên còn gọi là đền Hạ. Ngôi đền cổ hơn 400 năm tuổi này vẫn còn giữ nguyên nền kiến trúc nghệ thuật độc đáo của thế kỷ XVII. Nơi này chỉ cách đền vua Đinh Tiên Hoàng tầm 300m về phía Bắc. Đền vua Lê nổi tiếng bởi việc sở hữu các kiến trúc cổ đặc sắc mang đậm tính nghệ thuật của các nghệ nhân xưa.',
      sketchTitleVi: 'SƠ ĐỒ THAM QUAN ĐỀN THỜ VUA LÊ ĐẠI HÀNH',
      sketchTitleEn: 'SKETCH MAP OF LE DAI HANH KING TEMPLE',
      instruction: 'Chạm vào các mục dưới để xem thuyết minh chi tiết',
    },
    hotspots: {
      'dth-ngo-mon-quan': {
        name: 'NGỌ MÔN QUAN',
        subName: 'Meridian Gate',
        subtitle: 'Cổng ngoài dẫn vào khu di tích Đền Vua Đinh',
        subtitles: [
          'Điểm số 1: Ngọ Môn Quan – cửa ngõ đầu tiên mở ra không gian uy nghiêm của Đền thờ Vua Đinh Tiên Hoàng.',
          'Phía trước Ngọ Môn Quan là hồ nước hình bán nguyệt trồng sen, đóng vai trò tụ thủy minh đường theo phong thủy cổ phương Đông.',
          'Cổng được xây dựng bằng đá xanh nguyên khối kết hợp mái ngói mũi hài cong vút, chạm khắc lưỡng long chầu nguyệt.',
          'Bước qua Ngọ Môn Quan là tiến vào trục thần đạo lát đá xanh dẫn thẳng tới khu điện thờ chính.',
        ],
      },
      'dth-long-sang-ngoai': {
        name: 'LONG SÀNG',
        subName: 'Dragon bed',
        subtitle: 'Long Sàng đá trước Nghi Môn Ngoại',
        subtitles: [
          'Điểm số 2: Long Sàng đặt ngay phía trước Nghi Môn Ngoại trên trục thần đạo của đền Vua Đinh.',
          'Chiếc sập rồng được chế tác từ đá xanh nguyên khối, bề mặt chạm nổi hình rồng uốn lượn khỏe khoắn và phóng khoáng.',
          'Hai bên Long Sàng là đôi nghê đá chầu được tạc trên bệ đá cao, biểu trưng cho sự canh giữ chốn tôn nghiêm.',
          'Cùng với chiếc Long Sàng trước Bái đường, cặp Long Sàng đền Vua Đinh đã được công nhận là Bảo vật Quốc gia.',
        ],
      },
      'dth-nghi-mon-ngoai': {
        name: 'NGHI MÔN NGOẠI',
        subName: 'Outer Alter-Curtain',
        subtitle: 'Cổng tam quan gỗ lợp ngói cổ kính',
        subtitles: [
          'Điểm số 3: Nghi Môn Ngoại – cổng chính dẫn vào vòng thành ngoại của Đền thờ Vua Đinh Tiên Hoàng.',
          'Công trình gồm ba gian dựng bằng hệ khung cột gỗ lim vững chãi, mái lợp ngói mũi hài hai tầng tám mái chồng diêm.',
          'Trên các vì kèo và bức cốn gỗ là những mảng chạm bong kênh tinh xảo hình rồng, mây và hoa cúc dây.',
          'Qua Nghi Môn Ngoại, du khách bước vào không gian vườn cây xanh mát đối xứng qua đường thần đạo.',
        ],
      },
      'dth-nghi-mon-noi': {
        name: 'NGHI MÔN NỘI',
        subName: 'Inner Alter-Curtain',
        subtitle: 'Cửa ngõ tiến vào Sân Rồng và khu Chính điện',
        subtitles: [
          'Điểm số 4: Nghi Môn Nội – cổng tam quan thứ hai mở lối vào khu vực Sân Rồng trung tâm (Thành Nội).',
          'Nghi Môn Nội có kết cấu ba gian bằng gỗ lim tương tự Nghi Môn Ngoại, nối liền với hệ thống tường gạch bao quanh nội tự.',
          'Bước qua Nghi Môn Nội là khoảng Sân Rồng rộng lớn lát đá toàn phần dẫn tới tòa Bái đường.',
        ],
      },
      'dth-long-sang-san-rong': {
        name: 'LONG SÀNG',
        subName: 'Dragon bed',
        subtitle: 'Bảo vật Quốc gia Long Sàng đá tại Sân Rồng',
        subtitles: [
          'Điểm số 5: Long Sàng tại Sân Rồng, đặt ngay chính giữa trước thềm tòa Bái đường Đền Vua Đinh.',
          'Đây là kiệt tác điêu khắc đá độc nhất vô nhị của thế kỷ XVII, mặt sập chạm rồng có tay người cầm sừng uốn lượn trong mây.',
          'Xung quanh diềm sập chạm khắc sinh động hình cá hóa rồng, chim phượng, chuột, sóc và hoa lá cách điệu.',
          'Hai bên Long Sàng có hai cột cờ đá cao vút tượng trưng cho uy quyền tối thượng của Hoàng đế Đại Cồ Việt.',
        ],
      },
      'dth-den-tho-vua': {
        name: 'ĐỀN THỜ VUA ĐINH',
        subName: 'Temple of the Dinh Tien Hoang King',
        subtitle: 'Bái đường – Thiêu hương – Chính cung',
        subtitles: [
          'Điểm số 6: Đền thờ Vua Đinh Tiên Hoàng – kiến trúc trung tâm gồm ba tòa Bái đường, Thiêu hương và Chính cung.',
          'Tòa Thiêu hương là nơi thờ tứ trụ triều đình nhà Đinh gồm: Nguyễn Bặc, Đinh Điền, Trịnh Tú và Lưu Cơ.',
          'Tại Chính cung trang nghiêm nhất đặt tượng Vua Đinh Tiên Hoàng đúc bằng đồng ngự trên bệ đá xanh nguyên khối.',
          'Gian bên tả thờ Nam Việt Vương Đinh Liễn, gian bên hữu thờ Vệ Vương Đinh Toàn và hoàng tử Đinh Hạng Lang.',
        ],
      },
      'dth-nha-trung-bay': {
        name: 'NHÀ TRƯNG BÀY',
        subName: 'Exhibition room',
        subtitle: 'Trưng bày hiện vật khảo cổ Kinh đô Hoa Lư',
        subtitles: [
          'Điểm số 7: Nhà Trưng Bày nằm bên cánh của Sân Rồng, nơi lưu giữ các hiện vật khảo cổ học quý giá.',
          'Tại đây trưng bày gạch xây thành khắc chữ Đại Việt Quốc Quân Thành Chuyên, ngói mũi sen và gốm sứ thế kỷ thứ X.',
          'Những hiện vật này là minh chứng sống động cho quy mô bề thế của cung điện Hoa Lư hơn một thiên niên kỷ trước.',
        ],
      },
      'dth-nha-khai-thanh': {
        name: 'NHÀ KHẢI THÁNH',
        subName: "The Dinh king's parents",
        subName2: 'worshiping place',
        subtitle: 'Nơi thờ thân phụ và thân mẫu Vua Đinh',
        subtitles: [
          'Điểm số 8: Nhà Khải Thánh là nơi thờ phụng song thân của Vua Đinh Tiên Hoàng.',
          'Nơi đây thờ ông Đinh Công Trứ – Thứ sử châu Hoan và bà Đàm Thị Thiềm, tức thân phụ và thân mẫu của Vua Đinh.',
          'Công trình thể hiện truyền thống hiếu đạo và lòng tri ân sâu sắc đối với đấng sinh thành ra vị anh hùng dân tộc.',
        ],
      },
      'dth-nha-bia': {
        name: 'NHÀ BIA',
        subName: 'Stela House',
        subtitle: 'Lưu giữ văn bia lịch sử Đền Vua Đinh',
        subtitles: [
          'Điểm số 9: Nhà Bia nằm trong khuôn viên đền, nơi bảo vệ các tấm bia đá cổ qua nhiều triều đại.',
          'Văn bia khắc chữ Hán ghi lại công lao dẹp loạn 12 sứ quân, thống nhất đất nước của Vua Đinh Tiên Hoàng.',
          'Đồng thời các tấm bia còn ghi chép lịch sử các lần trùng tu, tôn tạo ngôi đền từ thời Hậu Lê và thời Nguyễn.',
        ],
      },
      'ldh-long-sang-ngoai': {
        name: 'LONG SÀNG',
        subName: 'Dragon bed',
        subtitle: 'Long Sàng trước Nghi Môn Ngoại Đền Vua Lê',
        subtitles: [
          'Long sàng được tạc bằng tấm đá nguyên khối, niên đại triều Nguyễn. So với Long sàng đền thờ vua Đinh Tiên Hoàng thì Long sàng ở đền thờ vua Lê Đại Hành chạm khắc đơn giản hơn. Long sàng có bố cục kiểu chân quỳ dạ cá. 4 chân điêu khắc tinh xảo hình ảnh quỳ.',
          'Phần giữa của mỗi bề mặt phía dưới chân Long sàng nghệ nhân tạo tác hình ảnh Hổ phù nhìn chính diện. Một linh vật mang ý nghĩa đem lại sức mạnh và điềm lành.',
          'Trong không gian của đền thờ, Long sàng đã tạo nên sự uy nghiêm, trang trọng và đậm chất mỹ thuật truyền thống.',
        ],
      },
      'ldh-nghi-mon-ngoai': {
        name: 'NGHI MÔN NGOẠI',
        subName: 'Outer Alter-Curtain',
        subtitle: 'Cổng tam quan ngoài Đền Vua Lê Đại Hành',
        subtitles: [
          'Nghi môn ngoại đền thờ vua Lê mang phong cách kiến trúc triều Nguyễn, thế kỷ XIX. Bát bửu là đề tài trang trí chủ đạo, với hình ảnh của: hòm sách, ống bút, bầu rượu, bàn cờ, cuốn thư, đàn, lẵng quả, túi thiêng.',
          'Các vật quý được trang trí kết hợp với dải lụa mềm mại đã làm cho cái động và cái tĩnh đan xen, thêm phần sinh động, chặt chẽ trong bố cục tạo hình.',
          'Tổng thể tạo nên những hòa điệu tâm linh, triết lý, mang ý nghĩa sâu xa, gắn liền với mong ước về cuộc sống viên mãn, hạnh phúc.',
        ],
      },
      'ldh-nghi-mon-noi': {
        name: 'NGHI MÔN NỘI',
        subName: 'Inner Alter-Curtain',
        subtitle: 'Cổng tam quan nội dẫn vào Sân Rồng Đền Vua Lê',
        subtitles: [
          'Nghi môn nội được kết cấu theo kiểu Vì chồng giường Nghệ nhân khéo léo chạm khắc hình tượng rồng với hình ảnh quần tụ rất sinh động: rồng ngậm ngọc, rồng ổ, rồng đàn, đặc biệt dừng chân ở Nghi môn nội, du khách sẽ cảm nhận được những hình ảnh chạm khắc mang đậm nét dân gian.',
          'Người nghệ nhân xưa bằng khối óc và đôi bàn khéo léo đã đặc tả về hình ảnh hai cô tiên đang cưỡi rồng. Trong tư thế giang tay múa rất uyển chuyển, trang phục và nghệ thuật của các tiên nữ gợi cho du khách liên tưởng đến điệu múa của người vũ nữ Apsara.',
          'Nghi môn có lối kiến trúc, nghệ thuật chạm khắc, trang trí mang phong cách thời hậu Lê, thế kỷ XVII.',
          'Nghi môn có 3 gian, được kết cấu 3 hàng chân cột, ở đây nghi môn cũng là nơi giành cho du khách chỉnh trang y phục để thể hiện sự tôn nghiêm khi bước vào không gian thiêng liêng của di tích.',
        ],
      },
      'ldh-nha-tho-khong-tu': {
        name: 'NHÀ THỜ KHỔNG TỬ',
        subName: 'Confucius House',
        subtitle: 'Kiến trúc bên cánh tả nội tự Đền Vua Lê',
        subtitles: [
          'Nhà thờ đức Khổng Tử được xây dựng tọa lạc về phía bên trái của đền, kiến trúc kiểu chữ Đinh, niên đại triều Nguyễn. Hậu cung thờ bài vị của Khổng Tử và 4 vị học trò xuất sắc nhất của Khổng Tử đó là: Nhan Hồi, Tăng Tử , Tử Tư, Mạnh Tử.',
          'Khổng Tử sinh năm 551, mất năm 479 trước Công Nguyên, tại Ấp Trâu, Khúc Phụ nước Lỗ, nay thuộc tỉnh Sơn Đông, Trung Quốc.',
          'Khổng Tử một trong những người khai sáng ra học thuyết Nho giáo. một trong những học thuyết làm nền tảng tư tưởng của các triều đại phong kiến ở Phương Đông trong đó có Việt Nam.',
          'Hệ thống giáo lý triết học Nho giáo của Khổng Tử nhấn mạnh yếu tố đạo đức của mỗi cá nhân lẫn chính quyền, tính đúng đắn trong các mối quan hệ xã hội, sự công bằng, lòng nhân ái và tính chân thành.',
          'Đặc biệt, Khổng Tử luôn đề cao việc học, do đó Thờ đức Khổng Tử cũng là một cách thể hiện Việt Nam luôn chủ động tiếp thu có chọn lọc tinh hoa văn hóa nước ngoài để làm phong phú nền văn hóa Việt Nam đậm đà bản sắc dân tộc.',
        ],
      },
      'ldh-nha-tho-quan': {
        name: 'NHÀ THỜ QUAN',
        subName: "The Supervisor's House",
        subtitle: 'Nhà thờ Quan Giám Sát bên cánh hữu',
        subtitles: [
          'Nhà thờ quan giám sát là một kiến trúc nhỏ, tọa lạc về phía bên phải của đền, Nhà thờ được xây dựng theo kiểu chữ Đinh, niên đại triều Nguyễn. Hậu cung thờ bài vị của Tả giám quan và Hữu giám quan.',
        ],
      },
      'ldh-van-bia': {
        name: 'VĂN BIA',
        subName: 'The stele of the temple',
        subtitle: 'Hệ thống bia đá cổ hai bên sân Đền Vua Lê',
        subtitles: [
          'Trong số văn bia hiện lưu giữ tại di tích lịch sử văn hóa Cố đô Hoa Lư thì có duy nhất một văn bia hình hộp chữ nhật ở đền thờ vua Lê Đại Hành.',
          'Văn bia có tiêu đề “Trùng tu tạo tác thánh tượng tiền triều Lê Đại Hành hoàng đế bi ký tính danh”, ghi chép về việc trùng tu và tạo tác thánh tượng, niên hiệu Hoằng Định thập nhị niên (tức năm 1612).',
          'Bia được làm từ đá tự nhiên liền khối, có chiều cao 175 cm, chiều rộng 49 cm, gồm 3 phần: Chóp - thân và đế. Lòng bia khắc 48 dòng chữ theo chiều dọc với 1.356 chữ Hán.',
          'Diềm bia chạm khắc lưỡng Long chầu nhật, mặt nhật có nhiều tia sắc nhọn trông như ngọn lửa thiêng thiêu cháy mọi tà ma, bảo vệ sự trong sạch và an lành nơi đền thờ. Đế bia được điêu khắc giật cấp, trông vững chắc và uy nghi.',
          'Nội dung văn bia có kết cấu đầy đủ cả hai phần tự và minh, câu chữ sinh động: + Phần đầu là một đoạn văn ca ngợi Thánh nhân có công lao thì được muôn đời những lớp người nối tiếp dựng đền miếu thờ cúng bốn mùa.',
          '+ Tiếp đó là phần kể về Phong Quận công Bùi Thời Trung vâng lệnh Đô nguyên soái tổng quốc chính thượng phụ Bình An Vương khuyến khích quan viên xã Trường Yên hạ, hạng quân, hạng dân, phụ lão, thu thập gỗ chắp nối thước, tu sửa và làm ba pho thánh tượng.',
          'Đến ngày 19 tháng 6 năm Tân Hợi hưng công tạc tượng: Lê Đại Hành hoàng đế, Bảo quang Hoàng thái hậu, Ngọa triều hoàng đế. Ngày 24 tháng 6 năm Mậu Tý thì hoàn thành, sau đó đỏ xanh tô vẽ, son phấn tô màu, bảo tòa huy hoàng chiếu sáng.',
          'Ngày 24 tháng 7 cùng năm thì khai quang khánh thành, để có nơi quy y bốn mùa hương khói; Quốc đảo dân cầu đều ứng nghiệm, ơn mưa móc cho thiên hạ thái bình. + Sau phần kể tên người hưng công tu sửa đền là phần ghi địa chỉ mua vật liệu tạc tượng:',
          'Bản xã mua gỗ ở huyện Thạch Thành hết 1 quan 5 hào mang về làm lại ba pho thánh tượng. + Văn bia kết lại bằng một bài minh dài 14 câu, tóm lược công lao của Thánh nhân: Ở huyện Gia Viễn Có xã Trường Yên Là nơi thắng tích Đất vua lên ngôi Miếu hiệu:',
          'Lê Đại hành Hoàng đế Thái hậu hiệu Bảo Quang Ngọa triều Hoàng đế Nối tiếp trị vì Trong ngoài yên ổn Nước nhà thịnh đạt Bốn bên tỏ rõ Kính cẩn thay Thánh triều ghi rõ ở điển cũ.',
          'Văn bia còn lưu giữ tại Cố đô Hoa Lư kết đọng những giá trị về văn học nghệ thuật, lịch sử, tín ngưỡng tôn giáo, kinh tế, xã hội ...là những tài liệu quý giá, góp phần nghiên cứu nhiều mặt vùng đất có bề dày truyền thống lịch sử, văn hoá Cố đô Hoa Lư.',
        ],
      },
      'ldh-long-sang-san-rong': {
        name: 'LONG SÀNG',
        subName: 'Dragon bed',
        subtitle: 'Long Sàng đá tại Sân Rồng Đền Vua Lê',
        subtitles: [
          'Về hình thức và niên đại, Long sàng ở Trung tâm sân rồng cũng giống Long sàng ở phía ngoài Nghi môn ngoại: được tạc bằng tấm đá nguyên khối, niên đại triều Nguyễn.',
          'Nghệ thuật chạm khắc tinh xảo với sự hòa quyện giữa yếu tố quyền quý, uy nghiêm và yếu tố dân gian, bình dị.',
          'Bố cục chân quỳ dạ cá với 4 chân điêu khắc sinh động, phần giữa mỗi bề mặt phía dưới chân Long sàng tạo tác hình Hổ phù chính diện đại diện cho sức mạnh và điềm lành.',
          'Đền thờ vua Lê Đại Hành và đền thờ vua Đinh Tiên Hoàng xây dựng cùng niên đại thế kỷ XVII (thời Hậu Lê), mô phỏng theo lối kiến trúc cung điện nên về tổng thể 2 ngôi đền khá giống nhau.',
          'Tuy nhiên có những chi tiết khác biệt đó là: đền thờ vua Đinh Tiên Hoàng cao hơn đền thờ vua Lê Đại Hành, Long sàng đền thờ vua Đinh Tiên Hoàng chạm khắc tinh xảo với nhiều họa tiết trang trí, còn Long sàng đền thờ vua Lê Đại Hành nghệ thuật chạm khắc đơn giản hơn.',
          'Sự khác nhau này có thể do quan niệm “Hoàng Đinh thượng miếu, hoàng Lê hạ từ” thể hiện nét đẹp trong văn hóa Việt Nam mang ý nghĩa về sự tôn kính, đó là: vua Đinh Tiên Hoàng là người có công khai mở nhà nước độc lập, người đầu tiên khởi dựng kinh đô Hoa Lư còn vua Lê Đại Hành là người tướng tài kế tiếp sự nghiệp triều Đinh.',
        ],
      },
      'ldh-den-tho-vua': {
        name: 'ĐỀN THỜ VUA LÊ ĐẠI HÀNH',
        subName: 'Temple of the Le Dai Hanh King',
        subtitle: 'Bái đường – Thiêu hương – Chính cung Đền Hạ',
        subtitles: [
          'Đền thờ vua Lê Đại Hành hay còn được gọi là đền thờ vua Lê, được xây dựng thế kỷ XVII. Kiến trúc theo kiểu nội công (工), ngoại vi (囗), thần đạo lát hình chữ vương (王) giống như đền vua Đinh Tiên Hoàng.',
          'Đặc biệt, đền thờ vua Lê còn giữ được nhiều mảng điêu khắc đẹp của thời Hậu Lê. Nội điện kết cấu kiểu chữ công (工), gồm ba tòa: Bái đường, Thiêu hương và Chính cung.',
        ],
      },
    },
    coDoIntro: {
      subLabel: 'Giới thiệu',
      titleLine1: 'Di tích lịch sử - văn hóa',
      titleLine2: 'Cố đô Hoa Lư',
      dropcap: 'D',
      p1FirstRest:
        'i tích lịch sử - văn hóa Cố đô Hoa Lư là một quần thể di tích quốc gia đặc biệt. Lần đầu tiên trong lịch sử, Hoa Lư đã trở thành kinh đô của Nhà nước Phong kiến Trung ương tập quyền của Việt Nam. Nơi phát tích sự nghiệp 3 triều đại: Đinh - Tiền Lê và khởi đầu triều Lý.',
      p1: [
        'Năm 968, sau khi thống nhất đất nước, Đinh Bộ Lĩnh lên ngôi Hoàng đế, đặt Quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư “đắp thành đào hào, làm cung điện, đặt triều nghi”.',
        'Năm 980, vua Lê Đại Hành lên ngôi kế tục sự nghiệp triều Đinh, ông đã cho xây dựng rất nhiều cung điện nguy nga, tráng lệ.',
        'Trong điều kiện lịch sử của thế kỷ X, đất nước mới giành được độc lập tự chủ, chính quyền Phong kiến Trung ương tập quyền còn non trẻ. Vì vậy, Vua Đinh Tiên Hoàng và Vua Lê Đại Hành đã chọn vùng đất Hoa Lư hiểm trở để định đô, cũng là để xây dựng một quân thành kiên cố, “bất khả xâm phạm” đối phó với thù trong giặc ngoài.',
        'Năm 1010, để đặt nền tảng vững chắc và toàn diện cho sự hưng thịnh của quốc gia phong kiến độc lập, vua Lý Thái Tổ đã dời đô ra thành Đại La, sau đổi là Thăng Long (Hà Nội ngày nay). Hoa Lư trở thành cố đô.',
        'Trải qua thăng trầm của lịch sử, các cung điện không còn nữa. Tương truyền, sau khi vua Lý Thái Tổ dời đô, để tưởng nhớ công lao của các vị anh hùng dân tộc có công dựng nước và giữ nước, triều Lý đã cho xây dựng một ngôi đền quay hướng Bắc.',
        'Tuy nhiên, ngôi đền triều Lý xây dựng không còn nữa. Các triều đại kế tiếp vẫn luôn hướng về Hoa Lư, cho tu bổ thêm nhiều công trình văn hóa - lịch sử, để hôm nay du khách về thăm quan, chiêm bái Cố đô Hoa Lư có dịp tìm hiểu sâu sắc hơn về vùng đất - một thời đã là đế đô danh tiếng, hiện còn để lại nhiều dấu tích huy hoàng.',
      ],
      p2: [
        'Hiện nay, Cố đô Hoa Lư có hơn 30 di tích liên quan đến hai triều Đinh - Tiền Lê, đa dạng về loại hình thờ tự, gồm: lăng tẩm, đền, miếu, phủ, chùa. Một số di tích nổi tiếng như: chùa Nhất Trụ, Đền thờ Thục tiết công chúa, Phủ Kình Thiên, Xuyên Thủy động…',
        'Nhưng trong các di tích này tiêu biểu nhất, đặc sắc nhất phải kể đến là đền thờ vua Đinh Tiên Hoàng và đền thờ vua Lê Đại Hành. Hai công trình này được xây dựng và trùng tu kế tiếp nhau qua nhiều triều đại, nhưng hiện nay vẫn mang đậm nét phong cách kiến trúc thời Hậu Lê (Thế kỷ XVII).',
      ],
      videoCaption: 'Video cố đô Hoa Lư',
      photo1Caption: 'Cố đô Hoa Lư nhìn từ trên cao',
      photo2Caption: 'Toàn cảnh sân rồng Đền thờ vua Đinh Tiên Hoàng',
    },
    vuaDinhBio: {
      titleLine1: 'Thân thế và sự nghiệp',
      titleLine2: 'vua Đinh Tiên Hoàng',
      dropcap: 'V',
      p1Rest:
        'ua tên húy là Đinh Bộ Lĩnh, sinh năm Giáp Thân (924) ở thôn Kim Lư, làng Đại Hữu, Châu Đại Hoàng (nay là xã Gia Phương, huyện Gia Viễn, tỉnh Ninh Bình), cha của ông là Đinh Công Trứ - giữ chức Thứ sử Hoan Châu (nay là Nghệ An). Sau khi cha mất, Đinh Bộ Lĩnh về quê sống với mẹ Đàm Thị, hàng ngày đi chăn trâu cho chú và tập trận cờ lau. Từ bé Đinh Bộ Lĩnh đã tỏ ra là người có khả năng chỉ huy, ông cùng các bạn chăn trâu lấy bông lau làm cờ, dùng trâu làm ngựa, lấy đá thay vũ khí chia quân hai bên lập trận giả đánh nhau. Mỗi khi thắng trận các bạn tôn Đinh Bộ Lĩnh làm trưởng, khoanh chéo tay làm kiệu khiêng và cầm hoa lau đi hai bên để rước như nghi vệ Thiên tử.',
      portraitCaption: 'Tượng thờ Vua Đinh Tiên Hoàng',
      p2: [
        'Năm 944, Ngô Quyền băng hà, triều Ngô suy vong, các hào trưởng nổi lên cát cứ mỗi người một phương, sử gọi là loạn 12 sứ quân.',
        'Lúc này, yêu cầu cấp thiết là sớm chấm dứt nạn cát cứ để thống nhất đất nước. Người làm nên sứ mệnh lịch sử đó là Đinh Bộ Lĩnh. Đinh Bộ Lĩnh đã chiêu binh tụ nghĩa, lấy động Hoa Lư làm căn cứ ban đầu khởi nghiệp. Thấy lực lượng của mình lúc đầu còn yếu, Đinh Bộ Lĩnh đã liên kết với sứ quân Trần Lãm ở Bố Hải Khẩu (nay thuộc tỉnh Thái Bình). Thấy Bộ Lĩnh là người khôi ngô tuấn tú, có tài thao lược, Trần Lãm đã trao toàn bộ binh quyền. Đinh Bộ Lĩnh đã đưa toàn bộ lực lượng ở Bố Hải Khẩu về nhập với nghĩa binh ở động Hoa Lư. Thế và lực của nghĩa quân Hoa Lư đã lớn lên vượt bậc. Đinh Bộ Lĩnh quyết định vừa hưng binh đánh lớn vừa dụ hàng các sứ quân. Trận đầu ra quân Bộ Lĩnh dùng mưu dụ hàng sứ quân Phạm Bạch Hổ. Thừa thế, ông kéo quân đến đánh tan sứ quân Đỗ Cảnh Thạc, ông lại hành binh thần tốc phá sứ quân Nguyễn Siêu, hạ thành Đường Lâm của sứ quân Ngô Nhật Khánh như trở bàn tay. Quân của Lữ Đường cũng bị phá tan nhanh chóng. Đinh Bộ Lĩnh đánh đâu thắng đấy, uy danh lẫy lừng. Ba quân tướng sĩ tôn vinh là Vạn Thắng Vương.',
        'Năm 968, sau khi dẹp xong loạn, thống nhất đất nước, Đinh Bộ Lĩnh lên ngôi Hoàng đế, đặt Quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư, “định trăm quan, đặt sáu quân, chế độ gần đầy đủ”. Nước Nam ta chính thống kể từ đây.',
        'Như vậy, với việc Đinh Bộ Lĩnh xưng Hoàng đế, đặt Quốc hiệu và Niên hiệu riêng đã thể hiện ý chí và tinh thần tự tôn rất cao của dân tộc. Sau này tinh thần đó đã được Lý Thường Kiệt khẳng định như một chân lý: “Nam quốc sơn hà Nam đế cư” (Sông núi nước Nam vua Nam ở). Như một tiền định, các triều phong kiến kế tiếp: Tiền Lê - Lý - Trần - Lê - Nguyễn không trở lại xưng “Vương”, hay “Tiết độ sứ”, mà đều xưng “Đế”. Vì thế các bậc sử gia đã khẳng định Đinh Bộ Lĩnh là người mở nền chính thống, tôn vinh là Đinh Tiên Hoàng đế.',
        'Để củng cố nền độc lập thống nhất, vua Đinh Tiên Hoàng đã xây dựng bộ máy Nhà nước phong kiến Trung ương tập quyền. Năm 971, vua đặt thứ bậc và ban áo mũ cho các quan văn võ: Nguyễn Bặc được phong Định Quốc Công, Đinh Điền là Ngoại Giáp, Lê Hoàn là Thập đạo tướng quân, Lưu Cơ là Đô hộ phủ sĩ sư, Ngô Chân Lưu được ban hiệu là Khuông Việt Đại Sư... các con vua Đinh cũng được phong chức như: Đinh Liễn được phong Nam Việt Vương, Đinh Toàn được phong Vệ Vương.',
      ],
      p3: [
        'Để bảo vệ Nhà nước, Đinh Tiên Hoàng đã xây dựng lực lượng quân đội mạnh với 10 Đạo quân, Lê Hoàn được phong chức Thập đạo tướng quân. Quân sĩ được trang bị vũ khí, quần áo, đội mũ “tứ phương bình đính”. Lực lượng quân đội mạnh để đảm bảo cho đất nước được ổn định.',
        'Về Nông nghiệp: Nhà vua quan tâm khẩn hoang lập làng, mở rộng diện tích cày cấy ở vùng đồng bằng ven biển. Lữ Đường - một sứ quân hàng phục Đinh Bộ Lĩnh đã khẩn hoang ở vùng hữu ngạn sông Hồng.',
        'Về Kinh tế: Kinh tế hàng hóa đã hình thành trong nước và có sự giao thương với nước ngoài, Nhà nước có các xưởng thợ chuyên đúc tiền. Đinh Tiên Hoàng đã cho đúc tiền “Thái Bình hưng bảo” là đồng tiền đầu tiên của nước ta.',
        'Về Văn hóa - Nghệ thuật: Đinh Tiên Hoàng đã sử dụng nghệ thuật ca hát, diễn xướng để phục vụ quân đội, khích lệ tinh thần cho binh sĩ. Bà Phạm Thị Trân - người Hồng Châu (nay thuộc tỉnh Hưng Yên) dạy hát cho quân lính được phong chức Ưu Bà, về sau bà được mệnh danh là Tổ nghề hát chèo. Như vậy, kinh đô Hoa Lư là trung tâm của nghệ thuật hát chèo cung đình và Ninh Bình rất tự hào là một trong những cái nôi của nghệ thuật chèo nước ta từ thế kỷ X.',
        'Như vậy, dưới triều Đinh, tình hình kinh tế - văn hóa - xã hội nước ta đã đi vào ổn định và phát triển. Cuộc đời và sự nghiệp của vua Đinh Tiên Hoàng đã được khẳng định ông là vị anh hùng dân tộc có công thống nhất đất nước, xây dựng một Nhà nước phong kiến Trung ương tập quyền đầu tiên của Việt Nam. Sự nghiệp vĩ đại ấy được nhà sử học Lê Văn Hưu nhận xét: “Tiên Hoàng tài năng sáng suốt hơn người, dũng lược nhất đời. Đương lúc nước Việt ta không chủ, các hùng trưởng cát cứ, đánh một cái là 12 sứ quân thần phục hết rồi mở nước đóng đô, đổi xưng hoàng đế, đặt trăm quan, dựng sáu quân, chế độ gần đủ, chắc là ý trời vì nước Việt ta lại sinh ra bậc Thánh triết”.',
        'Tháng 10 năm Kỷ Mão (979), nhà vua băng hà, hưởng thọ 56 tuổi.',
        'Sau khi vua Đinh băng hà, triều thần đưa ấu chúa Đinh Toàn 6 tuổi lên nối ngôi. Nhưng bấy giờ, đất nước ta lại đứng trước họa xâm lăng. Để bảo vệ giang sơn xã tắc, Thái Hậu Dương Vân Nga cùng ba quân tướng sĩ suy tôn Lê Hoàn lên ngôi Hoàng đế, lập nên triều Tiền Lê.',
      ],
    },
    vuaLeDaiHanhBio: {
      titleLine1: 'Thân thế, sự nghiệp',
      titleLine2: 'của vua Lê Đại Hành',
      dropcap: 'V',
      p1FirstRest:
        'ua tên húy là Lê Hoàn, sinh năm Tân Sửu (tức năm 941), tại Châu Ái (nay là làng Trung Lập, xã Xuân Lập, huyện Thọ Xuân, tỉnh Thanh Hóa). Cha mẹ mất sớm, viên quan sát họ Lê nhận Lê Hoàn làm con nuôi.',
      p1Second:
        'Tuổi trưởng thành Lê Hoàn giúp cho Nam Việt Vương Đinh Liễn, con cả vua Đinh, ông tỏ rõ là người có chí lớn được Đinh Bộ Lĩnh khen là người trí dũng, giao cho cai quản quân sĩ. Khi đất nước xảy ra cuộc nội chiến 12 sứ quân, Lê Hoàn tham gia dẹp loạn, lập nhiều chiến công. Khi đất nước thống nhất, Đinh Tiên Hoàng phong cho Lê Hoàn giữ chức Thập đạo tướng quân.',
      p1Rest: [
        'Năm 980, triều Đinh kết thúc, Lê Hoàn lên ngôi Hoàng đế, lập nên triều Tiền Lê, niên hiệu Thiên Phúc.',
        'Sau khi đăng quang, vua Lê Đại Hành đã có hai chiến công hiển hách: kháng Tống bình Chiêm.',
        'Năm 980, quân Tống kéo sang xâm lược nước ta theo 2 đường thủy, bộ. Đạo quân của Hầu Nhân Bảo và Tôn Toàn Hưng kéo đến Lạng Sơn; đạo quân của Trần Khâm Tộ kéo đến Tây Kết. Đạo quân Lưu Trừng kéo quân đến sông Bạch Đằng. Trước thế giặc rất mạnh, nhà vua làm tướng để chỉ huy trận then chốt ở Bạch Đằng. Theo mưu kế của Ngô Quyền trước đây, ông sai quân sĩ đóng cọc ở sông Bạch Đằng để ngăn cản địch. Một trận quyết chiến đã diễn ra, quân Tống vấp phải sự chống trả quyết liệt của...',
      ],
      p2: [
        '...quân ta nên không thể tiến sâu được nữa, buộc phải trụ lại đối phó với sự bao vây tập kích của ta. Lê Hoàn đã thực hiện được chiến lược đánh nhanh, thắng nhanh, tiêu diệt gọn lực lượng thủy quân của giặc. Mặt khác, khi quân Tống kéo đến Chi Lăng, nhà vua sai người trá hàng, dụ bắt được tướng Hầu Nhân Bảo. Do đó thủy đội của Lưu Trừng phải rút quân. Trần Khâm Tộ nghe tin, rút quân tháo chạy. Nhà vua lại đem các tướng truy kích, quân ta bắt được nhiều tướng địch như Quách Quân Biện, Triệu Phụng Huân..., sứ nhà Tống là Hứa Trọng Tuyên cấp báo tình hình thua trận về triều, vua Tống xuống chiếu rút quân.',
        'Sau chiến thắng quân Tống ở phía Bắc, Lê Đại Hành tiếp tục chinh phạt Chiêm Thành ở phía Nam. Năm 982, nhà vua cử hai tướng Từ Mục và Ngô Tử Canh sang sứ Chiêm Thành, sứ giả của ta bị Chiêm Thành giam giữ. Nhà vua nổi giận bèn sai tướng sĩ sửa sang chiến thuyền, binh khí. Nhà vua làm tướng cầm quân đi đánh Chiêm Thành, bắt được nhiều tù binh. Đây là cuộc Nam phạt đầu tiên trong lịch sử của dân tộc ta.',
        'Công cuộc kháng Tống bình Chiêm hoàn toàn thắng lợi. Một lần nữa, nhân dân ta đã bằng sức chiến đấu của mình, khẳng định quyền làm chủ đất nước, bảo vệ vững chắc những thành quả đấu tranh và xây dựng của tổ tiên mình. Tên tuổi của Lê Đại Hành và quân tướng nhà Tiền Lê mãi khắc sâu vào lịch sử kháng chiến chống ngoại xâm bảo vệ Tổ quốc của nhân dân ta.',
        'Đất nước bình yên, vua Lê Đại Hành rất quan tâm đến việc ổn định tình hình trong nước, chăm lo củng cố nền thống nhất quốc gia. Năm 984, nhà vua cho đúc tiền “Thiên Phúc” để phục vụ cho việc trao đổi, mua bán.',
        'Vua còn chú trọng mở mang đường giao thông, hệ thống sông ngòi để vừa phục vụ cho giao thương, vừa phục vụ cho sản xuất nông nghiệp. Ông cho quân sĩ đào một con sông nối liền núi Đồng Cổ ở Đan Nê, Yên Định, Thanh Hóa đến sông Bà Hòa ở Đồng Hòa, Tĩnh Gia, Thanh Hóa, năm 983 thì hoàn thành. Năm 992, Lê Hoàn lệnh cho Phụ quốc là Ngô Tử An đem 3 vạn người đi đắp con đường bộ từ cửa biển Nam Giới (thuộc Cửa Sót, Thạch Hà, Hà Tĩnh) đến Châu Địa Lý (thuộc Quảng Bình). Năm 1003, Lê Hoàn đi Hoan Châu (nay là Nghệ An) ra lệnh vét sông Đa Cái đến An Củng Trường ở Châu Ái (nay là Thanh Hóa).',
      ],
      p3BeforePoem: [
        'Hệ thống các đơn vị hành chính, chính quyền địa phương cũng được tổ chức đầy đủ. Năm 1002, Lê Đại Hành đổi 10 Đạo thành Lộ, dưới Lộ là Phủ, Châu. Các Lộ, Châu có Quản giáp, Thứ sử, Trấn tướng.... trông coi. Lê Hoàn ban chức tước cho các tướng lĩnh và quan lại: Hồng Hiến giữ chức Thái sư, Từ Mục được phong chức Đại tổng quản, Phạm Cự Lượng làm Thái úy, Lý Công Uẩn giữ chức Tả thân vệ Điện tiền đô chỉ huy sứ, Ngô Tử An giữ chức Phụ quốc, Phí Sùng Đức giữ chức Chi hậu, Đinh Thừa Chính giữ chức Nha nội đô chỉ huy sứ.....',
        'Sau chiến tranh, Lê Đại Hành còn thể hiện sự khôn khéo trong việc đấu tranh ngoại giao với nhà Tống. Khi đón sứ Tống sang thăm, vua Lê đã cho người dẫn sứ giả đi vòng quanh để khoe nước ta biển rộng sông dài, cho quân lính reo hò để phô trương thanh thế.... Khi về nước, sứ Tống đã làm bài thơ ca ngợi vua Lê, trong đó có câu:',
      ],
      poem1: ['“Thiên ngoại hữu thiên ưng viễn chiếu', 'Khê đàm ba tĩnh kiếm thiềm thu”'],
      meaningLabel: 'Nghĩa là:',
      poem2: ['Ngoài trời (Tống) còn có trời xa nữa (chỉ nước ta)', 'Sông lặng khe đầm dưới bóng thu.'],
      p3AfterPoem: [
        'Cuộc đời và sự nghiệp của vua Lê Đại Hành được ghi nhận là vị anh hùng dân tộc, danh tướng lẫy lừng. Ông đã có công giữ vững độc lập, chủ quyền đất nước, mở đầu công cuộc Nam tiến, mở mang bờ cõi, củng cố nội trị, ngoại giao, đưa vị thế Đại Cồ Việt tiến lên một bước mới.',
        'Năm 1005, vua băng hà, hưởng thọ 65 tuổi.',
      ],
    },
    vuaLeLongDinhBio: {
      titleLine1: 'Thân thế, sự nghiệp',
      titleLine2: 'của vua Lê Long Đĩnh',
      dropcap: 'V',
      p1FirstRest:
        'ua tên húy là Chí Trung, sinh năm 985, con thứ 5 của vua Lê Đại Hành. Sau khi vua cha băng, Long Đĩnh lên nối ngôi.',
      p1Second:
        'Lên ngôi vua, Lê Long Đĩnh chấn chỉnh lại triều đình, đặt quan hệ với nhà Tống và đem quân đi trấn áp các cuộc nổi dậy của mán Cử Long (nay là Cẩm Thủy, Thanh Hóa) và những vùng xa.',
      paragraphs: [
        'Về ngoại giao, năm 1007, Long Đĩnh sai sứ là Minh Sưởng và chưởng thư ký là Hoàng Thành Nhã sang nhà Tống dâng biểu xin Cửu kinh và kinh sách Đại Tạng. Nhà Tống ưng thuận. Long Đĩnh còn cho người sang mua bán, trao đổi hàng hóa với người Tống ở Liêm Châu và trấn Như Hồng.',
        'Năm 1009, vua băng hà, hưởng thọ 24 tuổi.',
        'Triều Tiền Lê kết thúc, triều thần đã suy tôn Điện tiền đô chỉ huy sứ Lý Công Uẩn lên ngôi Hoàng đế, lập nên vương triều Lý.',
        'Năm 1010, để phát triển đất nước, nhà Lý dời đô từ Hoa Lư đến Thăng Long.',
      ],
    },
    duongVanNgaBio: {
      titleLine1: 'Thái hậu',
      titleLine2: 'Dương Vân Nga',
      dropcap: 'C',
      p1FirstRest:
        'hính sử ghi là Dương Hậu, có nghĩa là Hoàng Hậu họ Dương. Theo Hồ sơ khoa học về đình Mỹ Hạ, xã Gia Thủy, huyện Nho Quan, tỉnh Ninh Bình cho biết Thái hậu tên là Dương Vân Nga, con gái ông Dương Thế Hiển ở vùng đất thuộc huyện Nho Quan, tỉnh Ninh Bình.',
      p1Side:
        'Dương Vân Nga là người phụ nữ tiêu biểu trong lịch sử Việt Nam. Sử sách chép lại, khi vua Đinh Tiên Hoàng băng hà, Đinh Toàn 6 tuổi lên ngôi Hoàng đế. Nhân cơ hội đó, nhà Tống lăm le xâm lược, nước ta trong tình thế “ngàn cân treo sợi tóc”, ông vua 6 tuổi chưa đủ uy tín và tài năng để gánh vác sứ mệnh của giang sơn. Tổ quốc đang cần một người anh hùng tài đức để chèo lái con thuyền Đại Cồ Việt ra khỏi cơn binh lửa.',
      p1Rest: [
        'Trước tình hình đó, Thái hậu Dương Vân Nga đã hội triều để bàn kế hoạch chống giặc, sau lời đề cử của ba quân tướng sĩ, Thái hậu đã quyết định trao ngôi báu cho người tướng tài Lê Hoàn lên ngôi Hoàng đế để Lê Hoàn chuẩn bị cuộc kháng Tống, bình Chiêm giữ nước.',
        'Năm 982, sau khi kháng Tống bình Chiêm ca khúc khải hoàn, Lê Hoàn đã quyết định lập Vân Nga làm Hoàng hậu. Về việc này, các sử gia phong kiến phê phán Dương Vân Nga, nhưng khi đặt Dương Vân Nga vào bối cảnh của thời đại, càng nổi lên một tấm gương sáng về tinh thần yêu nước. Thái hậu đã trao toàn bộ sự nghiệp của Tổ quốc cho người tướng tài, đó là sự lựa chọn sáng suốt, một quyết định quan trọng bậc nhất của giờ phút lịch sử để tỏ rõ ý chí quyết tâm chống giặc. Việc làm đó phù hợp với lòng mong mỏi của quân dân.',
      ],
      p2: [
        'Thái hậu Dương Vân Nga đã hi sinh quyền lợi của con, của dòng tộc, lấy áo long cổn của nhà Đinh trao cho Lê Hoàn, tạo cơ sở pháp lý cho ông lên ngôi Hoàng đế. Việc Lê Hoàn kháng Tống, bình Chiêm đại thắng chứng tỏ hành động của Thái Hậu Dương Vân Nga là sáng suốt, thức thời. Trong hoàn cảnh đất nước lâm nguy, Thái hậu đã hành động theo ý nguyện của quân đội, chống lại ý nguyện đó sẽ làm cho lòng người phân tán, kẻ thù sẽ là người có lợi. Lê Hoàn lên ngôi đã giương cao ngọn cờ đánh ngoại xâm bảo vệ đất nước. Trao quyền cho Lê Hoàn là trao quyền cho người tướng tài mà Tổ quốc đang cần đến. Thái hậu Dương Vân Nga là người phụ nữ đã hi sinh quyền lợi của con, của dòng họ cho người tài thuộc dòng họ khác vì nền độc lập dân tộc. Thái hậu là người phụ nữ thức thời ở thế kỷ thứ 10.',
        'Sau khi mất, Thái hậu Dương Vân Nga được nhân dân tạc tượng thờ để tri ân công trạng.',
      ],
      p2Italic:
        'Đền thờ vua Lê Đại Hành là biểu tượng cho sự tôn kính, biết ơn của nhân dân cả nước nói chung và nhân dân Ninh Bình nói riêng đối với vị vua đã có công lớn trong việc gây dựng đất nước Đại Cồ Việt thái bình, thịnh trị. Nơi đây sẽ giúp bạn cảm nhận được lịch sử oai hùng một thời của nhà Tiền Lê.',
    },
  },

  en: {
    toc: {
      title: 'TOUR DIRECTORY',
      close: 'Close',
      items: {
        'so-do-den-dinh': 'Tour Map of\nKing Dinh Temple',
        'so-do-den-le': 'Tour Map of\nKing Le Temple',
        'tim-hieu-co-do': 'About Hoa Lu\nAncient Capital',
        'vua-dinh-tien-hoang': 'Life & Career of\nKing Dinh Tien Hoang',
        'vua-le-dai-hanh': 'Life & Career of\nKing Le Dai Hanh',
        'vua-le-long-dinh': 'Life & Career of\nKing Le Long Dinh',
        'duong-van-nga': 'Empress Dowager\nDuong Van Nga',
        'kien-truc': 'Architecture',
      },
      qrTitle: '📱 Hoa Lu Ancient Capital Audio Guide QR',
      qrDesc:
        'Scan the QR code with your phone to quickly open the Hoa Lu Ancient Capital Audio Guide.',
    },
    pano: {
      backToMap: (count) => `← Map (${count} spots)`,
      pointPill: (num, total) => `360° • Spot ${num}/${total}`,
      loading: 'Loading 360° Panorama view...',
      gestureHint: '↔️ Swipe to look 360° around the heritage site',
      nextSpotHint: (num, name) => `👉 Continue to Spot #${num}: ${name}`,
      prevBtn: '⏮ Prev Spot',
      nextBtn: 'Next Spot ⏭',
      showSub: 'Show narration ▲',
      hideSub: 'Collapse ▼',
    },
    dthMap: {
      titleLine1: 'SKETCH MAP OF THE TEMPLE OF',
      titleLine2: 'KING DINH TIEN HOANG',
      instruction: 'Tap on the items below to view detailed commentary',
    },
    ldhMap: {
      subScript: 'Commentary',
      mainHeading: 'KING LE DAI HANH TEMPLE',
      dropcap: 'K',
      introRest:
        'ing Le Dai Hanh Temple belongs to Truong Yen Ha commune (Nguyen Dynasty) and is also known as the Lower Temple (Den Ha). Built over 400 years ago, this ancient temple preserves the unique architectural artistry of the 17th century. Located just 300 meters north of King Dinh Tien Hoang Temple, it is renowned for its exquisite traditional wood carvings crafted by ancient master artisans.',
      sketchTitleVi: 'SKETCH MAP OF LE DAI HANH KING TEMPLE',
      sketchTitleEn: 'SƠ ĐỒ THAM QUAN ĐỀN THỜ VUA LÊ ĐẠI HÀNH',
      instruction: 'Tap on the items below to view detailed commentary',
    },
    hotspots: {
      'dth-ngo-mon-quan': {
        name: 'MERIDIAN GATE',
        subName: 'Ngọ Môn Quan',
        subtitle: 'Outer main gate leading into King Dinh Temple complex',
        subtitles: [
          'Spot 1: Meridian Gate (Ngo Mon Quan) – the main gateway opening into the solemn space of King Dinh Tien Hoang Temple.',
          'In front of the gate lies a crescent-shaped lotus pond, serving as a feng shui water-gathering element.',
          'The gate is built of monolithic green stone with curved tiled roofs and carvings of two dragons flanking the moon.',
          'Passing through the Meridian Gate leads directly onto the sacred stone pathway toward the main sanctuary.',
        ],
      },
      'dth-long-sang-ngoai': {
        name: 'DRAGON BED',
        subName: 'Long Sàng',
        subtitle: 'Monolithic stone Dragon Bed before the Outer Ceremonial Gate',
        subtitles: [
          'Spot 2: The Dragon Bed placed directly in front of the Outer Ceremonial Gate on the main sacred axis.',
          'Carved from a single block of green stone, its surface features a vivid, powerful relief of a winding dragon.',
          'Flanking the Dragon Bed are two stone mythical lions (Nghe) on high pedestals guarding the sacred precinct.',
          'Together with the Dragon Bed in the Dragon Courtyard, this pair has been recognized as a National Treasure of Vietnam.',
        ],
      },
      'dth-nghi-mon-ngoai': {
        name: 'OUTER ALTER-CURTAIN',
        subName: 'Nghi Môn Ngoại',
        subtitle: 'Ancient three-entrance wooden ceremonial gate',
        subtitles: [
          'Spot 3: Outer Ceremonial Gate (Nghi Mon Ngoai) – the main entrance into the outer wall of King Dinh Temple.',
          'The three-bay structure is supported by sturdy ironwood pillars and topped with a two-tier, eight-roof curved tile design.',
          'Its wooden beams and brackets are adorned with intricate openwork carvings of dragons, clouds, and chrysanthemums.',
          'Beyond the gate lies a tranquil, symmetrical garden flanking the sacred pathway.',
        ],
      },
      'dth-nghi-mon-noi': {
        name: 'INNER ALTER-CURTAIN',
        subName: 'Nghi Môn Nội',
        subtitle: 'Gateway into the Dragon Courtyard and Main Sanctuary',
        subtitles: [
          'Spot 4: Inner Ceremonial Gate (Nghi Mon Noi) – the second three-bay gate opening into the central Dragon Courtyard.',
          'Constructed of ironwood similar to the Outer Gate, it connects with the brick walls enclosing the inner sanctuary.',
          'Stepping through reveals the expansive stone-paved Dragon Courtyard leading to the Front Worship Hall.',
        ],
      },
      'dth-long-sang-san-rong': {
        name: 'DRAGON BED',
        subName: 'Long Sàng Sân Rồng',
        subtitle: 'National Treasure stone Dragon Bed at the Dragon Courtyard',
        subtitles: [
          'Spot 5: The Dragon Bed at the Dragon Courtyard, positioned at the center before the Front Worship Hall.',
          'A one-of-a-kind 17th-century stone sculpture masterpiece, featuring a dragon with human-like hands holding its horns amid clouds.',
          'Around the borders are lively carvings of carp transforming into dragons, phoenixes, mice, squirrels, and stylized foliage.',
          'Flanking the Dragon Bed are two tall stone flagpoles symbolizing the supreme authority of the Emperor of Dai Co Viet.',
        ],
      },
      'dth-den-tho-vua': {
        name: 'KING DINH TEMPLE',
        subName: 'Temple of the Dinh Tien Hoang King',
        subtitle: 'Front Hall – Incense Burning Hall – Main Sanctum',
        subtitles: [
          'Spot 6: Temple of King Dinh Tien Hoang – the central sanctuary comprising the Front Hall, Incense Hall, and Main Sanctum.',
          'The Incense Hall honors the Four Pillars of the Dinh Court: Nguyen Bac, Dinh Dien, Trinh Tu, and Luu Co.',
          'In the solemn Main Sanctum sits a bronze statue of Emperor Dinh Tien Hoang enthroned on a monolithic green stone pedestal.',
          'The left bay honors Prince Dinh Lien, while the right bay honors Dinh Toan and Prince Dinh Hang Lang.',
        ],
      },
      'dth-nha-trung-bay': {
        name: 'EXHIBITION ROOM',
        subName: 'Nhà Trưng Bày',
        subtitle: 'Archaeological artifacts of Hoa Lu Ancient Capital',
        subtitles: [
          'Spot 7: The Exhibition Room on the wing of the Dragon Courtyard preserves precious archaeological artifacts.',
          'On display are 10th-century citadel bricks inscribed "Dai Viet Quoc Quan Thanh Chuyen", lotus-tip tiles, and ancient ceramics.',
          'These relics are vivid testimony to the grand scale of Hoa Lu imperial palaces over a millennium ago.',
        ],
      },
      'dth-nha-khai-thanh': {
        name: 'KHAI THANH SHRINE',
        subName: "The Dinh king's parents",
        subName2: 'worshiping place',
        subtitle: 'Shrine dedicated to King Dinh’s parents',
        subtitles: [
          'Spot 8: Khai Thanh Shrine is dedicated to the parents of Emperor Dinh Tien Hoang.',
          'It honors his father Dinh Cong Tru – Governor of Hoan Chau – and his mother Dam Thi Thiem.',
          'The shrine embodies the Vietnamese tradition of filial piety and gratitude toward the parents of the national hero.',
        ],
      },
      'dth-nha-bia': {
        name: 'STELA HOUSE',
        subName: 'Nhà Bia',
        subtitle: 'Historical stone steles of King Dinh Temple',
        subtitles: [
          'Spot 9: The Stela House within the temple grounds shelters ancient stone steles across dynasties.',
          'Inscribed in Chinese characters, the steles praise King Dinh Tien Hoang’s unification of the country after quelling the 12 warlords.',
          'They also record the history of major restorations of the temple during the Later Le and Nguyen dynasties.',
        ],
      },
      'ldh-long-sang-ngoai': {
        name: 'DRAGON BED',
        subName: 'Long Sàng',
        subtitle: 'Stone Dragon Bed before the Outer Gate of King Le Temple',
        subtitles: [
          'Spot 1 (King Le Temple): The stone Dragon Bed placed directly before the Outer Ceremonial Gate on the main axis.',
          'Carved with majestic dragons, it symbolizes the royal authority of the Early Le Dynasty.',
        ],
      },
      'ldh-nghi-mon-ngoai': {
        name: 'OUTER ALTER-CURTAIN',
        subName: 'Nghi Môn Ngoại',
        subtitle: 'Outer three-bay ceremonial gate of King Le Temple',
        subtitles: [
          'Spot 2: Outer Ceremonial Gate opening from the square into the grounds of King Le Dai Hanh Temple.',
          'To the right of the main path behind the gate lies a large rectangular pond creating a serene landscape.',
        ],
      },
      'ldh-nghi-mon-noi': {
        name: 'INNER ALTER-CURTAIN',
        subName: 'Nghi Môn Nội',
        subtitle: 'Inner ceremonial gate leading to the Dragon Courtyard',
        subtitles: [
          'Spot 3: Inner Ceremonial Gate – the second gate along the sacred axis leading into the inner sanctuary of King Le Temple.',
          'Beyond the gate are two side pavilions and ornamental gardens leading up to the main Dragon Courtyard.',
        ],
      },
      'ldh-nha-tho-khong-tu': {
        name: 'CONFUCIUS HOUSE',
        subName: 'Nhà Thờ Khổng Tử',
        subtitle: 'Left-wing pavilion inside King Le Temple',
        subtitles: [
          'Spot 4: Confucius House located on the left wing of the inner courtyard of King Le Dai Hanh Temple.',
          'The structure reflects the tradition of honoring scholarship and the harmony of Confucianism, Buddhism, and Taoism.',
        ],
      },
      'ldh-nha-tho-quan': {
        name: "SUPERVISOR'S HOUSE",
        subName: 'Nhà Thờ Quan',
        subtitle: 'Right-wing shrine dedicated to court mandarins',
        subtitles: [
          'Spot 5: The Supervisor’s House on the right wing, symmetrical to Confucius House across the sacred pathway.',
          'It honors the civil and military mandarins who assisted the Early Le Dynasty in defeating the Song and pacifying Champa.',
        ],
      },
      'ldh-van-bia': {
        name: 'TEMPLE STELE',
        subName: 'Văn Bia',
        subtitle: 'Ancient stone steles flanking the courtyard of King Le Temple',
        subtitles: [
          'Spot 6: Stone steles placed symmetrically on both sides before the Dragon Courtyard of King Le Temple.',
          'They record Emperor Le Dai Hanh’s glorious victory over the Song in 981 and the restoration history of the temple.',
        ],
      },
      'ldh-long-sang-san-rong': {
        name: 'DRAGON BED',
        subName: 'Long Sàng',
        subtitle: 'Stone Dragon Bed at the Dragon Courtyard of King Le Temple',
        subtitles: [
          'Spot 7: The stone Dragon Bed at the center of the Dragon Courtyard before the Front Hall of King Le Dai Hanh Temple.',
          'Its surface and borders feature refined dragon carvings harmonizing with the ancient wooden architecture.',
        ],
      },
      'ldh-den-tho-vua': {
        name: 'KING LE DAI HANH TEMPLE',
        subName: 'Temple of the Le Dai Hanh King',
        subtitle: 'Front Hall – Incense Hall – Main Sanctum',
        subtitles: [
          'Spot 8: King Le Dai Hanh Temple – an ancient temple over 400 years old preserving 17th-century architectural art.',
          'The temple consists of three halls: Front Hall, Incense Hall honoring Grand Marshal Pham Cu Luong, and Main Sanctum.',
          'In the Main Sanctum, King Le Dai Hanh’s statue sits in the center, with Empress Duong Van Nga on the left and King Le Long Dinh on the right.',
        ],
      },
    },
    coDoIntro: {
      subLabel: 'Introduction',
      titleLine1: 'Historical - Cultural Relic',
      titleLine2: 'Hoa Lu Ancient Capital',
      dropcap: 'T',
      p1FirstRest:
        'he Historical and Cultural Relic of Hoa Lu Ancient Capital is a Special National Monument. For the first time in history, Hoa Lu became the capital of Vietnam’s centralized feudal state, marking the rise of three dynasties: the Dinh, the Early Le, and the beginning of the Ly Dynasty.',
      p1: [
        'In 968, after unifying the country, Dinh Bo Linh ascended the throne as Emperor, named the nation Dai Co Viet, and established the capital at Hoa Lu, building ramparts, digging moats, constructing palaces, and instituting court rites.',
        'In 980, Emperor Le Dai Hanh ascended the throne to continue the Dinh Dynasty’s cause and commissioned many magnificent palaces.',
        'In the historical context of the 10th century, when national independence had just been regained and the centralized state was still young, Emperors Dinh Tien Hoang and Le Dai Hanh chose the rugged terrain of Hoa Lu as an impregnable military stronghold against internal and external threats.',
        'In 1010, to lay a comprehensive foundation for a prosperous independent nation, Emperor Ly Thai To moved the capital to Dai La, renamed Thang Long (present-day Hanoi). Hoa Lu became the Ancient Capital.',
        'Through historical upheavals, the ancient palaces no longer remain. Legend holds that after moving the capital, the Ly Dynasty built a north-facing temple to honor the national heroes who founded and defended the nation.',
        'Subsequent dynasties continually restored and embellished cultural and historical monuments at Hoa Lu so that visitors today can explore the glorious legacy of this former imperial capital.',
      ],
      p2: [
        'Today, Hoa Lu Ancient Capital encompasses more than 30 monuments associated with the Dinh and Early Le dynasties, including royal tombs, temples, shrines, and pagodas such as Nhat Tru Pagoda, Princess Thuc Tiet Shrine, Kinh Thien Shrine, and Xuyen Thuy Cave.',
        'Among them, the most iconic are the temples of Emperor Dinh Tien Hoang and Emperor Le Dai Hanh. Restored across successive dynasties, both monuments prominently preserve the architectural style of the Later Le Dynasty (17th century).',
      ],
      videoCaption: 'Video of Hoa Lu Ancient Capital',
      photo1Caption: 'Aerial view of Hoa Lu Ancient Capital',
      photo2Caption: 'Panoramic view of the Dragon Courtyard at King Dinh Temple',
    },
    vuaDinhBio: {
      titleLine1: 'Life and Career of',
      titleLine2: 'King Dinh Tien Hoang',
      dropcap: 'T',
      p1Rest:
        'he King’s birth name was Dinh Bo Linh, born in the year of Giap Than (924) in Kim Lu hamlet, Dai Huu village, Dai Hoang prefecture (now Gia Phuong commune, Gia Vien district, Ninh Binh province). His father was Dinh Cong Tru, Governor of Hoan Chau (present-day Nghe An). After his father passed away, Dinh Bo Linh returned to his hometown with his mother Dam Thi, herding buffaloes and practicing mock battles with reed flags. Even as a child, he showed natural leadership: his friends used reeds as banners, buffaloes as steeds, and crossed their arms to carry him like an Emperor.',
      portraitCaption: 'Statue of Emperor Dinh Tien Hoang',
      p2: [
        'In 944, Ngo Quyen passed away and the Ngo court declined. Local warlords seized territories across the country, a period known in history as the Anarchy of the 12 Warlords.',
        'Ending the fragmentation to unify the nation became an urgent mission fulfilled by Dinh Bo Linh. Gathering righteous forces at Hoa Lu valley, he allied with warlord Tran Lam at Bo Hai Khau (Thai Binh), who entrusted his entire army to him. With growing strength, Dinh Bo Linh combined decisive military campaigns with diplomacy, subduing Pham Bach Ho, routing Do Canh Thac and Nguyen Sieu, capturing Ngo Nhat Khanh’s Duong Lam citadel, and defeating Lu Duong. Winning every battle, his troops hailed him as Van Thang Vuong (King of Ten Thousand Victories).',
        'In 968, having quelled the rebellion and unified the country, Dinh Bo Linh ascended the throne as Emperor, named the country Dai Co Viet with its capital at Hoa Lu, appointed civil and military mandarins, and organized six royal armies.',
        'By proclaiming himself Emperor and establishing a national name and reign era, Dinh Bo Linh affirmed Vietnam’s sovereign equality. Subsequent dynasties—Early Le, Ly, Tran, Le, and Nguyen—all maintained the title of Emperor ("De"), honoring him as Dinh Tien Hoang, founder of orthodox imperial legitimacy.',
        'In 971, he established court ranks and bestowed robes and hats upon civil and military officials: Nguyen Bac as Duke of Dinh Quoc, Dinh Dien as Ngoai Giap, Le Hoan as Commander-in-Chief of the Ten Armies, Luu Co as Grand Tutor, and Zen Master Ngo Chan Luu as Khuong Viet Dai Su.',
      ],
      p3: [
        'To defend the state, Dinh Tien Hoang organized a powerful military of 10 armies comprising 100,000 troops under Commander-in-Chief Le Hoan, equipped with weapons, uniforms, and four-cornered flat-top helmets.',
        'In Agriculture: The Emperor encouraged land reclamation and expanded cultivation across coastal deltas.',
        'In Economy: Domestic commerce and foreign trade flourished, and the state established royal mints. Dinh Tien Hoang cast "Thai Binh Hung Bao", the first bronze coinage in Vietnamese history.',
        'In Culture and Arts: He promoted singing and performance arts to inspire soldiers. Lady Pham Thi Tran taught singing to the troops and is revered as the founder of Vietnamese Cheo traditional opera, making Hoa Lu the cradle of royal Cheo art in the 10th century.',
        'Historian Le Van Huu praised him: "Tien Hoang possessed extraordinary wisdom and unmatched courage. When Vietnam had no ruler and warlords divided the land, in a single stroke he subdued all 12 warlords, founded the capital, proclaimed himself Emperor, appointed officials, and established six armies—truly Heaven’s will gave birth to a sage ruler for our nation."',
        'In October of the year Ky Mao (979), the Emperor passed away at the age of 56.',
        'After his passing, the 6-year-old prince Dinh Toan succeeded the throne while the Song Dynasty threatened invasion. To safeguard the nation, Empress Dowager Duong Van Nga and the military enthroned General Le Hoan as Emperor, founding the Early Le Dynasty.',
      ],
    },
    vuaLeDaiHanhBio: {
      titleLine1: 'Life and Career of',
      titleLine2: 'King Le Dai Hanh',
      dropcap: 'T',
      p1FirstRest:
        'he King’s given name was Le Hoan, born in 941 in Ai Chau (now Xuan Lap commune, Tho Xuan district, Thanh Hoa province). Orphaned at a young age, he was adopted by a local official of the Le family.',
      p1Second:
        'Growing up, Le Hoan served Prince Dinh Lien, eldest son of King Dinh. Admired by Dinh Bo Linh for his wisdom and bravery, he was entrusted with commanding troops, distinguishing himself in quelling the 12 warlords, and was appointed Commander-in-Chief of the Ten Armies (Thap Dao Tuong Quan).',
      p1Rest: [
        'In 980, as the Dinh Dynasty ended under threat of foreign invasion, Le Hoan ascended the throne as Emperor, founding the Early Le Dynasty with the reign era Thien Phuc.',
        'Following his coronation, Emperor Le Dai Hanh achieved two historic triumphs: defeating the Song invasion in the north and pacifying Champa in the south.',
        'In 980–981, Song forces invaded by land and sea under Generals Hau Nhan Bao, Ton Toan Hung, Tran Kham To, and Luu Trung. Commanding the decisive battle at the Bach Dang River, Emperor Le Dai Hanh planted wooden stakes in the riverbed, confronting the enemy with fierce resistance...',
      ],
      p2: [
        '...Halted and surrounded by ambushes, the Song naval forces were swiftly crushed. At Chi Lang, the Emperor used a feigned surrender to ambush and kill General Hau Nhan Bao, forcing Luu Trung and Tran Kham To to retreat in panic. Pursuing the enemy, Vietnamese forces captured generals Quach Quan Bien and Trieu Phung Huan, compelling the Song Emperor to order a full withdrawal.',
        'In 982, after Vietnamese envoys Tu Muc and Ngo Tu Canh were detained by Champa, Emperor Le Dai Hanh personally led a southern campaign, restoring peace and border security.',
        'The victories against the Song and Champa firmly safeguarded national independence and sovereignty, etching the name of Emperor Le Dai Hanh and the Early Le army into Vietnam’s history of national defense.',
        'In peacetime, Emperor Le Dai Hanh focused on national stability and economic growth. In 984, he minted "Thien Phuc" bronze coins for trade.',
        'He also pioneered canal dredging and road construction for commerce and agriculture—digging the canal from Dong Co Mountain to the Ba Hoa River in 983, building the overland route from Nam Gioi seaport to Dia Ly prefecture in 992, and dredging the Da Cai River in 1003.',
      ],
      p3BeforePoem: [
        'In 1002, he reorganized the 10 circuits into provinces (Lo), prefectures (Phu), and districts (Chau), appointing capable civil and military officials including Hong Hien, Tu Muc, Pham Cu Luong, and Ly Cong Uan.',
        'In diplomacy with the Song court, he combined firmness with flexibility. When receiving Song envoys, he showcased the country’s vast rivers and military strength. Returning home, the Song envoy composed a poem praising the Emperor:',
      ],
      poem1: ['“Beyond the sky lies another sky shining afar,', 'Calm streams and tranquil pools reflect the autumn moon.”'],
      meaningLabel: 'Meaning:',
      poem2: ['Beyond the northern sky (Song) lies another sovereign sky (Dai Co Viet),', 'Peaceful rivers and valleys beneath the autumn moonlight.'],
      p3AfterPoem: [
        'Emperor Le Dai Hanh is revered as a great national hero and brilliant strategist who defended independence, expanded the realm, and elevated the standing of Dai Co Viet.',
        'In 1005, the Emperor passed away at the age of 65.',
      ],
    },
    vuaLeLongDinhBio: {
      titleLine1: 'Life and Career of',
      titleLine2: 'King Le Long Dinh',
      dropcap: 'T',
      p1FirstRest:
        'he King’s given name was Chi Trung, born in 985 as the fifth son of Emperor Le Dai Hanh. After his father’s passing, Le Long Dinh ascended the throne.',
      p1Second:
        'Upon ascending the throne, Le Long Dinh reorganized the royal court, maintained diplomatic relations with the Song Dynasty, and led campaigns to pacify rebellions in Cu Long (now Cam Thuy, Thanh Hoa) and remote borderlands.',
      paragraphs: [
        'In diplomacy, in 1007 he sent envoys Minh Suong and Hoang Thanh Nha to the Song court to request the Nine Classics and the Buddhist Tripitaka, which the Song court granted. He also promoted cross-border trade at Liem Chau and Nhu Hong.',
        'In 1009, the King passed away at the age of 24.',
        'As the Early Le Dynasty ended, court officials enthroned Palace Guard Commander Ly Cong Uan as Emperor, founding the Ly Dynasty.',
        'In 1010, to foster national development, the Ly Dynasty moved the capital from Hoa Lu to Thang Long.',
      ],
    },
    duongVanNgaBio: {
      titleLine1: 'Empress Dowager',
      titleLine2: 'Duong Van Nga',
      dropcap: 'O',
      p1FirstRest:
        'fficial annals record her as Empress Duong. According to historical archives at My Ha communal house (Gia Thuy commune, Nho Quan district, Ninh Binh province), her name was Duong Van Nga, daughter of Duong The Hien of Nho Quan, Ninh Binh.',
      p1Side:
        'Duong Van Nga is one of the most iconic women in Vietnamese history. When Emperor Dinh Tien Hoang passed away, the 6-year-old prince Dinh Toan ascended the throne while the Song army massed at the border. At that critical hour, the nation needed a capable leader to steer Dai Co Viet through the storm of war.',
      p1Rest: [
        'Facing imminent invasion, Empress Dowager Duong Van Nga convened the court and, heeding the petition of the generals and troops, entrusted the throne to Commander-in-Chief Le Hoan so he could lead the nation against the Song invaders.',
        'In 982, after the triumphant campaigns against the Song and Champa, Emperor Le Hoan crowned Duong Van Nga as Empress. Viewed in the historical context of the 10th century, her decision to place national survival above family interest stands as a shining example of patriotism and political wisdom.',
      ],
      p2: [
        'By bestowing the imperial dragon robe upon Le Hoan, Empress Dowager Duong Van Nga provided the legitimate foundation for him to unite the army and defeat the foreign invaders. She sacrificed the private privilege of her young son and clan for a talented leader capable of defending national independence—a visionary woman of the 10th century.',
        'After her passing, the people erected statues to honor her lasting contributions to the nation.',
      ],
      p2Italic:
        'King Le Dai Hanh Temple stands as a symbol of deep reverence and gratitude of the Vietnamese people toward the rulers who built a peaceful and prosperous Dai Co Viet.',
    },
  },

  ko: {
    toc: {
      title: '관람 목차',
      close: '닫기',
      items: {
        'so-do-den-dinh': '딘 왕 사당\n관람 안내도',
        'so-do-den-le': '레 왕 사당\n관람 안내도',
        'tim-hieu-co-do': '호아르 고도\n유적지 소개',
        'vua-dinh-tien-hoang': '딘띠엔호앙 황제의\n생애와 업적',
        'vua-le-dai-hanh': '레다이한 황제의\n생애와 업적',
        'vua-le-long-dinh': '레롱딘 황제의\n생애와 업적',
        'duong-van-nga': '즈엉반응아\n태후',
        'kien-truc': '전통 건축',
      },
      qrTitle: '📱 호아르 고도 오디오 가이드 QR 코드',
      qrDesc:
        '스마트폰으로 QR 코드를 스캔하면 호아르 고도 해설 앱을 바로 열 수 있습니다.',
    },
    pano: {
      backToMap: (count) => `← 안내도 (${count}개 지점)`,
      pointPill: (num, total) => `360° • 지점 ${num}/${total}`,
      loading: '360° 파노라마 이미지를 불러오는 중...',
      gestureHint: '↔️ 화면을 밀어 유적지 주변을 360°로 둘러보세요',
      nextSpotHint: (num, name) => `👉 다음 지점 #${num}: ${name}(으)로 이동`,
      prevBtn: '⏮ 이전 지점',
      nextBtn: '다음 지점 ⏭',
      showSub: '해설 보기 ▲',
      hideSub: '접기 ▼',
    },
    dthMap: {
      titleLine1: '딘띠엔호앙 황제 사당',
      titleLine2: '관람 안내도',
      instruction: '아래 항목을 터치하면 상세 해설을 볼 수 있습니다',
    },
    ldhMap: {
      subScript: '해설 안내',
      mainHeading: '레다이한 황제 사당',
      dropcap: '레',
      introRest:
        '다이한 황제 사당은 쯔엉옌하 마을에 위치하여 하 사당(Đền Hạ)이라고도 불립니다. 400년이 넘은 이 고찰은 17세기 베트남 전통 목조 건축 예술의 정수를 그대로 간직하고 있으며, 딘띠엔호앙 황제 사당에서 북쪽으로 약 300m 떨어져 있습니다.',
      sketchTitleVi: '레다이한 황제 사당 관람 안내도',
      sketchTitleEn: 'SKETCH MAP OF LE DAI HANH KING TEMPLE',
      instruction: '아래 항목을 터치하면 상세 해설을 볼 수 있습니다',
    },
    hotspots: {
      'dth-ngo-mon-quan': {
        name: '오문관 (NGỌ MÔN QUAN)',
        subName: 'Meridian Gate',
        subtitle: '딘 왕 사당 유적지로 들어가는 외문',
        subtitles: [
          '1번 지점: 오문관(Ngọ Môn Quan) – 딘띠엔호앙 황제 사당의 장엄한 공간을 여는 첫 번째 관문입니다.',
          '오문관 앞에는 반달 모양의 연못(반월호)이 있어 동양 풍수의 명당수를 이룹니다.',
          '청석 일체형 기단 위에 곡선형 기와지붕을 얹고 쌍룡조월 문양을 정교하게 조각했습니다.',
          '오문관을 지나면 본전으로 이어지는 청석 신도(神道)가 펼쳐집니다.',
        ],
      },
      'dth-long-sang-ngoai': {
        name: '용상 (LONG SÀNG)',
        subName: 'Dragon bed',
        subtitle: '외의문 앞에 놓인 석조 용상',
        subtitles: [
          '2번 지점: 외의문 바로 앞 신도 중앙에 자리한 석조 용상(Long Sàng)입니다.',
          '하나의 거대한 청석을 깎아 만들었으며 표면에 역동적인 용 문양이 부조되어 있습니다.',
          '용상 양옆에는 높은 석좌 위에 해태(Nghê) 한 쌍이 신성한 공간을 수호하고 있습니다.',
          '용정의 용상과 함께 베트남 국보(Bảo vật Quốc gia)로 지정된 걸작입니다.',
        ],
      },
      'dth-nghi-mon-ngoai': {
        name: '외의문 (NGHI MÔN NGOẠI)',
        subName: 'Outer Alter-Curtain',
        subtitle: '고풍스러운 3칸 목조 삼관문',
        subtitles: [
          '3번 지점: 외의문(Nghi Môn Ngoại) – 딘띠엔호앙 황제 사당의 외성으로 들어가는 정문입니다.',
          '견고한 철목(Gỗ lim) 기둥으로 세운 3칸 구조에 2층 8지붕 곡선 기와를 얹었습니다.',
          '서까래와 목조 부재에는 용과 구름, 국화 덩굴 문양이 섬세하게 조각되어 있습니다.',
          '외의문을 지나면 신도를 중심으로 대칭을 이루는 푸른 정원이 나타납니다.',
        ],
      },
      'dth-nghi-mon-noi': {
        name: '내의문 (NGHI MÔN NỘI)',
        subName: 'Inner Alter-Curtain',
        subtitle: '용정과 본전 구역으로 통하는 내문',
        subtitles: [
          '4번 지점: 내의문(Nghi Môn Nội) – 중앙 용정(내성)으로 들어가는 두 번째 삼관문입니다.',
          '외의문과 같은 3칸 철목 구조로 내성을 감싸는 벽돌 담장과 연결되어 있습니다.',
          '내의문을 들어서면 배당으로 이어지는 넓은 석조 용정(Sân Rồng)이 펼쳐집니다.',
        ],
      },
      'dth-long-sang-san-rong': {
        name: '용상 (LONG SÀNG)',
        subName: 'Dragon bed',
        subtitle: '용정 중앙에 자리한 국보 석조 용상',
        subtitles: [
          '5번 지점: 배당 앞 용정 정중앙에 놓인 석조 용상입니다.',
          '17세기 베트남 석조 조각의 독보적인 걸작으로 구름 속에서 용이 뿔을 잡고 있는 독특한 형상을 하고 있습니다.',
          '테두리에는 잉어가 용으로 변하는 모습, 봉황, 쥐, 다람쥐와 꽃무늬가 생동감 있게 조각되어 있습니다.',
          '양옆의 높은 돌 깃대는 다이꼬비엣 황제의 지고한 권위를 상징합니다.',
        ],
      },
      'dth-den-tho-vua': {
        name: '딘 왕 사당 본전',
        subName: 'Temple of the Dinh Tien Hoang King',
        subtitle: '배당 – 소향전 – 정궁',
        subtitles: [
          '6번 지점: 딘띠엔호앙 황제 사당 – 배당, 소향전, 정궁의 3채로 이루어진 중심 건축물입니다.',
          '소향전에는 딘 왕조의 사주(四柱) 대신인 응우옌박, 딘디엔, 찐뚜, 르우꺼를 모시고 있습니다.',
          '가장 엄숙한 정궁에는 청석 대좌 위에 딘띠엔호앙 황제의 청동 어진이 봉안되어 있습니다.',
          '좌측에는 남월왕 딘리엔, 우측에는 위왕 딘또안과 딘항랑 황자를 모시고 있습니다.',
        ],
      },
      'dth-nha-trung-bay': {
        name: '전시관 (NHÀ TRƯNG BÀY)',
        subName: 'Exhibition room',
        subtitle: '호아르 고도 고고학 유물 전시관',
        subtitles: [
          '7번 지점: 용정 옆에 위치한 전시관으로 귀중한 고고학 유물을 보관하고 있습니다.',
          '‘대월국군성전’ 글자가 새겨진 10세기 성벽 벽돌, 연꽃무늬 기와, 도자기 등이 전시되어 있습니다.',
          '천 년 전 호아르 황궁의 웅장한 규모를 보여주는 생생한 역사적 증거입니다.',
        ],
      },
      'dth-nha-khai-thanh': {
        name: '계성사 (NHÀ KHẢI THÁNH)',
        subName: "The Dinh king's parents",
        subName2: 'worshiping place',
        subtitle: '딘 황제의 부모님을 모신 사당',
        subtitles: [
          '8번 지점: 계성사(Nhà Khải Thánh)는 딘띠엔호앙 황제의 부모님을 모신 사당입니다.',
          '부친인 환주 자사 딘꽁쯔와 모친 담티티엠 여사를 배향하고 있습니다.',
          '민족 영웅을 낳아 기른 부모님에 대한 효심과 감사의 전통을 보여줍니다.',
        ],
      },
      'dth-nha-bia': {
        name: '비각 (NHÀ BIA)',
        subName: 'Stela House',
        subtitle: '딘 왕 사당의 역사 비석을 보존한 비각',
        subtitles: [
          '9번 지점: 사당 경내에 위치한 비각으로 여러 왕조의 고대 석비를 보호하고 있습니다.',
          '한자로 새겨진 비문에는 12사군의 난을 평정하고 나라를 통일한 딘 황제의 공적이 기록되어 있습니다.',
          '또한 후레 왕조와 응우옌 왕조 시대의 사당 중수 역사도 함께 전해줍니다.',
        ],
      },
      'ldh-long-sang-ngoai': {
        name: '용상 (LONG SÀNG)',
        subName: 'Dragon bed',
        subtitle: '레 왕 사당 외의문 앞 석조 용상',
        subtitles: [
          '1번 지점(레 왕 사당): 외의문 앞 중심축에 놓인 석조 용상입니다.',
          '위엄 있는 용 조각은 전레(Tiền Lê) 왕조의 황권을 상징합니다.',
        ],
      },
      'ldh-nghi-mon-ngoai': {
        name: '외의문 (NGHI MÔN NGOẠI)',
        subName: 'Outer Alter-Curtain',
        subtitle: '레다이한 황제 사당의 외삼문',
        subtitles: [
          '2번 지점: 광장에서 레다이한 황제 사당 경내로 들어가는 외삼문입니다.',
          '외의문 뒤편 우측에는 큰 직사각형 연못이 있어 고즈넉한 풍경을 자아냅니다.',
        ],
      },
      'ldh-nghi-mon-noi': {
        name: '내의문 (NGHI MÔN NỘI)',
        subName: 'Inner Alter-Curtain',
        subtitle: '레 왕 사당 용정으로 이어지는 내삼문',
        subtitles: [
          '3번 지점: 신도를 따라 내성 구역으로 들어가는 두 번째 삼관문입니다.',
          '내의문을 지나면 양옆의 익랑과 정원을 거쳐 본전 용정에 이릅니다.',
        ],
      },
      'ldh-nha-tho-khong-tu': {
        name: '공자 사당 (NHÀ THỜ KHỔNG TỬ)',
        subName: 'Confucius House',
        subtitle: '내성 좌측에 위치한 건축물',
        subtitles: [
          '4번 지점: 레다이한 황제 사당 내성 좌측에 자리한 공자 사당입니다.',
          '학문을 숭상하던 전통과 유·불·도 삼교의 조화를 보여줍니다.',
        ],
      },
      'ldh-nha-tho-quan': {
        name: '관료 사당 (NHÀ THỜ QUAN)',
        subName: "The Supervisor's House",
        subtitle: '우측에 위치한 감찰관 배향 사당',
        subtitles: [
          '5번 지점: 신도를 사이에 두고 공자 사당과 대칭을 이루는 우측 사당입니다.',
          '전레 왕조를 도와 송나라를 물리치고 참파를 평정한 문무 대신들을 모시고 있습니다.',
        ],
      },
      'ldh-van-bia': {
        name: '문비 (VĂN BIA)',
        subName: 'The stele of the temple',
        subtitle: '용정 양옆에 세워진 고대 석비',
        subtitles: [
          '6번 지점: 용정 앞 좌우에 대칭으로 세워진 레 왕 사당의 비각입니다.',
          '981년 송나라 군대를 격파한 레다이한 황제의 전승 업적과 사당 중수 역사를 기록하고 있습니다.',
        ],
      },
      'ldh-long-sang-san-rong': {
        name: '용상 (LONG SÀNG)',
        subName: 'Dragon bed',
        subtitle: '레 왕 사당 용정의 석조 용상',
        subtitles: [
          '7번 지점: 레다이한 황제 사당 배당 앞 용정 중앙에 놓인 석조 용상입니다.',
          '정교한 용 조각이 고풍스러운 목조 건축 공간과 조화를 이룹니다.',
        ],
      },
      'ldh-den-tho-vua': {
        name: '레다이한 황제 사당',
        subName: 'Temple of the Le Dai Hanh King',
        subtitle: '배당 – 소향전 – 정궁',
        subtitles: [
          '8번 지점: 400년 이상 된 고찰로 17세기 건축 예술을 온전히 간직한 중심 전각입니다.',
          '배당, 태위 팜끄르엉을 모신 소향전, 그리고 정궁의 3채로 구성되어 있습니다.',
          '정궁 중앙에는 레다이한 황제, 좌측에는 즈엉반응아 태후, 우측에는 레롱딘 황제의 어진이 모셔져 있습니다.',
        ],
      },
    },
    coDoIntro: {
      subLabel: '소개',
      titleLine1: '역사 · 문화 유적지',
      titleLine2: '호아르 고도 (Cố đô Hoa Lư)',
      dropcap: '호',
      p1FirstRest:
        '아르 고도 역사·문화 유적지는 베트남 특별 국가 유적지입니다. 역사상 최초로 베트남 중앙집권 봉건 국가의 수도가 된 곳으로, 딘(Đinh) 왕조와 전레(Tiền Lê) 왕조, 그리고 리(Lý) 왕조 초기의 역사가 시작된 발상지입니다.',
      p1: [
        '968년 나라를 통일한 딘보린(Đinh Bộ Lĩnh)은 황제에 즉위하여 국호를 다이꼬비엣(Đại Cồ Việt, 대거월)이라 정하고 호아르에 도읍을 세워 성벽과 해자를 쌓고 궁궐과 조회 의례를 마련했습니다.',
        '980년 레다이한 황제가 제위를 이어받아 수많은 웅장하고 화려한 궁전을 건립했습니다.',
        '10세기 당시 독립을 갓 되찾은 젊은 중앙집권 국가를 수호하기 위해 딘띠엔호앙 황제와 레다이한 황제는 험준한 석회암 산지로 둘러싸인 호아르를 난공불락의 군사 수도로 삼았습니다.',
        '1010년 리태조(Lý Thái Tổ) 황제가 국가의 장구한 번영을 위해 수도를 다이라(탕롱, 오늘날의 하노이)로 천도하면서 호아르는 고도(옛 수도)가 되었습니다.',
        '세월의 흐름 속에 옛 궁궐은 사라졌으나, 후대 왕조들은 나라를 세우고 지킨 영웅들을 기리기 위해 이곳에 사당과 문화유산을 지속적으로 중수하여 오늘날까지 찬란한 유적을 남겼습니다.',
        '오늘날 호아르 고도를 찾는 방문객들은 한때 번영했던 제국의 수도이자 유서 깊은 역사 현장을 깊이 체험할 수 있습니다.',
      ],
      p2: [
        '현재 호아르 고도에는 딘 왕조와 전레 왕조에 관련된 능묘, 사당, 사원 등 30여 개의 유적이 남아 있으며, 일주사(Chùa Nhất Trụ), 툭띠엣 공주 사당, 낀티엔 부, 수이엔투이 동굴 등이 유명합니다.',
        '그중에서도 가장 대표적인 유적은 딘띠엔호앙 황제 사당과 레다이한 황제 사당으로, 여러 왕조의 중수를 거치며 17세기 후레 시대의 독창적인 건축 양식을 고스란히 간직하고 있습니다.',
      ],
      videoCaption: '호아르 고도 소개 영상',
      photo1Caption: '하늘에서 바라본 호아르 고도 전경',
      photo2Caption: '딘띠엔호앙 황제 사당 용정 전경',
    },
    vuaDinhBio: {
      titleLine1: '생애와 업적',
      titleLine2: '딘띠엔호앙 황제',
      dropcap: '황',
      p1Rest:
        '제의 휘는 딘보린(Đinh Bộ Lĩnh)이며 924년(갑신년) 대황주 대유마을(현재 닌빈성 자비엔현 자프엉사)에서 환주 자사 딘꽁쯔의 아들로 태어났습니다. 부친이 일찍 세상을 떠나자 모친 담씨와 함께 고향으로 돌아와 숙부의 물소를 치며 갈대 깃발로 진법 훈련을 했습니다. 어린 시절부터 뛰어난 통솔력을 보인 그는 친구들과 갈대를 깃발로 삼아 모의 전투를 벌였고, 승리할 때마다 아이들은 팔짱을 껴 가마를 만들고 갈대꽃을 들고 천자의 행차처럼 그를 모셨습니다.',
      portraitCaption: '딘띠엔호앙 황제 어진 조각상',
      p2: [
        '944년 응오꾸옌이 승하하자 응오 왕조가 쇠퇴하고 각지의 호족들이 할거하는 ‘12사군의 난’이 일어났습니다.',
        '나라의 분열을 끝내고 통일을 이룩할 역사적 사명을 완수한 인물이 바로 딘보린이었습니다. 호아르 계곡을 거점으로 의병을 모은 그는 보하이커우(타이빈성)의 사군 쩐람과 연합하여 전군 통수권을 물려받았습니다. 세력이 크게 강성해진 딘보린은 지략과 무력을 겸비하여 팜박호를 귀순시키고 도깐탁, 응우옌시에우, 응오녓칸, 르즈엉의 군대를 차례로 격파했습니다. 백전백승의 위명으로 장병들은 그를 만승왕(Vạn Thắng Vương)이라 칭송했습니다.',
        '968년 내란을 평정하고 천하를 통일한 딘보린은 황제에 올라 국호를 다이꼬비엣이라 하고 호아르에 도읍을 정했으며 백관과 육군(六軍) 제도를 정비했습니다.',
        '스스로 황제(Đế)를 칭하고 독자적인 국호와 연호를 세운 것은 민족의 자주독립 의지를 천명한 사건으로, 이후 전레·리·쩐·레·응우옌 왕조가 모두 황제를 칭하는 정통의 기틀을 열었습니다.',
        '971년 문무백관의 품계를 정하여 응우옌박을 정국공, 딘디엔을 외갑, 레호안을 십도장군, 고승 응오쩐르우를 광월대사로 봉했습니다.',
      ],
      p3: [
        '국방을 굳건히 하기 위해 10도의 군대를 편성하고 레호안을 십도장군에 임명하여 무기와 복식을 갖춘 강력한 군대를 양성했습니다.',
        '농업과 경제 면에서는 해안 평야 개간을 장려하고 수공업과 교역을 발전시켰으며, 베트남 역사상 최초의 동전인 ‘태평흥보(Thái Bình hưng bảo)’를 주조했습니다.',
        '문화·예술 면에서는 팜티쩐 여사를 우바(Ưu Bà)로 봉해 병사들에게 노래와 연희를 가르치게 했으며, 이는 베트남 전통 가극 쩨오(Chèo) 예술의 기원이 되었습니다.',
        '역사가 레반흐우는 “선황은 재능과 지혜가 남다르고 용략이 당대 으뜸으로, 단숨에 12사군을 복속시키고 나라를 열어 황제를 칭했으니 하늘이 베트남을 위해 내린 성철(聖哲)이다”라고 찬탄했습니다.',
        '979년(기묘년) 10월, 황제는 향년 56세로 붕어했습니다.',
        '황제 사후 6세의 어린 왕자 딘또안이 즉위했으나 송나라의 침략 위기가 닥치자, 즈엉반응아 태후와 장병들은 구국을 위해 십도장군 레호안을 황제로 추대하여 전레 왕조를 열었습니다.',
      ],
    },
    vuaLeDaiHanhBio: {
      titleLine1: '생애와 업적',
      titleLine2: '레다이한 황제',
      dropcap: '황',
      p1FirstRest:
        '제의 휘는 레호안(Lê Hoàn)이며 941년(신축년) 애주(현재 탄호아성 토쑤언현)에서 태어났습니다. 일찍 부모를 여의고 레씨 성을 가진 지방 관리의 양자로 자랐습니다.',
      p1Second:
        '장성한 레호안은 딘 황제의 장남 남월왕 딘리엔을 보좌하며 뛰어난 지략과 용맹을 인정받아 12사군 평정에 큰 공을 세웠고, 통일 후 십도장군(총사령관)에 임명되었습니다.',
      p1Rest: [
        '980년 딘 왕조가 막을 내리고 외침의 위기 속에서 레호안은 황제에 올라 전레(Tiền Lê) 왕조를 세우고 연호를 천복(Thiên Phúc)이라 했습니다.',
        '즉위 후 레다이한 황제는 북쪽의 송나라 침략군을 격퇴하고 남쪽의 참파를 평정하는 두 가지 위대한 전공을 세웠습니다.',
        '980~981년 송나라 군대가 수륙 양면으로 침공해 오자, 황제는 직접 장수가 되어 박당강(Sông Bạch Đằng) 결전을 지휘하며 강바닥에 말뚝을 박아 송군을 크게 무찔렀습니다...',
      ],
      p2: [
        '...아군의 매복과 포위 공격에 막힌 송나라 수군은 궤멸되었고, 찌랑(Chi Lăng)에서는 거짓 항복 계책으로 적장 후인보를 사로잡아 참수함으로써 송군의 전면 퇴각을 이끌어냈습니다.',
        '982년에는 참파에 억류된 사신 사건을 계기로 친정을 단행하여 남방 변경의 안정을 확립했습니다.',
        '항송평참(抗宋平占)의 대승은 국가의 독립과 주권을 굳건히 수호한 빛나는 역사로 기록되었습니다.',
        '평화를 되찾은 후 황제는 내정을 안정시키고 984년 ‘천복전(Thiên Phúc)’ 동전을 주조하여 상업을 진흥시켰습니다.',
        '또한 983년 동고산에서 바호아강까지 운하를 파고, 992년 남계 해구에서 지리주까지 육로를 축조하는 등 수로와 교통망을 대대적으로 확충했습니다.',
      ],
      p3BeforePoem: [
        '1002년에는 전국 10도를 노(Lộ)·부(Phủ)·주(Châu)의 지방 행정 체계로 개편하고 홍히엔, 뜨묵, 팜끄르엉, 리꽁우언 등 유능한 인재를 등용했습니다.',
        '전쟁 후 송나라와의 외교에서도 기민하고 당당한 태도를 보여 송나라 사신이 귀국하며 황제를 칭송하는 시를 남겼습니다:',
      ],
      poem1: ['“하늘 밖에도 또 다른 하늘이 있어 멀리 비추고,', '시내와 연못의 물결 고요한데 가을 달빛만 비치네.”'],
      meaningLabel: '의미:',
      poem2: ['북쪽 하늘(송나라) 밖에도 또 다른 자주국의 하늘(다이꼬비엣)이 있으며,', '가을 달빛 아래 강과 계곡이 평화롭고 고요함을 뜻합니다.'],
      p3AfterPoem: [
        '레다이한 황제는 독립과 주권을 수호하고 영토와 외교적 위상을 드높인 위대한 민족 영웅으로 추앙받고 있습니다.',
        '1005년 황제는 향년 65세로 붕어했습니다.',
      ],
    },
    vuaLeLongDinhBio: {
      titleLine1: '생애와 업적',
      titleLine2: '레롱딘 황제',
      dropcap: '황',
      p1FirstRest:
        '제의 휘는 찌쭝(Chí Trung)이며 985년 레다이한 황제의 다섯째 아들로 태어나 부황 사후 제위를 계승했습니다.',
      p1Second:
        '즉위 후 조정을 정비하고 송나라와 외교 관계를 맺었으며 변방의 반란을 평정했습니다.',
      paragraphs: [
        '1007년 사신 민쓰엉과 황탄냐를 송나라에 보내 구경(九經)과 불교 대장경을 청하여 반입했고, 국경 교역을 활성화했습니다.',
        '1009년 향년 24세로 붕어했습니다.',
        '전레 왕조가 끝나고 조정 대신들은 전전도지휘사 리꽁우언(Lý Công Uẩn)을 황제로 추대하여 리(Lý) 왕조를 열었습니다.',
        '1010년 국가 발전을 위해 리 왕조는 수도를 호아르에서 탕롱(하노이)으로 천도했습니다.',
      ],
    },
    duongVanNgaBio: {
      titleLine1: '태후',
      titleLine2: '즈엉반응아 (Dương Vân Nga)',
      dropcap: '정',
      p1FirstRest:
        '사에는 양후(Dương Hậu)로 기록되어 있으며, 닌빈성 뇨꽌현 자투이사 미하 사당의 사료에 따르면 태후의 이름은 즈엉반응아로 즈엉테히엔 공의 딸입니다.',
      p1Side:
        '즈엉반응아 태후는 베트남 역사상 가장 대표적인 여걸 중 한 분입니다. 딘띠엔호앙 황제가 급서하고 6세의 어린 딘또안이 즉위한 틈을 타 송나라 대군이 침략을 준비하자, 백척간두의 위기에 처한 나라에는 난국을 헤쳐 나갈 영웅이 절실히 필요했습니다.',
      p1Rest: [
        '이에 즈엉반응아 태후는 중신 회의를 소집하고 삼군 장병들의 추대에 따라 나라를 구하기 위해 십도장군 레호안에게 황제의 자리를 선양했습니다.',
        '982년 송군 격퇴와 참파 평정의 대승을 거둔 후 레호안은 그녀를 황후로 책봉했습니다. 시대적 배경 속에서 가문의 사사로운 이익보다 조국의 안위를 먼저 생각한 태후의 결단은 빛나는 애국심의 본보기로 평가받습니다.',
      ],
      p2: [
        '어린 아들과 가문의 권리를 내려놓고 딘 왕조의 용포를 레호안에게 직접 입혀 준 태후의 현명한 결단 덕분에 민심과 군심이 하나로 뭉쳐 외침을 물리칠 수 있었습니다.',
        '서거 후 백성들은 태후의 높은 공덕을 기려 조각상을 세우고 모셨습니다.',
      ],
      p2Italic:
        '레다이한 황제 사당은 태평성대를 이룩한 황제와 태후에 대한 베트남 국민의 깊은 존경과 감사를 상징하는 역사적 성지입니다.',
    },
  },

  fr: {
    toc: {
      title: 'SOMMAIRE DE LA VISITE',
      close: 'Fermer',
      items: {
        'so-do-den-dinh': 'Plan de visite du\ntemple du roi Dinh',
        'so-do-den-le': 'Plan de visite du\ntemple du roi Le',
        'tim-hieu-co-do': 'Découvrir l’ancienne\ncapitale Hoa Lu',
        'vua-dinh-tien-hoang': 'Vie et œuvre du\nroi Dinh Tien Hoang',
        'vua-le-dai-hanh': 'Vie et œuvre du\nroi Le Dai Hanh',
        'vua-le-long-dinh': 'Vie et œuvre du\nroi Le Long Dinh',
        'duong-van-nga': 'L’impératrice douairière\nDuong Van Nga',
        'kien-truc': 'Architecture',
      },
      qrTitle: '📱 Code QR du Guide Audio de Hoa Lu',
      qrDesc:
        'Scannez ce code QR avec votre téléphone pour ouvrir rapidement le guide de l’ancienne capitale Hoa Lu.',
    },
    pano: {
      backToMap: (count) => `← Plan (${count} points)`,
      pointPill: (num, total) => `360° • Point ${num}/${total}`,
      loading: 'Chargement du panorama 360°...',
      gestureHint: '↔️ Glissez sur l’écran pour explorer le site à 360°',
      nextSpotHint: (num, name) => `👉 Continuer vers le point #${num} : ${name}`,
      prevBtn: '⏮ Précédent',
      nextBtn: 'Suivant ⏭',
      showSub: 'Voir le commentaire ▲',
      hideSub: 'Réduire ▼',
    },
    dthMap: {
      titleLine1: 'PLAN DE VISITE DU TEMPLE DU',
      titleLine2: 'ROI DINH TIEN HOANG',
      instruction: 'Touchez les rubriques ci-dessous pour voir le commentaire détaillé',
    },
    ldhMap: {
      subScript: 'Présentation',
      mainHeading: 'TEMPLE DU ROI LE DAI HANH',
      dropcap: 'L',
      introRest:
        'e temple du roi Le Dai Hanh, situé dans l’ancienne commune de Truong Yen Ha, est également appelé le Temple Inférieur (Den Ha). Vieux de plus de 400 ans, ce sanctuaire préserve l’architecture artistique unique du XVIIe siècle. Situé à seulement 300 mètres au nord du temple du roi Dinh Tien Hoang, il est célèbre pour ses sculptures sur bois anciennes d’une grande finesse.',
      sketchTitleVi: 'PLAN DE VISITE DU TEMPLE DU ROI LE DAI HANH',
      sketchTitleEn: 'SKETCH MAP OF LE DAI HANH KING TEMPLE',
      instruction: 'Touchez les rubriques ci-dessous pour voir le commentaire détaillé',
    },
    hotspots: {
      'dth-ngo-mon-quan': {
        name: 'PORTE DU MÉRIDIEN',
        subName: 'Ngọ Môn Quan',
        subtitle: 'Portail extérieur menant au complexe du temple du roi Dinh',
        subtitles: [
          'Point 1 : La Porte du Méridien (Ngo Mon Quan) – premier portail ouvrant sur l’espace solennel du temple du roi Dinh Tien Hoang.',
          'Devant le portail se trouve un étang de lotus en demi-lune jouant le rôle d’écran d’eau selon la géomancie orientale.',
          'Construite en pierre bleue monolithique, la porte est coiffée de toits de tuiles incurvés ornés de deux dragons encadrant la lune.',
          'Franchir la Porte du Méridien permet d’accéder à la voie sacrée pavée de pierre menant au sanctuaire principal.',
        ],
      },
      'dth-long-sang-ngoai': {
        name: 'LIT DE DRAGON',
        subName: 'Long Sàng',
        subtitle: 'Lit de dragon en pierre devant le Portail Cérémoniel Extérieur',
        subtitles: [
          'Point 2 : Le Lit de Dragon (Long Sang) placé juste devant le Portail Cérémoniel Extérieur sur l’axe sacré.',
          'Taillé dans un bloc monolithique de pierre bleue, son plateau est sculpté d’un dragon sinueux et puissant.',
          'De chaque côté veillent deux lions mythiques (Nghe) en pierre juchés sur de hauts piédestaux.',
          'Avec le Lit de Dragon de la Cour du Dragon, cette paire est classée Trésor National du Vietnam.',
        ],
      },
      'dth-nghi-mon-ngoai': {
        name: 'PORTAIL EXTÉRIEUR',
        subName: 'Nghi Môn Ngoại',
        subtitle: 'Ancien portail cérémoniel à trois travées en bois de fer',
        subtitles: [
          'Point 3 : Le Portail Cérémoniel Extérieur (Nghi Mon Ngoai) – entrée principale de l’enceinte extérieure du temple.',
          'L’ouvrage comporte trois travées soutenues par de robustes colonnes en bois de fer et une toiture à deux niveaux et huit pans.',
          'Les charpentes sont finement sculptées de dragons, de nuages et de chrysanthèmes.',
          'Au-delà du portail s’étend un jardin ombragé symétrique de part et d’autre de la voie sacrée.',
        ],
      },
      'dth-nghi-mon-noi': {
        name: 'PORTAIL INTÉRIEUR',
        subName: 'Nghi Môn Nội',
        subtitle: 'Porte donnant accès à la Cour du Dragon et au sanctuaire',
        subtitles: [
          'Point 4 : Le Portail Cérémoniel Intérieur (Nghi Mon Noi) – second portail ouvrant sur la Cour du Dragon centrale.',
          'De structure semblable au Portail Extérieur en bois de fer, il relie les murs de briques entourant le sanctuaire intérieur.',
          'Il débouche sur la vaste Cour du Dragon entièrement dallée de pierre devant la salle de culte.',
        ],
      },
      'dth-long-sang-san-rong': {
        name: 'LIT DE DRAGON',
        subName: 'Long Sàng Sân Rồng',
        subtitle: 'Trésor National : le Lit de Dragon de la Cour du Dragon',
        subtitles: [
          'Point 5 : Le Lit de Dragon de la Cour du Dragon, placé au centre devant le perron de la salle de culte.',
          'Chef-d’œuvre unique de la sculpture sur pierre du XVIIe siècle, orné d’un dragon aux mains humaines tenant ses cornes parmi les nuages.',
          'Les bordures sont finement sculptées de carpes se transformant en dragons, de phénix, d’écureuils et de motifs floraux.',
          'Deux hauts mâts de drapeau en pierre encadrent le lit, symbolisant l’autorité suprême de l’Empereur du Dai Co Viet.',
        ],
      },
      'dth-den-tho-vua': {
        name: 'TEMPLE DU ROI DINH',
        subName: 'Temple of the Dinh Tien Hoang King',
        subtitle: 'Salle des prosternations – Salle de l’encens – Sanctuaire principal',
        subtitles: [
          'Point 6 : Le Temple du roi Dinh Tien Hoang – édifice central comprenant trois salles en enfilade.',
          'La Salle de l’encens honore les quatre piliers de la cour des Dinh : Nguyen Bac, Dinh Dien, Trinh Tu et Luu Co.',
          'Dans le Sanctuaire principal trône la statue en bronze de l’Empereur Dinh Tien Hoang sur un piédestal en pierre monolithique.',
          'La travée gauche est dédiée au prince Dinh Lien, et la travée droite à Dinh Toan et au prince Dinh Hang Lang.',
        ],
      },
      'dth-nha-trung-bay': {
        name: 'SALLE D’EXPOSITION',
        subName: 'Nhà Trưng Bày',
        subtitle: 'Exposition d’artefacts archéologiques de Hoa Lu',
        subtitles: [
          'Point 7 : La Salle d’Exposition située sur l’aile de la Cour du Dragon conserve de précieux vestiges archéologiques.',
          'On y découvre des briques de citadelle du Xe siècle gravées « Dai Viet Quoc Quan Thanh Chuyen », des tuiles à motif de lotus et des céramiques anciennes.',
          'Ces vestiges témoignent de la grandeur des palais impériaux de Hoa Lu il y a plus d’un millénaire.',
        ],
      },
      'dth-nha-khai-thanh': {
        name: 'PAVILLON KHAI THANH',
        subName: "The Dinh king's parents",
        subName2: 'worshiping place',
        subtitle: 'Sanctuaire dédié aux parents du roi Dinh',
        subtitles: [
          'Point 8 : Le Pavillon Khai Thanh est le lieu de culte des parents de l’Empereur Dinh Tien Hoang.',
          'On y vénère son père Dinh Cong Tru, gouverneur du Hoan Chau, et sa mère Dam Thi Thiem.',
          'L’édifice illustre la tradition de piété filiale et de gratitude envers les parents du héros national.',
        ],
      },
      'dth-nha-bia': {
        name: 'PAVILLON DES STÈLES',
        subName: 'Nhà Bia',
        subtitle: 'Stèles historiques du temple du roi Dinh',
        subtitles: [
          'Point 9 : Le Pavillon des Stèles abrite d’anciennes stèles de pierre érigées sous différentes dynasties.',
          'Gravées en caractères chinois, elles relatent la pacification des 12 seigneurs de guerre et la réunification du pays par le roi Dinh.',
          'Elles consignent également l’histoire des restaurations successives du temple sous les Le postérieurs et les Nguyen.',
        ],
      },
      'ldh-long-sang-ngoai': {
        name: 'LIT DE DRAGON',
        subName: 'Long Sàng',
        subtitle: 'Lit de dragon devant le Portail Extérieur du temple du roi Le',
        subtitles: [
          'Point 1 (Temple du roi Le) : Lit de dragon en pierre placé devant le Portail Cérémoniel Extérieur.',
          'Sculpté de dragons majestueux, il symbolise l’autorité royale de la dynastie des Le antérieurs.',
        ],
      },
      'ldh-nghi-mon-ngoai': {
        name: 'PORTAIL EXTÉRIEUR',
        subName: 'Nghi Môn Ngoại',
        subtitle: 'Portail à trois travées extérieur du temple du roi Le',
        subtitles: [
          'Point 2 : Le Portail Cérémoniel Extérieur ouvrant sur l’enceinte du temple du roi Le Dai Hanh.',
          'À droite de l’allée centrale se trouve un grand bassin rectangulaire offrant un cadre paisible.',
        ],
      },
      'ldh-nghi-mon-noi': {
        name: 'PORTAIL INTÉRIEUR',
        subName: 'Nghi Môn Nội',
        subtitle: 'Portail intérieur menant à la Cour du Dragon',
        subtitles: [
          'Point 3 : Le Portail Cérémoniel Intérieur sur la voie sacrée donnant accès à la cour intérieure du temple du roi Le.',
          'Au-delà du portail, deux pavillons latéraux et des jardins mènent à la Cour du Dragon.',
        ],
      },
      'ldh-nha-tho-khong-tu': {
        name: 'PAVILLON DE CONFUCIUS',
        subName: 'Nhà Thờ Khổng Tử',
        subtitle: 'Architecture de l’aile gauche de la cour intérieure',
        subtitles: [
          'Point 4 : Le Pavillon de Confucius situé sur l’aile gauche de la cour intérieure du temple du roi Le Dai Hanh.',
          'Il reflète la tradition d’érudition et l’harmonie entre confucianisme, bouddhisme et taoïsme.',
        ],
      },
      'ldh-nha-tho-quan': {
        name: 'PAVILLON DU MANDARIN',
        subName: 'Nhà Thờ Quan',
        subtitle: 'Sanctuaire de l’aile droite dédié aux grands mandarins',
        subtitles: [
          'Point 5 : Le Pavillon du Mandarin sur l’aile droite, symétrique au Pavillon de Confucius.',
          'Il honore les mandarins civils et militaires ayant secondé la dynastie des Le antérieurs.',
        ],
      },
      'ldh-van-bia': {
        name: 'STÈLES DU TEMPLE',
        subName: 'Văn Bia',
        subtitle: 'Stèles anciennes encadrant la cour du temple du roi Le',
        subtitles: [
          'Point 6 : Les stèles de pierre disposées symétriquement devant la Cour du Dragon.',
          'Elles commémorent la victoire de l’Empereur Le Dai Hanh sur les Song en 981 et les restaurations du temple.',
        ],
      },
      'ldh-long-sang-san-rong': {
        name: 'LIT DE DRAGON',
        subName: 'Long Sàng',
        subtitle: 'Lit de dragon de la Cour du Dragon du temple du roi Le',
        subtitles: [
          'Point 7 : Le Lit de Dragon en pierre au centre de la Cour du Dragon devant la salle de culte.',
          'Ses sculptures raffinées s’harmonisent avec l’architecture ancienne en bois du sanctuaire.',
        ],
      },
      'ldh-den-tho-vua': {
        name: 'TEMPLE DU ROI LE DAI HANH',
        subName: 'Temple of the Le Dai Hanh King',
        subtitle: 'Salle des prosternations – Salle de l’encens – Sanctuaire principal',
        subtitles: [
          'Point 8 : Le Temple du roi Le Dai Hanh – édifice de plus de 400 ans conservant l’art architectural du XVIIe siècle.',
          'Il comprend trois salles : la Salle des prosternations, la Salle de l’encens dédiée à Pham Cu Luong et le Sanctuaire principal.',
          'Dans le Sanctuaire principal siègent les statues du roi Le Dai Hanh au centre, de l’impératrice Duong Van Nga à gauche et du roi Le Long Dinh à droite.',
        ],
      },
    },
    coDoIntro: {
      subLabel: 'Introduction',
      titleLine1: 'Site historique et culturel',
      titleLine2: 'Ancienne capitale Hoa Lu',
      dropcap: 'L',
      p1FirstRest:
        'e site historique et culturel de l’ancienne capitale Hoa Lu est classé Monument National Spécial. Pour la première fois dans l’histoire, Hoa Lu devint la capitale de l’État féodal centralisé du Vietnam, berceau de trois dynasties : les Dinh, les Le antérieurs et le début des Ly.',
      p1: [
        'En 968, après avoir réunifié le pays, Dinh Bo Linh monta sur le trône impérial, nomma le pays Dai Co Viet et établit sa capitale à Hoa Lu, élevant des remparts, creusant des douves et bâtissant des palais.',
        'En 980, le roi Le Dai Hanh lui succéda et fit construire de nombreux palais somptueux.',
        'Au Xe siècle, alors que le jeune État indépendant devait faire face aux menaces intérieures et extérieures, les empereurs Dinh Tien Hoang et Le Dai Hanh choisirent le relief karstique escarpé de Hoa Lu pour ériger une citadelle naturelle imprenable.',
        'En 1010, afin d’assurer l’essor durable de la nation, le roi Ly Thai To transféra la capitale à Dai La, rebaptisée Thang Long (l’actuelle Hanoï). Hoa Lu devint alors l’Ancienne Capitale.',
        'Bien que les anciens palais aient disparu au fil des siècles, les dynasties suivantes ont continuellement restauré les temples et monuments afin de perpétuer la mémoire des héros fondateurs.',
        'Aujourd’hui, les visiteurs peuvent admirer à Hoa Lu les précieux vestiges de cette illustre capitale impériale.',
      ],
      p2: [
        'De nos jours, l’ancienne capitale Hoa Lu compte plus de 30 monuments liés aux dynasties Dinh et Le antérieurs : tombeaux, temples, sanctuaires et pagodes tels que la pagode Nhat Tru, le temple de la princesse Thuc Tiet et la grotte Xuyen Thuy.',
        'Les deux monuments les plus emblématiques sont le temple du roi Dinh Tien Hoang et le temple du roi Le Dai Hanh, qui conservent admirablement le style architectural du XVIIe siècle (dynastie des Le postérieurs).',
      ],
      videoCaption: 'Vidéo de l’ancienne capitale Hoa Lu',
      photo1Caption: 'Vue aérienne de l’ancienne capitale Hoa Lu',
      photo2Caption: 'Vue panoramique de la Cour du Dragon du temple du roi Dinh',
    },
    vuaDinhBio: {
      titleLine1: 'Vie et œuvre du',
      titleLine2: 'roi Dinh Tien Hoang',
      dropcap: 'L',
      p1Rest:
        'e roi, de son vrai nom Dinh Bo Linh, naquit en 924 au village de Dai Huu, préfecture de Dai Hoang (aujourd’hui commune de Gia Phuong, district de Gia Vien, province de Ninh Binh). Fils de Dinh Cong Tru, gouverneur du Hoan Chau, il revint vivre avec sa mère Dam Thi après la mort de son père. Enfant, tout en gardant les buffles, il organisait des exercices militaires simulés avec des roseaux en guise d’étendards, révélant très tôt son génie du commandement.',
      portraitCaption: 'Statue de culte de l’Empereur Dinh Tien Hoang',
      p2: [
        'En 944, à la mort de Ngo Quyen, le pays sombra dans le morcellement féodal connu sous le nom d’Anarchie des 12 seigneurs de guerre.',
        'Dinh Bo Linh accomplit la mission historique de réunifier le pays. Établissant sa base dans la vallée de Hoa Lu, il s’allia au seigneur Tran Lam à Bo Hai Khau qui lui confia toutes ses troupes. Alliant stratégie militaire et diplomatie, Dinh Bo Linh rallia Pham Bach Ho et vainquit successivement Do Canh Thac, Nguyen Sieu, Ngo Nhat Khanh et Lu Duong. Invaincu sur tous les champs de bataille, il fut proclamé Van Thang Vuong (Roi des Dix Mille Victoires).',
        'En 968, après avoir pacifié et unifié le pays, Dinh Bo Linh monta sur le trône d’Empereur, fonda l’État du Dai Co Viet avec Hoa Lu pour capitale, institua la hiérarchie des mandarins et organisa six corps d’armée.',
        'En prenant le titre d’Empereur (De) et en créant son propre nom de règne, il affirma hautement la souveraineté nationale. Toutes les dynasties vietnamiennes suivantes conservèrent ce titre impérial.',
        'En 971, il définit les rangs de la cour : Nguyen Bac fut nommé duc de Dinh Quoc, Dinh Dien Ngoai Giap, Le Hoan commandant en chef des Dix Armées, et le maître zen Ngo Chan Luu reçut le titre de Grand Maître Khuong Viet.',
      ],
      p3: [
        'Pour défendre l’État, Dinh Tien Hoang mit sur pied une puissante armée de 10 corps placée sous le commandement de Le Hoan.',
        'En agriculture et économie : il encouragea le défrichement des terres côtières, développa le commerce et fit frapper la monnaie de bronze « Thai Binh Hung Bao », première monnaie nationale du Vietnam.',
        'En culture et arts : il promut le chant et les arts scéniques aux armées avec dame Pham Thi Tran, vénérée comme la fondatrice de l’opéra traditionnel Cheo.',
        'L’historien Le Van Huu écrivit : « Tien Hoang possédait une clairvoyance extraordinaire et une bravoure inégalée ; d’un seul élan il soumit les 12 seigneurs, fonda la capitale et se proclama Empereur. »',
        'En octobre 979, l’Empereur s’éteignit à l’âge de 56 ans.',
        'Après sa disparition, face à la menace d’invasion des Song, l’impératrice douairière Duong Van Nga et l’armée portèrent le général Le Hoan sur le trône impérial, fondant la dynastie des Le antérieurs.',
      ],
    },
    vuaLeDaiHanhBio: {
      titleLine1: 'Vie et œuvre du',
      titleLine2: 'roi Le Dai Hanh',
      dropcap: 'L',
      p1FirstRest:
        'e roi, de son nom Le Hoan, naquit en 941 à Ai Chau (actuelle province de Thanh Hoa). Orphelin très jeune, il fut adopté par un mandarin de la famille Le.',
      p1Second:
        'Adulte, Le Hoan servit aux côtés de Dinh Lien, fils aîné du roi Dinh. Remarqué par Dinh Bo Linh pour son intelligence et sa bravoure, il s’illustra dans la pacification des 12 seigneurs de guerre et fut nommé commandant en chef des Dix Armées.',
      p1Rest: [
        'En 980, Le Hoan monta sur le trône d’Empereur et fonda la dynastie des Le antérieurs sous le nom d’ère Thien Phuc.',
        'Son règne fut marqué par deux grands exploits militaires : la victoire contre l’invasion des Song au nord et la pacification du Champa au sud.',
        'En 980–981, face à l’offensive terrestre et navale des armées Song, l’Empereur dirigea en personne la bataille décisive sur le fleuve Bach Dang, faisant planter des pieux dans le lit du fleuve pour briser la flotte ennemie...',
      ],
      p2: [
        '...Encerclée et prise en embuscade, la flotte Song fut anéantie. À Chi Lang, une ruse permit d’éliminer le général en chef Hau Nhan Bao, forçant les généraux ennemis à battre en retraite. L’Empereur des Song dut ordonner le retrait total de ses troupes.',
        'En 982, après l’arrestation des émissaires vietnamiens par le Champa, Le Dai Hanh mena une expédition victorieuse au sud, assurant la sécurité des frontières.',
        'La paix revenue, l’Empereur consolida l’unité nationale et fit frapper en 984 la monnaie « Thien Phuc » pour favoriser les échanges commerciaux.',
        'Il fit également creuser le canal reliant le mont Dong Co à la rivière Ba Hoa en 983 et ouvrir la route terrestre de Nam Gioi à Dia Ly en 992 afin de développer le commerce et l’agriculture.',
      ],
      p3BeforePoem: [
        'En 1002, il réforma l’administration territoriale en provinces (Lo), préfectures (Phu) et districts (Chau), s’entourant de grands dignitaires tels que Hong Hien, Tu Muc, Pham Cu Luong et Ly Cong Uan.',
        'Habile diplomate face à la cour des Song, il impressionna les ambassadeurs étrangers qui composèrent à leur retour ces vers célèbres :',
      ],
      poem1: ['« Au-delà du ciel il est un autre ciel qui rayonne au loin,', 'L’onde calme du ruisseau reflète la lune d’automne. »'],
      meaningLabel: 'Signification :',
      poem2: ['Au-delà du ciel des Song existe un autre ciel souverain (le Dai Co Viet),', 'Où fleuves et vallées reposent en paix sous la lune d’automne.'],
      p3AfterPoem: [
        'Le roi Le Dai Hanh demeure dans l’histoire comme un grand héros national et un chef militaire d’exception qui consolida l’indépendance et le prestige du Dai Co Viet.',
        'En 1005, l’Empereur s’éteignit à l’âge de 65 ans.',
      ],
    },
    vuaLeLongDinhBio: {
      titleLine1: 'Vie et œuvre du',
      titleLine2: 'roi Le Long Dinh',
      dropcap: 'L',
      p1FirstRest:
        'e roi, de son vrai nom Chi Trung, naquit en 985. Cinquième fils de l’Empereur Le Dai Hanh, il lui succéda sur le trône.',
      p1Second:
        'Durant son règne, Le Long Dinh réorganisa la cour, maintint les relations diplomatiques avec la dynastie des Song et mena des campagnes pour pacifier les régions frontalières.',
      paragraphs: [
        'En 1007, il envoya une ambassade auprès de la cour des Song pour obtenir les Neuf Classiques confucéens et le Tripitaka bouddhique, tout en développant les échanges commerciaux bilatéraux.',
        'En 1009, le roi mourut à l’âge de 24 ans.',
        'À la fin de la dynastie des Le antérieurs, la cour porta le commandant de la garde impériale Ly Cong Uan sur le trône, fondant la dynastie des Ly.',
        'En 1010, pour favoriser l’essor du pays, la dynastie des Ly transféra la capitale de Hoa Lu à Thang Long.',
      ],
    },
    duongVanNgaBio: {
      titleLine1: 'L’impératrice douairière',
      titleLine2: 'Duong Van Nga',
      dropcap: 'L',
      p1FirstRest:
        'es annales historiques la mentionnent sous le nom d’Impératrice Duong. Selon les archives de la maison communale de My Ha (district de Nho Quan, province de Ninh Binh), elle se nommait Duong Van Nga, fille de Duong The Hien.',
      p1Side:
        'Duong Van Nga est une figure féminine emblématique de l’histoire du Vietnam. À la mort de l’Empereur Dinh Tien Hoang, alors que le jeune prince Dinh Toan n’avait que 6 ans et que l’armée des Song menaçait d’envahir le pays, la patrie avait besoin d’un chef d’exception.',
      p1Rest: [
        'Face au péril imminent, l’impératrice douairière Duong Van Nga réunit la cour et, suivant le vœu unanime de l’armée, remit le trône au général Le Hoan afin qu’il dirige la résistance nationale.',
        'En 982, après la victoire éclatante contre les Song et le Champa, Le Hoan l’éleva au rang d’Impératrice. Replacé dans le contexte historique du Xe siècle, son choix de placer le salut de la patrie au-dessus des intérêts dynastiques demeure un exemple lumineux de patriotisme.',
      ],
      p2: [
        'En remettant la tunique impériale des Dinh à Le Hoan, Duong Van Nga lui conféra la légitimité nécessaire pour unir l’armée et sauvegarder l’indépendance nationale.',
        'Après sa mort, le peuple lui éleva des statues de culte en témoignage de reconnaissance.',
      ],
      p2Italic:
        'Le temple du roi Le Dai Hanh symbolise la profonde gratitude du peuple vietnamien envers les souverains qui bâtirent un Dai Co Viet indépendant, paisible et prospère.',
    },
  },
};

I18N.zh = {
  ...I18N.vi,
  toc: {
    title: '参观目录', close: '关闭',
    items: {
      'so-do-den-dinh': '丁王庙参观图', 'so-do-den-le': '黎王庙参观图',
      'tim-hieu-co-do': '了解华闾古都', 'vua-dinh-tien-hoang': '丁先皇的生平与事业',
      'vua-le-dai-hanh': '黎大行的生平与事业', 'vua-le-long-dinh': '黎龙铤的生平与事业',
      'duong-van-nga': '杨云娥太后', 'kien-truc': '建筑艺术', 'goc-chup-dep-nhat': '最佳拍照地点',
    },
    qrTitle: '📱 华闾古都导览二维码', qrDesc: '使用手机扫描二维码，打开华闾古都导览。',
  },
};

I18N.ja = {
  ...I18N.vi,
  toc: {
    title: '見学案内', close: '閉じる',
    items: {
      'so-do-den-dinh': '丁王廟の見学案内図', 'so-do-den-le': '黎王廟の見学案内図',
      'tim-hieu-co-do': 'ホアルー古都について', 'vua-dinh-tien-hoang': '丁先皇の生涯と事績',
      'vua-le-dai-hanh': '黎大行の生涯と事績', 'vua-le-long-dinh': '黎龍鋌の生涯と事績',
      'duong-van-nga': '楊雲娥太后', 'kien-truc': '建築', 'goc-chup-dep-nhat': 'おすすめ撮影スポット',
    },
    qrTitle: '📱 ホアルー古都ガイドのQRコード', qrDesc: 'スマートフォンでQRコードを読み取り、ホアルー古都ガイドを開きます。',
  },
};

export function getLangData(lang = 'vi') {
  return I18N[lang] || I18N.vi;
}
