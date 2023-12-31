import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import "./calendar.css";

import Modal from "react-modal";
import ThankYouModal from "../ThankYouModal/thankYouModal.component";
const Progress = ({ progress, setProgress }) => {

  let RequirementsRedux = useSelector((state) => state.RequirementsItems);        // all requirementData like floor, lift, family
  let AddOnsADDED = useSelector((state) => state.addOnsItems);    // all add ons items
  let ITEMADDED = useSelector((state) => state.selectedItems);      // all selected inventory item
  let DateTimeRedux = useSelector((state) => state.DateTime);       // date and time selection 
  let totalCostRedux = useSelector((state) => state.TotalCostItems);     //  total/cft/totalitems/base price/floor price/package selection/package price

  
  const [totalCost, setTotalCost] = useState();
  console.log("from redux total item ",RequirementsRedux);
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

  const bookingConfirm = () => {
    if (progress === "progress") {
      openModal();
    }
  };


  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          <span>{totalCost?.basePrice}</span>
        </div>
        <div className="cost-details-child">
          <span>Floor Charges</span>
          <span>{totalCost?.floorCharges}</span>
        </div>
        <div className="cost-details-child">
          <span>Total Items Added</span>
          <span>{totalCost?.totalItemCount}</span>
        </div>
        <div className="cost-details-child">
          <span>CFT</span>
          <span>{totalCost?.cft}</span>
        </div>
        <div className="cost-details-child">
          <span>Add Ons</span>
          <span>{totalCost?.addonsPrice}</span>
        </div>
        <div className="cost-details-child">
          <span>Packaging Selected: {totalCost?.packaging}</span>
          <span>{totalCost?.packagingPrice}</span>
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
        <button className="cta-button" onClick={bookingConfirm}>
          Confirm Booking
        </button>
      </div>
      {isModalOpen && (
        <ThankYouModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default Progress;
