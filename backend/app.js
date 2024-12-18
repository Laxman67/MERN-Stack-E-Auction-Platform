import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

//
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { DBConnection } from './database/DBConnection.js';
import { errorMiddleware } from './middleware/errorHandler.js';
import userRouter from './router/userRoutes.js';
import auctionRouter from './router/auctionIteRoute.js';
import bidRouter from './router/bidRoute.js';
import commissionRouter from './router/commissionRoute.js';
import superAdminRouter from './router/superAdminRoute.js';

import { endedAuctionCron } from './automation/endedAuctionCron.js';
import { verifyCommissionCron } from './automation/verifyCommissionCron.js';

const app = express();

// Config ENV
config({
  path: 'config/config.env',
});

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Cookie-parser
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// await sendEmail({
//   recipent: 'xxxxxxx@gmail.com',
//   subject: 'Hello From Laxman',
//   text: 'ONLY TEXR>>>>',
// });

// Routes

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auctionitem', auctionRouter);
app.use('/api/v1/bid', bidRouter);
app.use('/api/v1/commission', commissionRouter);
app.use('/api/v1/superadmin', superAdminRouter);

endedAuctionCron();
verifyCommissionCron();

DBConnection();

// Error Hanlder Middleware
app.use(errorMiddleware);
export default app;
