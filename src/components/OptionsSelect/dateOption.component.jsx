import React, { useState, useEffect } from "react";
import "./options.css";
import CalendarModal from "./CalendarModel.component";
import { useSelector } from 'react-redux';

function DateOption({ onSelect, selectedDayValue }) {
  const [selectedDay, setSelectedDay] = useState(selectedDayValue);
  
  let totalCost = useSelector((state) => state.TotalCostItems);
  const [priceRed, setPriceRed] = useState(0);

  useEffect(() => {
      setPriceRed(totalCost.totalCostBF ? totalCost.totalCostBF : 0);
  }, [totalCost]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const generateDays = () => {
    
    const today = new Date();
    const days = [];

    for (let i = 0; i < 15; i++) {
      const bookingDate = new Date(today);
      bookingDate.setDate(today.getDate() + i);

      const dayOfWeek = weekdays[bookingDate.getDay()];
      const date = bookingDate.getDate();

      let price = Number(priceRed); // Ensure price is a number
      let isWeekend = false;
      
      if (bookingDate.getDay() === 0 || bookingDate.getDay() === 6) {
        // Weekend (Sunday or Saturday)
        price = price * 1.2; // Ensure price is a number for multiplication
        isWeekend = true;
      }
      const currentDate=new Date();
      
      days.push({ dayOfWeek, date, price, isWeekend, bookingDate, currentDate });
    }

    return days;
  };

  const generatedData = generateDays();

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onSelect(day);
  };

  const [date1, setDate1] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  const onDateChange = (date) => {
    setDate1(date);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  return (
    <div className="day-box">
      {generatedData.map((day, index) => (
        <div
          key={index}
          className={`daybox-item ${
            selectedDay &&
            selectedDay.date === day.date &&
            selectedDay.dayOfWeek === day.dayOfWeek
              ? "selected"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDayClick(day);
          }}
        >
          <p>{index === 0 ? "Tomorrow" : day.dayOfWeek}</p>
          <p className="dayofweek"> {day.date}</p>
          <p className={day.isWeekend ? "weekend-price" : "weekday-price"}>
            ₹{day.price.toFixed(0)}
          </p>
        </div>
      ))}
      {/* 
    <div onClick={openModal} className="daybox-item">
      <p>Calendar</p>
    </div>
    <CalendarModal isOpen={isModalOpen} onRequestClose={closeModal} date={date1} onDateChange={onDateChange} /> */}
    </div>
  );
}

export default DateOption;
