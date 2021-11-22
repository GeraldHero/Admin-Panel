// For test purpose only.
import express from 'express';
import mongoose from 'mongoose';
import Employees from './routes/employeesRoute.js';
import Auth from './routes/authRoute.js';
import Companies from './routes/companiesRoute.js';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI_lOCAL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected to host ${conn.connection.host}`);
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
app.use(errorHandler);
app.use('/api/employees', Employees);
app.use('/api/auth', Auth);
app.use('/api/companies', Companies);
app.use(notFound);

export default app;
