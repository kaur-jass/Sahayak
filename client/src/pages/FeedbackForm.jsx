import React, { useState } from "react";
import { MessageSquare, Star, Send, User, Mail, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    rating: 0,
    feedback: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const API_URL = "http://localhost:5000";

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: "General", 
          timestamp: new Date()
        })
      });

      if (response.ok) {
        alert("Feedback submitted successfully to the coordinator!");
        navigate("/");
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
    <section className="min-h-screen bg-[#070B1B] flex items-center justify-center px-6 py-20 relative">
      
      {/* Back to Home Button - Changed to Orange Theme */}
      <Link 
        to="/" 
        className="fixed bottom-6 left-6 z-[9999] w-16 h-16 rounded-full bg-orange-500 text-white shadow-xl hover:scale-110 transition flex items-center justify-center border border-orange-400/40"
        title="Back to Home"
      >
        <span className="text-2xl">🏠</span>
      </Link>

      <div className="w-full max-w-4xl rounded-3xl border border-[#2D2319] bg-[#0E1425]/80 backdrop-blur-xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#2D1B10] flex items-center justify-center mx-auto mb-5">
            <MessageSquare className="text-orange-500 w-8 h-8"/>
          </div>
          <h1 className="text-4xl font-bold text-white">Citizen Feedback</h1>
          <p className="text-gray-400 mt-3">Help us improve emergency response services.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields ... (same structure) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-500 w-5 h-5"/>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-500 w-5 h-5"/>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-500 w-5 h-5"/>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-[#131B31] border border-[#25335D] rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-3 block">Rate your experience</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFormData({...formData, rating: item})}
                  className={`w-12 h-12 rounded-xl border transition ${formData.rating >= item ? 'bg-orange-500 border-orange-500' : 'bg-[#131B31] border-[#25335D] hover:bg-orange-500/20'}`}
                >
                  <Star className="mx-auto text-orange-400" fill={formData.rating >= item ? "currentColor" : "none"}/>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Feedback</label>
            <textarea
              rows="6"
              required
              placeholder="Share your experience..."
              className="w-full bg-[#131B31] border border-[#25335D] rounded-xl p-5 text-white outline-none resize-none focus:border-orange-500"
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
            />
          </div>

          <button
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl transition font-semibold flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
            <Send size={20}/>
          </button>
        </form>
      </div>
    </section>
  );
}