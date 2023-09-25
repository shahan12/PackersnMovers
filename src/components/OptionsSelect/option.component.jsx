import React from "react";
import "./options.css";

function SelectOptions({ icon, value, selected, setOnClick, type }) {
  return (
    <div
      className={`options-option-wrapper center-div ${
        selected === value ? "selected" : ""
      } ${type === "house" ? "fixed-width" : ""}`}
      onClick={() => setOnClick(value)}
    >
      {icon && (
        <div className="option-icon-wrapper">
          <img src={icon} className="option-icon"></img>
        </div>
      )}
      <div
        className={`options-option-value ${
          selected === value ? "selected-text" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default SelectOptions;
