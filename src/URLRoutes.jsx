import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import ServicesPage from "./Pages/ServicesPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./Pages/Contact";
import Logout  from "./Components/Logout";
import CustomRoutes from "./Patient/CustomRoutes";
import SearchPage from "./Components/SearchPage";
import AnalyticsDashboard from "./Components/AnalyticsDashboard";
import HospitalListPage from "./Pages/HospitalListPage";

function URLRoutes() {
    return (
        <div className="App">
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
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default URLRoutes;
