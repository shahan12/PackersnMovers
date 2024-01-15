// dropDown.component.jsx
import React from "react";
import "./dropDown.css";
import Data from "../relocate/data.json"; // Import Data from the correct path

function DropDown({ value, setValue, option, onSelect, disabled }) {
  return (
    <>
      <select
        onChange={(e) => {
          const selectedCity = option.find((city) => city.name === e.target.value);
          setValue(selectedCity.name);
          onSelect(selectedCity);
        }}
        value={value}
        className="dropDown-container"
        disabled={disabled}
      >
        {option.map((item, index) => (
          <option
            key={`${item.name}_${index}`}
            value={item.name}
            className="drop-down-options"
          >
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropDown;
