import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Order.model.ts — A confirmed purchase by a customer.
// Status lifecycle:
//   pending → confirmed → preparing → out_for_delivery → delivered
//   Any stage can be cancelled.
// -------------------------------------------------------------

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

interface IOrderItem {
  menuItem: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  customer: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  courier?: mongoose.Types.ObjectId;   // assigned after 'confirmed'
  items: IOrderItem[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  estimatedDeliveryTime?: Date;
  deliveredAt?: Date;
  notes?: string;                      // special instructions from customer
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customer:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant:      { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    courier:         { type: Schema.Types.ObjectId, ref: 'User' },
    items:           [OrderItemSchema],
    totalAmount:     { type: Number, required: true },
    deliveryAddress: {
      street:      { type: String, required: true },
      city:        { type: String, required: true },
      coordinates: { lat: Number, lng: Number },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    estimatedDeliveryTime: Date,
    deliveredAt: Date,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);

