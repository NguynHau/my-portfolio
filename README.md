# Nguyễn Tấn Hậu - Personal Portfolio

Dự án Portfolio cá nhân trực quan, hiện đại, tối giản và chuyên nghiệp của **Nguyễn Tấn Hậu**, được tối ưu hóa để giới thiệu về hành trình học tập, nghiên cứu khoa học, kỹ năng và các công bố khoa học.

🔗 **Địa chỉ xem trực tuyến:** [nguynhau.github.io/my-portfolio](https://nguynhau.github.io/my-portfolio/)

---

## 📁 Cấu trúc thư mục & Chức năng chi tiết từng File

Để dự án luôn gọn gàng và dễ dàng bảo trì hoặc nâng cấp, mã nguồn được tổ chức theo các module chức năng riêng biệt:

```text
├── i18n/                      # Hệ thống quản lý đa ngôn ngữ (Tiếng Anh & Tiếng Việt)
│   ├── i18n.js                # Logic khởi tạo, xử lý dịch thuật động và lưu cấu hình ngôn ngữ
│   └── translations.js        # Từ điển chứa toàn bộ nội dung dịch song ngữ Anh - Việt
│
├── public/                    # Chứa tài nguyên tĩnh được trình duyệt truy cập trực tiếp
│   └── anh2.jpg               # File ảnh chân dung đại diện chính thức (Avatar)
│
├── scripts/                   # Các kịch bản tự động hóa (Python) hỗ trợ phát triển
│   ├── add_i18n.py            # Hỗ trợ gắn thuộc tính dịch tự động vào cấu trúc HTML
│   ├── translate.py           # Tự động hóa quá trình dịch và đồng bộ từ vựng
│   ├── fix_glass.py           # Chuẩn hóa giao diện kính mờ (Glassmorphism)
│   └── ...                    # Các script tối ưu hóa tiêu đề và cấu trúc giao diện khác
│
├── tools/                     # Thư mục lưu trữ công cụ kiểm thử và tài nguyên sao lưu
│   ├── backup_index.html      # Bản sao lưu an toàn của giao diện index.html gốc
│   ├── test_color.html        # File thử nghiệm và kiểm tra độ tương phản màu sắc
│   └── ...                    # Các tài nguyên nháp phục vụ quá trình thiết kế
│
├── index.html                 # Cấu trúc giao diện chính của toàn bộ trang Web
├── script.js                  # Tập lệnh JavaScript điều khiển hiệu ứng và tương tác động
├── style.css                  # Tùy chỉnh CSS chuyên sâu, cấu hình biến màu cho Light/Dark Mode
├── package.json               # Quản lý các thư viện phụ thuộc và các tập lệnh môi trường
└── vite.config.ts             # Cấu hình trình đóng gói và tối ưu hóa hiệu năng Vite
```

### 🔹 Chức năng chi tiết của các tệp tin chính:
*   **`index.html`**: Đóng vai trò là bộ khung giao diện duy nhất (Single-page Application). Chứa mã HTML tích hợp lớp tiện ích từ Tailwind CSS, phân tách rõ ràng thành các phân đoạn (Hero, Giới thiệu, Hành trình, Nghiên cứu, Kỹ năng, Thành tích, Liên hệ).
*   **`script.js`**: Trái tim tương tác của ứng dụng. Điều khiển chuyển đổi chế độ Sáng/Tối (Theme Switcher), hiệu ứng thanh điều hướng động (Liquid Sliding Glass Menu), kích hoạt cuộn mượt mà với thư viện **Lenis**, và quản lý hiệu ứng xuất hiện mượt mà khi người dùng cuộn trang (**Intersection Observer**).
*   **`style.css`**: Nơi cấu hình các thuộc tính CSS tùy chỉnh sâu mà Tailwind chưa hỗ trợ tối ưu. Định nghĩa biến CSS cho chế độ Sáng (Light mode) và Tối (Dark mode), tối ưu hóa giao diện kính thủy tinh mờ sang trọng, và đồng nhất đường viền (border) ở cả hai chế độ.
*   **`i18n/i18n.js`**: Tự động quét toàn bộ cây tài liệu DOM để tìm các phần tử có thuộc tính `data-i18n`. Nó sẽ ánh xạ các thuộc tính này với từ điển dịch thuật và thay đổi ngôn ngữ ngay lập tức mà không cần tải lại trang, đồng thời lưu trạng thái ngôn ngữ được chọn vào `localStorage` của trình duyệt.
*   **`i18n/translations.js`**: Cơ sở dữ liệu từ điển dạng cặp khóa-giá trị (Key-Value) cho song ngữ Anh - Việt, đảm bảo tất cả các thuật ngữ chuyên ngành khoa học được dịch chính xác và tự nhiên nhất.

---

## 🛠️ Các ngôn ngữ sử dụng & Lý do lựa chọn

Dự án sử dụng sự kết hợp tối ưu giữa các công nghệ Web hiện đại và ngôn ngữ lập trình kịch bản bổ trợ:

### 1. HTML5
*   **Lý do sử dụng:** Là nền tảng bắt buộc để xây dựng cấu trúc nội dung trang web.
*   **Ưu điểm trong dự án:** Được viết theo chuẩn Semantic HTML (sử dụng các thẻ đúng ý nghĩa như `<header>`, `<section>`, `<article>`, `<footer>`), giúp cải thiện tối đa điểm SEO (tối ưu hóa bộ máy tìm kiếm) và tăng cường khả năng tiếp cận (Accessibility) cho người khuyết tật dùng trình đọc màn hình.

### 2. CSS3 (Kết hợp Tailwind CSS)
*   **Lý do sử dụng:** Tạo kiểu dáng thẩm mỹ, bố cục responsive và hiệu ứng thị giác.
*   **Ưu điểm trong dự án:** 
    *   **Tailwind CSS** cho phép áp dụng trực tiếp các class tiện ích để thiết kế giao diện cực nhanh, giữ dung lượng CSS tải về ở mức tối thiểu.
    *   **CSS3 thuần** giải quyết các bài toán tùy chỉnh nâng cao như hiệu ứng kính thủy tinh mờ (`backdrop-filter`), hiệu ứng chuyển động mượt mà khi đổi màu nền sáng/tối, giúp tạo ra trải nghiệm thị giác cao cấp.

### 3. JavaScript (ES6+)
*   **Lý do sử dụng:** Mang lại tính tương tác động và xử lý logic phía Client-side.
*   **Ưu điểm trong dự án:** Giúp thực thi cơ chế đa ngôn ngữ (i18n) mượt mà không cần chuyển hướng trang hay tải lại tài nguyên, tối ưu hóa trải nghiệm người dùng tối đa. Đảm bảo các hiệu ứng trượt, cuộn trang đạt hiệu năng 60 FPS trên cả thiết bị cấu hình yếu.

### 4. TypeScript (Cấu hình build)
*   **Lý do sử dụng:** Cung cấp giải pháp kiểm tra kiểu dữ liệu tĩnh mạnh mẽ khi đóng gói dự án.
*   **Ưu điểm trong dự án:** Đảm bảo quá trình biên dịch và tối ưu hóa tài nguyên thông qua Vite diễn ra chuẩn xác, giảm thiểu tối đa các lỗi cú pháp tiềm ẩn trước khi triển khai lên GitHub Pages.

### 5. Python (Script phụ trợ trong phát triển)
*   **Lý do sử dụng:** Ngôn ngữ lập trình kịch bản mạnh mẽ, xử lý tệp tin và dữ liệu văn bản nhanh chóng.
*   **Ưu điểm trong dự án:** Được dùng để viết các công cụ tự động hóa như quét văn bản, hỗ trợ dịch thuật tự động, tối ưu hóa hàng loạt các thuộc tính trong tệp tin HTML lớn, tiết kiệm thời gian phát triển thủ công và giảm thiểu sai sót.
