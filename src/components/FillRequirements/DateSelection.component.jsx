import React, { useState } from 'react';

import { format, isWeekend } from 'date-fns';

import "./calendar.css";

const Dateselection = ({progress, setProgress}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const isWeekday = (date) => !isWeekend(date);

  const renderCalendar = () => {
    const currentDate = new Date();
    const daysInMonth = [];
    const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    // const firstDayOfWeek = monthStartDate.getDay();

    for (let day = 1; day <= monthEndDate.getDate(); day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isCurrentMonth = date >= monthStartDate && date <= monthEndDate;
      daysInMonth.push(
        <div
          key={day}
          className={`calendar-day ${isWeekday(date) ? 'weekday' : 'weekend'} ${!isCurrentMonth && 'other-month'}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
          <div className="price">
            {isWeekday(date) ? 'Weekday Price: $X' : 'Weekend Price: $Y'}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar">
        {daysInMonth.map((day) => day)}
      </div>
    );
  };

  return (
    <div className="requirements-section-1">
      <div className="calendar-container">
        {renderCalendar()}
        <div className="selected-date">
          {selectedDate && (
            <>
              <p>Selected Date: {format(selectedDate, 'MM/dd/yyyy')}</p>
              <p>Price: {isWeekday(selectedDate) ? '$X' : '$Y'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dateselection;
