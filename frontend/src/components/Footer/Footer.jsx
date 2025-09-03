import React from "react";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaLine,
  FaApple,
  FaGooglePlay,
  FaChrome,
  FaFirefox,
} from "react-icons/fa";
import "./Footer.css"; // Import your CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1 - Thông tin liên hệ */}
        <div className="footer-col">
          {/* <h3 className="logo">mazii</h3> */}
          <p>Koihi - Bạn đồng hành tiếng Nhật tin cậy</p>
          <p>📍 315 Trường Chinh, Khương Mai, Thanh Xuân, Hà Nội</p>
          <p>📧 support@mazii.net</p>
          <p>📞 (+84) 37 773 8144</p>
          <p>🌐 https://eupgroup.net</p>
        </div>

        {/* Cột 2 - Mạng xã hội & Tiện ích */}
        <div className="footer-col">
          <h4>Mạng xã hội</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaTiktok />
            <FaYoutube />
            <FaInstagram />
            <FaLine />
          </div>

          <h4>Tiện ích</h4>
          <div className="browser-icons">
            <FaChrome />
            <FaFirefox />
          </div>

          <h4>Tải ứng dụng</h4>
          <div className="app-icons">
            <FaApple /> App Store
            <FaGooglePlay /> Google Play
          </div>
        </div>

        {/* Cột 3 - Liên kết */}
        <div className="footer-col">
          <h4>Về Mazii</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Đối tác</li>
            <li>Trợ giúp</li>
            <li>Báo lỗi</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* Cột 4 - Chính sách giao dịch */}
        <div className="footer-col">
          <h4>Chính sách giao dịch</h4>
          <ul>
            <li>Chính sách thanh toán</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn thanh toán</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2016 CÔNG TY CỔ PHẦN CÔNG NGHỆ EUP</p>
      </div>
    </footer>
  );
}

export default Footer;
