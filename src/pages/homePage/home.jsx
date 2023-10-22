import React, { useEffect, useState } from "react";
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
import { useInView } from "react-intersection-observer";
import AboutUs from "../aboutUs/aboutUs.component";
import data from "../../components/Faq/faq.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';


function Home({ setShowPopUp, loginModal, setLoginModal }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  useEffect(() => {
    if (window.location.search.includes("login-redirect=true")) {
      setShowPopUp(true);
    }
  }, []);

  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [height, setHeight] = useState(0);

  /**
   * Use Effect and function to hide Relocate component on scroll to 1800 px
   */
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  useEffect(() => {
    if (loginModal) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [loginModal]);
  const listenToScroll = () => {
    let heightToHideFrom = 1920;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      visible && setVisible(false);
    } else {
      setVisible(true);
    }
  };
  return (
    <>
     
    <div className="container-fluid home-header-container">
      <div className="conatiner home-landing-container">
          <div className="row">
          <div className="col-lg-6" id="home">
          <div className="container-item">
                <img
                  className={`landing-img ${inView ? "item-animate" : ""}`}
                  src={landingHome}
                  alt="process-icon"
                />
            </div>
          </div>
          </div>
      </div>

      {visible && show && (
        <div className="container pt-5" id="service">
        <div className="container-item">
            <div className="home-relocate-wrapper ">
              <Relocate className="relocate" setLoginModal={setLoginModal}/>
            </div>
            </div>
            </div>
          )}

      <div className="container pt-5" id="service">
            <div className="container-item">
              <h2>Our Services</h2>
              <div className="flex services-row-one">
                <Services img={houseShift} text={"House Shifting"} />
                <Services
                  img={commercialSetting}
                  text={"Commercial Shifting"}
                />
                <Services img={officeShift} text={"Office Shifting"} />
              </div>
              <div className="flex services-row-one">
                <Services img={storageShift} text={"Storage Shifting"} />
                <Services img={industrialShift} text={"Industrial Shifting"} />
              </div>
            </div>
          </div>

      <div className="container-process " id="process">
            <div className="container-item">
              <h2>Our Process</h2>
              <img
                className="process-img"
                src={processMove}
                alt="process-icon"
              />
              <div className="center-div process-row-one pb-3">
                <NumberInc
                  value={20}
                  text={"Lakh+"}
                  subtext={"Relocations Done"}
                  color={"#5c7ca4"}
                />
                <NumberInc
                  value={20}
                  text={"K+"}
                  subtext={"Customers Served Monthly"}
                  color={"#4d9cbc"}
                />
                <NumberInc
                  value={20}
                  text={"Lakh+"}
                  subtext={"Happy Faces"}
                  color={"#5ccc9c"}
                />
              </div>
            </div>
          </div>
        
      <div className="container container-blogs" id="process">
        <div className="container-item">
              <h2>What Our Customers Say</h2>
              <BlogVideo />
            </div>
            <img
              className="img-left-sticky"
              src={orangeCircle2}
              alt="process-icon"
            />
            <img
              className="img-right-sticky"
              src={purpleCircle3}
              alt="process-icon"
            />
            
          </div>

        <div className="container-table pt-5">
          <div className="container " id="process">
            <img
              className="img-right-sticky-process"
              src={purpleCircle3}
              alt="process-icon"
            />
              <h2 className="container-h2">Service Comparison</h2>
            <CompareTable />
          </div>
          </div>  
  
      <div className="container py-5">
              <h2>FAQs</h2>
              <div className="row">
                <div className="col-12"><RetractableTable data={data} /></div>
                <div className="col-12"><RetractableTable data={data} /></div>
              </div>
            </div>
    
      <div className="container" id="process">
            {/* <img
              className="img-left-sticky"
              src={orangeCircle2}
              alt="process-icon"
            />
            <img
              className="img-right-sticky-process"
              src={purpleCircle3}
              alt="process-icon"
            /> */}
              <AboutUs />
          </div>
          </div>
    </>
  );
}

export default Home;
