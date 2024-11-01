import mongoose from 'mongoose';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import Auction from '../model/auctionSchema.js';
import PaymentProof from '../model/commissionProofSchema.js';
import User from '../model/userSchema.js';
import { v2 as cloudinary } from 'cloudinary';

export const calculateCommision = catchAsyncErrors(async (auctionId) => {
  const auction = await Auction.findById(auctionId);
  if (!mongoose.Types.ObjectId.isValid(auctionId)) {
    return next(new ErrorHandler('Invalid Auction Id', 400));
  }
  const commisionRate = 0.05;
  const commission = auction.currentBid * commisionRate;
  return commission;
});
export const proofOfCommission = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Payment Proof Image Required', 400));
  }

  const { proof } = req.files;
  const { amount, comment } = req.body;
  const user = await User.findById(req.user.id);

  if (!amount || !comment) {
    return next(new ErrorHandler('Amount and Comment are required field', 400));
  }

  if (user.unpaidCommission === 0) {
    return res.status(200).json({
      success: true,
      message: 'You dont have unpaid commission peding',
    });
  }

  if (user.unpaidCommission < amount) {
    return next(
      new ErrorHandler(
        `The amount exceeds your unpaid commission balance, Please enter an amount upto ${user.unpaidCommission}`
      )
    );
  }

  const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedFormats.includes(proof.mimetype)) {
    return next(new ErrorHandler('Screenshot format not supported.', 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    proof.tempFilePath,
    {
      folder: 'MERN_AUCTION_PLATFORM_PAYMENTPROOFS',
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      'Cloudinary error:',
      cloudinaryResponse.error || 'Unknown cloudinary error.'
    );
    return next(
      new ErrorHandler('Failed to upload payment proof to cloudinary.', 500)
    );
  }

  const commissionProof = await PaymentProof.create({
    userId: req.user.id,
    proof: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    comment,
    amount,
  });

  res.status(201).json({
    success: true,
    message:
      'Your payment proof has been submitted successfully, we will review it and respond it to you within 24 hours',
    commissionProof,
  });
});
