import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Send,
  User,
  Mail,
  Phone,
  X,
} from "lucide-react";

export default function FeedbackForm({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    rating: 0,
    feedback: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const API_URL = import.meta.env.VITE_API_URL || "https://sahayak-backend-tk6h.onrender.com";

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          category: "General",
          timestamp: new Date(),
        }),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          rating: 0,
          feedback: "",
        });

        if (onClose) {
          onClose();
        }
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-[#2D2319] bg-[#0E1425]/95 backdrop-blur-xl p-5 sm:p-7 shadow-2xl max-h-[75vh] sm: max-h-[90vh] overflow-y-auto custom-scrollbar">

      {/* Close Button */}
      <button
        onClick={onClose}
        type="button"
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#131B31] hover:bg-orange-500 transition flex items-center justify-center z-10"
        aria-label="Close form"
      >
        <X className="text-white" size={14} />
      </button>

      {/* Header */}
      <div className="text-center mb-5 mt-2 sm:mt-0">
        <div className="w-12 h-12 rounded-xl bg-[#2D1B10] flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="text-orange-500 w-5 h-5" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Citizen Feedback
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm mt-1 px-2">
          Help us improve emergency response services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name + Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-xs mb-1.5 block font-medium">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
                placeholder="Enter your name"
                className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-xs mb-1.5 block font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="example@email.com"
                className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-gray-300 text-xs mb-1.5 block font-medium">
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="text-gray-300 text-xs mb-2 block font-medium">
            Rate your experience
          </label>
          <div className="flex gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    rating: item,
                  })
                }
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center ${
                  formData.rating >= item
                    ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-500/10"
                    : "bg-[#131B31] border-[#25335D] hover:bg-orange-500/10 hover:border-orange-500/40"
                }`}
              >
                <Star
                  className={`w-4 h-4 transition-colors ${
                    formData.rating >= item ? "text-white" : "text-orange-400"
                  }`}
                  fill={formData.rating >= item ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="text-gray-300 text-xs mb-1.5 block font-medium">
            Feedback
          </label>
          <textarea
            rows="3"
            required
            value={formData.feedback}
            onChange={(e) =>
              setFormData({
                ...formData,
                feedback: e.target.value,
              })
            }
            placeholder="Share your experience..."
            className="w-full bg-[#131B31] border border-[#25335D] rounded-xl p-3 text-xs sm:text-sm text-white outline-none resize-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 sm:py-3 mt-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed opacity-70"
              : "bg-orange-500 hover:bg-orange-600 active:scale-[0.995]"
          } text-white shadow-lg shadow-orange-500/10`}
        >
          <span className="text-xs sm:text-sm">
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </span>
          <Send size={14} className={isSubmitting ? "animate-pulse" : ""} />
        </button>

      </form>
    </div>
  );
}