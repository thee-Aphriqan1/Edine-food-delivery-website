import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Menu.model.ts — A single food item listed by a restaurant.
// Each item belongs to one restaurant and can be toggled
// available/unavailable without being deleted.
// -------------------------------------------------------------

export interface IMenuItem extends Document {
  restaurant: mongoose.Types.ObjectId;  // references Restaurant
  name: string;
  description: string;
  price: number;                         // in KES
  category: string;                      // e.g. 'Main Course', 'Drinks'
  imageUrl: string;
  isAvailable: boolean;
  preparationTime: number;               // estimated minutes
}

const MenuSchema = new Schema<IMenuItem>(
  {
    restaurant:      { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name:            { type: String, required: true, trim: true },
    description:     { type: String, required: true },
    price:           { type: Number, required: true, min: 0 },
    category:        { type: String, required: true },
    imageUrl:        { type: String, default: '' },
    isAvailable:     { type: Boolean, default: true },
    preparationTime: { type: Number, default: 15 },
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>('MenuItem', MenuSchema);

