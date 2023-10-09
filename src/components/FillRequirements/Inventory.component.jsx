import React, { useState } from "react";
import "./fillReq.css";
import "../DATA/CFTData.json";

function Inventory({progress, setProgress}) {



  
  return (    
      <div className="requirements-section-1">
        <div className="border-bottom extra-margin">
          <h2>Inventory</h2>
        </div>
        <div className="family-type-wrapper">
          <h3>Choose Your Family Type</h3>
          <div className="flex align-centre family-type-options-wrapper">
          </div>
        </div>
        <div className="fill-req-CTA-container flex">
          <button className="cta-button" >NEXT</button>
        </div>
      </div>
  );
}

export default Inventory;
