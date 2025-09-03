import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    console.log("Name:", name, "Email:", email, "Password:", password);
    // TODO: gọi API register tại đây
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Logo/Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <FaUser />
          </div>
          <h1 className="brand-title">Tạo tài khoản mới</h1>
          <p className="brand-subtitle">Đăng ký để bắt đầu hành trình</p>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button className="social-btn google">
            <FaGoogle />
            <span>Đăng ký với Google</span>
          </button>

          <button className="social-btn apple">
            <FaApple />
            <span>Đăng ký với Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>hoặc</span>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>
                Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                <a href="#">Chính sách bảo mật</a>
              </span>
            </label>
          </div>

          <button type="submit" className="register-btn">
            Tạo tài khoản
          </button>
        </form>

        <p className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>

        {/* Footer */}
        <div className="footer">
          <p>
            Bằng việc đăng ký, bạn xác nhận rằng bạn đã đọc và hiểu{" "}
            <a href="#">các điều khoản</a> của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
