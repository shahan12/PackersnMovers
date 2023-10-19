import React, { useState } from 'react';
import './options.css';

const PackageSelect = ({onSelect, packageSel}) => {
  const [selectedRange, setSelectedRange] = useState(packageSel ? packageSel : { packageName: 'Standard', price: 0 });

  const packageSelect = [
    { packageName: 'Standard', price: 0 },
    { packageName: 'Special', price: 1000 }
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
            <p>{range.price} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelect;
