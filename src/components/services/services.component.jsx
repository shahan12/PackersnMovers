import React from "react";
import "./services.css";
import { Link } from "react-router-dom";

function Services({ img, text }) {

  return (
    <a className="services-wrapper center-div" href={`/shifting-details#${text.toLowerCase().replace(/\s+/g, '')}`}>
      <img src={img} className="services-img" alt="text"></img>
      <p>{text}</p>
    </a>
  );
}

export default Services;
