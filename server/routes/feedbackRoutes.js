import express from 'express';
import Feedback from '../models/Feedback.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("Feedback received:", req.body);
  try {
    // Ab hum req.body se direct data le rahe hain, 
    // isse aapke naye fields (fullName, email, phone, rating) sab save ho jayenge
    const newFeedback = new Feedback(req.body);
    
    await newFeedback.save();
    
    res.status(201).json({ 
      message: "Feedback saved successfully!",
      data: newFeedback 
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});


router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch feedback" });
  }
});

export default router;