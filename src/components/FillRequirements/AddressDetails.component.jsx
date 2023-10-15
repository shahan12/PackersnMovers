import React, { useState } from "react";
import DropDown from "../dropDown/dropDown.component";

import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";



function AddressDetails() {

  
  const [fromCity, setFromCity] = useState("Bangalore");
  const [toCity, setToCity] = useState("Bangalore");
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="requirements-section-2 flex">
    <div className="requirements-your-details-wrapper">
      <div className="border-bottom extra-margin">
        <h2>Your Details</h2>
      </div>
      <div className="flex space-between requirement-sub-header">
        <span>Address</span>
        <img
          src={Edit}
          alt={"Edit-Icon"}
          className="edit-icon"
          onClick={() => {
            setDisabled(!disabled);
          }}
        ></img>
      </div>
      <div className="relocate-drop-down-container margin-bottom-10">
        <DropDown
          value={fromCity}
          setValue={setFromCity}
          option={Data.IndianCitiesPinCode}
          disabled={disabled}
        />
      </div>
      <div className="relocate-drop-down-container">
        <DropDown
          value={toCity}
          setValue={setToCity}
          option={Data.IndianCitiesPinCode}
          disabled={disabled}
        />
      </div>
    </div>
    <div className="requirements-your-details-wrapper">
      <div className="border-bottom extra-margin">
        <h2>Cost Of Moving</h2>
      </div>
      <div className="cost-details">
          <div className="cost-details-child"> 
            <span>Base Price</span>
            <span></span>
          </div>
          <div className="cost-details-child"> 
            <span>Floor Charges</span>
            <span></span>
          </div>
          <div className="cost-details-child"> 
            <span>Total Items Added</span>
            <span></span>
          </div>
          <div className="cost-details-child"> 
            <span>CFT</span>
            <span></span>
          </div>
          <div className="cost-details-child"> 
            <span>Add Ons</span>
            <span></span>
          </div>
      </div>
    </div>
  </div>
  );
}

export default AddressDetails;