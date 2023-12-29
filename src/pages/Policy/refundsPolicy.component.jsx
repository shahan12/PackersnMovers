import React from "react";
import parse from 'html-react-parser';
import "bootstrap/dist/css/bootstrap.min.css";
import { htmlStructure  } from "./refundshtml";
import BlackContainer from "../../components/container/BlackContainer.component";
import "./policy.css";

function RefundsPolicy({ isHomePage }) {
  return (
<>
    <BlackContainer title={"Refunds, Returns and Cancellation Policy"}/>
    <div className={`${isHomePage ? '' : 'about-top'}`}>
      <div className="row px-4 ">
      <div className="about-us-setion-2">
          {parse(htmlStructure)}
          
        </div>

      </div>
    </div>
</>
  );
}

export default RefundsPolicy;
