import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Restaurant.model.ts — A restaurant onboarded onto the platform.
// Each restaurant is owned by a User with role 'restaurant_owner'.
// Admin approves restaurants before they go live (isApproved).
// -------------------------------------------------------------

export interface IRestaurant extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;   // references User
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  cuisineTypes: string[];           // e.g. ['Pizza', 'Burgers']
  openingHours: {
    open: string;                   // e.g. '08:00'
    close: string;                  // e.g. '22:00'
  };
  isApproved: boolean;              // Admin must approve before going live
  isActive: boolean;                // Owner can toggle open/closed
  rating: number;
  totalRatings: number;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name:        { type: String, required: true, trim: true },
    owner:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    phone:       { type: String, required: true },
    email:       { type: String, required: true },
    address: {
      street:      { type: String, required: true },
      city:        { type: String, required: true },
      coordinates: { lat: Number, lng: Number },
    },
    cuisineTypes: [{ type: String }],
    openingHours: {
      open:  { type: String, default: '08:00' },
      close: { type: String, default: '22:00' },
    },
    isApproved: { type: Boolean, default: false }, // starts unapproved
    isActive:   { type: Boolean, default: true },
    rating:       { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

