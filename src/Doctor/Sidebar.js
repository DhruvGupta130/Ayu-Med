// doctor/Sidebar.jsx
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsIcon from "@mui/icons-material/Settings";


const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Appointments", icon: <EventIcon /> },
    { name: "Patients", icon: <PeopleIcon /> },
    { name: "Schedule", icon: <ScheduleIcon /> },
    { name: "Feedback", icon: <FeedbackIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
          <span className="icon">{item.icon}</span>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
