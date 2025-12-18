import React from "react";
import "./Lists.css";
import eventsData from "../data/events.json";

function EventsList() {
  const allEvents = [...eventsData.events].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="list-view">
      <h2>All Events</h2>
      {allEvents.map(event => (
        <div key={event.id} className="list-card" style={{ borderLeftColor: event.color }}>
          <h4>{event.title}</h4>
          <p>{event.time}</p>
          <p className="event-description">{event.description}</p>
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <div className="event-type-badge">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsList;