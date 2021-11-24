/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies
 */
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import Employees from './routes/EmployeesRoute.js';
import Auth from './routes/authRoute.js';
import Companies from './routes/companiesRoute.js';
import connectDB from './db/database.js';

dotenv.config();
const app = express();
const { PORT } = process.env;
// database
connectDB();
// Middleware
app.use(express.json({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', Auth);
app.use('/api/employees', Employees);
app.use('/api/companies', Companies);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get(
    '*',
    (req, res) =>
      // eslint-disable-next-line comma-dangle
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // eslint-disable-next-line function-paren-newline
  );
}
// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`.red.bold);
  console.log(`Server is running on port: ${PORT}`.bold.brightYellow);
});
