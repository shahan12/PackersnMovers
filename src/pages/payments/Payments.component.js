import "./payments.css";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import loaderIcon from '../../images/loader.gif';

function Payments(props) {

  useEffect(() => {
  const paymentResponse = async () => {
    const response = await makePaymentStatusRequest();
    history.push('/bookings');
  };

  paymentResponse();
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
