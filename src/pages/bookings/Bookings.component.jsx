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
import DownloadOrder from "../../components/DownloadCanvas/downloadOrder";
import Template from "../../components/DownloadCanvas/template";

function Bookings({ }) {
  const [activeTab, setActiveTab] = useState(0);
  const [bookingDatas, setBookingDatas] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [ongoingBookings, setOngoingBookings] = useState([])
  const [previousBookings, setPreviousBookings] = useState([])
  let identifier = sessionStorage.getItem('identifier');

  const retryPayStatus = async (order_id, payAmount) => {

    sessionStorage.setItem('reOrderID', order_id);
    let paymentResponse = await retryPayment({ payAmount, identifier, order_id }); //url

    if (paymentResponse.type === 'URLResponseError') {
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
  const formattedDate = (input) => {
    let value = new Date(input)
    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; // Months start at 0!
    let dd = value.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;

  }


  const segrigateData = (bookingData) => {
    const datee = new Date();
    const today = new Date(datee.getFullYear(), datee.getMonth(), datee.getDate());
    const todayPlusThreeDays = new Date(today);
    const todayMinusThreeDays = new Date(today);
    todayPlusThreeDays.setDate(todayPlusThreeDays.getDate() + 3);
    todayMinusThreeDays.setDate(todayMinusThreeDays.getDate() - 3);

      bookingData.sort((a, b) => {
        const today = new Date();
        
        const dateA = a.book_date ? new Date(a.book_date) : a.time_of_booking ? new Date(a.time_of_booking) : today;
        const dateB = b.book_date ? new Date(b.book_date) : b.time_of_booking ? new Date(b.time_of_booking) : today;
        
        return dateB - dateA;
    });
    

    console.log(bookingData);
    let prevData = [];
    let currData = [];
    let nextData = [];

    prevData = bookingData?.filter((item) => {

      
      if (item?.booking_type === null && new Date(item?.book_date) < today) {
        return item;
      } else if (item?.booking_type === "class2" && new Date(item?.time_of_booking) > todayPlusThreeDays) {
        return item;
      }
    });

    currData = bookingData?.filter((item) => {
      if (
        item?.booking_type === null &&
        new Date(item?.book_date) >= today &&
        new Date(item?.book_date) <= todayPlusThreeDays
      ) {
        return item;
      } else if (
        item?.booking_type === "class2" &&
        new Date(item?.time_of_booking) >= todayMinusThreeDays) {
        return item;
      }
    });

    nextData = bookingData?.filter((item) => {
      if (item?.booking_type === null && new Date(item?.book_date) > todayPlusThreeDays) {
        return item;
      }
    });


    setPreviousBookings(prevData);
    setOngoingBookings(currData);
    setUpcomingBookings(nextData);
    setBookingDatas(currData);
  };


  const getBooking = async () => {
    if (identifier) {
      const bookingDataE = await getUserBookingFromBackend(identifier);
      if (bookingDataE.type === 'serverError') {
        alert("Please Try later, serverError!");
        window.open("/", "_self");
      } else if (bookingDataE?.type === 'empty') {
        setBookingDatas([]);
      } else if (bookingDataE?.type === 'invalidToken') {
        alert("Please Try later, invalidToken!");
        performLogout();
      } else if (bookingDataE.type === 'success') {
        const bookingData = authmiddleware.decryptData(bookingDataE.ebooks);
        segrigateData(bookingData)
      }
    } else {
      performLogout();
    }
  }

  useEffect(() => {
    getBooking();
  }, [])


  return (
    <div className="bookings-wrapper">
      <h2>Bookings</h2>
      <div className="border-bottom"></div>
      <div className="bookings-content-wrapper center-div">

        <div className="inventory-selection-parent">
          <span className={`${activeTab === 0 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => { setActiveTab(0); setBookingDatas(ongoingBookings) }}>
            Ongoing
          </span>
          <span className={`${activeTab === 1 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => { setActiveTab(1); setBookingDatas(upcomingBookings) }}>
            Upcoming
          </span>
          <span className={`${activeTab === 2 ? "selected-inventory" : "non-selected-inventory"}`}
            onClick={() => { setActiveTab(2); setBookingDatas(previousBookings) }}>
            Previous
          </span>
        </div>

        {bookingDatas?.length > 0 ? (
          bookingDatas?.map((data, index) => (
            <div className="bookings-data-container">
              <div key={index} className="address">
                <div className="bookings-from-container">
                  <span style={{ padding: '0.5rem 0', fontWeight: '700' }}>From</span>
                  <span>{data?.from_address || " - "}</span>
                </div>
                <div className="bookings-image-container">
                  <img src="arrow-image-url" alt="arrow" />
                </div>
                <div className="bookings-from-container">
                  <span style={{ padding: '0.5rem 0', fontWeight: '700' }}>To</span>
                  <span>{data?.to_address || " - "}</span>
                </div>
              </div>
              <div className="more-details-section">
                <div className="bookings-deatils-option">
                  <img src={House} alt="house" />
                  <span>{data?.house_type || " - "}</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Box} alt="Box" />
                  <span>{data?.additional_box || " - "} Cartons</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Electic} alt="Box" />
                  <span>{data?.total_items || " - "} Items</span>
                </div>
                <div className="bookings-deatils-option">
                  <img src={Distance} alt="Box" />
                  <span>{data?.total_distance || " - "}</span>
                </div>
                {data?.booking_type === null && (
                  <>
                    <div className="bookings-deatils-option">
                      <img src={tag} alt="Box" />
                      <span>₹{data?.final_amount || " - "}</span>
                    </div>
                    <div className="bookings-deatils-option">
                      <img src={Calemder} alt="Box" />
                      <span>{new Date(data?.book_date).toDateString()} onwards {data?.book_slot_time || " - "}</span>
                    </div>
                  </>
                )}
                {data?.booking_type === "class2" && (
                  <>
                    <div className="bookings-deatils-option">
                      <img src={Calemder} alt="Box" />
                      <span>{new Date(data?.time_of_update).toDateString()} onwards {data?.book_slot_time || " - "}</span>
                    </div>
                  </>
                )}
                {data?.booking_type === null && (
                  <div className="bookings-deatils-option">
                    <img src={tag} alt="Box" />
                    <span>
                      {data?.final_payment_code === "PAYMENT_SUCCESS" ? 'Payment Successful' :
                        (data?.final_payment_code === "PAYMENT_PENDING" || data?.final_payment_code === "PAYMENT_ERROR") ? 'Payment Failed' :
                          data?.final_payment_code === null && data?.initial_payment_code === "PAYMENT_INITIATED" ? 'Wait for 15 minutes, verifying Payment' : ''}
                    </span>
                  </div>
                )}
                {/* Retry button conditionally rendered */}
                {(
                  (data?.final_payment_code === "PAYMENT_PENDING" || data?.final_payment_code === "PAYMENT_ERROR") &&
                  data?.initial_payment_code === "PAYMENT_INITIATED"
                ) && (
                    <button className="retry-button" onClick={() => retryPayStatus(data?.order_id, "1")}>
                      Retry Payment
                    </button>
                  )}

                {data?.booking_type && (
                  <div className="bookings-deatils-option">
                    <span>We will get back to you soon!</span>
                  </div>
                )}
                <DownloadOrder data={data} identifier={identifier} />
              </div>
              <div className="top-right-image-container">
                <img src={orderID} alt="topImage" />
                <span className="top-right-text" >Order ID: {data?.order_id || " - "}</span>
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