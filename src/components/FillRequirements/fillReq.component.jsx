import React, { useState } from "react";
import "./fillReq.css";
import "../../images/bachelor.svg";
import "../../images/family.svg";
import Header from "../requirementHeader/requirementHeader.compoennt";
import AddressDetails from "./AddressDetails.component";
import Requirement from "./Requirement.component";
import Inventory from "./Inventory.component";
import Dateselection from "./DateSelection.component";
import Progress from "./Progress.component";

function FillRequrements(props) {
  const [progress, setProgress] = useState("requirement");
  console.log("progress", progress);
  return (
    <div className="orders-compoennt-wrapper">
      <Header progress={progress} />
      <div className="fillReq-requirements-wrapper flex">
      {progress === 'requirement' ? (
        <Requirement progress={progress} setProgress={setProgress} />
      ) : progress === 'inventory' ? (
        <Inventory progress={progress} setProgress={setProgress} />
      ) : progress === 'dateselection' ? (
        <Dateselection progress={progress} setProgress={setProgress}  />
      ) : progress === 'progress' ? (
        <Progress />
      ) : null}
        <AddressDetails progress={progress} />
      </div>
    </div>
  );
}

export default FillRequrements;
