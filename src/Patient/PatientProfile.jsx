/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import PatientDetailsCard from './PatientDetailsCard.jsx';
import axios from 'axios';
import { patientURL } from "../Api/Api";
import './Patient.css';
import { CircularProgress } from '@mui/material';
import PatientAddressCard from './PatientAddressCard.jsx';

export const fetchProfileData = async (setPatient, setLoading, setError) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${patientURL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPatient(response.data);
    setLoading(false); 
  } catch (error) {
    setError("Error fetching profile data. Please try again later.");
    setLoading(false); 
    console.error("Error fetching profile data", error);
  }
};

const PatientProfile = () => {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobile: "",
    nationality: "",
    image: "",
    address: {},
    fullName: "",
    aadhaarId: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetchProfileData(setPatient, setLoading, setError);
  }, []);

  // Function to fetch the latest profile data after the update
  const refreshProfileData = () => {
    setLoading(true);
    setError(null);
    fetchProfileData(setPatient, setLoading, setError);
  };

  if (loading) {
    return <div className='loader'><CircularProgress/></div>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  return (
    <div className="main-content">
      {patient ? (
        <div className='patient-profile'>
          <PatientDetailsCard patient={patient} refreshProfileData={refreshProfileData} />
          <PatientAddressCard patient={patient} refreshProfileData={refreshProfileData} />
        </div>
      ) : (
        <div>No patient data available</div> 
      )}
    </div>
  );
};

export default PatientProfile;
