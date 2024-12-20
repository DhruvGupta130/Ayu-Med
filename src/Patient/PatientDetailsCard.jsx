import { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Box, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { IMAGE_URL, patientURL } from "../Api/Api";
import PropTypes from 'prop-types';
import { Image } from '@mui/icons-material';

const PatientDetailsCard = ({ patient, refreshProfileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPatient, setUpdatedPatient] = useState({ ...patient });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 

  useEffect(() => {
    if (success) {
      const successTimeout = setTimeout(() => {
        setSuccess('');
        setIsEditing(false);
        refreshProfileData();
      }, 2000);
      return () => clearTimeout(successTimeout); 
    }
  }, [refreshProfileData, success]);

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError('');
      }, 2000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  const getAvatarText = (fullName) => {
    const titlesToSkip = ["Dr.", "Mr.", "Mrs.", "Ms."];
    const names = fullName.split(' ').filter(name => !titlesToSkip.includes(name)); // Filter out titles
    const firstLetter = names[0]?.charAt(0).toUpperCase();
    const lastLetter = names[names.length - 1]?.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const previewURL = (window.URL || window.webkitURL).createObjectURL(file); 
        setImagePreview(previewURL);
        setImageFile(file); 
      } catch (error) {
        console.error("Preview generation failed:", error);
        alert("Image preview is not supported in your environment.");
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if(!updatedPatient.aadhaarId || !updatedPatient.nationality || !updatedPatient.alternateMobile){
        setError("Please fill all the required fields!")
        return;
      }if(updatedPatient.aadhaarId.toString().length !== 12){
        setError('Invalid aadhaar number!')
        return;
      }if(updatedPatient.alternateMobile.toString().length !== 10){
        setError('Invalid mobile number!')
        return;
      }
      formData.append("aadhaarId", updatedPatient.aadhaarId);
      formData.append("mobile", updatedPatient.alternateMobile);
      formData.append("nationality", updatedPatient.nationality);
      if (!imageFile) {
        setError('Please select a image!');
        return;
      }
      formData.append("image", imageFile);
      const response = await axios.put(`${patientURL}/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Error updating profile. Please try again later.");
    }
  };

  const isProfileIncomplete = !patient.image;

  return (
    <div className="patient-card">
      <h2>My Profile</h2>
      <div className="patient-header">
        {patient.image ? (
          <img src={`${IMAGE_URL}${patient.image}`} alt={`${patient.fullName}`} className="patient-image" />
        ) : (
          <Avatar className='patient-image' variant='rounded' sx={{ bgcolor: red[700], width: 100, height: 110 }}>
            {getAvatarText(patient.fullName)}
          </Avatar>
        )}
        <div>
          <p className="patient-name">{patient.fullName}</p>
        </div>
      </div>
      <div className="patient-info">
        <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Mobile:</strong> {patient.mobile}</p>
        <p><strong>Alternate Mobile:</strong> {patient.alternateMobile}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Aadhaar ID:</strong> {patient.aadhaarId}</p>
        <p><strong>Nationality:</strong> {patient.nationality}</p>
      </div>

      {isProfileIncomplete && (
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
          Update Profile
        </Button>
      )}

      <Modal open={isEditing} onClose={() => setIsEditing(false)} aria-labelledby="edit-profile-modal">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, borderRadius: '8px', width: '500px', maxWidth: '90%', padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: 2, textAlign:'center' }}>Edit Profile</Typography>

          {success && <div className='success-message'>{success}</div>}
          {error && <div className='error-message'>{error}</div>}

          {/* Custom Styled File Input */}
          <label htmlFor="file-input" style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <Button component="span" sx={{ color: 'black', width: '100%' }} className="file-upload">
              <Image /> {imageFile ? "Change Profile Image" : "Choose Profile Image"}
            </Button>
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Display Image Preview */}
          {imagePreview && (
            <Box sx={{ marginTop: 2 }}>
              <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '40vh', borderRadius: '8px', marginTop: '10px' }} />
            </Box>
          )}

          <TextField
            fullWidth
            label="Aadhaar ID"
            name="aadhaarId"
            value={updatedPatient.aadhaarId || ""}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          <TextField
            fullWidth
            label="Alternate Mobile Number"
            name="alternateMobile"
            value={updatedPatient.alternateMobile || ""}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          <TextField
            fullWidth
            label="Nationality"
            name="nationality"
            value={updatedPatient.nationality || ""}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ marginRight: 1 }}>Save Changes</Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

PatientDetailsCard.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    mobile: PropTypes.number.isRequired,
    alternateMobile: PropTypes.number,
    email: PropTypes.string.isRequired,
    aadhaarId: PropTypes.number,
    nationality: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
  refreshProfileData: PropTypes.func.isRequired
};

export default PatientDetailsCard;
