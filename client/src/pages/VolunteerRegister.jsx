import { useState } from "react";
import { Heart, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const skillOptions = [
  "Medical",
  "First Aid",
  "Food Distribution",
  "Shelter Setup",
  "Transportation",
  "Communication",
  "Counseling",
  "Search & Rescue",
];

export default function VolunteerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    skills: [],
    availability: "available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // ✅ SIMPLE REGISTER (NO BACKEND)
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
      <div className="w-full max-w-2xl mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF8A00]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF8A00]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="text-[#FF8A00]" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Join as a Volunteer
          </h1>
          <p className="text-gray-400">
            Help your community in times of need
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1433]/60 border border-[#1a2048] rounded-2xl p-8 space-y-6"
        >

          {/* Name */}
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-[#1a2048] rounded-xl text-white"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-[#1a2048] rounded-xl text-white"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-4 py-3 bg-[#1a2048] rounded-xl text-white"
          />

          {/* Skills */}
          <div>
            <p className="text-gray-300 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-xl ${
                    formData.skills.includes(skill)
                      ? "bg-[#FF8A00] text-white"
                      : "bg-[#1a2048] text-gray-400"
                  }`}
                >
                  {formData.skills.includes(skill) && (
                    <CheckCircle2 size={14} className="inline mr-1" />
                  )}
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, availability: "available" })
              }
              className={`flex-1 py-3 rounded-xl ${
                formData.availability === "available"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[#1a2048]"
              }`}
            >
              Available
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, availability: "not_available" })
              }
              className={`flex-1 py-3 rounded-xl ${
                formData.availability === "not_available"
                  ? "bg-gray-500/20 text-gray-400"
                  : "bg-[#1a2048]"
              }`}
            >
              Not Available
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#FF8A00] py-4 rounded-xl font-semibold"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already registered?{" "}
            <Link to="/volunteer/login" className="text-[#FF8A00]">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}