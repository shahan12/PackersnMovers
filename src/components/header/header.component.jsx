import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header(props) {
  return (
    <article className="header-container space-between">
      <div>COMPANY NAME</div>
      <div className="header-cta-container space-between">
        <div className="header-sign-in-btn">
          <Link to="/login-in">Login</Link>
        </div>
        <div className="header-sign-up-btn">
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>
    </article>
  );
}

export default Header;
