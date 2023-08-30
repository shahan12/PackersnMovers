import React from "react";
import "../dropDown/dropDown.css";
function InputLanding({ selectedCity, option, setPinCode, pinCode }) {
  
  let cityData = null;
  
  for (const city of option) {
    if (city.name === selectedCity) {
      cityData = city;
      break;
    }
  }
  const pincodeOptions = [];
  for (let pincode = cityData.minPincode; pincode <= cityData.maxPincode; pincode++) {
    pincodeOptions.push(<option key={pincode} value={pincode}>{pincode}</option>);
  }
  return (
    <>
      <select
        onChange={(e) => setPinCode(e.target.value)}
        value={pinCode}
        className="dropDown-container"
      >
        <option value="">Select</option>
        {pincodeOptions}
      </select>
    </>
  );
}

export default InputLanding;