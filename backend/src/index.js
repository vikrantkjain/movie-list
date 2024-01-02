/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import Bootstrap from './app';

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 5000);
const bootstrap = new Bootstrap(app);
