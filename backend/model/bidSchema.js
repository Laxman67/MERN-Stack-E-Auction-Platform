import { model, Schema, ObjectId } from 'mongoose';

const bidSchema = new Schema({
  amount: Number,
  bidder: {
    id: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    userName: String,
    profileImage: String,
  },
  auctionItem: {
    type: ObjectId,
    ref: 'Auction',
    required: true,
  },
});

const Bid = model('Bid', bidSchema);
export default Bid;
