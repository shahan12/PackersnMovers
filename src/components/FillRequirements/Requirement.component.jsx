import React, { useState, useEffect } from "react";
import "./fillReq.css";
import "../../images/bachelor.svg";
import "../../images/family.svg";
import SelectOptions from "../OptionsSelect/option.component";
import BachelorImg from "../../images/bachelor.svg";
import BachelorImgSelected from "../../images/bachelor-slected.svg";
import FamilyImg from "../../images/family.svg";
import FamilyImgSelected from "../../images/family-selected.svg";
import alerticon from "../../images/alerticon.png";
import MultiDropDown from "../muiDropDown/dropDown.component";
import upArrow from '../../images/uparrow.png';
import downArray from '../../images/downarrow.png';
import { sendBasePriceRequestToBackend, sendTotalBoxRequestToBackend } from '../../API/apicalls';
import { useDispatch } from 'react-redux';
import { updateRequirements, updateTotalCost } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { json } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ThankYouModal from "../ThankYouModal/thankYouModal.component";
import loaderIcon from '../../images/loader.gif';

export const performLogout = () => {
  sessionStorage.clear();
  window.open("/", "_self");
}

function Requirement(props) {

  const {
    isAuthenticated,
    setIsAuthenticated,
    progress,
    setProgress
  } = props;

  const dispatch = useDispatch();

  let varsRedux = useSelector((state) => state.VarsItems);
  let RequirementsRedux = useSelector((state) => state.RequirementsItems);
  const [familyType, setfamilyType] = useState("");
  const [basePriceFromAPI, setBasePriceFromAPI] = useState(useSelector((state) => state.TotalCostItems.basePrice) || 0);
  const [floorChargeFromAPI, setFloorChargeFromAPI] = useState(useSelector((state) => state.TotalCostItems.floorCharges) || 0);
  const [totalBoxFromAPI, setTotalBoxFromAPI] = useState(useSelector((state) => state.TotalCostItems.totalBox) || 0);
  const [houseType, setHouseType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState((sessionStorage.getItem('phoneNumber')) || '');
  const [totalCostBF, setTotalCostBF] = useState();
  const [loader, setLoader] = useState(false);

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
  const floorNumbers = [
    "Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor",
    "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor",
    "11th Floor", "12th Floor", "13th Floor", "14th Floor", "15th Floor",
    "16th Floor", "17th Floor", "18th Floor", "19th Floor", "20th Floor",
    "21st Floor", "22nd Floor", "23rd Floor", "24th Floor", "25th Floor",
    "26th Floor", "27th Floor", "28th Floor", "29th Floor", "30th Floor"];

  const [floorNumber, setFloorNumber] = useState("");
  const [movingFloorNumber, setMovingFloorNumber] = useState("");
  const [liftValue, setLiftValue] = useState("");
  const [movingToLiftValue, setMovingToLiftValue] = useState("");
  const [familyNumber, setFamilyNumber] = useState(4);
  const [distance, setDistance] = useState(sessionStorage.getItem('distance'));
  const [fromAddress, setFromAddress] = useState(sessionStorage.getItem('fromAddress'));
  const [toAddress, setToAddress] = useState(sessionStorage.getItem('toAddress'));

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (RequirementsRedux) {
      setfamilyType(RequirementsRedux.requirements.familyType || "");
      setHouseType(RequirementsRedux.requirements.houseType || "");
      setFamilyNumber(RequirementsRedux.requirements.familyNumber || 4);
      setFloorNumber(RequirementsRedux.requirements.floorNumber || "");
      setLiftValue(RequirementsRedux.requirements.fromLift || "");
      setMovingFloorNumber(RequirementsRedux.requirements.toFloor || "");
      setMovingToLiftValue(RequirementsRedux.requirements.toLift || "");
      setDistance(RequirementsRedux.requirements.distance || sessionStorage.getItem('distance'));
      setFromAddress(RequirementsRedux.requirements.fromAddress || sessionStorage.getItem('fromAddress'));
      setToAddress(RequirementsRedux.requirements.toAddress || sessionStorage.getItem('toAddress'));
    }
  }, [RequirementsRedux]);



  const savedIdentifier = sessionStorage.getItem('identifier');
  const token = sessionStorage.getItem('token');
  const orderSessionId = sessionStorage.getItem('orderSessionId');
  const FlatrequireMents = async () => {
    const newRequirementData = {           // for just saving in redux state
      "familyType": familyType,
      "houseType": houseType,
      "familyNumber": familyNumber,
      "floorNumber": floorNumber,
      "fromLift": liftValue,
      "toFloor": movingFloorNumber,
      "toLift": movingToLiftValue,
      "phoneNumber": phoneNumber
    }

    const forAPIRequirement = {          // for API CALL IT INCLUDES DISTANCE
      "familyType": familyType,
      "houseType": houseType,
      "familyNumber": familyNumber,
      "floorNumber": floorNumber,
      "fromLift": liftValue,
      "toFloor": movingFloorNumber,
      "toLift": movingToLiftValue,
      "phoneNumber": savedIdentifier,
      orderSessionId,
      distance, fromAddress, toAddress            //use this distance
    }
    const { phoneNumber: num, ...remainingInfo } = newRequirementData;
    if (JSON.stringify(RequirementsRedux.requirements) !== JSON.stringify(remainingInfo)) {
      dispatch(updateRequirements(newRequirementData));
      await sendRequestReq(forAPIRequirement);
    }
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
      if (orderSessionId && savedIdentifier && token) {
        const basePriceResponse = await sendBasePriceRequestToBackend(API_Req_Data_JSON);
        if (basePriceResponse?.type === "invalidToken") {
          alert("Session Timed Out , Please Re Login!");
          performLogout();
        } else if (basePriceResponse?.type === "not found") {
          alert("Server Error, please try later!");
          performLogout();
        } else {
          setBasePriceFromAPI(basePriceResponse);
        }

        let floorChargeResponse = 0;
        if (API_Req_Data.fromLift === 'No' && API_Req_Data.floorNumber !== "Ground Floor")
          floorChargeResponse += Math.max(0, ((parseInt(API_Req_Data.floorNumber) - 2) * 250));

        if (API_Req_Data.toLift === 'No' && API_Req_Data.toFloor !== "Ground Floor")
          floorChargeResponse += Math.max(0, ((parseInt(API_Req_Data.toFloor) - 2) * 250));
        setFloorChargeFromAPI(floorChargeResponse);

        const totalBoxResponse = await sendTotalBoxRequestToBackend(API_Req_Data_JSON);

        if (totalBoxResponse?.type === "invalidToken") {
          alert("Please Login Again!");
          performLogout();
        } else if (totalBoxResponse?.type === "serverError") {
          alert("Server Error, please try later!");
          performLogout();
        } else {
          setBasePriceFromAPI(totalBoxResponse);
        }
        setTotalBoxFromAPI(totalBoxResponse);

        saveInRedux(basePriceResponse, totalBoxResponse, floorChargeResponse);
      }
      else {
        alert("Please Login Again!");
        performLogout();
      }
    } catch (error) {
      if (error.response.type === 'invalidToken') {
        alert("Session Timed Out , Please Re Login!");
      }
      else if (error.response.type !== 'invalidToken') {
        alert("Something went wrong")
      }
      performLogout();
    }
  };

  function saveInRedux(basePriceResponse, totalBoxResponse, floorChargeResponse) {
    let totalcostData = {
      "basePrice": basePriceResponse,
      "floorCharges": floorChargeResponse,
      "totalBox": totalBoxResponse,
      "totalBoxPrice": (totalBoxResponse * 100),
      "totalCostBF": basePriceResponse + floorChargeResponse,
    }
    dispatch(updateTotalCost(totalcostData));

    if (houseTypes.indexOf(houseType) >= houseTypes.indexOf("3BHK")) {
      setLoader(false);
      alert("We will schedule a free inspection and give you a best quotation. someone will get back to you!");
      sessionStorage.removeItem("orderSessionId");
      window.open("/bookings", "_self");
    } else {
      setLoader(false);
      setProgress("inventory");
    }
  }

  useEffect(() => {
    setTotalCostBF(basePriceFromAPI + floorChargeFromAPI);
    let totalcostData = {
      "basePrice": basePriceFromAPI,
      "floorCharges": floorChargeFromAPI,
      "totalBox": totalBoxFromAPI,
      "totalBoxPrice": (totalBoxFromAPI * 100),
      "totalCostBF": basePriceFromAPI + floorChargeFromAPI,
    }
    dispatch(updateTotalCost(totalcostData));
  }, [basePriceFromAPI, floorChargeFromAPI, totalCostBF, totalBoxFromAPI]);

  const handleArrowClick = (action) => {
    if (action === 'increment' && familyNumber < 10) {
      setFamilyNumber(familyNumber + 1);
    }
    else if (action === 'decrement') {
      if (familyType === 'Family' && familyNumber > 4) setFamilyNumber(familyNumber - 1);
      if (familyType === 'Bachelor' && familyNumber > 1) setFamilyNumber(familyNumber - 1);
    }
  };

  function performInspection() {
    setLoader(true);
    FlatrequireMents();
  }
  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Fill Requirements</h2>
      </div>
      {(!fromAddress || !toAddress) &&
        <div className='wrapalert'>
          <img src={alerticon} /><span className="wrap-alert">Please fill your address first!</span>
        </div>
      }
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
            <img src={upArrow} onClick={() => handleArrowClick('increment')} />
            <div style={{ display: "flex", flexDirection: "row", marginLeft: "2rem" }}>

              <span className="arrowCount">{familyNumber}</span>
              <Tooltip title="default Family is considered as 4 members and Bachelor is considered for 1 member, by adding an extra member in either case will cost 4 more box."
                placement="right">
                <IconButton>
                  <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </div>
            <img src={downArray} onClick={() => handleArrowClick('decrement')} />
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
                "Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor",
                "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor",
                "11th Floor", "12th Floor", "13th Floor", "14th Floor", "15th Floor",
                "16th Floor", "17th Floor", "18th Floor", "19th Floor", "20th Floor",
                "21st Floor", "22nd Floor", "23rd Floor", "24th Floor", "25th Floor",
                "26th Floor", "27th Floor", "28th Floor", "29th Floor", "30th Floor"]}
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
                "Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor",
                "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor",
                "11th Floor", "12th Floor", "13th Floor", "14th Floor", "15th Floor",
                "16th Floor", "17th Floor", "18th Floor", "19th Floor", "20th Floor",
                "21st Floor", "22nd Floor", "23rd Floor", "24th Floor", "25th Floor",
                "26th Floor", "27th Floor", "28th Floor", "29th Floor", "30th Floor"]}
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
      {loader ? (
        <div className="fill-req-CTA-container flex">
          <img style={{ width: '2rem' }} src={loaderIcon} alt="loader" />
        </div>
      ) : (
        <div className="fill-req-CTA-container flex">
          <div className='prevButton'></div>
          <button
            disabled={
              !familyType ||
              !houseType ||
              !familyNumber ||
              !floorNumber ||
              !liftValue ||
              !movingFloorNumber ||
              !movingToLiftValue ||
              !fromAddress ||
              !toAddress ||
              !distance
            }
            className="cta-button"
            onClick={performInspection}
          >Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Requirement;
