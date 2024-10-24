import User from '../model/userSchema.js';
import catchAsyncErrors from './catchAsyncErrors.js';
import { ErrorHandler } from './errorHandler.js';

export const trackCommisionStatus = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.unpaidCommission > 0) {
    return next(
      new ErrorHandler(
        `You have unpaid commision , Please pay ${user.unpaidCommission}  before posting a new auction`
      )
    );
  }
  next();
});

export default trackCommisionStatus;
