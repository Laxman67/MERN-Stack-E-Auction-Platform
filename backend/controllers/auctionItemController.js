import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import Auction from '../model/auctionSchema.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import cloudinary from 'cloudinary';
import mongoose, { ObjectId } from 'mongoose';

export const addAuctionItem = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Auction Item Image Required.', 400));
  }

  const { image } = req.files;

  const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler('File format not supported.', 400));
  }

  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !condition ||
    !startingBid ||
    !startTime ||
    !endTime
  ) {
    return next(new ErrorHandler('Please fill full form', 400));
  }

  if (new Date(startTime) < Date.now()) {
    return next(
      new ErrorHandler(
        'Auction StartTime must be greater then preset Time',
        400
      )
    );
  }

  const alreadyOneAuctionActive = await Auction.find({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });

  //Both are working
  // console.log(req.user.id);
  // console.log(req.user._id);

  if (alreadyOneAuctionActive.length > 0) {
    return next(
      new ErrorHandler(
        'Cannout Create!, Your already have One Active auction ',
        400
      )
    );
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: 'MERN_AUCTION_PLATFORM_AUCTIONS',
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        'Cloudinary error:',
        cloudinaryResponse.error || 'Unknown cloudinary error.'
      );
      return next(
        new ErrorHandler('Failed to upload auction image to cloudinary.', 500)
      );
    }

    const auctionItem = await Auction.create({
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: `Auction item is created and will be listed on auction page at ${startTime}`,
      auctionItem,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message || 'Failed to create  auction Item .', 500)
    );
  }
});

export const getAllItems = catchAsyncErrors(async (req, res, next) => {
  let items = await Auction.find();

  res.status(200).json({
    success: true,
    items,
  });
});
export const getAuctionDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler('Invalid Id Format', 400));
  }

  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler('Auction not Found !', 400));
  }
  const bidders = auctionItem.bids.sort((a, b) => b.bid - a.bid);

  res.status(200).json({
    success: true,
    auctionItem,
    bidders,
  });
});
export const getMyAuctionItems = catchAsyncErrors(async (req, res, next) => {});
export const removeFromAuction = catchAsyncErrors(async (req, res, next) => {});
export const republishItem = catchAsyncErrors(async (req, res, next) => {});
