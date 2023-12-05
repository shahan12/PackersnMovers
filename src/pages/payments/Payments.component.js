import "./payments.css";
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import loaderIcon from '../../images/loader.gif';
import { makePaymentStatusRequest } from '../../API/apicalls.js';
import { performLogout } from "../../components/FillRequirements/Requirement.component";

function Payments(props) {

  const paymentResponseSync = async () => {
    
    let savedOrderID = sessionStorage.getItem('orderID');
    let identifier = sessionStorage.getItem('identifier');
    let merTID = sessionStorage.getItem('merID');
    let token = sessionStorage.getItem('token');

    let orderSessionId = sessionStorage.getItem('orderSessionId');
    console.log("payment page ");
    
    if(savedOrderID && identifier && token && merTID && orderSessionId) {
      const paymentResponse = await makePaymentStatusRequest({savedOrderID, identifier, merTID, orderSessionId});

      // sessionStorage.removeItem('merID');
      // sessionStorage.removeItem('orderID');
      if(paymentResponse?.type === 'success') {
        window.open("/bookings", "_self");
      } else if (paymentResponse?.type === 'invalidToken') {
        alert("Please Try later!");
        performLogout();
      } else {
        window.open("/bookings", "_self");
      }
      window.open("/bookings", "_self");
    }
    else {
      alert("Please Login Again!");
      performLogout();
    }
  };

  paymentResponseSync();

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="edit-profile-wrapper">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}  className="container">
          <h2>Verifying your transaction, please do not refresh your page</h2>
          <img style={{width: '2.5rem'}} src={loaderIcon} alt="loader" />
        </div>
      </div>
    </>
  );
  
}

export default Payments;
