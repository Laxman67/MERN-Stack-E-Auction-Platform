import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      minLength: [3, 'Username must contain atleast 3 Characters'],
      maxLength: [40, 'Username cannot exceed 40 Characters'],
    },
    password: {
      type: String,
      selected: false,
      minLength: [8, 'Password must contain atleast 8 Characters'],
      maxLength: [32, 'Password cannot exceed 32 Characters'],
    },
    email: String,
    phone: String,
    phone: {
      type: String,
      minLength: [10, 'Phone number must contain atleast 8 Characters'],
      maxLength: [10, 'Phone number cannot exceed 10 Characters'],
    },
    profileImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    paymentsMethods: {
      bankTransfer: {
        bankAccountNumber: String,
        bankAccountName: String,
        bankName: String,
      },
      easypaisa: {
        easypaisaAccountNumber: Number,
      },
      paypal: {
        paypalEmail: String,
      },
    },
    role: {
      type: String,
      enum: ['Auctioneer', 'Bidder', 'Super Admin'],
    },
    unpaidCommission: {
      type: Number,
      default: 0,
    },
    auctionsWon: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
  },
  { stamp: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = model('User', userSchema);

export default User;
