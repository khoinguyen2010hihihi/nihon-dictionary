// import React, { useState } from "react";
// import {
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaGoogle,
//   FaApple,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState(""); // để hiển thị kết quả

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Vui lòng nhập email và mật khẩu!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/accounts/login/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: email, // Django mặc định dùng username
//             password: password,
//           }),
//         }
//       );

//       const data = await response.json();
//       setMessage(data.message);

//       if (data.success) {
//         // Nếu đăng nhập thành công
//         alert("Đăng nhập thành công!");
//         // Ví dụ: lưu trạng thái login vào localStorage
//         localStorage.setItem("isLoggedIn", "true");
//         // Điều hướng sang trang khác
//         window.location.href = "/";
//       }
//     } catch (error) {
//       setMessage("Lỗi kết nối server!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         {/* Logo/Brand */}
//         <div className="brand-section">
//           <div className="brand-logo">
//             <FaLock />
//           </div>
//           <h1 className="brand-title">Chào mừng trở lại</h1>
//           <p className="brand-subtitle">Đăng nhập để tiếp tục</p>
//         </div>

//         {/* Social Login */}
//         <div className="social-login">
//           <button className="social-btn google">
//             <FaGoogle />
//             <span>Tiếp tục với Google</span>
//           </button>

//           <button className="social-btn apple">
//             <FaApple />
//             <span>Tiếp tục với Apple</span>
//           </button>
//         </div>

//         <div className="divider">
//           <span>hoặc</span>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label className="form-label">Email / Username</label>
//             <div className="input-group">
//               <FaEnvelope className="input-icon" />
//               <input
//                 type="text"
//                 placeholder="example@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Mật khẩu</label>
//             <div className="input-group">
//               <FaLock className="input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-input"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div className="form-options">
//             <label className="remember-me">
//               <input type="checkbox" />
//               <span>Nhớ tôi</span>
//             </label>
//             <Link to="/forgot-password" className="forgot-password">
//               Quên mật khẩu?
//             </Link>
//           </div>

//           <button type="submit" className="login-btn">
//             Đăng nhập
//           </button>
//         </form>

//         {/* Hiển thị thông báo */}
//         {message && (
//           <p style={{ marginTop: "15px", color: "red" }}>{message}</p>
//         )}

//         <p className="register">
//           Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
//         </p>

//         {/* Footer */}
//         <div className="footer">
//           <p>
//             Bằng việc đăng nhập, bạn đồng ý với{" "}
//             <a href="#">Điều khoản dịch vụ</a> và{" "}
//             <a href="#">Chính sách bảo mật</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await res.json();
      console.log("Response from server:", data);
      if (data.success) {
        // Lưu đơn giản (bạn có thể lưu user vào localStorage)
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));

        // chuyển về trang chủ
        navigate("/jlpt"); // hoặc window.location.href = "/";
      } else {
        setMessage(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setMessage(
        "Không thể kết nối server. Kiểm tra server Django đang chạy chưa."
      );
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
          <button className="social-btn google">
            <FaGoogle />
            <span>Tiếp tục với Google</span>
          </button>
          <button className="social-btn apple">
            <FaApple />
            <span>Tiếp tục với Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email / Username</label>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

          <button type="submit">Đăng nhập</button>
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
