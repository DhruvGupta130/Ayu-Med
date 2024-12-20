import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Auth.css"; // Assuming styles are in Auth.css
import { URL } from "../Api/Api";

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_PATIENT", 
    firstName: "",
    lastName: "",
    gender: "", 
    email: "",
    mobile: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // if(formData.password.length<8){
    //   setError("Password must be minimum 8 characters!");
    // }
    if(formData.mobile.length!==10){
      setError("Invalid Mobile Number!");
      return;
    }
    
    const userData = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      mobile: formData.mobile,
      department: formData.department,
      // Additional fields based on role
      specialty: formData.specialty,
      licenseNumber: formData.licenseNumber,
      hospitalId: formData.hospitalId,
      dateOfBirth: formData.dateOfBirth,
    };
    
    try {
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setError(data.message || "Registration failed.");
      } else {
        setSuccessMessage("User registered successfully.");
        setTimeout(() => navigate("/login"), 2000); 
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          <span>Register</span>
        </h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div className="input-field">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="ROLE_PATIENT">Patient</option>
              <option value="ROLE_MANAGEMENT">Hospital Manager</option>
              <option value="ROLE_PHARMACIST">Pharmacist</option>
            </select>
          </div>

          {/* Username Field */}
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="input-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* First Name Field */}
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender Field */}
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Email Field */}
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Field */}
          <div className="input-field">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Conditional Fields for Patient */}
          {formData.role === "ROLE_PATIENT" && (
            <div className="input-field">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="auth-btn">Register</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/Login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
