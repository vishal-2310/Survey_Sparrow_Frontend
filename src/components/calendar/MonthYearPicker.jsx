import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiX } from "react-icons/fi";
import "./MonthYearPicker.css";

function MonthYearPicker({ currentDate, monthNames, onSelect, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const monthWheelRef = useRef(null);
  const yearWheelRef = useRef(null);
  const popupRef = useRef(null);

  const monthNamesShort = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const centerItem = useCallback((wheelRef, index) => {
    if (!wheelRef.current) return;

    const itemHeight = 50;
    const wheelHeight = wheelRef.current.clientHeight;
    const centerPosition = (index * itemHeight) + (itemHeight / 2) - (wheelHeight / 2);

    wheelRef.current.scrollTo({
      top: centerPosition,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      centerItem(monthWheelRef, selectedMonth);
    }, 100);

    setTimeout(() => {
      const yearIndex = years.indexOf(selectedYear);
      centerItem(yearWheelRef, yearIndex);
    }, 150);
  }, []);

  const handleMonthWheelScroll = () => {
    if (!monthWheelRef.current) return;

    const scrollTop = monthWheelRef.current.scrollTop;
    const itemHeight = 50;
    const wheelHeight = monthWheelRef.current.clientHeight;

    const centerIndex = Math.round(
      (scrollTop + wheelHeight / 2 - itemHeight / 2) / itemHeight
    );

    const normalizedIndex = ((centerIndex % 12) + 12) % 12;
    setSelectedMonth(normalizedIndex);
  };

  const handleYearWheelScroll = () => {
    if (!yearWheelRef.current) return;

    const scrollTop = yearWheelRef.current.scrollTop;
    const itemHeight = 50;
    const wheelHeight = yearWheelRef.current.clientHeight;

    const centerIndex = Math.round(
      (scrollTop + wheelHeight / 2 - itemHeight / 2) / itemHeight
    );

    const padding = 10;
    const yearIndex = centerIndex - padding;

    if (yearIndex >= 0 && yearIndex < years.length) {
      setSelectedYear(years[yearIndex]);
    }
  };

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex);
    centerItem(monthWheelRef, monthIndex);
  };

  const handleYearClick = (yearValue) => {
    setSelectedYear(yearValue);
    const yearIndex = years.indexOf(yearValue);
    centerItem(yearWheelRef, yearIndex);
  };

  const generateMonthItems = () => {
    const items = [];
    for (let i = 0; i < 36; i++) {
      const monthIndex = i % 12;
      items.push({
        index: monthIndex,
        name: monthNamesShort[monthIndex]
      });
    }
    return items;
  };

  const generateYearItems = () => {
    const items = [];
    for (let i = -10; i < years.length + 10; i++) {
      const actualIndex = Math.max(0, Math.min(i, years.length - 1));
      items.push(years[actualIndex]);
    }
    return items;
  };

  const monthItems = generateMonthItems();
  const yearItems = generateYearItems();

  const handleApply = () => {
    onSelect(new Date(selectedYear, selectedMonth, 1));
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="month-year-picker" ref={popupRef}>
        <div className="picker-header">
          <h3>Select Month & Year</h3>
          <button className="close-btn" onClick={handleCancel}>
            <FiX />
          </button>
        </div>

        <div className="picker-wheels">
          {/* MONTH WHEEL */}
          <div className="wheel-container">
            <div className="wheel-label">MONTH</div>
            <div className="wheel">
              <div
                className="wheel-scroll"
                ref={monthWheelRef}
                onScroll={handleMonthWheelScroll}
              >
                {monthItems.map((monthData, idx) => (
                  <div
                    key={idx}
                    className={`wheel-item ${selectedMonth === monthData.index ? 'selected' : ''}`}
                    onClick={() => handleMonthClick(monthData.index)}
                  >
                    {monthData.name}
                  </div>
                ))}
              </div>
              <div className="wheel-highlight"></div>
              <div className="wheel-overlay top"></div>
              <div className="wheel-overlay bottom"></div>
            </div>
          </div>

          {/* YEAR WHEEL */}
          <div className="wheel-container">
            <div className="wheel-label">YEAR</div>
            <div className="wheel">
              <div
                className="wheel-scroll"
                ref={yearWheelRef}
                onScroll={handleYearWheelScroll}
              >
                {yearItems.map((yearVal, idx) => (
                  <div
                    key={idx}
                    className={`wheel-item ${selectedYear === yearVal ? 'selected' : ''}`}
                    onClick={() => handleYearClick(yearVal)}
                  >
                    {yearVal}
                  </div>
                ))}
              </div>
              <div className="wheel-highlight"></div>
              <div className="wheel-overlay top"></div>
              <div className="wheel-overlay bottom"></div>
            </div>
          </div>
        </div>

        <div className="selected-display">
          Selected: {monthNames[selectedMonth]} {selectedYear}
        </div>

        <div className="picker-footer">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonthYearPicker;