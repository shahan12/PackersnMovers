import React, { useState, useEffect } from "react";
import "./options.css";

const TimeSelect = ({ onSelect, selectedTime, selectedDayValue }) => {
  const [selectedRange, setSelectedRange] = useState(selectedTime);
  const [disabledRanges, setDisabledRanges] = useState([]);

  // console.log(selectedDayValue.date,"selectedDayValue in time");
  const timeRanges = [
    { id: 1, label: "6-8 AM", label2: "6-8" },
    { id: 2, label: "8-10 AM", label2: "8-10" },
    { id: 3, label: "1-3 PM", label2: "13-15" },
    { id: 4, label: "4-6 PM", label2: "16-18" },
  ];
  const getCurrentDay = () => {
    const today = new Date();
    const day = today.getDate();
    return day;
  };
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (!selectedDayValue.date || selectedDayValue.date === getCurrentDay()) {
      const disabledRanges = timeRanges.filter((range) => {
        const endTime = parseInt(range.label2.split("-")[0]);
        const timeDifference = endTime - currentHour;
        return timeDifference < 4;
      });

      setDisabledRanges(disabledRanges);
    } else {
      setDisabledRanges([]);
    }
  }, [selectedDayValue]);



  const handleRangeClick = (range) => {
    setSelectedRange(range);
    onSelect(range);
  };

  const isRangeDisabled = (range) => {
    return disabledRanges.some((disabledRange) => disabledRange.id === range.id);
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
              (selectedRange && selectedRange.id === range.id ? "selected" : "") +
              (isRangeDisabled(range) ? " disabled" : "")
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
              (selectedRange && selectedRange.id === range.id ? "selected" : "") +
              (isRangeDisabled(range) ? " disabled" : "")
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
