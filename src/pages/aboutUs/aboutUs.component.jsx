import React from "react";
import "./aboutUs.css";
import { data1, data2 } from "./data";
function AboutUs(props) {
  return (
    <div className="about-usWrapper">
      <div className="about-us-section-1">
        <h2 className="about-us-heading" style={{paddingTop: '0rem'}}>Best Packers and Movers in Bangalore</h2>
        <p className="about-us-para-text">{data1.para1}</p>
        <p className="about-us-para-text">{data1.para2}</p>
        <p className="about-us-para-text">{data1.para3}</p>
      </div>
      <div className="about-us-setion-2">
        <h2 className="about-us-heading">
          What are ShiftKart Packing And Moving Services In Bangalore
        </h2>
        <p className="about-us-para-text">
          NoBroker provides the following facilities when you plan to shift
          within Bangalore or outside
        </p>
        {data2.map((item, index) => {
          return (
            <p className="about-us-para-text">
              <span className="about-us-para-heading">{item.head} </span>
              <span>{item.Value}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default AboutUs;
