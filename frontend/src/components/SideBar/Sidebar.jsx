import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaClipboardList,
  FaBookReader,
  FaEdit,
  FaComments,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">こ</span>
        <span className="logo-text">koihi</span>
      </div>

      <ul className="menu">
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaSearch /> Tra cứu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/translate"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBook /> Dịch
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jlpt"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaClipboardList /> JLPT
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to="/mywords"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBookReader /> Từ của tôi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reading"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaEdit /> Luyện đọc
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/exam"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaClipboardList /> Thi thử
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/conversation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaComments /> Hội thoại
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/japanese-name"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaClipboardList /> Tên tiếng Nhật
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to="/introduce"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaInfoCircle /> Giới thiệu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaCog /> Cài đặt
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
