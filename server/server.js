import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const PORT = 4000;
const app = express();

app.use(cors);


await mongoose
  .connect(
  'mongodb+srv://wtfurog:basket2552@cluster0.va0cjlq.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB connection is successfull'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
