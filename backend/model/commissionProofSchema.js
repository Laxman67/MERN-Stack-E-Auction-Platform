import mongoose, { Schema, model } from 'mongoose';

const commissionProofSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  proof: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected', 'Settled'],
  },
  amount: {
    type: Number,
  },
  comment: String,
});

const PaymentProof = model('PaymentProof', commissionProofSchema);
export default PaymentProof;
