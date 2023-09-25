import React, { useState } from "react";
import DropDown from "../dropDown/dropDown.component";
import "./fillReq.css";
import "../../images/bachelor.svg";
import "../../images/family.svg";
import SelectOptions from "../OptionsSelect/option.component";
import BachelorImg from "../../images/bachelor.svg";
import BachelorImgSelected from "../../images/bachelor-slected.svg";
import FamilyImg from "../../images/family.svg";
import FamilyImgSelected from "../../images/family-selected.svg";
import Edit from "../../images/location-edit.svg";
import Data from "../relocate/data.json";
import MultiDropDown from "../muiDropDown/dropDown.component";

function FillRequrements(props) {
  const [familyType, setfamilyType] = useState("");
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
  const [fromCity, setFromCity] = useState("Bangalore");
  const [toCity, setToCity] = useState("Bangalore");
  const [floorValue, setFloorValue] = useState("");
  const [movingFloorValue, setMovingFloorValue] = useState("");
  const [liftValue, setLiftValue] = useState("");
  const [movingToLiftValue, setMovingToLiftValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="fillReq-requirements-wrapper flex">
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
                selectedValue={floorValue}
                setSelectedValue={setFloorValue}
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
                selectedValue={movingFloorValue}
                setSelectedValue={setMovingFloorValue}
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
          <button className="cta-button">NEXT</button>
        </div>
      </div>
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
        <div className="requirements-your-details-wrapper">
          <div className="border-bottom extra-margin">
            <h2>Cost Of Moving</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillRequrements;
