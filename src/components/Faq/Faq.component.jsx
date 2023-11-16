import React, { useState } from "react";
import "./Faq.css";
import data from "./faq.json";
import arrow from "../../images/arrow-right.png";

const RetractableTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  return (
    <table className="retractable-table">
      <tbody>
        {data.data.map((row, index) => (
          <React.Fragment key={index}>
            <tr
              className={`header-row ${
                expandedRow === index ? "hide-border" : ""
              }`}
              onClick={() => toggleRow(index)}
            >
              <td>{row.header1}</td>
              <img
                className={`${
                  expandedRow === index ? "rotate-down" : ""
                } stars`}
                src={arrow}
                alt="stars"
              ></img>
            </tr>
            {expandedRow === index && (
              <tr className="data-row">
                <td colSpan="1">
                  <div>{row.data}</div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default RetractableTable;
