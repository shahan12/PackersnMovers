import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./calendar.css";
import { sendFinalItemsToBackend, makePaymentRequest } from '../../API/apicalls';
import loaderIcon from '../../images/loader.gif';
import { performLogout } from "./Requirement.component";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const authmiddleware = require('../../authmiddleware');

const Progress = ({ progress, setProgress }) => {

  let RequirementsRedux = useSelector((state) => state.RequirementsItems);        // all requirementData like floor, lift, family
  let AddOnsADDED = useSelector((state) => state.addOnsItems);    // all add ons items
  let ITEMADDED = useSelector((state) => state.selectedItems);      // all selected inventory item
  let DateTimeRedux = useSelector((state) => state.DateTime);       // date and time selection 
  let totalCostRedux = useSelector((state) => state.TotalCostItems);     //  total/cft/totalitems/base price/floor price/package selection/package price

  const [loader, setLoader] = useState(false);
  const [totalCost, setTotalCost] = useState(useSelector((state) => state.TotalCostItems));

  const selectedItemsRedux = useSelector((state) => state.selectedItems);
  useEffect(() => {
    if (RequirementsRedux) {
      setTotalCost(totalCostRedux);
    }
  }, [totalCostRedux]);
  
  const prev = () => {
    if (progress === "progress") {
      setProgress("dateselection");
    }
  };
  let identifier = sessionStorage.getItem('identifier');
  let orderSessionId = sessionStorage.getItem('orderSessionId');
  let token = sessionStorage.getItem('token');

  const fetchPaymentURL = async () => {
    // let fullPayment = Math.round(totalCost?.surgedTotalCost*0.1);
    // let fullPayment=totalCostRedux.surgedTotalCost;
    let fullPayment = "1";

    let savedOrderID = sessionStorage.getItem('orderID');
    let paymentResponse = await makePaymentRequest({ fullPayment, identifier, savedOrderID, orderSessionId }); //url

    if (paymentResponse.type === 'URLResponseError') {
      alert("We are facing some server error in payment gateway! but your Order is completed, please try payments in your bookings again later to finalize your Order!");
      setLoader(false);
      window.open("/bookings", "_self");
    } else if (paymentResponse.type === 'invalidToken') {
      alert("Invalid Token!");
      setLoader(false);
      performLogout();
    } else {
      let { paymentURL, merID } = authmiddleware.decryptData(paymentResponse);
      sessionStorage.setItem('merID', merID);
      setLoader(false);
      window.open(paymentURL, "_self");
    }
  }

  const bookingConfirm = async () => {
    setLoader(true);
    if (orderSessionId && identifier && token) {
      const API_DATA = { "user_inventory": ITEMADDED, "addons": AddOnsADDED, "dataTime": DateTimeRedux, "totalCost": totalCostRedux, "mobile": identifier, "orderSessionId": orderSessionId };
      const response = await sendFinalItemsToBackend(API_DATA);
      if (response.type === "invalidToken") {
        alert("Please Login Again!");
        setLoader(false);
        performLogout();
      } else if (response.type === "failed") {
        alert("Server Error, please try later!");
        setLoader(false);
        performLogout();
      } else if (!response) {
        setLoader(false);
        performLogout();
      } else {
        sessionStorage.setItem('orderID', response);
        fetchPaymentURL();
      }
    } else {
      alert("Please Login Again!");
      setLoader(false);
      performLogout();
    }
  };


  // const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Confirm</h2>
      </div>
      <div className="cost-details">
        <div className="cost-details-child">
          <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
            Order Details
          </span>
        </div>
        <div className="cost-details-child">
              <div className="cost-box">
                <span>Base Price</span>
                <Tooltip title="Base Price based on House Type" placement="right">
                  <IconButton>
                    <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </div>
          <span>₹{totalCost?.basePrice}</span>
        </div>
        <div className="cost-details-child">
          <div>
            <span>Floor Charges</span>
            <Tooltip title="₹250 for Each Floor for buildings without Lift" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>₹{totalCost?.floorCharges}</span>
        </div>
        <div className="cost-details-child">
          <div>
            <span>Total Items Added</span>
            <Tooltip title="Items selected in inventory" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>{totalCost?.totalItemCount}</span>
        </div>
        <div className="cost-details-child">
          
          <div>
            <span>Additional Boxes (per Box ₹100): {totalCost?.totalBox}</span>
            <Tooltip title="4 Boxes are added for each family member Added" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>₹{totalCost?.totalBoxPrice}</span>
        </div>
        <div className="cost-details-child">
          <div>
            <span>CFT</span>
            <Tooltip title="An estimate we use to calculate space needed for your Goods" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>{totalCost?.cft}</span>
        </div>
        <div className="cost-details-child">
          <span>Add Ons</span>
          <span>₹{totalCost?.addonsPrice}</span>
        </div>

        <div className="cost-details-child">
          <div>
            <span>Weekend Surge</span>
            <Tooltip title="20% extra for weekend movements" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>₹{totalCost?.surgePrice}</span>
        </div>
        <div className="cost-details-child">
          <div>
            <span>Packaging: {totalCost?.packaging}</span>
            <Tooltip title="You may choose Special packaging if you wish to add extra layer of protection" placement="right">
              <IconButton>
                <InfoIcon fontSize="small" style={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </div>
          <span>₹{totalCost?.packagingPrice}</span>
        </div>
        <div className="cost-details-child cost-line">
          <span>Total Cost: </span>
          <span className="highlightcost">₹{totalCost?.surgedTotalCost}</span>
        </div>
      </div>

      <div className="fill-req-CTA-container flex nextbuttonMove">
        <div className="prevButton" onClick={prev}>
          &lt; Previous
        </div>
        {/* {loader ? (
            <img style={{width: '1.25rem'}} src={loaderIcon} alt="loader" />
          ) : (
     */}
        <button className="cta-button" disabled={loader} onClick={() => bookingConfirm()}>
          Book Now @ ₹99
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default Progress;
