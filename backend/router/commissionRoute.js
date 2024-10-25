import express from 'express';
import { isAuthenticated, isAuthorised } from '../middleware/auth.js';
import { proofOfCommission } from '../controllers/commissionController.js';

const commissionRouter = express.Router();

commissionRouter.post(
  '/proof',
  isAuthenticated,
  isAuthorised('Auctioneer'),
  proofOfCommission
);

export default commissionRouter;
