import React, { useEffect } from "react";
import "./shiftingDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { data1, data2 } from "./data";
import BlackContainer from "../../components/container/BlackContainer.component";
function ShiftingDetails({ isHomePage }) {

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isHomePage]);



  return (
    <div className={`${isHomePage ? '' : 'about-top-sd'}`}>
    <BlackContainer title={"Our Services"}/>
      <div style={{marginTop: '3rem'}} className="row px-4 ">



      <div id="houseshifting" className="about-us-section-1">
        <h2 className="about-us-heading">House Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="commercialshifting" className="about-us-section-2">
        <h2 className="about-us-heading">Commercial Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="officeshifting" className="about-us-section-1">
        <h2 className="about-us-heading">Office Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="storageshifting" className="about-us-section-2">
        <h2 className="about-us-heading">Storage Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="petshifting" className="about-us-section-1">
        <h2 className="about-us-heading">Pet Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="corporateshifting" className="about-us-section-2">
        <h2 className="about-us-heading">Corporate Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="vehicleshifting" className="about-us-section-1">
        <h2 className="about-us-heading">Vehicle Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="industrialshifting" className="about-us-section-2">
        <h2 className="about-us-heading">Industrial Shifting</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      <div id="vehiclecontracts" className="about-us-section-1">
        <h2 className="about-us-heading">Vehicle Contracts</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
      </div>

      </div>
    </div>
  );
}

export default ShiftingDetails;
