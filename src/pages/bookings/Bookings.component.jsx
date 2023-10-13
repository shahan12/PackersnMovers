import React, { useState } from "react";
import "./Booking.css";
import Arrow from "../../images/from-to-arrow.svg";
import House from "../../images/house.svg";
import Box from "../../images/box.svg";
import Electic from "../../images/appliance.svg";
import Distance from "../../images/distance.svg";
import Calemder from "../../images/calender.svg";
import { data } from "./bookings";
const bookingData = data;
function Bookings({}) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="bookings-wrapper">
      <h2>Bookings</h2>
      <div className="border-bottom"></div>
      <div className="bookings-content-wrapper center-div">
        <div className="bookkings-tabs-wrapper center-div">
          <button
            className={`bookings-tab ${activeTab === 0 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            Ongoing Bookings
          </button>
          <button
            className={`bookings-tab ${activeTab === 1 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Upcoming Bookings
          </button>
          <button
            className={`bookings-tab ${activeTab === 2 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Previous Bookings
          </button>
        </div>
        <div className="bookings-data-container center-div">
          <div className="flex">
            <div className="bookings-from-container">
              <h3>From</h3>
              <p>{bookingData.toAddress}</p>
            </div>
            <div className="bookings-image-container">
              {" "}
              <img src={Arrow} alt={"arrow"}></img>
            </div>
            <div className="bookings-from-container margin-left-20">
              <h3>To</h3>
              <p>{bookingData.fromAddress}</p>
            </div>
          </div>
          <div>
            <div className="flex align-center more-details-section">
              <div className="flex bookings-deatils-option">
                <img src={House} alt="house"></img>
                <span>{bookingData.houseType}</span>
              </div>
              <div className="flex bookings-deatils-option">
                <img src={Box} alt="Box"></img>
                <span>{bookingData.cartoonCount} Cartoons</span>
              </div>
              <div className="flex bookings-deatils-option">
                <img src={Electic} alt="Box"></img>
                <span>{bookingData.applianceCount}</span>
              </div>
              <div className="flex bookings-deatils-option">
                <img src={Distance} alt="Box"></img>
                <span>{bookingData.distance}</span>
              </div>
              <div className="flex bookings-deatils-option">
                <img src={Calemder} alt="Box"></img>
                <span>
                  {bookingData.pickUpDate}onwards {bookingData.pickUpTime}
                </span>
              </div>
              <div className="flex bookings-deatils-option no-border">
                <span>Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
