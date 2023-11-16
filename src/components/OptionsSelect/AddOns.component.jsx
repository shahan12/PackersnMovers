import React, { useState } from 'react';
import './options.css';
import Data from "../DATA/AddOns.json";
import minus from '../../images/minus.png';
import plus from '../../images/plus.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddOnsItems } from '../../redux/actions';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const AddOns = ({onSelect}) => {
  const dispatch = useDispatch();
  let AddOnsRedux = useSelector((state) => state.addOnsItems);
  const [selectedAddOns, setSelectedAddOns] = useState(AddOnsRedux);

  const handleAddOnClick = (addon, action) => {
    const updatedAddOns = { ...selectedAddOns }; 
  
    if (action === "add") {
      if (updatedAddOns[addon.name]) {
        if (updatedAddOns[addon.name].count < addon['max item']) {
          updatedAddOns[addon.name].count++;
        }
      } else {
        updatedAddOns[addon.name] = {
          price: addon.price,
          count: 1,
        };
      }
    } else if (action === "subtract" && updatedAddOns[addon.name]) {
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
          <div className={`daybox-item addonBox ${selectedAddOns[addon.name]?.count > 0 ? 'addonBox-hover' : ''}`} key={index}>
            <p>{addon.name}</p>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <p className='weekday-price'> ₹ {addon.price}</p>
            <Tooltip title={addon.desc} placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }}/>
              </IconButton>
            </Tooltip>
            </div>
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
