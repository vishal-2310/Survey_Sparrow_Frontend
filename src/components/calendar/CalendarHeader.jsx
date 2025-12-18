import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MonthYearPicker from "./MonthYearPicker";
import "./CalendarHeader.css";

function CalendarHeader({ 
  currentDate, 
  now, 
  monthNames, 
  onMonthYearClick, 
  onPreviousMonth, 
  onNextMonth,
  showMonthYearPicker,
  onMonthYearSelect,
  onCloseMonthYearPicker,
  onGoToToday // Add this new prop
}) {
  const year = currentDate.getFullYear();

  // Format the date string to match "Thu Dec 18 2025"
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <>
      <div className="calendar-header">
        <div className="current-datetime">
          <div className="current-time">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div 
            className="current-date clickable" 
            onClick={onGoToToday} // Add click handler
            title="Click to go to today"
          >
            {formattedDate}
          </div>
        </div>

        <div className="month-controls">
          <h2 onClick={onMonthYearClick} className="month-year-title">
            {monthNames[currentDate.getMonth()]} {year}
          </h2>
          <div className="nav-buttons">
            <button onClick={onPreviousMonth}>
              <FiChevronLeft />
            </button>
            <button onClick={onNextMonth}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {showMonthYearPicker && (
        <MonthYearPicker
          currentDate={currentDate}
          monthNames={monthNames}
          onSelect={onMonthYearSelect}
          onClose={onCloseMonthYearPicker}
        />
      )}
    </>
  );
}

export default CalendarHeader;