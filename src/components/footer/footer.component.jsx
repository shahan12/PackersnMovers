import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import "./footer.css";
import arrow from "../../images/arrow.svg";
import logo from "../../images/SHIFTKART-LOGO.png";
import fb from "../../images/Fb.svg";
import x from "../../images/twitter.svg";
import insta from "../../images/insta.svg";
import linkedin from "../../images/linkedin.svg";
import youtube from "../../images/youtube.svg";

import { sendMail } from '../../API/apicalls.js';

function Footer(props) {

  const [path, setPath] = useState(window.location.pathname);
  const [hideFooter, setHideFooter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribeClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // If email is valid, send request to API
    try {
      const apiResponse = await sendMail(email);
      if(apiResponse) {
        setEmail('');
        alert("We will get in touch with you!");
      }
    } catch (error) {
      alert("Something Went Wrong, try again later!");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLinkClick = () => {
    // Scroll to the top when a link is clicked
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setPath(window.location.pathname);
    if (path === "/bookings" || path === "/") {
      setHideFooter(false);
    } else {
      setHideFooter(true);
    }
  }, [path]); 
  

  return (
    <div style={{ display: hideFooter ? "none" : "" }} className="footer-wrapper">
      <div className="footer-upper-section-container align-center space-between">
        <div className="footer">
        <div className="footer-column">
        <h3>SiteMap</h3>
        <ul>
          <li><Link to="/about-us" onClick={handleLinkClick}>About Us</Link></li>
          <li><Link to="/shifting-details" onClick={handleLinkClick}>Shifting Details</Link></li>
          <li><Link to="/bookings" onClick={handleLinkClick}>My Bookings</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Policies</h3>
        <ul>
          <li><Link to="/TAC-policy" onClick={handleLinkClick}>Terms & Conditions</Link></li>
          <li><Link to="/Refunds-cancellation-policy" onClick={handleLinkClick}>Refunds, Returns and Cancellation Policy</Link></li>
          <li><Link to="/privacy-policy" onClick={handleLinkClick}>Privacy Policy</Link></li>
        </ul>
      </div>
      </div>
      <div className="center-div footer-subscriber">
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="Your email"
        className="footer-input-box"
        value={email}
        onChange={handleEmailChange}
      />
      <button className="footer-subsribe-CTA center-div" onClick={handleSubscribeClick}>
        <img
          src={arrow}
          alt="enter-btn"
          className="footer-action-img"
        />
      </button>
    </div>
      </div>
      <div className="footer-lower-section-container align-center space-between">
        <img src={logo} alt="Logo" className="footer-company-logo"></img>
        <div className="footer-comapny-copywrite">&copy; &nbsp; EZY SHIFTKART TECHNOLOGY SOLUTIONS PRIVATE LIMITED</div>
        <div className="footer-company-socials-container align-center">
          <a href="https://www.facebook.com/shiftkart/" className="flex">
            <img src={fb} atl="social-img"></img>
          </a>
          <a href="https://www.instagram.com/shiftkart/" className="flex">
            <img src={insta} atl="social-img"></img>
          </a>
          <a href="https://www.twitter.com/ShiftKart/" className="flex">
            <img src={x} atl="social-img"></img>
          </a>
          <a href="https://www.linkedin.com/company/shiftkart/" className="flex">
            <img src={linkedin} atl="social-img"></img>
          </a>
          <a href="https://www.youtube.com/@SHIFTKART-hi6hp/videos/" className="flex">
            <img src={youtube} atl="social-img"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
