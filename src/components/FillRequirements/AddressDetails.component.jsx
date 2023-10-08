import React from "react";
import DropDown from "../dropDown/dropDown.component";

import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";

function AddressDetails({ disabled, setDisabled, fromCity, setFromCity, toCity, setToCity  }) {
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
    </div>
  </div>
  );
}

export default AddressDetails;