import React, { useState } from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import BlogCard from "../../components/BlogCard/BlogCard.component";
import overLay from "../../images/overlay.png";
import Services from "../../components/services/services.component";
import RetractableTable from "../../components/Faq/Faq.component";
import houseShift from "../../images/_Group_.svg";
import commercialSetting from "../../images/_Group_ (1).svg";
import officeShift from "../../images/_Group_ (2).svg";
import storageShift from "../../images/_Group_ (3).svg";
import industrialShift from "../../images/Group (1).svg";
import processMove from "../../images/process_move.png";
import processText from "../../images/process_text.png";
import landingHome from "../../images/landingHome.png";
import aadmi from "../../images/aadmi.png";
import NumberInc from "../../components/NumberInc/NumberInc.component";


function Home(props) { 

  return (
    <>
      <div className="home-landing-container">
        <div className="home-landing-backgrounds">
          <img className="home-overlay-img" src={overLay} alt="home-overlay"/>
        </div>
        <div className="home-elements-container">
          <div className="home-components leftDiv">
            <div style={{marginTop: "2rem", height: "38rem"}} className="services-container">
              <img className="process-img" src={landingHome} alt="process-icon" />
              <img className="process-img man" src={aadmi} alt="process-icon" />
            </div>
            <div style={{marginTop: "7rem", height: "33rem"}} className="services-container">
              <h2>Our Services</h2>
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
            <div className="services-container" style={{marginTop: "0rem", height: "70rem"}}>
              <h2>Our Process</h2>
              <img className="process-img" src={processMove} alt="process-icon" />
              <div className="flex services-row-two">
                <NumberInc value={20} text={'Lakh+'} subtext={'Relocations Done'} color={'#5c7ca4'}/>
                <NumberInc value={20} text={'K+'} subtext={'Customers Served Monthly'}  color={'#4d9cbc'}/>
                <NumberInc value={20} text={'Lakh+'} subtext={'Happy Faces'} color={'#5ccc9c'}/>
              </div>
            </div>
            <div className="services-container">
              <BlogCard />
            </div>
            <div className="services-container">
              <h2>FAQs</h2>
              <RetractableTable />
            </div>
          </div>
          <div className="home-components rightDiv">
            <div className="home-relocate-wrapper">
              <Relocate />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
