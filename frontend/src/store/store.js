import { configureStore } from '@reduxjs/toolkit';
// Reducers
import userReducer from './slices/userSlice';
import CommissionReducer from './slices/CommissionSlice';
import AuctionReducer from './slices/AuctionSlice';
import bidReducer from './slices/bidSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    commission: CommissionReducer,
    auction: AuctionReducer,
    bid: bidReducer,
  },
});
