import React, { useState, useEffect } from "react";
import { FiCalendar, FiList, FiSun, FiPlus, FiSettings, FiClock } from "react-icons/fi";
import eventsData from "../data/events.json";
import "./Sidebar.css";

function Sidebar({ currentView, onViewChange }) {
  const [todaysEvents, setTodaysEvents] = useState([]);

  useEffect(() => {
    // Get today's events from the JSON file
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const events = eventsData.events.filter(event => event.date === todayStr);
    setTodaysEvents(events);
  }, []);

  const handleSettingsClick = () => {
    console.log("Settings button clicked - functionality to be implemented");
  };

  const today = new Date();

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img src="https://i.pravatar.cc/100" alt="profile" className="profile-pic" />
      </div>

      <button className="add-event-btn">
        <FiPlus /> Add Event
      </button>

      <nav className="sidebar-nav">
        <button 
          onClick={() => onViewChange("calendar")}
          className={currentView === "calendar" ? "active" : ""}
        >
          <FiCalendar /> Calendar
        </button>
        <button 
          onClick={() => onViewChange("events")}
          className={currentView === "events" ? "active" : ""}
        >
          <FiList /> Events
        </button>
        <button 
          onClick={() => onViewChange("holidays")}
          className={currentView === "holidays" ? "active" : ""}
        >
          <FiSun /> Holidays
        </button>
      </nav>

      {/* Today's Events Section - Right below Holidays */}
      <div className="todays-events-section">
        <div className="section-header">
          <FiClock className="section-icon" />
          <h3>Today's Events</h3>
        </div>
        <div className="todays-date">
          {today.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        
        {todaysEvents.length > 0 ? (
          <div className="events-list">
            {todaysEvents.map(event => (
              <div key={event.id} className="event-item" style={{ borderLeftColor: event.color }}>
                <div className="event-time">{event.time}</div>
                <div className="event-title">{event.title}</div>
                <div className={`event-type ${event.type}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            No events scheduled for today
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="settings-btn" onClick={handleSettingsClick}>
          <FiSettings /> Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;