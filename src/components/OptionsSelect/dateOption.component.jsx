import React, { useState } from 'react';
import './options.css';
import CalendarModal from './CalendarModel.component';

function DateOption({ onSelect, value }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const generateDays = () => {
    const today = new Date();
    const days = [];
  
    for (let i = 0; i < 15; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      const dayOfWeek = weekdays[currentDate.getDay()];
      const date = currentDate.getDate(); 
  
      let price = 2499;
      let isWeekend = false;
  
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        // Weekend (Sunday or Saturday)
        price = price * 1.2;
        isWeekend = true;
      }
  
      days.push({ dayOfWeek, date, price, isWeekend, currentDate });
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
        className={`daybox-item ${selectedDay === day ? 'selected' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDayClick(day);
        }}
      >
        <p >{index === 0 ? 'Tomorrow' : day.dayOfWeek}</p>
        <p className='dayofweek'> {day.date}</p>
        <p className={day.isWeekend ? 'weekend-price' : 'weekday-price'}>₹{day.price.toFixed(0)}</p>
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
