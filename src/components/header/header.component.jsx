import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.svg";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import PhoneIcon from "../../images/phone.svg";
import ProfilePic from "../../images/defaultPic.svg";
import DownArrow from "../../images/downarrow.png";

function Header({ showPopUp, isAuthenticated, loginModal, setLoginModal }) {
  const [showfillHeader, setShowFillHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("fill-details") > 0) {
      setShowFillHeader(true);
    }
  }, [window.location.pathname]);

  const closeModal = () => {
    setModalOpen(false);
    setLoginModal(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    if (showPopUp) {
      setLoginModal(true);
    }
  }, [showPopUp]);
  let logedIn = false;

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


      
      {showfillHeader ? (
        
        // Header inside
        
        <div className="header-cta-container align-center space-between grey-600">
          <div className="align-center">
        <img
          src={logo}
          alt="logo"
          className="header-logo-img"
          onClick={handleLogoToHome}
        ></img>
      </div>

          
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
                  // className="header-more-option-dropdown"
                  onClick={handleProfile}
                >
                  Profile
                </div>
                <div className="profile-btn" onClick={handleBooking}>
                  Booking
                </div>
                <div
                  // className="header-more-option-dropdown"
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

        <nav className="navbar navbar-expand-md navbar-light bg-light bg-opacity-75 fixed-top ggs">
        <div className="container">
        <Link to="/" className="navbar-brand mr-3">
          <img src={logo} alt="logo" className="header-logo-img" />
        </Link>
        <span className="header-item-phoneNumber-container">
            <img src={PhoneIcon} alt={"phone"}></img>
            <span>+91 88847-84888</span>
          </span>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
          aria-controls="navbarToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse  ${isNavOpen ? 'show' : ''}`} id="navbarToggle">
          <ul className="navbar-nav container justify-content-end align-items-end">

            <li className="nav-item ">
              <Link to="/about-us" className="nav-link" onClick={toggleNav}>
                About Us
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" onClick={() => {
                if (!isAuthenticated) {
                  setLoginModal(true);
                  toggleNav()
                }
              }}>
                Corporate
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" onClick={() => {
                if (!isAuthenticated) {
                  setLoginModal(true);
                  toggleNav();
                }
              }}>
                Commercial
              </Link>
            </li>
            <li className="nav-item ">
            {!isAuthenticated?(<Link className="nav-link" onClick={() => {
                if (!isAuthenticated) {
                  setLoginModal(true);
                  toggleNav();
                }
              }}>
                Login
              </Link>):(
                <Link className="nav-link" onClick={hanleLogOut}>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
      )}
    </article>
  );
}

export default Header;
