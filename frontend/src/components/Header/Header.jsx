import React from "react";
import { FaBell, FaFire } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login"); // đưa về trang login
  };

  return (
    <header className="header">
      <div className="header-left">
        <h3>Chào ngày mới !</h3>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="username">Xin chào {user.username}</span>
            <button className="btn logout" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn register">
              Đăng ký
            </Link>
          </>
        )}

        <div className="dropdown">
          <button className="flag-btn">🇻🇳</button>
        </div>

        <FaBell className="icon bell" />
        <FaFire className="icon fire" />
      </div>
    </header>
  );
}

export default Header;
