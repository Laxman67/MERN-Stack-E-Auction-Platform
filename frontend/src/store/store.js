import { configureStore } from '@reduxjs/toolkit';
// Reducers
import userReducer from './slices/userSlice';
import CommissionReducer from './slices/CommissionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    commission: CommissionReducer,
  },
});
