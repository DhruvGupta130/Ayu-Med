const Feedback = () => {
  const feedback = [
    { id: 1, patient: "John Doe", rating: 4, comments: "Great service!" },
    { id: 2, patient: "Jane Smith", rating: 5, comments: "Very professional." },
  ];

  return (
    <div className="content">
      <h4>Feedback</h4>
      {feedback.map((fb) => (
        <div className="card" key={fb.id}>
          <p>Patient: {fb.patient}</p>
          <p>Rating: {fb.rating}</p>
          <p>Comments: {fb.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
