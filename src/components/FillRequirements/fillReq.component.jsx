import React, { useState } from "react";
import "./fillReq.css";
import "../../images/bachelor.svg";
import "../../images/family.svg";
import Header from "../requirementHeader/requirementHeader.compoennt";
import AddressDetails from "./AddressDetails.component";
import Requirement from "./Requirement.component";
import Inventory from "./Inventory.component";

function FillRequrements(props) {
  const [progress, setProgress] = useState("requirement");

  return (
    <div className="orders-compoennt-wrapper">
      <Header progress={progress} />
      <div className="fillReq-requirements-wrapper flex">
        {progress === 'requirement' ? (
          <Requirement
          progress={progress}
          setProgress={setProgress}
        />
        ) : (
          <Inventory
            progress={progress}
            setProgress={setProgress}
          />
        )}
        <AddressDetails   />
      </div>
    </div>
  );
}

export default FillRequrements;
