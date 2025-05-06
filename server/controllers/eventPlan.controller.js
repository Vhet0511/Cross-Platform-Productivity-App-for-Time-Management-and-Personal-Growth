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
