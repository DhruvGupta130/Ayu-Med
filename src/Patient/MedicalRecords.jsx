import { useEffect, useState } from "react";
import MedicalRecordsCard from "./MedicalRecordsCard.jsx";
import { Alert, CircularProgress } from "@mui/material";
import { fetchProfileData } from "./PatientProfile.jsx";

const MedicalRecords = () => {
  const [patient, setPatient] = useState({
    medicalHistories: [
      {
        problems: "",
        diagnosisDetails: "",
        medications: [],
        treatmentStartDate: "",
        treatmentEndDate: "",
        treatmentPlan: "",
        followUpInstructions: "",
        testsConducted: [],
        notes: "",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await fetchProfileData(setPatient, setLoading, setError);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loader"><CircularProgress/></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!patient || !patient.medicalHistories) {
    return <div>No patient data available.</div>; 
  }

  return (
    <div className="dashboard">
        {patient.medicalHistories.length>0 ?(<div className="medical-list">
          {patient.medicalHistories.map((history, index) => (
            <MedicalRecordsCard
              key={index}
              medicalHistories={[history]}
              testResults={history.testsConducted || []}
              medications={history.medications || []}
            />
          ))}
        </div>):(
          <div className="info-message">
            <Alert severity="info" icon={false}>No Medical history available right now.</Alert>
          </div>
        )
      }
    </div>
  );
};

export default MedicalRecords;
