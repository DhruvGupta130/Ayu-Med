import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { fetchProfileData } from "../Patient/PatientProfile.jsx";
import { IMAGE_URL } from "../Api/Api.js";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [profile, setProfile] = useState('');
  const [patient, setPatient] = useState({
    image: "",
    fullName: "",
  });
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(()=>{
    if(isAuthenticated){
      const role = localStorage.getItem('role');
      if(role === 'ROLE_PATIENT')
        setProfile('/patient/profile');
      else if(role === 'ROLE_DOCTOR')
        setProfile("/doctor/profile");
      else if(role === 'ROLE_MANAGEMENT')
        setProfile("/hospital/profile");
      else if(role === 'ROLE_PHARMACIST')
        setProfile("/pharmacy/profile");
    }
  }, [isAuthenticated])

  useEffect(() => {
    setIsLoggedIn(isAuthenticated === "true");
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      fetchProfileData(setPatient, () => {}, () => {});
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const getAvatarText = (fullName) => {
    const names = fullName.split(" ");
    const firstLetter = names[0]?.charAt(0).toUpperCase();
    const lastLetter = names[names.length - 1]?.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    navigate(`/search?keyword=${searchTerm}`);
    setSearchTerm("");
    closeNavbar();
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  }

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Ayu<span className="navbar-sign">Med</span>
        </Link>
      </h1>

      {/* Desktop Navbar */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="navbar-links">
            Services
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="navbar-links">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-links">
            Contact us
          </Link>
        </li>
        <li>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
          </form>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to={profile} className="avatar-link">
              {patient.image ? (
                <img
                  src={`${IMAGE_URL}${patient.image}`}
                  alt={patient.fullName}
                  className="avatar-img"
                />
              ) : (
                <Avatar sx={{ bgcolor: red[700], width: 50, height: 50 }}>
                  {getAvatarText(patient.fullName)}
                </Avatar>
              )}
            </Link>
          ) : (
            <button onClick={handleLoginClick} className="navbar-btn">
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Mobile Navbar */}
      <div className={`mobile-navbar ${isNavbarOpen ? "open-nav" : ""}`}>
        <button onClick={toggleNavbar} className="mobile-navbar-options">
        {isNavbarOpen ?(<FontAwesomeIcon icon={faXmark} />):
          (<FontAwesomeIcon icon={faBars} />)}
        </button>
        <ul className="mobile-navbar-links">
        <li>
          {isLoggedIn ? (
            <Link to={profile} onClick={toggleNavbar} className="avatar-link">
              <div className="avatar">
              {patient.image ? (<img
                  src={`${IMAGE_URL}${patient.image}`}
                  alt={patient.fullName}
                  className="avatar-img"
                />
              ) : 
                  (<Avatar className='avatar-link' onClick={toggleNavbar} sx={{ bgcolor: red[700], width: 80, height: 80 } }>
                    {getAvatarText(patient.fullName)}
                  </Avatar>)}
              </div>
            </Link>
          ) : (
            <button onClick={handleLoginClick} className="navbar-btn">
              Login
            </button>
          )}
          </li>
          <li>
            <Link to="/" onClick={toggleNavbar}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleNavbar}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNavbar}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleNavbar}>
              Contact us
            </Link>
          </li>
          <li>
            {isLoggedIn ?(<Link to="/logout" onClick={toggleNavbar}>
              Logout
            </Link>):(
              <Link to="/login" onClick={toggleNavbar}>
              Login
            </Link>
            )
            }
          </li>
          <li>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;