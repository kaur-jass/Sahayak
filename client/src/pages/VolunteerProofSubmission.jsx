import { useState } from "react";
import {
  Upload,
  MapPin,
  Send,
  CheckCircle2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios"; 

export default function VolunteerProofSubmission() {
  const { state } = useLocation(); // receive task from dashboard
  const task = state?.task;

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 BACKEND READY STRUCTURE
    const formData = new FormData();
    formData.append("taskId", task?.id);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // API CALL 
      // await axios.post("/api/proof/submit", formData);

      console.log("Sending:", {
        taskId: task?.id,
        description,
        image
      });

      setSubmitted(true);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center text-white">
        <div className="text-center">
          <CheckCircle2 size={60} className="text-orange-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">
            Submission Received!
          </h1>
          <p className="text-gray-400 mb-6">
            Waiting for verification
          </p>

          <Link
            to="/volunteer-dashboard"
            className="bg-orange-500 px-6 py-3 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">

      {/* Top */}
      <div className="bg-[#0f1433] p-4">
        <Link to="/volunteer-dashboard" className="text-gray-400">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-2">
          Submit Completion Proof
        </h1>

        {/* Task Info */}
        <div className="bg-[#0f1433] p-6 rounded-2xl mb-6">
          <h2 className="mb-4 font-semibold">Task Details</h2>

          <p><span className="text-gray-400">Task:</span> {task?.title}</p>
          <p><span className="text-gray-400">Category:</span> {task?.category}</p>

          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <MapPin size={16} />
            {task?.location}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#0f1433] p-6 rounded-2xl space-y-6">

          {/* Upload */}
          {!preview ? (
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer">
              <Upload size={40} className="text-gray-400 mb-2" />
              <p className="text-gray-400">Click to upload</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                required
              />
            </label>
          ) : (
            <img src={preview} className="rounded-xl" />
          )}

          {/* Description */}
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-[#1a2048] rounded-xl"
            placeholder="Explain what you did..."
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
}