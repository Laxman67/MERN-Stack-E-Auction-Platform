import express from 'express';
import { isAuthenticated, isAuthorised } from '../middleware/auth.js';
import { placeBid } from '../controllers/bidController.js';
import { checkAuctionEndTime } from '../middleware/checkAuctionEndTime.js';

const bidRouter = express.Router();

bidRouter.post(
  '/place/:id',
  isAuthenticated,
  isAuthorised('Bidder'),
  checkAuctionEndTime,
  placeBid
);

export default bidRouter;
