import  { useState, useEffect } from "react";
import axios from "axios";
import { patientURL } from "../Api/Api";
import AppointmentCard from "./AppointmentCard.jsx";
import { Button, CircularProgress } from "@mui/material";
import { CalendarMonthOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // For tracking loading state
  const [error, setError] = useState(null); // For tracking error state
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try{
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.get(`${patientURL}/appointment`,{
          headers:{
              'Authorization': `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching profile data. Please try again later.");
      setLoading(false);
      console.error('Error fetching appointments:', error);
    }
  }

  const newAppointment = () => {
    navigate("/appointment"); 
  };

  useEffect(() => {
      fetchAppointments(setAppointments, setLoading, setError); // Use local data
    }, []);

  if (loading) {
    return <div className="loader"><CircularProgress/></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>; 
  }

  return (
    <div className="upcoming-appointments">
      {appointments.length > 0 ? (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div/>
      )}
      <div className="new-appointment">
        <div className="book-now">
          <p>Schedule your next visit with ease – Book an appointment now!</p>
          <CheckCircleOutline sx={{height:40, width:40}}/>
        </div>
        <div>
          <Button
          sx={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'none',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            '&:active': {
              backgroundColor: '#004085',
            },
            '&:disabled': {
              backgroundColor: '#d6d6d6',
              color: '#9a9a9a',
            },
          }}
          variant="contained"
          onClick={newAppointment}
        >
          Book Appointment
          <CalendarMonthOutlined sx={{ marginLeft: '5px' }} />
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
