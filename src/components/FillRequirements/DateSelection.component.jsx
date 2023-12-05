
import React, { useState, useEffect} from 'react';
import DateOption from '../OptionsSelect/dateOption.component';
import AddOns from '../OptionsSelect/AddOns.component';
import TimeSelect from '../OptionsSelect/TimeSelect.component';
import PackageSelect from '../OptionsSelect/PackageSelect.component';
import { useDispatch, useSelector } from 'react-redux';
import { updateDateTime, updateTotalCost } from '../../redux/actions';

import "./calendar.css";

const Dateselection = ({setProgress, packageSel, setPackageSel}) => {

  let DateTimeRedux = useSelector((state) => state.DateTime);
  let totalCostRedux = useSelector((state) => state.TotalCostItems);
  const [selectedDay, setSelectedDay] = useState(DateTimeRedux.selectedDay || "");
  const [selectedTime, setSelectedTime] = useState(DateTimeRedux.selectedTime || "");
  const [addOnItems, setAddOnItems] = useState({});
  const [weekend, setWeekend] = useState(totalCostRedux.isWeekend || false);
  
  const dispatch = useDispatch();
  useEffect(() => {
  
    let dayTimeSelection = {
      "selectedDay": selectedDay,
      "selectedTime": selectedTime
    }
    
  dispatch(updateDateTime(dayTimeSelection));
  }, [selectedDay, selectedTime])
  
  useEffect(() => {
    let totalcostData = {
      "isWeekend": weekend,
    }
    dispatch(updateTotalCost(totalcostData));

  }, [weekend]);
  
  const FlatrequireMents = () => {
   
    setProgress('progress');
  }

  const handleDaySelect = (day) => {
    setWeekend(day.isWeekend);
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


  const handlePrevious = () => {
    setProgress('inventory');
  };

  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Fill Requirments</h2>
      </div>
      <div className="date-type-wrapper">
        <h3>Choose Date</h3>
        <DateOption selectedDayValue={selectedDay} onSelect={handleDaySelect} />
      </div>

      <div className="date-type-wrapper">
        <h3>Select Pick-Up Time Slot</h3>
        <TimeSelect
          onSelect={handleTimeSelect}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedDayValue={selectedDay}
        />
      </div>
      <div className="date-type-wrapper">
        <h3>Add Ons</h3>
        <AddOns onSelect={handleAddOnselect} />
      </div>
      <div className="date-type-wrapper">
        <h3>Select Packaging</h3>
          <PackageSelect
            packageSel={packageSel}
            onSelect={handlePackageSelect}
          />
      </div>
      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className='prevButton' onClick={handlePrevious}>&lt; Previous</div>
        <button disabled={!selectedDay || !selectedTime || !packageSel} className="cta-button" onClick={FlatrequireMents}>NEXT</button>

      </div>
    </div>
  );
};

export default Dateselection;
