import { configureStore } from '@reduxjs/toolkit';
// Reducers
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
