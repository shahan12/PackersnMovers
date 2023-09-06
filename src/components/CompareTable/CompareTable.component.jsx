import React, { useState, useEffect } from 'react';
import check from '../../images/check.svg';
import uncheck from '../../images/uncheck.svg';
import './compare.css';
import { useInView } from 'react-intersection-observer';

const data = [
  {
    service: 'Vehicle Assurance',
    shiftkart: 'checkmark',
    local: 'checkmark',
  },
  {
    service: 'Verified Professional Driver',
    shiftkart: 'checkmark',
    local: 'uncheckmark',
  },
  {
    service: 'Regular Update',
    shiftkart: 'checkmark',
    local: 'uncheckmark',
  },
  {
    service: 'Packaging & Unpackaging Of Household Goods',
    shiftkart: 'checkmark',
    local: 'checkmark',
  },
  {
    service: 'Dismantling & Re-Assemble Of Furniture',
    shiftkart: 'checkmark',
    local: 'checkmark',
  },
  {
    service: 'Labour',
    shiftkart: 'checkmark',
    local: 'uncheckmark',
  },
  {
    service: 'Bubble / Foam Wrapping',
    shiftkart: 'checkmark',
    local: 'uncheckmark',
  },
  {
    service: 'Damage Assurance',
    shiftkart: 'checkmark',
    local: 'uncheckmark',
  },
];

const CompareTable = () => {
  const [renderedRows, setRenderedRows] = useState(0);

  useEffect(() => {
    const delay = 200; // Adjust the delay time in milliseconds

    const interval = setInterval(() => {
      if (renderedRows < data.length) {
        setRenderedRows((prevRenderedRows) => prevRenderedRows + 1);
      } else {
        clearInterval(interval);
      }
    }, delay);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [renderedRows]);
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
  return (
    <table  ref={ref} className="custom-table">
      <thead>
        <tr>
          <th className='tableFirst'>Services</th>
          <th className='tableMid'>Shiftkart</th>
          <th  className='tableLast'>Local</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
          key={index}
          className={`left-aligned fade-in ${
            index < renderedRows ? 'activeTableCell' : ''
          } ${index % 2 !== 0 ? 'even-row' : ''}`}
        >
            <td className='serviceTH'>{item.service}</td>
            <td className='checkmarkTH'>
              {item.shiftkart === 'checkmark' ? (
                <img src={check} alt="Checkmark" />
              ) : (
                <img src={uncheck} alt="Uncheckmark" />
              )}
            </td>
            <td className='checkmarkTH'>
              {item.local === 'checkmark' ? (
                <img src={check} alt="Checkmark" />
              ) : (
                <img src={uncheck} alt="Uncheckmark" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompareTable;
