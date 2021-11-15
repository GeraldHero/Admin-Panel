import express from 'express';

const app = express();
const PORT = 5000 || process.env.PORT;
app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, (e) => {
  console.log(`App is running in port: ${PORT}`);
});
