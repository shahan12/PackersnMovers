import React, { useState, useEffect } from "react";
import "./fillReq.css";
import "../../images/bachelor.svg";
import "../../images/family.svg";
import SelectOptions from "../OptionsSelect/option.component";
import BachelorImg from "../../images/bachelor.svg";
import BachelorImgSelected from "../../images/bachelor-slected.svg";
import FamilyImg from "../../images/family.svg";
import FamilyImgSelected from "../../images/family-selected.svg";
import MultiDropDown from "../muiDropDown/dropDown.component";
import upArrow from '../../images/uparrow.png';
import downArray from '../../images/downarrow.png';
import { sendBasePriceRequestToBackend,sendFloorChargeRequestToBackend,sendTotalBoxRequestToBackend } from '../../API/apicalls';
import { useDispatch } from 'react-redux';
import { updateRequirements } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { json } from "react-router-dom";

function Requirement({progress, setProgress}) {

  const dispatch = useDispatch();

  let RequirementsRedux = useSelector((state) => state.RequirementsItems);
  const [familyType, setfamilyType] = useState("");
  const [basePriceFromAPI, setBasePriceFromAPI] = useState('');
  const [floorChargeFromAPI, setFloorChargeFromAPI] = useState('');
  const [totalBoxFromAPI, setTotalBoxFromAPI] = useState('');
  const [houseType, setHouseType] = useState("");
  const [phoneNumber,setPhoneNumber]=useState((sessionStorage.getItem('phoneNumber')) || '');
  const houseTypes = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3BHK",
    "GYM",
    "OFFICE",
    "VILLA",
    "BUNGLOW",
  ];
  const [floorNumber, setFloorNumber] = useState("");
  const [movingFloorNumber, setMovingFloorNumber] = useState("");
  const [liftValue, setLiftValue] = useState("");
  const [movingToLiftValue, setMovingToLiftValue] = useState("");
  const [familyNumber, setFamilyNumber] = useState(2);
  const [distance, setDistance] = useState(sessionStorage.getItem('distance'));
  const [fromAddress, setFromAddress] = useState(sessionStorage.getItem('fromAddress'));
  const [toAddress, setToAddress] = useState(sessionStorage.getItem('toAddress'));
  console.log(sessionStorage.getItem('distance'));
  useEffect(() => {
    if (RequirementsRedux) {
      setfamilyType(RequirementsRedux.requirements.familyType || ""); 
      setHouseType(RequirementsRedux.requirements.houseType || ""); 
      setFamilyNumber(RequirementsRedux.requirements.familyNumber || 2); 
      setFloorNumber(RequirementsRedux.requirements.floorNumber || ""); 
      setLiftValue(RequirementsRedux.requirements.fromLift || ""); 
      setMovingFloorNumber(RequirementsRedux.requirements.toFloor || "");
      setMovingToLiftValue(RequirementsRedux.requirements.toLift || "");
      setDistance(RequirementsRedux.requirements.distance || sessionStorage.getItem('distance'));
      setFromAddress(RequirementsRedux.requirements.fromAddress || sessionStorage.getItem('fromAddress'));
      setToAddress(RequirementsRedux.requirements.toAddress || sessionStorage.getItem('toAddress'));
    }
  }, [RequirementsRedux]); 

  const FlatrequireMents = () => {
    console.log("clicked next");
    const newRequirementData  = {           // for just saving in redux state
        "familyType": familyType,
        "houseType": houseType,
        "familyNumber": familyNumber,
        "floorNumber": floorNumber,
        "fromLift": liftValue,
        "toFloor": movingFloorNumber,
        "toLift": movingToLiftValue,
        "phoneNumber":phoneNumber
    }
    
    const forAPIRequirement  = {          // for API CALL IT INCLUDES DISTANCE
      "familyType": familyType,
      "houseType": houseType,
      "familyNumber": familyNumber,
      "floorNumber": floorNumber,
      "fromLift": liftValue,
      "toFloor": movingFloorNumber,
      "toLift": movingToLiftValue,
      "phoneNumber":phoneNumber,
      distance, fromAddress, toAddress            //use this distance
  }
    
      dispatch(updateRequirements(newRequirementData));
      console.log("distance :",distance);
      sendRequestReq(forAPIRequirement);

      setProgress('inventory');
  };
  function isEqual(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (let key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  }
  const sendRequestReq = async (API_Req_Data) => {
    const API_Req_Data_JSON = JSON.stringify(API_Req_Data);
    try {
      // console.log("finally sending to basePrice backend function 2:",API_Req_Data_JSON);
      const basePriceResponse = await sendBasePriceRequestToBackend(API_Req_Data_JSON);
      setBasePriceFromAPI(basePriceResponse);
      console.log("rcd from basePrice backend :", basePriceResponse);

      // console.log("to calculate floor charges ");
      // console.log(parseInt(API_Req_Data.floorNumber),API_Req_Data.fromLift,parseInt(API_Req_Data.toFloor),API_Req_Data.toLift);
      let floorChargeResponse = 0;
      if(API_Req_Data.fromLift==='No') floorChargeResponse+=Math.max(0,( (parseInt(API_Req_Data.floorNumber)-2)*250 ));
      if(API_Req_Data.toLift==='No') floorChargeResponse+=Math.max(0,( (parseInt(API_Req_Data.toFloor)-2)*250 ));
      setFloorChargeFromAPI(floorChargeResponse);
      console.log("calculated floorPrice :", floorChargeResponse);
      
      const totalBoxResponse = await sendTotalBoxRequestToBackend(API_Req_Data_JSON);
      setTotalBoxFromAPI(totalBoxResponse);
      console.log("rcd from totalBox backend :", totalBoxResponse);

      console.log("all prices from Backend :",basePriceResponse, floorChargeResponse, totalBoxResponse);
      // store these values in redux

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleArrowClick = (action) => {
    if (action === 'increment' && familyNumber < 10) {
      setFamilyNumber(familyNumber + 1);
    } else if (action === 'decrement' && familyNumber > 2) {
      setFamilyNumber(familyNumber - 1);
    }
  };

  return (
      <div className="requirements-section-1">
        <div className="border-bottom extra-margin">
          <h2>Fill Requirments</h2>
        </div>
        <div className="family-type-wrapper">
          <h3>Choose Your Family Type</h3>
          <div className="flex align-centre family-type-options-wrapper">
            <SelectOptions
              icon={
                familyType === "Bachelor" ? BachelorImgSelected : BachelorImg
              }
              value="Bachelor"
              setOnClick={setfamilyType}
              selected={familyType}
            />
            <SelectOptions
              icon={familyType === "Family" ? FamilyImgSelected : FamilyImg}
              value="Family"
              selected={familyType}
              setOnClick={setfamilyType}
            />
            <div className="familyNumber">
              <img src={upArrow} onClick={() => handleArrowClick('increment')}/>
              <span className="arrowCount">{familyNumber}</span>
              <img src={downArray} onClick={() => handleArrowClick('decrement')}/>
            </div>
          </div>
        </div>
        <div className="house-type-wrapper">
          <h3>Choose Your House Type</h3>
          <div className="house-type-options-wrapper">
            <div className="flex space-between house-type-row-one">
              <SelectOptions
                value={houseTypes[0]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[1]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[2]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[3]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
            </div>
            <div className="flex space-between house-type-row-one">
              <SelectOptions
                value={houseTypes[4]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[5]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[6]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
              <SelectOptions
                value={houseTypes[7]}
                selected={houseType}
                setOnClick={setHouseType}
                type={"house"}
              />
            </div>
          </div>
        </div>
        <div className="more-house-info">
          <h3>Currently Living On?</h3>
          <div className="more-house-info-row-1 flex space-between">
            <div className="more-option-floor-input">
              <MultiDropDown
                label="Floor"
                value={[
                  "Ground Floor",
                  "1st Floor",
                  "2nd Floor",
                  "3rd Floor",
                  "4th Floor",
                  "5th Floor ",
                ]}
                selectedValue={floorNumber}
                setSelectedValue={setFloorNumber}
              />
            </div>
            <div className="more-option-floor-input">
              <MultiDropDown
                label="Service Lift"
                value={["Yes", "No"]}
                selectedValue={liftValue}
                setSelectedValue={setLiftValue}
              />
            </div>
          </div>
        </div>
        <div className="more-house-info">
          <h3>Moving To</h3>
          <div className="more-house-info-row-1 flex space-between">
            <div className="more-option-floor-input">
              <MultiDropDown
                label="Floor"
                value={[
                  "Ground Floor",
                  "1st Floor",
                  "2nd Floor",
                  "3rd Floor",
                  "4th Floor",
                  "5th Floor ",
                ]}
                selectedValue={movingFloorNumber}
                setSelectedValue={setMovingFloorNumber}
              />
            </div>
            <div className="more-option-floor-input">
              <MultiDropDown
                label="Service Lift"
                value={["Yes", "No"]}
                selectedValue={movingToLiftValue}
                setSelectedValue={setMovingToLiftValue}
              />
            </div>
          </div>
        </div>
        <div className="fill-req-CTA-container flex">
        <div className='prevButton'></div><button
          disabled={
            !familyType ||
            !houseType ||
            !familyNumber ||
            !floorNumber ||
            !liftValue ||
            !movingFloorNumber ||
            !movingToLiftValue
          }
          className="cta-button"
          onClick={FlatrequireMents}
        >
          NEXT
        </button>
        </div>
      </div>
  );
}

export default Requirement;
