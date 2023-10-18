import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import './options.css'; 

const CalendarModal = ({ isOpen, onRequestClose, date, onDateChange }) => {
    if (!isOpen) {
        return null;
      }
      console.log("date", date);
      return (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={onRequestClose} className="modal-close-button">
              x
            </button>
            <Calendar onChange={onDateChange} value={date} />
          </div>
        </div>
      );
    };
    
    export default CalendarModal;