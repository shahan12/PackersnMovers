import React from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import overLay from "../../images/overlay.png";

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
    </>
  );
}

export default Home;
