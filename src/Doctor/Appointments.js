// doctor/Appointments.jsx
import React from "react";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", status: "confirmed" },
    { id: 2, patient: "Jane Smith", time: "11:30 AM", status: "pending" },
    { id: 3, patient: "Paul Lee", time: "2:00 PM", status: "cancelled" },
    { id: 4, patient: "Emily Davis", time: "4:00 PM", status: "confirmed" },
  ];

  return (
    <div className="content">
      {appointments.map((appointment) => (
        <div className="card" key={appointment.id}>
          <h4>Patient: {appointment.patient}</h4>
          <p>Time: {appointment.time}</p>
          <span className={`status ${appointment.status}`}>{appointment.status}</span>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
