const mongoose = require('mongoose');

const eventPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required.']
  },
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required.']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required.']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventPlan', eventPlanSchema);
