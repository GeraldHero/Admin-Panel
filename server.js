import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

dotenv.config();
const app = express();

const PORT = 5000 || process.env.PORT;
// database
import connectDB from './db/database.js';
connectDB();
// Middleware
app.use(express.json({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// Routes
app.get('/', (req, res) => res.send('Hello'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port: ${PORT}`);
});
