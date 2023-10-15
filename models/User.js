const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  avatarImage: {
    type: String
  }
});

// Encrypt password before saving 
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password,8);
  }
  next();
});

// Generate JWT 
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;