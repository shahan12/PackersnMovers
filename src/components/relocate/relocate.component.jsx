import React, { useState } from "react";
import "../relocate/relocate.css";
import DropDown from "../dropDown/dropDown.component";
function Relocate(props) {
  const [activeTab, setActiveTab] = useState("Within City");
  const [dropDownValue, setDropFownValue] = useState("");
  const options = [
    "Delhi",
    "Dhanbad",
    "Kolkata",
    "Banglore",
    "Mumbai",
    "Pune",
    "Hyderabad",
  ];
  return (
    <article className="relocate-wrapper">
      <p className="description">Where are you goining to relocate</p>
      <div className="flex relocate-tabs-container">
        <button
          onClick={() => setActiveTab("Within City")}
          className={`relocate-tab ${
            activeTab === "Within City" ? "active" : ""
          }`}
        >
          Within City
        </button>
        <button
          onClick={() => setActiveTab("Between City")}
          className={`relocate-tab ${
            activeTab === "Between City" ? "active" : ""
          }`}
        >
          Between City
        </button>
        <button
          onClick={() => setActiveTab("City Temo")}
          className={`relocate-tab ${
            activeTab === "City Temo" ? "active" : ""
          }`}
        >
          City Temo
        </button>
      </div>
      {activeTab !== "Between City" && (
        <div className="relocate-select-city">
          <p className="small-desc">Select City</p>
          <div className="relocate-drop-down-container">
            <DropDown
              value={dropDownValue}
              setValue={setDropFownValue}
              option={options}
            />
          </div>
        </div>
      )}
      <div className="relocate-search-locality">
        <p className="small-desc">Search your locatlity</p>
        <div className="relocate-input">
          <input
            placeholder="Shifting From"
            id="shifting-from"
            name="Shifting From"
            className="relocate-input-box"
          ></input>
        </div>
        <div className="relocate-input">
          <input
            placeholder="Shifting To"
            id="shifting-to"
            name="Shifting To"
            className="relocate-input-box"
          ></input>
        </div>
      </div>
      <div className="cta-container">
        <button className="cta-button check-price">Check Prices</button>
      </div>
    </article>
  );
}

export default Relocate;
