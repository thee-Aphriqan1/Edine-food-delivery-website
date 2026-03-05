import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Cart.model.ts — A customer's active shopping basket.
// Only one cart per customer at a time (enforced by unique index).
// Items from the same restaurant are grouped together.
// When an order is placed the cart is cleared.
// -------------------------------------------------------------

interface ICartItem {
  menuItem: mongoose.Types.ObjectId;  // references MenuItem
  name: string;                       // snapshot — name at time of adding
  price: number;                      // snapshot — price at time of adding
  quantity: number;
}

export interface ICart extends Document {
  customer: mongoose.Types.ObjectId;  // references User
  restaurant: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false } // sub-documents don't need their own id
);

const CartSchema = new Schema<ICart>(
  {
    customer:    { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    restaurant:  { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items:       [CartItemSchema],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', CartSchema);

