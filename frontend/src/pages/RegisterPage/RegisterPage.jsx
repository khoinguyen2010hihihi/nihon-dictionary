// src/pages/RegisterPage.jsx
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
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function RegisterPage() {
  const [name, setName] = useState(""); // họ và tên
  const [email, setEmail] = useState(""); // dùng làm username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState(""); // lỗi từ BE

  const navigate = useNavigate();

  // Gom lỗi validator DRF thành chuỗi dễ đọc
  const extractErrorMsg = (errObj) => {
    if (!errObj) return "";
    if (typeof errObj === "string") return errObj;
    if (Array.isArray(errObj)) return errObj.join(", ");
    return Object.entries(errObj)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErr("");

    if (!name || !email || !password || !confirmPassword) {
      return setServerErr("Vui lòng nhập đầy đủ thông tin!");
    }
    if (password.length < 6) {
      return setServerErr("Mật khẩu tối thiểu 6 ký tự.");
    }
    if (password !== confirmPassword) {
      return setServerErr("Mật khẩu không khớp!");
    }

    // tách họ tên đơn giản
    const [first_name, ...rest] = name.trim().split(" ");
    const last_name = rest.join(" ");

    // payload khớp RegisterSerializer bên Django
    const payload = {
      username: email, // dùng email làm username
      email,
      password,
      first_name,
      last_name,
      role: "user", // mở nếu BE có field role
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // cố gắng đọc JSON lỗi từ DRF
        let msg = `${res.status} ${res.statusText}`;
        try {
          const errJson = await res.json();
          msg = extractErrorMsg(errJson) || msg;
        } catch (_) {}
        throw new Error(msg);
      }

      // { user, access, refresh }
      const json = await res.json();

      // Lưu token để đăng nhập ngay
      localStorage.setItem("access", json.access);
      localStorage.setItem("refresh", json.refresh);
      localStorage.setItem("user", JSON.stringify(json.user));

      // Điều hướng (tùy bạn muốn đi đâu)
      navigate("/login"); // hoặc navigate("/login")
    } catch (e) {
      setServerErr(e.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
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

        {/* Social Login (placeholder) */}
        <div className="social-login">
          <button type="button" className="social-btn google">
            <FaGoogle />
            <span>Đăng ký với Google</span>
          </button>

          <button type="button" className="social-btn apple">
            <FaApple />
            <span>Đăng ký với Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>hoặc</span>
        </div>

        {/* Error từ server */}
        {serverErr && <div className="server-error">{serverErr}</div>}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="register-form" noValidate>
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
                autoComplete="name"
                required
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
                autoComplete="email"
                required
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
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label="Hiện/ẩn mật khẩu"
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
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                aria-label="Hiện/ẩn xác nhận mật khẩu"
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

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo tài khoản"}
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
