import React, { useState } from "react";
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
import { sendRequestToBackend } from '../../API/apicalls';
import { useDispatch } from 'react-redux';
import { updateRequirements } from '../../redux/actions';

function Requirement({progress, setProgress}) {

  const dispatch = useDispatch();
  const [familyType, setfamilyType] = useState("");
  const [responseRequirementAPIData, setResponseRequirementAPIData] = useState('');
  const [houseType, setHouseType] = useState("");
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

  const FlatrequireMents = () => {
    if (progress === 'requirement') {
      setProgress('inventory');
    }
    const requirementData = {
        "familytype": familyType,
        "houseType": houseType,
        "familyNumber": familyNumber,
        "floorNumber": floorNumber,
        "fromLift": liftValue,
        "toFloor": movingFloorNumber,
        "toLift": movingToLiftValue
    }
    
    dispatch(updateRequirements(requirementData));
    sendRequestReq(requirementData);
  };

  const sendRequestReq = async (API_Req_Data) => {
    const API_Req_Data_JSON = JSON.stringify(API_Req_Data);
    try {
      const response = await sendRequestToBackend(API_Req_Data_JSON);
      setResponseRequirementAPIData(response);
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
        <div className='prevButton'></div>
          <button className="cta-button" onClick={FlatrequireMents}>NEXT</button>
        </div>
      </div>
  );
}

export default Requirement;
