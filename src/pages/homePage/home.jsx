import React from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import BlogCard from "../../components/BlogCard/BlogCard.component";
import overLay from "../../images/overlay.png";
import Services from "../../components/services/services.component";
import houseShift from "../../images/_Group_.svg";
import commercialSetting from "../../images/_Group_ (1).svg";
import officeShift from "../../images/_Group_ (2).svg";
import storageShift from "../../images/_Group_ (3).svg";
import industrialShift from "../../images/Group (1).svg";
import processMove from "../../images/process_move.png";
import processText from "../../images/process_text.png";

function Home(props) {
  return (
    <>
      <div className="home-landing-container">
        <div className="home-landing-overlay-container">
          <img
            className="home-overlay-img"
            src={overLay}
            alt="home-overlay"
          ></img>
        </div>
        <div className="home-relocate-wrapper">
          <Relocate />
        </div>
        <div className="home-components">
          <div className="home-our-services-container">
            <h2>Out Services</h2>
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
          <div className="home-process home-cards">
            <h2>Our Process</h2>
            <img src={processMove} alt="process-icon" />
            <img src={processText} alt="processT-icon" />
          </div>
          <div className="home-blog home-cards">
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
