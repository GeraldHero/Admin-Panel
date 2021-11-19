// For test purpose only.
import express from 'express';
import mongoose from 'mongoose';
import Employees from './routes/employees.js';
import Auth from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI_LOCAL}test2`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
app.use(express.json({ extended: true }));
app.use('/api/employees', Employees);
app.use('/api/auth', Auth);

export default app;
