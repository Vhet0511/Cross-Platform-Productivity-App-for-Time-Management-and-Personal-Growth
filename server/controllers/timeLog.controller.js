const TimeLog = require('../models/timeLog.model');

// Create
exports.createTimeLog = async (req, res) => {
  try {
    const log = new TimeLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
exports.getAllTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find().populate('userId', 'email name');
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Logs by User
exports.getLogsByUser = async (req, res) => {
  try {
    const logs = await TimeLog.find({ userId: req.params.userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get One
exports.getTimeLogById = async (req, res) => {
  try {
    const log = await TimeLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.status(200).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
exports.updateTimeLog = async (req, res) => {
  try {
    const log = await TimeLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.status(200).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteTimeLog = async (req, res) => {
  try {
    const log = await TimeLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLogsByUserAndDate = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ error: "Both 'userId' and 'date' query parameters are required." });
    }

    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const logs = await TimeLog.find({
      userId,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    }).select("-__v");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};