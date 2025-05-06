const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
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
  startTime: {
    type: Date,
    required: [true, 'Start time is required.']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required.']
  },
  efficiency: {
    type: Number,
    min: [0, 'Efficiency cannot be less than 0'],
    max: [100, 'Efficiency cannot be more than 100'],
    required: [true, 'Efficiency score is required.']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TimeLog', timeLogSchema);
