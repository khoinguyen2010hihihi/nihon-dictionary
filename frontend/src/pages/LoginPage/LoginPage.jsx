// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Đổi base URL tại .env: VITE_API_BASE=http://127.0.0.1:8888
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

function LoginPage() {
  const [email, setEmail] = useState(""); // dùng làm username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Vui lòng nhập email/username và mật khẩu!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // SimpleJWT mặc định nhận {username, password}
        body: JSON.stringify({ username: email, password }),
      });

      // Thử parse JSON dù có lỗi để lấy message chi tiết
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail =
          data?.detail ||
          data?.message ||
          Object.entries(data || {})
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
            .join(" | ");
        throw new Error(detail || `${res.status} ${res.statusText}`);
      }

      // Kỳ vọng backend trả: { access, refresh, user }
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // Điều hướng:
      navigate("/", { replace: true });
    } catch (err) {
      setMessage(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="brand-section">
          <div className="brand-logo">
            <FaLock />
          </div>
          <h1>Chào mừng trở lại</h1>
          <p>Đăng nhập để tiếp tục</p>
        </div>

        <div className="social-login">
          <button type="button" className="social-btn google">
            <FaGoogle />
            <span>Tiếp tục với Google</span>
          </button>
          <button type="button" className="social-btn apple">
            <FaApple />
            <span>Tiếp tục với Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label>Email / Username</label>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              autoComplete="username email"
              required
            />
          </div>

          <label>Mật khẩu</label>
          <div className="input-group">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Hiện/ẩn mật khẩu"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Nhớ tôi
            </label>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}

        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
