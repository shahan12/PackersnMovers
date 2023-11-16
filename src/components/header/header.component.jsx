import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.svg";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import PhoneIcon from "../../images/phone.svg";
import ProfilePic from "../../images/defaultPic.svg";
import DownArrow from "../../images/downarrow.png";
import hamMenu from "../../images/hamburger icon.svg";

function Header({ showPopUp, isAuthenticated, loginModal, setLoginModal }) {
  const [showfillHeader, setShowFillHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false)

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

  const hanleLogOut = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("toAddress");
    sessionStorage.removeItem("phoneNumber");
    sessionStorage.removeItem("fromAddress");
    sessionStorage.removeItem("distance");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("email");

    window.open("/", "_self");
  };
  const handleProfile = () => {
    window.open("/edit-profile", "_self");
  };
  const handleBooking = () => {
    window.open("/bookings", "_self");
  };
  const handleLogoToHome = () => {
    window.open("/", "_self");
  };

  return (
    <article
      className={`header-container space-between ${showfillHeader && "add-box-shadow"
        }`}
    >
      {loginModal && (
        <RegisterModal
          isOpen={loginModal}
          onClose={closeModal}
          flow={"login"}
        />
      )}
      
      {/* the logo */}

      <div className="align-center">
        <img
          src={logo}
          alt="logo"
          className="header-logo-img"
          onClick={handleLogoToHome}
        ></img>
      </div>

      {/* the logo */}

      {showfillHeader ? (
        
        // Header inside
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
              onClick={handleProfile}
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
            {showMoreOption && (
              <div className="header-more-option-dropdown"> 
                <div
                  className="header-option"
                  onClick={handleProfile}
                >
                  Profile
                </div>
                <div className="header-option" onClick={handleBooking}>
                  Booking
                </div>
                <div
                  className="header-option"
                  onClick={hanleLogOut}
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Header outside

        <div className="header-cta-container align-center space-between grey-600">
            <div className="header-user-wrapper">
              +91 88847-84888
            </div>
            <button className="header-sign-in-btn"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}><img
              src={hamMenu}
              alt="ham-menu"
              className="ham-icon"
            ></img></button>
            <div className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }>
            <ul>
              <li>
          <div className="header-sign-in-btn hamburger" onClick={() => {
          setIsNavExpanded(false);
        }}>
            <Link to="/about-us" className="header-CTA-item" >
              About Us
            </Link>
          </div>
          </li>
          <li>
            {!isAuthenticated ? (
              <div
                className="header-sign-in-btn hamburger "
                onClick={() => {
                  setLoginModal(true);
                  setIsNavExpanded(false);

                }}
              >
                Corporate
              </div>
            ) : (
              <div className="header-sign-in-btn hamburger">
                Corporate
              </div>
            )}
          </li>
          <li>
            {!isAuthenticated ? (
              <div
                className="header-sign-in-btn hamburger"
                onClick={() => {
                  setLoginModal(true);
                  setIsNavExpanded(false);
                }}
              >
                Commercial
              </div>
            ) : (
              <div className="header-sign-in-btn hamburger">
                Commercial
              </div>
            )}
          </li>
          <li>
          {!isAuthenticated ? (
            <div
              className="header-sign-in-btn hamburger logout-list"
              onClick={() => {
                setLoginModal(true);
                setIsNavExpanded(false);
              }}
            >
              Login
            </div>
          ) : (
            <div className="header-sign-in-btn hamburger logout-list" onClick={hanleLogOut}>
              <span>Log Out</span>
            </div>
          )}
          </li>
          </ul>
        </div>
        </div>
      )}
    </article>
  );
}

export default Header;