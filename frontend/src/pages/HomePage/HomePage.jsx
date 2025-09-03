import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        <Header />
        <div className="content">
          <SearchBox />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
