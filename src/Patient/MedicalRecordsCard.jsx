import PropTypes from "prop-types";

const MedicalRecordsCard = ({ medicalHistories, testResults, medications }) => {
  return (
    <div className="medical-records-container">
      <div className="medical-records-section">
        <h2 className="section-title">Medical History</h2>
        <div className="horizontal-records">
          {medicalHistories.map((history) => (
            <div className="record-card" key={history.id}>
              <h3>Problem: {history.problems}</h3>
              <p><strong>Diagnosis:</strong> {history.diagnosisDetails}</p>
              <p><strong>Treatment Plan:</strong> {history.treatmentPlan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Test Results Section */}
      <div className="medical-records-section">
        <h2 className="section-title">Test Results</h2>
        <div className="horizontal-records">
          {testResults.map((test) => (
            <div className="record-card" key={test.id}>
              <h3>{test.testName}</h3>
              <p><strong>Date:</strong> {test.testDate}</p>
              <p><strong>Result:</strong> {test.result}</p>
              <p><strong>Notes:</strong> {test.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medication Records Section */}
      <div className="medical-records-section">
        <h2 className="section-title">Medications</h2>
        <div className="horizontal-records">
          {medications.map((medication, index) => (
            <div className="record-card" key={index}>
              <h3>{medication}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MedicalRecordsCard.propTypes = {
  medicalHistories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      problems: PropTypes.string.isRequired,
      diagnosisDetails: PropTypes.string.isRequired,
      treatmentPlan: PropTypes.string.isRequired,
    })
  ).isRequired,

  testResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      testName: PropTypes.string.isRequired,
      testDate: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    })
  ).isRequired,

  medications: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MedicalRecordsCard;
