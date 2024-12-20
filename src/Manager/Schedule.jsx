const Schedule = () => {
  const schedule = [
    { day: "Monday", time: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
  ];

  return (
    <div className="content">
      <h4>Schedule</h4>
      {schedule.map((slot, index) => (
        <div className="card" key={index}>
          <p>Day: {slot.day}</p>
          <p>Time: {slot.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
