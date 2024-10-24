import { ErrorHandler } from '../middleware/errorHandler.js';
import Bid from '../model/bidSchema.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import Auction from '../model/auctionSchema.js';
import User from '../model/userSchema.js';

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler('Auction Item not Found', 404));
  }

  const { amount } = req.body;
  if (!amount) {
    return next(new ErrorHandler('Please Place Your Bid ', 404));
  }

  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler('Bid amount must be higher than the current bid ', 404)
    );
  }
  if (amount <= auctionItem.startingBid) {
    return next(
      new ErrorHandler('Bid amount must be higher than the starting bid ', 404)
    );
  }

  try {
    // Checking that bid Collection have record of same user
    const existingBid = await Bid.findOne({
      'bidder.id': req.user._id,
      auctionItem: auctionItem._id,
    });

    // Checking that Auction have user record about the bid placed
    const exisitingBidInAuction = await auctionItem.bids.find(
      (bid) => bid.userId.toString() == req.user.id.toString()
    );

    if (existingBid && exisitingBidInAuction) {
      exisitingBidInAuction.amount = amount;
      existingBid.amount = amount;
      await exisitingBidInAuction.save({ suppressWarning: true });
      await existingBid.save({ suppressWarning: true });
      auctionItem.currentBid = amount;
    } else {
      const bidderDetail = await User.findById(req.user.id);

      const bid = await Bid.create({
        amount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });

      auctionItem.bids.push({
        userId: req.user.id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount,
      });
    }

    await auctionItem.save({ suppressWarning: true });

    res.status(201).json({
      success: true,
      message: 'Bid Placed!',
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || 'Failed to Placed Bid', 500));
  }
});
