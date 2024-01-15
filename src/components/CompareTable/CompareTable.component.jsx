import React, { useState, useEffect } from "react";
import check from "../../images/check.svg";
import uncheck from "../../images/uncheck.svg";
import "./compare.css";
import { useInView } from "react-intersection-observer";

const data = [
  {
    service: "Professional Sales Expert",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Dedicated Shifitng Manager",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Flexible Date And Slot",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Zero Cancellation Charges",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Company Owned Closed Container Vehicles",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Trained And Skilled Packers",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Customized ShiftKart Packaging Material",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
  {
    service: "Regular Consignment Updates",
    shiftkart: "checkmark",
    local: "uncheckmark",
  },
];

const CompareTable = () => {
  const [renderedRows, setRenderedRows] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  useEffect(() => {
    const delay = 200; // Adjust the delay time in milliseconds

    const interval = setInterval(() => {
      if (inView && isVisible && renderedRows < data.length) {
        setRenderedRows((prevRenderedRows) => prevRenderedRows + 1);
      } else {
        clearInterval(interval);
      }
    }, delay);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [renderedRows, isVisible, inView]);

  return (
    <div ref={ref}>
      {isVisible && (
        <table className="custom-table">
          <thead>
            <tr>
              <th className="tableFirst thCustom">Services</th>
              <th className="tableMid thCustom">Shiftkart</th>
              <th className="tableLast thCustom">Local</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`left-aligned fade-in ${
                  index < renderedRows ? "activeTableCell" : ""
                } ${index % 2 !== 0 ? "even-row" : ""}`}
              >
                <td className="serviceTH">{item.service}</td>
                <td className="checkmarkTH">
                  {item.shiftkart === "checkmark" ? (
                    <img className="propertiesShiftkart" src={check} alt="Checkmark" />
                  ) : (
                    <img className="propertiesShiftkart" src={uncheck} alt="Uncheckmark" />
                  )}
                </td>
                <td className="checkmarkTH">
                  {item.local === "checkmark" ? (
                    <img className="propertiesShiftkart" src={check} alt="Checkmark" />
                  ) : (
                    <img className="propertiesShiftkart" src={uncheck} alt="Uncheckmark" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompareTable;
