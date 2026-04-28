const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ['free', 'starter', 'pro'], default: 'free' },
  wordsUsed: { type: Number, default: 0 },
  wordsLimit: { type: Number, default: 2000 },
  planExpiresAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
