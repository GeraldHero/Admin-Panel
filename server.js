import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import Employees from './routes/employees.js';
import Auth from './routes/auth.js';
import Companies from './routes/companies.js';
import colors from 'colors';

dotenv.config();
const app = express();

const PORT = process.env.PORT;
// database
import connectDB from './db/database.js';
connectDB();
// Middleware
app.use(express.json({ extended: true }));
app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'UPDATE'],
  })
);
app.use(morgan('tiny'));
app.use(errorHandler);

// Routes
app.use('/api/employees', Employees);
app.use('/api/auth', Auth);
app.get('/', (req, res) => {
  res.send('Found');
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
app.use(notFound);

app.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`.red.bold);
  console.log(`Server is running on port: ${PORT}`.bold.brightYellow);
});
