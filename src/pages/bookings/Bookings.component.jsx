import React, { useEffect, useState } from "react";
import "./Booking.css";
import Arrow from "../../images/from-to-arrow.svg";
import DownArrow from "../../images/downarrow2.png";
import House from "../../images/house.svg";
import Box from "../../images/box.svg";
import Electic from "../../images/appliance.svg";
import Distance from "../../images/distance.svg";
import Calemder from "../../images/calender.svg";
// import bookingData from "./bookings.json";
import { getUserBookingFromBackend } from "../../API/apicalls";

// console.log(bookingData);
function Bookings({}) {
  const [activeTab, setActiveTab] = useState(0);
  const [bookingDatas,setBookingDatas]=useState([]);

  useEffect(()=>{
    const getBooking=async()=>{
      const bookingDataRes=await getUserBookingFromBackend();
      // console.log("in frontend booking data : ", bookingDataRes);
      setBookingDatas(bookingDataRes);
    }

    getBooking();
  },[])


  return (
    <div className="bookings-wrapper">
      <h2>Bookings</h2>
      <div className="border-bottom"></div>
      <div className="bookings-content-wrapper center-div">

        <div className="inventory-selection-parent">
          <span className={`bookings-tab ${activeTab === 0 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(0)}>
            Ongoing Bookings
          </span>
          <span className={`bookings-tab ${activeTab === 1 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(1)}>
            Upcoming Bookings
          </span>
          <span className={`bookings-tab ${activeTab === 2 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(2)}>
            Previous Bookings
          </span>
        </div>



        {bookingDatas.map((data, index) => (
        <div className="bookings-data-container">
            <div key={index} className="address">
              <div className="bookings-from-container">
                <span style={{ padding: '0.5rem 0', fontWeight: '700' }}>From</span>
                <span>{data?.from_address}</span>
              </div>
              <div className="bookings-image-container">
                <img src="arrow-image-url" alt="arrow" />
              </div>
              <div className="bookings-from-container">
                <span style={{ padding: '0.5rem 0', fontWeight: '700' }}>To</span>
                <span>{data?.to_address}</span>
              </div>
            </div>
            <div className="more-details-section">
              <div className="bookings-deatils-option">
                <img src={House} alt="house" />
                <span>{data?.house_type}</span>
              </div>
              <div className="bookings-deatils-option">
                <img src={Box} alt="Box" />
                <span>{data?.total_box} Cartons</span>
              </div>
              <div className="bookings-deatils-option">
                <img src={Electic}  alt="Box" />
                <span>{data?.total_items} Items</span>
              </div>
              <div className="bookings-deatils-option">
                <img  src={Distance} alt="Box" />
                <span>{data?.total_distance} km</span>
              </div>
              <div className="bookings-deatils-option">
                <img src={Calemder}  alt="Box" />
                <span>{new Date(data?.book_date).toDateString()} onwards {data?.book_slot_time}</span>
              </div>
            </div>
          </div>
          ))}




      </div>
    </div>
  );
}

export default Bookings;
