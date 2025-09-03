import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import JLPT from "../../components/JLPT/JLPT";
import "./JLPTPage.css";

function JLPTPage() {
  return (
    <div className="jlpt-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <div className="content">
          <JLPT />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default JLPTPage;
