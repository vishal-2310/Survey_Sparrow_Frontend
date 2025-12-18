import React from "react";
import "./Lists.css";
import eventsData from "../data/events.json";

function HolidaysList() {
  const holidays = eventsData.events
    .filter(event => event.type === "holiday")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="list-view">
      <h2>Holidays</h2>
      {holidays.map(holiday => (
        <div key={holiday.id} className="list-card holiday">
          <h4>{holiday.title}</h4>
          <p className="event-description">{holiday.description}</p>
          <span>{new Date(holiday.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      ))}
    </div>
  );
}

export default HolidaysList;