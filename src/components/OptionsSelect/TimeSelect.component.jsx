import React, { useState } from "react";
import "./options.css";

const TimeSelect = ({ onSelect, selectedTime, selectedDayValue}) => {
  const [selectedRange, setSelectedRange] = useState(selectedTime);
  
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

  // function compareTime(givenTime){
  //   let givenHr=parseInt(givenTime.split("-")[0]);
  //   let givenDr=givenTime.split(" ")[1];
  //   let curr=new Date();
  //   let currTime=curr.toLocaleString([], {hour: '2-digit',minute: '2-digit'});
  //   let currHr= parseInt(currTime.split(":")[0]);
  //   let currDr=currTime.split(" ")[1];
  //   let currDate=curr.getDate();

  //   // console.log("earlier ",currHr,currDr,"---",givenHr,givenDr);
    
  //   if(currDr==='AM') currHr=currHr%12;
  //   else if(currDr==='PM') currHr=12+(currHr%12);
    
  //   if(givenDr==='AM') givenHr=givenHr%12;
  //   else if(givenDr==='PM') givenHr=12+(givenHr%12);
    
  //   if(currDate===selectedDayValue.date){
  //     // console.log(currHr,currDr,"---",givenHr,givenDr);
  //     console.log(currHr>=givenHr);
  //     return currHr>=givenHr;
  //   }
  //   else return false;
  // }

  return (
    <div className="time-range-selector">
      <div className="row-select-time">
        {[timeRanges[0], timeRanges[1]].map((range) => {
          // let isDisable=compareTime(range.label);
          return(
          <div
          // disabled={isDisable}
            key={range.id}
            className={`time-range ${
              selectedRange && selectedRange.id === range.id ? "selected" : ""
            }`}
            onClick={() => handleRangeClick(range)}
          >
            {range.label}
          </div>
        )})}
      </div>
      <div className="row-select-time">
        {secondRow.map((range) => {
          // let isDisable=compareTime(range.label);
          return(
          <div
          // disabled={isDisable}
            key={range.id}
            className={`time-range ${
              selectedRange && selectedRange.id === range.id ? "selected" : ""
            }`}
            onClick={() => handleRangeClick(range)}
          >
            {range.label}
          </div>
        )})}
      </div>
    </div>
  );
};

export default TimeSelect;
