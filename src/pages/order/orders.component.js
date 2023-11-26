import React from "react";
import "./orders.css";
import FillRequrements from "../../components/FillRequirements/fillReq.component";

function Order(props) {
  const {
    isAuthenticated,
    setIsAuthenticated,
  } = props;

  return (
      <FillRequrements isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
  );
}

export default Order;
