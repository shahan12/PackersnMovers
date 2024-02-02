import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.svg";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import PhoneIcon from "../../images/phone.svg";
import ProfilePic from "../../images/defaultPic.svg";
import DownArrow from "../../images/downarrow.png";
import hamMenu from "../../images/hamburger icon.svg";
import { performLogout } from "../FillRequirements/Requirement.component";
import OutsideClickHandler from "react-outside-click-handler";
import {
  sendSessionIDrequestToBackend,
} from "../../API/apicalls";

function Header({ showPopUp, isAuthenticated, loginModal, setLoginModal }) {
  const [showfillHeader, setShowFillHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("fill-details") || pathname.includes("bookings") || pathname.includes("edit-profile")) {
      setShowFillHeader(true);
    } else {
      setShowFillHeader(false);
    }
  }, []);

  const [continueBookingVisible, setContinueBookingVisible] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    setContinueBookingVisible(!pathname.includes("fill-details"));
  }, []);


  const closeModal = () => {
    setModalOpen(false);
    setLoginModal(false);
  };

  useEffect(() => {
    if (showPopUp) {
      setLoginModal(true);
    }
  }, [setLoginModal, showPopUp]);

  const hanleLogOut = () => {
    performLogout();
  };
  const handleProfile = () => {
    window.open("/edit-profile", "_self");
  };
  const handleBooking = () => {
    window.open("/bookings", "_self");
  };
  const handleFill = () => {
    window.open("/fill-details", "_self");
  };
  const getSessionID = async () => { 
    
    const savedToken = sessionStorage.getItem('token');
    const identifier = sessionStorage.getItem('identifier');
    const response = await sendSessionIDrequestToBackend(identifier);

    if (savedToken) {

      if (response?.type === 'invalidToken') {
        alert("Token Invalid, please refresh your page and try again");
        performLogout();
      }
      else if (response?.type === 'serverError') {
        alert("Server Error!");
        performLogout();
      } 
      else if (response?.type === 'success') {
        sessionStorage.setItem("orderSessionId", response.data);
        window.open("/fill-details", "_self");
      } else {
        performLogout();
      }
    }
    else {
      alert("Token Invalid, please refresh your page and try again");
      performLogout();
    }
  };
  
  const handleLogoToHome = () => {
    window.open("/", "_self");
  };


  const phoneNumber = "888 478 4888";

  const handlePhoneIconClick = () => {
    window.location.href = `tel:${phoneNumber}`;
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
            <div onClick={handlePhoneIconClick} className="header-user-wrapper">
              <img style={{ marginTop: '0.2rem' }}
                src={PhoneIcon}
              />
              <span>{phoneNumber}</span>
            </div>
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
              <OutsideClickHandler onOutsideClick={() => setShowMoreOption(false)}>
                <div className="header-more-option-dropdown">
                  <div className="header-option" onClick={handleProfile}>
                    Profile
                  </div>
                  {continueBookingVisible && !sessionStorage.getItem('orderSessionId') && (
                    <div className="header-option" onClick={getSessionID}>
                      New Booking!
                    </div>
                  )}
                  <div className="header-option" onClick={handleBooking}>
                    My Bookings
                  </div>
                  {continueBookingVisible && sessionStorage.getItem('orderSessionId') && (
                    <div className="header-option" onClick={handleFill}>
                      Continue Booking
                    </div>
                  )}
                  <div className="header-option" onClick={hanleLogOut}>
                    Log out
                  </div>
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
      ) : (
        // Header outside

        <div className="header-cta-container align-center space-between grey-600">

          <span className="header-item-phoneNumber-container">
            <div onClick={handlePhoneIconClick} className="header-user-wrapper">
              <img style={{ marginTop: '0.2rem' }} src={PhoneIcon} />
              <span>{phoneNumber}</span>
            </div>
          </span>
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
                  <Link to="/" className="header-CTA-item" >
                    Home
                  </Link>
                </div>
              </li>
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
                      sessionStorage.setItem('SpLog', true);
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
                      sessionStorage.setItem('SpLog', true);
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
                <div className="header-sign-in-btn hamburger" onClick={handleBooking}>
                  My Bookings
                </div>
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