import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data when component mounts
    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("role");

    // Redirect to login page after a short delay to show the loader
    setTimeout(() => {
      navigate("/login");
    }, 500); // Adjust the timeout as needed for the spinner visibility
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      bgcolor="#f4f4f4"
    >
      <CircularProgress size={60} color="primary" /> {/* MUI CircularProgress */}
      <Typography variant="h6" mt={2}>
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;
