import React from "react";
import "./Sidebar.css";
import {
  FaSearch,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaBookReader,
  FaEdit,
  FaLayerGroup,
  FaComments,
  FaBriefcase,
  FaInfoCircle,
  FaArrowUp,
  FaCog,
  FaBlog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">こ</span>
        <span className="logo-text">koihi</span>
      </div>

      <ul className="menu">
        <li>
          <FaSearch /> Tra cứu
        </li>
        <li>
          <FaBook /> Dịch
        </li>
        <li>
          <FaClipboardList /> JLPT
        </li>
        <hr />
        <li>
          <FaBookReader /> Từ của tôi
        </li>
        <li>
          <FaEdit /> Luyện đọc
        </li>
        <li>
          <FaClipboardList /> Thi thử
        </li>
        <li>
          <FaComments /> Dịch hội thoại
        </li>
        <li>
          <FaComments /> Hội thoại
        </li>
        <li>
          <FaClipboardList /> Tên tiếng Nhật
        </li>
        <hr />
        <li>
          <FaInfoCircle /> Giới thiệu
        </li>
        <li>
          <FaCog /> Cài đặt
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
