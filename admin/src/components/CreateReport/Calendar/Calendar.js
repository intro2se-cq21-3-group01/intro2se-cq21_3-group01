import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarComponent = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (value) => {
    let [startDate, endDate] = value;

    // Check
    if (!endDate) {
      endDate = startDate;
    }

    setDateRange({ startDate, endDate });

    if (onDateRangeChange) {
      onDateRangeChange({ startDate, endDate });
    }
  };

  return (
    <div>
      <div className="text-daterange-from">
        from: {dateRange.startDate.toDateString()}
      </div>
      <div className="text-daterange-to">
        to: {dateRange.endDate.toDateString()}
      </div>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={[dateRange.startDate, dateRange.endDate]}
          selectRange={true}
          defaultView="month"
          maxDate={new Date()}
          minDate={new Date(2000, 1, 1)}
          nextLabel=">"
          nextAriaLabel="Go to next month"
          next2Label=">>"
          next2AriaLabel="Go to next year"
          prevLabel="<"
          prevAriaLabel="Go to prev month"
          prev2Label="<<"
          prev2AriaLabel="Go to prev year"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
