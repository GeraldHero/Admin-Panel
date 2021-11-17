// For test purpose only. main nodejs server.js
import express from 'express';
import mongoose from 'mongoose';
import Employees from './routes/employees.js';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI_LOCAL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to database');
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
connectDB();

const app = express();

app.use(express.json());
