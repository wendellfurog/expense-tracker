import mongoose from 'mongoose';

async function database() {
  await mongoose
    .connect(
      'mongodb+srv://wtfurog:basket2552@cluster0.va0cjlq.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('MongoDB connection is successfull'))
    .catch((err) => console.log(err));
}

export default database;