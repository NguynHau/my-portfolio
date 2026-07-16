
# Nguyen Tan Hau - Personal Portfolio

Dự án Portfolio cá nhân trực quan, hiện đại và tối giản của **Nguyễn Tấn Hậu**, giới thiệu về hành trình, nghiên cứu, kỹ năng và các công bố khoa học.

🔗 **Xem trực tuyến tại:** [nguynhau.github.io/my-portfolio](https://nguynhau.github.io/my-portfolio/)

---

## 📁 Cấu trúc thư mục dự án

Để dự án luôn gọn gàng và dễ bảo trì, mã nguồn được tổ chức theo cấu trúc module hóa rõ ràng:

```text
├── i18n/                  # Hệ thống quản lý đa ngôn ngữ (Tiếng Anh & Tiếng Việt)
│   ├── i18n.js            # Logic dịch thuật và khởi tạo ngôn ngữ tự động
│   └── translations.js    # Từ điển dịch thuật cho toàn bộ trang web
│
├── public/                # Tài nguyên tĩnh được truy cập trực tiếp bởi trình duyệt
│   └── anh2.jpg           # Ảnh chân dung đại diện chính thức (Avatar)
│
├── scripts/               # Các kịch bản Python hỗ trợ tự động hóa trong phát triển
│   └── ...                # Script dịch thuật, cập nhật header, xử lý kính thủy tinh, v.v.
│
├── tools/                 # Bộ công cụ phục vụ kiểm thử, sao lưu và phát triển
│   ├── backup_index.html  # Bản sao lưu dự phòng của giao diện chính
│   └── ...                # Các file nháp và công cụ hỗ trợ phối màu
│
├── index.html             # Cấu trúc giao diện chính (Sử dụng Tailwind CSS)
├── script.js              # Logic vận hành cốt lõi, hiệu ứng trượt mượt và chuyển đổi theme
└── style.css              # Tùy chỉnh CSS bổ sung và cấu hình nâng cao cho theme Light/Dark
```

---

## ✨ Tính năng nổi bật

*   **Đa ngôn ngữ (English / Tiếng Việt):** Chuyển đổi ngôn ngữ tức thì, dịch chính xác cấu trúc học thuật.
*   **Chế độ Giao diện (Light / Dark Mode):** Đồng nhất màu sắc, viền mờ sang trọng dạng kính thủy tinh (Glassmorphism).
*   **Thiết kế Đáp ứng (Responsive Design):** Tương thích hoàn toàn trên mọi thiết bị di động, tablet và máy tính để bàn.
*   **Hiệu ứng mượt mà:** Thanh điều hướng động, cuộn trang mượt mà kết hợp với thư viện Lenis.
