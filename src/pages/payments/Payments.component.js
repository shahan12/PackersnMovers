import "./payments.css";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Payments(props) {


  return (
    <>
      <div className="edit-profile-wrapper">
        <h2>Verifying Transaction</h2>
        <div className="container">
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="col-5 col-md-2 btn btn-secondary mx-1">Cancel</button>
            <button type="button" className="col-5 col-md-2 btn mx-1" style={{ backgroundColor: "#ff7800", borderColor: "#ff7800", color: "#fff" }}>
              Save Changes
            </button>
          </div>
        </div>
        
        
      </div>
    </>
  );
}

export default Payments;
