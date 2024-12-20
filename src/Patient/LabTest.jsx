import { useEffect, useState } from 'react';
import axios from 'axios';
import { patientURL } from '../Api/Api';
import { Alert, Button, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';

const LabTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true); // For tracking loading state
  const [error, setError] = useState(null); // For tracking error state

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${patientURL}/lab`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTestResults(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching Lab Tests. Please try again later.");
      setLoading(false); // Even on error, loading is done
      console.error('Error fetching Lab Tests:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="loader"><CircularProgress/></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="labtest-container">
      {testResults.length === 0 && !loading && !error &&(
        <div className="info-message">
          <Alert severity="info" icon={false}>No Medical history available right now.</Alert>
        </div>
      )}

      {/* Display each test result */}
      <div className="test-list">
        {testResults.map((test, index) => (
          <div className="test-card" key={index}>
            <h3>{test.testName}</h3>
            <p><strong>Test Date:</strong> {new Date(test.testDate).toLocaleDateString()}</p>
            <p><strong>Result:</strong> {test.result || 'No result available'}</p>
            <p><strong>Notes:</strong> {test.notes || 'No additional notes'}</p>
            <p><Button color='success' variant='outlined'> Download Lab Report <Download/></Button></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabTest;
