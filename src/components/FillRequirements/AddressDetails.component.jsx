import React, { useState, useEffect } from "react";
import DropDown from "../dropDown/dropDown.component";
import { useSelector } from 'react-redux';
import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";
import { useDispatch } from 'react-redux';
import { updateTotalCost } from '../../redux/actions';
import Progress from "./Progress.component";



function AddressDetails({progress}) {

  const dispatch = useDispatch();
  let ITEMADDED = useSelector((state) => state.selectedItems);
  let AddOnsADDED = useSelector((state) => state.addOnsItems);

  const [fromCity, setFromCity] = useState("Bangalore");
  const [toCity, setToCity] = useState("Bangalore");
  const [disabled, setDisabled] = useState(true);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [cft, setCft] = useState(0);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [floorCharges, setFloorCharges] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [packaging, setPackaging] = useState(null);
  const [packagingPrice, setPackagingPrice] = useState(0);

  useEffect(() => {

  setTotalCost(addonsPrice + floorCharges +  basePrice + packagingPrice);

  let totalcostData = {
    "BasePrice": basePrice,
    "FloorCharges": floorCharges,
    "totalItemCount": totalItemCount,
    "cft": cft,
    "addonsPrice": addonsPrice,
    "packaging": packaging,
    "packagingPrice": packagingPrice,
    "totalCost": totalCost,
  }
  
  dispatch(updateTotalCost(totalcostData));

  }, [floorCharges, addonsPrice, basePrice])


  useEffect(() => {

    const calculateTotalAndCft = () => {
      let totalCount = 0;
      let totalCft = 0;

      for (const key in ITEMADDED) {
        const furniture = ITEMADDED[key];
        for (const itemType in furniture['sofa']) {
          const item = furniture['sofa'][itemType];
          totalCount += item.count;
          totalCft += item.count * item.cost;
        }
      }
      setTotalItemCount(totalCount);
      setCft(totalCft);
    };

    // Call the calculation function
    calculateTotalAndCft();
  }, [ITEMADDED]);

  useEffect(() => {
    let calculatedTotalPrice = 0;

    for (const itemName in AddOnsADDED) {
      const item = AddOnsADDED[itemName];
      calculatedTotalPrice += item.price * item.count;
    }

    setAddonsPrice(calculatedTotalPrice);
  }, [AddOnsADDED]);


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
              <span>{addonsPrice}</span>
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