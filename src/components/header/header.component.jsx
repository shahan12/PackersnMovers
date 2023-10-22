import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/SHIFTKART-LOGO.png";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import PhoneIcon from "../../images/phone.svg";
import ProfilePic from "../../images/defaultPic.svg";
import DownArrow from "../../images/downarrow.png";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      
      {showfillHeader ? (
        <div className="header-cta-container align-center space-between grey-600">
          <div className="align-center">
        <img src={logo} alt="logo" className="header-logo-img"></img>
      </div>
          <span className="header-item-phoneNumber-container">
            <img src={PhoneIcon} alt={"phone"}></img>
            <span>+91 884788xxx</span>
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
        <nav className="navbar navbar-expand-md navbar-light bg-transparent fixed-top ggs">
        <div className="container">
        <Link to="/" className="navbar-brand mr-3">
          <img src={logo} alt="logo" className="header-logo-img" />
        </Link>
        <button
          className="navbar-toggler"
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
        <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`} id="navbarToggle">
          <ul className="navbar-nav align-items-end ">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" onClick={() => setLoginModal(true)}>
                Log In
              </Link>
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
