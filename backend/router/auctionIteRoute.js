import {
  addAuctionItem,
  getAllItems,
  getAuctionDetails,
  removeFromAuction,
  republishItem,
} from '../controllers/auctionItemController.js';
import { isAuthenticated, isAuthorised } from '../middleware/auth.js';

import express from 'express';

const auctionRouter = express.Router();

auctionRouter.post(
  '/create',
  isAuthenticated,
  isAuthorised('Auctioneer'),
  addAuctionItem
);
auctionRouter.get('/allitems', getAllItems);
auctionRouter.get('/auction/:id', isAuthenticated, getAuctionDetails);
auctionRouter.delete(
  '/delete/:id',
  isAuthenticated,
  isAuthorised('Auctioneer'),
  removeFromAuction
);
auctionRouter.put(
  '/item/republush/:id',
  isAuthenticated,
  isAuthorised('Auctioneer'),
  republishItem
);

export default auctionRouter;
