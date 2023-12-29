import "./payments.css";
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import loaderIcon from '../../images/loader.gif';
import { retryMakePaymentStatusRequest } from '../../API/apicalls.js';
import { performLogout } from "../../components/FillRequirements/Requirement.component.jsx";

function RetryPayments(props) {

  const paymentResponseSync = async () => {
    
    let identifier = sessionStorage.getItem('identifier');
    let reMerTID = sessionStorage.getItem('reMerTID');
    let reOrderID = sessionStorage.getItem('reOrderID');
    let token = sessionStorage.getItem('token');

    console.log("payment page ");
    
    if(identifier && token && reMerTID) {
      const paymentResponse = await retryMakePaymentStatusRequest({identifier, reMerTID, reOrderID});

      if(paymentResponse?.type === 'success') {
        window.open("/bookings", "_self");
        
      } else if (paymentResponse?.type === 'invalidToken') {
        alert("invalid Token, Please Try later!");
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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}  className="container">
          <h2>Redirecting in a moment</h2>
          <img style={{width: '1.5rem', marginRight: '0.5rem'}} src={loaderIcon} alt="loader" />
        </div>
      </div>
    </>
  );
  
}

export default RetryPayments;
