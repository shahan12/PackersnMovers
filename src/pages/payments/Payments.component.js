import "./payments.css";
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import loaderIcon from '../../images/loader.gif';
import { makePaymentStatusRequest } from '../../API/apicalls.js';

function Payments(props) {

  useEffect(() => {
  const paymentResponseSync = async () => {

    let savedOrderID = sessionStorage.getItem('orderID');
    let identifier = sessionStorage.getItem('identifier');
    let merTID = sessionStorage.getItem('merID');

    const paymentResponse = await makePaymentStatusRequest({savedOrderID, identifier, merTID});

    console.log("payment page ", paymentResponse);
    if(paymentResponse.type === 'success'){
      window.open("/bookings", "_self");
    } else if (paymentResponse.type === 'invalidToken') {
      alert("Please Try later!");
      performLogout();
    } else {
      window.open("/bookings", "_self");
    }
    window.open("/bookings", "_self");
  };

  paymentResponseSync();
}, []);

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="edit-profile-wrapper">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}  className="container">
          <h2>Redirecting in a moment</h2>
          <img style={{width: '1rem', marginRight: '0.5rem'}} src={loaderIcon} alt="loader" />
        </div>
      </div>
    </>
  );
  
}

export default Payments;
