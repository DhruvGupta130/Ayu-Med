import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { URL } from '../Api/Api'; // Assuming you have a central API URL
import { CircularProgress, Box } from '@mui/material'; // Import CircularProgress from MUI

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      const role = localStorage.getItem('role');
      if(role === 'ROLE_PATIENT')
        navigate('/patient/profile');
      else if(role === 'ROLE_DOCTOR')
        navigate("/doctor/profile");
      else if(role === 'ROLE_MANAGEMENT')
        navigate("/hospital/profile");
      else if(role === 'ROLE_PHARMACIST')
        navigate("/pharmacy/profile");
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
      if (error) {
        const errorTimeout = setTimeout(() => {
          setError('');
        }, 2000);
        return () => clearTimeout(errorTimeout);
      }
    }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Please fill in all fields!');
      return;
    }

    // Show loader
    setLoading(true);

    try {
      setTimeout(async () => {
        try {
          const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('role', data.role);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Invalid credentials. Please try again.');
          }
        } catch (err) {
          console.log(err);
          setError('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 500); 
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          <span>Login</span>
        </h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>
        )}

        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link to="/Register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
