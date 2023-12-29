import React from "react";
import "./services.css";
import { Link } from "react-router-dom";

function Services({ img, text }) {
  const handleServiceClick = () => {
    const serviceSlug = text.toLowerCase().replace(/\s+/g, '');
    window.location.href = `/shifting-details#${serviceSlug}`;
  };

  return (
    <div className="services-wrapper center-div" onClick={handleServiceClick}>
      <img src={img} className="services-img" alt="text"></img>
      <p>{text}</p>
    </div>
  );
}

export default Services;
