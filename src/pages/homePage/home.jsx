import React from "react";
import Relocate from "../../components/relocate/relocate.component";
import "./home.css";
import BlogCard from "../../components/BlogCard/BlogCard.component";
import overLay from "../../images/overlay.png";
import processMove from "../../images/process_move.png";
import processText from "../../images/process_text.png";

function Home(props) {
  return (
    <>
      <div className="home-landing-container">
        <div className="home-landing-overlay-container">
          <img className="home-overlay-img" src={overLay}  alt="home-overlay"></img>
        </div>
        <div className="home-relocate-wrapper">
          <Relocate />
        </div>
        <div className="home-components">
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
