import React from "react";
import "./dropDown.css";
function DropDown({ value, setVaue, option }) {
  return (
    <>
      <select
        onChange={(e) => setVaue(e.target.value)}
        value={"Select City"}
        className="dropDown-container"
      >
        {option.map((item, index) => {
          return (
            <option
              key={`${item}_${index}`}
              value={item}
              className="drop-down-options"
            >
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default DropDown;
