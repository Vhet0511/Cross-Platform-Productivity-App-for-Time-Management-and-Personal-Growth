const Sticky = require('../models/sticky.model');

// CREATE
exports.createSticky = async (req, res) => {
  try {
    const sticky = new Sticky(req.body);
    await sticky.save();
    res.status(201).json(sticky);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllStickies = async (req, res) => {
  try {
    const stickies = await Sticky.find().populate("userId", "name email");
    res.status(200).json(stickies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getStickyById = async (req, res) => {
  try {
    const sticky = await Sticky.findById(req.params.id).populate("userId", "name");
    if (!sticky) return res.status(404).json({ error: "Sticky note not found" });
    res.status(200).json(sticky);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSticky = async (req, res) => {
  try {
    const sticky = await Sticky.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sticky) return res.status(404).json({ error: "Sticky note not found" });
    res.status(200).json(sticky);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteSticky = async (req, res) => {
  try {
    const sticky = await Sticky.findByIdAndDelete(req.params.id);
    if (!sticky) return res.status(404).json({ error: "Sticky note not found" });
    res.status(200).json({ message: "Sticky note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all stickies by userId
exports.getStickiesByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const stickies = await Sticky.find({ userId }).populate("userId", "name email");
      res.status(200).json(stickies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  