import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function VolunteerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    // save locally
    localStorage.setItem("volunteer", JSON.stringify(formData));

    // go to dashboard
    navigate("/volunteer-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] to-[#0f1433] flex flex-col items-center justify-center p-6">

      {/* Back */}
      <div className="w-full max-w-md mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF8A00]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Volunteer Login
          </h1>
          <p className="text-gray-400">
            Access your dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1433]/60 border border-[#1a2048] rounded-2xl p-8 space-y-6"
        >

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 bg-[#1a2048] rounded-xl text-white"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FF8A00] py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            New volunteer?{" "}
            <Link to="/volunteer/register" className="text-[#FF8A00]">
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}