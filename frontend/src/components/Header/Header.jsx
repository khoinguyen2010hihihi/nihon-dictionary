import React from "react";
import { FaBell, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css"; // Import your CSS file

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h3>Chào ngày mới !</h3>
      </div>

      <div className="header-right">
        <Link to="/login" className="btn login">
          Đăng nhập
        </Link>
        <Link to="/register" className="btn register">
          Đăng ký
        </Link>

        <div className="dropdown">
          <button className="flag-btn">🇻🇳</button>
          <div className="dropdown-content">
            <span>🇻🇳 Tiếng Việt</span>
            <span>🇯🇵 日本語</span>
            <span>🇺🇸 English</span>
          </div>
        </div>

        <FaBell className="icon bell" />
        <FaFire className="icon fire" />
      </div>
    </header>
  );
}

export default Header;
