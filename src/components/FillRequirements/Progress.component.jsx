import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import "./calendar.css";
import { sendFinalItemsToBackend, makePaymentRequest } from '../../API/apicalls';
import loaderIcon from '../../images/loader.gif';
import { performLogout } from "./Requirement.component";
const authmiddleware = require('../../authmiddleware');

const Progress = ({ progress, setProgress }) => {
  
  let RequirementsRedux = useSelector((state) => state.RequirementsItems);        // all requirementData like floor, lift, family
  let AddOnsADDED = useSelector((state) => state.addOnsItems);    // all add ons items
  let ITEMADDED = useSelector((state) => state.selectedItems);      // all selected inventory item
  let DateTimeRedux = useSelector((state) => state.DateTime);       // date and time selection 
  let totalCostRedux = useSelector((state) => state.TotalCostItems);     //  total/cft/totalitems/base price/floor price/package selection/package price

  const [loader, setLoader] = useState(false);
  const [totalCost, setTotalCost] = useState(useSelector((state) => state.TotalCostItems));
  
  const selectedItemsRedux = useSelector((state) => state.selectedItems);
  useEffect(() => {
    if (RequirementsRedux) {
    setTotalCost(totalCostRedux);
    }
  }, [totalCostRedux]);

  const prev = () => {
    if (progress === "progress") {
      setProgress("dateselection");
    }
  };
  // console.log("selectedItemsRedux", selectedItemsRedux);
  let identifier = sessionStorage.getItem('identifier');
  let orderSessionId = sessionStorage.getItem('orderSessionId');
  let token = sessionStorage.getItem('token');

  const fetchPaymentURL = async () => {
    // let fullPayment = Math.round(totalCost?.surgedTotalCost*0.1);
    // let fullPayment=totalCostRedux.surgedTotalCost;
    let fullPayment = "1";
    
    let savedOrderID = sessionStorage.getItem('orderID');
    let paymentResponse=await makePaymentRequest({fullPayment, identifier, savedOrderID, orderSessionId}); //url
    
    if(paymentResponse.type === 'URLResponseError'){
      alert("We are facing some server error in payment gateway! but your Order is completed, please try payments in your bookings again later to finalize your Order!");
      window.open("/bookings", "_self");
    } else if (paymentResponse.type === 'invalidToken') {
      alert("Invalid Token!");
      performLogout();
    } else {
      let { paymentURL: paymentURL, merID: merID } = authmiddleware.decryptData(paymentResponse);
      sessionStorage.setItem('merID', merID);
      window.open(paymentURL, "_self");
    }
  }

  const bookingConfirm = async () => {

    if(orderSessionId && identifier && token) {
      const API_DATA={"user_inventory": ITEMADDED, "addons": AddOnsADDED, "dataTime": DateTimeRedux, "totalCost": totalCostRedux,"mobile": identifier, "orderSessionId": orderSessionId};
      const response=await sendFinalItemsToBackend(API_DATA);
      // console.log("inventory response", response);
      if (response.type === "invalidToken") {
        setLoader(false);
        alert("Please Login Again!");
        performLogout();
      } else if (response.type === "failed") {
        setLoader(false);
        alert("Server Error, please try later!");
        performLogout();
      } else if (!response) {
        performLogout();
      } else {
      setLoader(false);
      sessionStorage.setItem('orderID', response);
      fetchPaymentURL();
      }
    } else {
      alert("Please Login Again!");
      performLogout();
    }
  };


  // const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Confirm</h2>
      </div>
      <div className="cost-details">
        <div className="cost-details-child">
          <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
            Order Details
          </span>
        </div>
        <div className="cost-details-child">
          <span>Base Price</span>
          <span>₹{totalCost?.basePrice}</span>
        </div>
        <div className="cost-details-child">
          <span>Floor Charges</span>
          <span>₹{totalCost?.floorCharges}</span>
        </div>
        <div className="cost-details-child">
          <span>Total Items Added</span>
          <span>{totalCost?.totalItemCount}</span>
        </div>
        <div className="cost-details-child">
          <span>Additional Boxes: {totalCost?.totalBox}</span>
          <span>₹{totalCost?.totalBoxPrice}</span>
        </div>
        <div className="cost-details-child">
          <span>CFT</span>
          <span>{totalCost?.cft}</span>
        </div>
        <div className="cost-details-child">
          <span>Add Ons</span>
          <span>₹{totalCost?.addonsPrice}</span>
        </div>
        
        <div className="cost-details-child">
          <span>Surge Price</span>
          <span>₹{totalCost?.surgePrice}</span>
        </div>
        <div className="cost-details-child">
          <span>Packaging Selected: {totalCost?.packaging}</span>
          <span>₹{totalCost?.packagingPrice}</span>
        </div>
        <div className="cost-details-child cost-line">
          <span>Total Cost: </span>
          <span className="highlightcost">₹{totalCost?.surgedTotalCost}</span>
        </div>
      </div>

      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className="prevButton" onClick={prev}>
          &lt; Previous
        </div>
        {/* {loader ? (
            <img style={{width: '1.25rem'}} src={loaderIcon} alt="loader" />
          ) : (
     */}
          <button className="cta-button" onClick={()=>{bookingConfirm() ; setLoader(true);}}>
            Book Now @ ₹99
          </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default Progress;
