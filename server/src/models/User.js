import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['USER', 'STAFF', 'INVENTORY_MANAGER', 'DELIVERY', 'MANUFACTURER', 'ADMIN'],
      default: 'USER',
    },
    points: { type: Number, default: 0 },
    phone: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const User = mongoose.model('User', userSchema);