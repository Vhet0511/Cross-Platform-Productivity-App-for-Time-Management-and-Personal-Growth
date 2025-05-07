const User = require('../models/user.model.js');

const bcrypt = require('bcryptjs'); 

// Create
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, dob } = req.body;
    const newUser = new User({ email, password, name, dob });
    await newUser.save()
    console.log(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read One
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Login
exports.loginUser = async (req, res) => {
    try {
      console.log(`Incoming Request: ${req.method} ${req.path}`);

      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid email or password" });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });
  
      // Remove password from response
      const { password: _, ...userData } = user.toObject(); 
      console.log(req.body);
      res.status(200).json(userData);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //get user by email
  exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email }).select("-password -__v");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //update user by email
  exports.updateUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const updates = req.body;
  
      const user = await User.findOneAndUpdate(
        { email },
        updates,
        { new: true, runValidators: true }
      ).select("-password -__v");
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  