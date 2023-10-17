import React, { useState } from 'react';
import './options.css';
import Data from "../DATA/AddOns.json";
import minus from '../../images/minus.png';
import plus from '../../images/plus.png';
import { useDispatch } from 'react-redux';
import { updateAddOnsItems } from '../../redux/actions';

const AddOns = ({onSelect}) => {
  const dispatch = useDispatch();
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handleAddOnClick = (addon, action) => {
    const updatedAddOns = { ...selectedAddOns }; // Convert the array to an object
  
    if (action === "add") {
      if (updatedAddOns[addon.name]) {
        // If the add-on already exists, increase the count if it's within the limit
        if (updatedAddOns[addon.name].count < addon['max item']) {
          updatedAddOns[addon.name].count++;
        }
      } else {
        // If the add-on doesn't exist, create a new entry
        updatedAddOns[addon.name] = {
          price: addon.price,
          count: 1,
        };
      }
    } else if (action === "subtract" && updatedAddOns[addon.name]) {
      // If the action is subtract and the add-on exists, decrease the count
      if (updatedAddOns[addon.name].count > 0) {
        updatedAddOns[addon.name].count--;
      }
    }
  
    setSelectedAddOns(updatedAddOns);
    dispatch(updateAddOnsItems(updatedAddOns));
  };
  
  return (
    <div className="day-box parent-addon">
        {Data.AddOns.map((addon, index) => (
          <div className='daybox-item addonBox' key={index}>
            <p>{addon.name}</p>
            <p className='weekday-price'> ₹ {addon.price}</p>
            <div className='addonbox-counter'>
              <button onClick={() => handleAddOnClick(addon, "subtract")}>
                <img src={minus} alt="Subtract" />
              </button>
              <span>{selectedAddOns[addon.name]?.count || 0}</span>
              <button onClick={() => handleAddOnClick(addon, "add")}>
                <img src={plus} alt="Add" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AddOns;
