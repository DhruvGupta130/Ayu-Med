import { CloseRounded, FilePresent, CloudUpload } from '@mui/icons-material';
import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { patientURL } from "../Api/Api";
import PropTypes from 'prop-types';

const DocumentUpload = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    if (!description.trim()) {
      alert('Please add a description for the document.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${patientURL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Document uploaded successfully!");
        setFile(null); 
        setDescription("");
        document.getElementById("file-upload").value = "";
        setTimeout(() => setMessage(""), 2000);
        setTimeout(() => onClose(), 2100);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Error uploading file!");
        setTimeout(() => setError(""), 3000); 
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file!");
      setTimeout(() => setError(""), 3000); 
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-header">
        <h2 className="upload-heading">Upload Documents</h2>
        <Button className="close-button" sx={{color:'black'}} onClick={onClose}>
          <CloseRounded sx={{ height: 25, width: 25 }} />
        </Button>
      </div>
      <div className="upload-info">
        {error && (
          <Alert sx={{ display: "flex", justifyContent: "center", fontSize: "medium" }} severity="error">
            {error}
          </Alert>
        )}
        {message && (
          <Alert sx={{ display: "flex", justifyContent: "center", fontSize: "medium" }} severity="success">
            {message}
          </Alert>
        )}
      </div>
      <div className="upload-section">
        <input type="file" id="file-upload" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="file-upload">
          <FilePresent className="icon" sx={{ height: 40, width: 40 }} />
          {file ? <span>Selected: {file.name}</span> : 'Choose a File'}
        </label>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Button variant="contained"  startIcon={<CloudUpload />} onClick={handleUpload} disabled={!file || !description.trim()}>
          Upload
        </Button>
      </div>
    </div>
  );
};

DocumentUpload.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default DocumentUpload;
