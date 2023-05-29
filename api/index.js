import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to mongodb');
  } catch (error) {
    handleError(error);
  }
};

// middlewares
app.use('/auth', authRoute);

app.listen(4000, () => {
  connect();
  console.log('connect to backend...');
});
