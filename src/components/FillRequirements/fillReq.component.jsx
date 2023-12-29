import React, { useState, useEffect } from "react";
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
  const {
    isAuthenticated,
    setIsAuthenticated,
  } = props;
  const [progress, setProgress] = useState("requirement");
  const [packageSel, setPackageSel] = useState({ packageName: 'Standard', price: 0 });
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [cft, setCft] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [progress]);

  return (
    <div className="orders-compoennt-wrapper">
      {/* <Header progress={progress} /> */}
      <div className="fillReq-requirements-wrapper">
        {progress === 'requirement' ? (
          <Requirement progress={progress} setProgress={setProgress} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        ) : progress === 'inventory' ? (
          <Inventory progress={progress} setProgress={setProgress} setTotalItemCount={setTotalItemCount} totalItemCount={totalItemCount} setCft={setCft} />
        ) : progress === 'dateselection' ? (
          <Dateselection setProgress={setProgress} packageSel={packageSel} setPackageSel={setPackageSel} />
        ) : progress === 'progress' ? (
          <Progress progress={progress} setProgress={setProgress} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        ) : null}
        <AddressDetails progress={progress} packageSel={packageSel} cft={cft} totalItemCount={totalItemCount} />
      </div>
    </div>
  );
}

export default FillRequrements;
