import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Translate from "../../components/Translate/Translate";
import "./TranslatePage.css"; // Import your CSS file

function TranslatePage() {
  return (
    <div className="translate-page">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content">
        <Header />
        <div className="content">
          <Translate />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TranslatePage;
