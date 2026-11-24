# Thư mục Giọng đọc Thuyết minh (`.mp3`)

Hiện chưa có file `.mp3` nào, ứng dụng dùng giọng đọc của trình duyệt.

Khi có file, đặt vào `public/audio/stories/{lang}/` (`vi`, `en`, `ko`, `fr`). Có 2 cách:

- **File gộp mỗi mục:** `m1.mp3` … `m5.mp3` (hoặc tên cũ `codohoalu`, `vuadinh`, `vualedaihanh`, `vualelongdinh`, `duongvannga`). Chạy `npm run split-audio` (hoặc `npm run dev`) để tự cắt thành từng câu.
- **File riêng từng câu:** `{stepId}.mp3`, gồm `codo-step-1..8`, `dinh-step-1..10`, `le-step-1..9`, `longdinh-step-1..6`, `dvn-step-1..7`.

Lời thoại nằm trong `src/data/storyScenes.js`.
