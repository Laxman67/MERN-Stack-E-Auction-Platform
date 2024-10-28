import mongoose, { trusted } from 'mongoose';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import Commission from '../model/commissionSchema.js';
import User from '../model/userSchema.js';
import PaymentProof from '../model/commissionProofSchema.js';
import Auction from '../model/auctionSchema.js';
import { v2 as cloudinary } from 'cloudinary';

export const deleteAuctionItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler('Invalid Id Format', 400));
  }

  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler('Auction not Found !', 400));
  }

  // TODO

  try {
    await cloudinary.uploader.destroy(auctionItem.image.public_id); // Uses image's public_id for deletion
  } catch (error) {
    console.error('Error deleting image:', error); // Logs the error if something goes wrong
  }

  await auctionItem.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Auction Item Deleted Successfully',
  });
});

export const getAllPaymentProof = catchAsyncErrors(async (req, res, next) => {
  let paymentProofs = await PaymentProof.find();
  res.status(200).json({
    success: true,
    paymentProofs,
  });
});

export const getPaymentProofDetail = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler('Invalid Id', 400));
    }

    const paymentProofDetail = await PaymentProof.findById(id);

    if (!paymentProofDetail) {
      return next(new ErrorHandler('details not found', 400));
    }
    res.status(200).json({
      success: true,
      paymentProofDetail,
    });
  }
);

export const updateProofStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler('Invalid Id Format', 400));
  }

  const { amount, status } = req.body;
  let proof = await PaymentProof.findById(id);

  if (!proof) {
    return next(new ErrorHandler('Payment proof not found', 400));
  }

  proof = await PaymentProof.findByIdAndUpdate(
    id,
    { status, amount },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  proof.save();

  res.status(200).json({
    success: true,
    message: 'Payment Proof Amount and Status Upadted',
    proof,
  });
});

export const deletePaymentProof = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const proof = await PaymentProof.findById(id);
  if (!proof) {
    return next(new ErrorHandler('Payment proof not found', 400));
  }

  await proof.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Payment proof deleted',
  });
});

export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $month: '$createdAt' },
          role: '$role',
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: '$_id.month',
        year: '$_id.year',
        role: '$_id.role',
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);

  const bidders = users.filter((user) => user.role == 'Bidder');
  const auctioneers = users.filter((user) => user.role == 'Auctioneer');

  const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    data.forEach((item) => {
      result[item.month - 1] = item.count;
    });

    return result;
  };

  const biddersArray = tranformDataToMonthlyArray(bidders);
  const auctioneersArray = tranformDataToMonthlyArray(auctioneers);

  res.status(200).json({
    success: true,
    biddersArray,
    auctioneersArray,
  });
});

export const montlyRevenue = catchAsyncErrors(async (Req, res, next) => {
  const payments = await Commission.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: '$createdAt',
          },
          year: {
            $year: '$createdAt',
          },
        },
        // Adding amount to totalAmountVariable
        totalAmount: { $sum: '$amount' },
      },
    },
    // Now Sorting based on month and year in ascending order
    /**
     *
     * _id:{
     * month:'',
     * year:''
     * }
     *
     */
    { $sort: { '_id.month': 1, '_id.year': 1 } },
  ]);

  const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.total;
    });

    return result;
  };

  const totalMontlyRevenue = tranformDataToMonthlyArray(payments);
  res.status(200).json({
    success: true,
    totalMontlyRevenue,
  });
});
