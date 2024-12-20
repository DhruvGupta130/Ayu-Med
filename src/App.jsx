import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SearchPage from "./Components/SearchPage.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Legal from "./Pages/Legal.jsx";
import Appointment from "./Pages/Appointment.jsx";
import ServicesPage from "./Pages/ServicesPage.jsx";
import AnalyticsDashboard from "./Components/AnalyticsDashboard.jsx";
import HospitalListPage from "./Pages/HospitalListPage.jsx";
import Contact from "./Pages/Contact.jsx";
import CustomRoutes from "./Patient/CustomRoutes.jsx";
import Logout from "./Components/Logout.jsx";
import NotFound from "./Pages/NotFound.jsx";
import CustomRoutesManager from "./Manager/CustomRoutesManager.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/dashboard" element={<AnalyticsDashboard />} />
                <Route path="nearby-hospitals" element={<HospitalListPage/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/patient/*" element={<CustomRoutes/>} />
                <Route path="/hospital/*" element={<CustomRoutesManager/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
