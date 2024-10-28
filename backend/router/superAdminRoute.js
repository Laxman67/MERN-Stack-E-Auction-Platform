import express from 'express';
import { isAuthenticated, isAuthorised } from '../middleware/auth.js';
import {
  deleteAuctionItem,
  deletePaymentProof,
  getAllPaymentProof,
  getPaymentProofDetail,
  updateProofStatus,
  fetchAllUsers,
  montlyRevenue,
} from '../controllers/superAdminController.js';

const superAdminRouter = express.Router();

superAdminRouter.delete(
  '/auctionitem/delete/:id',
  isAuthenticated,
  isAuthorised('Super Admin'),
  deleteAuctionItem
);

superAdminRouter.delete(
  '/paymentproof/delete/:id',
  isAuthenticated,
  isAuthorised('Super Admin'),
  deletePaymentProof
);

superAdminRouter.get(
  '/paymentproof/getall',
  isAuthenticated,
  isAuthorised('Super Admin'),
  getAllPaymentProof
);
superAdminRouter.get(
  '/paymentproof/:id',
  isAuthenticated,
  isAuthorised('Super Admin'),
  getPaymentProofDetail
);
superAdminRouter.put(
  '/paymentproof/status/update/:id',
  isAuthenticated,
  isAuthorised('Super Admin'),
  updateProofStatus
);

superAdminRouter.get(
  '/users/getall',
  isAuthenticated,
  isAuthorised('Super Admin'),
  fetchAllUsers
);
superAdminRouter.get(
  '/montlyincome',
  isAuthenticated,
  isAuthorised('Super Admin'),
  montlyRevenue
);

export default superAdminRouter;
