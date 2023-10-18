import React, { useState, useEffect} from 'react';
import DateOption from '../OptionsSelect/dateOption.component';
import AddOns from '../OptionsSelect/AddOns.component';
import TimeSelect from '../OptionsSelect/TimeSelect.component';
import PackageSelect from '../OptionsSelect/PackageSelect.component';
import { useDispatch } from 'react-redux';
import { updateDateTime } from '../../redux/actions';

import "./calendar.css";

const Dateselection = ({progress, setProgress, setPackageSel}) => {

  const [selectedDay, setSelectedDay] = useState('null');
  const [selectedTime, setSelectedTime] = useState('null');
  const [addOnItems, setAddOnItems] = useState('null');
  
  const dispatch = useDispatch();

  const prev = () => {
    if (progress === 'dateselection') {
      setProgress('inventory');
  }};


  useEffect(() => {
  
    let dayTimeSelection = {
      "selectedDay": selectedDay,
      "selectedTime": selectedTime
    }
    
    dispatch(updateDateTime(dayTimeSelection));
  
    }, [selectedDay, selectedTime])
  
  const FlatrequireMents = () => {
    if (progress === 'dateselection') {
      setProgress('progress');
    }}

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  const handleAddOnselect = (adds) => {
    setAddOnItems(adds);
  };
  const handlePackageSelect = (adds) => {
    setPackageSel(adds);
  };


  console.log(selectedDay);
  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Fill Requirments</h2>
      </div>
      <div className="date-type-wrapper">
        <h3>Choose Date</h3>
          <DateOption
            onSelect={handleDaySelect}
          />
      </div>
      
      <div className="date-type-wrapper">
        <h3>Select Pick-Up Time Slot</h3>
          <TimeSelect
            onSelect={handleTimeSelect}
          />
      </div>
      <div className="date-type-wrapper">
        <h3>Add Ons</h3>
          <AddOns
            onSelect={handleAddOnselect}
          />
      </div>
      <div className="date-type-wrapper">
        <h3>Select Packaging</h3>
          <PackageSelect
            onSelect={handlePackageSelect}
          />
      </div>
      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className='prevButton' onClick={prev}>&lt; Previous</div>
        <button className="cta-button" onClick={FlatrequireMents}>NEXT</button>
      </div>
    </div>
  );
};

export default Dateselection;
