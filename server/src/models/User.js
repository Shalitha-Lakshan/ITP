const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'worker', 'manufacturer', 'admin'], default: 'user', index: true },
    phone: { type: String },
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);