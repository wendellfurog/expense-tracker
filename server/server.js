import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import TransactionApi from './routes/transactionsApi.js';
import database from './database/mongodb.js'


const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/transaction', TransactionApi);

// Database is separated in a different folder
await database();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
