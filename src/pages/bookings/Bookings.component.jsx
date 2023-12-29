import React, { useEffect, useState } from "react";
import "./Booking.css";
import Arrow from "../../images/from-to-arrow.svg";
import DownArrow from "../../images/downarrow2.png";
import House from "../../images/house.svg";
import Box from "../../images/box.svg";
import Electic from "../../images/appliance.svg";
import orderID from "../../images/orderID.png";
import tag from "../../images/tag.png";
import Distance from "../../images/distance.svg";
import Calemder from "../../images/calender.svg";
import { getUserBookingFromBackend, retryPayment } from "../../API/apicalls";
import { performLogout } from "../../components/FillRequirements/Requirement.component";
import authmiddleware from "../../authmiddleware";

function Bookings({ }) {
  const [activeTab, setActiveTab] = useState(0);
  const [bookingDatas, setBookingDatas] = useState([]);

  let identifier = sessionStorage.getItem('identifier');

  const retryPayStatus = async (order_id, payAmount) => {
    
    sessionStorage.setItem('reOrderID', order_id);
    let paymentResponse=await retryPayment({payAmount, identifier, order_id}); //url
    
    if(paymentResponse.type === 'URLResponseError'){
      alert("We are facing some server error in payment gateway! but your Order is completed, please try payments in your bookings again later to finalize your Order!");
      window.open("/bookings", "_self");
    } else if (paymentResponse.type === 'invalidToken') {
      alert("Invalid Token!");
      performLogout();
    } else {
      let { paymentURL, merID } = authmiddleware.decryptData(paymentResponse);
      
      sessionStorage.setItem('reMerTID', merID);
      window.open(paymentURL, "_self");
    }
  }

  const getBooking = async () => {
    if (identifier) {

      const bookingDataE = await getUserBookingFromBackend(identifier);

      if (bookingDataE.type === 'serverError') {
        alert("Please Try later, serverError!");
        window.open("/", "_self");
      } else if (bookingDataE?.type === 'empty') {
        setBookingDatas([]);
      }else if (bookingDataE?.type === 'invalidToken') {
        alert("Please Try later, invalidToken!");
        performLogout();
      } else if(bookingDataE.type === 'success'){
        const bookingData = authmiddleware.decryptData(bookingDataE.ebooks);
        setBookingDatas(bookingData);
        console.log("bookingData", bookingData, bookingData?.ebooks);
      }
    } else {
      performLogout();
    }
  }

  useEffect(() => {
    getBooking();
  }, [])


  console.log(bookingDatas);
  return (
    <div className="bookings-wrapper">
      <h2>Bookings</h2>
      <div className="border-bottom"></div>
      <div className="bookings-content-wrapper center-div">

        <div className="inventory-selection-parent">
          <span className={`${activeTab === 0 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(0)}>
            Ongoing
          </span>
          <span className={`${activeTab === 1 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(1)}>
            Upcoming
          </span>
          <span className={`${activeTab === 2 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => setActiveTab(2)}>
            Previous
          </span>
        </div>

        {bookingDatas.length > 0 ? (
          bookingDatas.map((data, index) => (
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
                  <span>{data?.additional_box} Cartons</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Electic} alt="Box" />
                  <span>{data?.total_items} Items</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Distance} alt="Box" />
                  <span>{data?.total_distance}</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={tag} alt="Box" />
                  <span>₹{data?.final_amount}</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Calemder} alt="Box" />
                  <span>{new Date(data?.book_date).toDateString()} onwards {data?.book_slot_time}</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={tag} alt="Box" />
                  <span>{data.final_payment_code === "PAYMENT_SUCCESS" ? 'Payment Successful' : 'Payment Error Please Try Payment Again'}</span>
                </div>
                {/* Retry button conditionally rendered */}
                {data.final_payment_code !== "PAYMENT_SUCCESS" && (
                  <button className="retry-button" onClick={() => retryPayStatus(data.order_id, data.final_amount)}>
                    Retry Payment
                  </button>
                )}
              </div>
              <div className="top-right-image-container">
                <img src={orderID} alt="top-right-image" />
                <span className="top-right-text" >Order ID: {data?.order_id}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="null-container">
            <p>No bookings available.</p>
          </div>
        )}




      </div>
    </div>
  );
}

export default Bookings;