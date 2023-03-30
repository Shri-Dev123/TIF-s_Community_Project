//User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 128
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64
  },
  roles: {
    type: String,
    enum: ['user', 'admin', 'superAdmin','communityAdmin','communityMember'], // you can add or remove roles as per your requirement
    default: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
