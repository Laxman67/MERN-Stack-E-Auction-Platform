import mongoose, { model, Schema } from 'mongoose';
const commissionSchema = new Schema(
  {
    amount: Number,
    user: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export const Commission = model('Commission', commissionSchema);
export default Commission;
