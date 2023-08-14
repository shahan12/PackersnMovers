import React from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import overLay from "../../images/overlay.png";
import Services from "../../components/services/services.component";
import houseShift from "../../images/_Group_.svg";
import commercialSetting from "../../images/_Group_ (1).svg";
import officeShift from "../../images/_Group_ (2).svg";
import storageShift from "../../images/_Group_ (3).svg";
import industrialShift from "../../images/Group (1).svg";

function Home(props) {
  return (
    <>
      <div className="home-landing-container">
        <div className="home-landing-overlay-container">
          <img className="home-overlay-img" src={overLay}></img>
        </div>
        <div className="home-relocate-wrapper">
          <Relocate />
        </div>
      </div>
      <div className="home-our-services-container">
        <p>Out Services</p>
        <div className="flex services-row-one">
          <Services img={houseShift} text={"House Shifting"} />
          <Services img={commercialSetting} text={"Commercial Shifting"} />
          <Services img={officeShift} text={"Office Shifting"} />
        </div>
        <div className="flex services-row-one">
          <Services img={storageShift} text={"Storage Shifting"} />
          <Services img={industrialShift} text={"Industrial Shifting"} />
        </div>
      </div>
    </>
  );
}

export default Home;
