const mongoose = require("mongoose");

require("dotenv").config();

// Shape of our user
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
    unique: true,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 1024 }, // We're gonna hash it later 
  privilege: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 1024 }, // We're gonna hash it later 
});

// Class user that uses schema and name of collection
const User = mongoose.model("User", userSchema);

// Export it to any other file
exports.User = User;
