import React from "react";
import "./CalendarGrid.css";

function CalendarGrid({ currentDate, now, monthNames }) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Import events data (make sure the path is correct)
  const eventsData = {
    events: [
      {
        "id": 13,
        "title": "Office Decorating",
        "date": "2025-12-18",
        "time": "3:00 - 5:00 PM",
        "type": "social",
        "color": "#10b981",
        "description": "Office holiday decoration party"
      },
      // ... other events
    ]
  };

  // Filter events for current month
  const currentMonthEvents = eventsData.events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && 
           eventDate.getMonth() === currentDate.getMonth();
  });

  // Group events by date for easy lookup
  const eventsByDate = currentMonthEvents.reduce((acc, event) => {
    const dateKey = event.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  const generateCalendar = () => {
    const start = new Date(year, currentDate.getMonth(), 1);
    const end = new Date(year, currentDate.getMonth() + 1, 0);
    const days = [];

    for (let i = 0; i < start.getDay(); i++) days.push(null);
    for (let d = 1; d <= end.getDate(); d++) {
      days.push(new Date(year, currentDate.getMonth(), d));
    }
    
    // Ensure we always have 42 cells (6 weeks) for consistent layout
    while (days.length < 42) {
      days.push(null);
    }
    
    return days;
  };

  const calendarDays = generateCalendar();

  return (
    <div className="calendar-grid-container">
      <div className="calendar-grid">
        {daysOfWeek.map(d => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {calendarDays.map((date, i) => {
          const dateKey = date?.toISOString().split('T')[0]; // YYYY-MM-DD format
          const isToday = date &&
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

          return (
            <div key={i} className={`day-cell ${isToday ? 'today' : ''}`}>
              {date && (
                <div className="date-number">
                  {date.getDate()}
                  {isToday && <span className="today-badge">Today</span>}
                </div>
              )}
              {dateKey && eventsByDate[dateKey]?.map((event, idx) => (
                <div 
                  key={event.id} 
                  className={`event ${event.type === 'holiday' ? 'holiday-event' : ''}`}
                  style={{ borderLeftColor: event.color }}
                >
                  <strong>{event.title}</strong>
                  <div>{event.time}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;