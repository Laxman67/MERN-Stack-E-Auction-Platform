import {
  getProfile,
  login,
  logout,
  register,
  fetchLeaderboard,
} from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

import express from 'express';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', isAuthenticated, getProfile);
userRouter.get('/logout', isAuthenticated, logout);
userRouter.get('/leaderBoard', fetchLeaderboard);

export default userRouter;
