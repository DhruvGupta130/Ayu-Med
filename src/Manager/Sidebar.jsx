import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsIcon from "@mui/icons-material/Settings";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Appointments", icon: <EventIcon /> },
    { name: "Patients", icon: <PeopleIcon /> },
    { name: "Schedule", icon: <ScheduleIcon /> },
    { name: "Feedback", icon: <FeedbackIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
    { name: "Logout", icon: <Logout /> }
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
          <Link to = {`/${item.name.toLowerCase()}`}><span className="icon">{item.icon}</span>
          {item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
