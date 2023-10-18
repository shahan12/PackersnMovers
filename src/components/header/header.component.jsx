import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/SHIFTKART-LOGO.png";
import RegisterModal from "../RegisterModal/RegisterModal.component";

function Header({ showPopUp, isAuthenticated, loginModal, setLoginModal }) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setLoginModal(false);
  };

  useEffect(() => {
    if (showPopUp) {
      setLoginModal(true);
    }
  }, [showPopUp]);
  let logedIn = false;

  const hanleLogOut = () => {
    sessionStorage.removeItem("loggedIn");
    window.open("/", "_self");
  };
  return (
    <article className="header-container space-between">
      {loginModal && (
        <RegisterModal
          isOpen={loginModal}
          onClose={closeModal}
          flow={"login"}
        />
      )}
      <div className="align-center">
        <img src={logo} alt="logo" className="header-logo-img"></img>
      </div>
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
        {/* <div className="header-user-wrapper">
          <button
            className="header-user-wrapper-btn"
            onClick={() => setModalOpen(true)}
          >
            Get in touch with us!
          </button>
          {modalOpen && (
            <RegisterModal
              isOpen={modalOpen}
              onClose={closeModal}
              flow={"register"}
            />
          )}
        </div> */}
        {!isAuthenticated ? (
          <div
            className="header-sign-in-btn"
            onClick={() => {
              setLoginModal(true);
            }}
          >
            Login
          </div>
        ) : (
          <div className="header-user-wrapper" onClick={hanleLogOut}>
            <span>Log Out</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default Header;
