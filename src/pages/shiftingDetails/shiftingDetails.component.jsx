import React, { useEffect, useRef } from "react";
import "./shiftingDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { data1, data2 } from "./data";
import BlackContainer from "../../components/container/BlackContainer.component";
// import infoImg from "../../images/Group.svg"
import commercialShiftImg from "../../images/_Group_ (1).svg";
import  officeSHiftImg from "../../images/_Group_ (2).svg";
import storageShiftImg from "../../images/_Group_ (3).svg";
import petShiftImg from "../../images/petservice.svg";
import corporateShiftImg from "../../images/corpservice.svg";
import vehicleShiftImg from "../../images/vehicleservice.svg";
import industrialShiftImg from "../../images/Group (1).svg";
import vehicleContractImg from "../../images/vehicleconservice.svg";
import houseShiftImg from "../../images/_Group_.svg";
function ShiftingDetails({ isHomePage }) {


  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash.length > 0) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoViewIfNeeded();
      }
    }
  });
  return (
    <div className={`${isHomePage ? '' : 'about-top-sd'}`}>
      <BlackContainer title={"Our Services"} />
      <div style={{ marginTop: '3rem' }} className="row px-4 ">

      <div id="houseshifting" className="about-us-section-1">
          <h2 className="about-us-heading">House Shifting</h2>
          <div className="flex container-flex">
            <div className="img-div">
              <img className="flex img-styles" src={houseShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para1}</p>
              <p className="about-us-para-text">{data1.para2}</p>
            </div>
          </div>
        </div>

        <div id="commercialshifting" className="about-us-section-2">
          <h2 className="about-us-heading">Commercial Shifting</h2>
          <div className="flex container-flex">
          <div className="img-div">
              <img className="flex img-styles" src={commercialShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para3}</p>
              <p className="about-us-para-text">{data1.para4}</p>
            </div>
          </div>
        </div>

        <div id="officeshifting" className="about-us-section-1">
          <h2 className="about-us-heading">Office Shifting</h2>
          <div className="flex container-flex">
          <div className="img-div">
              <img className="flex img-styles" src={officeSHiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para5}</p>
              <p className="about-us-para-text">{data1.para6}</p>
            </div>
          </div>
        </div>

        <div id="storageshifting" className="about-us-section-2">
          <h2 className="about-us-heading">Storage Shifting</h2>
          <div className="flex container-flex">
          <div className="img-div">
              <img className="flex img-styles" src={storageShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para7}</p>
              <p className="about-us-para-text">{data1.para8}</p>
            </div>
            </div>
        </div>
            
        <div id="petshifting" className="about-us-section-1">
          <h2 className="about-us-heading">Pet Shifting</h2>
          <div className="flex container-flex">
            <div className="img-div">
              <img className="flex img-styles" src={petShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para9}</p>
              <p className="about-us-para-text">{data1.para10}</p>
            </div>
          </div>
        </div>

        <div id="corporateshifting" className="about-us-section-2">
          <h2 className="about-us-heading">Corporate Shifting</h2>
          <div className="flex container-flex">
          <div className="img-div">
              <img className="flex img-styles" src={corporateShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para11}</p>
              <p className="about-us-para-text">{data1.para12}</p>
            </div>
          </div>
        </div>

        <div id="vehicleshifting" className="about-us-section-1">
          <h2 className="about-us-heading">Vehicle Shifting</h2>
          <div className="flex container-flex">
            <div className="img-div">
              <img className="flex img-styles" src={vehicleShiftImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para13}</p>
              <p className="about-us-para-text">{data1.para14}</p>
            </div>
          </div>
        </div>

        <div id="industrialshifting" className="about-us-section-2">
          <h2 className="about-us-heading">Industrial Shifting</h2>
          <div className="flex container-flex">
          <div className="img-div">
              <img className="flex img-styles" src={industrialShiftImg} alt={"imfo-shiftKart"} />
            </div>

            <div className="text-div">
              <p className="about-us-para-text">{data1.para15}</p>
              <p className="about-us-para-text">{data1.para16}</p>
            </div>
          </div>
        </div>

        <div id="vehiclecontracts" className="about-us-section-1">
          <h2 className="about-us-heading">Vehicle Contracts</h2>
          <div className="flex container-flex">
            <div className="img-div">
              <img className="flex img-styles" src={vehicleContractImg} alt={"imfo-shiftKart"}>
              </img>

            </div>
            <div className="text-div">
              <p className="about-us-para-text">{data1.para17}</p>
              <p className="about-us-para-text">{data1.para18}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShiftingDetails;
