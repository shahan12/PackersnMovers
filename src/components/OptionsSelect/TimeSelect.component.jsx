import React, { useState } from "react";
import "./options.css";

const TimeSelect = ({ onSelect }) => {
  const [selectedRange, setSelectedRange] = useState(null);

  const timeRanges = [
    { id: 1, label: "6-8 AM" },
    { id: 2, label: "8-10 AM" },
    { id: 3, label: "1-3 PM" },
    { id: 4, label: "4-6 PM" },
  ];

  const handleRangeClick = (range) => {
    setSelectedRange(range);
    onSelect(range);
  };

  const firstRow = timeRanges.slice(0, 2);
  const secondRow = timeRanges.slice(2, 4);

  return (
    <div className="time-range-selector">
      <div className="row-select-time">
        {[timeRanges[0], timeRanges[1]].map((range) => (
          <div
            key={range.id}
            className={`time-range ${
              selectedRange && selectedRange.id === range.id ? "selected" : ""
            }`}
            onClick={() => handleRangeClick(range)}
          >
            {range.label}
          </div>
        ))}
      </div>
      <div className="row-select-time">
        {secondRow.map((range) => (
          <div
            key={range.id}
            className={`time-range ${
              selectedRange && selectedRange.id === range.id ? "selected" : ""
            }`}
            onClick={() => handleRangeClick(range)}
          >
            {range.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelect;
