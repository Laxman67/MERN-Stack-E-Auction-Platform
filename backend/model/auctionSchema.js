import mongoose, { model, Schema, ObjectId } from 'mongoose';
const auctionSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    startingBid: Number,
    condition: {
      type: String,
      enum: ['New', 'Used'],
    },
    currentBid: {
      type: Number,
      default: 0,
    },
    startTime: String,
    endTime: String,
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    bids: [
      {
        userId: {
          type: ObjectId,
          ref: 'Bid',
        },
        userName: String,
        profileImage: String,
        amount: Number,
      },
    ],
    highestBidder: {
      type: ObjectId,
      ref: 'User',
    },
    commisionCalculated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Auction = model('Auction', auctionSchema);
export default Auction;
