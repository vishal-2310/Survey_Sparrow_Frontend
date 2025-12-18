import React, { useState } from "react";
import MainLayout from "./components/layout/MainLayout.jsx";
import CalendarView from "./components/calendar/CalendarView";
import EventsList from "./components/lists/EventsList";
import HolidaysList from "./components/lists/HolidaysList";
import "./App.css";

function App() {
  const [view, setView] = useState("calendar");
  
  return (
    <MainLayout currentView={view} onViewChange={setView}>
      {view === "calendar" && <CalendarView />}
      {view === "events" && <EventsList />}
      {view === "holidays" && <HolidaysList />}
    </MainLayout>
  );
}

export default App;