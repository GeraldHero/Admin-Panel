import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello'));

app.listen(5000, (e) => {
  console.log('app is running on port 500');
});
