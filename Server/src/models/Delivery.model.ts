import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Delivery.model.ts — Tracks the courier dispatch for an order.
// Created when an order is confirmed and a courier is assigned.
// Tracks real-time courier location and delivery timestamps.
// -------------------------------------------------------------

export interface IDelivery extends Document {
  order: mongoose.Types.ObjectId;
  courier: mongoose.Types.ObjectId;   // references User (role: courier)
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  currentLocation?: {
    lat: number;
    lng: number;
    updatedAt: Date;
  };
  pickedUpAt?: Date;
  deliveredAt?: Date;
  notes?: string;                     // courier notes (e.g. 'customer not home')
}

const DeliverySchema = new Schema<IDelivery>(
  {
    order:   { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    courier: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['assigned', 'picked_up', 'in_transit', 'delivered', 'failed'],
      default: 'assigned',
    },
    currentLocation: {
      lat:       Number,
      lng:       Number,
      updatedAt: Date,
    },
    pickedUpAt:  Date,
    deliveredAt: Date,
    notes:       String,
  },
  { timestamps: true }
);

export default mongoose.model<IDelivery>('Delivery', DeliverySchema);

