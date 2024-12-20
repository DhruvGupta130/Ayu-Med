import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined"; // Icon for lab results

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside of it
  const closeSidebar = (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when clicking on a menu option
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, []);

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "show" : "hide"}`}>
        <div className="sidebar-wrapper">
          <ul className="sidebar-menu">
            <li>
              <Link to="/patient/profile" className="sidebar-link" onClick={handleLinkClick}>
                <DashboardOutlinedIcon className="sidebar-icon" />
                Profile Details
              </Link>
            </li>
            <li>
              <Link to="/patient/appointments" className="sidebar-link" onClick={handleLinkClick}>
                <EventNoteOutlinedIcon className="sidebar-icon" />
                Appointments
              </Link>
            </li>
            <li>
              <Link to="/patient/documents" className="sidebar-link" onClick={handleLinkClick}>
                <DocumentScannerOutlinedIcon className="sidebar-icon" />
                Documents
              </Link>
            </li>
            <li>
              <Link to="/patient/history" className="sidebar-link" onClick={handleLinkClick}>
                <HistoryOutlinedIcon className="sidebar-icon" />
                Medical History
              </Link>
            </li>
            <li>
              <Link to="/patient/billing" className="sidebar-link" onClick={handleLinkClick}>
                <PaymentOutlinedIcon className="sidebar-icon" />
                Billing
              </Link>
            </li>
            <li>
              <Link to="/patient/lab-results" className="sidebar-link" onClick={handleLinkClick}>
                <LocalHospitalOutlinedIcon className="sidebar-icon" />
                Lab Results
              </Link>
            </li>
            <li>
              <Link to="/patient/notifications" className="sidebar-link" onClick={handleLinkClick}>
                <NotificationsOutlinedIcon className="sidebar-icon" />
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/patient/settings" className="sidebar-link" onClick={handleLinkClick}>
                <SettingsOutlinedIcon className="sidebar-icon" />
                Profile Settings
              </Link>
            </li>
            <li>
              <Link to="/logout" className="sidebar-link" onClick={handleLinkClick}>
                <ExitToAppOutlinedIcon className="sidebar-icon" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
    </>
  );
};

export default Sidebar;
