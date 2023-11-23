import React, { useState, useEffect } from "react";
import "./footer.css";
import arrow from "../../images/arrow.svg";
import logo from "../../images/SHIFTKART-LOGO.png";
import be from "../../images/BE.svg";
import fb from "../../images/Fb.svg";
import x from "../../images/x.svg";
import insta from "../../images/insta.svg";

function Footer(props) {

  const [path, setPath] = useState(window.location.pathname);
  const [hideFooter, setHideFooter] = useState(false);


  useEffect(() => {
    setPath(window.location.pathname);
    setHideFooter(path.includes("/payments") ? true : false);
  }, [path]); 
  

  return (
    <div style={{ display: hideFooter ? "none" : "flex" }} className="footer-wrapper">
      <div className="footer-upper-section-container align-center space-between">
        <div className="footer-list-wrapper">
          <a href="about-us">About Us</a>
        </div>
        <div className="footer-list-wrapper">
          <a href="">Customer Portal</a>
        </div>
        <div className="footer-list-wrapper">
          <a href="">Contact Us</a>
        </div>
        <div className="footer-list-wrapper">
          <a href="">Write To Us</a>
        </div>
        <div className="footer-subsribe-action-container">
          <a href="">Never miss an update</a>
          <div className="center-div footer-subscriber">
            <input
              type="email"
              id="user-email"
              name="email"
              placeholder="You email"
              className="footer-input-box"
            ></input>
            <button className="footer-subsribe-CTA center-div">
              <img
                src={arrow}
                alt="enter-btn"
                className="footer-action-img"
              ></img>
            </button>
          </div>
        </div>
      </div>
      <div className="footer-lower-section-container align-center space-between">
        <img src={logo} alt="Logo" className="footer-company-logo"></img>
        <div className="footer-comapny-copywrite">&copy; &nbsp; ShiftKart</div>
        <div className="footer-company-socials-container align-center">
          <a href="https://www.fb.com" className="flex">
            <img src={fb} atl="social-img"></img>
          </a>
          <a href="https://www.instagram.com" className="flex">
            <img src={insta} atl="social-img"></img>
          </a>
          <a className="flex">
            <img src={x} atl="social-img"></img>
          </a>
          <a className="flex">
            <img src={be} atl="social-img"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
