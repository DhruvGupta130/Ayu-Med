import "./Doctor.css";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Schedule from "./Schedule";
import Feedback from "./Feedback";

const Doctor = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Dashboard />
        <Appointments />
        <Patients />
        <Schedule />
        <Feedback />
      </div>
    </div>
  );
};

export default Doctor;
