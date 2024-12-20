// doctor/DashboardSummary.js
import React from "react";


const DashboardSummary = () => {
  const summary = [
    { label: "Appointments", value: 24 },
    { label: "Patients", value: 120 },
    { label: "Earnings", value: "$1,800" },
  ];

  return (
    <div className="dashboard-summary">
      {summary.map((item, index) => (
        <div key={index} className="summary-card">
          <h4>{item.value}</h4>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
