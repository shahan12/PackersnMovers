import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PackageSelect from '../OptionsSelect/PackageSelect.component';
import "./calendar.css";

const Progress = ({progress, setProgress}) => {

  let totalCost = useSelector((state) => state.TotalCostItems);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  
  console.log(totalCost);
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
            <span>{totalCost.basePrice}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Add Ons</span>
            <span>{totalCost.addonsPrice}</span>
          </div>
          <div className="cost-details-child"> 
            <span>Choose Packaging</span>
            <span onClick={openModal}>Select</span>
          </div>
          <PackageSelect isOpen={isModalOpen} onRequestClose={closeModal} />
          <div className="cost-details-child cost-line"> 
            <span>Total Cost: </span>
            <span className="highlightcost">₹{totalCost.totalCost}</span>
          </div>
      </div>
    </div>
  );
};

export default Progress;
