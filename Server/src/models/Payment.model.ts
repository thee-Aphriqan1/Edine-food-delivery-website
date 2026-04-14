import mongoose, { Schema, Document } from 'mongoose';

// -------------------------------------------------------------
// Payment.model.ts — Records every payment transaction.
// One payment per order. Stores M-PESA transaction details
// so we can reconcile payments and handle refunds.
// -------------------------------------------------------------

export interface IPayment extends Document {
  order: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  amount: number;                      // in KES
  method: 'mpesa' | 'card' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';

  // M-PESA specific fields (populated from Daraja callback)
  mpesa?: {
    checkoutRequestId: string;         // from STK Push initiation
    merchantRequestId: string;
    mpesaReceiptNumber?: string;       // from callback on success
    phoneNumber: string;               // number that was charged
    transactionDate?: string;
  };
}

const PaymentSchema = new Schema<IPayment>(
  {
    order:    { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount:   { type: Number, required: true },
    method: {
      type: String,
      enum: ['mpesa', 'card', 'cash'],
      default: 'mpesa',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    mpesa: {
      checkoutRequestId:  String,
      merchantRequestId:  String,
      mpesaReceiptNumber: String,
      phoneNumber:        String,
      transactionDate:    String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>('Payment', PaymentSchema);

