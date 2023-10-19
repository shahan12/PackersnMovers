import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./calendar.css";

import Modal from 'react-modal';
const Progress = ({progress, setProgress}) => {

  let ITEMADDED = useSelector((state) => state.selectedItems);
  console.log("ITEMADDED", ITEMADDED);
  const prev = () => {
    if (progress === 'progress') {
      setProgress('dateselection');
  }};

  let DateTime = useSelector((state) => state.DateTime);
  
  const bookingConfirm = () => {
    if (progress === 'progress') {
      openModal();
    }};

  let totalCost = useSelector((state) => state.TotalCostItems);

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
            <span style={{fontWeight: '600', fontSize: '1.2rem'}}>Order Details</span>
          </div>
          <div className="cost-details-child"> 
            <span>Base Price</span>
            <span>{totalCost.basePrice}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Floor Charges</span>
            <span>{totalCost.floorCharges}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Total Items Added</span>
            <span>{totalCost.totalItemCount}</span>
          </div>
          <div className="cost-details-child"> 
            <span>CFT</span>
            <span>{totalCost.cft}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Add Ons</span>
            <span>{totalCost.addonsPrice}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Packaging Selected: {totalCost.packaging}</span>
            <span>{totalCost.packagingPrice}</span>
          </div>
          <div className="cost-details-child cost-line"> 
            <span>Total Cost: </span>
            <span className="highlightcost">₹{totalCost.totalCost}</span>
          </div>
      </div>
      
      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className='prevButton' onClick={prev}>&lt; Previous</div>
        <button className="cta-button" onClick={bookingConfirm}>Confirm Booking</button>
      </div>
      <Modal
        className="thankyou"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thank You Modal"
      >
        <h2>Thank You</h2>
        <p>Your booking has been confirmed. We appreciate your business!</p>
        <button className="cta-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Progress;
