const EventPlan = require('../models/eventPlan.model');

// Create
exports.createEvent = async (req, res) => {
  try {
    const event = new EventPlan(req.body);
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventPlan.find().populate('userId');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Events by User ID
exports.getEventsByUser = async (req, res) => {
  try {
    const events = await EventPlan.find({ userId: req.params.userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get One
exports.getEventById = async (req, res) => {
  try {
    const event = await EventPlan.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
exports.updateEvent = async (req, res) => {
  try {
    const event = await EventPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteEvent = async (req, res) => {
  try {
    const event = await EventPlan.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEventsByUserAndDate = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ error: 'Both userId and date are required.' });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await EventPlan.find({
      userId,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    }).select("-__v");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

