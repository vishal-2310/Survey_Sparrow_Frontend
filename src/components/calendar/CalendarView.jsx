import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import "./CalendarView.css";

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [slideDirection, setSlideDirection] = useState(""); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMonthYearClick = () => {
    setShowMonthYearPicker(true);
  };

  const handlePreviousMonth = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("slide-left");
    
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
  };

  const handleNextMonth = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("slide-right");
    
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
  };

  const handleMonthYearSelect = (newDate) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const oldMonth = currentDate.getMonth();
    const newMonth = newDate.getMonth();
    const oldYear = currentDate.getFullYear();
    const newYear = newDate.getFullYear();
    
    if (newYear > oldYear || (newYear === oldYear && newMonth > oldMonth)) {
      setSlideDirection("slide-right");
    } else if (newYear < oldYear || (newYear === oldYear && newMonth < oldMonth)) {
      setSlideDirection("slide-left");
    }
    
    setTimeout(() => {
      setCurrentDate(newDate);
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
    setShowMonthYearPicker(false);
  };

  const handleGoToToday = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const today = new Date();
    const todayMonth = today.getMonth();
    const currentMonth = currentDate.getMonth();
    const todayYear = today.getFullYear();
    const currentYear = currentDate.getFullYear();
    
    if (todayYear > currentYear || (todayYear === currentYear && todayMonth > currentMonth)) {
      setSlideDirection("slide-right");
    } else if (todayYear < currentYear || (todayYear === currentYear && todayMonth < currentMonth)) {
      setSlideDirection("slide-left");
    }
    
    setTimeout(() => {
      setCurrentDate(today);
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
    setShowMonthYearPicker(false);
  };

  return (
    <>
      <CalendarHeader
        currentDate={currentDate}
        now={now}
        monthNames={monthNames}
        onMonthYearClick={handleMonthYearClick}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        showMonthYearPicker={showMonthYearPicker}
        onMonthYearSelect={handleMonthYearSelect}
        onCloseMonthYearPicker={() => setShowMonthYearPicker(false)}
        onGoToToday={handleGoToToday}
      />
      
      <div className={`calendar-grid-container ${slideDirection}`}>
        <CalendarGrid 
          currentDate={currentDate} 
          now={now} 
          monthNames={monthNames}
        />
      </div>
    </>
  );
}

export default CalendarView;