import React, { useState, useEffect } from "react";
import DropDown from "../dropDown/dropDown.component";
import { useSelector } from 'react-redux';
import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";
import { useDispatch } from 'react-redux';
import { updateTotalCost, updateRequirements } from '../../redux/actions';
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

function AddressDetails({progress, packageSel, cft, totalItemCount }) {

  let totalCostRedux = useSelector((state) => state.TotalCostItems);
  const [basePrice, setBasePrice] = useState(useSelector((state)=> state.TotalCostItems.basePrice));
  const [floorCharges, setFloorCharges] = useState(useSelector((state)=> state.TotalCostItems.floorCharges));
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostBF, setTotalCostBF] = useState(0);
  const libraries = ['places'];
  const inputRefFrom = React.useRef();
  const inputRefTo = React.useRef();
  const dispatch = useDispatch();
  // let ITEMADDED = useSelector((state) => state.selectedItems);
  // let Requirements = useSelector((state) => state.RequirementsItems);
  let AddOnsADDED = useSelector((state) => state.addOnsItems);
  
  console.log(totalCostRedux.basePrice, "totalCostRedux");
  useEffect(() => {
    let calculatedTotalPrice = 0;

    for (const itemName in AddOnsADDED) {
      const item = AddOnsADDED[itemName];
      calculatedTotalPrice += item.price * item.count;
    }
    setAddonsPrice(calculatedTotalPrice);
  }, [AddOnsADDED]);
  

  useEffect(() => {
    if (totalCostRedux) {
      setTotalCostBF(totalCostRedux.totalCostBF); 
      setBasePrice(totalCostRedux.basePrice);  
      setFloorCharges(totalCostRedux.floorCharges); 
    }
  }, [totalCostRedux]);

  const [fromAddress, setFromAddress] = useState(sessionStorage.getItem('fromAddress'));
  const [toAddress, setToAddress] = useState(sessionStorage.getItem('toAddress'));
  const [distance, setDistance] = useState(sessionStorage.getItem('distance'));
  const [disabled, setDisabled] = useState(true);
  const [addonsPrice, setAddonsPrice] = useState('');

  const newTotalCost = addonsPrice + totalCostBF + (packageSel.price ? packageSel.price : 0);

  useEffect(() => {
    let totalcostData = {
      "totalItemCount": totalItemCount,
      "cft": cft,
      "addonsPrice": addonsPrice,
      "packaging": packageSel.packageName,
      "packagingPrice": packageSel.price,
      "totalCost": newTotalCost,
    }

    setTotalCost(addonsPrice + totalCostBF + (packageSel.price ? packageSel.price : 0));
    dispatch(updateTotalCost(totalcostData));

  }, [totalCostBF, addonsPrice, packageSel, cft, newTotalCost]);

  useEffect(() => {
    if(!disabled) {
      calculateDistance();
    }
  }, [fromAddress, toAddress]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleFromPlaceChanged = () => {
    const [place] = inputRefFrom.current.getPlaces();
    if (place) {
      setFromAddress(place.formatted_address);
    }
  };

  const handleToPlaceChanged = () => {
    const [place] = inputRefTo.current.getPlaces();
    if (place) {
      setToAddress(place.formatted_address);
    }
  };
  const calculateDistance = () => {
    if (fromAddress && toAddress) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [fromAddress],
          destinations: [toAddress],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            setDistance(response.rows[0].elements[0].distance.text);
            sessionStorage.setItem('fromAddress',fromAddress);
            sessionStorage.setItem('toAddress',toAddress);
            sessionStorage.setItem('distance',response.rows[0].elements[0].distance.text);
            const requirementData = {
              'fromAddress': fromAddress,
              'toAddress': toAddress,
              'distance': response.rows[0].elements[0].distance.text,
            }
            dispatch(updateRequirements(requirementData));
          } else {
            alert("Region Not Supported.");
            setDistance(null); // Unable to calculate distance
          }
        }
      );
    }
  }

  return (
    <div className="requirements-section-2 flex">
    {progress === 'progress' ? ('') : (
      
      <div className="requirements-your-details-wrapper">
        <div className="border-bottom extra-margin">
          <h2>Cost Of Moving</h2>
        </div>
        <div className="cost-details">
            <div className="cost-details-child"> 
              <span>Base Price</span>
              <span>₹{basePrice}</span>
            </div>
            <div className="cost-details-child"> 
              <span>Floor Charges</span>
              <span>₹{floorCharges}</span>
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
    <div className="requirements-your-details-wrapper">
      <div className="border-bottom extra-margin">
        <h2>Your Details</h2>
      </div>
      <div className="flex space-between requirement-sub-header margin-bottom-10">
        <span>Address</span>
        {progress === 'requirement'  && (
          <img
            src={Edit}
            alt={"Edit-Icon"}
            className="edit-icon"
            onClick={() => {
              setDisabled(!disabled);
            }}
        ></img>
        )}
      </div>
      <div className="relocate-drop-down-container margin-bottom-10">
      {isLoaded && (
          <StandaloneSearchBox 
            onLoad={ref => (inputRefFrom.current = ref)} 
            onPlacesChanged={handleFromPlaceChanged} 
          >
            <input type="text" className="form-control" disabled={disabled || progress !== 'requirement'} placeholder={fromAddress}/>
          </StandaloneSearchBox>
        )}
      </div>
      <div className="relocate-drop-down-container">
      {isLoaded && (
          <StandaloneSearchBox 
            onLoad={ref => (inputRefTo.current = ref)} 
            onPlacesChanged={handleToPlaceChanged} 
          >
            <input type="text" className="form-control" disabled={disabled || progress !== 'requirement'} placeholder={toAddress} />
          </StandaloneSearchBox>
        )}
      </div>
    </div>
  </div>
  );
}

export default AddressDetails;