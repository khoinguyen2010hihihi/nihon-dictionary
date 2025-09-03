import React from "react";
import "./Introduce.css";
function Introduce() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Dịch Thuật Thông Minh</h1>
          <p>
            Công cụ dịch thuật AI mạnh mẽ, hỗ trợ hơn 100 ngôn ngữ với độ chính
            xác cao. Dịch nhanh, dịch đúng, dịch như người bản xứ.
          </p>
          <a href="#features" className="cta-button">
            Khám phá ngay
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Tại sao chọn TranslateHub?</h2>
          <div className="features-grid">
            <div className="feature-card floating">
              <div className="feature-icon">🚀</div>
              <h3>Dịch Siêu Nhanh</h3>
              <p>
                Công nghệ AI tiên tiến giúp dịch văn bản trong tích tắc, xử lý
                hàng nghìn từ chỉ trong vài giây.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="feature-icon">🎯</div>
              <h3>Độ Chính Xác Cao</h3>
              <p>
                Sử dụng mô hình học máy được huấn luyện với hàng tỷ câu, đảm bảo
                bản dịch chính xác và tự nhiên.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "1s" }}
            >
              <div className="feature-icon">🌍</div>
              <h3>Hơn 100 Ngôn Ngữ</h3>
              <p>
                Hỗ trợ dịch thuật giữa hơn 100 ngôn ngữ khác nhau, từ phổ biến
                đến hiếm gặp trên thế giới.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="feature-icon">💾</div>
              <h3>Lưu Lịch Sử</h3>
              <p>
                Tự động lưu lại các bản dịch để bạn có thể xem lại và quản lý dễ
                dàng mọi lúc, mọi nơi.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>
                Giao diện thân thiện, tối ưu cho mọi thiết bị từ máy tính đến
                điện thoại di động.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="feature-icon">🔒</div>
              <h3>Bảo Mật Tuyệt Đối</h3>
              <p>
                Mã hóa end-to-end, đảm bảo thông tin của bạn được bảo vệ an toàn
                tuyệt đối.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2
            className="section-title"
            style={{ color: "white", marginBottom: "3rem" }}
          >
            Con số ấn tượng
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Người dùng</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Ngôn ngữ</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50M+</span>
              <span className="stat-label">Bản dịch</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Độ chính xác</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how">
        <div className="container">
          <h2 className="section-title">Cách sử dụng</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Nhập văn bản</h3>
              <p>
                Gõ hoặc dán văn bản bạn muốn dịch vào ô bên trái. Hỗ trợ tối đa
                5000 ký tự.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Chọn ngôn ngữ</h3>
              <p>
                Lựa chọn ngôn ngữ nguồn và ngôn ngữ đích từ danh sách hơn 100
                ngôn ngữ có sẵn.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Nhận kết quả</h3>
              <p>
                Nhấn nút "Dịch" và nhận ngay bản dịch chính xác, tự nhiên trong
                tích tắc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2024 TranslateHub. Tất cả quyền được bảo lưu. Phát triển bởi
            AI Technology.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Introduce;
