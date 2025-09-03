import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Introduce from "../../components/Introduce/Introduce";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./IntroducePage.css"; // Import your CSS file
function IntroducePage() {
  return (
    <div className="introduce-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <Header />
      <div className="content">
        <Introduce />
      </div>
      <Footer />
    </div>
  );
}
export default IntroducePage;
