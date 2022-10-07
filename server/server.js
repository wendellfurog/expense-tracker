import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import Transaction from './models/Transaction.js';


const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


await mongoose
  .connect(
  'mongodb+srv://wtfurog:basket2552@cluster0.va0cjlq.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB connection is successfull'))
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/transaction', async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
});


app.post('/transaction', async (req, res) => {
  const {amount, description, date} = req.body;
  const transaction = new Transaction ({
      amount,
      description,
      date,
  });
  await transaction.save();
  res.json({ message: 'Success' });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
