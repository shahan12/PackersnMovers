import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import "./calendar.css";
import { sendFinalItemsToBackend, makePaymentRequest } from '../../API/apicalls';
import loaderIcon from '../../images/loader.gif';

import Modal from "react-modal";
import ThankYouModal from "../ThankYouModal/thankYouModal.component";
const Progress = ({ progress, setProgress }) => {

  let RequirementsRedux = useSelector((state) => state.RequirementsItems);        // all requirementData like floor, lift, family
  let AddOnsADDED = useSelector((state) => state.addOnsItems);    // all add ons items
  let ITEMADDED = useSelector((state) => state.selectedItems);      // all selected inventory item
  let DateTimeRedux = useSelector((state) => state.DateTime);       // date and time selection 
  let totalCostRedux = useSelector((state) => state.TotalCostItems);     //  total/cft/totalitems/base price/floor price/package selection/package price

  const [paymentURL, setPaymentURL]=useState("");

  const [loader, setLoader] = useState(false);
  const [totalCost, setTotalCost] = useState(useSelector((state) => state.TotalCostItems));
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

  const fetchPaymentURL=async ()=>{
    let fullPayment=1;
    let paymentResponse=await makePaymentRequest(fullPayment); //url

    if(paymentResponse==="failed"){
      setPaymentURL("");
      if (window.confirm("Payment has been failed, Please Try again!")) {
        fetchPaymentURL();
      } else {
        setProgress("dateselection");
      }
    }
    else{
      window.open(paymentResponse);
      setPaymentURL(paymentResponse);
    }
  }

  const bookingConfirm = async () => {
    setLoader(true);
    const API_DATA={"user_inventory": ITEMADDED, "addons": AddOnsADDED, "dataTime": DateTimeRedux, "totalCost": totalCostRedux,"mobile": RequirementsRedux.requirements.phoneNumber};
    const response=await sendFinalItemsToBackend(API_DATA);
    if (progress === "progress" && response) {
      fetchPaymentURL();
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
          <span>Packaging Selected: {totalCost?.packaging}</span>
          <span>₹{totalCost?.packagingPrice}</span>
        </div>
        <div className="cost-details-child cost-line">
          <span>Total Cost: </span>
          <span className="highlightcost">₹{totalCost?.totalCost}</span>
        </div>
      </div>

      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className="prevButton" onClick={prev}>
          &lt; Previous
        </div>
        {loader ? (
            <img style={{width: '1.25rem'}} src={loaderIcon} alt="loader" />
          ) : (
          <button style={{backgroundColor: 'white'}} className="cta-button" onClick={bookingConfirm}>
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default Progress;
