import React from "react";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

function MainLayout({ children, currentView, onViewChange }) {
  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <main className="main-content">
        <div className="calendar-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;