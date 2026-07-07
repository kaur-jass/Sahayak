import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Link yaha add kiya hai

// Import your pages
import LandingPage from "./pages/LandingPage";
import ReportPage from "./pages/ReportPage";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerRegister from "./pages/VolunteerRegister";
import VolunteerLogin from "./pages/VolunteerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import Chatbot from "./pages/Chatbot";
import FeedbackForm from "./pages/FeedbackForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050816]">
        
        {/* Floating Feedback Button (Bottom-Left) */}
        <Link 
          to="/feedback" 
          className="fixed bottom-6 left-6 z-[9999] w-16 h-16 rounded-full bg-orange-500 text-white shadow-xl hover:scale-110 transition flex items-center justify-center border border-blue-500/40"
          title="Give Feedback"
        >
          <span className="text-xl">📝</span>
        </Link>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/admin" element={ <AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute> } />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/volunteer/register" element={<VolunteerRegister />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          <Route 
            path="*" 
            element={
              <div className="flex items-center justify-center h-screen text-white">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            } 
          />
        </Routes>
        
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;