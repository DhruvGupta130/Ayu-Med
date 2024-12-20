import { format } from "date-fns"; //
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";

const AppointmentCard = ({ appointment }) => {
  appointment.date = format(new Date(appointment.appointmentDate), "MMMM dd, yyyy");
  appointment.time = format(new Date(appointment.appointmentDate), "hh:mm a");

  const getAvatarText = (fullName) => {
    if(!fullName) return;
    const titlesToSkip = ["Dr.", "Mr.", "Mrs.", "Ms."];
    const names = fullName.split(' ').filter(name => !titlesToSkip.includes(name)); // Filter out titles
    const firstLetter = names[0]?.charAt(0).toUpperCase();
    const lastLetter = names[names.length - 1]?.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };
  

  return (
    <div className="upcoming-card">
      <div>
        {appointment.doctorImage ? (
          <img
            src={appointment.doctorImage}
            alt={`Dr. ${appointment.doctorName}`}
            className="card-photo"
          />
        ) : (
          <Avatar className='card-photo' variant="rounded" sx={{ bgcolor: red[700], width: 100, height: 120 }}>{getAvatarText(appointment.doctorName)}</Avatar>
        )}
      </div>
      <div className="card-details">
        <div className="card-header">
          <h3>{appointment.title}</h3>
          <p>{appointment.date}</p>
        </div>
        <div className="card-body">
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
        </div>
      </div>
    </div>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    appointmentDate: PropTypes.string.isRequired,
    doctorName: PropTypes.string,
    doctorImage: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default AppointmentCard;
