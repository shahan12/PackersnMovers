import React, { useState } from 'react';
import './options.css';
import { useSelector } from 'react-redux';

const PackageSelect = ({onSelect, packageSel}) => {
  let RequirementsRedux = useSelector((state) => state.RequirementsItems); 
  const [selectedRange, setSelectedRange] = useState(packageSel ? packageSel : { packageName: 'Standard', price: 0 });
  
  const houseType = RequirementsRedux.requirements.houseType;
  let price;
  
  switch (houseType) {
    case "1 RK":
      price = 1000;
      break;
    case "1 BHK":
      price = 2000;
      break;
    case "2 BHK":
      price = 3000;
      break;
    default:
      price = 0; // Set a default price if the house type is not recognized.
  }
  
  const packageSelect = [
    { packageName: 'Standard', price: 0 },
    { packageName: 'Special', price: price },
  ];

  const handleRangeClick = (range) => {
    setSelectedRange(range);
    onSelect(range);
  };


  return (
    <div className="time-range-selector">
      <div className="row-select-time">
        {packageSelect.map((range) => (
          <div
            key={range.packageName}
            className={`time-range package-range ${selectedRange.packageName === range.packageName ? 'selected' : ''}`}
            onClick={() => handleRangeClick(range)}
          >
            <p>{range.packageName} </p>
            <p>₹{range.price} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelect;
