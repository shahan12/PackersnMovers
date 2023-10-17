import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import './options.css'; 
import './package.css';

const PackageSelect = ({ isOpen, onRequestClose, }) => {

  if (!isOpen) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal2">
          <button onClick={onRequestClose} className="modal-close-button">
            x
          </button>
            <h2>Select an option:</h2>
            <div class="packaging-options">
            <h2>Packaging Options</h2>
            <ul>
              <li>
                <h3>Standard</h3>
                <p>Single Layer Packaging</p>
                <p>Free</p>
                <button type="button">Add</button>
              </li>
              <li>
                <h3>Premium</h3>
                <p>Three Layer Packaging</p>
                <p>$1,000</p>
                <button type="button">Add</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
    
export default PackageSelect;