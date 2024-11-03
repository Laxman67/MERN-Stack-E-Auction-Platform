import catchAsyncErrors from './catchAsyncErrors.js';
import User from '../model/userSchema.js';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from './errorHandler.js';

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler('User Not Authenticated', 400));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

export const isAuthorised = (...roles) => {
  // Returning Function
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to  access  this  resource`,
          403
        )
      );
    }
    next();
  };
};
