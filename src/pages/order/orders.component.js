import React from "react";
import "./orders.css";
import Header from "../../components/requirementHeader/requirementHeader.compoennt";
import FillRequrements from "../../components/FillRequirements/fillReq.component";

function Order(props) {
  return (
    <div className="orders-compoennt-wrapper">
      <Header />
      <FillRequrements />
    </div>
  );
}

export default Order;
