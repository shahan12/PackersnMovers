import React, { useState }  from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/SHIFTKART-LOGO.png";
import RegisterModal from "../RegisterModal/RegisterModal.component";

function Header(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let logedIn = true;
  return (
    <article className="header-container space-between">
      <div className="header-company-logo-container center-div">
        <img src={logo} alt="logo" className="header-logo-img"></img>
      </div>
      <div className="header-company-logo-container"></div>
      <div className="header-cta-container align-center space-between grey-600">
        <div className="header-sign-in-btn">
          <Link to="/" className="header-CTA-item">
            Home
          </Link>
        </div>
        <div className="header-sign-in-btn">
          <Link to="/about-us" className="header-CTA-item">
            About Us
          </Link>
        </div>
        <div className="header-user-wrapper">
          <button className="header-user-wrapper-btn" onClick={openModal}>Get in touch with us!</button>
          <RegisterModal isOpen={modalOpen} onClose={closeModal} />
        </div>
        {!logedIn ? (
          <div className="header-sign-in-btn">
            <Link to="/login-in" className="header-CTA-item">
              Login
            </Link>
          </div>
        ) : (
          <div className="header-user-wrapper">
            <span>Call us on +91 8722 111 882</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default Header;
