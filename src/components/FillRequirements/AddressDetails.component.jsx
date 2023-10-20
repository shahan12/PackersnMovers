import React, { useState, useEffect } from "react";
import DropDown from "../dropDown/dropDown.component";
import { useSelector } from 'react-redux';
import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";
import { useDispatch } from 'react-redux';
import { updateTotalCost } from '../../redux/actions';



function AddressDetails({progress, packageSel, cft, totalItemCount }) {

  const dispatch = useDispatch();
  let ITEMADDED = useSelector((state) => state.selectedItems);
  let Requirements = useSelector((state) => state.RequirementsItems);
  let AddOnsADDED = useSelector((state) => state.addOnsItems);

  const [fromCity, setFromCity] = useState("Bangalore");
  const [toCity, setToCity] = useState("Bangalore");
  const [disabled, setDisabled] = useState(true);
  const [addonsPrice, setAddonsPrice] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [floorCharges, setFloorCharges] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostBF, setTotalCostBF] = useState(0);

  useEffect(() => {
    let calculatedTotalPrice = 0;

    for (const itemName in AddOnsADDED) {
      const item = AddOnsADDED[itemName];
      calculatedTotalPrice += item.price * item.count;
    }
    setAddonsPrice(calculatedTotalPrice);
  }, [AddOnsADDED]);

  
  const newTotalCost = addonsPrice + floorCharges + basePrice + (packageSel.price ? packageSel.price : 0);
  const newTotalCostBF = floorCharges + basePrice;

  useEffect(() => {
    let totalcostData = {
      "BasePrice": basePrice,
      "FloorCharges": floorCharges,
      "totalItemCount": totalItemCount,
      "cft": cft,
      "addonsPrice": addonsPrice,
      "packaging": packageSel.packageName,
      "packagingPrice": packageSel.price,
      "totalCost": newTotalCost,
      "totalCostBF": newTotalCostBF,
    }

    setTotalCost(addonsPrice + floorCharges + basePrice + (packageSel.price ? packageSel.price : 0));
    setTotalCostBF(floorCharges +  basePrice);
    dispatch(updateTotalCost(totalcostData));

  }, [floorCharges, addonsPrice, basePrice, packageSel, cft,newTotalCost , newTotalCostBF]);

  return (
    <div className="requirements-section-2 flex">
    <div className="requirements-your-details-wrapper">
      <div className="border-bottom extra-margin">
        <h2>Your Details</h2>
      </div>
      <div className="flex space-between requirement-sub-header">
        <span>Address</span>
        <img
          src={Edit}
          alt={"Edit-Icon"}
          className="edit-icon"
          onClick={() => {
            setDisabled(!disabled);
          }}
        ></img>
      </div>
      <div className="relocate-drop-down-container margin-bottom-10">
        <DropDown
          value={fromCity}
          setValue={setFromCity}
          option={Data.IndianCitiesPinCode}
          disabled={disabled}
        />
      </div>
      <div className="relocate-drop-down-container">
        <DropDown
          value={toCity}
          setValue={setToCity}
          option={Data.IndianCitiesPinCode}
          disabled={disabled}
        />
      </div>
    </div>
    {progress === 'progress' ? ('') : (
      
      <div className="requirements-your-details-wrapper">
        <div className="border-bottom extra-margin">
          <h2>Cost Of Moving</h2>
        </div>
        <div className="cost-details">
            <div className="cost-details-child"> 
              <span>Base Price</span>
              <span></span>
            </div>
            <div className="cost-details-child"> 
              <span>Floor Charges</span>
              <span></span>
            </div>
            <div className="cost-details-child"> 
              <span>Total Items Added</span>
              <span>{totalItemCount}</span>
            </div>
            <div className="cost-details-child"> 
              <span>CFT</span>
              <span>{cft}</span>
            </div>
            <div className="cost-details-child"> 
              <span>Add Ons</span>
              <span>₹{addonsPrice}</span>
            </div>
            <div className="cost-details-child"> 
              <span>Packaging</span>
              <span>₹{packageSel.price}</span>
            </div>
            <div className="cost-details-child cost-line"> 
              <span>Total Cost: </span>
              <span className="highlightcost">₹{totalCost}</span>
            </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default AddressDetails;