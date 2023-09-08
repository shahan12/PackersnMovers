import React, { useState } from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import BlogVideo from "../../components/BlogCard/BlogVideo.component";
import Services from "../../components/services/services.component";
import RetractableTable from "../../components/Faq/Faq.component";
import houseShift from "../../images/_Group_.svg";
import commercialSetting from "../../images/_Group_ (1).svg";
import officeShift from "../../images/_Group_ (2).svg";
import storageShift from "../../images/_Group_ (3).svg";
import industrialShift from "../../images/Group (1).svg";
import processMove from "../../images/process.svg";
import landingHome from "../../images/homelanding.svg";
import purpleCircle from "../../images/1purplecircle.svg";
import orangeCircle1 from "../../images/1orangecircle.svg";
import orangeCircle2 from "../../images/2orangecircle.svg";
import purpleCircle3 from "../../images/3purplecircle.svg";
import NumberInc from "../../components/NumberInc/NumberInc.component";
import CompareTable from "../../components/CompareTable/CompareTable.component";
import { useInView } from 'react-intersection-observer';
import AboutUs from "../aboutUs/aboutUs.component";
import data from "../../components/Faq/faq.json";

function Home(props) { 
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1, // Adjust the threshold as needed
  });
  return (
    <>
      <div className="home-landing-container">
        <div className="home-elements-container">

          <div className="section-container container-home" id="home">
            <img className="img-left-sticky" src={purpleCircle} alt="process-icon" />
            <img className="img-right-sticky" src={orangeCircle1} alt="process-icon" />
            <div className="container-item">
              <div ref={ref}>
                <img className={`landing-img ${inView ? 'item-animate' : ''}`} src={landingHome} alt="process-icon" />
              </div>
            </div>
          </div>

          <div className="section-container container-service" id="service">
            <img className="img-left-sticky" src={orangeCircle2} alt="process-icon" />
            <div className="container-item">
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
          </div>

          <div className="section-container container-process" id="process">
            <img className="img-right-sticky-process" src={purpleCircle3} alt="process-icon" />
            <div className="container-item">
              <h2>Our Process</h2>
            <img className="process-img" src={processMove} alt="process-icon" />
            <div className="flex process-row-one">
              <NumberInc value={20} text={'Lakh+'} subtext={'Relocations Done'} color={'#5c7ca4'}/>
              <NumberInc value={20} text={'K+'} subtext={'Customers Served Monthly'}  color={'#4d9cbc'}/>
              <NumberInc value={20} text={'Lakh+'} subtext={'Happy Faces'} color={'#5ccc9c'}/>
            </div>
            </div>
          </div>

          <div className="section-container container-blogs" id="process">
            <img className="img-left-sticky" src={orangeCircle2} alt="process-icon" />
            <div className="container-item">
              <h2>What Our Customers Say</h2>
              <BlogVideo />
            </div>      
          </div>

          <div className="section-container container-process" id="process">
            <img className="img-right-sticky-process" src={purpleCircle3} alt="process-icon" />
            <div className="container-item">
              <h2>Service Comparison</h2>
              <CompareTable />
            </div>
          </div>

          <div className="section-container container-faq" id="process">
            <img className="img-left-sticky" src={orangeCircle2} alt="process-icon" />
            <div className="container-item-full">
              <h2>FAQs</h2>
              <div className="container-table-faq">
                <RetractableTable data={data}/>
                <RetractableTable data={data} />
              </div>
            </div>      
          </div>

          <div className="section-container aboutUs" id="process">
            <img className="img-left-sticky" src={orangeCircle2} alt="process-icon" />
            <img className="img-right-sticky-process" src={purpleCircle3} alt="process-icon" />
            <div className="container-item-full">
              <AboutUs/>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
