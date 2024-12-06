const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firebaseUid: { 
    type: String, 
    required: true, 
    unique: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

/* 
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
*/