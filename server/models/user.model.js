const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure to import this

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required."]
  },
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required."]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ⚠️ Handle duplicate email error
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists. Please use a different one.'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
