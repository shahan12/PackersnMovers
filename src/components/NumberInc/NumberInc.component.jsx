import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./number.css";
const NumberInc = ({ value, text, subtext, color }) => {
  const [isVisible, setIsVisible] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  const duration = Math.min(6 + Math.abs(value) / 1000, 4);
  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  };

  return (
    <div ref={ref}>
      <div className="flex-container">
        <div className="top-text" style={{ color: color }}>
          {isVisible && (
            <CountUp start={0} end={value} duration={duration} {...options}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          )}{" "}
          {text}
        </div>
        <div className="bottom-subtext">{subtext}</div>
      </div>
    </div>
  );
};

export default NumberInc;
