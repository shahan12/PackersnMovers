import React, { useState } from "react";
import "./Faq.css";
import data from "./faq.json";
import arrow from "../../images/arrow-right.png";

const RetractableTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (index) => {
    setExpandedRows((prevState) =>
      prevState.includes(index)
        ? prevState.filter((rowIndex) => rowIndex !== index)
        : [...prevState, index]
    );
  };

  return (
    <table className="retractable-table">
      <tbody>
        {data.data.map((row, index) => (
          <React.Fragment key={index}>
            <tr
              className={`header-row ${
                expandedRows.includes(index) && "hide-border"
              }`}
              onClick={() => toggleRow(index)}
            >
              <td>{row.header1}</td>
              <img
                className={`${
                  expandedRows.includes(index) && "rotate-down"
                } stars`}
                src={arrow}
                alt="stars"
              ></img>
            </tr>
            {expandedRows.includes(index) && (
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
