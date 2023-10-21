import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/SHIFTKART-LOGO.png";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import PhoneIcon from "../../images/phone.svg";
import ProfilePic from "../../images/defaultPic.svg";
import DownArrow from "../../images/downarrow.png";

function Header({ showPopUp, isAuthenticated, loginModal, setLoginModal }) {
  const [showfillHeader, setShowFillHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("fill-details") > 0) {
      setShowFillHeader(true);
    }
  }, [window.location.pathname]);

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
    <article
      className={`header-container space-between ${
        showfillHeader && "add-box-shadow"
      }`}
    >
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
      {showfillHeader ? (
        <div className="header-cta-container align-center space-between grey-600">
          <span className="header-item-phoneNumber-container">
            <img src={PhoneIcon} alt={"phone"}></img>
            <span>+91 8847885671</span>
          </span>
          <div className="header-profile-picture-container">
            <img
              src={ProfilePic}
              alt="profile-pic"
              className="flex width-100"
            ></img>
          </div>
          <div
            className="header-more-option-container"
            onClick={() => setShowMoreOption(!showMoreOption)}
          >
            <img
              src={DownArrow}
              alt="down-Arrow"
              className="flex width-100 header-profile-img"
            ></img>
          </div>
          {showMoreOption && (
            <div className="header-more-option-dropdown" onClick={hanleLogOut}>Log out</div>
          )}
        </div>
      ) : (
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
      )}
    </article>
  );
}

export default Header;
