import React from 'react';
import './container.css';

const BlackContainer = ({ title, subtitle }) => {
  return (
    <div className="black-container">
      <span className="title">{title}</span>
    </div>
  );
};

export default BlackContainer;
