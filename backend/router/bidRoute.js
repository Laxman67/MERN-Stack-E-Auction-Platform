import express from 'express';
import { isAuthenticated, isAuthorised } from '../middleware/auth.js';
import { placeBid } from '../controllers/bidController.js';

const bidRouter = express.Router();

bidRouter.post('/place/:id', isAuthenticated, isAuthorised('Bidder'), placeBid);

export default bidRouter;
