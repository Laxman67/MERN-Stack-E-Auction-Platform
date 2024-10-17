import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
//
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { DBConnection } from './database/DBConnection.js';
const app = express();

// Config ENV
config({
  path: 'config/config.env',
});

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: [process.env.FRONTEND_UR],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
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

DBConnection();
export default app;
