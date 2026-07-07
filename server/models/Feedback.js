import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },

  feedback: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "General",
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Feedback", feedbackSchema);