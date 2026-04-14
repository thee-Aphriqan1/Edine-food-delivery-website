import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// -------------------------------------------------------------
// User.model.ts — Represents every person using the platform.
// Roles determine what they can access:
//   customer        → browse, order, pay
//   restaurant_owner → manage their restaurant & menu
//   courier          → accept and deliver orders
//   admin            → full platform access
// -------------------------------------------------------------

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'customer' | 'restaurant_owner' | 'courier' | 'admin';
  address: {
    street?: string;
    city?: string;
    coordinates?: { lat: number; lng: number };
  };
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone:    { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'restaurant_owner', 'courier', 'admin'],
      default: 'customer',
    },
    address: {
      street: String,
      city: String,
      coordinates: { lat: Number, lng: Number },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Hash password before saving (only when it changes)
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Helper to verify a plain password against the stored hash
UserSchema.methods['comparePassword'] = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);

