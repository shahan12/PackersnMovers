import React, { useState } from "react";
import DateOption from "../OptionsSelect/dateOption.component";
import AddOns from "../OptionsSelect/AddOns.component";
import TimeSelect from "../OptionsSelect/TimeSelect.component";
import { format, isWeekend } from "date-fns";

import "./calendar.css";

const Dateselection = ({ progress, setProgress }) => {
  const FlatrequireMents = () => {
    if (progress === "dateselection") {
      setProgress("progress");
    }
  };
  const [selectedDay, setSelectedDay] = useState("null");
  const [selectedTime, setSelectedTime] = useState("null");
  const [addOnItems, setAddOnItems] = useState("null");

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  const handleAddOnselect = (adds) => {
    setAddOnItems(adds);
  };

  console.log(selectedDay);
  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Fill Requirments</h2>
      </div>
      <div className="date-type-wrapper">
        <h3>Choose Date</h3>
        <DateOption onSelect={handleDaySelect} />
      </div>

      <div className="date-type-wrapper">
        <h3>Select Pick-Up Time Slot</h3>
        <TimeSelect
          onSelect={handleTimeSelect}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div className="date-type-wrapper">
        <h3>Add Ons</h3>
        <AddOns onSelect={handleAddOnselect} />
      </div>
      <div className="fill-req-CTA-container flex nextbuttonMove">
        <button className="cta-button" onClick={FlatrequireMents}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Dateselection;
