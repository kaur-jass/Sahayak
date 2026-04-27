import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ReportPage from "./pages/ReportPage";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerRegister from "./pages/VolunteerRegister";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerProofSubmission from "./pages/VolunteerProofSubmission";
import VolunteerLogin from "./pages/VolunteerLogin";




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050816]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Volunteer */}
          <Route path="/volunteer/register" element={<VolunteerRegister />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer-proof-submission" element={<VolunteerProofSubmission />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route
            path="*"
            element={<h1 className="text-white text-center mt-20">404</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;