import React from "react";
import "./services.css";

function Services({ img, text }) {
  return (
    <div className="services-wrapper center-div">
      <img src={img} alt="text"></img>
      <p>{text}</p>
    </div>
  );
}

export default Services;
