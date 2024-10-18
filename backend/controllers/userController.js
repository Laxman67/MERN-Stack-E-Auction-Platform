import { ErrorHandler } from '../middleware/errorHandler.js';
import User from '../model/userSchema.js';
import { v2 as cloudinary } from 'cloudinary';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Profile Image Required', 400));
  }

  const { profileImage } = req.files;

  const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];

  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler('Format Not Supported ', 400));
  }

  const {
    username,
    email,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    easypaisaAccountNumber,
    paypalEmail,
  } = req.body;

  // common for Each User
  if (!username || !email || !password || !phone || !address || !role) {
    return next(new ErrorHandler('Please Fill All Fields ', 400));
  }

  // Detail mandatory for Auctioneer User Role
  if (role === 'Auctioneer') {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      return next(new ErrorHandler('Please Provide Full Bank Details', 400));
    }
    if (!easypaisaAccountNumber) {
      return next(
        new ErrorHandler('Please Provide Easypaisa Account Number ', 400)
      );
    }
    if (!paypalEmail) {
      return next(new ErrorHandler('Please Provide Paypal Email   ', 400));
    }
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler('User Already Registered  ', 400));
  }

  // Cloudinary Upload

  try {
    const cloudinaryResponse = cloudinary.uploader.upload(
      profileImage.tempFilePath,
      { folder: 'MERN_AUCTION_PLATFORM_USERS' }
    );

    const user = await User.create({
      username,
      email,
      password,
      phone,
      address,
      role,
      profileImage: {
        public_id: (await cloudinaryResponse).public_id,
        url: (await cloudinaryResponse).secure_url,
      },

      paymentsMethods: {
        bankTransfer: {
          bankAccountNumber,
          bankAccountName,
          bankName,
        },
        easypaisa: {
          easypaisaAccountNumber,
        },
        paypal: {
          paypalEmail,
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'User Registered',
    });
  } catch (error) {
    console.log(
      `Clodinary Error ${error.message}` || 'Unknown Clodinary Error'
    );

    return next(
      new ErrorHandler(
        `Failed to Upload Profile Image to Clodinary` ||
          `Unknown Clodinary Error`,
        500
      )
    );
  }
});
