import React from "react";
import "./dropDown.css";
function DropDown({ value, setValue, option, disabled }) {
  return (
    <>
      <select
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="dropDown-container"
        disabled={disabled}
      >
        {option.map((item, index) => {
          return (
            <option
              key={`${item.name}_${index}`}
              value={item.name}
              className="drop-down-options"
            >
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default DropDown;
