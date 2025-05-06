const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: [true, "Start time is required"]
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"]
  }
});

const stickySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User ID is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: String,
  tags: [String],
  reminders: [reminderSchema],
  mark: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model('Sticky', stickySchema);
